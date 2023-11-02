package com.strangely.backend.Service.Impl;

import com.strangely.backend.Model.Entities.Area;

import java.util.List;

public interface ILocationService {
    List<Area> getAllAreas();
    int findNearestArea(double latitude, double longitude);
    String getCityNameById(int id);
}
