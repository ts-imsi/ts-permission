package com.trasen.permission.controller;/**
 * Created by zhangxiahui on 15/3/19.
 */

import com.trasen.permission.common.AppCons;
import com.trasen.permission.model.OpenCode;
import com.trasen.permission.service.DynamicService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zhangxiahui
 * @version 1.0
 * @date 2015/03/19 下午3:43
 */
@Controller
@RequestMapping("dynamic")
public class DynamicController {

    Logger logger = Logger.getLogger(DynamicController.class);

    @Autowired
    private DynamicService dynamicService;

    /**
     * 操作
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/dbEntity/execute", produces = "application/json",method = RequestMethod.POST)
    public Map<String, Object> execute(@RequestBody Map<String,Object> map) {
        Map<String, Object> result = dynamicService.execute(map);
        return result;
    }

    /**
     * 获取角色列表
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/execSql/getRoleManages", method = RequestMethod.POST)
    public Map<String, Object> getRoleManages(@RequestBody Map<String,Object> map) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        result.put("msg","");
        List<Map<String,Object>> list = dynamicService.getRoleManages(map);
        result.put("data", list);
        return result;
    }

    /**
     * 判断角色名是否重复
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/execSql/getNameIsExist", method = RequestMethod.POST)
    public Map<String, Object> getNameIsExist(@RequestBody Map<String,Object> map) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("msg","");
        Integer count = dynamicService.getNameIsExist(map);
        if(count==null){
            result.put("success", false);
        }else{
            result.put("success", true);
        }
        result.put("data", count);
        return result;
    }

    /**
     * 查总数
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/execSql/getTotalCount", method = RequestMethod.POST)
    public Map<String, Object> getTotalCount(@RequestBody Map<String,Object> map) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("msg","");
        Integer count = dynamicService.getTotalCount(map);
        if(count==null){
            result.put("success", false);
        }else{
            result.put("success", true);
        }
        result.put("data", count);
        return result;
    }

    /**
     * 获取操作用户列表
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/execSql/execute", method = RequestMethod.POST)
    public Map<String, Object> getUserRoleList(@RequestBody Map<String,Object> map) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        result.put("msg","");
        List<Map<String,Object>> list = dynamicService.getUserRoleList(map);
        result.put("data", list);
        return result;
    }

    /**
     * 获取角色列表
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/execSql/getRoles", method = RequestMethod.POST)
    public Map<String, Object> getRoles(@RequestBody Map<String,Object> map) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        result.put("msg","");
        List<Map<String,Object>> list = dynamicService.getRoles(map);
        result.put("data", list);
        return result;
    }


    /**
     * 查用户总数
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/execSql/getUserTotal", method = RequestMethod.POST)
    public Map<String, Object> getUserTotal(@RequestBody Map<String,Object> map) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("msg","");
        Integer count = dynamicService.getUserTotal(map);
        if(count==null){
            result.put("success", false);
        }else{
            result.put("success", true);
        }
        result.put("data", count);
        return result;
    }

    /**
     * 获取操作用户列表
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/execSql/getUserList", method = RequestMethod.POST)
    public Map<String, Object> getUserList(@RequestBody Map<String,Object> map) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        result.put("msg","");
        List<Map<String,Object>> list = dynamicService.getUserList(map);
        result.put("data", list);
        return result;
    }

    /**
     * 获取OpenCode
     *
     * @param map
     * @return map
     */
    @ResponseBody
    @RequestMapping(value = "/execSql/openCodeList", method = RequestMethod.POST)
    public Map<String, Object> getUserList(){
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("success", true);
        result.put("msg","");
        List<String> list = AppCons.getOpCodeList();
        List<OpenCode> openCodeList=new ArrayList<OpenCode>();
        for(String opencode : list){
            OpenCode openCode=new OpenCode();
            openCode.setOpenCode(opencode);
            openCodeList.add(openCode);
        }
        result.put("data", openCodeList);
        return result;
    }

}
