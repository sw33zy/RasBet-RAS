package com.rasbet.rasbet.business.user;

import com.rasbet.rasbet.business.DisplayElement;
import com.rasbet.rasbet.business.Observer;
import com.rasbet.rasbet.business.Subject;
import com.rasbet.rasbet.business.bet.Event;
import com.rasbet.rasbet.business.bet.OccorencesRef;
import com.rasbet.rasbet.business.bet.Occurrence;
import com.rasbet.rasbet.database.NotificationDAO;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import java.util.*;

public class Gambler implements Observer, DisplayElement {
    @Id
    private String email;
    private String password;
    private String iddocument;

    public Gambler(String email, String password, String iddocument) {
        this.email = email;
        this.password = password;
        this.iddocument = iddocument;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIddocument() {
        return iddocument;
    }

    public void setIddocument(String iddocument) {
        this.iddocument = iddocument;
    }


    public void display() {

        System.out.println("ID(" + this.email + ") Current Notifications: " );
    }

    public void update(NotificationDAO notificationDAO, String message) {
        notificationDAO.save(new Notification( message, this.email));
        display();
    }

    @Override
    public String getId() {
        return this.email;
    }
}
