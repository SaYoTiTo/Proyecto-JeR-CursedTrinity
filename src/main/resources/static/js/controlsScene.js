var enterKey;
var mode;

export default class ControlsScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'ControlsScene' });
        };
            
	init(data){
		mode = data.type;
	}
    create(){
        enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.cameras.main.fadeIn(1000,0,0,0);
        
        this.bg = this.physics.add.sprite(210,160,'controlsBg');
        this.play = this.physics.add.sprite(220,240,'botonJugarNuevo').setScale(0.6).refreshBody();
        
        this.play.alpha = 0.5;
        
        this.play.setInteractive();

		if(mode === 1){
			this.registry.set('A1',false);
	        this.registry.set('A2',false);
	        this.registry.set('B2',false);
	        this.registry.set('C1',false);
	        this.registry.set('C2',false);
	        
	        this.registry.set('2A2',false);
	        this.registry.set('2A3',false);
	        this.registry.set('2B2',false);
	        this.registry.set('2C2',false);
	        this.registry.set('2C3',false);
	        this.registry.set('2D1',false);
	        this.registry.set('2D2',false);
	        this.registry.set('2E2',false);
	        
	        this.registry.set('3A1',false);
		}
    };
        
    update(){
        if(enterKey.isDown){
            this.scene.scene.cameras.main.fadeOut(1000,0,0,0);
            this.scene.stop('ControlsScene');
			if(mode === 0)
            	this.scene.scene.start('CharScene');
			else
				this.scene.scene.start('FirstFloorA1', 2);
        }
        
        this.play.on("pointerover", function(){ this.alpha = 1; });
        this.play.on("pointerout", function(){ this.alpha = 0.5;});
        this.play.on("pointerdown", function(){
            this.scene.scene.scene.cameras.main.fadeOut(1000,0,0,0);
            this.scene.scene.stop('ControlsScene');
            if(mode === 0)
            	this.scene.scene.start('CharScene');
			else
				this.scene.scene.start('FirstFloorA1', 2);
        });
    }
}
