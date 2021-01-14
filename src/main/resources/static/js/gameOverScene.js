export default class GameOverScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'GameOverScene' });
        };
            
    create(){
        this.bg = this.physics.add.sprite(210,160,'gameOverBg');
        this.play = this.physics.add.sprite(220,280,'botonVolverNuevo').setScale(0.6).refreshBody();
        this.exit = this.physics.add.sprite(30, 300, 'botonSalirNuevo').setScale(0.3).refreshBody();
        
        this.play.alpha = 0.5;
        this.exit.alpha = 0.5;
        
        this.play.setInteractive();
        this.exit.setInteractive();
        
        //The chat
        this.input.keyboard.on('keydown-C', chat, this);
    };
        
    update(){
        
        this.exit.on("pointerover", function(){ this.alpha = 1; });
        this.exit.on("pointerout", function(){ this.alpha = 0.5;});
        this.exit.on("pointerdown", function(){
            window.close();
        })
        
        this.play.on("pointerover", function(){ this.alpha = 1; });
        this.play.on("pointerout", function(){ this.alpha = 0.5;});
        this.play.on("pointerdown", function(){
            this.scene.scene.stop('GameOverScene');
            this.scene.scene.start('ControlsScene');
        });
    }
}

function chat(){
    this.scene.pause();
    this.scene.launch('ChatScene', { prev: 'GameOverScene'});
}