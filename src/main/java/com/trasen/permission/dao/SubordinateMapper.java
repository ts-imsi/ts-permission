package com.trasen.permission.dao;

import com.trasen.permission.model.TbPersonnel;
import com.trasen.permission.model.TbTagPersonnel;
import com.trasen.permission.model.UserRoleVo;

import java.util.List;
import java.util.Map;

/**
 * @author luoyun
 * @ClassName: IntelliJ IDEA
 * @Description: 操作类型
 * @date 2017/8/22
 */
public interface SubordinateMapper {

    List<String> getSubOper(Map<String,Object> params);

    TbPersonnel getPersonToUserId(String userId);

    List<String> queryTagToPerson(String workNum);

    List<TbPersonnel> queryPersonAll();

}
