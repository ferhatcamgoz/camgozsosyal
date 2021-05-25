package com.sosyalmedya.sosyalmedya;

import com.sosyalmedya.sosyalmedya.user.User;
import com.sosyalmedya.sosyalmedya.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import java.util.Timer;
import java.util.TimerTask;

@SpringBootApplication()
public class SosyalmedyaApplication {

    public static void main(String[] args) {
        SpringApplication.run(SosyalmedyaApplication.class, args);
    }
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CommandLineRunner createInitialUsers( UserService userService){
        return (args)->{
            for(int i =1;i<=25;i++){
                User user= new User();
                user.setUserName("user"+i);
                user.setNickName("nick"+i);
                user.setPassword("asdA1");
                userService.save(user);
            }

        };
    }


    }


