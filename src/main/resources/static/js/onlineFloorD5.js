import {BaseGame} from './baseGame.js';
import {game} from './game.js';

//var WSconnection = new WebSocket('ws://localhost:8080/online');

var posX;
var posY;
var constanciaEscenas;
var pressed = false;


export default class OnlineFloorD5 extends BaseGame {
    constructor(){
        super('OnlineFloorD5');
    }
    
    init(data){
        this.lifeA = data.lifeA;
        this.lifeC = data.lifeC;
        this.arrows = data.arrows;
        this.exitX = data.exitX;
        this.exitY = data.exitY;
    }

    create(){
        //WSconnection = this.registry.get("WSA");
        this.cameras.main.fadeIn(250,0,0,0);
        
        super.setCurrentScene('OnlineFloorD5');
        console.log(this.registry.get('oD5'));
        super.restartPos();
        super.resetLevers();
        super.resetRocks();
        if(this.registry.get('oD5') === false){
            super.setHeroAx(180, 60);
            super.setHeroCx(240, 50);
            super.setHeroC(false);
            super.setReward(false, false);
            super.setOpenableDoors(0, -1, -1, -1);
            super.setNumEnemies(1,0,0);
            super.setBossDeath(false);
            super.create();
            super.closeDoor(0);
            
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
            super.startOpenDoor(0);
            super.setHeroALifes(this.lifeA);
            super.setHeroCLifes(this.lifeC);
        }    

        var groupOnlinePalancas = this.physics.add.staticGroup();
        groupOnlinePalancas.create(210, 160, 'palancaPuerta', 0);
        //this.palanca = this.physics.add.sprite(210, 160, 'palancaPuerta', 0);
        this.physics.add.collider(super.getHeroA(), groupOnlinePalancas, modificarPalanca, null, this);
    }
    update(){
        super.update();           
            
        posX = super.getPosX();
        posY = super.getPosY();
        
        if(posY < 0.5){
			this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oD5', true);
            this.scene.stop('OnlineFloorD5');
            this.scene.start('OnlineFloorC5', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0.5, exitY: 0 });
		}

    }
}

function modificarPalanca(player, palanca){

	if(pressed === false){
	    console.log("Vamos a modificar palancas");
	    this.registry.set('p2Cauldron', true);
	
	
	    //Envio el update de palanca
	    var obj={
	        id:1,
	        typePetition:1,
			quienEs: "0",
	        p1Cauldron:this.registry.get('p1Cauldron'),
	        p2Cauldron:this.registry.get('p2Cauldron')
	    };
		
	    WSconnection.send(JSON.stringify(obj));
		console.log("Objeto enviado");
		pressed = true;
	}
}

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