package com.sosyalmedya.sosyalmedya.message;

import com.sosyalmedya.sosyalmedya.file.FileAttactment;
import com.sosyalmedya.sosyalmedya.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000)
    @Size(min = 1,max = 1000,message = "{message.validate.size}")
    private String content;

    private Date date ;

    @ManyToOne
    private User user;

    @OneToOne(mappedBy ="message",cascade = CascadeType.REMOVE)
    private FileAttactment fileAttactment;

    public Message(String content) {
        this.content = content;
        this.date=new Date();

    }
}
