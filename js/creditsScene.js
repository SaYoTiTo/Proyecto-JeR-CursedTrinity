export default class CreditsScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'CreditsScene' });
        };
            
    create(){
        
        this.credits = this.add.video(250,200,'credits').setScale(0.4,0.4);
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