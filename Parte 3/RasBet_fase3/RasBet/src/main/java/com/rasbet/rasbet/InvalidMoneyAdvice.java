package com.rasbet.rasbet;


import com.rasbet.rasbet.exceptions.InvalidMoneyException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class InvalidMoneyAdvice {

    @ResponseBody
    @ExceptionHandler(InvalidMoneyException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    String InvalidMoneyExceptionHandler(InvalidMoneyException ex) {
        return ex.getMessage();
    }
}
