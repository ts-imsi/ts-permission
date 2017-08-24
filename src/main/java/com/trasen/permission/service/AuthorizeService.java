package com.trasen.permission.service;

import com.trasen.permission.dao.SubordinateMapper;
import com.trasen.permission.dao.TbOperationMapper;
import com.trasen.permission.model.MenuVo;
import com.trasen.permission.model.OperationVo;
import com.trasen.permission.model.TbPersonnel;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangxiahui on 17/8/23.
 */
@Component
public class AuthorizeService {

    private Logger logger = Logger.getLogger(AuthorizeService.class);

    @Autowired
    TbOperationMapper tbOperationMapper;

    @Autowired
    SubordinateMapper subordinateMapper;

    /**
     * 通过userId获取用户菜单权限
     *
     * */
    public List<MenuVo> getMenus(String userId,String appId){
        //查询用户的角色权限
        Map<String,Object> parMap = new HashMap<>();
        parMap.put("userId",userId);
        parMap.put("appId",appId);
        List<MenuVo> list = tbOperationMapper.getOperToUserId(parMap);
        Map<Integer,MenuVo> menuVoMap = new HashMap<>();
        for(MenuVo menuVo : list){
            menuVoMap.put(menuVo.getPkid(),menuVo);
        }

        MenuVo parentMenuVo = new MenuVo();
        parentMenuVo.setPkid(0);
        for(MenuVo menuVo : list){
            if(menuVo.getParentId()==0){
                parentMenuVo.getChildrens().add(menuVo);
            }else{
                MenuVo parMenu = menuVoMap.get(menuVo.getParentId());
                parMenu.getChildrens().add(menuVo);
            }
        }
        return parentMenuVo.getChildrens();
    }

    /**
     * 通过userId的操作权限
     *
     * */
    public List<String> getOpCodeList(String userId,String appId,String state){
        if(state!=null){
            String url = "#/"+state.replace("-","/");
            OperationVo operationVo = tbOperationMapper.getParentOper(url);
            if(operationVo!=null){
                Map<String,Object> parMap = new HashMap<>();
                parMap.put("userId",userId);
                parMap.put("appId",appId);
                parMap.put("parentId",operationVo.getPkid());
                return tbOperationMapper.getOpCodeList(parMap);
            }
        }
        return new ArrayList<>();
    }

    public String getTagName(String userId){
        TbPersonnel personnel = subordinateMapper.getPersonToUserId(userId);
        if(personnel!=null){
            return personnel.getDepName();
        }
        return "none";
    }








}
