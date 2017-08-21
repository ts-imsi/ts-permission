package com.trasen.permission.controller;

import cn.trasen.core.entity.Result;
import com.trasen.permission.model.MenuVo;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhangxiahui on 17/8/21.
 */
@Controller
@RequestMapping("authorize")
public class AuthorizeController {

    Logger logger = Logger.getLogger(AuthorizeController.class);


    @ResponseBody
    @RequestMapping(value = "/menus/{perId}", method = RequestMethod.GET)
    public Result getId(@PathVariable String perId) {
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




}
