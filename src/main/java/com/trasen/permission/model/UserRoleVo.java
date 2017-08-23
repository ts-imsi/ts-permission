package com.trasen.permission.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @author luoyun
 * @ClassName: IntelliJ IDEA
 * @Description: 操作类型
 * @date 2017/8/22
 */
@Getter
@Setter
public class UserRoleVo {
    private String pkid;
    private String roleId;// 角色ID
    private String appId;// 应用ID
    private String userId;// 用户ID
    private String operator;
    private Date created;
    private Date updated;

    private String opCode;
}
