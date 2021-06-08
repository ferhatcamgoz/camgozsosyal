package com.sosyalmedya.sosyalmedya.message;

import com.sosyalmedya.sosyalmedya.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class MessageSecurityService {

    @Autowired
    MessageRepository messageRepository;

    public boolean authorizationControl(long id, User user){
       Optional<Message> message= messageRepository.findById(id);
        if(!message.isPresent()){
            return false;
        }
        if(message.get().getUser().getId()!=user.getId()){
            return false;
        }
        return true;

    }
}
