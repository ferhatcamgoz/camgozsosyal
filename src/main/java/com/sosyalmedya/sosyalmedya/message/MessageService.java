package com.sosyalmedya.sosyalmedya.message;

import com.sosyalmedya.sosyalmedya.file.FileAttactment;
import com.sosyalmedya.sosyalmedya.file.FileRepository;
import com.sosyalmedya.sosyalmedya.file.FileService;
import com.sosyalmedya.sosyalmedya.user.User;
import com.sosyalmedya.sosyalmedya.user.UserService;
import com.sosyalmedya.sosyalmedya.util.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {

    @Autowired
    MessageRepository messageRepository;
    @Autowired
    UserService userService;

    @Autowired
    FileRepository fileRepository;

    @Autowired
    FileService fileService;

    public void postMessage(MessageSubmitDTO messageSubmitDTO, User user){

        Message message = new Message();
        message.setContent(messageSubmitDTO.getContent());
        message.setDate(new Date());
        message.setUser(user);
       messageRepository.save(message);
      Optional<FileAttactment> optionalFileAttactment= fileRepository.findById(messageSubmitDTO.getFileAttactmentId());

      if(optionalFileAttactment.isPresent()){
            FileAttactment fileAttactment1 = optionalFileAttactment.get();
            fileAttactment1.setMessage(message);
            fileRepository.save(fileAttactment1);
      }
    }

    public Page<Message> getMessages(Pageable page) {
        return messageRepository.findAll(page);
    }

    public Page<Message> getUserMessages(String user,Pageable page) {
        User userdb=userService.getByUserName(user);
        return messageRepository.findByUser(userdb,page);
    }

    public Page<Message> getOldMessages(long id, String user, Pageable pageable) {
        Specification spec = idLessThan(id);
        if(user!=null){
            User indb = userService.getByUserName(user);
            Specification<Message> specUserIs =userIs(indb);
            Specification<Message> specıdanduser=spec.and(specUserIs);
          return messageRepository.findAll(specıdanduser,pageable);

        }

        return messageRepository.findAll(spec,pageable);

    }

    public long getNewMessageCount(long id, String user){
        Specification<Message> specıdanduser=idGreaterThan(id);
        if(user!=null){

            User indb = userService.getByUserName(user);
             specıdanduser=specıdanduser.and(userIs(indb));
        }
        return messageRepository.count(specıdanduser);
    }


    public List<Message> getNewMessages(long id, String user, Sort sort){
        Specification<Message> specıdanduser=idGreaterThan(id);
        if(user!=null){

            User indb = userService.getByUserName(user);
            specıdanduser=specıdanduser.and(userIs(indb));
        }
        return messageRepository.findAll(specıdanduser,sort);
    }

    Specification<Message> idLessThan(long id){
        return new Specification<Message>() {
            @Override
            public Predicate toPredicate(Root<Message> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
               return criteriaBuilder.lessThan(root.get("id"),id );

            }
        };
    }
    Specification<Message> userIs(User user){
        return new Specification<Message>() {
            @Override
            public Predicate toPredicate(Root<Message> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("user"),user );

            }
        };
    }

    Specification<Message> idGreaterThan(long id){
        return new Specification<Message>() {
            @Override
            public Predicate toPredicate(Root<Message> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.greaterThan(root.get("id"),id );

            }
        };
    }

    public void delete(long id) {
        Message message =   messageRepository.getOne(id);
        if(message.getFileAttactment()!=null){
            String fileName=message.getFileAttactment().getName();
            fileService.deleteAttactmentImageFile(fileName);
        }
        messageRepository.deleteById(id);
    }
}
