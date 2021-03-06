import {BaseGame} from './baseGame.js';
import {game} from './game.js';

var posX;
var posY;
var constanciaEscenas;


export default class SecondFloorD1 extends BaseGame {
    constructor(){
        super('SecondFloorD1');
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
        
        super.setCurrentScene('SecondFloorD1');
        console.log(this.registry.get('2D1'));
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
        
        if(this.registry.get('2D1') === false){
            super.setHeroAx(180, 240);
            super.setHeroCx(240, 230);
            super.setReward(false, false);
            super.setNumEnemies(0,0,0);
            super.setBossDeath(false);
            super.create();
            super.startOpenDoor(0);
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
        
        if(posY > 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('2D1', true);
            this.scene.stop('SecondFloorD1');
            this.scene.start('SecondFloorD2', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0.5, exitY: 1 });//0.5,1
        }
        if(posY < 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('2D1', true);
            this.scene.stop('SecondFloorD1');
            this.scene.start('ThirdFloorA1', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0.5, exitY: 1 });//0.5,1
        }
    }
}