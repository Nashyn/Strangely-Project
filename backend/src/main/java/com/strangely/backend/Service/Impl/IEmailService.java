package com.strangely.backend.Service.Impl;

import org.springframework.mail.SimpleMailMessage;

public interface IEmailService {
    public void sendEmail( SimpleMailMessage email);
}
