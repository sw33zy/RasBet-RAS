package com.rasbet.rasbet.business;

import com.rasbet.rasbet.database.NotificationDAO;

public interface Observer {
    String id = "";
    public void update(NotificationDAO notificationDAO, String message);
    public String getId();
}

