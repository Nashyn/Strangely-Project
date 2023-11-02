package com.strangely.backend.Service;

import com.strangely.backend.Model.Entities.User;
import com.strangely.backend.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserServiceJPA {


    private final UserRepository ur;

    public UserServiceJPA(UserRepository ur) {
        this.ur = ur;
    }


    public User findByUsernameU(String username) {
        Optional<User> u = ur.findByUsername(username);
        User user = u.orElse(null);
        return user;
    }

    public User findByEmailU(String email) {
        Optional<User> u = ur.findByEmail(email);
        User user = u.orElse(null);
        return user;
    }

    public User findByResetTokenU(String reset_token) {
        Optional<User> u = ur.findByResetToken(reset_token);
        User user = u.orElse(null);
        return user;
    }
}
