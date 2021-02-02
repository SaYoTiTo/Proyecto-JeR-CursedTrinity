import {game} from './game.js';

var currentScene;

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
var auxM;

var heroAx;
var heroAy;
var hurtingHeroA = false;
var heroCx;
var heroCy;
var hurtingHeroC = false;

var aux2 = false;
var generateReward;
var generateRewardAnim;
var heartMovement = false;

var door0;
var door1;
var door2;
var door3;

var groupSpiders;
var numberSpiders;
var groupDevils;
var numberDevils;
var boolTear = false;
var boolDevil = new Array();
var groupCentinels;
var numberCentinels;
var boolCentinels = false;
var killCount = 0;

var idx = 0;
var boolLever = new Array();
var leverX = new Array();
var leverY = new Array();
var bridgeX = new Array();
var bridgeY = new Array();
var groupLevers;
var groupBridges;

var pIdx = 0;
var pRockX = new Array();
var pRockY = new Array();
var groupPuzzleRocks;

var nIdx = 0;
var nRockX = new Array();
var nRockY = new Array();
var groupNormalRocks;

var deathExist = false;
var deathBoss;
var lifeBoss = 10;
var timerBoss;
var lHand1;
var lHand2;
var rHand1;
var rHand2;
var timerDeath1;
var timerDeath2;
var timerDeath3;
var timerDeath4;
var boolDeath1 = false;
var boolDeath2 = false;
var boolDeath3 = false;
var boolDeath4 = false;
var boolHand = true;

var posX = 0.5;
var posY = 0.5;
var tilex = 0;
var tiley = 0;
var auxLock1 = false;
var auxLock2 = false;
var auxLock3 = false;
var auxLock3 = false;
var timer;
var timerTear;
var music2;

var sizeFlechas = 4;

var heroAHearts;
var heroAEmptyHearts;
var heroCHearts;
var heroCEmptyHearts;


export default class BaseGame extends Phaser.Scene{
    
    constructor(key){
        super(key);
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
            
        this.input.mouse.disableContextMenu();
        
        //The walls
        platforms = this.physics.add.staticGroup();
        
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
            child[i].setVisible(false);
        }
        //The always locked doors
        platforms2 = this.physics.add.staticGroup();
        
        platforms2.create(210, 12, 'colliderH');  //0   
        platforms2.create(388, 150, 'colliderV'); //1
        platforms2.create(210, 278, 'colliderH'); //2  
        platforms2.create(34, 150, 'colliderV'); //3

        child = platforms2.getChildren();

        for (var i = 0; i < child.length; i++)
        {
            child[i].setDepth(-5);
            child[i].setVisible(false);
        }
        
        // Static background
        rooms = this.physics.add.staticGroup();

        rooms.create(210, 160, 'bg', 0);
        rooms.playAnimation('dungeon');

        //The locks
        doors = this.physics.add.staticGroup();
        //Sala 
        doors.create(208, 29, 'lockH');//0
        doors.create(390, 160, 'lockV');//1
        doors.create(208, 283, 'lockH');//2
        doors.create(35, 160, 'lockV');//3

        child = doors.getChildren();

        for (var i = 0; i < child.length; i++)
        {
            child[i].setDepth(-3);
            
        }

        this.bg = this.physics.add.sprite(210, 160, 'bg', 0);
        
        //The lever and bridge
        groupLevers = this.physics.add.staticGroup();
        groupBridges = this.physics.add.staticGroup();
        abism = this.physics.add.staticGroup();
        removable = this.physics.add.staticGroup();
        
        for(var i = 0; i < idx; i++){
            groupLevers.create(leverX[i], leverY[i], 'palanca', 0);
            groupBridges.create(bridgeX[i], bridgeY[i], 'pasarela', 0);
            abism.create(bridgeX[i], bridgeY[i] - 79, 'colliderAbismo').setVisible(false);
            abism.create(bridgeX[i], bridgeY[i] + 47, 'colliderAbismo').setVisible(false);
            removable.create(bridgeX[i], bridgeY[i] - 10, 'colliderRemovible').setVisible(false);
            if(boolLever[i] === false){
                child = groupLevers.getChildren();
                child[i].anims.play('open', true);
                child = groupBridges.getChildren();
                child[i].anims.play('bridge', true);
                child = removable.getChildren();
                child[i].body.enable = false;
            }
        }
        
        //The normal rocks
        groupNormalRocks = this.physics.add.staticGroup();
        
        for(var i = 0; i < nIdx; i++){
            groupNormalRocks.create(nRockX[i], nRockY[i], 'nRock', 0);
        }
        
        //The puzzle rocks
        groupPuzzleRocks = this.physics.add.group();
        
        for(var i = 0; i < pIdx; i++){
            groupPuzzleRocks.create(pRockX[i], pRockY[i], 'pRock', 0);
        }
        
        var rockColliders = this.physics.add.staticGroup();
        
        if(pIdx > 0){ 
            rockColliders.create(65, 42, 'colliderH');
            rockColliders.create(143, 42, 'colliderH');
            rockColliders.create(276, 42, 'colliderH');
            rockColliders.create(350, 42, 'colliderH');
            child = rockColliders.getChildren();

            for (var i = 0; i < child.length; i++)
            {
                child[i].setDepth(-5);
                child[i].setVisible(false);
            }
        }
        
        // The movable bow character
        this.heroA = this.physics.add.sprite(heroAx, heroAy, 'hero', 0);
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
        this.heroC = this.physics.add.sprite(heroCx, heroCy, 'heroC', 0);
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
        
