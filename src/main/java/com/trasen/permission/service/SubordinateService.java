package com.trasen.permission.service;

import com.trasen.permission.common.AppCons;
import com.trasen.permission.dao.SubordinateMapper;
import com.trasen.permission.model.TbPersonnel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

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

    public List<TbPersonnel> getSubordinateList(String userId,String appId){
        List<TbPersonnel> list = new ArrayList<>();

        Map<String,Object> param = new HashMap<>();
        param.put("userId",userId);
        param.put("appId",appId);
        param.put("sub_tag", AppCons.SUB_TAG);
        param.put("sub_dept",AppCons.SUB_DEPT);
        List<String> subOperList =subordinateMapper.getSubOper(param);
        if(subOperList==null||subOperList.size()==0){
            logger.info("==========查询下属权限为空===========");
            return list;
        }
        List<String> ruleList = new ArrayList<>();
        TbPersonnel personnel = subordinateMapper.getPersonToUserId(userId);
        if(personnel==null){
            logger.info("==========该账户对人的人员为空===========");
            return list;
        }
        if(subOperList.contains(AppCons.SUB_DEPT)){
            //有下属部门权限
            if(personnel.getTagCode()!=null){
                ruleList.add(personnel.getTagCode());
            }
        }
        if(subOperList.contains(AppCons.SUB_TAG)){
            //有下属标签权限
            List<String> tagList = subordinateMapper.queryTagToPerson(personnel.getWorkNum());
            if(tagList!=null&&tagList.size()>0){
                ruleList.addAll(tagList);
            }
        }

        Map<String,TbPersonnel> resultMap = new HashMap<>();

        List<TbPersonnel> personnelList = subordinateMapper.queryPersonAll();
        for(TbPersonnel personnelRule : personnelList){
            if(personnelRule.getTagCode()!=null&&ruleList.contains(personnelRule.getTagCode())){
                //符合规则加入人员
                resultMap.put(personnelRule.getPerId(),personnelRule);
            }
            if(personnelRule.getTagId()!=null&&ruleList.contains(personnelRule.getTagId())){
                //符合规则加入人员
                resultMap.put(personnelRule.getPerId(),personnelRule);
            }
        }
        list.addAll(resultMap.keySet().stream().map(resultMap::get).collect(Collectors.toList()));
        return list;
    }

}
