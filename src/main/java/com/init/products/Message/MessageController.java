package com.init.products.Message;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/message")
public class MessageController {

	private static Map<Long, Message> messages =  new ConcurrentHashMap<>();
	private AtomicLong lastId = new AtomicLong();
	
	@GetMapping("/")
	public Collection<Message> messages() {
		return messages.values();
	}
	
	
	@PostMapping("/")
	@ResponseStatus(HttpStatus.CREATED)
	public Message newMessage(@RequestBody Message mensaje) {
		
		long id = lastId.incrementAndGet();
		mensaje.setId(id);
		mensaje.setName(mensaje.getName());
		messages.put(id, mensaje);
		
		return mensaje;
	}
	
}
