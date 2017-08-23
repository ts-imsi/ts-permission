package com.trasen.permission.controller;

import cn.trasen.core.entity.Result;
import com.trasen.permission.common.VisitInfoHolder;
import com.trasen.permission.model.MenuVo;
import com.trasen.permission.model.TbPersonnel;
import com.trasen.permission.service.SubordinateService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhangxiahui on 17/8/21.
 */
@Controller
@RequestMapping("ts-authorize")
public class AuthorizeController {

    Logger logger = Logger.getLogger(AuthorizeController.class);

    @Autowired
    private SubordinateService subordinateService;

    @ResponseBody
    @RequestMapping(value = "/{appId}/menus", method = RequestMethod.GET)
    public Result getMenus(@PathVariable String appId) {
        logger.info("===权限系统:获取菜单权限====["+ VisitInfoHolder.getUserId()+"]====");
        Result result = new Result();
        result.setMessage("查询成功");
        result.setStatusCode(1);
        result.setSuccess(true);
        List<MenuVo> list = new ArrayList<>();
        MenuVo menuVo1 = new MenuVo();
        menuVo1.setPkid(1);
        menuVo1.setName("考勤管理");
        menuVo1.setUrl("attence");

        MenuVo menuVo11 = new MenuVo();
        menuVo11.setPkid(2);
        menuVo11.setParentId(1);
        menuVo11.setName("考勤设置");
        menuVo11.setUrl("app.note");

        MenuVo menuVo12 = new MenuVo();
        menuVo12.setPkid(3);
        menuVo12.setParentId(1);
        menuVo12.setName("考勤异常");
        menuVo12.setUrl("app.attenceList");

        MenuVo menuVo13 = new MenuVo();
        menuVo13.setPkid(4);
        menuVo13.setParentId(1);
        menuVo13.setName("考勤统计");
        menuVo13.setUrl("app.contact");
        List<MenuVo> list1 = new ArrayList<>();
        list1.add(menuVo11);
        list1.add(menuVo12);
        list1.add(menuVo13);

        menuVo1.setChildrens(list1);

        list.add(menuVo1);

        result.setObject(list);
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/{appId}/operList/{state}", method = RequestMethod.GET)
    public Result getOperList(@PathVariable String appId,String state) {
        logger.info("===权限系统:获取页面操作权限====["+ VisitInfoHolder.getUserId()+"]====["+state+"]===");
        Result result = new Result();
        result.setMessage("查询成功");
        result.setStatusCode(1);
        result.setSuccess(true);
        List<MenuVo> list = new ArrayList<>();
        MenuVo menuVo1 = new MenuVo();
        menuVo1.setPkid(1);
        menuVo1.setName("列表展示");
        menuVo1.setOpCode("aaa");


        MenuVo menuVo2 = new MenuVo();
        menuVo2.setPkid(2);
        menuVo2.setName("查询");
        menuVo2.setOpCode("app.note");

        MenuVo menuVo3 = new MenuVo();
        menuVo3.setPkid(3);
        menuVo3.setName("导出");
        menuVo3.setOpCode("app.attenceList");

        MenuVo menuVo4 = new MenuVo();
        menuVo4.setPkid(4);
        menuVo4.setName("删除");
        menuVo4.setOpCode("app.contact");


        list.add(menuVo1);
        list.add(menuVo2);
        list.add(menuVo3);
        list.add(menuVo4);

        result.setObject(list);
        return result;
    }

    @ResponseBody
    @RequestMapping(value="/getSubordinateList", method = RequestMethod.GET)
    public Result getSubordinateList(){
        Result result = new Result();
        Map<String,String> param=new HashMap<String,String>();
        param.put("userId","3");
        param.put("appId","ts-imis");
        List<TbPersonnel> tbPersonnelList= subordinateService.getSubordinateList(param);
        System.out.println(tbPersonnelList.size());
        result.setObject(tbPersonnelList);
        result.setSuccess(true);
        return result;
    }





}
