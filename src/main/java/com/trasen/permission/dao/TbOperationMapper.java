package com.trasen.permission.dao;

import com.trasen.permission.model.MenuVo;
import com.trasen.permission.model.OperationVo;

import java.util.List;
import java.util.Map;

/**
 * Created by zhangxiahui on 17/8/16.
 */
public interface TbOperationMapper {

    List<MenuVo> getOperToUserId(Map<String,Object> map);

    List<String> getOpCodeList(Map<String,Object> map);

    OperationVo getParentOper(String url);
}
