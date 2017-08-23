package com.trasen.permission.model;/**
 * Created by zhangxiahui on 15/3/18.
 */

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

/**
 * @author zhangxiahui
 * @version 1.0
 * @date 2015/03/18 下午4:13
 */
@Getter
@Setter
public class OperationVo {

    private String appId;
    private String created;
    private String updated;
    private String name;
    private String opCode;
    private Integer parentId;
    private Integer pkid;
    private Integer px;
    private Map<Integer,OperationVo> subMenus;
    private String url;
    private Integer operator;
    private String icon;
    private String translate;
    private String type;
}
