package com.sosyalmedya.sosyalmedya;

import com.sosyalmedya.sosyalmedya.message.Message;
import com.sosyalmedya.sosyalmedya.message.MessageService;
import com.sosyalmedya.sosyalmedya.message.MessageSubmitDTO;
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
import org.springframework.context.annotation.Profile;
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
    CommandLineRunner createInitialUsers( UserService userService,MessageService messageService){
        return (args)->{
            for(int i =1;i<=10;i++){
                User user= new User();
                user.setUserName("user"+i);
                user.setNickName("nick"+i);
                user.setPassword("asdA1");
                userService.save(user);
                for(int j =1;j<=15;j++){
                    MessageSubmitDTO messageSubmitDTO= new MessageSubmitDTO();
                    messageSubmitDTO.setContent(i+". kullanacınının "+ j+". mesajı");
                    messageService.postMessage(messageSubmitDTO,user);
                }
            }

        };
    }



    }


