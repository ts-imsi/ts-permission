package com.trasen.permission.service;

import com.trasen.permission.dao.SubordinateMapper;
import com.trasen.permission.model.TbPersonnel;
import com.trasen.permission.model.TbTagPersonnel;
import com.trasen.permission.model.UserRoleVo;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author luoyun
 * @ClassName: IntelliJ IDEA
 * @Description: 操作类型
 * @date 2017/8/22
 */
@Component
public class SubordinateService {
    private Logger logger = Logger.getLogger(SubordinateService.class);

    @Autowired
    private SubordinateMapper subordinateMapper;

    public List<TbPersonnel> getSubordinateList(Map<String,String> param){
        String userId=param.get("userId");
        if(userId==null){
            logger.info("参数错误，userId为空");
            return null;
        }
        TbPersonnel tbPersonnel=subordinateMapper.selectTbperson(userId);
        List<UserRoleVo> userRoleVoList=subordinateMapper.selectSubordinate(param);
        if(userRoleVoList==null||userRoleVoList.size()==0){
            logger.info("查询下属角色为空");
            return null;
        }else{
            int userRole_org=0,userRole_tag=0;
            for(int i=0;i<userRoleVoList.size();i++){
                //组织机构下属角色
                if(userRoleVoList.get(i).getName().equals("组织架构下属")){
                    userRole_org=1;
                }
                //标签下属角色
                if(userRoleVoList.get(i).getName().equals("标签下属")){
                    userRole_tag=1;
                }
            }
            if(userRole_org==1&&userRole_tag==0){
                logger.info("该用户只有组织机构下属角色");
                List<TbPersonnel> tbPersonnelList=subordinateMapper.selectSubordinateOrgTreeUser(tbPersonnel.getDepId());
                return tbPersonnelList;
            }else if(userRole_org==0&&userRole_tag==1){
                List<TbPersonnel> tbTag_PersonnelList=getTagList(userId);
                return tbTag_PersonnelList;
            }else{
                List<TbPersonnel> tbTag_PersonnelList=subordinateMapper.selectSubordinateOrgTreeUser(tbPersonnel.getDepId());
                List<TbPersonnel> tbDept_PersonnelList=getTagList(userId);
                if(tbTag_PersonnelList!=null&&tbDept_PersonnelList==null){
                    logger.info("tbDept_PersonnelList为空");
                    return tbTag_PersonnelList;
                }
                if(tbTag_PersonnelList==null&&tbDept_PersonnelList!=null){
                    logger.info("tbTag_PersonnelList为空");
                    return tbDept_PersonnelList;
                }
                if(tbTag_PersonnelList!=null&&tbDept_PersonnelList!=null){
                    List<TbPersonnel> tbTag_DeptPersonnelList=new ArrayList<>();
                    tbTag_DeptPersonnelList.addAll(tbDept_PersonnelList);
                    for(int i=0;i<tbTag_PersonnelList.size();i++){
                        boolean existence=false;
                        for(int j=0;j<tbDept_PersonnelList.size();j++){
                            if(tbTag_PersonnelList.get(i).getWorkNum().equals(tbDept_PersonnelList.get(j).getWorkNum())){
                                existence=true;
                            }
                        }
                        if(!existence){
                            tbTag_DeptPersonnelList.add(tbTag_PersonnelList.get(i));
                        }
                    }
                    return tbTag_DeptPersonnelList;
                }
            }
        }
        return null;
    }


    public List<TbPersonnel> getTagList(String userId){
        logger.info("该用户只有标签下属角色");
        List<TbTagPersonnel> tbTagPersonnelList=subordinateMapper.selectTagPerson(userId);
        if(tbTagPersonnelList==null||tbTagPersonnelList.size()==0){
            logger.info("该用户TbTagPersonnel查询为空");
            return null;
        }
        String deptTag="",Tag="";
        for(int i=0;i<tbTagPersonnelList.size();i++){
            if(tbTagPersonnelList.get(i).getTagId().indexOf("Tag")>=0){
                Tag=Tag+tbTagPersonnelList.get(i).getTagId()+",";
            }else{
                deptTag=deptTag+tbTagPersonnelList.get(i).getTagId()+",";
            }
        }
        //项目标签
        List<TbPersonnel> tbPerTag_list=null;
        List<TbPersonnel> tbPerDept_list=null;
        if(!Tag.equals("")){
            Tag = Tag.substring(0,Tag.length() - 1);
            String[] tags=Tag.split(",");
             tbPerTag_list=subordinateMapper.selectTagCodePerson(tags);
        }
        //部门标签
        if(!deptTag.equals("")){
            deptTag=deptTag.substring(0,deptTag.length() - 1);
            String[] deptTags=deptTag.split(",");
             tbPerDept_list=subordinateMapper.selectSubordinateOrgUser(deptTags);
        }
        if(tbPerTag_list==null&&tbPerDept_list==null){
            logger.info("userRole_tag==1时，tbPerTag_list，tbPerDept_list为空");
            return null;
        }
        if(tbPerTag_list!=null&&tbPerDept_list==null){
            logger.info("userRole_tag==1时，tbPerDept_list为空");
            return tbPerTag_list;
        }
        if(tbPerTag_list==null&&tbPerDept_list!=null){
            logger.info("userRole_tag==1时，tbPerTag_list为空");
            return tbPerDept_list;
        }
        if(tbPerTag_list!=null&&tbPerDept_list!=null){
            List<TbPersonnel> tbTag_DeptPersonnelList=new ArrayList<>();
            tbTag_DeptPersonnelList.addAll(tbPerDept_list);
            for(int i=0;i<tbPerTag_list.size();i++){
                boolean existence=false;
                for(int j=0;j<tbPerDept_list.size();j++){
                    if(tbPerTag_list.get(i).getWorkNum().equals(tbPerDept_list.get(j).getWorkNum())){
                        existence=true;
                    }
                }
                if(!existence) tbTag_DeptPersonnelList.add(tbPerTag_list.get(i));
            }
            return tbTag_DeptPersonnelList;
        }
        return null;
    }

}
