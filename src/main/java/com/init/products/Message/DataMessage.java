package com.init.products.Message;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class DataMessage {

    private String address = "records/record.txt";
    
    
    public DataMessage() {
        
    }
    
    public List<Message> getMessage() {
        
        List<Message> list = new ArrayList<Message>();
        
        try {
            
            BufferedReader br = new BufferedReader(new FileReader(address));
            String line;
            while((line = br.readLine()) != null) {
                String[] aux = line.split("#");
                System.out.println(aux[0] + aux[1]);
                Message messageAux = new Message(aux[0],aux[1]);
                list.add(messageAux);
            
        }
            br.close();
        
    }catch (Exception e) {
        System.out.println(e);
    }
    return list;
}
    
    public void setMessage(Message message) {
        
        try {
            
            BufferedWriter file = new BufferedWriter(new FileWriter(address,true));
            file.write(message.getName()+ "#" + message.getMessage() + "\n");
            file.close();
        }catch(IOException e) {
            System.out.println(e);
        }
    }
        
        public String getAddress() {
            return address;
        }
        
        public void setAddress(String address) {
            this.address = address;
        }
            
        
    }
    