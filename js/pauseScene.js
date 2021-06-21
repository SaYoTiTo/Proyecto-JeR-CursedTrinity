var leftKey;
var rightKey;
var enterKey;
var selection = 0;
var prevScene;
var music;

export default class PauseScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'PauseScene' });
        };
        
    init(data){
        prevScene = data.prevScene;
        music = data.music;
    }
    
    create(){
        this.cameras.main.fadeIn(1000,0,0,0);
        
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        this.bg = this.physics.add.sprite(210,160,'pauseBg');
        this.bg.alpha = 0.7;
        
        this.exit = this.physics.add.sprite(30, 300, 'botonSalir').setScale(0.3).refreshBody();
        this.exit.alpha = 0.5;
        
        this.config = this.physics.add.sprite(380, 300, 'botonConfig').setScale(0.3).refreshBody();
        this.config.alpha = 0.5;
        
        this.bg.setInteractive();
        this.exit.setInteractive();
        this.config.setInteractive();
    };
        
    update(){
        //console.log(this.prevScene);
        if(leftKey.isDown){
            this.exit.alpha = 1;
            this.config.alpha = 0.5;
            selection = 1;
        }else if(rightKey.isDown){
            this.exit.alpha = 0.5;
            this.config.alpha = 1;
            selection = 2;
        }else if(enterKey.isDown){
            if(selection == 1){
                this.scene.stop('PauseScene');
                this.scene.stop('BaseGame');
                this.scene.stop(prevScene);
                this.scene.start('MenuScene');
            }else if(selection == 2){
                selection == 0;
                this.config.alpha = 0.5;
                this.scene.stop('PauseScene');
                this.scene.launch('ConfigScene', { prev: 'PauseScene'});
            }
        }
        
        this.bg.on("pointerdown", function(){
            this.scene.scene.stop('PauseScene');
            this.scene.scene.resume(prevScene);
            this.scene.scene.resume('BaseGame');
        });
        
        this.exit.on("pointerover", function(){ this.alpha = 1; });
        this.exit.on("pointerout", function(){ this.alpha = 0.5;});
        this.exit.on("pointerdown", function(){
            this.scene.scene.stop('PauseScene');
            this.scene.scene.stop('BaseGame');
            this.scene.scene.stop(prevScene);
            music.stop();
            this.scene.scene.start('MenuScene');
        })
        
        this.config.on("pointerover", function(){ this.alpha = 1; });
        this.config.on("pointerout", function(){ this.alpha = 0.5;});
        this.config.on("pointerdown", function(){
            this.scene.scene.stop('PauseScene');
            this.scene.scene.launch('ConfigScene', { prev: 'PauseScene'});
        })
    }
}