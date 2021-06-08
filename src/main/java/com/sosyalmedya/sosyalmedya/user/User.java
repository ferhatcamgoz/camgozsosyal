package com.sosyalmedya.sosyalmedya.user;


import com.fasterxml.jackson.annotation.JsonView;
import com.sosyalmedya.sosyalmedya.message.Message;
import com.sosyalmedya.sosyalmedya.util.View;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Collection;
import java.util.List;

@Data
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    @NotBlank(message = " {user.blank}")
    @Size(min = 4,max = 255, message = "{user.create.size}")
    @UniqeUserName(message = "{user.username.uniqe}")
    @JsonView(View.Base.class)
    private String userName;

    @NotBlank(message = " {user.blank}")
    @Size(min = 4,max = 255 , message = "{user.create.size}")
    @JsonView(View.Base.class)
    private String nickName;
    @NotBlank(message = " {user.blank}")
    @Size(min = 4,max = 255 , message = "{user.create.size}")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{user.password.pattern}")
    private String password;
    @JsonView(View.Base.class)
    private String image;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Message> messageList;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList("Role_user");
    }


    public String getUserName() {
        return this.userName;
    }
    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", userName='" + userName + '\'' +
                ", nickName='" + nickName + '\'' +
                ", password='" + password + '\'' +
                ", image='" + image + '\'' +
                ", messageList=" + messageList +
                '}';
    }
}
