package com.trasen.permission.model;/**
 * Created by zhangxiahui on 15/3/18.
 */

import java.util.Map;

/**
 * @author zhangxiahui
 * @version 1.0
 * @date 2015/03/18 下午4:13
 */
public class OperationVo {

    private String appId;
    private String created;
    private String modified;
    private String name;
    private String opCode;
    private Integer parentId;
    private Integer pkid;
    private Integer px;
    private Map<Integer,OperationVo> subMenus;
    private String url;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOpCode() {
        return opCode;
    }

    public void setOpCode(String opCode) {
        this.opCode = opCode;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getPkid() {
        return pkid;
    }

    public void setPkid(Integer pkid) {
        this.pkid = pkid;
    }

    public Integer getPx() {
        return px;
    }

    public void setPx(Integer px) {
        this.px = px;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Map<Integer, OperationVo> getSubMenus() {
        return subMenus;
    }

    public void setSubMenus(Map<Integer, OperationVo> subMenus) {
        this.subMenus = subMenus;
    }
}
