package com.sosyalmedya.sosyalmedya.message;

import com.sosyalmedya.sosyalmedya.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message,Long> {

    Page<Message> findByUser(User user, Pageable page);
}
