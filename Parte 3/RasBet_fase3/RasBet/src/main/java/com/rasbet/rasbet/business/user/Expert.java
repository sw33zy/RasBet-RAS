package com.rasbet.rasbet.business.user;
import org.springframework.data.annotation.Id;

public record Expert (@Id String email, String password) {

}
