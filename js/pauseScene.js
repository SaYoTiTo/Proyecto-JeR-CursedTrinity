export default class PauseScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'PauseScene' });
        };
            
    create(){
        
        this.bg = this.physics.add.sprite(210,160,'pauseBg');
        this.bg.alpha = 0.7;
            
        this.bg.setInteractive();
    };
        
    update(){
        
        this.bg.on("pointerdown", function(){
            this.scene.scene.stop('PauseScene');
            this.scene.scene.resume('GameScene');
        });
    }
}