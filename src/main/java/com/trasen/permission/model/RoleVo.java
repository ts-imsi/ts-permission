package com.trasen.permission.model;/**
 * Created by zhangxiahui on 15/3/19.
 */

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @author zhangxiahui
 * @version 1.0
 * @date 2015/03/19 上午10:11
 */
@Setter
@Getter
public class RoleVo {
    private Integer pkid;
    private String name;
    private String appId;
    private Integer operator;
    private Date created;
    private Date updated;
}
