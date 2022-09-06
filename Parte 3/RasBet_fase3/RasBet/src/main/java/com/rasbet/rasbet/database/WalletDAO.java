package com.rasbet.rasbet.database;

import com.rasbet.rasbet.business.user.Wallet;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletDAO extends CrudRepository<Wallet, String> {
    @Modifying
    @Query("insert into wallet (fk_Gambler_email, currency, balance) values (:fk_Gambler_email, :currency, :balance);")
    void insert(@Param("fk_Gambler_email") String fk_Gambler_email,
                @Param("currency") String currency,
                @Param("balance") float balance) throws DuplicateKeyException;

    @Query("select balance from wallet where fk_Gambler_email=:fk_Gambler_email and currency=:currency")
    float getWalletMoney(@Param("fk_Gambler_email") String fk_Gambler_email,
                         @Param("currency") String currency);

    @Modifying
    @Query("update wallet set balance =:balance where fk_Gambler_email=:fk_Gambler_email and currency=:currency")
    void updateWallet(@Param("fk_Gambler_email") String fk_Gambler_email,
                       @Param("currency") String currency,
                       @Param("balance") float balance) throws DuplicateKeyException;

    @Query("select wallet.* from wallet where fk_Gambler_email=:fk_Gambler_email")
    List<Wallet> getWallets(@Param("fk_Gambler_email") String fk_Gambler_email);
}
