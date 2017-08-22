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
    private String role_id;// 角色ID',
    private String app_id;// 应用ID',
    private String user_id;// 用户ID',
    private String operator;
    private Date created;
    private Date updated;
}
