package com.sosyalmedya.sosyalmedya.file;

import com.sosyalmedya.sosyalmedya.message.Message;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class FileAttactment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private Date date;

    @OneToOne
    private Message message;
}
