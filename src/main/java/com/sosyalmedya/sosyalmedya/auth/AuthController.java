package com.sosyalmedya.sosyalmedya.auth;

import com.fasterxml.jackson.annotation.JsonView;
import com.sosyalmedya.sosyalmedya.exception.Apiexception;
import com.sosyalmedya.sosyalmedya.user.User;
import com.sosyalmedya.sosyalmedya.user.UserDTO;
import com.sosyalmedya.sosyalmedya.user.UserRepository;
import com.sosyalmedya.sosyalmedya.util.CurrnetUser;
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
        final
        UserRepository userRepository;

        public AuthController(UserRepository userRepository) {
                this.userRepository = userRepository;
        }

        @PostMapping("/auth")
        UserDTO handleAuth(@CurrnetUser User user){
            return new UserDTO(user);
        }
}
