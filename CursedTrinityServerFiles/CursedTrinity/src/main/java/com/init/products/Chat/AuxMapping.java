package com.init.products.Chat;

import java.util.List;

import com.init.products.Message.Message;


public class AuxMapping {

    private List<Message> messages;
    private List<String> players;
    
    public AuxMapping() {};
    
    
    public AuxMapping(List<Message> messages, List<String> players) {
        this.messages = messages;
        this.players = players;
    }


    public List<Message> getMessages() {
        return messages;
    }
    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
    public List<String> getPlayers() {
        return players;
    }
    public void setPlayers(List<String> players) {
        this.players = players;
    }
    
}