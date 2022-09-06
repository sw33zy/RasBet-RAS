package com.rasbet.rasbet.business.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("notification")
public class Notification{
    @Id
    private Integer id;
    private String description;
    @Column("fk_Gambler_email")
    private String gambler;

    public Integer getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public String getGambler() {
        return gambler;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setGambler(String gambler) {
        this.gambler = gambler;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Notification(String description, String gambler) {
        this.description = description;
        this.gambler = gambler;
    }
}
