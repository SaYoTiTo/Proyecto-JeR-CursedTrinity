import {BaseGame} from './baseGame.js';
import {game} from './game.js';

//var WSconnection = new WebSocket(this.registry.get("WSA"));
//WSconnection = new WebSocket('ws://'+ location.host +'/online');

//if(this.registry.get('oA5') === false){
//}

var posX;
var posY;
var constanciaEscenas;


export default class OnlineFloorA5 extends BaseGame {
    constructor(){
        super('OnlineFloorA5');
    }

    
    init(data){
        
        this.lifeA = data.lifeA;
        this.lifeC = data.lifeC;
        this.arrows = data.arrows;
        this.exitX = data.exitX;
        this.exitY = data.exitY;
    }

    create(){

        //WSconnection = new WebSocket();
		//WSconnection = this.registry.get("WSA")
		console.log(this.registry.get("WSA"));    

        this.cameras.main.fadeIn(250,0,0,0);
        
        super.setCurrentScene('OnlineFloorA5');
        console.log(this.registry.get('oA5'));
        super.restartPos();
        super.resetLevers();
        super.resetRocks();
        if(this.registry.get('oA5') === false){
            super.setHeroAx(180, 60);
            super.setHeroCx(240, 50);
            super.setHeroC(false);
            super.setReward(false, false);
            super.setNumEnemies(0,0,0);
            super.setBossDeath(false);
            //super.setArrows(4);
            super.setArrows(4);
            super.resetMusic();
            super.create();
            super.closeDoor(0);
            super.openDoor(2);
            
            super.setHeroALifes(this.lifeA);
            super.setHeroCLifes(this.lifeC);
            
        }else{
            if(this.exitX > 0.5){
                super.setHeroAx(75, 140);
                super.setHeroCx(75, 180);
            }else if(this.exitX < 0.5){
                super.setHeroAx(345, 140);
                super.setHeroCx(345, 180);
            }
            if(this.exitY > 0.5){
                super.setHeroAx(180, 60);
                super.setHeroCx(240, 50);
            }else if(this.exitY < 0.5){
                super.setHeroAx(180, 240);
                super.setHeroCx(240, 230);
            }
            super.setHeroC(false);
            super.setReward(false, false);
            super.setNumEnemies(0,0,0);
            super.setBossDeath(false);
            super.create();
            super.startOpenDoor(2);
            super.setHeroALifes(this.lifeA);
            super.setHeroCLifes(this.lifeC);
        }

        //super.heroA.disableBody(true, true);
		

 

    }

    update(){
		
        super.update();           
            
		
        posX = super.getPosX();
        posY = super.getPosY();
        
        if(posY > 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oA5', true);
            this.scene.stop('OnlineFloorA5');
            this.scene.start('OnlineFloorB5', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0.5, exitY: 1 });
        //super.heroA.enabled(false);
        }

    //WSconnection.send(JSON.stringify(obj));

    }
}

/* function modificarPalanca(player, palanca){

	console.log("Vamos a modificar palancas");
    //this.registry.set('p1Cauldron', true);

    //Envio el update de palanca
    /*var obj={
        id:1,
        typePetition:1,
        p1:this.registry.get('p1Cauldron'),
        p2:this.registry.get('p2Cauldron')
    }
	
	var a = "Morcilla";//JSON.stringify(obj);
	console.log("Objeto creado: " + a);
	

    WSconnection.send(a);
	console.log("Mensaje enviado al servidor");
}*/

function updatePalancas(obj){
	console.log("Updateando palancas");
    //Palancas de Arrow
	scene.registry.set('p1Arrow', obj.A1);
    scene.registry.set('p2Arrow', obj.A2);

}

WSconnection.onmessage = function(msg){
    var obj = JSON.parse(msg.data);

    if(obj.typePetition === 1)
	    //Updatear palancas
	    updatePalancas(obj);
}