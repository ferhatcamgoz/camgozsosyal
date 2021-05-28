package com.sosyalmedya.sosyalmedya.user;

import com.sosyalmedya.sosyalmedya.util.FileType;
import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class UserUpdateDTO {
    @Size(min = 4,max = 255 , message = "{user.create.size}")
    private String nickName;
    @FileType(types = {"png","jpeg"})
    private String image;
}
