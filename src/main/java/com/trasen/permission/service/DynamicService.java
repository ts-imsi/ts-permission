package com.trasen.permission.service;/**
 * Created by zhangxiahui on 15/3/19.
 */

import com.trasen.permission.common.MybatisDao;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * @author zhangxiahui
 * @version 1.0
 * @date 2015/03/19 下午3:58
 */
@Component
public class DynamicService {

    @Autowired
    MybatisDao mybatisDao;

    Logger logger = Logger.getLogger(DynamicService.class);

    public Map<String, Object> execute(Map<String,Object> map){
        Map<String, Object> result = new HashMap<String, Object>();
        if(map.get("_operation")!=null&&map.get("_tableName")!=null){
            String oper = map.get("_operation").toString()+"_"+map.get("_tableName").toString();
            switch (oper){
                case "insert_t_operation" :
                    result = insertOperation(map);
                    break;
                case "delete_t_operation" :
                    result = deleteOperation(map);
                    break;
                case "update_t_operation" :
                    result = updateOperation(map);
                    break;
                case "insert_t_role" :
                    result = insertRole(map);
                    break;
                case "update_t_role" :
                    result = updateRole(map);
                    break;
                case "delete_t_role" :
                    result = deleteRole(map);
                    break;
                case "saveOrUpdate_t_role_operation" :
                    result = saveOrUpdateRoleOperation(map);
                    break;
                case "update_t_user" :
                    result = updateUser(map);
                    break;
                case "insert_t_user_role" :
                    result = insertUserRole(map);
                    break;
                case "update_t_permission" :
                    result = updatePermission(map);
                    break;

                default:
                    result.put("success",false);
                    result.put("msg","操作失败");
            }
        }
        return result;
    }

    public Map<String,Object> insertOperation(Map<String,Object> map){
        Map<String, Object> result = new HashMap<String, Object>();
        if(map.get("parentId")==null){
            map.put("parentId",0);
        }
        if(map.get("name")==null||"".equals(map.get("name").toString())){
            result.put("success",false);
            result.put("msg","目录名称不能为空");
            return result;
        }
        if(map.get("url")==null){
            map.put("url",null);
        }
        if(map.get("appId")==null){
            result.put("success",false);
            result.put("msg","应用ID不能为空");
            return result;
        }
        if(map.get("userId")==null){
            result.put("success",false);
            result.put("msg","用户不能为空，请登录");
            return result;

        }
        if(map.get("px")==null){
            map.put("px",null);
        }
        if(map.get("created")==null){
            map.put("created",new Date());

        }
        mybatisDao.save("Dynamic.insert_t_operation",map);
        Map<String,Object> mapT = new HashMap<>();
        mapT.put("id",map.get("pkid"));
        result.put("data", mapT);
        result.put("success", true);
        result.put("msg","保存成功！test");
        return result;
    }

    public Map<String,Object> deleteOperation(Map<String,Object> map){
        Map<String, Object> result = new HashMap<String, Object>();
        if(map.get("pkid")==null){
            result.put("success",false);
            result.put("msg","删除失败test");
            return result;
        }
        mybatisDao.save("Dynamic.delete_t_operation",Integer.parseInt(map.get("pkid").toString()));
        result.put("success", true);
        result.put("msg","删除成功！test");
        return result;
    }

    public Map<String,Object> updateOperation(Map<String,Object> map){
        Map<String, Object> result = new HashMap<String, Object>();
        if(map.get("pkid")==null){
            result.put("success",false);
            result.put("msg","更新失败test");
            return result;
        }
        if(map.get("name")==null||"".equals(map.get("name").toString())){
            result.put("success",false);
            result.put("msg","目录名称不能为空");
            return result;
        }
        if(map.get("url")==null){
            map.put("url",null);
        }
        if(map.get("px")==null){
            map.put("px",null);
        }
        mybatisDao.save("Dynamic.update_t_operation",map);
        result.put("success", true);
        result.put("msg","更新成功！test");
        return result;
    }

