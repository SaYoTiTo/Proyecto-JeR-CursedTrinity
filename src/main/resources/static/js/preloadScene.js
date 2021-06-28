import {game} from './game.js';
export default class PreloadScene extends Phaser.Scene{
    
    constructor(){
        super({ key: 'PreloadScene'});
    }
    
    preload(){
    
        //Dibujo de la barra de carga
        this.graphics = this.add.graphics();
        this.newGraphics = this.add.graphics();
        var progressBar = new Phaser.Geom.Rectangle(100, 100, 200, 25);
        var progressBarFill = new Phaser.Geom.Rectangle(102, 102, 190, 15);

        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRectShape(progressBar);

        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(progressBarFill);

        var loadingText = this.add.text(65,150,"Loading: ", { fontSize: '32px', fill: '#FFF' });

         //Preload del menu
        this.load.image('menuBg', 'assets/panTit.png');
        this.load.image('botonJugar', 'assets/BotonPlay.png');
	    this.load.image('botonJugarNuevo', 'assets/BotonPlay.png');
        this.load.image('botonSalir', 'assets/BotonExit.png');
        this.load.image('botonSalirNuevo', 'assets/BotonExit.png');
 		this.load.image('botonOnline', 'assets/Boton_Online.png');
	 	this.load.image('botonOffline', 'assets/Boton_Offline.png');
        
        //Preload de ajustes
        this.load.image('botonConfig', 'assets/BotonConfig.png');
        this.load.image('fondoVacio', 'assets/FondoVacio.png');
        this.load.image('volumeText', 'assets/Volume.png');
        //Slider
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js';
        this.load.plugin('rexsliderplugin', url, true);
        
        //Preload del charSelScene
        this.load.image('charBg', 'assets/panChar.png');
        this.load.image('arrow', 'assets/arrow.png');
        this.load.image('cauldron', 'assets/cauldron.png');
        this.load.image('blade', 'assets/blade.png');
		this.load.image('darkBlade', 'assets/darkBlade.png');
        this.load.image('botonVolver', 'assets/ReturnBOTON.png');
        this.load.image('botonVolverNuevo', 'assets/ReturnBOTON.png');

        //Preload de los controles
        this.load.image('controlsBg', 'assets/controls.png');
        
        //Preload del gameOver
        this.load.image('gameOverBg', 'assets/gameOver.png');
        
        //Preload de los creditos
        this.load.video('credits', 'assets/Credits.mp4');
        
        //Preload del pause
        this.load.image('pauseBg', 'assets/pause.png');
        
        //Preload de las transiciones
        this.load.image('floor1', 'assets/Floor1.png');
        this.load.image('floor2', 'assets/Floor2.png');
        this.load.image('floor3', 'assets/Floor3.png');
        
        //Preload del gameScene
		this.load.image('dummy', 'assets/SaveBlade.png');

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
        this.load.spritesheet('llamasF', 'assets/LlamaFatuaSpritesheet.png',{
            frameWidth: 22,
            frameHeight: 11,
        });
        this.load.spritesheet('spider', 'assets/SpriteArañaDeCristal.png',{
            frameWidth: 16,
            frameHeight: 10,    
        });
        this.load.spritesheet('palanca', 'assets/Palanca.png',{
            frameWidth: 22,
            frameHeight: 18,
        });
        this.load.spritesheet('palancaPuerta', 'assets/PalancaPuertas.png',{
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
        this.load.spritesheet('centinel', 'assets/VigilanteArtificiaSpritesheetl.png',{
            frameWidth: 29,
            frameHeight: 24,
        });
        this.load.spritesheet('devil', 'assets/DiabloLloronSpritesheet.png',{
            frameWidth: 22,
            frameHeight: 28,
        });
        this.load.spritesheet('theDeath', 'assets/LaMuerteSpritesheet.png',{
            frameWidth: 48,
            frameHeight: 52,
        });

        this.load.image('colliderH', 'assets/ColliderMuroHorizontal.png'); 
        this.load.image('colliderV', 'assets/ColliderMuroVertical.png');
        this.load.image('colliderAbismo', 'assets/ColliderAbsimol.png');
        this.load.image('colliderRemovible', 'assets/ColliderRemovible.png');
        this.load.image('spiderWeb', 'assets/Telaraña.png');
        this.load.image('top', 'assets/Darkness.png');
        this.load.image('flechas', 'assets/Flecha.png');
        this.load.image('lagrimas', 'assets/LagrimaDiabloLLoron.png');
        this.load.image('niebla', 'assets/Niebla.jpg');
        this.load.image('miniHeart', 'assets/miniCorazonCompleto.png');
        this.load.image('pRock', 'assets/PuzzleRock.png');
        this.load.image('nRock', 'assets/NormalRock.png');
        this.load.image('rHand', 'assets/RightHand.png');
        this.load.image('lHand', 'assets/LeftHand.png');

        //Preload del HUD
        this.load.image('fullHeart', 'assets/Corazon_lleno-sheet.png');
        this.load.image('emptyHeart', 'assets/Corazon_vacia-sheet.png');
        this.load.image('arrowHUD', 'assets/ArrowHUD.png');
        this.load.image('cauldronHUD', 'assets/CauldronHUD.png');
        this.load.image('pauseBg', 'assets/pause.png');

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
    
    create(){
        this.registry.set('vol', 1);
    }
    
    updateBar(percentage) {
	this.newGraphics.clear();
    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(102, 102, percentage*190, 20));
		
    percentage = percentage * 100;
    this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
    console.log("P:" + percentage); 
}

    complete() {
	    console.log("COMPLETE!");
        game.scene.stop('PreloadScene');
        game.scene.start('MenuScene');        
    }
        
}
