package com.rasbet.rasbet.business;

import com.rasbet.rasbet.business.user.Expert;
import com.rasbet.rasbet.business.user.Gambler;
import com.rasbet.rasbet.business.user.Wallet;
import com.rasbet.rasbet.exceptions.InvalidMoneyException;
import org.springframework.dao.DuplicateKeyException;

import java.util.List;
import java.util.Map;

public interface IUserFacade {
    void setFee(Float fee);
    void setExpertAcc(Map<String, String> experts) throws DuplicateKeyException;
    Expert authExpert(String email, String password);
    boolean registerUser(String email, String password, String idDoc);
    Gambler authUser(String email, String password);
    void updateUserPassword(String user, String newPassword);
    void depositMoney(String fk_Gambler_email, float balance, String currency);
    void withdrawMoney(String fk_Gambler_email, Float balance, String currency) throws InvalidMoneyException;
    void setCurrencyMap();
    void exchangeMoney(String from, String to, float balance, String user) throws InvalidMoneyException;
    List<String> getNotifications(String user);
    List<Wallet> getWallet(String user);
}
