package com.trasen.permission.model;/**
 * Created by zhangxiahui on 15/3/19.
 */

/**
 * @author zhangxiahui
 * @version 1.0
 * @date 2015/03/19 上午10:31
 */
public class RoleOperationVo {

    private String appId;
    private String created;
    private String modified;
    private Integer operationId;
    private Integer pkid;
    private Integer roleId;
    private Integer userId;

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
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

    public Integer getOperationId() {
        return operationId;
    }

    public void setOperationId(Integer operationId) {
        this.operationId = operationId;
    }

    public Integer getPkid() {
        return pkid;
    }

    public void setPkid(Integer pkid) {
        this.pkid = pkid;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
