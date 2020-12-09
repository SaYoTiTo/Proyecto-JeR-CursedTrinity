export default class CreditsScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'CreditsScene' });
        };
            
    create(){
        
        this.credits = this.add.video(250,150,'credits').setScale(0.5,0.5);
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