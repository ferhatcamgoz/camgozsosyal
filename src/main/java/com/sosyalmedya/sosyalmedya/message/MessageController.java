package com.sosyalmedya.sosyalmedya.message;

import com.sosyalmedya.sosyalmedya.user.User;
import com.sosyalmedya.sosyalmedya.user.UserDTO;
import com.sosyalmedya.sosyalmedya.user.UserService;
import com.sosyalmedya.sosyalmedya.util.CurrnetUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController()
public class MessageController {

    @Autowired
    MessageService messageService;

    @PostMapping("/message")
    public Message postMassege(@Valid @RequestBody Message message, @CurrnetUser User user){
        System.out.println(user);
        message.setUser(user);
        return messageService.postMessage(message,user);
    }
    @GetMapping("/message")
    Page<MessageDTO> getMessages(@PageableDefault(sort = "id",direction = Sort.Direction.DESC) Pageable page){
        return messageService.getMessages(page).map(MessageDTO::new);
    }
    @GetMapping("/user/{user}/message")
    Page<MessageDTO> getUserMessages(@PathVariable String user, @PageableDefault(sort = "id",direction = Sort.Direction.DESC) Pageable page){
        System.out.println("geldimm");
        return messageService.getUserMessages(user,page).map(MessageDTO::new);
    }
}
