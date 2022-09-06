package com.rasbet.rasbet.business.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("wallet")
public record Wallet ( @Column("fk_Gambler_email") String user, @Id String currency, float balance) { }


