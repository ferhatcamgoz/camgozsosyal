package com.sosyalmedya.sosyalmedya.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import com.sosyalmedya.sosyalmedya.util.View;
import lombok.Data;

import java.util.Date;
import java.util.Map;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Apiexception {
    @JsonView(View.Base.class)
    private int status;
    @JsonView(View.Base.class)
    private String message;
    @JsonView(View.Base.class)
    private String path;

    private long date = new Date().getTime();
    private Map<String,String> validateexception;
    public Apiexception(int status, String message, String path) {
        this.status = status;
        this.message = message;
        this.path = path;

    }
}
