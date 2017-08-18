package com.trasen.permission.dao;

import com.trasen.permission.model.OperationVo;
import com.trasen.permission.model.RoleOperationVo;
import com.trasen.permission.model.RoleVo;

import java.util.List;
import java.util.Map;

/**
 * Created by zhangxiahui on 17/8/16.
 */
public interface TbUserMapper {

    List<Map<String,Object>> getApps();

    Map<String,Object> loginValid(Map<String,Object> map);

    List<OperationVo> getMenu(String appId);

    List<RoleVo> getRoles(String appId);

    List<RoleOperationVo> getRoleOps(Map<String,Object> map);
}

