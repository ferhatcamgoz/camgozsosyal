package com.sosyalmedya.sosyalmedya.auth;

import com.fasterxml.jackson.annotation.JsonView;
import com.sosyalmedya.sosyalmedya.exception.Apiexception;
import com.sosyalmedya.sosyalmedya.user.User;
import com.sosyalmedya.sosyalmedya.user.UserRepository;
import com.sosyalmedya.sosyalmedya.util.View;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

@RestController
public class AuthController {
        @Autowired
        UserRepository userRepository;
        PasswordEncoder passwordEncoder= new BCryptPasswordEncoder();
        @PostMapping("/auth")
        @JsonView(View.Base.class)
        ResponseEntity<?> handleAuth(Authentication authentication){
            User user = (User) authentication.getPrincipal();


            return ResponseEntity.ok(user);
        }
}
