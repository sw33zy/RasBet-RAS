package com.rasbet.rasbet.business.bet;


import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("occurence")
public class Occurrence {
    @Id
    private Integer id;
    private String type;
    private Float odd;
    @Column("fk_Event_id")
    private Integer event;
    private Boolean win;

    public Occurrence(String type, Float odd, Integer event, Boolean win){
        this.type = type;
        this.odd = odd;
        this.event = event;
        this.win = win;
    }

    public Integer getEvent() {
        return event;
    }

    public Integer getId() {
        return this.id;
    }

    public void setWin(Boolean win) {
        this.win = win;
    }

    public Boolean getWin() {
        return win;
    }

    public String getType() {
        return type;
    }

    public Float getOdd(){
        return this.odd;
    }

    public void setOdd(Float odd) {
        this.odd = odd;
    }
}
