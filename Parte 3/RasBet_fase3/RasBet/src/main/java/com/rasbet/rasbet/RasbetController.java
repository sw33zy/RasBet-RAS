package com.rasbet.rasbet;



import com.rasbet.rasbet.business.IBetFacade;
import com.rasbet.rasbet.business.IUserFacade;
import com.rasbet.rasbet.business.bet.BetCard;
import com.rasbet.rasbet.business.bet.Element;
import com.rasbet.rasbet.business.bet.Event;
import com.rasbet.rasbet.business.bet.Occurrence;
import com.rasbet.rasbet.business.user.Expert;
import com.rasbet.rasbet.business.user.Gambler;
import com.rasbet.rasbet.business.user.Wallet;
import com.rasbet.rasbet.exceptions.InvalidMoneyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.*;


import java.util.AbstractMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class RasbetController {

    @Autowired
    private IUserFacade userFacade;
    @Autowired
    private IBetFacade betFacade;


    @EventListener(ApplicationReadyEvent.class)
    public void doSomethingAfterStartup() {
        userFacade.setCurrencyMap();
        userFacade.setFee(0.03F);
        Map<String,String> experts = new HashMap<>();
        experts.put("admin1","admin1");
        experts.put("admin2","admin2");
        experts.put("admin3","admin3");

        userFacade.setExpertAcc(experts);
    }

    @RequestMapping("/register/{email}/{password}/{iddoc}")
    public boolean registerUser(@PathVariable String email, @PathVariable String password, @PathVariable String iddoc){
        return userFacade.registerUser(email,password,iddoc);
    }

    @RequestMapping("/loginExpert/{email}/{password}")
    public Expert authExpert(@PathVariable String email, @PathVariable String password) {
        return userFacade.authExpert(email,password);
    }

    @RequestMapping("/login/{email}/{password}")
    public Gambler authUser(@PathVariable String email, @PathVariable String password) {
        return userFacade.authUser(email,password);
    }

    @RequestMapping("/wallets/{email}")
    public List<Wallet> getWallets(@PathVariable String email){
        return userFacade.getWallet(email);
    }

    @RequestMapping("/notifications/{email}")
    public List<String> getNotif(@PathVariable String email){
        return userFacade.getNotifications(email);
    }

    @RequestMapping("/changePassword/{email}/{newPassword}")
    public void updateUserPassword(@PathVariable String email, @PathVariable String newPassword){
        userFacade.updateUserPassword(email,newPassword);
    }

    @RequestMapping("/depositMoney/{email}/{balance}/{currency}")
    public void depositMoney(@PathVariable String email, @PathVariable float balance, @PathVariable String currency){
        userFacade.depositMoney(email,balance,currency);
    }

    @RequestMapping("/withdrawMoney/{email}/{balance}/{currency}")
    public void withdrawMoney(@PathVariable String email, @PathVariable float balance, @PathVariable String currency) throws InvalidMoneyException {
        userFacade.withdrawMoney(email, balance, currency);
    }

    @RequestMapping("/exchangeMoney/{from}/{to}/{balance}/{user}")
    public void exchangeMoney(@PathVariable String from, @PathVariable String to, @PathVariable float balance, @PathVariable String user) throws InvalidMoneyException{
        userFacade.exchangeMoney(from,to,balance,user);
    }

    @RequestMapping(value="/addEvent", method = RequestMethod.POST)
    public Event addEvent(@RequestBody Event event){
        return betFacade.addEvent(event);
    }

    @RequestMapping(value="/addElements", method = RequestMethod.POST)
    public void addElements(@RequestBody List<Element> elements){
        betFacade.addElements(elements);
    }

    @RequestMapping(value="/addOccurrences", method = RequestMethod.POST)
    public void addOccurrences(@RequestBody List<Occurrence> occurrences){
        betFacade.addOccurrences(occurrences);
    }

    @RequestMapping("/endEvent/{event}/{result}")
    public void endEvent(@PathVariable Integer event, @PathVariable String result){
        Map<BetCard,Float> winners = betFacade.endEvent(event,result);
        for(Map.Entry<BetCard,Float> winner : winners.entrySet()){
           float payout = winner.getValue() * winner.getKey().amount();
           userFacade.depositMoney(winner.getKey().gambler(),payout,winner.getKey().currency());
        }
    }

    @RequestMapping("/cancelEvent/{event}")
    public void cancelEvent(@PathVariable Integer event){
        Map<String,AbstractMap.SimpleEntry<String, Float>> refunders = betFacade.cancelEvent(event);
        for(Map.Entry<String,AbstractMap.SimpleEntry<String, Float>> refunder : refunders.entrySet()){
            userFacade.depositMoney(refunder.getKey(),refunder.getValue().getValue(),refunder.getValue().getKey());
        }
    }

    @RequestMapping("/viewBetCardsState/{user}/{state}")
    public List<BetCard> viewBetCardsState(@PathVariable String user, @PathVariable Boolean state){
        return betFacade.viewBetCardsState(user,state);
    }

    @RequestMapping("/listEvents")
    public List<Event> listEvents(){
        return betFacade.listEvents();
    }

    @RequestMapping("/getOccurrences/{event}")
    public List<Occurrence> getOccurrences(@PathVariable Integer event){
        return betFacade.getOccurrences(event);
    }

    @RequestMapping("/getElements/{event}")
    public List<Element> getElements(@PathVariable Integer event){
        return betFacade.getElements(event);
    }

    @RequestMapping(value="/createBetCard/{wager}/{currency}/{gambler}", method = RequestMethod.POST)
    public void createBetCard(@RequestBody List<Integer> bets, @PathVariable Float wager, @PathVariable String currency, @PathVariable String gambler)  throws InvalidMoneyException{
        userFacade.withdrawMoney(gambler,wager,currency);
        betFacade.createBetCard(bets,wager,currency,gambler);
    }

    @RequestMapping("/addFactToEvent/{event}/{description}/{type}")
    public void addFactToEvent(@PathVariable Integer event,@PathVariable String description,@PathVariable String type){
        betFacade.addFactToEvent(event,description,type);
    }

    @RequestMapping("/getOccurrence/{id}")
    public Occurrence getOccurrence(@PathVariable Integer id){
        return betFacade.getOccurrence(id);
    }

    @RequestMapping("/getEvent/{id}")
    public Event getEvent(@PathVariable Integer id){
        return betFacade.getEvent(id);
    }
}
