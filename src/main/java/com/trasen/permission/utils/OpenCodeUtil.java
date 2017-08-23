package com.trasen.permission.utils;

import java.util.ArrayList;
import java.util.List;

/**
 * @author luoyun
 * @ClassName: IntelliJ IDEA
 * @Description: 操作类型
 * @date 2017/8/23
 */
public class OpenCodeUtil {
    public static String SUB_DEPT="sub_dept";//部门下属
    public static String SUB_TAG="sub_tag";//标签下属


    public static List<String> getOpenCodeList(){
        List<String> openCodeList=new ArrayList<String>();
        openCodeList.add(SUB_DEPT);
        openCodeList.add(SUB_TAG);
        return openCodeList;
    }

}
