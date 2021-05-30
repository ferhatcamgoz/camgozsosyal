package com.sosyalmedya.sosyalmedya.message;

import com.sosyalmedya.sosyalmedya.user.User;
import com.sosyalmedya.sosyalmedya.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class MessageService {

    @Autowired
    MessageRepository messageRepository;
    @Autowired
    UserService userService;

    public Message postMessage(Message message, User user){
        System.out.println(user);
        message.setDate(new Date());
        message.setUser(user);
       return messageRepository.save(message);
    }

    public Page<Message> getMessages(Pageable page) {
        return messageRepository.findAll(page);
    }

    public Page<Message> getUserMessages(String user,Pageable page) {
        User userdb=userService.getByUserName(user);
        return messageRepository.findByUser(userdb,page);
    }
}
