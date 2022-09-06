package com.rasbet.rasbet;

import com.rasbet.rasbet.business.UserFacade;
import com.rasbet.rasbet.business.user.Expert;
import com.rasbet.rasbet.database.ExpertDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@SpringBootApplication
public class RasBetApplication {

    public static void main(String[] args) {
        SpringApplication.run(RasBetApplication.class, args);
    }

}
