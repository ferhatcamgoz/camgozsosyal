package com.sosyalmedya.sosyalmedya.message;

import com.sosyalmedya.sosyalmedya.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Long>, JpaSpecificationExecutor<Message> {

    Page<Message> findByUser(User user, Pageable page);

    Page<Message> findByIdLessThan(long id ,Pageable pageable);

    Page<Message> findByIdLessThanAndUser(long id,User user,Pageable pageable);

    long countByIdGreaterThan(long id);

    long countByIdGreaterThanAndUser(long id,User user);

    List<Message> findByIdGreaterThan(long id, Sort sort);

    List<Message> findByIdGreaterThanAndUser(long id,User user, Sort sort);
}
