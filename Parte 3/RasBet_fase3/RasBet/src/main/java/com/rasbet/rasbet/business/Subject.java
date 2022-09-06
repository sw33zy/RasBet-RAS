package com.rasbet.rasbet.business;

import com.rasbet.rasbet.database.NotificationDAO;

import java.util.List;

public interface Subject {
    public void registerObserver(String gambler);
    public void removeObserver(Observer o);
    public void notifyObservers(List<Observer> observers, String msg, NotificationDAO notificationDAO);
}
