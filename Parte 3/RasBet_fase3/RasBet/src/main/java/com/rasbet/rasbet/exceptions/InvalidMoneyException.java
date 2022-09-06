package com.rasbet.rasbet.exceptions;

public class InvalidMoneyException extends Exception {
    public InvalidMoneyException() {
        super("Não possui fundos suficientes!");
    }
}
