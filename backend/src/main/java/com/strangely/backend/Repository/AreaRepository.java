package com.strangely.backend.Repository;

import com.strangely.backend.Model.Entities.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {
    Area findByAreaId(int areaId);
}

