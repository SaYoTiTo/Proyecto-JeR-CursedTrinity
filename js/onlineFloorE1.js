import {BaseGame} from './baseGame.js';
import {game} from './game.js';

var posX;
var posY;
var constanciaEscenas;


export default class OnlineFloorE1 extends BaseGame {
    constructor(){
        super('OnlineFloorE1');
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
        
        super.setCurrentScene('OnlineFloorE1');
        console.log(this.registry.get('oE1'));
        super.restartPos();
        super.resetLevers();
        super.resetRocks();
        if(this.registry.get('oE1') === false){
            super.setHeroAx(345, 140);
            super.setHeroCx(345, 180);
            super.setReward(false, false);
            super.setNumEnemies(1,0,0);
			super.setOpenableDoors(-1, 1, -1, -1);
            super.setBossDeath(false);
            super.create();
            super.closeDoor(1);
            
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
			super.startOpenDoor(1);
            super.setHeroALifes(this.lifeA);
            super.setHeroCLifes(this.lifeC);
        }    

    }
    update(){
        super.update();           
            
        posX = super.getPosX();
        posY = super.getPosY();        
		
		if(posX > 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oE1', true);
            this.scene.stop('OnlineFloorE1');
            this.scene.start('OnlineFloorE2', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 1, exitY: 0.5 });
        }

    }
}