package com.sosyalmedya.sosyalmedya.user;



import com.sosyalmedya.sosyalmedya.exception.NotFoundException;
import com.sosyalmedya.sosyalmedya.file.FileService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Base64;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final FileService fileService;
    PasswordEncoder passwordEncoder;
    UserService(UserRepository userRepository,PasswordEncoder passwordEncoder,FileService fileService){
        this.userRepository=userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileService=fileService;
    }

  public void save(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
       userRepository.save(user);
    }
    public Page<User> getUsers(Pageable page,User user){
        if(user!=null){
            return  userRepository.findByUserNameNot(user.getUsername(),page);
        }
        return userRepository.findAll(page);

    }
    public List<User> getUsers2(){


        return userRepository.findAll();

    }
    public User getByUserName(String userName) {
        User user =userRepository.findByUserName(userName);
        if(user==null){
            throw  new NotFoundException();
        }
        return user;
    }

    public User updateUser(UserUpdateDTO userUpdateDTO, String userName) {
        User user= getByUserName(userName);
        user.setNickName(userUpdateDTO.getNickName());

        try {
            String storedFile=fileService.writeBase64EncodedFile(userUpdateDTO.getImage());
            user.setImage(storedFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return userRepository.save(user);
    }



}
