package com.trasen.permission.model;/**
 * Created by zhangxiahui on 15/3/17.
 */

/**
 * @author zhangxiahui
 * @version 1.0
 * @date 2015/03/17 上午11:04
 */
public class UserVo {

    private String name;
    private String password;
    private String appId;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }
}