    public Map<String,Object> insertRole(Map<String,Object> map){
        Map<String, Object> result = new HashMap<String, Object>();
        if(map.get("name")==null||"".equals(map.get("name").toString())){
            result.put("success",false);
            result.put("msg","角色名称不能为空");
            return result;
        }
        if(map.get("appId")==null){
            result.put("success",false);
            result.put("msg","应用ID不能为空");
            return result;
        }
        if(map.get("userId")==null){
            result.put("success",false);
            result.put("msg","用户不能为空，请登录");
            return result;
        }
        if(map.get("created")==null){
            map.put("created",new Date());
        }
        mybatisDao.save("Dynamic.insert_t_role",map);
        Map<String,Object> mapT = new HashMap<>();
        mapT.put("id",map.get("pkid"));
        result.put("data", mapT);
        result.put("success", true);
        result.put("msg","保存成功！t_role");
        return result;
    }

    public Map<String,Object> updateRole(Map<String,Object> map){
        Map<String, Object> result = new HashMap<String, Object>();
        if(map.get("pkid")==null){
            result.put("success",false);
            result.put("msg","更新失败test");
            return result;
        }
        if(map.get("name")==null||"".equals(map.get("name").toString())){
            result.put("success",false);
            result.put("msg","目录名称不能为空");
            return result;
        }
        mybatisDao.save("Dynamic.update_t_role",map);
        result.put("success", true);
        result.put("msg","更新成功！test");
        return result;
    }

    public Map<String,Object> deleteRole(Map<String,Object> map){
        Map<String, Object> result = new HashMap<String, Object>();
        if(map.get("pkid")==null){
            result.put("success",false);
            result.put("msg","删除失败test");
            return result;
        }
        mybatisDao.save("Dynamic.delete_t_role",Integer.parseInt(map.get("pkid").toString()));
        result.put("success", true);
        result.put("msg","删除成功！test");
        return result;
    }

    public Map<String,Object> saveOrUpdateRoleOperation(Map<String,Object> map){
        Map<String, Object> result = new HashMap<String, Object>();
        if(map.get("appId")==null){
            result.put("success",false);
            result.put("msg","应用ID不能为空");
            return result;
        }
        if(map.get("roleId")==null){
            result.put("success",false);
            result.put("msg","角色ID不能为空");
            return result;
        }
        if(map.get("condition")==null){
            result.put("success",false);
            result.put("msg","没有要设置的权限");
            return result;
        }
        Map<String,Boolean> conMap = (Map<String,Boolean>)map.get("condition");
        if(conMap.size()==0){
            result.put("success",false);
            result.put("msg","没有要设置的权限");
            return result;
        }
        Set<String> operationSet = conMap.keySet();
        List<Integer> operationList = new ArrayList<>();
        for(String operationId : operationSet){
            if(conMap.get(operationId)){
                operationList.add(Integer.parseInt(operationId));
            }
        }
        map.put("list",operationList);
        mybatisDao.save("Dynamic.saveOrUpdateRoleOperation",map);
        result.put("success", true);
        result.put("msg","保存成功role_oper");
        return result;
    }

    public Map<String,Object> updateUser(Map<String,Object> map){
        Map<String, Object> result = new HashMap<String, Object>();
        if(map.get("status")==null){
            result.put("success",false);
            result.put("msg","禁用失败");
            return result;
        }
        if(map.get("name")==null||"".equals(map.get("name").toString())){
            result.put("success",false);
            result.put("msg","名称不能为空");
            return result;
        }
        mybatisDao.save("Dynamic.update_t_user",map);
        result.put("success", true);
        result.put("msg","更新成功！test");
        return result;
    }



