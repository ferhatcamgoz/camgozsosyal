package com.sosyalmedya.sosyalmedya.message;

import com.sosyalmedya.sosyalmedya.user.User;
import com.sosyalmedya.sosyalmedya.user.UserDTO;
import com.sosyalmedya.sosyalmedya.user.UserService;
import com.sosyalmedya.sosyalmedya.util.CurrnetUser;
import com.sosyalmedya.sosyalmedya.util.GenericResponse;
import com.sun.xml.bind.v2.runtime.output.SAXOutput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController()
public class MessageController {

    @Autowired
    MessageService messageService;

    @PostMapping("/message")
    public MessageSubmitDTO postMassege(@Valid @RequestBody MessageSubmitDTO message, @CurrnetUser User user){

        messageService.postMessage(message,user);
        return message;
    }
    @GetMapping("/message")
    Page<MessageDTO> getMessages(@PageableDefault(sort = "id",direction = Sort.Direction.DESC) Pageable page){
        System.out.println("arada geldi");
        return messageService.getMessages(page).map(MessageDTO::new);
    }
    @GetMapping({"/message/{id:[0-9]+}","/user/{user}/message/{id:[0-9]+}"})
    ResponseEntity<?> getMessagesRelative(@PageableDefault(sort = "id",direction = Sort.Direction.DESC) Pageable page,
                                                   @PathVariable Long id,
                                          @PathVariable(required = false) String user,
                                          @RequestParam(name = "count",required = false,defaultValue = "false") boolean count,
                                                    @RequestParam(name = "direction",defaultValue = "before") String direction
                                          ){
        if(count){
            long newMessageCount = messageService.getNewMessageCount(id,user);
            Map<String, Long> response = new HashMap<>();
            response.put("count",newMessageCount);

            return ResponseEntity.ok(response);
        }
        if(direction.equals("after")){
            List<Message> newMessages=messageService.getNewMessages(id,user,page.getSort());
            List<MessageDTO> messageDTOList=newMessages.stream().map(MessageDTO::new).collect(Collectors.toList());
            System.out.println("after geldi");
            return ResponseEntity.ok(messageDTOList);
        }
        return ResponseEntity.ok(messageService.getOldMessages(id,user,page).map(MessageDTO::new));
    }
    @GetMapping("/user/{user}/message")
    Page<MessageDTO> getUserMessages(@PathVariable String user, @PageableDefault(sort = "id",direction = Sort.Direction.DESC) Pageable page){
        System.out.println("geldimm");
        return messageService.getUserMessages(user,page).map(MessageDTO::new);
    }

    @DeleteMapping("/message/{id:[0-9]+}")
     @PreAuthorize("@messageSecurityService.authorizationControl(#id,principal)")
    GenericResponse deleteMessage(@PathVariable long id){
         messageService.delete(id);
        return new GenericResponse("delete complate");
    }


}
