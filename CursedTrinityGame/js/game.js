//Importamos las escenas
import PreloadScene from './preloadScene.js';
import MenuScene from './menuScene.js';
import CharScene from './charScene.js';
import GameScene from './gameScene.js';
import ControlsScene from './controlsScene.js';
import GameOverScene from './gameOverScene.js';
import CreditsScene from './creditsScene.js';
import PauseScene from './pauseScene.js';

//Creamos la configuracion global
var config = {
    type: Phaser.AUTO,
    width: 1260, //420
    height: 640,//320
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
game.scene.add('GameOverScene', new GameOverScene());
game.scene.add('CreditsScene', new CreditsScene());
game.scene.add('PauseScene', new PauseScene());

//Exportamos el juego
export { game };

//LLamamos a la primera escena
game.scene.start('PreloadScene');
