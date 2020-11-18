import {game} from './game.js';
export default class PreloadScene extends Phaser.Scene{
    
    constructor(){
        super({ key: 'PreloadScene'});
    }
    
    preload(){
    
    //Dibujo de la barra de carga
    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
	var progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
	var progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

	this.graphics.fillStyle(0xffffff, 1);
	this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillStyle(0x3587e2, 1);
	this.newGraphics.fillRectShape(progressBarFill);

	var loadingText = this.add.text(250,260,"Loading: ", { fontSize: '32px', fill: '#FFF' });

    //Preload del charSelScene
    this.load.image('arrow', 'assets/arrow.png');
    this.load.image('cauldron', 'assets/cauldron.png');
    this.load.image('blade', 'assets/blade.png');
    this.load.spritesheet('heroA', 'assets/ArrowArmlessSpritesheet.png', {
        frameWidth: 30,
        frameHeight: 35,
    });
    
    //Preload del gameScene
    this.load.spritesheet('heroA', 'assets/ArrowArmlessSpritesheet.png', {
        frameWidth: 30,
        frameHeight: 35,
    });
    this.load.spritesheet('heroC', 'assets/CauldronArmlessSpritesheet.png', {
        frameWidth: 30,
        frameHeight: 47,
    });
    this.load.spritesheet('bow', 'assets/BowSpritesheet.png', {
        frameWidth: 39,
        frameHeight: 16,
    });
    this.load.spritesheet('book', 'assets/BookSpriteSheet.png', {
        frameWidth: 46,
        frameHeight: 25,
    });
    this.load.spritesheet('bg', 'assets/CuartoMazmorraSprisheet.png', {
        frameWidth: 420,
        frameHeight: 320,
    });
    this.load.spritesheet('llamas', 'assets/LlamaSpritesheet.png',{
    frameWidth: 53,
        frameHeight: 21,
    });
    //this.load.image('bg', 'assets/CuartoMazmorra.png');
    this.load.image('colliderH', 'assets/ColliderMuroHorizontal.png'); 
    this.load.image('colliderV', 'assets/ColliderMuroVertical.png');
    this.load.image('top', 'assets/Darkness.png');
    this.load.image('flechas', 'assets/Flecha.png');           
    this.load.image('diamonds', 'assets/bomb.png');
    
    //Barra de carga
    this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics,loadingText:loadingText});
    this.load.on('complete', this.complete, {scene: this.scene});
}
    
    updateBar(percentage) {
	this.newGraphics.clear();
    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage*390, 40));
		
    percentage = percentage * 100;
    this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
    console.log("P:" + percentage);
}

    complete() {
	    console.log("COMPLETE!");
        game.scene.stop('PreloadScene');
        game.scene.start('CharScene');        
    }
        
}
