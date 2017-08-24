package com.trasen.permission.service;

import com.trasen.permission.model.MenuVo;
import com.trasen.permission.model.TbPersonnel;
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
 * Created by zhangxiahui on 17/8/24.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:config/spring/applicationContext.xml"})
@Transactional
@TransactionConfiguration(transactionManager = "txManager")
public class SubordinateServiceTest {
    @Autowired
    SubordinateService subordinateService;

    @Test
    @Rollback(false)
    public void getSubordinateList(){
        List<TbPersonnel> list = subordinateService.getSubordinateList("1","1");
        for (TbPersonnel personnel : list){
            System.out.println("====="+personnel.getPerId()+"===="+personnel.getName()+"=====");
        }

    }
}
