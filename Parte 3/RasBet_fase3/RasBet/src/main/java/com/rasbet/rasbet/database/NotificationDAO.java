package com.rasbet.rasbet.database;

import com.rasbet.rasbet.business.user.Gambler;
import com.rasbet.rasbet.business.user.Notification;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationDAO extends CrudRepository<Notification, Integer> {

    @Query("select n.description " +
            "from gambler g, notification n " +
            "where g.email = :id and n.fk_Gambler_email = g.email")
    List<String> getNotificationsById(@Param("id") String id);
}
