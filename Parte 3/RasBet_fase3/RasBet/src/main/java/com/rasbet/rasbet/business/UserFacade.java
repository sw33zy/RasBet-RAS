package com.rasbet.rasbet.business;

import com.rasbet.rasbet.business.user.*;
import com.rasbet.rasbet.database.ExpertDAO;
import com.rasbet.rasbet.database.GamblerDAO;
import com.rasbet.rasbet.database.NotificationDAO;
import com.rasbet.rasbet.database.WalletDAO;
import com.rasbet.rasbet.exceptions.InvalidMoneyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;


@Service
public class UserFacade implements IUserFacade {

    @Autowired
    private ExpertDAO expertDAO;
    @Autowired
    private GamblerDAO gamblerDAO;
    @Autowired
    private WalletDAO walletDAO;
    @Autowired
    private NotificationDAO notificationDAO;
    private Map<String,Float> exchangeRates;
    private Float fee;

    public void setFee(Float fee){
        this.fee = fee;
    }

    public void setExpertAcc(Map<String, String> experts) {

        for (Map.Entry<String, String> expert : experts.entrySet()) {
            try {
                expertDAO.insert(expert.getKey(), String.valueOf(expert.getValue().hashCode()));
            } catch(DuplicateKeyException e){
                System.out.println(e.getMessage());
            }
        }
    }

    public Expert authExpert(String email, String password){
        Optional<Expert> expert = expertDAO.findById(email);
        if(expert.isPresent()){
            if(String.valueOf(password.hashCode()).equals(expert.get().password())){
                return expert.get();
            }
        }
        return null;
    }

    public boolean registerUser(String email, String password, String idDoc) {
        try {
            gamblerDAO.insert(email,String.valueOf(password.hashCode()), idDoc);
            for (String coin : exchangeRates.keySet()){
                walletDAO.insert(email,coin,0);
            }

        } catch(Exception e){
            System.out.println(e.getMessage());
            return false;
        }
        return true;
    }


    public Gambler authUser(String email, String password){
        Optional<Gambler> gambler = gamblerDAO.findById(email);
        if(gambler.isPresent()){
            if(String.valueOf(password.hashCode()).equals(gambler.get().getPassword())){
                return gambler.get();
            }
        }
        return null;
    }

    public void updateUserPassword(String user, String newPassword){
        Optional<Gambler> gambler = gamblerDAO.findById(user);
        String email;
        String doc;
        if(gambler.isPresent()){
            email = gambler.get().getEmail();
            doc = gambler.get().getIddocument();
            Gambler updatedUser = new Gambler(email,String.valueOf(newPassword.hashCode()),doc);
            gamblerDAO.save(updatedUser);
        }
    }

    public void depositMoney(String fk_Gambler_email, float balance, String currency){
        float currbal;
        currbal = walletDAO.getWalletMoney(fk_Gambler_email,currency);
        if(currbal!=-1){
            walletDAO.updateWallet(fk_Gambler_email,currency,currbal+balance);
        }
    }

    public void withdrawMoney(String fk_Gambler_email, Float balance, String currency) throws InvalidMoneyException {
        float currbal;
        currbal = walletDAO.getWalletMoney(fk_Gambler_email,currency);
        if(currbal - balance >= 0){
            walletDAO.updateWallet(fk_Gambler_email,currency,currbal-balance);
        } else throw new InvalidMoneyException();
    }

    public void setCurrencyMap(){
        Map<String,Float> coins = new HashMap<>();
        coins.put("€", 1.00F);
        coins.put("$", 1.13F);
        coins.put("ADA", 0.79F);

        this.exchangeRates = coins;
    }

    public static float round(float d, int decimalPlace) {
        BigDecimal bd = new BigDecimal(Float.toString(d));
        bd = bd.setScale(decimalPlace, RoundingMode.HALF_UP);
        return bd.floatValue();
    }

    public void exchangeMoney(String from, String to, float balance, String user) throws InvalidMoneyException {
        float exchange1 = this.exchangeRates.get(from);
        float exchange2 = this.exchangeRates.get(to);

        float newcoin = round(((exchange2/exchange1)*balance)*(1-fee),2);
        withdrawMoney(user, balance, from);
        depositMoney(user,newcoin,to);
    }

    public List<String> getNotifications(String user){
        return notificationDAO.getNotificationsById(user);
    }

    public List<Wallet> getWallet(String user){
        return  walletDAO.getWallets(user);
    }
}
