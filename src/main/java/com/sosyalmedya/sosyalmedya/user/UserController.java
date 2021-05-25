package com.sosyalmedya.sosyalmedya.user;


import com.sosyalmedya.sosyalmedya.exception.NotFoundException;
import com.sosyalmedya.sosyalmedya.util.CurrnetUser;
import com.sosyalmedya.sosyalmedya.util.GenericResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

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
    @GetMapping("/getUsers2")
    public List<UserDTO> getUsers2(){

        return userService.getUsers2().stream().map(new Function<User, UserDTO>() {
            @Override
            public UserDTO apply(User user) {
                return new UserDTO(user);
            }
        }).collect(Collectors.toList());

    }
    @GetMapping("/users")
    Page<UserDTO> getUsers(Pageable page, @CurrnetUser User user){

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
       if(user==null){
           throw new NotFoundException();
       }
       return  new UserDTO(user);
    }
    @PutMapping("/users/{userName}")
    @PreAuthorize("#userName == principal.userName")
    UserDTO updateUser(@RequestBody UserUpdateDTO userUpdateDTO, @PathVariable String userName){
        System.out.println(userUpdateDTO.getImage());
        return new UserDTO(userService.updateUser(userUpdateDTO,userName));
    }


}
