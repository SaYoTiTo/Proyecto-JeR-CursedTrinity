export default class CreditsScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'CreditsScene' });
        };
            
    create(){
        this.cameras.main.fadeIn(1000,0,0,0);
        
        this.credits = this.add.video(210,160,'credits');
        this.credits.play(false);
            
        this.credits.setInteractive();
    };
        
    update(){
        
        this.credits.on("pointerdown", function(){
            this.scene.scene.stop('CreditsScene');
            this.scene.scene.start('MenuScene');
        });
    }
}
