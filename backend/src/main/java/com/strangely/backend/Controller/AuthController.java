package com.strangely.backend.Controller;

import com.strangely.backend.Config.AuthProvider;
import com.strangely.backend.Model.DTO.*;
import com.strangely.backend.Model.Entities.Credentials;
import com.strangely.backend.Model.Entities.User;
import com.strangely.backend.Model.ResponseDTO.response;
import com.strangely.backend.Service.Impl.IEmailService;
import com.strangely.backend.Service.Impl.IUserService;
import com.strangely.backend.Service.UserService;
import com.strangely.backend.Service.UserServiceJPA;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import java.net.URI;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class AuthController {

    private final UserService us;
    private final AuthProvider ap;
    private final IEmailService es;
    private final UserServiceJPA usj;


    @PostMapping(value = "/registerSS",consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<UserDTO> register(@RequestBody @Valid SignInDTO sd)
    {
        ResponseEntity response = null;
        sd.setJoiningdate(LocalDateTime.now());
        UserDTO u = us.register(sd);
        u.setToken(ap.createToken(u));
        System.out.println(u);
        ResponseEntity.created(URI.create("/strangely/myaccount/" + u.getUserName()));
        response = ResponseEntity.status(HttpStatus.CREATED).body(u);
        return response;
    }


    @PostMapping(value = "/loginSS",consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<UserDTO> login(@RequestBody @Valid loginDetailsDTO ld)
    {
        ResponseEntity response = null;
        try {
            UserDTO ud = us.login(ld);
            ud.setToken(ap.createToken(ud));
            System.out.println(ud);
            response = ResponseEntity.status(HttpStatus.ACCEPTED).body(ud);
            return response;
        }
        catch (Exception e)
        {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
            return response;
        }

    }

    @PostMapping(value = "/logoutSS",consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity< response> logout(@RequestBody @Valid UserDTO udto)
    {
        ResponseEntity res = null;
        try {
            response r = new response();
            udto.setToken(null);
            System.out.println(udto);

            r.setMessage("logged our successfully");
            res = ResponseEntity.status(HttpStatus.ACCEPTED).body(r+"User details are"+udto);
            return res;
        }
        catch (Exception e)
        {
            res = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
            return res;
        }
    }

    @PostMapping(value = "/user-by-tokenSS", consumes = MediaType.ALL_VALUE)
    @CrossOrigin
    public ResponseEntity<UserDTO> userByToken(@RequestBody @Valid JWTDTO jwt) {
        ResponseEntity response = null;
        try{
            UserDTO ud = ap.getUserByJWT(jwt.JWT());
            System.out.println(ud);
            ud.setToken(jwt.JWT());
            response = ResponseEntity.status(HttpStatus.ACCEPTED).body(ud);
        }
        catch (Exception e)
        {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }

        return response;
    }

    @PostMapping("/resetpasswordSS")
    @CrossOrigin
    public ResponseEntity<RequestDTO> resetPassword(@RequestBody @Valid NewPass np)
    {
        ResponseEntity response = null;

        // Find the user associated with the reset token
        UserDTO ud = us.findByResetToken(np.getResetToken());

        // This should always be non-null, but we check just in case
        if (ud != null) {

            ResetPasswordDTO rp = new ResetPasswordDTO(ud.getUserID(), ud.getEmail(), ud.getPhone_number(), ud.getFirstName(), ud.getLastName(), ud.getJoiningDate(), ud.getAreaId(), ud.getUserName(), np.getNewPassword().toCharArray(),null);

            us.reRegister(rp);
            response = ResponseEntity.status(HttpStatus.OK).body((new RequestDTO("Success(Status Code: 204","Password reset successful")));
            return response;

        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestDTO("Error404","Sorry user not found"));
    }

    @PostMapping("/resetSS")
    @CrossOrigin
    public ResponseEntity<RequestDTO> reset(@RequestBody @Valid Reset rd){
          UserDTO  u = us.findByUsername(rd.getUsername());

        if(u != null){
            u.setResetToken(UUID.randomUUID().toString());

            // Save token to database
            us.Insert(u);

            // Email message
            SimpleMailMessage passwordReset = new SimpleMailMessage();
            passwordReset.setTo(u.getEmail());
            passwordReset.setFrom("rachitgrevq@gmail.com");
            passwordReset.setSubject("Your password reset request");
            passwordReset.setText("To reset your password, click the on link below:\n" + "http://localhost:8080"
                    + "/resetpasswordSS?resetToken=" + u.getResetToken());

            es.sendEmail(passwordReset);

            // Add success message to view
            return ResponseEntity.status(HttpStatus.OK).body(new RequestDTO("Success(Code:200)","A password reset link is shared with " + u.getEmail()));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new RequestDTO("Error","Sorry user not found"));
    }
    @GetMapping("/loginwithgoogle")
    public ResponseEntity home(@AuthenticationPrincipal OAuth2User user) {
        ResponseEntity res = null;
        if(user != null)
        {
            Credentials cd = new Credentials();
            cd.setUsername(user.getName());
            cd.setEmail(user.getName());
            cd.setProvider("GOOGLE");
            res = ResponseEntity.status(HttpStatus.CREATED).body("User is created");
        }
        else
        {
            res = ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user is created");
        }
        return res;
    }


}
