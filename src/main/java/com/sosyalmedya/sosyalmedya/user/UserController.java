package com.sosyalmedya.sosyalmedya.user;


import com.sosyalmedya.sosyalmedya.exception.Apiexception;

import com.sosyalmedya.sosyalmedya.util.GenericResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

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
}
