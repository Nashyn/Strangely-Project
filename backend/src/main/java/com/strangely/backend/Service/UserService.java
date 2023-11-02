package com.strangely.backend.Service;

import com.strangely.backend.DA.UserDAO;
import com.strangely.backend.Mapper.UserMP;
import com.strangely.backend.Model.DTO.*;
import com.strangely.backend.Model.Entities.ID;
import com.strangely.backend.Model.Entities.User;
import com.strangely.backend.Repository.UserRepository;
import com.strangely.backend.Service.Impl.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {
    private UserDAO udao;
    private PasswordEncoder pe;

    private UserServiceJPA usj;


    @Autowired
    public UserService(UserDAO userDAO, UserServiceJPA usj) {

        this.udao = userDAO;
        this.pe = new BCryptPasswordEncoder();
        this.usj = usj;
    }

    @Override
    public List<UserDTO> findAll() {
        return UserMP.toUserDtos(udao.findAll());
    }

    @Override
    @Transactional
    public UserDTO Insert(UserDTO ud) {
        User user = udao.Insert(UserMP.toUser(ud));
        return UserMP.toUserDTO(user);
    }

    @Override
    @Transactional
    public void Delete(int id)
    {
        udao.Delete(id);
    }

    @Override
    public User find(int id)
    {
        return udao.find(id);
    }

    @Override
    public UserDTO login(loginDetailsDTO ld) {
        User u = usj.findByUsernameU(ld.username());
        if(u != null)
        {
            if (pe.matches(CharBuffer.wrap(ld.password()), u.getPassword())) {
                return UserMP.toUserDTO(u);
            }
            throw new Restexception("Wrong password Please Try Again", HttpStatus.BAD_REQUEST);
        }
        else {
            throw new Restexception("user not identified", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public UserDTO register(SignInDTO sd) {
      Optional<User> ou= Optional.ofNullable(usj.findByUsernameU(sd.getUsername()));

       if (ou != null && ou.isPresent()) {
          throw new Restexception("Username already exists in the server please try new one", HttpStatus.BAD_REQUEST);
       }

        User user = UserMP.signInToUser(sd);
        user.setPassword(pe.encode(CharBuffer.wrap(sd.getPassword())));

        User u = udao.Insert(user);

        return UserMP.toUserDTO(u);
    }

    @Override
    public UserDTO reRegister(ResetPasswordDTO RP) {
        User user = UserMP.resetPasswordToUser(RP);
        user.setPassword(pe.encode(CharBuffer.wrap(RP.password())));
        User u = udao.Insert(user);
        return UserMP.toUserDTO(u);
    }

    @Override
    public UserDTO findByUsername(String un) {
        Optional<User> u = udao.findBy(un, ID.Username);

        if (u.isPresent()) {
            return UserMP.toUserDTO(u.get());
        } else {
            return null;
        }
    }

    @Override
    public UserDTO findByEmail(String email) {
        Optional<User> u = udao.findBy(email,ID.Email);

        if (u.isPresent()) {
            return UserMP.toUserDTO(u.get());
        } else {
            return null;
        }
    }

    @Override
    public UserDTO findByResetToken(String resetToken) {
        Optional<User> u = udao.findBy(resetToken,ID.ResetToken);

        if (u.isPresent()) {
            return UserMP.toUserDTO(u.get());
        } else {
            return null;
        }
    }





}
