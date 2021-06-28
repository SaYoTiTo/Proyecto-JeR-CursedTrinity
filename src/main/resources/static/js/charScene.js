var downKey;
var leftKey;
var rightKey;
var enterKey;
var escKey;
var selection = 0;
var respondido = null;
var quienSoy = null;

var scene;


var WSconnection = new WebSocket('ws://'+ location.host +'/online');


var obj={
	typePetition:0
}
WSconnection.onopen = () => WSconnection.send(JSON.stringify(obj));
    	
export default class CharScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'CharScene' });
        }
            
    create(){
	
		scene = this;
	
		this.registry.set('xOnline', 0);
		this.registry.set('yOnline', 0)
     
		this.registry.set('oA5',false);
		this.registry.set('oB3',false);
		this.registry.set('oB4',false);
		this.registry.set('oB5',false);
		this.registry.set('oB6',false);
		this.registry.set('oC2',false);
		this.registry.set('oC3',false);
		this.registry.set('oC4',false);
		this.registry.set('oC5',false);
		this.registry.set('oD2',false);
		this.registry.set('oD3',false);
		this.registry.set('oD4',false);
		this.registry.set('oD5',false);
		this.registry.set('oE1',false);
		this.registry.set('oE2',false);
		this.registry.set('oE3',false);
		
		this.registry.set('p1Arrow', false)
		this.registry.set('p2Arrow', false)
		this.registry.set('p1Cauldron', false)
		this.registry.set('p2Cauldron', false)
        
        downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
        this.cameras.main.fadeIn(1000,0,0,0);

        this.bg = this.physics.add.sprite(210,160,'charBg').setScale(0.3).refreshBody();
        this.back = this.physics.add.sprite(40, 280, 'botonVolver').setScale(0.3).refreshBody();
        //Jugador
        this.arrow = this.physics.add.sprite(140,55,'arrow').setScale(0.1).refreshBody();
        this.blade = this.physics.add.sprite(280,60,'darkBlade').setScale(0.07).refreshBody();
        this.cauldron = this.physics.add.sprite(210,190,'cauldron').setScale(0.1).refreshBody();

        //Oscurecer personajes
        this.arrow.setInteractive();
        //this.blade.setInteractive();
        this.cauldron.setInteractive();
        this.back.setInteractive();
        this.arrow.alpha = this.cauldron.alpha = this.back.alpha = 0.5;
        
       
    	
    	//Brilla si esta encima
        this.arrow.on("pointerover", function(){this.alpha = 1});
        //this.blade.on("pointerover", function(){this.alpha = 1});
        this.cauldron.on("pointerover", function(){this.alpha = 1});
        this.back.on("pointerover", function(){this.alpha = 1});
        //this.blade.on("pointerout", function(){this.alpha = 0.5});
        this.arrow.on("pointerout", function(){this.alpha = 0.5});
        this.cauldron.on("pointerout", function(){this.alpha = 0.5});
        this.back.on("pointerout", function(){this.alpha = 0.5});
		
		//The chat
		this.input.keyboard.on('keydown-C', chat, this);
		
        this.arrow.on("pointerdown", function(){
            var graphics = this.scene.add.graphics();
            graphics.beginPath(); 
            graphics.moveTo(125.5,151);
            graphics.lineTo(198.75,151);
            graphics.lineTo(198.75,248.75);
            graphics.lineTo(153,248.75);
            graphics.fillStyle(0xFFFFFF, 0.05);
            graphics.closePath();
            graphics.fillPath();  
            
            //this.registry.set("WSA",WSconnection);

            this.depth = 100;
            this.alpha = 1;
            
            quienSoy = 0;
            
            var obj={
				typePetition:3,
				quienEs:0
			}
			
			WSconnection.send(JSON.stringify(obj));
			//while(respondido === null){
			//while(true){

			//}
			
			this.scene.scene.scene.cameras.main.fadeOut(1000,0,0,0);
            
            //this.scene.scene.stop('CharScene');
            //this.scene.scene.start('OnlineFloorA5', 1);
        });
        /*this.blade.on("pointerdown", function(){
            var graphics = this.scene.add.graphics();
            graphics.beginPath(); 
            graphics.moveTo(201.25,151);
            graphics.lineTo(273,151);
            graphics.lineTo(323,248.5);
            graphics.lineTo(201.25,248.5);
            graphics.closePath();
            graphics.fillStyle(0xFFFFFF, 0.05);
            graphics.fillPath();
            this.alpha = 1;
            this.depth = 500;
            this.scene.scene.scene.cameras.main.fadeOut(1000,0,0,0);
            this.scene.scene.stop('CharScene');
            this.scene.scene.start('FirstFloorA1', 2);
        });*/
        this.cauldron.on("pointerdown", function(){
            var graphics = this.scene.add.graphics();
            graphics.beginPath(); 
            graphics.moveTo(200,18.5);
            graphics.lineTo(270,158);
            graphics.lineTo(130,158);
            graphics.closePath();
            graphics.fillStyle(0xFFFFFF, 0.05);
            graphics.fillPath();
            this.alpha = 1;
            this.depth = 500;

            
            quienSoy = 1;
            
            var obj={
				typePetition:3,
				quienEs:1
			}
			
			WSconnection.send(JSON.stringify(obj));
			
            this.scene.scene.scene.cameras.main.fadeOut(1000,0,0,0);
            //this.scene.scene.stop('CharScene');
            //this.scene.scene.start('OnlineFloorE3', 3);
        });
        this.back.on("pointerdown", function(){
            this.scene.scene.scene.cameras.main.fadeOut(1000,0,0,0);
            this.scene.scene.stop('CharScene');
            this.scene.scene.start('MenuScene');
        });
        
        if(leftKey.isDown){
            this.arrow.alpha = 1;
            this.blade.alpha = 0.5;
            this.cauldron.alpha = 0.5;
            this.back.alpha = 0.5;
            selection = 1;
        }        
        if(rightKey.isDown){
            this.arrow.alpha = 0.5;
            this.blade.alpha = 1;
            this.cauldron.alpha = 0.5;
            this.back.alpha = 0.5;
            selection = 2;
        }
        if(downKey.isDown){
            this.arrow.alpha = 0.5;
            this.blade.alpha = 0.5;
            this.cauldron.alpha = 1;
            this.back.alpha = 0.5;
            selection = 3;
        }
        if(escKey.isDown){
            this.arrow.alpha = 0.5;
            this.blade.alpha = 0.5;
            this.cauldron.alpha = 0.5;
            this.back.alpha = 1;
            selection = 4;
        }
        if(enterKey.isDown){
            switch(selection){
                case 0:
                break;
                case 1:
                    this.scene.scene.cameras.main.fadeOut(1000,0,0,0);
                    this.scene.pause('CharScene');
                    //this.scene.start('Floor1', 1);
                    this.scene.start('FirstFloorA1');
                break;
                case 2:
                    this.scene.scene.cameras.main.fadeOut(1000,0,0,0);
                    this.scene.pause('CharScene');
                    //this.scene.start('Floor1', 2);
                    this.scene.start('FirstFloorA1');
                break;
                case 3:
                    this.scene.scene.cameras.main.fadeOut(1000,0,0,0);
                    this.scene.pause('CharScene');
                    //this.scene.start('Floor1', 2);
                    this.scene.start('FirstFloorA1');
                break;
                case 4:
                    this.scene.scene.cameras.main.fadeOut(1000,0,0,0);
                    this.scene.sleep('CharScene');
                    this.scene.start('MenuScene');
                break;
            }                
        }
    		
    		
        }
        
    update(){
		if(respondido != null){
			//this.scene.stop('CharScene');
			console.log("Cambio de escena ");
			if(quienSoy === 0){
				this.scene.start('OnlineFloorA5', 1);
				//this.scene.start('OnlineFloorC4', 1);
			}else if(quienSoy === 1){
				this.scene.start('OnlineFloorE3', 3);
				//this.scene.start('OnlineFloorC2', 3);
			}
		}
		
		if(this.registry.get("p1Cauldron") === true){
			console.log("Palanca accionada");
		}
    }
}

