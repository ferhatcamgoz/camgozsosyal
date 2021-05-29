package com.sosyalmedya.sosyalmedya.message;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 1000)
    @Size(min = 1,max = 1000,message = "{message.validate.size}")
    private String content;

    private Date date ;

    public Message(String content) {
        this.content = content;
        this.date=new Date();

    }
}
