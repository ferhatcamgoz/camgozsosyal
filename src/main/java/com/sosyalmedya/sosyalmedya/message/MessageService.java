package com.sosyalmedya.sosyalmedya.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    MessageRepository messageRepository;

    public String postMessage(String postmessage){
        Message message= new Message(postmessage);
       return messageRepository.save(message).getContent();
    }

    public Page<Message> getMessages(Pageable page) {
        return messageRepository.findAll(page);
    }
}
