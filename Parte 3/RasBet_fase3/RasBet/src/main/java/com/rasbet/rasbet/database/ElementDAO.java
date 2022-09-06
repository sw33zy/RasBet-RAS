package com.rasbet.rasbet.database;

import com.rasbet.rasbet.business.bet.Element;
import com.rasbet.rasbet.business.bet.Occurrence;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ElementDAO extends CrudRepository<Element, Integer> {

    @Query("select * from element where  fk_Event_id = :fk_Event_id;")
    List<Element> findByEventId(
            @Param("fk_Event_id") Integer fk_Event_id);
}
