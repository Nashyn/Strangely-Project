package com.strangely.backend.Controller;

import com.strangely.backend.Model.DTO.AreaIDDTO;
import com.strangely.backend.Model.DTO.LatLongDTO;
import com.strangely.backend.Model.DTO.SignInDTO;
import com.strangely.backend.Model.DTO.UserDTO;
import com.strangely.backend.Model.ResponseDTO.CityDTO;
import com.strangely.backend.Service.Impl.ILocationService;
import com.strangely.backend.Service.LocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController
@CrossOrigin
public class LocationController {

    @Autowired
    private ILocationService ls;

    @GetMapping(value = "/getIdByLatLong", consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<AreaIDDTO> IdByLatLong(@RequestBody @Valid LatLongDTO lld)
    {
        ResponseEntity response = null;
        AreaIDDTO ai = new AreaIDDTO();
        ai.setArea_id(ls.findNearestArea(lld.getLatitude(), lld.getLongitude()));
        if(ai.getArea_id() !=0) {
            response = ResponseEntity.status(HttpStatus.CREATED).body(ai);
            return response;
        }
        else{
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ai);
            return response;

        }
    }
    @RequestMapping(value = "/getCitybyId",consumes = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public ResponseEntity<CityDTO> CityById(@RequestBody @Valid AreaIDDTO id)
    {
        ResponseEntity response = null;
        CityDTO c = new CityDTO();
        c.setCity(ls.getCityNameById(id.getArea_id()));
        if(c.getCity()!= null)
        {
            response = ResponseEntity.status(HttpStatus.OK).body(c);
            return response;
        }
        else {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body(c);
            return response;
        }
    }
}
