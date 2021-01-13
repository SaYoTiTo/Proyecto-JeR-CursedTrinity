package com.init.products.Chat;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;


import javax.swing.Timer;


import org.springframework.stereotype.Component;

import com.init.products.Message.Message;


@Component
public class ChatService {

	private Chat mainChat = new Chat();
	
	
		Timer timer = new Timer(5000, new ActionListener(){
			
	        @Override
	        public void actionPerformed(ActionEvent e) {
	        	for(int i = 0; i<mainChat.getPlayerList().size(); i++) {
	        		Player aux = mainChat.getPlayerList().get(i);
	        		if(aux.getChecks()==true) {
	                	aux.setChecks(false);
	                	aux.setOnline(true);
	                }else{
	                	aux.setOnline(false);
	                }
	        	}
	            
	        }
	    });
	
	
	public ChatService() {
		Random rd = new Random();
		mainChat.setPlayerCapacity(2);
		mainChat.setId("" + (long)(Math.floor(rd.nextDouble()*999999)));
		//mainChat.getRecord().setAddress("records/" + mainChat.getId() + ".txt"); 
		timer.start();
	}


	public Chat getMainChat() {
		return mainChat;
	}


	public void setMainChat(Chat mainChat) {
		this.mainChat = mainChat;
	}

	
	public Player addPlayer(String id) {
	
		for(int i = 0; i<mainChat.getPlayerList().size();i++) {
			if(mainChat.getPlayer(id)!=null) {
				return null;
			}
		}
		
		Player pj = new Player();
		pj.setId(id);
		pj.setChatId(mainChat.getId());
		pj.setOnline(true);
		pj.setChecks(true);
		mainChat.getPlayerList().add(pj);
		return pj;
		
	}

	public void checkPlayers() {
		
		for(int i = 0; i<mainChat.getPlayerList().size(); i++) {
			if(!mainChat.getPlayerList().get(i).isOnline()) {
				mainChat.getPlayerList().remove(i);
			}
		}
	}
	
	
	
	public void checkPlayer(String chatId, String playerId) {
		Player aux = mainChat.getPlayer(playerId);
		if(aux!=null) {
			aux.setChecks(true);
		}
	}
		
	public List<Message> returnMessages(String chatId, String playerId){
		if(!mainChat.getId().equals(chatId)) {
			
			List<Message> aux = new ArrayList<>();
			aux.add(new Message("SERVER", "Invalid Connection"));
			return aux;
		}
		if(mainChat.getPlayer(playerId)!=null) {
			return mainChat.getRecord().getMessage();
		}
		List<Message> aux = new ArrayList<>();
		aux.add(new Message("SERVER", "Invalid Player"));
		return aux;
		
	}
	
	public List<String> returnPlayers(String chatId, String playerId) {
		List<String> aux = new ArrayList<>();
		if(!mainChat.getId().equals(chatId)) {
			aux.add("SERVER " + "Invalid Connection");
			return aux;
		}
		if(mainChat.getPlayer(playerId)!=null) {
			for(int i = 0; i<mainChat.getPlayerList().size(); i++) {
				aux.add(mainChat.getPlayerList().get(i).getId());
			}
			return aux;
		}
		aux.add("SERVER " + "Invalid Connection");
		return aux;
	}
	
	
	
}