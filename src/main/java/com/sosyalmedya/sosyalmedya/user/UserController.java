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
 /*   @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Apiexception handleValidetionException(MethodArgumentNotValidException methodArgumentNotValidException){
        Apiexception apiexception = new Apiexception(400,"Kayıt Hatası","/kayit");
        Map<String,String> hatalar = new HashMap<>();
        for (FieldError err : methodArgumentNotValidException.getBindingResult().getFieldErrors()){
            hatalar.put(err.getField(),err.getDefaultMessage());
        }
        apiexception.setValidateexception(hatalar);
        return  apiexception;
    }*/
}
