package com.trasen.permission.controller;

import cn.trasen.core.entity.Result;
import com.trasen.permission.common.VisitInfoHolder;
import com.trasen.permission.model.MenuVo;
import com.trasen.permission.model.TbPersonnel;
import com.trasen.permission.service.AuthorizeService;
import com.trasen.permission.service.SubordinateService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by zhangxiahui on 17/8/21.
 */
@Controller
@RequestMapping("ts-authorize")
public class AuthorizeController {

    Logger logger = Logger.getLogger(AuthorizeController.class);

    @Autowired
    private SubordinateService subordinateService;

    @Autowired
    private AuthorizeService authorizeService;

    @ResponseBody
    @RequestMapping(value = "/{appId}/menus", method = RequestMethod.GET)
    public Result getMenus(@PathVariable String appId) {
        logger.info("===权限系统:获取菜单权限====["+ VisitInfoHolder.getUserId()+"]====");
        Result result = new Result();
        result.setMessage("查询成功");
        result.setStatusCode(1);
        result.setSuccess(true);
        List<MenuVo> list = authorizeService.getMenus(VisitInfoHolder.getUserId(),appId);
        result.setObject(list);
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/{appId}/operList/{state}", method = RequestMethod.GET)
    public Result getOperList(@PathVariable String appId,@PathVariable String state) {
        logger.info("===权限系统:获取页面操作权限====["+ VisitInfoHolder.getUserId()+"]====["+state+"]===");
        Result result = new Result();
        result.setStatusCode(1);
        result.setSuccess(true);
        String message = authorizeService.getTagName(VisitInfoHolder.getUserId());
        result.setMessage(message);
        List<String> list = authorizeService.getOpCodeList(VisitInfoHolder.getUserId(),appId,state);
        result.setObject(list);
        return result;
    }

    @ResponseBody
    @RequestMapping(value="/{appId}/getSubordinateList", method = RequestMethod.GET)
    public Result getSubordinateList(@PathVariable String appId){
        logger.info("===权限系统:获取页面操作权限====["+ VisitInfoHolder.getUserId()+"]====["+appId+"]===");
        Result result = new Result();
        result.setMessage("查询成功");
        result.setStatusCode(1);
        result.setSuccess(true);
        List<TbPersonnel> tbPersonnelList= subordinateService.getSubordinateList(VisitInfoHolder.getUserId(),appId);
        System.out.println(tbPersonnelList.size());
        result.setObject(tbPersonnelList);
        result.setSuccess(true);
        return result;
    }

    @ResponseBody
    @RequestMapping(value="/{appId}/getSubPerson/{userId}", method = RequestMethod.GET)
    public Result getSubPerson(@PathVariable String appId,@PathVariable String userId){
        logger.info("===权限系统:获取页面操作权限[无鉴权]====["+ userId+"]====["+appId+"]===");
        Result result = new Result();
        result.setMessage("查询成功");
        result.setStatusCode(1);
        result.setSuccess(true);
        List<TbPersonnel> tbPersonnelList= subordinateService.getSubordinateList(userId,appId);
        System.out.println(tbPersonnelList.size());
        result.setObject(tbPersonnelList);
        result.setSuccess(true);
        return result;
    }





}
