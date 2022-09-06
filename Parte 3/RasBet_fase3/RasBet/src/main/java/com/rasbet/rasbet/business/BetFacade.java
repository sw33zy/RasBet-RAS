package com.rasbet.rasbet.business;

import com.rasbet.rasbet.business.bet.*;
import com.rasbet.rasbet.business.user.Notification;
import com.rasbet.rasbet.database.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BetFacade implements IBetFacade {
    @Autowired
    private BetCardDAO betCardDAO;
    @Autowired
    private OccurrenceDAO occurrenceDAO;
    @Autowired
    private EventDAO eventDAO;
    @Autowired
    private ElementDAO elementDAO;
    @Autowired
    private FactDAO factDAO;
    @Autowired
    private NotificationDAO notificationDAO;

    public void addElements(List<Element> elements){
        elementDAO.saveAll(elements);
    }

    public void addOccurrences(List<Occurrence> occurrences){
        occurrenceDAO.saveAll(occurrences);
    }

    public Event addEvent(Event event){
        return eventDAO.save(event);
    }

    public Map<BetCard,Float> endEvent(Integer event, String result){
        Event ev;
        Optional<Event> isEventPresent = eventDAO.findById(event);
        if(isEventPresent.isPresent()){
            ev = isEventPresent.get();
            ev.setState("finished");
            eventDAO.save(ev);
            interpretResults(ev,result);
            return (checkBetCards(ev));
        }
        return null;
    }

    public boolean endBetcard(BetCard betcard){
        boolean end = true;
        for(String s : betCardDAO.getBetcardState(betcard.id())){
            if(s.equals("pending")){
                end = false;
                break;
            }
        }
        if (end) {
            BetCard updated = new BetCard(betcard.id(),betcard.gambler(), betcard.amount(), true, betcard.currency(), betcard.occurrencesIds());
            betCardDAO.save(updated);
            notificationDAO.save(new Notification("Boletim " + betcard.id() + " terminado!", betcard.gambler()));
        }

        return end;
    }

    public Map<BetCard,Float> checkBetCards(Event event){
        List<BetCard> winners = new ArrayList<>();
        Map<BetCard, Float> result = new HashMap<>();
        List<BetCard> bcs = betCardDAO.getBetcardsByEvent(event.getId());
        for(BetCard bc : bcs){
            if(!bc.isOver())
                if (endBetcard(bc)){
                    if(deliverPrize(bc.id()))
                        winners.add(bc);
                }
        }
        for(BetCard w : winners){
            float multiplier = getBetCardMultiplier(w);
            result.put(w,multiplier);
        }
        return result;
    }

    public boolean deliverPrize(Integer betcard){
        List<Occurrence> ocs = occurrenceDAO.getOccurrencesByBetCard(betcard);
        boolean prize = true;

        for(Occurrence oc : ocs){
            if(!oc.getWin()){
                prize = false;
                break;
            }
        }

        return prize;
    }

    public void interpretFootballResults(Event event, String result){
        int home,away;
        home = Integer.parseInt(result.split("-")[0]);
        away = Integer.parseInt(result.split("-")[1]);

        List<String> facts = new ArrayList<>();
        float diff = home - away;
        float points = home + away;

        if(diff < 0){
            facts.add("2");
        } else {
            if (diff > 0) {
                facts.add("1");
            } else {
                facts.add("X");
            }
        }
        facts.add(factDAO.getIntervalByEvent(event.getId()));

        List<Occurrence> ocs = occurrenceDAO.getOccurrencesByEvent(event.getId());

        for(Occurrence oc : ocs){
            if(oc.getType().contains("+") ||  oc.getType().contains("-")){
                float n = Float.parseFloat(oc.getType().substring(1));
                if(points < n && oc.getType().contains("-")){
                    oc.setWin(true);
                    occurrenceDAO.save(oc);
                } else {
                    if (points > n && oc.getType().contains("+")) {
                        oc.setWin(true);
                        occurrenceDAO.save(oc);
                    }
                }
            }
            if(facts.contains(oc.getType())){
                oc.setWin(true);
                occurrenceDAO.save(oc);
            }
        }
    }

    private void interpretBasketballResults(Event event, String result) {
        int home,away;
        home = Integer.parseInt(result.split("-")[0]);
        away = Integer.parseInt(result.split("-")[1]);

        List<String> facts = new ArrayList<>();
        float diff = home - away;
        float points = home + away;

        if(diff < 0){
            facts.add("2");
        } else {
            if (diff > 0) {
                facts.add("1");
            } else {
                facts.add("X");
            }
        }

        facts.addAll(factDAO.getIntervalByEvent2(event.getId()));

        List<Occurrence> ocs = occurrenceDAO.getOccurrencesByEvent(event.getId());

        for(Occurrence oc : ocs){
            if(oc.getType().contains("+") ||  oc.getType().contains("-")){
                float n = Float.parseFloat(oc.getType().substring(1));
                if(points < n && oc.getType().contains("-")){
                    oc.setWin(true);
                    occurrenceDAO.save(oc);
                } else {
                    if (points > n && oc.getType().contains("+")) {
                        oc.setWin(true);
                        occurrenceDAO.save(oc);
                    }
                }
            }
            if(facts.contains(oc.getType())){
                oc.setWin(true);
                occurrenceDAO.save(oc);
            }
        }
    }

    private void interpretMMAResults(Event event, String result) {
        String winType, winner;
        int rounds;

        winner  = result.split("-")[0];
        winType = result.split("-")[1];
        rounds  = Integer.parseInt(result.split("-")[2]);

        List<String> facts = new ArrayList<>();

        facts.add(winner);
        facts.add(winType);

        List<Occurrence> ocs = occurrenceDAO.getOccurrencesByEvent(event.getId());

        for (Occurrence oc : ocs) {
            if(oc.getType().contains("+") ||  oc.getType().contains("-")) {
                float n = Float.parseFloat(oc.getType().substring(1));

                if (rounds < n && oc.getType().contains("-")) {
                    oc.setWin(true);
                    occurrenceDAO.save(oc);
                } else {
                    if (rounds > n && oc.getType().contains("+")) {
                        oc.setWin(true);
                        occurrenceDAO.save(oc);
                    }
                }
            }
            if(facts.contains(oc.getType())){
                    oc.setWin(true);
                    occurrenceDAO.save(oc);
            }
        }
    }

    public void interpretResults(Event event, String result){
       String sport = event.getSport();
        switch (sport) {
            case ("futebol") -> interpretFootballResults(event, result);
            case ("basket") -> interpretBasketballResults(event, result);
            case ("mma") -> interpretMMAResults(event, result);
        }
    }

    public Map<String,AbstractMap.SimpleEntry<String, Float>> cancelEvent(Integer event){
        Optional<Event> isEvent = eventDAO.findById(event);
        Map<String,AbstractMap.SimpleEntry<String, Float>> refundedList = new HashMap<>();
        if(isEvent.isPresent()){
            Event ev = isEvent.get();
            ev.setState("canceled");
            eventDAO.save(ev);

            List<BetCard> bcs = betCardDAO.getBetcardsByEvent2(event);
            for(BetCard bc :bcs){
                List <Occurrence> occurrences = occurrenceDAO.getOccurrencesByBetCard(bc.id());

                occurrences.removeIf(oc -> Objects.equals(oc.getEvent(), event));

                if(occurrences.size()==0){
                    refundedList.put(bc.gambler(),new AbstractMap.SimpleEntry<>(bc.currency(), bc.amount()));
                    betCardDAO.delete(bc);
                }
                else{
                    Set<OccorencesRef> bets = new HashSet<>();
                    BetCard newBc = new BetCard(bc.id(), bc.gambler(), bc.amount(), bc.isOver(), bc.currency(), bets);
                    occurrences.forEach(newBc::addOccurrence);

                    betCardDAO.save(newBc);
                }
            }
        }
        return refundedList;
    }

    public List<BetCard> viewBetCardsState(String user, Boolean state){
        List<BetCard> betcards = betCardDAO.findByGamblerId(user);
        List<BetCard> finished = new ArrayList<>();

        for(BetCard b : betcards){
            if(b.isOver()==state){
                finished.add(b);
            }
        }

        return finished;
    }

    public List<Event> listEvents(){
        List<Event> events = new ArrayList<>();
        eventDAO.findAll().forEach(e -> {if(e.getState().equals("pending")) events.add(e);});
        return events;
    }

    public void dinamicOddUpdate(Occurrence occorrence){
        int eventID = occorrence.getEvent();
        Optional<Event> isEvent = eventDAO.findById(eventID);
        String sport = "";
        if(isEvent.isPresent()) {
            Event event = isEvent.get();
            sport = event.getSport();
        }
        List<Occurrence> occurrences = occurrenceDAO.getOccurrencesByEvent(occorrence.getEvent());
        List<String> takefrom = new ArrayList<>();

        switch (sport) {
            case ("futebol") -> takefrom = footballOddCalculator(occorrence);
            case ("basket") -> takefrom = basketballOddCalculator(occorrence);
            case ("mma") -> takefrom = mmaOddCalculator(occorrence);
        }

        float ODD_FACTOR = 0.001f;
        occorrence.setOdd(occorrence.getOdd()- ODD_FACTOR);
        occurrenceDAO.save(occorrence);
        for(String take : takefrom){
            for(Occurrence value : occurrences) {
                if (value.getType().equals(take)) {
                    value.setOdd(value.getOdd() + (ODD_FACTOR / takefrom.size()));
                    occurrenceDAO.save(value);
                    break;
                }
            }
        }
    }

    private List<String> mmaOddCalculator(Occurrence occorrence) {
        String type = occorrence.getType();
        String N = type.substring(1);
        if(type.contains("+")) type="+";
        if(type.contains("-")) type="-";

        List<String> winTypes = new ArrayList<>(Arrays.asList("KO", "P", "S", "TKO", "D"));

        if (winTypes.contains(type)){
            winTypes.remove(type);
            return winTypes;

        } else {
            List<String> takefrom = new ArrayList<>();
            switch (type) {
                case ("1") -> takefrom.add("2");
                case ("2") -> takefrom.add("1");
                case ("+") -> takefrom.add("-" + N);
                case ("-") -> takefrom.add("+" + N);
            }
        return takefrom;
        }
    }

    private List<String> basketballOddCalculator(Occurrence occorrence) {
        String type = occorrence.getType();
        String N = "";

        if (type.contains("+") || type.contains("-")) {
            N = type.substring(1);
            type = type.substring(0,1);
        }

        if (type.contains("I")) {
            N = type.substring(2);
            type = type.substring(0,2);
        }

        List<String> takefrom = new ArrayList<>();
        switch (type) {
            case ("1") -> takefrom.add("2");
            case ("2") -> takefrom.add("1");
            case ("1I") -> {
                takefrom.add("2I" + N);
                takefrom.add("XI" + N);
            }
            case ("2I") -> {
                takefrom.add("XI" + N);
                takefrom.add("1I" + N);
            }
            case ("XI") -> {
                takefrom.add("1I" + N);
                takefrom.add("2I" + N);
            }
            case ("+") -> takefrom.add("-" + N);
            case ("-") -> takefrom.add("+" + N);
        }

        return takefrom;
    }

    public List<String> footballOddCalculator(Occurrence occorrence){
        String type = occorrence.getType();
        String N = type.substring(1);
        if(type.contains("+")) type="+";
        if(type.contains("-")) type="-";

        List<String> takefrom = new ArrayList<>();
        switch (type) {
            case ("1") -> {
                takefrom.add("X");
                takefrom.add("2");
            }
            case ("2") -> {
                takefrom.add("X");
                takefrom.add("1");
            }
            case ("X") -> {
                takefrom.add("1");
                takefrom.add("2");
            }
            case ("1I") -> {
                takefrom.add("2I");
                takefrom.add("XI");
            }
            case ("2I") -> {
                takefrom.add("XI");
                takefrom.add("1I");
            }
            case ("XI") -> {
                takefrom.add("1I");
                takefrom.add("2I");
            }
            case ("+") -> takefrom.add("-" + N);
            case ("-") -> takefrom.add("+" + N);
        }

        return takefrom;
    }

    public void createBetCard(List<Integer> bets, Float wager, String currency, String gambler){
        Set<OccorencesRef> occ = new HashSet<>();
        BetCard bc = new BetCard(null,gambler,wager,false,currency,occ);

        Set<Integer> events = new HashSet<>();
        Iterable<Occurrence> occurrences = occurrenceDAO.findAllById(bets);
        occurrences.forEach(value -> {
                            bc.addOccurrence(value);
                            events.add(value.getEvent());
                            dinamicOddUpdate(value);
                            });

        for(Integer e : events){
            Optional<Event> isEvent = eventDAO.findById(e);
            if(isEvent.isPresent()){
                Event ev = isEvent.get();
                ev.registerObserver(gambler);
                eventDAO.save(ev);
            }
        }

        betCardDAO.save(bc);
    }

    public void addFactToEvent(Integer event, String description, String type){
        Fact fact = new Fact(description,event, type);
        factDAO.save(fact);

        Optional<Event> isEvent = eventDAO.findById(event);
        if(isEvent.isPresent()){
            Event ev = isEvent.get();
            List<Observer> observers = new ArrayList<>(eventDAO.getObservers(event));
            ev.notifyObservers(observers, ev.getName() + " " + type + ": " + description , notificationDAO);

        }

    }

    public float getBetCardMultiplier(BetCard betcard){
        float multiplier = 1;
        for(OccorencesRef o : betcard.occurrencesIds()){
            multiplier *= o.moment_odd();
        }
        return multiplier;
    }

    public List<Element> getElements(Integer event){
        return elementDAO.findByEventId(event);
    }

    public List<Occurrence> getOccurrences (Integer event) { return occurrenceDAO.getOccurrencesByEvent(event);}

    public Occurrence getOccurrence (Integer id) { return occurrenceDAO.findById(id).get();}

    public Event getEvent (Integer id) { return eventDAO.findById(id).get();}

}
