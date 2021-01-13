package com.init.products.Message;


public class Message {

    private long id;
    private String name;
    private String message;
    
    public Message() {
        
    }

    public Message(long id, String name, String message) {
        super();
        this.id = id;
        this.name = name;
        this.message = message;
    }
    
    public Message( String name, String message) {
        super();
        this.name = name;
        this.message = message;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return super.toString();
    }
}