package com.strangely.backend.DA.Impl;

import com.strangely.backend.Model.Entities.ID;
import com.strangely.backend.Model.Entities.User;

import java.util.List;
import java.util.Optional;

public interface IUserDAO {
    List<User> findAll();
    User Insert(User user);
    void Delete(int id);
    User find(int id);
    Optional<User> findBy(String value, ID identifyBy);
}