        //The chest
        if(generateReward === true){
            this.chest = this.physics.add.staticSprite(210, 160, 'chest', 0);
            if(generateRewardAnim === true){
                this.chest.anims.play('openChest', true);
                this.physics.add.collider(this.heroA, this.chest);
                this.physics.add.collider(this.heroC, this.chest);
            }else{
                this.physics.add.collider(this.heroA, this.chest, playerChest, null, this);
                this.physics.add.collider(this.heroC, this.chest, playerChest, null, this);
                this.addH = this.physics.add.sprite(this.chest.x, this.chest.y, 'miniHeart', 0);
                this.addH.setVisible(false);
                this.physics.add.collider(this.heroA, this.addH, healA, null, this);
                this.physics.add.collider(this.heroC, this.addH, healC, null, this);
            }
        }
        
        //The spider
        groupSpiders = this.physics.add.group();
        
        for(var i = 0; i < numberSpiders; i++){
            var spiderX = Phaser.Math.Between(105, 315);
            var spiderY = Phaser.Math.Between(160, 240);
            groupSpiders.create(spiderX, spiderY, 'spider');
            //this.spider1 = this.physics.add.sprite(340,480,'spider').setScale(2).refreshBody(); 
            //this.spider1.damage = 1;
        }
        
        child = groupSpiders.getChildren();

        for (var i = 0; i < child.length; i++)
        {
            child[i].damage = 1;
            
            //Collider de la araña con los personajes
            timer = this.time.addEvent({ delay: 3000, callback: activateDamage, callbackScope: this, loop: true });
            this.physics.add.collider(this.heroA, child[i], damageA, null, this);
            this.physics.add.collider(this.heroC, child[i], damageC, null, this);        
            
            //Collider de la araña con las flechas
            this.physics.add.overlap(this.flechas, child[i], damageEnemy, null, this);
            this.physics.add.overlap(this.llamas, child[i], damageEnemy, null, this); 
            
        }
        
        //The devils
        groupDevils = this.physics.add.group();
        
        for(var i = 0; i < numberDevils; i++){
            var devilX = Phaser.Math.Between(105, 315);
            var devilY = Phaser.Math.Between(160, 240);
            groupDevils.create(devilX, devilY, 'devil');
            //this.spider1 = this.physics.add.sprite(340,480,'spider').setScale(2).refreshBody(); 
            //this.spider1.damage = 1;
        }
        
        child = groupDevils.getChildren();

        for (var i = 0; i < child.length; i++)
        {
            child[i].damage = 1;
            boolDevil[i] = true;
            //Collider del diablo con los personajes
            timerTear = this.time.addEvent({ delay: 3000, callback: activateTear, callbackScope: this, loop: true });        
            
            //Collider del diablo con las flechas
            this.physics.add.overlap(this.flechas, child[i], damageDevil, null, this);
            this.physics.add.overlap(this.llamas, child[i], damageDevil, null, this); 
            
        }
        
        //The tears
        this.lagrimas = this.physics.add.group({
            defaultKey: 'lagrimas',
            //maxSize: 4,
            //size: 4,
        });
        
        //The centinels
        groupCentinels = this.physics.add.group();
        
        for(var i = 0; i < numberCentinels; i++){
            var centinelX = Phaser.Math.Between(105, 315);
            var centinelY = Phaser.Math.Between(160, 240);
            groupCentinels.create(centinelX, centinelY, 'centinel');
        }
        
        child = groupCentinels.getChildren();

        for (var i = 0; i < child.length; i++)
        {
            child[i].damage = 2;
            
            //Collider del centinela con los personajes
            timer = this.time.addEvent({ delay: 1500, callback: activateDamage, callbackScope: this, loop: true });
            this.physics.add.collider(this.heroA, child[i], damageCentinelA, null, this);
            this.physics.add.collider(this.heroC, child[i], damageCentinelC, null, this);        
            
            //Collider del centinela con las flechas
            this.physics.add.overlap(this.flechas, child[i], damageEnemy, null, this);
            this.physics.add.overlap(this.llamas, child[i], damageEnemy, null, this); 
            
        }
        
        //The top in view
        this.top = this.physics.add.sprite(210, 160, 'top', 0);
        rooms.create(210,160, 'top', 0); 
        
        //Boss Death
        if(deathExist === true){
            deathBoss = this.physics.add.sprite(210, 50, 'theDeath').setScale(2).refreshBody();
            deathBoss.anims.play('idleDeath', true);
            timerBoss = this.time.addEvent({ delay: 1000, callback: activateBoss, callbackScope: this, loop: true });
            this.physics.add.overlap(this.flechas, deathBoss, damageBoss, null, this);
            this.physics.add.overlap(this.llamas, deathBoss, damageBoss, null, this); 
            rHand1 = this.physics.add.sprite(260, 50, 'rHand');
            timerDeath1 = this.time.addEvent({ delay: 3000, callback: activateDeath1, callbackScope: this, loop: true });
            rHand2 = this.physics.add.sprite(370, 90, 'rHand');
            timerDeath2 = this.time.addEvent({ delay: 1000, callback: activateDeath2, callbackScope: this, loop: true });
            lHand1 = this.physics.add.sprite(160, 50, 'lHand');
            timerDeath3 = this.time.addEvent({ delay: 2000, callback: activateDeath3, callbackScope: this, loop: true });
            lHand2 = this.physics.add.sprite(50, 90, 'lHand');
            timerDeath4 = this.time.addEvent({ delay: 4000, callback: activateDeath4, callbackScope: this, loop: true });
        }
        
        //The death fireballs
        this.fatuos = this.physics.add.group({
            defaultKey: 'llamasF'
        });
        
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
        //Arrow HUD
        var arrowHUD = this.physics.add.sprite(15,10,'arrowHUD').setScale(0.18).refreshBody();
        
