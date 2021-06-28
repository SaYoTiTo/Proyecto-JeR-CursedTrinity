//Importamos las escenas
import PreloadScene from './preloadScene.js';
import MenuScene from './menuScene.js';
import CharScene from './charScene.js';
//import GameScene from './gameScene.js';
import BaseGame from './baseGame.js';
//import Floor1 from './floor1.js';
import FirstFloorA1 from './firstFloorA1.js';
import FirstFloorA2 from './firstFloorA2.js';
import FirstFloorB2 from './firstFloorB2.js';
import FirstFloorC2 from './firstFloorC2.js';
import SecondFloorC3 from './secondFloorC3.js';
import SecondFloorC2 from './secondFloorC2.js';
import SecondFloorB2 from './secondFloorB2.js';
import SecondFloorA2 from './secondFloorA2.js';
import SecondFloorA3 from './secondFloorA3.js';
import SecondFloorD2 from './secondFloorD2.js';
import SecondFloorE2 from './secondFloorE2.js';
import SecondFloorD1 from './secondFloorD1.js';
import ThirdFloorA1 from './ThirdFloorA1.js';
import ControlsScene from './controlsScene.js';
import GameOverScene from './gameOverScene.js';
import CreditsScene from './creditsScene.js';
import PauseScene from './pauseScene.js';
import ChatScene from './chatScene.js';
import ConfigScene from './configScene.js';

//ONLINE
import OnlineFloorA5 from './OnlineFloorA5.js';
import OnlineFloorB3 from './OnlineFloorB3.js';
import OnlineFloorB4 from './OnlineFloorB4.js';
import OnlineFloorB5 from './OnlineFloorB5.js';
import OnlineFloorB6 from './OnlineFloorB6.js';
import OnlineFloorC2 from './OnlineFloorC2.js';
import OnlineFloorC3 from './OnlineFloorC3.js';
import OnlineFloorC4 from './OnlineFloorC4.js';
import OnlineFloorC5 from './OnlineFloorC5.js';
import OnlineFloorD2 from './OnlineFloorD2.js';
import OnlineFloorD3 from './OnlineFloorD3.js';
import OnlineFloorD4 from './OnlineFloorD4.js';
import OnlineFloorD5 from './OnlineFloorD5.js';
import OnlineFloorE1 from './OnlineFloorE1.js';
import OnlineFloorE2 from './OnlineFloorE2.js';
import OnlineFloorE3 from './OnlineFloorE3.js';

//Creamos la configuracion global
var config = {
    type: Phaser.AUTO,
    width: 420, //420 //1260
    height: 320,//320 //640
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
//game.scene.add('GameScene', new GameScene());
game.scene.add('BaseGame', new BaseGame());
//game.scene.add('Floor1', new Floor1());
game.scene.add('FirstFloorA1', new FirstFloorA1());
game.scene.add('FirstFloorA2', new FirstFloorA2());
game.scene.add('FirstFloorB2', new FirstFloorB2());
game.scene.add('FirstFloorC2', new FirstFloorC2());
game.scene.add('SecondFloorC3', new SecondFloorC3());
game.scene.add('SecondFloorC2', new SecondFloorC2());
game.scene.add('SecondFloorB2', new SecondFloorB2());
game.scene.add('SecondFloorA2', new SecondFloorA2());
game.scene.add('SecondFloorA3', new SecondFloorA3());
game.scene.add('SecondFloorD2', new SecondFloorD2());
game.scene.add('SecondFloorE2', new SecondFloorE2());
game.scene.add('SecondFloorD1', new SecondFloorD1());
game.scene.add('ThirdFloorA1', new ThirdFloorA1());
game.scene.add('ConfigScene', new ConfigScene());

//ONLINE
game.scene.add('OnlineFloorA5', new OnlineFloorA5());
game.scene.add('OnlineFloorB3', new OnlineFloorB3());
game.scene.add('OnlineFloorB4', new OnlineFloorB4());
game.scene.add('OnlineFloorB5', new OnlineFloorB5());
game.scene.add('OnlineFloorB6', new OnlineFloorB6());
game.scene.add('OnlineFloorC2', new OnlineFloorC2());
game.scene.add('OnlineFloorC3', new OnlineFloorC3());
game.scene.add('OnlineFloorC4', new OnlineFloorC4());
game.scene.add('OnlineFloorC5', new OnlineFloorC5());
game.scene.add('OnlineFloorD2', new OnlineFloorD2());
game.scene.add('OnlineFloorD3', new OnlineFloorD3());
game.scene.add('OnlineFloorD4', new OnlineFloorD4());
game.scene.add('OnlineFloorD5', new OnlineFloorD5());
game.scene.add('OnlineFloorE1', new OnlineFloorE1());
game.scene.add('OnlineFloorE2', new OnlineFloorE2());
game.scene.add('OnlineFloorE3', new OnlineFloorE3());

//PAUSA Y CHAT
game.scene.add('GameOverScene', new GameOverScene());
game.scene.add('CreditsScene', new CreditsScene());
game.scene.add('PauseScene', new PauseScene());
game.scene.add('ChatScene', new ChatScene());

//Exportamos el juego
export { game };

//LLamamos a la primera escena
game.scene.start('PreloadScene');

