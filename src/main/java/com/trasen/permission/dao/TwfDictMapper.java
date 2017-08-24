package com.trasen.permission.dao;


import com.trasen.permission.model.TwfDict;

import java.util.List;

/**
 * @author luoyun
 * @ClassName: IntelliJ IDEA
 * @Description: 操作类型
 * @date 2017/7/24
 */
public interface TwfDictMapper {
    public List<TwfDict> getTwfDictForType(int type);
}
