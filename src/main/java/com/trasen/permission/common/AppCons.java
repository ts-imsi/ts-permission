package com.trasen.permission.common;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zhangxiahui on 17/8/24.
 */
public class AppCons {

    public static final String SUB_DEPT="sub_dept";//部门下属
    public static final String SUB_TAG="sub_tag";//标签下属


    public static List<String> getOpCodeList(){
        List<String> openCodeList=new ArrayList<String>();
        openCodeList.add(SUB_DEPT);
        openCodeList.add(SUB_TAG);
        return openCodeList;
    }

}