WSconnection.onerror = function(e) {
	console.log("WS error: " + e);
}

WSconnection.onmessage = function(msg){
	console.log("La peticion num de este objeto en cuestion es: " + msg.data);
	console.log("Hola servidor");
	//console.log("WS message: " + msg.data);
	
	var obj = JSON.parse(msg.data);

	console.log("typePetition es " + obj.typePetition);
	
	switch(obj.typePetition){
		
		case 3:
			console.log("Tipo peticion es 3");
			updateSelection(obj);
			break;
		
		case 1:
			console.log("Tipo peticion es 1");
			console.log("Updateando palancas");
    	
			scene.registry.set('p1Cauldron', obj.C1);
    		scene.registry.set('p2Cauldron', obj.C2);

			scene.registry.set('p1Arrow', obj.A1);
    		scene.registry.set('p2Arrow', obj.A2);
			break;
			
		case 2:
			console.log("Tipo peticion 2");
			console.log("movimiento recibido: " + obj.x + " " + obj.y + " " + obj.player + " " + quienSoy.toString());
			if(obj.player  != quienSoy.toString()){
				
				scene.registry.set('xOnline', obj.x);
				scene.registry.set('yOnline', obj.y);
			}
			break;
			
		case 5:
			scene.scene.stop('OnlineFloorC3');
            scene.scene.start('CreditsScene');
            break;


			/*
			xOnlinePlayer = obj.x;
			yOnlinePlayer = obj.y;
			livesOnline = obj.lives;*/
			/*
			if(obj.quienEs === 0){
				//scene.baseGame.heroA = this.physics.add.sprite(obj.x, obj.y, 'heroA', 0);
				//scene.baseGame.setHeroAx(obj.x, obj,y);
				//scene.baseGame.setHeroALifes(obj.lives);
				
			}else if(obj.quienEs === 1){
				//scene.baseGame.heroC = this.physics.add.sprite(obj.x, obj.y, 'heroC', 0);
				scene.baseGame.setHeroCx(obj.x, obj.y);
				scene.baseGame.setHeroCLifes(obj.lives);
			}*/
		
			//Si estan en la misma sala, dibujar al otro en la posicion dada, si no, ocultarlo
			//Crear un sprite en phaser y referenciarlo con una variable global
			//Actica y desactiva el sprite y cambia la posicion
	}
 	
	
}

WSconnection.onclose= function(){
	console.log("Websocket cerrado...");
}
/*
WSconnection.on('message', function incoming(msg){
	console.log("WS message: " + msg.data);
	var obj = JSON.parse(msg.data);

 	if(obj.typePetition === 3)
		//Updatear palancas
		updateSelection(obj);
});
*/
function updateSelection(obj){
	console.log("isLocked es " + obj.isLocked);
	respondido = obj.isLocked;
	/*
	if(obj.isLocked === true){
		respondido = true;
		//return true;
	}else{
		respondido = false;
		//return false;
	}*/
					
		
	if(respondido === false){
		//respondido = null;
		console.log("NO cambio de escena");
		if(quienSoy === 0){
			quienSoy = 1;
		}else if(quienSoy === 1){
			quienSoy = 0;
		}
	}else{
		console.log("Esperando respuesta");
	}
	
	
	
}

function chat(){
    this.scene.pause();
    this.scene.launch('ChatScene', { prev: 'CharScene'});
}