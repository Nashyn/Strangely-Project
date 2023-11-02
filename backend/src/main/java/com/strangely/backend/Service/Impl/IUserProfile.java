package com.strangely.backend.Service.Impl;

import com.strangely.backend.Model.Entities.User;

public interface IUserProfile {
    void updateUserProfile( String username, User user);
}
