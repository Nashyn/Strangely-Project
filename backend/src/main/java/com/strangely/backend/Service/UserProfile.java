package com.strangely.backend.Service;

import com.strangely.backend.Model.Entities.User;
import com.strangely.backend.Repository.UserRepository;
import com.strangely.backend.Service.Impl.IUserProfile;
import lombok.RequiredArgsConstructor;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@RequiredArgsConstructor
@Service
public class UserProfile implements IUserProfile {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceJPA usj;


    @Override
    public void updateUserProfile(String username, User user) {
        User u = usj.findByUsernameU(username);
        if(u == null)
        {
            return;
        }
        u.setPhone_number(user.getPhone_number());
        u.setFirst_name(user.getFirst_name());
        u.setLast_name(user.getLast_name());
        u.setArea_id(user.getArea_id());
        userRepository.save(u);
    }
}
