package com.trasen.permission.controller;/**
 * Created by zhangxiahui on 15/3/17.
 */

import com.trasen.permission.model.OperationVo;
import com.trasen.permission.model.RoleOperationVo;
import com.trasen.permission.model.RoleVo;
import com.trasen.permission.model.UserVo;
import com.trasen.permission.service.PermissionsService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zhangxiahui
 * @version 1.0
 * @date 2015/03/17 上午10:08
 */
@Controller
@RequestMapping("permissions")
public class PermissionsController {

    Logger logger = Logger.getLogger(PermissionsController.class);

    private static String COOKIE_PATH = "/";

    @Autowired
    PermissionsService permissionsService;

    /**
     * 获取应用
     *
     * @param
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/manage/getApps", method = RequestMethod.GET)
    public Map<String, Object> getApps() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("success", 1);
        List<Map<String,Object>> list =  permissionsService.getApps();
        map.put("data", list);
        return map;
    }

    /**
     * 登录
     *
     * @param userVo
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/manage/loginValid", method = RequestMethod.POST)
    public Map<String,Object>  loginValid(@RequestBody UserVo userVo) {
        return permissionsService.loginValid(userVo);
    }

    /**
     * 登录跳转
     *
     * @param request,response
     * @return void
     */
    @ResponseBody
    @RequestMapping(value = "/manage/mainLogin", method = RequestMethod.GET)
    public void  mainLogin(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        String name = request.getParameter("name");
        String password = request.getParameter("password");
        String appId = request.getParameter("appId");
        Map<String,Object> user_cookid = permissionsService.getUser(name,appId);

        //String user_info = JackSonMapper.toJsonString(user_cookid);

        //Cookie cookie = new Cookie("USER_INFO", URLEncoder.encode(user_info, "UTF-8"));
        //cookie.setPath(COOKIE_PATH);
        //response.addCookie(cookie);
        request.getRequestDispatcher("/authManage/menu.html").forward(request, response);




    }

    /**
     * 目录管理菜单
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/manage/getMenu", method = RequestMethod.POST)
    public Map<String, Object> getMenu(@RequestBody Map<String,Object> map) {
        Map<Integer,Map<Integer,OperationVo>> data = permissionsService.getMenu(map.get("appId").toString());
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("success",true);
        resultMap.put("msg","");
        resultMap.put("data",data);
        return resultMap;
    }

    /**
     * 角色管理菜单
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/manage/getRoles", method = RequestMethod.POST)
    public Map<String, Object> getRoles(@RequestBody Map<String,Object> map) {
        List<RoleVo> data = permissionsService.getRoles(map.get("appId").toString());
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("success",true);
        resultMap.put("msg","");
        resultMap.put("data",data);
        return resultMap;
    }

    /**
     * 角色设置
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/manage/getRoleOps", method = RequestMethod.POST)
    public Map<String, Object> getRoleOps(@RequestBody Map<String,Object> map) {
        List<RoleOperationVo> data = permissionsService.getRoleOps(map);
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("success",true);
        resultMap.put("msg","");
        resultMap.put("data",data);
        return resultMap;
    }






}
