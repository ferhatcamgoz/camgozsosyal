package com.sosyalmedya.sosyalmedya.message;

import com.sosyalmedya.sosyalmedya.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController()
public class MessageController {

    @Autowired
    MessageService messageService;


    @PostMapping("/message")
    public String postMassege(@Valid @RequestBody Message message){
        return messageService.postMessage(message.getContent());
    }
    @GetMapping("/message")
    Page<Message> getMessages(@PageableDefault(sort = "id",direction = Sort.Direction.DESC) Pageable page){
        return messageService.getMessages(page);
    }
}