        //Arrow Empty hearts
        heroAEmptyHearts = this.add.container(40,10);
        var AEmptyHeart1 = this.physics.add.sprite(0,0,'emptyHeart').setScale(0.2).refreshBody();
        var AEmptyHeart2 = this.physics.add.sprite(20,0,'emptyHeart').setScale(0.2).refreshBody();
        var AEmptyHeart3 = this.physics.add.sprite(40,0,'emptyHeart').setScale(0.2).refreshBody();
        var AEmptyHeart4 = this.physics.add.sprite(60,0,'emptyHeart').setScale(0.2).refreshBody();
        var AEmptyHeart5 = this.physics.add.sprite(80,0,'emptyHeart').setScale(0.2).refreshBody();
        heroAEmptyHearts.addAt(AEmptyHeart1,0);
        heroAEmptyHearts.addAt(AEmptyHeart2,1);
        heroAEmptyHearts.addAt(AEmptyHeart3,2);
        heroAEmptyHearts.addAt(AEmptyHeart4,3);
        heroAEmptyHearts.addAt(AEmptyHeart5,4);
        
        //Arrow hearts
        heroAHearts = this.add.container(40,10);
        var AHeart1 = this.physics.add.sprite(0,0,'fullHeart').setScale(0.2).refreshBody();
        var AHeart2 = this.physics.add.sprite(20,0,'fullHeart').setScale(0.2).refreshBody();
        var AHeart3 = this.physics.add.sprite(40,0,'fullHeart').setScale(0.2).refreshBody();
        var AHeart4 = this.physics.add.sprite(60,0,'fullHeart').setScale(0.2).refreshBody();
        var AHeart5 = this.physics.add.sprite(80,0,'fullHeart').setScale(0.2).refreshBody();
        heroAHearts.addAt(AHeart1,0);
        heroAHearts.addAt(AHeart2,1);
        heroAHearts.addAt(AHeart3,2);
        heroAHearts.addAt(AHeart4,3);
        heroAHearts.addAt(AHeart5,4);
        
        //Cauldron HUD
        var cauldronHUD = this.physics.add.sprite(405,10,'cauldronHUD').setScale(0.2).refreshBody();
        
        //Cauldron Empty hearts
        heroCEmptyHearts = this.add.container(300,10);
        var CEmptyHeart1 = this.physics.add.sprite(0,0,'emptyHeart').setScale(0.2).refreshBody();
        var CEmptyHeart2 = this.physics.add.sprite(20,0,'emptyHeart').setScale(0.2).refreshBody();
        var CEmptyHeart3 = this.physics.add.sprite(40,0,'emptyHeart').setScale(0.2).refreshBody();
        var CEmptyHeart4 = this.physics.add.sprite(60,0,'emptyHeart').setScale(0.2).refreshBody();
        var CEmptyHeart5 = this.physics.add.sprite(80,0,'emptyHeart').setScale(0.2).refreshBody();
        heroCEmptyHearts.addAt(CEmptyHeart1,0);
        heroCEmptyHearts.addAt(CEmptyHeart2,1);
        heroCEmptyHearts.addAt(CEmptyHeart3,2);
        heroCEmptyHearts.addAt(CEmptyHeart4,3);
        heroCEmptyHearts.addAt(CEmptyHeart5,4);
        
        //Cauldron hearts
        heroCHearts = this.add.container(300,10);
        var CHeart1 = this.physics.add.sprite(0,0,'fullHeart').setScale(0.2).refreshBody();
        var CHeart2 = this.physics.add.sprite(20,0,'fullHeart').setScale(0.2).refreshBody();
        var CHeart3 = this.physics.add.sprite(40,0,'fullHeart').setScale(0.2).refreshBody();
        var CHeart4 = this.physics.add.sprite(60,0,'fullHeart').setScale(0.2).refreshBody();
        var CHeart5 = this.physics.add.sprite(80,0,'fullHeart').setScale(0.2).refreshBody();
        heroCHearts.addAt(CHeart1,0);
        heroCHearts.addAt(CHeart2,1);
        heroCHearts.addAt(CHeart3,2);
        heroCHearts.addAt(CHeart4,3);
        heroCHearts.addAt(CHeart5,4);
        
        //Colliders
        this.physics.add.collider(this.heroA, platforms);
        this.physics.add.collider(this.heroC, platforms);
        this.physics.add.collider(this.heroA, platforms2);
        this.physics.add.collider(this.heroC, platforms2);
        this.physics.add.collider(this.heroA, groupPuzzleRocks);
        this.physics.add.collider(this.heroC, groupPuzzleRocks);
        this.physics.add.collider(this.heroA, groupNormalRocks);
        this.physics.add.collider(this.heroC, groupNormalRocks);
        this.physics.add.collider(groupPuzzleRocks, groupNormalRocks);
        this.physics.add.collider(groupPuzzleRocks, groupPuzzleRocks);
        this.physics.add.collider(groupPuzzleRocks, platforms);
        this.physics.add.collider(groupPuzzleRocks, rockColliders);
        this.physics.add.collider(groupNormalRocks, platforms);

        this.physics.add.collider(this.heroA, abism);
        this.physics.add.collider(this.heroC, abism);
        this.physics.add.collider(this.heroA, removable);
        this.physics.add.collider(this.heroC, removable);
        this.physics.add.collider(this.heroA, this.palanca);
        this.physics.add.collider(this.heroC, this.palanca);
        //this.physics.add.collider(this.heroB, platforms);
        //this.physics.add.collider(this.heroA, spiderWeb);
        //this.physics.add.collider(this.heroC, spiderWeb);
        //this.physics.add.collider(this.heroB, spiderWeb);
        this.physics.add.collider(this.heroA, this.heroC);
        //this.physics.add.collider(this.heroA, this.heroB);
        //this.physics.add.collider(this.heroB, this.heroC);
        
        
        //The sound effects and music
        music2 = this.sound.add('dungeonMusic', {volume: 0.03/this.registry.get('vol')});
        music2.loop = true;
        
        
        //The pause
        this.input.keyboard.on('keydown-P', pause, this);

