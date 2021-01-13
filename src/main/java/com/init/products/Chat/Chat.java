package com.init.products.Chat;

import java.util.ArrayList;
import java.util.List;

import com.init.products.Message.DataMessage;


public class Chat {
    
    private String id;
    private int playerCapacity;
    private List<Player> playerList = new ArrayList<Player>();
    private DataMessage record = new DataMessage();
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getPlayerCapacity() {
        return playerCapacity;
    }

    public void setPlayerCapacity(int playerCapacity) {
        this.playerCapacity = playerCapacity;
    }

    public List<Player> getPlayerList() {
        return playerList;
    }


    public void setPlayerList(List<Player> playerList) {
        this.playerList = playerList;
    }


    public DataMessage getRecord() {
        return record;
    }


    public void setRecord(DataMessage record) {
        this.record = record;
    }


    public Player getPlayer(String idP) {
        for(int i = 0; i<playerList.size(); i++) {
            if(playerList.get(i).getId().equals(idP)) {
                return playerList.get(i);
            }
        }
        return null;
        
    }
    
    
    
}