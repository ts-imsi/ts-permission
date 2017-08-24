package com.trasen.permission.service;


import com.trasen.permission.dao.TwfDictMapper;
import com.trasen.permission.model.TwfDict;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author luoyun
 * @ClassName: IntelliJ IDEA
 * @Description: 操作类型
 * @date 2017/6/23
 */
@Component
public class TwfDictService {
    @Autowired
    private TwfDictMapper twfDictMapper;

    public List<TwfDict> getTwfDictForType(int type){
        return twfDictMapper.getTwfDictForType(type);
    }

}
