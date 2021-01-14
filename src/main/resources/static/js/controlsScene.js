export default class ControlsScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'ControlsScene' });
        };
            
    create(){
        this.bg = this.physics.add.sprite(210,160,'controlsBg');
        this.play = this.physics.add.sprite(220,240,'botonJugarNuevo').setScale(0.6).refreshBody();
        
        this.play.alpha = 0.5;
        
        this.play.setInteractive();
        
        //The chat
        this.input.keyboard.on('keydown-C', chat, this);
    };
        
    update(){
        
        this.play.on("pointerover", function(){ this.alpha = 1; });
        this.play.on("pointerout", function(){ this.alpha = 0.5;});
        this.play.on("pointerdown", function(){
            this.scene.scene.stop('ControlsScene');
            this.scene.scene.start('CharScene');
        });
    }
}

function chat(){
    this.scene.pause();
    this.scene.launch('ChatScene', { prev: 'ControlsScene'});
}