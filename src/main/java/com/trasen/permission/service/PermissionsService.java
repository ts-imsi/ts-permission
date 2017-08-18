package com.trasen.permission.service;/**
 * Created by zhangxiahui on 15/3/17.
 */

import com.trasen.permission.dao.TbUserMapper;
import com.trasen.permission.model.OperationVo;
import com.trasen.permission.model.RoleOperationVo;
import com.trasen.permission.model.RoleVo;
import com.trasen.permission.model.UserVo;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zhangxiahui
 * @version 1.0
 * @date 2015/03/17 上午10:35
 */
@Component
public class PermissionsService {

    @Autowired
    TbUserMapper tbUserMapper;

    Logger logger = Logger.getLogger(PermissionsService.class);

    public List<Map<String,Object>> getApps(){
        return tbUserMapper.getApps();
    }

    public Map<String,Object> loginValid(UserVo userVo){
        Map<String,Object> map = new HashMap<>();
        map.put("success",true);
        map.put("msg","");
        Map<String,Object> user = getUser(userVo.getName(),userVo.getAppId());
        if(user==null){
            map.put("success",false);
            map.put("msg","用户名不存在");
        }
        if(!userVo.getPassword().equals(user.get("password").toString())){
            map.put("success",false);
            map.put("msg","用户名或密码错误");
        }
        if(user.get("password").toString().equals("3")){
            map.put("success",false);
            map.put("msg","该用户没有登录权限,请核实用户信息");
        }
        return map;
    }

    public Map<String,Object> getUser(String name,String app_id){
        Map<String, Object> parameterMap = new HashMap<String, Object>();
        parameterMap.put("name", name);
        parameterMap.put("app_id", app_id);
        return tbUserMapper.loginValid(parameterMap);
    }

    public Map<Integer,Map<Integer,OperationVo>> getMenu(String app_id){
        Map<Integer,Map<Integer,OperationVo>> parentIdMap = new HashMap<>();
        List<OperationVo> list = tbUserMapper.getMenu(app_id);
        for(OperationVo operation : list){
            if(operation.getParentId()!=null){
                Map<Integer,OperationVo> parentIdOperations = parentIdMap.get(operation.getParentId());
                if(parentIdOperations==null){
                    parentIdOperations = new HashMap<>();
                    parentIdMap.put(operation.getParentId(),parentIdOperations);
                }
                parentIdOperations.put(operation.getPkid(),operation);

                Map<Integer,OperationVo> subOperations = parentIdMap.get(operation.getPkid());
                if(subOperations==null){
                    subOperations = new HashMap<>();
                    parentIdMap.put(operation.getPkid(),subOperations);
                }
                operation.setSubMenus(subOperations);
            }

        }
        return parentIdMap;
    }

    public List<RoleVo> getRoles(String app_id){
        return tbUserMapper.getRoles(app_id);
    }

    public List<RoleOperationVo> getRoleOps(Map<String,Object> parameterMap){
        return tbUserMapper.getRoleOps(parameterMap);
    }



}
