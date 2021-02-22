package com.sosyalmedya.sosyalmedya.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    PasswordEncoder passwordEncoder;
    UserService(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.passwordEncoder = passwordEncoder;
    }

   void save(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
       userRepository.save(user);
    }
}
