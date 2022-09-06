package com.rasbet.rasbet.database;

import com.rasbet.rasbet.business.bet.Fact;
import com.rasbet.rasbet.business.bet.Occurrence;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FactDAO extends CrudRepository<Fact, Integer> {

    @Query("select f.type " +
            "from fact f, event e " +
            "where e.id = :id and f.fk_Event_id = e.id and (f.type='1I' or f.type ='XI' or f.type = '2I')")
    String getIntervalByEvent(@Param("id") Integer id);

    @Query("select f.type " +
            "from fact f, event e " +
            "where e.id = :id and f.fk_Event_id = e.id and (f.type='1I1' or f.type ='XI1' or f.type = '2I1' or f.type='1I2' or f.type ='XI2' or f.type = '2I2' or f.type='1I3' or f.type ='XI3' or f.type = '2I3')")
    List<String> getIntervalByEvent2(@Param("id") Integer id);
}
