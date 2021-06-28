<script type="text/javascript">
    
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
    
var platforms;


class State {
  enter() {

  }

  execute() {

  }
}



    const config = {
        type: Phaser.AUTO,
        width: 400,
        height: 300,
        pixelArt: true,
        zoom: 2,
        physics: {
            default: 'arcade'
        },
    scene: {      
        preload: preload,
        create: create,
        update: update,
        }
    };
    
class IdleState extends State {
    enter(scene, hero, bow) {
    hero.setVelocity(0);
    //bow.setVelocity(0);
    
    hero.anims.play(`idle`, true);
    bow.anims.play('static', true);
    //hero.anims.stop();
  }

  execute(scene, hero, bow) {
    const {left, right, up, down, space} = scene.keys;

    // Transition to swing if pressing space
    if (space.isDown) {
      this.stateMachine.transition('swing');
      return;
    }

    // Transition to move if pressing a movement key
    if (left.isDown || right.isDown || up.isDown || down.isDown) {
      this.stateMachine.transition('move');
      return;
    }
  }
}

class MoveState extends State {
  execute(scene, hero, bow) {
    const {left, right, up, down, space} = scene.keys;

    // Transition to swing if pressing space
    if (space.isDown) {
      this.stateMachine.transition('swing');
      return;
    }

    // Transition to idle if not pressing movement keys
    if (!(left.isDown || right.isDown || up.isDown || down.isDown)) {
      this.stateMachine.transition('idle');
      return;
    }

    hero.setVelocity(0);
    //bow.setVelocity(0);
    if (up.isDown) {
        hero.setVelocityY(-80);
        //bow.anchor(hero.x, hero.y);
        hero.direction = 'up';
    } else if (down.isDown) {
        hero.setVelocityY(80);
        //bow.setVelocityY(80);
        //bow.setPosition(hero.x, hero.y);
        hero.direction = 'down';
    }
    if (left.isDown) {
        hero.setVelocityX(-100);
        //bow.setVelocityX(-100);
        //bow.setPosition(hero.x, hero.y);
        hero.direction = 'left';
    } else if (right.isDown) {
        hero.setVelocityX(100);
        //bow.setVelocityX(100);
        //bow.setPosition(hero.x, hero.y);
        hero.direction = 'right';
    }

    hero.anims.play(`walk-${hero.direction}`, true);
  }
}

class SwingState extends State {
  enter(scene, hero, bow) {
    hero.setVelocity(0);
    //bow.setVelocity(0);
    hero.anims.play(`swing-${hero.direction}`);
    hero.once('animationcomplete', () => {
      this.stateMachine.transition('idle');
    });
  }
}

