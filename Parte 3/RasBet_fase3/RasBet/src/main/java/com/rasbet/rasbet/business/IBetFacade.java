package com.rasbet.rasbet.business;

import com.rasbet.rasbet.business.bet.BetCard;
import com.rasbet.rasbet.business.bet.Element;
import com.rasbet.rasbet.business.bet.Event;
import com.rasbet.rasbet.business.bet.Occurrence;

import java.util.AbstractMap;
import java.util.List;
import java.util.Map;

public interface IBetFacade {
    void addElements(List<Element> elements);
    void addOccurrences(List<Occurrence> occurrences);
    Event addEvent(Event event);
    Map<BetCard,Float> endEvent(Integer event, String result);
    List<BetCard> viewBetCardsState(String user, Boolean state);
    List<Event> listEvents();
    void createBetCard(List<Integer> bets, Float wager, String currency, String gambler);
    void addFactToEvent(Integer event, String description, String type);
    float getBetCardMultiplier(BetCard betcard);
    Map<String, AbstractMap.SimpleEntry<String, Float>> cancelEvent(Integer event);
    List<Element> getElements(Integer event);
    List<Occurrence> getOccurrences (Integer event);
    Occurrence getOccurrence (Integer id);
    Event getEvent (Integer id);
}
