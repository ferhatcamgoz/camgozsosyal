package com.sosyalmedya.sosyalmedya.message;

import lombok.Data;

import javax.validation.constraints .Size;

@Data
public class MessageSubmitDTO {
    @Size(min = 1,max = 1000)
    private String content;

    private long fileAttactmentId;
}
