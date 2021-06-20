import {BaseGame} from './baseGame.js';
import {game} from './game.js';

var posX;
var posY;
var constanciaEscenas;


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
        this.cameras.main.fadeIn(250,0,0,0);
        
        super.setCurrentScene('OnlineFloorC5');
        console.log(this.registry.get('oC5'));
        super.restartPos();
        super.resetLevers();
        super.resetRocks();
        if(this.registry.get('oC5') === false){
            super.setHeroAx(180, 60);
            super.setHeroCx(240, 50);
            super.setReward(false, false);
            super.setOpenableDoors(0, -1, 2, -1);
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
            super.setReward(false, false);
            super.setNumEnemies(0,0,0);
            super.setBossDeath(false);
            super.create();
			super.startOpenDoor(0);
			super.startOpenDoor(2);
            super.setHeroALifes(this.lifeA);
            super.setHeroCLifes(this.lifeC);
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

    }
}