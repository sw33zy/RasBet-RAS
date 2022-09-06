package com.rasbet.rasbet.business.bet;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.List;
import java.util.Set;

@Table("betcard")
public record BetCard(@Id
                      Integer id,
                      @Column("fk_Gambler_email")
                      String gambler,
                      Float amount,
                      @Column("isOver")
                      Boolean isOver,
                      String currency,
                      Set<OccorencesRef> occurrencesIds) {

    public void addOccurrence(Occurrence occurence){
        this.occurrencesIds.add(new OccorencesRef(occurence.getId(), occurence.getOdd()));
    }
}
