package com.init.products.Chat;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.init.products.Message.*;

@RestControllerAdvice
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(value = "/get/")
public class ChatController {

    @Autowired
    ChatService chatService;
    
    @PostMapping()
    public Player newPlayer (@RequestBody String id) {
        return chatService.addPlayer(id);
    }

    @GetMapping("{server}")
    public List<Message> returnRecord(@PathVariable("server") String id){
        return chatService.getMainChat().getRecord().getMessage();//getMessages();
    }

    @PostMapping("{server}")
    public ResponseEntity<Boolean> putMessage(@RequestBody Message message, @PathVariable("server") String id){
        chatService.getMainChat().getRecord().setMessage(message);
        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
    }

    @GetMapping("{server}/{player}") 
    public AuxMapping auxMapping(@PathVariable("server") String idServer, @PathVariable("player") String idPlayer){
        chatService.checkPlayer(idServer, idPlayer);
        chatService.checkPlayers();
        return new AuxMapping(chatService.returnMessages(idServer, idPlayer), chatService.returnPlayers(idServer, idPlayer));
    }
 
    
}