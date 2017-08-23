package com.trasen.permission.service;

import com.trasen.permission.model.MenuVo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by zhangxiahui on 17/8/23.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:config/spring/applicationContext.xml"})
@Transactional
@TransactionConfiguration(transactionManager = "txManager")
public class AuthorizeServiceTest {

    @Autowired
    AuthorizeService authorizeService;

    @Test
    @Rollback(false)
    public void getMenus(){
        List<MenuVo> list = authorizeService.getMenus("42733","1");
        for(MenuVo menuVo : list){
            System.out.println("====="+menuVo.getName()+"====");
        }

    }
}
