package com.rasbet.rasbet.business.bet;
import com.rasbet.rasbet.business.Observer;
import com.rasbet.rasbet.business.Subject;
import com.rasbet.rasbet.database.NotificationDAO;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Table("event")
public class Event implements Subject {
    @Id
    private Integer id;
    private String name;
    private LocalDateTime date;
    private String sport;
    private String state;
    private String description;
    private Set<GamblerRef> observers;


    public Event(String name, LocalDateTime date, String sport, String state, String description) {
        this.name = name;
        this.date = date;
        this.sport = sport;
        this.state = state;
        this.description = description;
    }

    public Set<GamblerRef> getObservers() {
        return observers;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getSport() {
        return sport;
    }

    public void setSport(String sport) {
        this.sport = sport;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getId() {
        return this.id;
    }


    public void registerObserver(String gambler){
        this.observers.add(new GamblerRef(gambler));
    }

    public void removeObserver(Observer o) {
        return;
    }


    public void notifyObservers(List<Observer> observers, String msg, NotificationDAO notificationDAO) {
        for (Observer o : observers){
            o.update(notificationDAO, msg);
        }
    }



}
