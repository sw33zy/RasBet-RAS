package com.rasbet.rasbet.business.bet;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("betcard_occurrences")
public record OccorencesRef(@Id
                            @Column("fk_Occurence_id")
                            Integer occorenceid,
                            Float moment_odd
                            ) {
}
