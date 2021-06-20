var downKey;
var leftKey;
var rightKey;
var enterKey;
var escKey;
var selection = 0;

export default class CharScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'CharScene' });
        }
            
    create(){
        this.registry.set('A1',false);
        this.registry.set('A2',false);
        this.registry.set('B2',false);
        this.registry.set('C1',false);
        this.registry.set('C2',false);
        
        this.registry.set('2A2',false);
        this.registry.set('2A3',false);
        this.registry.set('2B2',false);
        this.registry.set('2C2',false);
        this.registry.set('2C3',false);
        this.registry.set('2D1',false);
        this.registry.set('2D2',false);
        this.registry.set('2E2',false);
        
        this.registry.set('3A1',false);
		
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
        this.blade = this.physics.add.sprite(280,60,'blade').setScale(0.07).refreshBody();
        this.cauldron = this.physics.add.sprite(210,190,'cauldron').setScale(0.1).refreshBody();

        //Oscurecer personajes
        this.arrow.setInteractive();
        this.blade.setInteractive();
        this.cauldron.setInteractive();
        this.back.setInteractive();
        this.arrow.alpha = this.blade.alpha = this.cauldron.alpha = this.back.alpha = 0.5;
        }
        
    update(){
        //Brilla si esta encima
        this.arrow.on("pointerover", function(){this.alpha = 1});
        this.blade.on("pointerover", function(){this.alpha = 1});
        this.cauldron.on("pointerover", function(){this.alpha = 1});
        this.back.on("pointerover", function(){this.alpha = 1});
        this.blade.on("pointerout", function(){this.alpha = 0.5});
        this.arrow.on("pointerout", function(){this.alpha = 0.5});
        this.cauldron.on("pointerout", function(){this.alpha = 0.5});
        this.back.on("pointerout", function(){this.alpha = 0.5});

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
            this.depth = 100;
            this.alpha = 1;
            this.scene.scene.scene.cameras.main.fadeOut(1000,0,0,0);
            this.scene.scene.stop('CharScene');
            this.scene.scene.start('FirstFloorA1', 1);
        });
        this.blade.on("pointerdown", function(){
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
        });
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
            this.scene.scene.scene.cameras.main.fadeOut(1000,0,0,0);
            this.scene.scene.stop('CharScene');
            this.scene.scene.start('FirstFloorA1', 3);
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
                    this.scene.stop('CharScene');
                    //this.scene.start('Floor1', 1);
                    this.scene.start('FirstFloorA1');
                break;
                case 2:
                    this.scene.scene.cameras.main.fadeOut(1000,0,0,0);
                    this.scene.stop('CharScene');
                    //this.scene.start('Floor1', 2);
                    this.scene.start('FirstFloorA1');
                break;
                case 3:
                    this.scene.scene.cameras.main.fadeOut(1000,0,0,0);
                    this.scene.stop('CharScene');
                    //this.scene.start('Floor1', 2);
                    this.scene.start('FirstFloorA1');
                break;
                case 4:
                    this.scene.scene.cameras.main.fadeOut(1000,0,0,0);
                    this.scene.stop('CharScene');
                    this.scene.start('MenuScene');
                break;
            }                
        }
    }
}
