package com.rasbet.rasbet.database;

import com.rasbet.rasbet.business.user.Expert;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpertDAO extends CrudRepository<Expert, String> {

    @Modifying
    @Query("insert into expert (email, password) values (:email, :password);")
    void insert(@Param("email") String email, @Param("password") String password) throws DuplicateKeyException;
}
