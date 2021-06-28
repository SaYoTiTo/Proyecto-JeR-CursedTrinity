import {BaseGame} from './baseGame.js';
import {game} from './game.js';

var posX;
var posY;
var constanciaEscenas;


export default class ThirdFloorA1 extends BaseGame {
    constructor(){
        super('ThirdFloorA1');
    }
    
    init(data){
        this.lifeA = data.lifeA;
        this.lifeC = data.lifeC;
        this.arrows = data.arrows;
        this.exitX = data.exitX;
        this.exitY = data.exitY;
    }

    create(){
        console.log("Existo");
        this.cameras.main.fadeIn(250,0,0,0);
        
        super.setCurrentScene('ThirdFloorA1');

        super.restartPos();
        super.resetLevers();
        super.resetRocks();
        if(this.registry.get('3A1') === false){
            super.setHeroAx(180, 240);
            super.setHeroCx(240, 230);
            super.setReward(false, false);
            super.setNumEnemies(0,0,0);
            super.setBossDeath(true);
            super.setOpenableDoors(0, -1, -1, -1);
            super.setArrows(4);
            super.create();
            super.closeDoor(2);
            
            if(this.lifeA <= 0){
                super.setHeroALifes(1);
            }else{
                super.setHeroALifes(this.lifeA);
            }
            
            if(this.lifeC <= 0){
                super.setHeroCLifes(1);
            }else{
                super.setHeroCLifes(this.lifeC);
            }
            
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
            this.registry.set('3A1', true);
            this.scene.stop('ThirdFloorA1');
            this.scene.start('CreditsScene');
        }
    }
}