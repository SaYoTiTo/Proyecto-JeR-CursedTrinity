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
    this.load.spritesheet('palanca', 'assets/Palanca.png',{
        frameWidth: 22,
        frameHeight: 18,
    });
    this.load.spritesheet('pasarela', 'assets/Pasarela.png',{
        frameWidth: 41,
        frameHeight: 206,
    });
    this.load.spritesheet('lockV', 'assets/LockdoorsV.png',{
        frameWidth: 41,
        frameHeight: 81,
    });
    this.load.spritesheet('lockH', 'assets/LockdoorsH.png',{
        frameWidth: 81,
        frameHeight: 41,
    });
    this.load.spritesheet('chest', 'assets/Cofre.png',{
        frameWidth: 34,
        frameHeight: 32,
    });
    this.load.spritesheet('explosion', 'assets/ExplosionPequena.png',{
        frameWidth: 12,
        frameHeight: 12,
    });
    this.load.spritesheet('bigExplosion', 'assets/ExplosionGrande.png',{
        frameWidth: 22,
        frameHeight: 22,
    });
    
    this.load.image('colliderH', 'assets/ColliderMuroHorizontal.png'); 
    this.load.image('colliderV', 'assets/ColliderMuroVertical.png');
    this.load.image('colliderAbismo', 'assets/ColliderAbsimol.png');
    this.load.image('colliderRemovible', 'assets/ColliderRemovible.png');
    this.load.image('spiderWeb', 'assets/Telaraña.png');
    this.load.image('top', 'assets/Darkness.png');
    this.load.image('flechas', 'assets/Flecha.png');           
    this.load.image('niebla', 'assets/Niebla.jpg');
    
    //Barra de carga
    this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics,loadingText:loadingText});
    this.load.on('complete', this.complete, {scene: this.scene});
	    
    //Sounds and OST 
    this.load.audio('dungeonMusic', [
        'assets/D.wav'
    ]);
    this.load.audio('disparoFlecha', [
        'assets/Disparo_Flecha.wav'
    ]);
    this.load.audio('impactoFlecha', [
        'assets/Golpe_Flecha.wav'
    ]);
    this.load.audio('disparoFuego', [
        'assets/Disparo_Bola_Fuego.wav'
    ]);
    this.load.audio('impactoFuego', [
        'assets/Golpe_Bola_Fuego.wav'
    ]);
    this.load.audio('pisadas', [
        'assets/PasosA.wav'
    ]);
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
