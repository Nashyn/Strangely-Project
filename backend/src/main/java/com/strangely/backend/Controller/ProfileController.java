package com.strangely.backend.Controller;

import com.strangely.backend.Mapper.UserMP;
import com.strangely.backend.Model.DTO.UserDTO;
import com.strangely.backend.Model.ResponseDTO.response;
import com.strangely.backend.Model.Entities.User;
import com.strangely.backend.Service.Impl.IUserService;
import com.strangely.backend.Service.UserProfile;
import com.strangely.backend.Service.UserServiceJPA;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@NoArgsConstructor(force = true)
@RestController
@RequestMapping("/strangely")
@CrossOrigin
public class ProfileController {
    @Autowired
    private UserProfile up;
    @Autowired
    private final IUserService us;

    @Autowired
    private final UserServiceJPA usj;

    private final UserMP um;



    public ProfileController(UserProfile up, IUserService us, UserServiceJPA usj, UserMP um) {
        this.up = up;
        this.us = us;
        this.usj = usj;
        this.um = um;
    }

    @GetMapping("/myaccount/{username}")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable String username) {
        ResponseEntity response = null;
        User u = usj.findByUsernameU(username);
        UserDTO ud = um.toUserDTO(u);
        if(ud!=null)
        {
            response = ResponseEntity.status(HttpStatus.OK).body(ud);
        }
        else {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Not Found");
        }
        return response;
    }

    @PutMapping("/update/{username}")
    public ResponseEntity<response> updateUserProfile(@PathVariable String username, @RequestBody User u)
    {
        response r = new response();
        try {
            up.updateUserProfile(username, u);
            r.setMessage("User profile updated successfully");
            return ResponseEntity.status(HttpStatus.OK).body(r);
        }catch (Exception e)
        {
            r.setMessage(e.toString());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(r);
        }

    }


    @GetMapping("/all_users")
    public ResponseEntity<List<UserDTO>> findAll() {

        ResponseEntity response = null;
        try {
            List<UserDTO> lu = us.findAll();
            response = ResponseEntity.status(HttpStatus.OK).body(lu);
        } catch (Exception e)
        {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
        return response;

    }
}
