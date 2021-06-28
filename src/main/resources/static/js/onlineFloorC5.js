import {BaseGame} from './baseGame.js';
import {game} from './game.js';


//var WSconnection = new WebSocket('ws://localhost:8080/online');

var posX;
var posY;
var constanciaEscenas;

var opened;


export default class OnlineFloorC5 extends BaseGame {
    constructor(){
        super('OnlineFloorC5');
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
        
        super.setCurrentScene('OnlineFloorC5');
        console.log(this.registry.get('oC5'));
        super.restartPos();
        super.resetLevers();
        super.resetRocks();
        if(this.registry.get('oC5') === false){
            super.setHeroAx(180, 60);
            super.setHeroCx(240, 50);
            super.setHeroC(false);
            super.setReward(false, false);
            super.setOpenableDoors(0, -1, -1, -1);
            super.setNumEnemies(0,0,2);
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
        

        if(this.registry.get('p1Arrow') === false){
            opened = false;
            super.closeDoor(2);
        }else{
            opened = true;
            super.openDoor(2);
        }

    }
    update(){
        super.update();           
            
        posX = super.getPosX();
        posY = super.getPosY();
        
        if(posY < 0.5){
			this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oC5', true);
            this.scene.stop('OnlineFloorC5');
            this.scene.start('OnlineFloorB5', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0.5, exitY: 0 });
		}
		
		if(posY > 0.5){
			this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oC5', true);
            this.scene.stop('OnlineFloorC5');
            this.scene.start('OnlineFloorD5', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0.5, exitY: 1 });
		}

        if(opened === false){
            if(this.registry.get('p1Arrow') === true){
				opened = true;
                super.openDoor(2);
			}
        }
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