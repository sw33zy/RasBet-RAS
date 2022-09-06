package com.rasbet.rasbet.database;

import com.rasbet.rasbet.business.bet.BetCard;
import com.rasbet.rasbet.business.bet.Event;
import com.rasbet.rasbet.business.user.Gambler;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventDAO extends CrudRepository<Event, Integer> {

    @Query("select g.* " +
            "from gambler g, gambler_follow_event gfe, event e " +
            "where e.id = :id and gfe.event = e.id and gfe.fk_Gambler_email = g.email")
    List<Gambler> getObservers(@Param("id") Integer id);

}
