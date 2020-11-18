var platforms;
var rooms;

export default class GameScene extends Phaser.Scene{
    
    constructor(){
        super({ key: 'GameScene'});
    }
        
    create() {
            
            this.keys = this.input.keyboard.addKeys(
                {up:Phaser.Input.Keyboard.KeyCodes.W,
                 down:Phaser.Input.Keyboard.KeyCodes.S,
                 left:Phaser.Input.Keyboard.KeyCodes.A,
                 right:Phaser.Input.Keyboard.KeyCodes.D,
                 space:Phaser.Input.Keyboard.KeyCodes.F,
                 up2:Phaser.Input.Keyboard.KeyCodes.I,
                 down2:Phaser.Input.Keyboard.KeyCodes.K,
                 left2:Phaser.Input.Keyboard.KeyCodes.J,
                 right2:Phaser.Input.Keyboard.KeyCodes.L,
                 space2:Phaser.Input.Keyboard.KeyCodes.P});            
            
            /*
            //The walls
            var platforms = this.physics.add.staticGroup();
            
            //platforms.create(40, 56, 'ground').setScale(2).refreshBody();

            platforms.create(65, 12, 'colliderH');
            platforms.create(143, 12, 'colliderH');
            platforms.create(276, 12, 'colliderH');
            platforms.create(350, 12, 'colliderH');
            platforms.create(65, 278, 'colliderH');
            platforms.create(143, 278, 'colliderH');
            platforms.create(276, 278, 'colliderH');
            platforms.create(350, 278, 'colliderH');
            platforms.create(34, 61, 'colliderV');
            platforms.create(34, 81, 'colliderV');
            platforms.create(34, 218, 'colliderV');
            platforms.create(34, 228, 'colliderV');
            platforms.create(388, 61, 'colliderV');
            platforms.create(388, 81, 'colliderV');
            platforms.create(388, 218, 'colliderV');
            platforms.create(388, 228, 'colliderV');
            */
            //Darkness
            this.shadows = this.add.rectangle(210, 160, 4200, 3200, 0xFFFFFF); //0x000000
            
            // Static background
            rooms = this.physics.add.staticGroup();
            
            rooms.create(630, 160, 'bg', 0);
            
            this.bg = this.physics.add.sprite(210, 160, 'bg', 0);


            // The movable bow character
            this.heroA = this.physics.add.sprite(200, 150, 'hero', 0);
            this.heroA.direction = 'down';
            this.heroA.setCollideWorldBounds(true);
            
            //The arrows
            this.flechas = this.physics.add.group({
                defaultKey: 'flechas',
                maxSize: 4,
                size: 4
            });
            this.input.on('pointerdown', s, this);
            //The bow
            this.bow = this.physics.add.sprite(this.heroA.x, this.heroA.y, 'bow', 0);
            
            // The movable character
            this.heroC = this.physics.add.sprite(250, 150, 'heroC', 0);
            this.heroC.direction = 'down';
            //this.heroC.setImmovable(true);
            this.heroC.setCollideWorldBounds(true);
            //The fireballs
            this.llamas = this.physics.add.group({
                defaultKey: 'llamas'
            });
            //The book
            this.book = this.physics.add.sprite(this.heroC.x, this.heroC.y, 'book', 0);
            
            //The top in view
            this.top = this.physics.add.sprite(210, 160, 'top', 0);
            
            
            //The walls
            platforms = this.physics.add.staticGroup();
            
            //platforms.create(40, 56, 'ground').setScale(2).refreshBody();

            platforms.create(65, 12, 'colliderH');
            platforms.create(143, 12, 'colliderH');
            platforms.create(276, 12, 'colliderH');
            platforms.create(350, 12, 'colliderH');
            platforms.create(65, 278, 'colliderH');
            platforms.create(143, 278, 'colliderH');
            platforms.create(276, 278, 'colliderH');
            platforms.create(350, 278, 'colliderH');
            platforms.create(34, 61, 'colliderV');
            platforms.create(34, 81, 'colliderV');
            platforms.create(34, 218, 'colliderV');
            platforms.create(34, 228, 'colliderV');
            platforms.create(388, 61, 'colliderV');
            platforms.create(388, 81, 'colliderV');
            platforms.create(388, 218, 'colliderV');
            platforms.create(388, 228, 'colliderV');
            
            this.cameras.main.setBounds(0,0,4200,3200);
            
            
            var t =this.input.on('pointermove', f, this);
            var t2 =this.input.on('pointermove', f2, this);
            
            var g2 =this.input.on('pointerdown', s2, this);
            
            

            
            this.physics.add.collider(this.heroA, platforms);
            this.physics.add.collider(this.heroC, platforms);
            this.physics.add.collider(this.heroA, this.heroC);
            
            
            // The state machine managing the heroA
            this.stateMachine = new StateMachine('idle', {
                idle: new IdleState(),
                move: new MoveState(),
            }, [this, this.heroA, this.bow, this.bg]);
            
            // Animation definitions
            this.anims.create({
                key: 'dungeon',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('bg', {start: 1, end: 5}),
            });
            this.anims.create({
                key: 'idle',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('heroA', {start: 1, end: 18}),
            });
            this.anims.create({
                key: 'static',
                frameRate: 3,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('bow', {start: 1, end: 1}),
            });
            this.anims.create({
                key: 'shoot',
                frameRate: 15,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('bow', {start: 5, end: 10}),
            });          
            this.anims.create({
                key: 'walk-down',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('heroA', {start: 19, end: 29}),
            });
            this.anims.create({
                key: 'walk-right',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('heroA', {start: 19, end: 29}),
            });
            this.anims.create({
                key: 'walk-up',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('heroA', {start: 19, end: 29}),
            });
            this.anims.create({
                key: 'walk-left',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('heroA', {start: 32, end: 42}),
            });
            // The state machine managing the heroC
            this.stateMachine2 = new StateMachine2('idle2', {
                idle2: new IdleState2(),
                move2: new MoveState2(),
            }, [this, this.heroC, this.book]);
            
            this.anims.create({
                key: 'idle2',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('heroC', {start: 29, end: 43}),
            });
            this.anims.create({
                key: 'static2',
                frameRate: 3,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('book', {start: 0, end: 3}),
            });
            this.anims.create({
                key: 'shoot2',
                frameRate: 15,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('book', {start: 5, end: 9}),
            });          
            this.anims.create({
                key: 'walk-down2',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('heroC', {start: 47, end: 62}),
            });
            this.anims.create({
                key: 'walk-right2',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('heroC', {start: 47, end: 62}),
            });
            this.anims.create({
                key: 'walk-up2',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('heroC', {start: 47, end: 62}),
            });
            this.anims.create({
                key: 'walk-left2',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('heroC', {start: 63, end: 78}),
            });
        }
    