    public List<Map<String,Object>> getRoleManages(Map<String,Object> map){
        if(map.get("appId")!=null){
            return mybatisDao.getList("Dynamic.getRoleManages",map);
        }
        return new ArrayList<>();
    }

    public Map<String,Object> insertUserRole(Map<String,Object> map){
        Map<String, Object> result = new HashMap<String, Object>();
        if(map.get("appId")==null){
            result.put("success",false);
            result.put("msg","应用ID不能为空");
            return result;
        }
        if(map.get("uid")==null){
            result.put("success",false);
            result.put("msg","用户不能为空");
            return result;
        }
        if(map.get("userId")==null){
            result.put("success",false);
            result.put("msg","您为登录系统");
            return result;
        }
        List<String> roleIds = (List<String>)map.get("roleIds");
        if(roleIds==null||roleIds.size()==0){
            result.put("success",false);
            result.put("msg","没有要设置的角色");
            return result;
        }

        mybatisDao.save("Dynamic.insert_t_user_role",map);
        result.put("success", true);
        result.put("msg","设置成功！");
        return result;
    }

    public Integer getNameIsExist(Map<String,Object> map){
        if(map.get("appId")==null){
            map.put("appId", "custom");
        }
        if(map.get("name")==null||map.get("tableName")==null){
            return null;
        }
        return mybatisDao.getSingleRow("Dynamic.getNameIsExist", map);
    }


    public Integer getTotalCount(Map<String,Object> map){
        if(map.get("appId")==null){
            map.put("appId", "custom");
        }
        return mybatisDao.getSingleRow("Dynamic.getTotalCount", map);
    }

    public List<Map<String,Object>> getUserRoleList(Map<String,Object> map){
        if(map.get("appId")==null){
            map.put("appId", "custom");
        }
        Integer pageSize = 20;
        if(map.get("pageSize")!=null){
            pageSize = Integer.parseInt(map.get("pageSize").toString());
        }
        Integer startRecord = 0;
        if(map.get("currentPage")!=null){
            Integer currentPage = Integer.parseInt(map.get("currentPage").toString());
            startRecord = pageSize * (currentPage - 1);
        }
        map.put("pageSize", pageSize);
        map.put("startRecord", startRecord);
        return mybatisDao.getList("Dynamic.getUserRoleList",map);
    }

    public List<Map<String,Object>> getRoles(Map<String,Object> map){
        if(map.get("appId")==null){
            map.put("appId", "custom");
        }
        return mybatisDao.getList("Dynamic.getRoles",map);
    }

    public Integer getUserTotal(Map<String,Object> map){
        if(map.get("appId")==null){
            map.put("appId", "custom");
        }
        return mybatisDao.getSingleRow("Dynamic.getUserTotal", map);
    }

    public List<Map<String,Object>> getUserList(Map<String,Object> map){
        if(map.get("appId")==null){
            map.put("appId", "custom");
        }
        Integer pageSize = 20;
        if(map.get("pageSize")!=null){
            pageSize = Integer.parseInt(map.get("pageSize").toString());
        }
        Integer startRecord = 0;
        if(map.get("currentPage")!=null){
            Integer currentPage = Integer.parseInt(map.get("currentPage").toString());
            startRecord = pageSize * (currentPage - 1);
        }
        map.put("pageSize", pageSize);
        map.put("startRecord", startRecord);
        return mybatisDao.getList("Dynamic.getUserList",map);
    }

    public Map<String,Object> updatePermission(Map<String,Object> map){
        Map<String, Object> result = new HashMap<String, Object>();
        if(map.get("permission")==null){
            result.put("success",false);
            result.put("msg","操作失败");
            return result;
        }
        if(map.get("name")==null||"".equals(map.get("name").toString())){
            result.put("success",false);
            result.put("msg","名称不能为空");
            return result;
        }
        mybatisDao.save("Dynamic.updatePermission",map);
        result.put("success", true);
        result.put("msg","更新成功！test");
        return result;
    }

}
