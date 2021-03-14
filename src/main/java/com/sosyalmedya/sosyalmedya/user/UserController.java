package com.sosyalmedya.sosyalmedya.user;


import com.fasterxml.jackson.annotation.JsonView;
import com.sosyalmedya.sosyalmedya.exception.Apiexception;

import com.sosyalmedya.sosyalmedya.util.CurrnetUser;
import com.sosyalmedya.sosyalmedya.util.GenericResponse;

import com.sosyalmedya.sosyalmedya.util.View;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@RestController
public class UserController {

   private final UserService userService;

    UserController(UserService userService){
        this.userService=userService;
    }

    @PostMapping("/kayit")
    public GenericResponse createUser( @Valid @RequestBody User user){
        userService.save(user);
        return new GenericResponse("Kayıt Başarılı");

    }
    @GetMapping("/users")
    Page<UserDTO> getUsers(Pageable page, @CurrnetUser User user){
        System.out.println(user); 
        return userService.getUsers(page,user).map(new Function<User, UserDTO>() {
            @Override
            public UserDTO apply(User user) {
                return new UserDTO(user);
            }
        });
    }

    @GetMapping("/users/{userName}")
    UserDTO getUser(@PathVariable String userName){
       User user= userService.getByUserName(userName);
       return  new UserDTO(user);
    }


}
