export default class MenuScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'MenuScene' });
        };
            
    create(){       
        this.bg = this.physics.add.sprite(210,160,'menuBg').setScale(0.3).refreshBody();
        this.play = this.physics.add.sprite(220,280,'botonJugar').setScale(0.6).refreshBody();
        this.exit = this.physics.add.sprite(30, 300, 'botonSalir').setScale(0.3).refreshBody();
        
        this.play.alpha = 0.5;
        this.exit.alpha = 0.5;
        
        this.play.setInteractive();
        this.exit.setInteractive();
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
            this.scene.scene.stop('MenuScene');
            this.scene.scene.start('ControlsScene');
        });
    }
}