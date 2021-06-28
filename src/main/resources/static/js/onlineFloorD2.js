import {BaseGame} from './baseGame.js';
import {game} from './game.js';

//var WSconnection = new WebSocket('ws://localhost:8080/online');

var posX;
var posY;
var constanciaEscenas;

var opened = false;

export default class OnlineFloorD2 extends BaseGame {
    constructor(){
        super('OnlineFloorD2');
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
        
        super.setCurrentScene('OnlineFloorD2');
        console.log(this.registry.get('oD2'));
        super.restartPos();
        super.resetLevers();
        super.resetRocks();
        
        super.setNormalRock(120.5, 67.5);
        super.setNormalRock(120.5, 93.5);
        super.setNormalRock(120.5, 119.5);
        super.setNormalRock(120.5, 145.5);
        super.setNormalRock(120.5, 171.5);
        super.setNormalRock(156.5, 171.5);
        super.setPuzzleRock(192.5, 171.5);
        super.setPuzzleRock(228.5, 145.5);
        super.setNormalRock(120.5, 197.5);          
            
        super.setPuzzleRock(156.5, 93.5);
        super.setNormalRock(192.5, 93.5);
        super.setNormalRock(228.5, 93.5);
        super.setNormalRock(264.5, 93.5);
        super.setNormalRock(300.5, 93.5);
            
        super.setPuzzleRock(300.5, 67.5);
        super.setNormalRock(300.5, 119.5);
        super.setNormalRock(300.5, 145.5);
        super.setNormalRock(300.5, 171.5);
        super.setNormalRock(300.5, 197.5);
        super.setPuzzleRock(264.5, 197.5);
		
        if(this.registry.get('oD2') === false){
            super.setHeroAx(180, 240);
            super.setHeroCx(240, 230);
            super.setHeroA(false);
            super.setReward(false, false);
            super.setNumEnemies(0,0,0);
			super.setOpenableDoors(-1, -1, -1, -1);
            super.setBossDeath(false);
            super.create();
            //super.startOpenDoor(0);
			super.startOpenDoor(2);
            
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
			super.startOpenDoor(2);
            super.setHeroALifes(this.lifeA);
            super.setHeroCLifes(this.lifeC);
        }
        

        if(this.registry.get('p2Cauldron') === false){
            opened = false;
            super.closeDoor(0);
        }else{
            opened = true;
            super.openDoor(0);
        }

    }
    update(){
        super.update();           
            
        posX = super.getPosX();
        posY = super.getPosY();        
		
		if(posY < 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oD2', true);
            this.scene.stop('OnlineFloorD2');
            this.scene.start('OnlineFloorC2', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0.5, exitY: 0 });
        }
		
		if(posY > 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oD2', true);
            this.scene.stop('OnlineFloorD2');
            this.scene.start('OnlineFloorE2', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0.5, exitY: 1 });
        }

        //Comprobamos las puertas
        if(opened === false){
            if(this.registry.get('p2Cauldron') === true){
				opened = true;
				super.openDoor(0);
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