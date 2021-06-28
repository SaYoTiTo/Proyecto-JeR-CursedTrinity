import {BaseGame} from './baseGame.js';
import {game} from './game.js';

var posX;
var posY;
var constanciaEscenas;
var sala = 0;
var chara;
var scene


export default class OnlineFloorC3 extends BaseGame {
    constructor(){
        super('OnlineFloorC3');
    }
    
    init(data){
	
        this.lifeA = data.lifeA;
        this.lifeC = data.lifeC;
        this.arrows = data.arrows;
        this.exitX = data.exitX;
        this.exitY = data.exitY;
		this.char = data.char;
		chara = this.char; 
    }

    create(){
		scene = this;
        this.cameras.main.fadeIn(250,0,0,0);

		this.alcachofa = null;
		
		this.dummy = this.physics.add.sprite(210, 160, 'dummy', 0);
		this.dummy.depth = 101;
		
		if(this.char === "0"){
			this.alcachofa = this.physics.add.sprite(50, 50, 'heroC', 0);
		}else{
			this.alcachofa = this.physics.add.sprite(50, 50, 'heroA', 0);
		}
        
		this.alcachofa.depth = 100;
		 
		this.intervaloMensajes = window.setInterval(sendJugadores, 100);

        super.setCurrentScene('OnlineFloorC3');
        console.log(this.registry.get('oC3'));
        super.restartPos();
        super.resetLevers();
        super.resetRocks();
		//super.heroA(true);
		super.setHeroA(true);
		super.setHeroC(true);
		//super.heroC(true);
        if(this.registry.get('oC3') === false){
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
            super.setOpenableDoors(0, -1, -1, -1);
            super.setNumEnemies(0,0,0);
            super.setBossDeath(false);
            super.create();
			super.closeDoor(1);
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
            super.setReward(true, false);
            super.setNumEnemies(0,0,0);
            super.setBossDeath(false);
            super.create();
			super.startOpenDoor(0);
            super.setHeroALifes(this.lifeA);
            super.setHeroCLifes(this.lifeC);
        }    
		console.log("Este personaje es: " + this.char);
		if(this.char === "0"){
			//super.disableHeroC(true);
			super.disableChar(1);
			this.physics.add.collider(super.getHeroA(), this.dummy, endGame, null, this);
		}else if(this.char === "1"){
			//super.disableHeroA(true);
			super.disableChar(0);
			this.physics.add.collider(super.getHeroC(), this.dummy, endGame, null, this);
		}

    }
    update(){
        super.update();           
            
        posX = super.getPosX();
        posY = super.getPosY();
		
		this.alcachofa.x = this.registry.get('xOnline');
		this.alcachofa.y = this.registry.get('yOnline');
		
		console.log("movimiento actualizado: " + this.alcachofa.x + " " + this.alcachofa.y);
		if(posY < 0.5){
            this.cameras.main.fadeOut(250,0,0,0);
            this.registry.set('oC3', true);
            this.scene.stop('OnlineFloorC3');
            this.scene.start('OnlineFloorB3', 
                             { lifeA: super.getHeroALifes(), lifeC: super.getHeroCLifes(), arrows: super.getArrows(), exitX: 0.5, exitY: 0 });
        }
	
		

    }
}

function sendJugadores(){

console.log("Jugadores juntos, renderizamos");
console.log(chara);
if(scene.char === "0"){
	var posicion = scene.getHeroAPos();
	console.log(posicion);
	console.log("Creando objeto Arrow")
	var obj={
			x: posicion[0],
			y: posicion[1],
			lives: scene.getHeroALifes(),
	        id: 1,
	        typePetition:2,
			quienEs: scene.char
	    };
		
		
	   
} else if(chara === "1"){
	
	var posicion = scene.getHeroCPos();
	console.log(posicion);
	console.log("Creando objeto Cauldron")
	var obj={
			x: posicion[0],
			y: posicion[1],
			lives: scene.getHeroCLifes(),
	        id: 1,
	        typePetition:2,
			quienEs: chara
	    };
}
	    //Envio el update de palanca
	    
		console.log(JSON.stringify(obj))
	    WSconnection.send(JSON.stringify(obj));
		console.log("Objeto enviado");
		
	
}

function updatePalancas(obj){
	console.log("Updateando palancas");
    //Palancas de Arrow
    if(obj.id === 0){
		scene.registry.set('p1.Cauldron', obj.C1);
		scene.registry.set('p2.Cauldron', obj.C2);
	}else{	
		scene.registry.set('p1Arrow', obj.A1);
	    scene.registry.set('p2Arrow', obj.A2);
	}

}

function endGame(){
    console.log("Se acabo");
    var obj={
        typePetition:5,
    }

    WSconnection.send(JSON.stringify(obj));
}

function print(){
	console.log("Chocando con Blade");
}

WSconnection.onmessage = function(msg){
    var obj = JSON.parse(msg.data);

    if(obj.typePetition === 1)
        //Updatear palancas
        updatePalancas(obj);
}