package com.trasen.permission.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Created by zhangxiahui on 17/8/21.
 */
@Setter
@Getter
public class MenuVo {

    private Integer pkid;
    private Integer parentId;
    private String name;
    private String url;
    private String opCode;
    private List<MenuVo> childrens;
}
