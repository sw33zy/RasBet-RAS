package com.rasbet.rasbet.database;

import com.rasbet.rasbet.business.user.Gambler;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GamblerDAO extends CrudRepository<Gambler, String> {

    @Modifying
    @Query("insert into gambler (email, password, idDocument) values (:email, :password, :idDocument);")
    void insert(@Param("email") String email,
                @Param("password") String password,
                @Param("idDocument") String idDocument) throws DuplicateKeyException;

}
