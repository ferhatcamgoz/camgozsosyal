package com.sosyalmedya.sosyalmedya.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class UserDTO {
    private String userName;

    private String nickName;
    private String image;
    public UserDTO(User user){
        this.userName=user.getUsername();
        this.nickName=user.getNickName();
        this.image=user.getImage();
    }

}
