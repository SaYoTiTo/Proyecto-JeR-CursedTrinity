import {BaseGame} from './baseGame.js';
import {game} from './game.js';

//WSconnection = this.registry.get("WSC");
//var WSconnection = new WebSocket('ws://localhost:8080/online');

var posX;
var posY;
var constanciaEscenas;
var opened = false;

export default class OnlineFloorE2 extends BaseGame {
    constructor(){
        super('OnlineFloorE2');
    }
    
    init(data){
        this.lifeA = data.lifeA;
        this.lifeC = data.lifeC;
        this.arrows = data.arrows;
        this.exitX = data.exitX;
        this.exitY = data.exitY;
    }

    create(){

        //WSconnection = this.registry.get("WSC");

        this.cameras.main.fadeIn(250,0,0,0);
        
        super.setCurrentScene('OnlineFloorE2');
        console.log(this.registry.get('oE2'));
        super.restartPos();
        super.resetLevers();
        super.resetRocks();
        if(this.registry.get('oE2') === false){
            super.setHeroAx(345, 140);
            super.setHeroCx(345, 180);
            super.setHeroA(false);
            super.setReward(false, false);
            super.setNumEnemies(0,2,0);
			super.setOpenableDoors(0, 1, -1, -1);
            super.setBossDeath(false);
            super.create();
            super.closeDoor(1);
			//super.closeDoor(3);
            
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
            super.setHeroA(false);
            super.setReward(false, false);
            super.setNumEnemies(0,0,0);
            super.setBossDeath(false);
            super.create();
            super.startOpenDoor(0);
			super.startOpenDoor(1);
            super.setHeroALifes(this.lifeA);
            super.setHeroCLifes(this.lifeC);
        }   

		console.log(this.registry.get('p1Cauldron'));
		console.log(this.registry.get('p2Cauldron'));

        if(this.registry.get('p1Cauldron') === false){
            opened = false;
            super.closeDoor(3);
        }else{
            opened = true;
            super.openDoor(3);
        }
    }
    update(){
        super.update();           
            
        posX = super.getPosX();
        posY = super.getPosY();        
		
		if(posX < 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oE2', true);
            this.scene.stop('OnlineFloorE2');
            this.scene.start('OnlineFloorE1', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0, exitY: 0.5 });
        }
		
		if(posX > 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oE2', true);
            this.scene.stop('OnlineFloorE2');
            this.scene.start('OnlineFloorE3', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 1, exitY: 0.5 });
        }
		
		if(posY < 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oE2', true);
            this.scene.stop('OnlineFloorE2');
            this.scene.start('OnlineFloorD2', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0.5, exitY: 0 });
        }

        if(opened === false){
            if(this.registry.get('p1Cauldron') === true){
				opened = true;
				super.openDoor(3);
			}
        }
    }
}

function updatePalancas(obj){
	console.log("Updateando palancas");
    //Palancas de Cauldron
	scene.registry.set('p1Cauldron', obj.C1);
    scene.registry.set('p2Cauldron', obj.C2);
}

WSconnection.onmessage = function(msg){
    var obj = JSON.parse(msg.data);

    if(obj.typePetition === 1)
        //Updatear palancas
        updatePalancas(obj);

}