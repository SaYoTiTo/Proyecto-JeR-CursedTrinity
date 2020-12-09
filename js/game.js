//Importamos las escenas
import PreloadScene from './preloadScene.js';
import MenuScene from './menuScene.js';
import CharScene from './charScene.js';
import GameScene from './gameScene.js';
import ControlsScene from './controlsScene.js';

//Creamos la configuracion global
var config = {
    type: Phaser.AUTO,
    width: 4200, //420
    height: 3200,//320
    pixelArt: true,
    zoom: 3,
    physics: {
        default: 'arcade'
    },
};

//Creamos el juego
var game = new Phaser.Game(config);

//Cargamos las escenas
game.scene.add('PreloadScene', new PreloadScene());
game.scene.add('MenuScene', new MenuScene());
game.scene.add('ControlsScene', new ControlsScene());
game.scene.add('CharScene', new CharScene());
game.scene.add('GameScene', new GameScene());

//Exportamos el juego
export { game };

//LLamamos a la primera escena
game.scene.start('PreloadScene');

