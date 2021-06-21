import {BaseGame} from './baseGame.js';
import {game} from './game.js';

WSconnection = new WebSocket('');

var posX;
var posY;
var constanciaEscenas;


export default class OnlineFloorE3 extends BaseGame {
    constructor(){
        super('OnlineFloorE3');
    }
    
    init(data){
        this.lifeA = data.lifeA;
        this.lifeC = data.lifeC;
        this.arrows = data.arrows;
        this.exitX = data.exitX;
        this.exitY = data.exitY;
    }

    create(){
        this.cameras.main.fadeIn(250,0,0,0);
        
        super.setCurrentScene('OnlineFloorE3');
        console.log(this.registry.get('oE3'));
        super.restartPos();
        super.resetLevers();
        super.resetRocks();
        if(this.registry.get('oE3') === false){
            super.setHeroAx(180, 240);
            super.setHeroCx(240, 230);
            super.setReward(false, false);
            super.setNumEnemies(0,0,0);
            super.setBossDeath(false);
            super.setArrows(4);
            super.resetMusic();
            super.create();
            super.closeDoor(2);
            super.openDoor(0);
			super.openDoor(3);
            
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
            super.setReward(false, false);
            super.setNumEnemies(0,0,0);
            super.setBossDeath(false);
            super.create();
            super.startOpenDoor(0);
			super.startOpenDoor(3);
            super.setHeroALifes(this.lifeA);
            super.setHeroCLifes(this.lifeC);
        }    

        super.heroC.disableBody(true, true);

    }
    update(){
        super.update();           
            
        posX = super.getPosX();
        posY = super.getPosY();
        
        if(posY < 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oE3', true);
            this.scene.stop('OnlineFloorE3');
            this.scene.start('OnlineFloorD3', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0.5, exitY: 0 });
        }
		
		if(posX < 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oE3', true);
            this.scene.stop('OnlineFloorE3');
            this.scene.start('OnlineFloorE2', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0, exitY: 0.5 });
        }
    }
}

function updatePalancas(obj){
    
    //Palancas de Arrow
    this.registry.set('p1Cauldron', obj.p3);
    this.registry.set('p2Cauldron', obj.p4);

}

WSconnection.onmessage = function(msg){
    var obj = JSON.parse(msg.data);

    if(obj.typePetition === 1)
        //Updatear palancas
        updatePalancas(obj);
}