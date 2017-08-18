package com.trasen.permission.model;/**
 * Created by zhangxiahui on 15/3/19.
 */

/**
 * @author zhangxiahui
 * @version 1.0
 * @date 2015/03/19 上午10:11
 */
public class RoleVo {
    private Integer pkid;
    private String name;
    private String appId;
    private Integer userId;
    private String created;
    private String modified;

    public Integer getPkid() {
        return pkid;
    }

    public void setPkid(Integer pkid) {
        this.pkid = pkid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }

    public String getModified() {
        return modified;
    }

    public void setModified(String modified) {
        this.modified = modified;
    }
}
