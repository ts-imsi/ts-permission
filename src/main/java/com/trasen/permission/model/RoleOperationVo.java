package com.trasen.permission.model;/**
 * Created by zhangxiahui on 15/3/19.
 */

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @author zhangxiahui
 * @version 1.0
 * @date 2015/03/19 上午10:31
 */
@Setter
@Getter
public class RoleOperationVo {

    private String appId;
    private Date created;
    private Date updated;
    private Integer operationId;
    private Integer pkid;
    private Integer roleId;
    private Integer operator;
}