    update() {
            this.stateMachine.step();
            this.stateMachine2.step2();
            this.bow.x = this.heroA.body.position.x+15;
            this.bow.y = this.heroA.body.position.y+10;
            this.book.x = this.heroC.body.position.x+15;
            this.book.y = this.heroC.body.position.y+10;
            cambioCam(this.heroA, this.cameras);            
        }
}

//Manejo de la maquina de estados
class StateMachine {
  constructor(initialState, possibleStates, stateArgs=[]) {
    this.initialState = initialState;
    this.possibleStates = possibleStates;
    this.stateArgs = stateArgs;
    this.state = null;

    // State instances get access to the state machine via this.stateMachine.
    for (const state of Object.values(this.possibleStates)) {
      state.stateMachine = this;
    }
  }

  step() {
    // On the first step, the state is null and we need to initialize the first state.
    if (this.state === null) {
      this.state = this.initialState;
      this.possibleStates[this.state].enter(...this.stateArgs);
    }

    // Run the current state's execute
    this.possibleStates[this.state].execute(...this.stateArgs);
  }

  transition(newState, ...enterArgs) {
    this.state = newState;
    this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
  }
}
    
class StateMachine2 {
        constructor(initialState2, possibleStates2, stateArgs2=[]) {
        this.initialState2 = initialState2;
        this.possibleStates2 = possibleStates2;
        this.stateArgs2 = stateArgs2;
        this.state2 = null;

    // State instances get access to the state machine via this.stateMachine.
    for (const state2 of Object.values(this.possibleStates2)) {
      state2.stateMachine2 = this;
    }
  }

  step2() {
    // On the first step, the state is null and we need to initialize the first state.
    if (this.state2 === null) {
      this.state2 = this.initialState2;
      this.possibleStates2[this.state2].enter2(...this.stateArgs2);
    }

    // Run the current state's execute
    this.possibleStates2[this.state2].execute2(...this.stateArgs2);
  }

  transition2(newState2, ...enterArgs2) {
    this.state2 = newState2;
    this.possibleStates2[this.state2].enter2(...this.stateArgs2, ...enterArgs2);
  }
}

//Estdos abstractos y estados hijos
class State {
  enter() {

  }

  execute() {

  }
}
    
class State2 {
  enter2() {

  }

  execute2() {

  }
}

class IdleState extends State {
    enter(scene, heroA, bow, bg) {
    heroA.setVelocity(0);
    
    bg.anims.play(`dungeon`, true);
    heroA.anims.play(`idle`, true);
    bow.anims.play('static', true);
  }

  execute(scene, heroA, bow, bg) {
    const {left, right, up, down, space, left2, right2, up2, down2, space2} = scene.keys;

    // Transition to move if pressing a movement key
    if (left.isDown || right.isDown || up.isDown || down.isDown) {
      this.stateMachine.transition('move');
      return;
    }
  }
}
    
class IdleState2 extends State2 {
    enter2(scene, heroC, book) {
    heroC.setVelocity(0);
    heroC.anims.play(`idle2`, true);
    book.anims.play('static2', true);
  }

