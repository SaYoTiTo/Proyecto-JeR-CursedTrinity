var selection = 0;
var enterKey;
var previousScene;

export default class ConfigScene extends Phaser.Scene{
    
    constructor(){
        super({ key:'ConfigScene' });
    };
    
    init(data){
        previousScene = data.prev;
    }
    
    create(){
        
        this.cameras.main.fadeIn(1000,0,0,0);
        
        this.bg = this.add.image(210,160, 'fondoVacio');
        
        this.back = this.physics.add.sprite(40, 300, 'botonVolver').setScale(0.3).refreshBody();
        this.back.alpha = 0.5;
        this.back.setInteractive();
        
        enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        //Slider
        this.img = this.physics.add.image(240, 160, 'spider').setScale(2).refreshBody();
        this.img.slider = this.plugins.get('rexsliderplugin').add(this.img, {
            endPoints: [{
                    x: this.img.x - 150,
                    y: this.img.y
                },
                {
                    x: this.img.x + 50,
                    y: this.img.y
                }
            ],
            value: 0.25
        });
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        
        this.add.graphics().lineStyle(3, 0x55ff55, 1).strokePoints(this.img.slider.endPoints);
        //
        
        this.volText = this.physics.add.image(200,120, 'volumeText').setScale(0.3).refreshBody();
        
    };
        
    update(){
        
        //Control del slider
        if (this.cursorKeys.left.isDown) {
            this.img.slider.value -= 0.01;
            this.back.alpha = 0.5;
            selection = 0;
        } else if (this.cursorKeys.right.isDown) {
            this.img.slider.value += 0.01;
            this.back.alpha = 0.5;
            selection = 0;
        } else if(this.cursorKeys.down.isDown){
            selection = 1;
            this.back.alpha = 1;
        }
        //
        
        this.back.on("pointerover", function(){this.alpha = 1});
        this.back.on("pointerout", function(){this.alpha = 0.5});
        this.back.on("pointerdown", function(){
            this.scene.cameras.main.fadeOut(1000,0,0,0);
            this.scene.scene.stop('ConfigScene');
            this.scene.scene.start(previousScene);
        });
        
        if(enterKey.isDown && selection == 1){
            this.scene.scene.cameras.main.fadeOut(1000,0,0,0);
            this.scene.stop('ConfigScene');
            this.scene.start(previousScene);
        }
            
        this.registry.set('vol', this.img.slider.value);
    }
}