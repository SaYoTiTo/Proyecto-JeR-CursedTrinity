import {game} from './game.js';

var platforms;
var platforms2;
var platforms3;
var abism;
var spiderWeb;
var rooms;
var removable;
var doors;
var funDoors;
var nieblas;

var posX = 0;
var posY = 0;
var tilex = 0;
var tiley = 0;
var auxLock2 = false;
var auxLock3 = false;
var timer;

var heroAHearts;
var heroAEmptyHearts;
var heroCHearts;
var heroCEmptyHearts;

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
             space2:Phaser.Input.Keyboard.KeyCodes.P,
             up3:Phaser.Input.Keyboard.KeyCodes.G,
             down3:Phaser.Input.Keyboard.KeyCodes.V,
             left3:Phaser.Input.Keyboard.KeyCodes.C,
             right3:Phaser.Input.Keyboard.KeyCodes.B,
             space3:Phaser.Input.Keyboard.KeyCodes.N});            
            
        /**/
        this.input.mouse.disableContextMenu();
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
        
        var child = platforms.getChildren();

        for (var i = 0; i < child.length; i++)
        {
            child[i].setDepth(-5);
        }
        //The always locked doors
        platforms2 = this.physics.add.staticGroup();
        /*
        platforms2.create(210, 12, 'colliderH');  //0
        platforms2.create(210, 278, 'colliderH'); //2            
        platforms2.create(34, 150, 'colliderV'); //3
        platforms2.create(388, 150, 'colliderV'); //1
        */
        platforms2.create(210, 12, 'colliderH');  //0
        platforms2.create(388, 150, 'colliderV'); //1
        platforms2.create(34, 150, 'colliderV'); //3
        
        platforms2.create(210, 598, 'colliderH'); //6 
        platforms2.create(34, 470, 'colliderV'); //7
        
        platforms2.create(630, 332, 'colliderH');  //8
        platforms2.create(630, 598, 'colliderH'); //10
        
        platforms2.create(1228, 470, 'colliderV'); //13
        platforms2.create(1050, 598, 'colliderH'); //14
        
        platforms2.create(1050, 12, 'colliderH');  //16
        platforms2.create(1228, 150, 'colliderV'); //17
        platforms2.create(874, 150, 'colliderV'); //19

        child = platforms2.getChildren();

        for (var i = 0; i < child.length; i++)
        {
            child[i].setDepth(-5);
        }

        //The openable doors
        platforms3 = this.physics.add.staticGroup();

        //platforms3.create(210, 332, 'colliderH'); //4 
        //platforms3.create(388, 470, 'colliderV'); //5

        platforms3.create(808, 470, 'colliderV'); //9, pos0
        platforms3.create(454, 470, 'colliderV'); //11, pos1

        platforms3.create(1050, 332, 'colliderH'); //12, pos2
        platforms3.create(874, 470, 'colliderV'); //15, pos3

        child = platforms3.getChildren();

        for (var i = 0; i < child.length; i++)
        {
            child[i].setDepth(-5);
            child[i].setVisible(false);
            child[i].body.enable = false;
        }

        //The abism
        abism = this.physics.add.staticGroup();

        abism.create(729, 401, 'colliderAbismo');
        abism.create(729, 527, 'colliderAbismo');

        //The bridge
        removable = this.physics.add.staticGroup();

        removable.create(729, 470, 'colliderRemovible');

        /**/
        //Darkness
        this.shadows = this.add.rectangle(210, 160, 4200, 3200, 0x000000); //0xFFFFFF
        this.shadows.setDepth(-4);

        // Static background
        rooms = this.physics.add.staticGroup();

        rooms.create(210, 160, 'bg', 0);
        rooms.playAnimation('dungeon');

        //The locks
        doors = this.physics.add.staticGroup();
        //Sala 1
        doors.create(208, 29, 'lockH');//0
        doors.create(390, 160, 'lockV');//1
        doors.create(35, 160, 'lockV');//3
        //Sala 2
        doors.create(208, 603, 'lockH'); //6
        doors.create(35, 480, 'lockV'); //7
        //Sala 3
        doors.create(628, 349, 'lockH'); //8
        doors.create(628, 603, 'lockH'); //10
        //Sala 4
        doors.create(1230, 480, 'lockV');//13
        doors.create(1048, 603, 'lockH');//14
        //doors.create(208, 283, 'lockH');

        child = doors.getChildren();

        for (var i = 0; i < child.length; i++)
        {
            child[i].setDepth(-3);
        }

        funDoors = this.physics.add.staticGroup();

        this.lock9 = this.add.sprite(810, 480, 'lockV', 0); //390 160
        this.lock9.setDepth(-4);
        this.lock9.setVisible(false);
        funDoors.add(this.lock9); //0
        this.lock11 = this.add.sprite(455, 480, 'lockV', 0);
        this.lock11.setDepth(-4);
        this.lock11.setVisible(false);
        funDoors.add(this.lock11); //1
        this.lock12 = this.add.sprite(1048, 349, 'lockH', 0);
        this.lock12.setDepth(-4);
        this.lock12.setVisible(false);
        funDoors.add(this.lock12); //2
        this.lock15 = this.add.sprite(875, 480, 'lockV', 0);
        this.lock15.setDepth(-4);
        this.lock15.setVisible(false);
        funDoors.add(this.lock15); //3
        //this.lock.setFlip(false, false);

        this.bg = this.physics.add.sprite(210, 160, 'bg', 0);

        //The path
        //this.pasarela = this.add.sprite(309, 160, 'pasarela', 0);
        this.pasarela = this.add.sprite(729, 480, 'pasarela', 0);

        //The lever
        this.palanca = this.physics.add.staticSprite(773, 374, 'palanca', 0);

        //The chest
        this.chest = this.physics.add.staticSprite(1050, 460, 'chest', 0);

        // The movable bow character
        this.heroA = this.physics.add.sprite(200, 150, 'hero', 0);
        this.heroA.direction = 'down';
        this.heroA.setCollideWorldBounds(true);
        this.heroA.lifes = 5;


        //The arrows
        this.flechas = this.physics.add.group({
            defaultKey: 'flechas',
            maxSize: 4,
            size: 4,
        });

        this.input.on('pointerdown', s, this);
        //The bow
        this.bow = this.physics.add.sprite(this.heroA.x, this.heroA.y, 'bow', 0);

        /*
        // The movable sword character
        this.heroB = this.physics.add.sprite(200, 150, 'heroB', 0);
        this.heroB.direction = 'down';
        this.heroB.setCollideWorldBounds(true);
        */
        // The movable magic character
        this.heroC = this.physics.add.sprite(250, 150, 'heroC', 0);
        this.heroC.direction = 'down';
        this.heroC.setCollideWorldBounds(true);
        this.heroC.lifes = 5;

        //The fireballs
        this.llamas = this.physics.add.group({
            defaultKey: 'llamas'
        });
        //The book
        this.book = this.physics.add.sprite(this.heroC.x, this.heroC.y, 'book', 0);

        //The blade
        //this.sword = this.physics.add.sprite(this.heroB.x, this.heroB.y, 'sword', 0).setOrigin(0);

        //The spider
        this.spider1 = this.physics.add.sprite(80,80,'spider').setScale(3).refreshBody(); 
        this.spider1.damage = 1;
        
        //The top in view
        this.top = this.physics.add.sprite(210, 160, 'top', 0);
        rooms.create(210,160, 'top', 0); 

        nieblas = this.physics.add.staticGroup();
        this.niebla = this.add.sprite(630, 160, 'niebla', 0);
        nieblas.add(this.niebla);
        child = nieblas.getChildren();
        child[0].setDepth(10);
        //niebla.create(420, 0, 'niebla', 0);
        /*
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


        //The abism
        abism = this.physics.add.staticGroup();

        abism.create(309, 81, 'colliderAbismo');
        abism.create(309, 207, 'colliderAbismo');

        //The bridge
        removable = this.physics.add.staticGroup();

        removable.create(309, 150, 'colliderRemovible');
        /**/
        /*
        //The spiderwebs that Blade can cut through
        spiderWeb = this.physics.add.staticGroup();

        spiderWeb.create(340, 120, 'spiderWeb');
        spiderWeb.create(45, 120, 'spiderWeb');
        */


        this.cameras.main.setBounds(0,0,420,320);


        var t =this.input.on('pointermove', f, this);
        var t2 =this.input.on('pointermove', f2, this);
        //var t3 =this.input.on('pointermove', f3, this);

        var g2 =this.input.on('pointerdown', s2, this);
        //var g3 =this.input.on('pointerdown', s3, this);

        //HUD
        //Arrow Empty hearts
        heroAEmptyHearts = this.add.container(50,30);
        var AEmptyHeart1 = this.physics.add.sprite(0,0,'emptyHeart').setScale(0.3).refreshBody();
        var AEmptyHeart2 = this.physics.add.sprite(30,0,'emptyHeart').setScale(0.3).refreshBody();
        var AEmptyHeart3 = this.physics.add.sprite(60,0,'emptyHeart').setScale(0.3).refreshBody();
        var AEmptyHeart4 = this.physics.add.sprite(90,0,'emptyHeart').setScale(0.3).refreshBody();
        var AEmptyHeart5 = this.physics.add.sprite(120,0,'emptyHeart').setScale(0.3).refreshBody();
        heroAEmptyHearts.addAt(AEmptyHeart1,0);
        heroAEmptyHearts.addAt(AEmptyHeart2,1);
        heroAEmptyHearts.addAt(AEmptyHeart3,2);
        heroAEmptyHearts.addAt(AEmptyHeart4,3);
        heroAEmptyHearts.addAt(AEmptyHeart5,4);
        
        //Arrow hearts
        heroAHearts = this.add.container(50,30);
        var AHeart1 = this.physics.add.sprite(0,0,'fullHeart').setScale(0.3).refreshBody();
        var AHeart2 = this.physics.add.sprite(30,0,'fullHeart').setScale(0.3).refreshBody();
        var AHeart3 = this.physics.add.sprite(60,0,'fullHeart').setScale(0.3).refreshBody();
        var AHeart4 = this.physics.add.sprite(90,0,'fullHeart').setScale(0.3).refreshBody();
        var AHeart5 = this.physics.add.sprite(120,0,'fullHeart').setScale(0.3).refreshBody();
        heroAHearts.addAt(AHeart1,0);
        heroAHearts.addAt(AHeart2,1);
        heroAHearts.addAt(AHeart3,2);
        heroAHearts.addAt(AHeart4,3);
        heroAHearts.addAt(AHeart5,4);
        
        //Cauldron Empty hearts
        heroCEmptyHearts = this.add.container(250,30);
        var CEmptyHeart1 = this.physics.add.sprite(0,0,'emptyHeart').setScale(0.3).refreshBody();
        var CEmptyHeart2 = this.physics.add.sprite(30,0,'emptyHeart').setScale(0.3).refreshBody();
        var CEmptyHeart3 = this.physics.add.sprite(60,0,'emptyHeart').setScale(0.3).refreshBody();
        var CEmptyHeart4 = this.physics.add.sprite(90,0,'emptyHeart').setScale(0.3).refreshBody();
        var CEmptyHeart5 = this.physics.add.sprite(120,0,'emptyHeart').setScale(0.3).refreshBody();
        heroCEmptyHearts.addAt(CEmptyHeart1,0);
        heroCEmptyHearts.addAt(CEmptyHeart2,1);
        heroCEmptyHearts.addAt(CEmptyHeart3,2);
        heroCEmptyHearts.addAt(CEmptyHeart4,3);
        heroCEmptyHearts.addAt(CEmptyHeart5,4);
        
        //Cauldron hearts
        heroCHearts = this.add.container(250,30);
        var CHeart1 = this.physics.add.sprite(0,0,'fullHeart').setScale(0.3).refreshBody();
        var CHeart2 = this.physics.add.sprite(30,0,'fullHeart').setScale(0.3).refreshBody();
        var CHeart3 = this.physics.add.sprite(60,0,'fullHeart').setScale(0.3).refreshBody();
        var CHeart4 = this.physics.add.sprite(90,0,'fullHeart').setScale(0.3).refreshBody();
        var CHeart5 = this.physics.add.sprite(120,0,'fullHeart').setScale(0.3).refreshBody();
        heroCHearts.addAt(CHeart1,0);
        heroCHearts.addAt(CHeart2,1);
        heroCHearts.addAt(CHeart3,2);
        heroCHearts.addAt(CHeart4,3);
        heroCHearts.addAt(CHeart5,4);
        
        //Colliders
        this.physics.add.collider(this.heroA, platforms);
        this.physics.add.collider(this.heroC, platforms);
        this.physics.add.collider(this.spider1, platforms);
        this.physics.add.collider(this.heroA, platforms2);
        this.physics.add.collider(this.heroC, platforms2);
        this.physics.add.collider(this.spider1, platforms2);
        this.physics.add.collider(this.heroA, platforms3);
        this.physics.add.collider(this.heroC, platforms3);
        this.physics.add.collider(this.spider1, platforms3);
        this.physics.add.collider(this.heroA, this.chest, playerChest, null, this);
        this.physics.add.collider(this.heroC, this.chest, playerChest, null, this);
        //this.physics.add.collider(this.heroA, flecha, hitArrowHero, null, this);
        this.physics.add.collider(this.heroA, abism);
        this.physics.add.collider(this.heroC, abism);
        this.physics.add.collider(this.heroA, removable);
        this.physics.add.collider(this.heroC, removable);
        this.physics.add.collider(this.spider1, removable);
        this.physics.add.collider(this.heroA, this.palanca);
        this.physics.add.collider(this.heroC, this.palanca);
        //this.physics.add.collider(this.heroB, platforms);
        //this.physics.add.collider(this.heroA, spiderWeb);
        //this.physics.add.collider(this.heroC, spiderWeb);
        //this.physics.add.collider(this.heroB, spiderWeb);
        this.physics.add.collider(this.heroA, this.heroC);
        //this.physics.add.collider(this.heroA, this.heroB);
        //this.physics.add.collider(this.heroB, this.heroC);
        //Collider de la araña con los personajes
        this.physics.add.collider(this.heroA, this.spider1, damageA, null, this);
        this.physics.add.collider(this.heroC, this.spider1, damageC, null, this);
        timer = this.time.addEvent({ delay: 3000, callback: activateDamage, callbackScope: this, loop: true });
        //Collider de la araña con las flechas
        this.physics.add.overlap(this.flechas, this.spider1, damageEnemy, null, this);
        this.physics.add.overlap(this.llamas, this.spider1, damageEnemy, null, this); 
        
        //The sound effects and music
        var music2 = this.sound.add('dungeonMusic', {volume: 0.001});
        music2.loop = true;
        music2.play();
        
        /*
        var arrowWalkEffect = this.sound.add('pisadas', {volume: 0.01});
        arrowWalkEffect.loop = false;
        arrowWalkEffect.play();*/
        
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
            frames: this.anims.generateFrameNumbers('book', {start: 4, end: 9}),
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
        /*
        // The state machine managing the heroB
        this.stateMachine3 = new StateMachine3('idle3', {
            idle3: new IdleState3(),
            move3: new MoveState3(),
        }, [this, this.heroB, this.sword]);

        this.anims.create({
            key: 'idle3',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('heroB', {start: 0, end: 17}),
        });
        this.anims.create({
            key: 'static3',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('sword', {start: 0, end: 0}),
        });
        this.anims.create({
            key: 'shoot3',
            frameRate: 3,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('sword', {start: 1, end: 4}),
        });          
        this.anims.create({
            key: 'walk-down3',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('heroB', {start: 18, end: 29}),
        });
        this.anims.create({
            key: 'walk-right3',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('heroB', {start: 18, end: 29}),
        });
        this.anims.create({
            key: 'walk-up3',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('heroB', {start: 18, end: 29}),
        });
        this.anims.create({
            key: 'walk-left3',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('heroB', {start: 30, end: 42}),
        });*/
        this.anims.create({
            key: 'open',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('palanca', {start: 1, end: 1}),
        });
        this.anims.create({
            key: 'hole',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('pasarela', {start: 0, end: 0}),
        });
        this.anims.create({
            key: 'bridge',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('pasarela', {start: 0, end: 4}),
        });
        this.anims.create({
            key: 'doorClosedV',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('lockV', {start: 0, end: 0}),
        });
        this.anims.create({
            key: 'doorOpeningV',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('lockV', {start: 0, end: 8}),
        });
        this.anims.create({
            key: 'doorCloseningV',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('lockV', {start: 8, end: 16}),
        });
        this.anims.create({
            key: 'doorOpenedV',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('lockV', {start: 8, end: 8}),
        });
        this.anims.create({
            key: 'doorClosedH',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('lockH', {start: 0, end: 0}),
        });
        this.anims.create({
            key: 'doorOpeningH',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('lockH', {start: 0, end: 8}),
        });
        this.anims.create({
            key: 'doorCloseningH',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('lockH', {start: 8, end: 16}),
        });
        this.anims.create({
            key: 'doorOpenedH',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('lockH', {start: 8, end: 8}),
        });
        this.anims.create({
            key: 'moveFire',
            frameRate: 35,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('llamas', {start: 0, end: 14}),
        });
        this.anims.create({
            key: 'openChest',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('chest', {start: 0, end: 1}),
        });
        this.anims.create({
            key: 'littleE',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 5}),
        });
        this.anims.create({
            key: 'bigE',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('bigExplosion', {start: 0, end: 5}),
        });
        this.anims.create({
            key: 'spiderMove',
            frameRate: 15,
            repeat: 1,
            frames: this.anims.generateFrameNumbers('spider', {start: 0, end: 4}),
        });
            
        }
    
    update() {
        if(document.readyState === 'complete'){
            if(this.heroA.lifes !== 0){
                this.stateMachine.step();
                this.bow.x = this.heroA.body.position.x+15;
                this.bow.y = this.heroA.body.position.y+10;
                //if(this.heroA.body.velocity.x > 0){ audioRep();}
            }else{
                this.bow.disableBody(true, true);    
            }
        
            if(this.heroC.lifes !== 0){ 
                this.stateMachine2.step2();
                this.book.x = this.heroC.body.position.x+15;
                this.book.y = this.heroC.body.position.y+10;
            }else{
                this.book.disableBody(true, true);
            }
        
            //this.stateMachine3.step3();    
            //this.sword.x = this.heroB.body.position.x+10;
            //this.sword.y = this.heroB.body.position.y+15;

            cambioCamA(this.heroA, this.heroC, this.cameras, funDoors);
            //doorRegulation(posX, posY, this.lock9, this.lock11);
            //cambioCamC(this.heroC, this.heroA, this.cameras); 
            //this.sound.play('tog');
            
            //Movimiento de las arañas
            if(this.heroA.lifes !== 0){
                var distA = Phaser.Math.Distance.BetweenPoints(this.heroA, this.spider1);
            }else{
                var distA = 5000;
                this.heroA.disableBody(true, true);
                this.heroA.setActive(false);
                this.heroA.setVisible(false);
            }
            
            if(this.heroC.lifes !== 0){
                var distC = Phaser.Math.Distance.BetweenPoints(this.heroC, this.spider1);
            }else{
                var distC = 5000;
                this.heroC.disableBody(true, true);
                this.heroC.setActive(false);
                this.heroC.setVisible(false);
            }
            
            if(distA <= distC && distA !== 5000){
                this.physics.moveToObject(this.spider1, this.heroA, 50);
            }else if(distC !== 5000){
                this.physics.moveToObject(this.spider1, this.heroC, 50);
            }else{
                this.spider1.setVelocity(0);
            }
            //Animacion de la araña
            this.spider1.anims.play('spiderMove', true); 
        }
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
/*
class StateMachine3 {
        constructor(initialState3, possibleStates3, stateArgs3=[]) {
        this.initialState3 = initialState3;
        this.possibleStates3 = possibleStates3;
        this.stateArgs3 = stateArgs3;
        this.state3 = null;

    // State instances get access to the state machine via this.stateMachine.
    for (const state3 of Object.values(this.possibleStates3)) {
      state3.stateMachine3 = this;
    }
  }

  step3() {
    // On the first step, the state is null and we need to initialize the first state.
    if (this.state3 === null) {
      this.state3 = this.initialState3;
      this.possibleStates3[this.state3].enter3(...this.stateArgs3);
    }

    // Run the current state's execute
    this.possibleStates3[this.state3].execute3(...this.stateArgs3);
  }

  transition3(newState3, ...enterArgs3) {
    this.state3 = newState3;
    this.possibleStates3[this.state3].enter3(...this.stateArgs3, ...enterArgs3);
  }
}
*/

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
/*
class State3 {
  enter3() {

  }

  execute3() {

  }
}
*/

class IdleState extends State {
    enter(scene, heroA, bow, bg) { 
        
        bg.anims.play(`dungeon`, true);

        if(heroA.lifes !== 0){
            heroA.setVelocity(0);
            heroA.anims.play(`idle`, true);
            bow.anims.play('static', true);
        }
  }

  execute(scene, heroA, bow, bg) {
    const {left, right, up, down, space, left2, right2, up2, down2, space2, left3, right3, up3, down3, space3} = scene.keys;

    // Transition to move if pressing a movement key
    if (left.isDown || right.isDown || up.isDown || down.isDown) {
      this.stateMachine.transition('move');
      return;
    }
  }
}
    
class IdleState2 extends State2 {
    enter2(scene, heroC, book) {
    
        if(heroC.lifes !== 0){ 
            heroC.setVelocity(0);
            heroC.anims.play(`idle2`, true);
            book.anims.play('static2', true);
        }
    }

  execute2(scene, heroC, book) {
    const {left, right, up, down, space, left2, right2, up2, down2, space2, left3, right3, up3, down3, space3} = scene.keys;

    // Transition to move if pressing a movement key
    if (left2.isDown || right2.isDown || up2.isDown || down2.isDown) {
      this.stateMachine2.transition2('move2');
      return;
    }
  }
}
/*
class IdleState3 extends State3 {
    enter3(scene, heroB, sword) {
    heroB.setVelocity(0);
    heroB.anims.play(`idle3`, true);
    sword.anims.play('static3', true);
  }

  execute3(scene, heroB, sword) {
    const {left, right, up, down, space, left2, right2, up2, down2, space2, left3, right3, up3, down3, space3} = scene.keys;

    // Transition to move if pressing a movement key
    if (left3.isDown || right3.isDown || up3.isDown || down3.isDown) {
      this.stateMachine3.transition3('move3');
      return;
    }
  }
}
*/

class MoveState extends State {
    execute(scene, heroA, bow, bg) {
        const {left, right, up, down, space, left2, right2, up2, down2, space2, left3, right3, up3, down3, space3} = scene.keys;

        // Transition to idle if not pressing movement keys
        if (!(left.isDown || right.isDown || up.isDown || down.isDown)) {
          this.stateMachine.transition('idle');
          return;
        }

        if(heroA.lifes !== 0){ 
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
}

class MoveState2 extends State2 {
    execute2(scene, heroC, book) {
        const {left, right, up, down, space, left2, right2, up2, down2, space2, left3, right3, up3, down3, space3} = scene.keys;

        // Transition to idle if not pressing movement keys
        if (!(left2.isDown || right2.isDown || up2.isDown || down2.isDown)) {
          this.stateMachine2.transition2('idle2');
          return;
        }
    
        if(heroC.lifes !== 0){
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
}
/*
class MoveState3 extends State3 {
  execute3(scene, heroB, sword) {
    const {left, right, up, down, space, left2, right2, up2, down2, space2, left3, right3, up3, down3, space3} = scene.keys;

    // Transition to idle if not pressing movement keys
    if (!(left3.isDown || right3.isDown || up3.isDown || down3.isDown)) {
      this.stateMachine3.transition3('idle3');
      return;
    }

    heroB.setVelocity(0);
    if (up3.isDown) {
        heroB.setVelocityY(-80);
        heroB.direction = 'up';
    } else if (down3.isDown) {
        heroB.setVelocityY(80);
        heroB.direction = 'down';
    }
    if (left3.isDown) {
        heroB.setVelocityX(-100);
        heroB.direction = 'left';
    } else if (right3.isDown) {
        heroB.setVelocityX(100);
        heroB.direction = 'right';
    }

    heroB.anims.play(`walk-${heroB.direction}3`, true);
  }
}
*/

//Manejo de punteros
var f = function(pointer) {
    var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bow.x, this.bow.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    this.bow.setAngle(angle);
}

var f2 = function(pointer) {
    var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.book.x, this.book.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    this.book.setAngle(angle);
}
/*
var f3 = function(pointer) {
    var angle = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.sword.x, this.sword.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    this.sword.setAngle(angle);
}
*/    
var s = function(pointer) {
    if(pointer.leftButtonDown()){
    this.bow.anims.play('shoot', true);
    var flecha = this.flechas.get(this.bow.x, this.bow.y);
    var angle1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bow.x, this.bow.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    var angle2 = Phaser.Math.Angle.Between(this.bow.x, this.bow.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    var arrowShootEffect = this.sound.add('disparoFlecha', {volume: 5});
    arrowShootEffect.loop = false;
    arrowShootEffect.play();
    if (flecha) {
        flecha.setActive(true);
        flecha.setVisible(true);
        flecha.setAngle(angle1);
        this.physics.velocityFromRotation(angle2, 600, flecha.body.velocity);
        this.flechas.size--;
        this.physics.add.collider(flecha, platforms, hitArrowWall, null, this);
        this.physics.add.collider(flecha, platforms2, hitArrowWall, null, this);
        this.physics.add.collider(flecha, platforms3, hitArrowWall, null, this);
        this.physics.add.collider(flecha, this.palanca, hitArrowLever, null, this);
        this.physics.add.collider(this.heroA, flecha, hitArrowHero, null, this);
    }
        }
}
        
var s2 = function(pointer) {
    if(pointer.rightButtonDown()){
    this.book.anims.play('shoot2', true);
    var llama = this.llamas.get(this.book.x, this.book.y);
    this.llamas.playAnimation('moveFire');
    var angle1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.book.x, this.book.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    var angle2 = Phaser.Math.Angle.Between(this.book.x, this.book.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    var fireShootEffect = this.sound.add('disparoFuego', {volume: 1});
    fireShootEffect.loop = false;
    fireShootEffect.play();
    if (llama) {
        llama.setActive(true);
        llama.setVisible(true);
        llama.setAngle(angle1);
        this.physics.velocityFromRotation(angle2, 500, llama.body.velocity);
        this.physics.add.collider(llama, platforms, hitFireWall, null, this);
        this.physics.add.collider(llama, platforms2, hitFireWall, null, this);
        this.physics.add.collider(llama, platforms3, hitFireWall, null, this);
    }
    }
}
/*
var rate = 0;

var s3 = function(pointer) {
    var angle1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.sword.x, this.sword.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    var angle2 = Phaser.Math.Angle.Between(this.sword.x, this.sword.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    if(rate < 100){
        this.sword.anims.play('shoot3', true);
        rate = Math.floor(Math.random() * 31) + rate;
        this.physics.add.collider(this.sword, spiderWeb, hitWeb, null, this);
        console.log(rate);
    }else{
        rate = 0;
    }
}
*/
//Colision de proyectiles
function hitArrowWall (flecha, platforms){
    flecha.setVelocity(0);
    var arrowHitEffect = this.sound.add('impactoFlecha', {volume: 0.1});
    arrowHitEffect.loop = false;
    arrowHitEffect.play();
}

var aux1 = false;
function hitArrowLever (flecha, palanca){
    flecha.setVelocity(0);
    var arrowHitEffect = this.sound.add('impactoFlecha', {volume: 0.1});
    arrowHitEffect.loop = false;
    arrowHitEffect.play();
    if(aux1 == false){
        this.palanca.anims.play('open', true);
        this.pasarela.anims.play('bridge', true);
        this.lock9.anims.play('doorOpeningV', true);
        this.lock11.anims.play('doorOpeningV', true);
        removable.clear();
        var hijoPlat3 = platforms3.getChildren();
        hijoPlat3[0].body.enable = false;
        hijoPlat3[1].body.enable = false;
        aux1 = true;
    }

}
var numFire = 0;
function hitFireWall (llama, platforms){
    llama.setVelocity(0);
    llama.setActive(false);
    llama.setVisible(false);
    console.log(numFire);
    if(numFire > 2){
        this.explosion2 = this.physics.add.sprite(llama.x, llama.y, 'bigExplosion', 0);
        this.explosion2.anims.play('bigE', true);
        //funcion
        this.explosion2.body.enable = false;
        numFire = 0;
    }else{
        this.explosion = this.physics.add.sprite(llama.x, llama.y, 'explosion', 0);
        this.explosion.anims.play('littleE', true);
        //funcion
        this.explosion.body.enable = false;
        numFire++;
    }
    var fireHitEffect = this.sound.add('impactoFuego', {volume: 0.5});
    fireHitEffect.loop = false;
    fireHitEffect.play();
}

function hitWeb(sword, spiderWeb){
    spiderWeb.setActive(false);
    spiderWeb.setVisible(false);
}
    
function hitArrowHero (heroA, flecha){
    flecha.destroy();
    this.flechas.size++;
}

var aux2 = false;
function playerChest(player, chest){
    if(aux2 == false){
        this.chest.anims.play('openChest', true);
        this.lock12.anims.play('doorOpeningH', true);
        this.lock15.anims.play('doorOpeningV', true);
        var hijoPlat3 = platforms3.getChildren();
        hijoPlat3[2].body.enable = false;
        hijoPlat3[3].body.enable = false;
        aux2 = true;
    }
}

function cambioCamA(heroA, heroC, cameras, funDoors){
    if(heroA.body.position.x > 420 + posX){
        posX = posX + 420;
        tilex = tilex + 1;
        cameras.main.setBounds(posX,posY,420,320);
        cambioSala(posX, posY);
        doorRegulation(tilex, tiley, funDoors);
        heroC.x = posX + 65; 
        heroC.y = posY + 90;
        heroA.x = posX + 65;
        
        heroAHearts.x = heroAHearts.x + 420;
        heroAEmptyHearts.x = heroAEmptyHearts.x + 420;
    
        heroCHearts.x = heroCHearts.x + 420;
        heroCEmptyHearts.x = heroCEmptyHearts.x + 420;
    }else if(heroA.body.position.x < posX){
        posX = posX - 420;
        tilex = tilex - 1;
        cameras.main.setBounds(posX,posY,420,320);
        cambioSala(posX, posY);
        doorRegulation(tilex, tiley, funDoors);
        heroC.x = posX + 355; 
        heroC.y = posY + 90;
        heroA.x = posX + 355;
        
        heroAHearts.x = heroAHearts.x - 420;
        heroAEmptyHearts.x = heroAEmptyHearts.x - 420;
    
        heroCHearts.x = heroCHearts.x - 420;
        heroCEmptyHearts.x = heroCEmptyHearts.x - 420;
    }
    if(heroA.body.position.y > 320 + posY){
        posY = posY + 320;
        tiley = tiley + 1;
        cameras.main.setBounds(posX,posY,420,320);
        cambioSala(posX, posY);
        doorRegulation(tilex, tiley, funDoors);
        heroC.x = posX + 120;
        heroC.y = posY + 50;
        heroA.y = posY + 50;
        
        heroAHearts.y = heroAHearts.y + 320;
        heroAEmptyHearts.y = heroAEmptyHearts.y + 320;
    
        heroCHearts.y = heroCHearts.y + 320;
        heroCEmptyHearts.y = heroCEmptyHearts.y + 320;
    }else if(heroA.body.position.y < posY){
        posY = posY - 320;
        tiley = tiley - 1;
        cameras.main.setBounds(posX,posY,420,320);
        cambioSala(posX, posY);
        doorRegulation(tilex, tiley, funDoors);
        heroC.x = posX + 120;
        heroC.y = posY + 240;
        heroA.y = posY + 240;
        
        heroAHearts.y = heroAHearts.y - 320;
        heroAEmptyHearts.y = heroAEmptyHearts.y - 320;
    
        heroCHearts.y = heroCHearts.y - 320;
        heroCEmptyHearts.y = heroCEmptyHearts.y - 320;
    }
}

function cambioCamC(heroC, heroA, cameras){
    if(heroC.body.position.x > 420 + posX){
        posX = posX + 420;
        tilex = tilex + 1;
        cameras.main.setBounds(posX,posY,420,320);
        cambioSala(posX, posY);
        heroA.x = posX + 65; 
        heroA.y = 90;
        heroC.x = posX + 65;
            
    }else if(heroC.body.position.x < posX){
        posX = posX - 420;
        tilex = tilex - 1;
        cameras.main.setBounds(posX,posY,420,320);
        cambioSala(posX, posY);
        heroC.x = posX + 355; 
        heroC.y = 90;
        heroA.x = posX + 355;
    }
    if(heroC.body.position.y > 320 + posY){
        posY = posY + 320;
        tilex = tilex +1
        cameras.main.setBounds(posX,posY,420,320);
        cambioSala(posX, posY);
    }else if(heroC.body.position.y < posY){
        posY = posY - 320;
        cameras.main.setBounds(posX,posY,420,320);
        cambioSala(posX, posY);
    }
    if(heroC.body.position.y > 320 + posY){
        posY = posY + 320;
        cameras.main.setBounds(posX,posY,420,320);
        cambioSala(posX, posY);
    }else if(heroC.body.position.y < posY){
        posY = posY - 320;
        cameras.main.setBounds(posX,posY,420,320);
        cambioSala(posX, posY);
    }
}

function cambioSala(posX, posY){
    platforms.setAlpha(0);
    platforms.clear();
    platforms.create(posX + 65, posY + 12, 'colliderH');
    platforms.create(posX + 143, posY + 12, 'colliderH');
    platforms.create(posX + 276, posY + 12, 'colliderH');
    platforms.create(posX + 350, posY + 12, 'colliderH');
    platforms.create(posX + 65, posY + 278, 'colliderH');
    platforms.create(posX + 143, posY + 278, 'colliderH');
    platforms.create(posX + 276, posY + 278, 'colliderH');
    platforms.create(posX + 350, posY + 278, 'colliderH');
    platforms.create(posX + 34, posY + 61, 'colliderV');
    platforms.create(posX + 34, posY + 81, 'colliderV');
    platforms.create(posX + 34, posY + 218, 'colliderV');
    platforms.create(posX + 34, posY + 228, 'colliderV');
    platforms.create(posX + 388, posY + 61, 'colliderV');
    platforms.create(posX + 388, posY + 81, 'colliderV');
    platforms.create(posX + 388, posY + 218, 'colliderV');
    platforms.create(posX + 388, posY + 228, 'colliderV');

    var children = platforms.getChildren();

    for (var i = 0; i < children.length; i++)
    {
        children[i].setDepth(-5);
    }

    children = rooms.getChildren();
    children[0].x = posX + 210; // + 630
    children[0].y = posY + 160;
    children[1].x = posX + 210;
    children[1].y = posY + 160;

    children = nieblas.getChildren();
    children[0].x = posX + 630;
    children[0].y = posY + 160;     
}

function doorRegulation(tilex, tiley, funDoors){
    var cerrojos = funDoors.getChildren();
    var lockCollider = platforms3.getChildren();
            switch(tilex){
                case 1:
                    switch(tiley){
                        case 1:
                            if(auxLock2 === false){
                                /*
                                lock9.setVisible(true);
                                lock11.setVisible(true);
                                lock9.anims.play('doorCloseningV', true);
                                lock11.anims.play('doorCloseningV', true);
                                auxLock2 = true;*/
                                cerrojos[0].setVisible(true);
                                cerrojos[1].setVisible(true);
                                cerrojos[0].anims.play('doorCloseningV', true);
                                cerrojos[1].anims.play('doorCloseningV', true);
                                lockCollider[0].body.enable = true;
                                lockCollider[1].body.enable = true;
                                auxLock2 = true;
                            }
                        break;
                    }
                    break;
                case 2:
                    switch(tiley){
                        case 1:
                            if(auxLock3 === false){
                                /*lock12.setVisible(true);
                                lock15.setVisible(true);
                                lock12.anims.play('doorCloseningH', true);
                                lock15.anims.play('doorCloseningV', true);
                                auxLock3 = true;*/
                                cerrojos[2].setVisible(true);
                                cerrojos[3].setVisible(true);
                                cerrojos[2].anims.play('doorCloseningH', true);
                                cerrojos[3].anims.play('doorCloseningV', true);
                                lockCollider[2].body.enable = true;
                                lockCollider[3].body.enable = true;
                                auxLock3 = true;
                            }
                        break;
                }
                break;
            }

}

var boolA = true;
var boolC = true;

function activateDamage(){
    boolA = true;
    boolC = true;
}

function damageA(hero, enemy){

    //Comprueba que hayan pasado 3 segundos desde la ultima colision
    if(boolA === true){
        //Aplica daño
        hero.lifes = hero.lifes - enemy.damage;
        console.log(true);
        
        //Dibuja corazones vacios
        if(hero.lifes >= 0){
            heroAHearts.list[hero.lifes].disableBody(true, true);
        }
        boolA = false;
    }
}

function damageC(hero, enemy){

    //Comprueba que hayan pasado 3 segundos desde la ultima colision
    if(boolC === true){
        //Aplica daño
        hero.lifes = hero.lifes - enemy.damage;
        console.log(true);
        
        //Dibuja corazones vacios
        if(hero.lifes >= 0){
            heroCHearts.list[hero.lifes].disableBody(true, true);
        }
        boolC = false;
    }
}

function damageEnemy(enemy, weapon){
    enemy.disableBody(true, true);
    enemy.setActive(false);
}