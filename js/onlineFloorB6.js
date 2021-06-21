import {BaseGame} from './baseGame.js';
import {game} from './game.js';

WSconnection = new WebSocket('');

var posX;
var posY;
var constanciaEscenas;


export default class OnlineFloorB6 extends BaseGame {
    constructor(){
        super('OnlineFloorB6');
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
        
        super.setCurrentScene('OnlineFloorB6');
        console.log(this.registry.get('oB6'));
        super.restartPos();
        super.resetLevers();
        super.resetRocks();
        if(this.registry.get('oB6') === false){
            super.setHeroAx(75, 140);
            super.setHeroCx(75, 180);
            super.setReward(false, false);
            super.setOpenableDoors(-1, -1, -1, 3);
            super.setNumEnemies(1,0,0);
            super.setBossDeath(false);
            super.create();
            super.closeDoor(3);
            
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
            super.startOpenDoor(3);
            super.setHeroALifes(this.lifeA);
            super.setHeroCLifes(this.lifeC);
        }    

        //Como somos Cauldron, desactivamos a Arrow
        super.heroA.disableBody(true, true);
        this.palanca = this.physics.add.sprite(210, 160, 'blade', 0);
        super.physics.add.collider(super.heroc, this.palanca, modificarPalanca, null, this);
    }
    update(){
        super.update();           
            
        posX = super.getPosX();
        posY = super.getPosY();
        
        if(posX < 0.5){
			this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oB6', true);
            this.scene.stop('OnlineFloorB6');
            this.scene.start('OnlineFloorB5', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0, exitY: 0.5 });
		}
    }
}

function modificarPalanca(player, palanca){

    this.registry.set('p1Cauldron', true);

    //Envio el update de palanca
    var obj={
        id:1,
        typePetition:1,
        p1:this.registry.get('p1Cauldron'),
        p2:this.registry.get('p2Cauldron')
    }

    WSconnection.send(JSON.stringify(obj));
}

function updatePalancas(obj){
    
    //Palancas de Arrow
    this.registry.set('p1Arrow', obj.p1);
    this.registry.set('p2Arrow', obj.p2);

}

WSconnection.onmessage = function(msg){
    var obj = JSON.parse(msg.data);

    if(obj.typePetition === 1)
        //Updatear palancas
        updatePalancas(obj);
}