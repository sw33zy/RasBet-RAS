package com.rasbet.rasbet.business.bet;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("fact")
public class Fact{
    @Id
    private Integer id;
    private String description;
    @Column("fk_Event_id")
    private Integer idEvent;
    private String type;

    public Fact(String description, Integer idEvent, String type) {
        this.type = type;
        this.description = description;
        this.idEvent = idEvent;


    }
}
