package com.strangely.backend.Service.Impl;


import com.strangely.backend.Model.DTO.*;
import com.strangely.backend.Model.Entities.User;

import java.util.List;

public interface IUserService {
    List<UserDTO> findAll();
    UserDTO Insert(UserDTO ud);
    void Delete(int id);
    User find(int id);
    UserDTO login(loginDetailsDTO ld);
    UserDTO register(SignInDTO sd);
    UserDTO reRegister(ResetPasswordDTO RP);
    UserDTO findByUsername(String username);
    UserDTO findByEmail(String email);
    UserDTO findByResetToken(String rt);
}
