package com.rasbet.rasbet.business.bet;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("element")
public class Element {
    @Id
    private Integer id;
    @Column("fk_Event_id")
    private Integer idEvent;
    private String description;

    public Integer getIdEvent() {
        return idEvent;
    }

    public void setIdEvent(Integer idEvent) {
        this.idEvent = idEvent;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Element(Integer idEvent, String description) {
        this.idEvent = idEvent;
        this.description = description;
    }
}