var game = new Phaser.Game(config);
/*
var ROTATION_SPEED = 1 * Math.PI; // 0.5 arc per sec, 2 sec per arc
var ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
var TOLERANCE = 0.02 * ROTATION_SPEED;

var velocityFromRotation = Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation;*/
    
    function preload() {
            this.load.spritesheet('hero', 'assets/ArrowArmlessSpritesheet.png', {
                frameWidth: 30,
                frameHeight: 35,
            });
            this.load.spritesheet('bow', 'assets/BowSpritesheet.png', {
                frameWidth: 39,
                frameHeight: 39,
            });
            this.load.image('bg', 'assets/CuartoMazmorra.png');
            
            this.load.image('ground', 'assets/platform.png');
        
        this.load.image('diamonds', 'assets/bomb.png');
        }

        function create() {
            
            //this.game = this.physics.startSystem(Phaser.Physics.ARCADE);
            //this.keys = this.input.keyboard.createCursorKeys();
            this.keys = this.input.keyboard.addKeys(
                {up:Phaser.Input.Keyboard.KeyCodes.W,
                 down:Phaser.Input.Keyboard.KeyCodes.S,
                 left:Phaser.Input.Keyboard.KeyCodes.A,
                 right:Phaser.Input.Keyboard.KeyCodes.D,
                 space:Phaser.Input.Keyboard.KeyCodes.F});
            
            // Static background
            this.add.image(200, 200, 'bg');


            // The movable character
            this.hero = this.physics.add.sprite(200, 150, 'hero', 0);
            this.hero.direction = 'down';
            this.hero.setCollideWorldBounds(true);
            
            //The bow
            this.bow = this.physics.add.sprite(this.hero.x, this.hero.y, 'bow', 0);
            //var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bow.x, this.bow.y, pointer.x, pointer.y);
            //this.bow.setAngle(angle);
            
            var t =this;
            this.input.on('pointermove', f, this);
            
            //The walls
            /*platforms = this.physics.add.staticGroup();
            
            platforms.create(40, 56, 'ground').setScale(2).refreshBody();

            platforms.create(60, 40, 'ground');
            platforms.create(50, 250, 'ground');
            platforms.create(75, 220, 'ground');
            
            this.physics.add.collider(this.hero, platforms);*/
            
            // The state machine managing the hero
            this.stateMachine = new StateMachine('idle', {
                idle: new IdleState(),
                move: new MoveState(),
                swing: new SwingState(),
            }, [this, this.hero, this.bow]);
            
            // Animation definitions
            this.anims.create({
                key: 'idle',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('hero', {start: 1, end: 18}),
            });
            this.anims.create({
                key: 'static',
                frameRate: 3,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('bow', {start: 1, end: 3}),
            });
            // NOTE: Sword animations do not repeat
            this.anims.create({
                key: 'swing-down',
                frameRate: 8,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('hero', {start: 16, end: 19}),
            });
            this.anims.create({
                key: 'swing-up',
                frameRate: 8,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('hero', {start: 20, end: 23}),
            });
            this.anims.create({
                key: 'swing-right',
                frameRate: 8,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('hero', {start: 24, end: 27}),
            });
            this.anims.create({
                key: 'swing-left',
                frameRate: 8,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('hero', {start: 28, end: 31}),
            });
            
            this.anims.create({
                key: 'walk-down',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('hero', {start: 19, end: 29}),
            });
            this.anims.create({
                key: 'walk-right',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('hero', {start: 19, end: 29}),
            });
            this.anims.create({
                key: 'walk-up',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('hero', {start: 19, end: 29}),
            });
            this.anims.create({
                key: 'walk-left',
                frameRate: 15,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('hero', {start: 32, end: 42}),
            });
        }
    
        var f = function(pointer) {
        var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bow.x, this.bow.y, pointer.x, pointer.y);
        this.bow.setAngle(angle);
        //this.text.text = 'angle: ' + angle;
        }

        function update() {
                this.stateMachine.step();
                this.bow.x = this.hero.body.position.x+15;
                this.bow.y = this.hero.body.position.y+10;
                //pointerMove(this.input.activePointer);
            
                //velocityFromRotation(bow.rotation, 10, bow.body.velocity);
            
                //this.bow.rotation = window.physics.arcade.angleToPointer(this.bow);
                //this.bow.angle += 0.2;
                //Phaser.Actions.RotateAroundDistance(this.bow, { x: this.hero.body.position.x, y: this.hero.body.position.y }, 0.1, 100);
            
                
            }
 /*   
function pointerMove (pointer) {
  // if (!pointer.manager.isOver) return;
  
  // Also see alternative method in
  // <https://codepen.io/samme/pen/gOpPLLx>
  
  var angleToPointer = Phaser.Math.Angle.Between(bow.x, bow.y, pointer.worldX, pointer.worldY);
  var angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - bow.rotation);
    
  if (Phaser.Math.Within(angleDelta, 0, TOLERANCE)) {
    bow.rotation = angleToPointer;
    bow.setAngularVelocity(0);
  } else {
    bow.setAngularVelocity(Math.sign(angleDelta) * ROTATION_SPEED_DEGREES);
  }
}*/
</script>
