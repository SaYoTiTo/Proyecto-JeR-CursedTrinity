var enterKey;
var leftKey;
var rightKey;
var upKey;
var downKey;

var selection = 0;

export default class MenuScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'MenuScene' });
        };
            
    create(){
        
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        this.cameras.main.fadeIn(1000,0,0,0);
        
        this.bg = this.physics.add.sprite(210,160,'menuBg').setScale(0.3).refreshBody();
        this.online = this.physics.add.sprite(80,50,'botonOnline').setScale(0.4).refreshBody();
		this.offline = this.physics.add.sprite(340, 50, 'botonOffline').setScale(0.4).refreshBody();
        this.exit = this.physics.add.sprite(30, 300, 'botonSalir').setScale(0.3).refreshBody();
        this.config = this.physics.add.sprite(380, 300, 'botonConfig').setScale(0.3).refreshBody();
        
        this.online.alpha = 0.5;
		this.offline.alpha = 0.5;
        this.exit.alpha = 0.5;
        this.config.alpha = 0.5;
        
        this.online.setInteractive();
		this.offline.setInteractive();
        this.exit.setInteractive();
        this.config.setInteractive();
    };
        
    update(){
        
        if(leftKey.isDown){
            this.exit.alpha = 1;
            this.online.alpha = 0.5;
			this.offline.alpha = 0.5;
            this.config.alpha = 0.5;
            selection = 1;
        }else if(rightKey.isDown){
            this.exit.alpha = 0.5;
            this.online.alpha = 0.5;
			this.offline.alpha = 0.5;
            this.config.alpha = 1;
            selection = 2;
        }else if(upKey.isDown){
            this.exit.alpha = 0.5;
            this.online.alpha = 1;
			this.offline.alpha = 0.5;
            this.config.alpha = 0.5;
            selection = 3;
		}else if(downKey.isDown){
			this.exit.alpha = 0.5;
			this.online.alpha = 0.5;
			this.offline.alpha = 1;
            this.config.alpha = 0.5;
            selection = 4;
        }else if(enterKey.isDown){
            switch(selection){
                case 1:
                    window.close();
                break;
                    
                case 2:
                    this.scene.stop('MenuScene');
                    this.scene.launch('ConfigScene', { prev: 'MenuScene'});
                break;
                    
                case 3:
                    this.scene.stop('MenuScene');
                    this.scene.start('ControlsScene', {type:0});
                break;
				
				case 4:
					this.scene.stop('MenuScene');
					this.scene.start('ControlsScene', {type:1});
            }
        }
        
        this.exit.on("pointerover", function(){ this.alpha = 1; });
        this.exit.on("pointerout", function(){ this.alpha = 0.5;});
        this.exit.on("pointerdown", function(){
            window.close();
        })
        
        this.online.on("pointerover", function(){ this.alpha = 1; });
        this.online.on("pointerout", function(){ this.alpha = 0.5;});
        this.online.on("pointerdown", function(){
            this.scene.scene.stop('MenuScene');
            this.scene.scene.start('ControlsScene', {type:0});
        });
        
		this.offline.on("pointerover", function(){ this.alpha = 1; });
        this.offline.on("pointerout", function(){ this.alpha = 0.5;});
        this.offline.on("pointerdown", function(){
            this.scene.scene.stop('MenuScene');
            this.scene.scene.start('ControlsScene', {type:1});
        });

        this.config.on("pointerover", function(){ this.alpha = 1; });
        this.config.on("pointerout", function(){ this.alpha = 0.5;});
        this.config.on("pointerdown", function(){
            this.scene.scene.stop('MenuScene');
            this.scene.scene.launch('ConfigScene', { prev: 'MenuScene'});
        });
    }
}