  execute2(scene, heroC, book) {
    const {left, right, up, down, space, left2, right2, up2, down2, space2} = scene.keys;

    // Transition to move if pressing a movement key
    if (left2.isDown || right2.isDown || up2.isDown || down2.isDown) {
      this.stateMachine2.transition2('move2');
      return;
    }
  }
}

class MoveState extends State {
  execute(scene, heroA, bow, bg) {
    const {left, right, up, down, space, left2, right2, up2, down2, space2} = scene.keys;

    // Transition to idle if not pressing movement keys
    if (!(left.isDown || right.isDown || up.isDown || down.isDown)) {
      this.stateMachine.transition('idle');
      return;
    }

    heroA.setVelocity(0);
    //bow.setVelocity(0);
    if (up.isDown) {
        heroA.setVelocityY(-80);
        //bow.anchor(hero.x, hero.y);
        heroA.direction = 'up';
    } else if (down.isDown) {
        heroA.setVelocityY(80);
        heroA.direction = 'down';
    }
    if (left.isDown) {
        heroA.setVelocityX(-100);
        heroA.direction = 'left';
    } else if (right.isDown) {
        heroA.setVelocityX(100);
        heroA.direction = 'right';
    }

    heroA.anims.play(`walk-${heroA.direction}`, true);
  }
}

class MoveState2 extends State2 {
  execute2(scene, heroC, book) {
    const {left, right, up, down, space, left2, right2, up2, down2, space2} = scene.keys;

    // Transition to idle if not pressing movement keys
    if (!(left2.isDown || right2.isDown || up2.isDown || down2.isDown)) {
      this.stateMachine2.transition2('idle2');
      return;
    }

    heroC.setVelocity(0);
    //bow.setVelocity(0);
    if (up2.isDown) {
        heroC.setVelocityY(-80);
        //bow.anchor(hero.x, hero.y);
        heroC.direction = 'up';
    } else if (down2.isDown) {
        heroC.setVelocityY(80);
        heroC.direction = 'down';
    }
    if (left2.isDown) {
        heroC.setVelocityX(-100);
        heroC.direction = 'left';
    } else if (right2.isDown) {
        heroC.setVelocityX(100);
        heroC.direction = 'right';
    }

    heroC.anims.play(`walk-${heroC.direction}2`, true);
  }
}

//Manejo de punteros
var f = function(pointer) {
    var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bow.x, this.bow.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    this.bow.setAngle(angle);
}

var f2 = function(pointer) {
    var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.book.x, this.book.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    this.book.setAngle(angle);
}
    
var s = function(pointer) {
    this.bow.anims.play('shoot', true);
    var flecha = this.flechas.get(this.bow.x, this.bow.y);
    var angle1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bow.x, this.bow.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    var angle2 = Phaser.Math.Angle.Between(this.bow.x, this.bow.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    if (flecha) {
        flecha.setActive(true);
        flecha.setVisible(true);
        flecha.setAngle(angle1);
        this.physics.velocityFromRotation(angle2, 600, flecha.body.velocity);
        this.flechas.size--;
        this.physics.add.collider(flecha, platforms, hitArrowWall, null, this);
        this.physics.add.collider(this.heroA, flecha, hitArrowHero, null, this);
    }
}
        
var s2 = function(pointer) {
    this.book.anims.play('shoot2', true);
    var llama = this.llamas.get(this.book.x, this.book.y);
    var angle1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.book.x, this.book.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    var angle2 = Phaser.Math.Angle.Between(this.book.x, this.book.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    if (llama) {
        llama.setActive(true);
        llama.setVisible(true);
        llama.setAngle(angle1);
        this.physics.velocityFromRotation(angle2, 500, llama.body.velocity);
        this.physics.add.collider(llama, platforms, hitFireWall, null, this);
    }
}

//Colision de proyectiles
function hitArrowWall (flecha, platforms){
    flecha.setVelocity(0);
}

function hitFireWall (llama, platforms){
    llama.setVelocity(0);
    llama.setActive(false);
    llama.setVisible(false);
}
        
function hitArrowHero (heroA, flecha){
    flecha.setActive(false);
    flecha.setVisible(false);
    this.flechas.size++;
}

var posX = 0;
var posY = 0;
function cambioCam(heroA, cameras){
    if(heroA.body.position.x > 420 + posX){
        posX = posX + 420;
        cameras.main.setBounds(posX,posY,420,320);
    }else if(heroA.body.position.x < posX){
        posX = posX - 420;
        cameras.main.setBounds(posX,posY,420,320);
    }
    if(heroA.body.position.y > 320 + posY){
        posY = posY + 320;
        cameras.main.setBounds(posX,posY,420,320);
    }else if(heroA.body.position.y < posY){
        posY = posY - 320;
        cameras.main.setBounds(posX,posY,420,320);
    }
}