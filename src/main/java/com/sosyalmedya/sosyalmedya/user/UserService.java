package com.sosyalmedya.sosyalmedya.user;



import com.sosyalmedya.sosyalmedya.exception.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    PasswordEncoder passwordEncoder;
    UserService(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userRepository=userRepository;
        this.passwordEncoder = passwordEncoder;
    }

  public void save(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
       userRepository.save(user);
    }
    public Page<User> getUsers(Pageable page,User user){
        if(user!=null){
            return  userRepository.findByUserNameNot(user.getUsername(),page);
        }
        return userRepository.findAll(page);

    }

    public User getByUserName(String userName) {
        User user =userRepository.findByUserName(userName);
        if(user==null){
            throw  new NotFoundException();
        }
        return user;
    }

    public User updateUser(UserNickName userNickName, String userName) {
        User user= getByUserName(userName);
        user.setNickName(userNickName.getNickName());
        return userRepository.save(user);
    }
}
