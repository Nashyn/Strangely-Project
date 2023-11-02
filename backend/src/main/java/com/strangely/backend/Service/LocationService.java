package com.strangely.backend.Service;
import com.strangely.backend.Model.Entities.Area;
import com.strangely.backend.Repository.AreaRepository;
import com.strangely.backend.Service.Impl.ILocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService implements ILocationService {
    @Autowired
    private AreaRepository areaRepository;

    @Override
    public List<Area> getAllAreas() {
        return areaRepository.findAll();
    }

   @Override
    public int findNearestArea(double latitude, double longitude) {
        List<Area> areas = getAllAreas();

        double minDistance = Double.MAX_VALUE;
        int res = 0;

        for (Area area : areas) {
            double lat2 = area.getLatitude();
            double lon2 = area.getLongitude();

            double distance = getDistance(latitude, longitude, lat2, lon2);

            if (distance < minDistance) {
                minDistance = distance;
                res = area.getAreaId();
            }
        }

        return res;
    }
    private static final double ER = 6371; // Radius of the Earth in kilometers

    private double getDistance(double lat1, double lon1, double lat2, double lon2) {
        lat1 = Math.toRadians(lat1);
        lon1 = Math.toRadians(lon1);
        lat2 = Math.toRadians(lat2);
        lon2 = Math.toRadians(lon2);

        double dLat = lat2 - lat1;
        double dLon = lon2 - lon1;
        double a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLon / 2), 2);
        double c = 2 * Math.asin(Math.sqrt(a));

        double distance = ER * c;

        return distance;
    }

   @Override
   public String getCityNameById(int id) {
        Area a = areaRepository.findByAreaId(id);
        if (a != null) {
            return a.getName();
        } else {
            return "Area not found";
        }
    }
}

