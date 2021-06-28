package com.init.products;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.init.products.Chat.Player;

public class ManageWS extends TextWebSocketHandler {
	
	private ObjectMapper mapper =  new ObjectMapper();
	
	private static Map<String, PJ> playersOnline = new ConcurrentHashMap<String, PJ>();
	private static Dungeon mazmorra = new Dungeon(false,false,false,false);
	private static boolean esCauldron = false;
	private static boolean esArrow = false;
	

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		JsonNode node = mapper.readTree(message.getPayload());
		int typePetition = node.get("typePetition").asInt();
		//long pId = Long.parseLong(session.getId());
		String pId = session.getId();
		ObjectNode responseNode = mapper.createObjectNode();
		//ObjectNode main = (responseNode);
		String toSendMessage = "Nothing";
		
		System.out.println(session.toString());
		System.out.println("Entrando al switch");
		switch(typePetition) {
			
		
			case 0: //FIRST CONNECTION CLIENT
				//int x = node.get("x").asInt();
				//int x = 0;
				//int y = node.get("y").asInt();
				//int y = 0;
				//int lives = node.get("lives").asInt();
				//int lives = 5;
				//playersOnline.put(pId, new PJ(x, y, lives, pId));
				
				System.out.println("Conectado");
				responseNode.put("typePetition", 0);
				responseNode.putObject("conectado").put("prueba",true);
				//responseNode.put("prueba",true);
				break;
				
			case 1: //UPDATE PALANCAS
				//CAMBIAR
				PJ p = playersOnline.get(node.get("quienEs").asText());
				if(p.getQuienSoy() == 0) {
					mazmorra.setC1((node.get("p1Cauldron").asBoolean()));
					mazmorra.setC2((node.get("p2Cauldron").asBoolean()));
				}else if(p.getQuienSoy() == 1){
					mazmorra.setA1((node.get("p1Arrow").asBoolean()));
					mazmorra.setA2((node.get("p2Arrow").asBoolean()));
				}
				System.out.println("Updateando palancas");
				
				System.out.println(mazmorra.isC1());
				System.out.println(mazmorra.isC2());
				System.out.println(mazmorra.isA1());
				System.out.println(mazmorra.isA2());
				
				responseNode.put("typePetition", 1);
				responseNode.put("A1", mazmorra.isA1()).put("A2", mazmorra.isA2()).put("C1", mazmorra.isC1()).put("C2", mazmorra.isC2());
				//palancaNode.put("A1", mazmorra.isA1()).put("A2", mazmorra.isA2()).put("C1", mazmorra.isC1()).put("C2", mazmorra.isC2());
				System.out.println("Enviando mensaje tipo 1");
				break;
				
			case 2: //UPDATE PLAYER
				//responseNode = node
				PJ pj = playersOnline.get(node.get("quienEs").asText());
				pj.setX((node.get("x").asInt()));
				pj.setY((node.get("y").asInt()));
				pj.setLives(node.get("lives").asInt());
				System.out.println("Updateando jugadores");
				
				
					
				responseNode.put("typePetition", 2);
				responseNode.put("player", pj.getQuienSoy()).put("x", pj.getX()).put("y", pj.getY()).put("lives", pj.getLives());
						//responseNode.put("sala", node.get("sala").asText());
						//playerNode.put("x", p2.getX()).put("y", p2.getY()).put("lives", p2.getLives());
					
				
				System.out.println("Enviando mensaje tipo 2");
				break;
				
			case 3: //ELECCION PERSONAJE (LOCK)
                //ObjectNode mensaje = mapper.createObjectNode();
                //ObjectNode isLocked = null;
				
				//Variables de creacion de personaje
				int x = 0;
				int y = 0;
				int lives = 5;
				
				
				System.out.println("Entrando al case 3");
				responseNode.put("typePetition", 3);
				
                int quienEs = node.get("quienEs").asInt();
                if(quienEs == 0) {
                    if(!esArrow) {
                        esArrow = true;
                        playersOnline.put("0", new PJ(x, y, lives, quienEs, session));
                        //playersOnline.get(pId).setQuienSoy(quienEs);

                    	
                    	//responseNode.put("typePetition", 3);
                    	responseNode.put("isLocked", true);
                        
                        
                        System.out.println("Enviado if1");
                        
                    }else {
                        
                    	//ObjectNode msg3 = (responseNode).putObject("election");
                    	
                    	//responseNode.put("typePetition", 3);
                    	responseNode.put("isLocked", false);
                        //msg3.put("isLocked",false).put("typePetition", 3);
                        
                        System.out.println("Enviado else1");
                        //Devolver algo para que el cliente lo pinte por pantalla
                    }
                } else if(quienEs == 1) {
                    if(!esCauldron) {
                        esCauldron = true;
                        playersOnline.put("1", new PJ(x, y, lives, quienEs, session));
                        
                        responseNode.put("isLocked",true);
                        
                        System.out.println("Enviado if2");
                    }else {
                    	responseNode.put("isLocked",false);
                        
                        System.out.println("Enviado else2");
                        //Devolver algo para que el cliente lo pinte por pantalla
                    }
                }

                break;
			case 5:
                responseNode.put("typePetition", 5);
                break;	
                
			case 10:
				playersOnline.remove(pId);
				break;
				
			default:
				System.out.println(message.getPayload());
		
			}
		
		//SERVER --> CLIENT
	/*for(PJ player : playersOnline.values()) {
		System.out.println(player.toString());
	}*/		
		
		toSendMessage = responseNode.toString();
		System.out.println(toSendMessage);
		
		synchronized (mazmorra) {
			if(typePetition == 3) {
				//Se lo enviamos a todos
				for (Map.Entry<String, PJ> entry : playersOnline.entrySet()) {
					entry.getValue().getSes().sendMessage(new TextMessage(toSendMessage));
				}
			}else {
				//Se lo enviamos solo a los demas
				for (Map.Entry<String, PJ> entry : playersOnline.entrySet()) {
					if(entry.getValue().getSes() != session)
						entry.getValue().getSes().sendMessage(new TextMessage(toSendMessage));
				}
			}
		}
		
		//session.sendMessage(new TextMessage(toSendMessage));
		
	}
	
			
	
	public static void deletePJ(String nickname) {
		for(PJ p : playersOnline.values()) {
			System.out.println("DELETE");
			playersOnline.remove(p.getpId(), p);
		}
	}
	
	
			
}
