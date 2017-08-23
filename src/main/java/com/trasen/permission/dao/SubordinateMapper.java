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
    public TbPersonnel selectTbperson(String userId);
    public List<UserRoleVo> selectSubordinate(Map<String,String> params);
    public List<TbPersonnel> selectSubordinateOrgUser(String[] depId);
    public List<TbTagPersonnel> selectTagPerson(String userId);
    public List<TbPersonnel> selectTagCodePerson(String[] TagId);
    public List<TbPersonnel> selectSubordinateOrgTreeUser(String deptId);


}
