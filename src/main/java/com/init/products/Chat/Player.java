package com.init.products.Chat;

public class Player {

    private String id;
    private String chatId;
    private boolean online;
    private boolean checks;
    
    public Player() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String string) {
        this.chatId = string;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }

    public boolean getChecks() {
        return checks;
    }

    public void setChecks(boolean checks) {
        this.checks = checks;
    };
    
    
}