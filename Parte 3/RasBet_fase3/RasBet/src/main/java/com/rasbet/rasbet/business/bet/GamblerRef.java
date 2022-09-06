package com.rasbet.rasbet.business.bet;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("gambler_follow_event")
public record GamblerRef (@Id
                          @Column("fk_Gambler_email")
                          String gamblerid){
}

