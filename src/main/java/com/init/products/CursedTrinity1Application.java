package com.init.products;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@Configuration
@EnableWebSocket
public class CursedTrinity1Application implements WebSocketConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(CursedTrinity1Application.class, args);
	}
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(onlineHandler(), "/online")
			.setAllowedOrigins("*");
	}
	
	@Bean
	public ManageWS onlineHandler() {
		return new ManageWS();
	}
	

}
