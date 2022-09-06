package com.rasbet.rasbet.database;

import com.rasbet.rasbet.business.bet.BetCard;
import com.rasbet.rasbet.business.bet.Occurrence;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BetCardDAO extends CrudRepository<BetCard, Integer> {
    @Query("select * from betcard where  fk_Gambler_email = :fk_Gambler_email;")
    List<BetCard> findByGamblerId(
            @Param("fk_Gambler_email") String fk_Gambler_email);

    @Query("select e.state " +
            "from betcard  bc, betcard_occurrences bo, occurence o, event e " +
            "where bc.id = :id and bc.id = bo.bet_card and bo.fk_Occurence_id = o.id and o.fk_Event_id = e.id")
    List<String> getBetcardState(@Param("id") Integer id);

    @Query("select bc.* " +
            "from betcard bc, betcard_occurrences bo, occurence o, event e " +
            "where e.id = :id and bc.id = bo.bet_card and bo.fk_Occurence_id = o.id and o.fk_Event_id = e.id group by bc.fk_Gambler_email")
    List<BetCard> getBetcardsByEvent(@Param("id") Integer id);

    @Query("select bc.* " +
            "from betcard bc, betcard_occurrences bo, occurence o, event e " +
            "where e.id = :id and bc.id = bo.bet_card and bo.fk_Occurence_id = o.id and o.fk_Event_id = e.id")
    List<BetCard> getBetcardsByEvent2(@Param("id") Integer id);

    @Query("select count(o.type) " +
            "from betcard bc, betcard_occurrences bo, occurence o, event e " +
            "where e.id = :id and o.type=:type and bc.id = bo.bet_card and bo.fk_Occurence_id = o.id and o.fk_Event_id = e.id")
    Integer getNrBetsByType(@Param("type") String type, @Param("id") Integer id);





}
