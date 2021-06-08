package com.sosyalmedya.sosyalmedya.file;

import com.sosyalmedya.sosyalmedya.message.Message;
import com.sosyalmedya.sosyalmedya.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface FileRepository extends JpaRepository<FileAttactment,Long> {


    List<FileAttactment> findByDateBeforeAndMessageIsNull(Date date);

    List<FileAttactment> findByMessageUser(User user);
}