        /*
        var arrowWalkEffect = this.sound.add('pisadas', {volume: 0.01/this.registry.get('vol')});
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
            frames: this.anims.generateFrameNumbers('heroA', {start: 30, end: 41}),
        });
        this.anims.create({
            key: 'damage1',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('heroA', {start: 42, end: 43}),
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
        this.anims.create({
            key: 'damage2',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('heroC', {start: 44, end: 45}),
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
            repeat: -1,
            frames: this.anims.generateFrameNumbers('spider', {start: 0, end: 4}),
        });
        this.anims.create({
            key: 'centinelMove',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('centinel', {start: 0, end: 3}),
        });
        this.anims.create({
            key: 'centinelExp',
            frameRate: 15,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('centinel', {start: 4, end: 8}),
        });
        this.anims.create({
            key: 'moveDevil',
            frameRate: 15,
            repeat: 1,
            frames: this.anims.generateFrameNumbers('devil', {start: 0, end: 3}),
        });
        this.anims.create({
            key: 'idleDeath',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('theDeath', {start: 0, end: 11}),
        });
        this.anims.create({
            key: 'damageDeath',
            frameRate: 7,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('theDeath', {start: 11, end: 12}),
        });
        this.anims.create({
            key: 'moveFatuo',
            frameRate: 15,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('llamasF', {start: 0, end: 14}),
        });
            
        }
    
    setCurrentScene(xx){
        currentScene = xx;
    }
    
    getPosX(){
        return posX;
    }
    
    getPosY(){
        return posY;
    }
    
    restartPos(){
        posX = 0.5;
        posY = 0.5;
    }
    
    setHeroAx(xx, yy){
        heroAx = xx;
        heroAy = yy;
    }
    
    setHeroCx(xx, yy){
        heroCx = xx;
        heroCy = yy;
    }
    
    getHeroALifes(){
        return this.heroA.lifes;
    }
    
    getHeroCLifes(){
        return this.heroC.lifes;
    }
    
    getArrows(){
        return sizeFlechas;
    }
    
    setArrows(xx){
        sizeFlechas = xx;
    }
    
    
    setHeroALifes(xx){
        var aux = xx;
        while(5 - aux){
            this.heroA.lifes--;
            changeHeartsA(this.heroA);
            aux++;
        }
    }
    
    setHeroCLifes(xx){
        var aux = xx;
        while(5 - aux){
            this.heroC.lifes--;
            changeHeartsC(this.heroC);
            aux++;
        }
    }
    
    setNumEnemies(xx, yy, zz){
        numberSpiders = xx;
        numberDevils = yy;
        numberCentinels = zz;
        killCount = 0;
        boolDevil = [];
    }
    
    openDoor(xx){
        var child = doors.getChildren();
        if(xx == 0 || xx == 2){
            child[xx].anims.play('doorOpeningH', true);
        }else if(xx == 1 || xx == 3){
            child[xx].anims.play('doorOpeningV', true);
        }
        
        child = platforms2.getChildren();
        child[xx].body.enable = false;
        
    }
    
    closeDoor(xx){
        var child = doors.getChildren();
        
        if(xx == 0 || xx == 2){
            child[xx].anims.play('doorCloseningH', true);
        }else if(xx == 1 || xx == 3){
            child[xx].anims.play('doorCloseningV', true);
        }

        
    }
    
    startOpenDoor(xx){
        var child = doors.getChildren();
        
        if(xx == 0 || xx == 2){
            child[xx].setVisible(false);
        }else if(xx == 1 || xx == 3){
            child[xx].setVisible(false);
        }
        
        child = platforms2.getChildren();
        child[xx].body.enable = false;
        
    }
    
    setOpenableDoors(xx, yy, ww, zz){
        door0 = xx;
        door1 = yy;
        door2 = ww;
        door3 = zz;
    }
    
    setReward(xx, yy){
        generateReward = xx;
        generateRewardAnim = yy;
    }
    
    setLevers(bb, xx, yy, ww, zz){
        boolLever[idx] = bb;
        leverX[idx] = xx;
        leverY[idx] = yy;
        bridgeX[idx] = ww;
        bridgeY[idx] = zz;
        idx++;
    }
    
    setPuzzleRock(xx, yy){
        pRockX[pIdx] = xx;
        pRockY[pIdx] = yy;
        pIdx++;
    }
    
    setNormalRock(xx, yy){
        nRockX[nIdx] = xx;
        nRockY[nIdx] = yy;
        nIdx++;
    }
    
    setBossDeath(xx){
        deathExist = xx;
        lifeBoss = 10;
        boolDeath1 = false;
        boolDeath2 = false;
        boolDeath3 = false;
        boolDeath4 = false;
        boolHand = xx;
    }
    
    resetLevers(){
        boolLever = [];
        leverX = [];
        leverY = [];
        bridgeX = [];
        bridgeY = [];
        idx = 0;
    }
    
    resetRocks(){
        nRockX = [];
        nRockY = [];
        pRockX = [];
        pRockY = [];
        nIdx = 0;
        pIdx = 0;
    }
    
    resetChests(){
        aux2 = false;
        heartMovement = false;
    }
    
    resetMusic(){
        auxM = false;
    }
    
    update() {
        this.flechas.size = sizeFlechas;
        if(document.readyState === 'complete'){
            if(auxM === false){
                music2.play();
                auxM = true;
            }
            
            if(this.heroA.lifes > 0){
                this.stateMachine.step();
                this.bow.x = this.heroA.body.position.x+15;
                this.bow.y = this.heroA.body.position.y+10;
            }else{
                this.bow.disableBody(true, true);
                this.heroA.disableBody(true, true);
                this.heroA.setVisible(false);
            }
            if(this.heroC.lifes > 0){ 
                this.stateMachine2.step2();
                this.book.x = this.heroC.body.position.x+15;
                this.book.y = this.heroC.body.position.y+10;
            }else{
                this.book.disableBody(true, true);
                this.heroC.disableBody(true, true);
                this.heroC.setVisible(false);
            }
            
            if(this.heroA.x > 400){
                posX++;
            }
            if(this.heroA.y > 300){
                posY++;
            }
            
            if(this.heroA.x < 20){
                posX--;
            }
            if(this.heroA.y < 20){
                posY--;
            }
            
            if(this.heroC.x > 400){
                posX++;
            }
            if(this.heroC.y > 280){
                posY++;
            }
            
            if(this.heroC.x < 30){
                posX--;
            }
            if(this.heroC.y < 30){
                posY--;
            }
            
            if(generateReward === true && generateRewardAnim === false){
                if(heartMovement === true && this.addH.y < 200){
                    this.addH.y++;
                }
            }

            //this.stateMachine3.step3();    
            //this.sword.x = this.heroB.body.position.x+10;
            //this.sword.y = this.heroB.body.position.y+15;
            
            //Movimiento de las arañas
            var child = groupSpiders.getChildren();

            for (var i = 0; i < child.length; i++)
            {
                if(this.heroA.lifes !== 0){
                    var distA = Phaser.Math.Distance.BetweenPoints(this.heroA, child[i]);
                }else{
                    var distA = 5000;
                    this.heroA.disableBody(true, true);
                    this.heroA.setActive(false);
                    this.heroA.setVisible(false);
                }
            
                if(this.heroC.lifes !== 0){
                    var distC = Phaser.Math.Distance.BetweenPoints(this.heroC, child[i]);
                }else{
                    var distC = 5000;
                    this.heroC.disableBody(true, true);
                    this.heroC.setActive(false);
                    this.heroC.setVisible(false);
                }
            
                if(distA <= distC && distA !== 5000){
                    this.physics.moveToObject(child[i], this.heroA, 50); 
                }else if(distC !== 5000){
                    this.physics.moveToObject(child[i], this.heroC, 50);
                }else{
                    child[i].setVelocity(0);
                }
                //Animacion de la araña
                child[i].anims.play('spiderMove', true);                
                
            
            }
            
            //Movimiento de los demonios
            child = groupDevils.getChildren();

            for (var i = 0; i < child.length; i++)
            {
                if(this.heroA.lifes !== 0){
                    var distA = Phaser.Math.Distance.BetweenPoints(this.heroA, child[i]);
                }else{
                    var distA = 5000;
                    this.heroA.disableBody(true, true);
                    this.heroA.setActive(false);
                    this.heroA.setVisible(false);
                }
            
                if(this.heroC.lifes !== 0){
                    var distC = Phaser.Math.Distance.BetweenPoints(this.heroC, child[i]);
                }else{
                    var distC = 5000;
                    this.heroC.disableBody(true, true);
                    this.heroC.setActive(false);
                    this.heroC.setVisible(false);
                }
            
                var angleTear1;
                var angleTear2;
                
                if(distA <= distC && distA !== 5000){
                    this.physics.moveToObject(child[i], this.heroA, 30); 
                    angleTear1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(child[i].x, child[i].y, this.heroA.x, this.heroA.y);
                    angleTear2 = Phaser.Math.Angle.Between(child[i].x, child[i].y, this.heroA.x, this.heroA.y);
                }else if(distC !== 5000){
                    this.physics.moveToObject(child[i], this.heroC, 30);
                    angleTear1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(child[i].x, child[i].y, this.heroC.x, this.heroC.y);
                    angleTear2 = Phaser.Math.Angle.Between(child[i].x, child[i].y, this.heroC.x, this.heroC.y);
                }else{
                    child[i].setVelocity(0);
                }
                //Animacion del demonio
                child[i].anims.play('moveDevil', true);  
                console.log(child[i].body.isEnabled);
                if(boolTear === true && boolDevil[i] === true){
                    var tear = this.lagrimas.get(child[i].x, child[i].y);
                    if(tear){
                        tear.setActive(true);
                        tear.setVisible(true);
                        tear.setAngle(angleTear1);
                        this.physics.velocityFromRotation(angleTear2, 200, tear.body.velocity);
                        this.physics.add.collider(tear, platforms, hitTearWall, null, this);
                        this.physics.add.collider(tear, this.heroA, hitTearA, null, this);
                        this.physics.add.collider(tear, this.heroC, hitTearC, null, this);
                        boolTear = false;
                    }
                }
            }
            
            //Movimiento de los centinelas
            child = groupCentinels.getChildren();

            for (var i = 0; i < child.length; i++)
            {
                if(this.heroA.lifes !== 0){
                    var distA = Phaser.Math.Distance.BetweenPoints(this.heroA, child[i]);
                    //console.log("distA: " + distA);
                }else{
                    var distA = 5000;
                    this.heroA.disableBody(true, true);
                    this.heroA.setActive(false);
                    this.heroA.setVisible(false);
                }
            
                if(this.heroC.lifes !== 0){
                    var distC = Phaser.Math.Distance.BetweenPoints(this.heroC, child[i]);
                }else{
                    var distC = 5000;
                    this.heroC.disableBody(true, true);
                    this.heroC.setActive(false);
                    this.heroC.setVisible(false);
                }
            
                if(distA <= distC && distA !== 5000){
                    this.physics.moveToObject(child[i], this.heroA, 40); 
                }else if(distC !== 5000){
                    this.physics.moveToObject(child[i], this.heroC, 40);
                }else{
                    child[i].setVelocity(0);
                }
                
                if(boolCentinels === false){
                    //Animacion del centinela
                    child[i].anims.play('centinelMove', true);                
                }
            
            }
            
            //Ataques de la muerte
            var angleDeath1;
            var angleDeath2;
            
            if(boolDeath1 === true && boolHand === true){
                var randomNum = Phaser.Math.Between(210, 420);
                angleDeath1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(randomNum, 0, rHand1.x, rHand1.y);
                angleDeath2 = Phaser.Math.Angle.Between(randomNum, 0, rHand1.x, rHand1.y);
                var fatuo = this.fatuos.get(rHand1.x, rHand1.y);
                this.fatuos.playAnimation('moveFatuo');
                if(fatuo){
                    var fatuoShootEffect1 = this.sound.add('disparoFuego', {volume: 1/this.registry.get('vol')});
                    fatuoShootEffect1.loop = false;
                    fatuoShootEffect1.play();
                    fatuo.setActive(true);
                    fatuo.setVisible(true);
                    fatuo.setAngle(angleDeath1);
                    this.physics.velocityFromRotation(angleDeath2, 300, fatuo.body.velocity);
                    this.physics.add.collider(fatuo, this.heroA, hitTearA, null, this);
                    this.physics.add.collider(fatuo, this.heroC, hitTearC, null, this);
                    boolDeath1 = false;
                }
            }
            
            if(boolDeath2 === true && boolHand === true){
                var fatuo = this.fatuos.get(rHand2.x, rHand2.y);
                this.fatuos.playAnimation('moveFatuo');
                if(fatuo){
                    var fatuoShootEffect2 = this.sound.add('disparoFuego', {volume: 1/this.registry.get('vol')});
                    fatuoShootEffect2.loop = false;
                    fatuoShootEffect2.play();
                    fatuo.setActive(true);
                    fatuo.setVisible(true);
                    fatuo.setAngle(180);
                    this.physics.velocityFromRotation(0, -300, fatuo.body.velocity);
                    this.physics.add.collider(fatuo, this.heroA, hitTearA, null, this);
                    this.physics.add.collider(fatuo, this.heroC, hitTearC, null, this);
                    boolDeath2 = false;
                }
            }
            
            if(boolDeath3 === true && boolHand === true){
                var randomNum = Phaser.Math.Between(0, 210);
                angleDeath1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(randomNum, 0, lHand1.x, lHand1.y);
                angleDeath2 = Phaser.Math.Angle.Between(randomNum, 0, lHand1.x, lHand1.y);
                var fatuo = this.fatuos.get(lHand1.x, lHand1.y);
                this.fatuos.playAnimation('moveFatuo');
                if(fatuo){
                    var fatuoShootEffect3 = this.sound.add('disparoFuego', {volume: 1/this.registry.get('vol')});
                    fatuoShootEffect3.loop = false;
                    fatuoShootEffect3.play();
                    fatuo.setActive(true);
                    fatuo.setVisible(true);
                    fatuo.setAngle(angleDeath1);
                    this.physics.velocityFromRotation(angleDeath2, 300, fatuo.body.velocity);
                    this.physics.add.collider(fatuo, this.heroA, hitTearA, null, this);
                    this.physics.add.collider(fatuo, this.heroC, hitTearC, null, this);
                    boolDeath3 = false;
                }
            }
            
            if(boolDeath4 === true && boolHand === true){
                if(this.heroA.lifes !== 0){
                    var distA = Phaser.Math.Distance.BetweenPoints(this.heroA, lHand2);
                }else{
                    var distA = 5000;
                    this.heroA.disableBody(true, true);
                    this.heroA.setActive(false);
                    this.heroA.setVisible(false);
                }
            
                if(this.heroC.lifes !== 0){
                    var distC = Phaser.Math.Distance.BetweenPoints(this.heroC, lHand2);
                }else{
                    var distC = 5000;
                    this.heroC.disableBody(true, true);
                    this.heroC.setActive(false);
                    this.heroC.setVisible(false);
                }
                
                if(distA <= distC && distA !== 5000){
                    angleDeath1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(lHand2.x, lHand2.y, this.heroA.x, this.heroA.y);
                    angleDeath2 = Phaser.Math.Angle.Between(lHand2.x, lHand2.y, this.heroA.x, this.heroA.y);
                }else if(distC !== 5000){
                    angleDeath1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(lHand2.x, lHand2.y, this.heroC.x, this.heroC.y);
                    angleDeath2 = Phaser.Math.Angle.Between(lHand2.x, lHand2.y, this.heroC.x, this.heroC.y);
                }

                var fatuo = this.fatuos.get(lHand2.x, lHand2.y);
                this.fatuos.playAnimation('moveFatuo');
                if(fatuo){
                    var fatuoShootEffect4 = this.sound.add('disparoFuego', {volume: 1/this.registry.get('vol')});
                    fatuoShootEffect4.loop = false;
                    fatuoShootEffect4.play();
                    fatuo.setActive(true);
                    fatuo.setVisible(true);
                    fatuo.setAngle(angleDeath1);
                    this.physics.velocityFromRotation(angleDeath2, 300, fatuo.body.velocity);
                    this.physics.add.collider(fatuo, this.heroA, hitTearA, null, this);
                    this.physics.add.collider(fatuo, this.heroC, hitTearC, null, this);
                    boolDeath4 = false;
                }
            }
            
            //Comprobar derrota
            if(this.heroA.lifes <= 0 && this.heroC.lifes <= 0){
                music2.stop();
                this.scene.stop('BaseGame');
                this.scene.start('GameOverScene');
            }
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
            if(hurtingHeroA === false){
                heroA.setVelocity(0);
                heroA.anims.play(`idle`, true);
                bow.anims.play('static', true);
            }
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
            if(hurtingHeroC ===false){
                heroC.anims.play(`idle2`, true);
                book.anims.play('static2', true);
            }          
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
            if(hurtingHeroA === false){
                heroA.anims.play(`walk-${heroA.direction}`, true);              
            }
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
            if(hurtingHeroC === false){
                heroC.anims.play(`walk-${heroC.direction}2`, true);
            }           
        
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
    if(pointer.leftButtonDown() && this.heroA.lifes > 0 && sizeFlechas > 0){
    this.bow.anims.play('shoot', true);
    var flecha = this.flechas.get(this.bow.x, this.bow.y);
    var angle1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.bow.x, this.bow.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    var angle2 = Phaser.Math.Angle.Between(this.bow.x, this.bow.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    var arrowShootEffect = this.sound.add('disparoFlecha', {volume: 5/this.registry.get('vol')});
    arrowShootEffect.loop = false;
    arrowShootEffect.play();
    if (flecha) {
    //if (sizeFlechas > 0) {
        flecha.setActive(true);
        flecha.setVisible(true);
        flecha.setAngle(angle1);
        this.physics.velocityFromRotation(angle2, 600, flecha.body.velocity);
        //this.flechas.size--;
        sizeFlechas--;
        this.physics.add.collider(flecha, platforms, hitArrowWall, null, this);
        this.physics.add.collider(flecha, platforms2, hitArrowWall, null, this);
        this.physics.add.collider(flecha, platforms3, hitArrowWall, null, this);
        this.physics.add.collider(flecha, groupLevers, hitArrowLever, null, this);
        this.physics.add.collider(this.heroA, flecha, hitArrowHero, null, this);
    }
        }
}
        
var s2 = function(pointer) {
    if(pointer.rightButtonDown() && this.heroC.lifes > 0){
    this.book.anims.play('shoot2', true);
    var llama = this.llamas.get(this.book.x, this.book.y);
    this.llamas.playAnimation('moveFire');
    var angle1 = Phaser.Math.RAD_TO_DEG * Phaser.Math.Angle.Between(this.book.x, this.book.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    var angle2 = Phaser.Math.Angle.Between(this.book.x, this.book.y, pointer.x + this.cameras.main.worldView.x, pointer.y + this.cameras.main.worldView.y);
    var fireShootEffect = this.sound.add('disparoFuego', {volume: 1/this.registry.get('vol')});
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
    var arrowHitEffect = this.sound.add('impactoFlecha', {volume: 0.1/this.registry.get('vol')});
    arrowHitEffect.loop = false;
    arrowHitEffect.play();
}

function hitArrowLever (flecha, palanca){
    flecha.setVelocity(0);
    var arrowHitEffect = this.sound.add('impactoFlecha', {volume: 0.1/this.registry.get('vol')});
    arrowHitEffect.loop = false;
    arrowHitEffect.play();
    var child = groupLevers.getChildren();
    var i = 0;
    while(child[i] != palanca){
        i++;
        console.log(i);
    }
    console.log(i);
    if(boolLever[i] === true){
        palanca.anims.play('open', true);
        
        
        console.log(i);
        child = groupBridges.getChildren();
        child[i].anims.play('bridge', true);
        
        child = removable.getChildren();
        child[i].body.enable = false;
        boolLever[i] = false;
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
        this.heroC.lifes--;
        //Dibuja corazones vacios
        if(this.heroC.lifes >= 0){
            heroCHearts.list[this.heroC.lifes].setVisible(false);
            //heroCHearts.list[this.heroC.lifes].disableBody(true, true);
        }
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

function hitTearWall(tear, platforms){
    tear.setVelocity(0);
    tear.setActive(false);
    tear.setVisible(false);
}

function hitWeb(sword, spiderWeb){
    spiderWeb.setActive(false);
    spiderWeb.setVisible(false);
}
    
function hitArrowHero (heroA, flecha){
    flecha.destroy();
    //this.flechas.size++;
    sizeFlechas++;
}

function playerChest(player, chest){
    if(aux2 == false){
        this.chest.anims.play('openChest', true);
        openDoorBase(door0);
        openDoorBase(door1);
        openDoorBase(door2);
        openDoorBase(door3);
        heartMovement = true;
        this.addH.setVisible(true);
        aux2 = true;
    }
}

var boolA = true;
var boolC = true;
var boolBoss = true;

function activateDamage(){
    boolA = true;
    boolC = true;
}

function activateBoss(){
    boolBoss = true;
}

function activateTear(){
    boolTear = true;
}

function activateDeath1(){
    boolDeath1 = true;
}

function activateDeath2(){
    boolDeath2 = true;
}

function activateDeath3(){
    boolDeath3 = true;
}

function activateDeath4(){
    boolDeath4 = true;
}

function hitTearA(tear, hero){
    tear.destroy();
    //Aplica daño
    hero.lifes--;
        
    //Dibuja corazones vacios
    changeHeartsA(hero);
    
}

function hitTearC(tear, hero){
    tear.destroy();
    //Aplica daño
    hero.lifes--;
        
    //Dibuja corazones vacios
    changeHeartsC(hero);
    
}

function damageA(hero, enemy){

    //Comprueba que hayan pasado 3 segundos desde la ultima colision
    if(boolA === true){
        //Aplica daño
        hero.lifes = hero.lifes - enemy.damage;
        
        //Dibuja corazones vacios
        changeHeartsA(hero);
        
        boolA = false;
    }
}

function damageC(hero, enemy){

    //Comprueba que hayan pasado 3 segundos desde la ultima colision
    if(boolC === true){
        //Aplica daño
        hero.lifes = hero.lifes - enemy.damage;
        
        //Dibuja corazones vacios
        changeHeartsC(hero);
        
        boolC = false;
    }
}

function damageCentinelA(hero, enemy){

    //Comprueba que hayan pasado 3 segundos desde la ultima colision
    if(boolA === true){
        
        boolCentinels = true; 
        
        enemy.anims.play('centinelExp', true);
        
        enemy.once('animationcomplete', ()=>{ 
            for(var i = 0; i < enemy.damage; i++){
                //Aplica daño
                hero.lifes--;
                //Dibuja corazones vacios
                changeHeartsA(hero);
            }
            killCount++;
            if(killCount >= numberSpiders + numberDevils + numberCentinels){
                openDoorBase(door0);
                openDoorBase(door1);
                openDoorBase(door2);
                openDoorBase(door3);
            }
            enemy.disableBody(true, true);
            enemy.setActive(false);
            boolCentinels = false;
        });
        
        
        boolA = false;
    }
}

function damageCentinelC(hero, enemy){

    //Comprueba que hayan pasado 3 segundos desde la ultima colision
    if(boolC === true){
        
        boolCentinels = true; 
        
        enemy.anims.play('centinelExp', true);
        
        enemy.once('animationcomplete', ()=>{ 
            for(var i = 0; i < enemy.damage; i++){
                //Aplica daño
                hero.lifes--;
                //Dibuja corazones vacios
                changeHeartsC(hero);
            }
            killCount++;
            if(killCount >= numberSpiders + numberDevils + numberCentinels){
                openDoorBase(door0);
                openDoorBase(door1);
                openDoorBase(door2);
                openDoorBase(door3);
            }
            enemy.disableBody(true, true);
            enemy.setActive(false);
            boolCentinels = false;
        });
        
        
        boolC = false;
    }
}

function healA(hero, heart){
    if(hero.lifes + 1 > 5){
          for(var i = hero.lifes; i < 5; i++){
              heroAHearts.list[i].setVisible(true); 
          }
           hero.lifes = 5;
    }else{
          for(var i = hero.lifes; i < hero.lifes+1; i++){
              
          heroAHearts.list[i].setVisible(true);
}
          hero.lifes++;
    }
    heart.destroy();
}

function healC(hero, heart){
    if(hero.lifes + 1 > 5){
          for(var i = hero.lifes; i < 5; i++){
              heroCHearts.list[i].setVisible(true); 
          }
           hero.lifes = 5;
    }else{
          for(var i = hero.lifes; i < hero.lifes+1; i++){
          heroCHearts.list[i].setVisible(true);
}
          hero.lifes++;
    }
    heart.destroy();
}

function changeHeartsA(hero){
    //Dibuja corazones vacios
    if(hero.lifes >= 0){
        heroAHearts.list[hero.lifes].setVisible(false);
    }
    hurtingHeroA = true;
    hero.anims.play('damage1');
    hero.once('animationcomplete', ()=>{ 
        hurtingHeroA = false;
    });
}

function changeHeartsC(hero){
    //Dibuja corazones vacios
    if(hero.lifes >= 0){
        heroCHearts.list[hero.lifes].setVisible(false);
    }
    hurtingHeroC = true;
    hero.anims.play('damage2');
    hero.once('animationcomplete', ()=>{ 
        hurtingHeroC = false;
    });
}


function damageEnemy(enemy, weapon){
    enemy.disableBody(true, true);
    enemy.setActive(false);
    killCount++;
    if(killCount >= numberSpiders + numberDevils + numberCentinels){
        openDoorBase(door0);
        openDoorBase(door1);
        openDoorBase(door2);
        openDoorBase(door3);
    }
   
}

function damageBoss(enemy, weapon){
    if(boolBoss === true){
        enemy.anims.play("damageDeath");
        enemy.once('animationcomplete', ()=>{ 
            lifeBoss--;
            weapon.destroy();
            enemy.anims.play("idleDeath");
            if(lifeBoss <= 0){
                enemy.disableBody(true, true);
                enemy.setActive(false);
                lHand1.disableBody(true, true);
                lHand1.setActive(false);
                lHand2.disableBody(true, true);
                lHand2.setActive(false);
                rHand1.disableBody(true, true);
                rHand1.setActive(false);
                rHand2.disableBody(true, true);
                rHand2.setActive(false);
                boolHand = false;
                openDoorBase(door0);
                openDoorBase(door1);
                openDoorBase(door2);
                openDoorBase(door3);
            }
        });
        
        boolBoss = false;
    }
    
   
}

function damageDevil(enemy, weapon){
    enemy.disableBody(true, true);
    enemy.setActive(false);
    var chilDevil = groupDevils.getChildren();
    var i = 0;
    while(chilDevil[i] != enemy){
        i++;
    }
    boolDevil[i] = false;
    killCount++;
    if(killCount >= numberSpiders + numberDevils + numberCentinels){
        openDoorBase(door0);
        openDoorBase(door1);
        openDoorBase(door2);
        openDoorBase(door3);
    }
   
}

function pause(){
    //music2.stop();
    this.scene.pause(currentScene);
    this.scene.launch('PauseScene', {prevScene: currentScene, music: music2});
}

function openDoorBase(xx){
    var child = doors.getChildren();
        
    if(xx == 0 || xx == 2){
        child[xx].anims.play('doorOpeningH', true);
        child = platforms2.getChildren();
        child[xx].body.enable = false;
    }else if(xx == 1 || xx == 3){
        child[xx].anims.play('doorOpeningV', true);
        child = platforms2.getChildren();
        child[xx].body.enable = false;
    }
    
        
}

//Exportamos el juego
export { BaseGame };