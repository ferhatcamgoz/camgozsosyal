package com.sosyalmedya.sosyalmedya.message;

import com.sosyalmedya.sosyalmedya.user.User;
import com.sosyalmedya.sosyalmedya.user.UserDTO;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Size;
import java.util.Date;
@Data
public class MessageDTO {


    private Long id;
    private String content;
    private long date ;
    private UserDTO userDTO;
    public MessageDTO(Message message){
        this.setId(message.getId());
        this.setContent(message.getContent());
        this.setDate(message.getDate().getTime());
        this.setUserDTO(new UserDTO(message.getUser()));
    }
}
