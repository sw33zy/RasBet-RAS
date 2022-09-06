package com.rasbet.rasbet.database;

import com.rasbet.rasbet.business.bet.Occurrence;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OccurrenceDAO extends CrudRepository<Occurrence, Integer> {
    @Modifying
    @Query("insert into occurence (id, type, odd, win, fk_Event_id) values (:id, :type, :odd, :win, :fk_Event_id);")
    void insert(@Param("id") String id,
                @Param("type") String type,
                @Param("odd") Float odd,
                @Param("win") Boolean win,
                @Param("fk_Event_id") String fk_Event_id) throws DuplicateKeyException;

    @Query("select * from occurence where  fk_Event_id = :fk_Event_id;")
    List<Occurrence> findByEventId(
                @Param("fk_Event_id") Integer fk_Event_id);

    @Query("select o.* " +
            "from betcard  bc, betcard_occurrences bo, occurence o " +
            "where bc.id = :id and bc.id = bo.bet_card and bo.fk_Occurence_id = o.id")
    List<Occurrence> getOccurrencesByBetCard(@Param("id") Integer id);

    @Query("select o.* " +
            "from occurence o, event e " +
            "where e.id = :id and o.fk_Event_id = e.id")
    List<Occurrence> getOccurrencesByEvent(@Param("id") Integer id);

}
