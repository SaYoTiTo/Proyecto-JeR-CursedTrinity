var enterKey;

export default class ControlsScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'ControlsScene' });
        };
            
    create(){
        enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.cameras.main.fadeIn(1000,0,0,0);
        
        this.bg = this.physics.add.sprite(210,160,'controlsBg');
        this.play = this.physics.add.sprite(220,240,'botonJugarNuevo').setScale(0.6).refreshBody();
        
        this.play.alpha = 0.5;
        
        this.play.setInteractive();
    };
        
    update(){
        if(enterKey.isDown){
            this.scene.scene.cameras.main.fadeOut(1000,0,0,0);
            this.scene.stop('ControlsScene');
            this.scene.start('CharScene');
        }
        
        this.play.on("pointerover", function(){ this.alpha = 1; });
        this.play.on("pointerout", function(){ this.alpha = 0.5;});
        this.play.on("pointerdown", function(){
            this.scene.scene.scene.cameras.main.fadeOut(1000,0,0,0);
            this.scene.scene.stop('ControlsScene');
            this.scene.scene.start('CharScene');
        });
    }
}
