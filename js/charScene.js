export default class CharScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'CharScene' });
        }
            
    create(){
        /*
        //Creo unas graficas para dibujar primitivas
        this.graphics = this.add.graphics();
        //Fondo
        this.graphics.fillGradientStyle(0x000000, 0x0fffff, 0x000000, 0x0fffff, 1);
        this.graphics.fillRect(0, 0, 400, 300);

        //Triangulo
        this.graphics.lineStyle(5, 0xFF00FF, 1.0);
        this.graphics.beginPath();
        this.graphics.moveTo(200, 15);
        this.graphics.lineTo(75, 260);
        this.graphics.lineTo(325, 260);
        this.graphics.closePath();
        this.graphics.strokePath();
        //Triangulo interior
        this.graphics.beginPath();
        this.graphics.moveTo(125,160);
        this.graphics.lineTo(275,160);
        this.graphics.moveTo(200,160);
        this.graphics.lineTo(200,260);
        this.graphics.closePath();
        this.graphics.strokePath();

        //Boton adelante
        this.graphics.lineStyle(3, 0xFF00FF, 1.0);
        this.graphics.beginPath();
        this.graphics.moveTo(325,30);
        this.graphics.lineTo(355,45);
        this.graphics.lineTo(325,60);
        this.graphics.closePath();
        this.graphics.strokePath();

        //Boton volver
        this.graphics.beginPath();
        this.graphics.moveTo(75,30);
        this.graphics.lineTo(45,45);
        this.graphics.lineTo(75,60);
        this.graphics.closePath();
        this.graphics.strokePath();*/

        this.bg = this.physics.add.sprite(210,160,'charBg').setScale(0.3).refreshBody();
        this.back = this.physics.add.sprite(40, 280, 'botonVolver').setScale(0.3).refreshBody();
        //Jugador
        this.arrow = this.physics.add.sprite(140,55,'arrow').setScale(0.1).refreshBody();
        this.blade = this.physics.add.sprite(280,60,'blade').setScale(0.07).refreshBody();
        this.cauldron = this.physics.add.sprite(210,190,'cauldron').setScale(0.1).refreshBody();

        //Oscurecer personajes
        this.arrow.setInteractive();
        this.blade.setInteractive();
        this.cauldron.setInteractive();
        this.back.setInteractive();
        this.arrow.alpha = this.blade.alpha = this.cauldron.alpha = this.back.alpha = 0.5;
        }
        
    update(){
        //Brilla si esta encima
        this.arrow.on("pointerover", function(){this.alpha = 1});
        this.blade.on("pointerover", function(){this.alpha = 1});
        this.cauldron.on("pointerover", function(){this.alpha = 1});
        this.back.on("pointerover", function(){this.alpha = 1});
        this.blade.on("pointerout", function(){this.alpha = 0.5});
        this.arrow.on("pointerout", function(){this.alpha = 0.5});
        this.cauldron.on("pointerout", function(){this.alpha = 0.5});
        this.back.on("pointerout", function(){this.alpha = 0.5});

        this.arrow.on("pointerdown", function(){
            var graphics = this.scene.add.graphics();
            graphics.beginPath(); 
            graphics.moveTo(125.5,151);
            graphics.lineTo(198.75,151);
            graphics.lineTo(198.75,248.75);
            graphics.lineTo(153,248.75);
            graphics.fillStyle(0xFFFFFF, 0.05);
            graphics.closePath();
            graphics.fillPath();            
            this.depth = 100;
            this.alpha = 1;
            this.scene.scene.stop('CharScene');
            this.scene.scene.start('GameScene', 1);
        });
        this.blade.on("pointerdown", function(){
            var graphics = this.scene.add.graphics();
            graphics.beginPath(); 
            graphics.moveTo(201.25,151);
            graphics.lineTo(273,151);
            graphics.lineTo(323,248.5);
            graphics.lineTo(201.25,248.5);
            graphics.closePath();
            graphics.fillStyle(0xFFFFFF, 0.05);
            graphics.fillPath();
            this.alpha = 1;
            this.depth = 500;
            this.scene.scene.stop('CharScene');
            this.scene.scene.start('GameScene', 2);
        });
        this.cauldron.on("pointerdown", function(){
            var graphics = this.scene.add.graphics();
            graphics.beginPath(); 
            graphics.moveTo(200,18.5);
            graphics.lineTo(270,158);
            graphics.lineTo(130,158);
            graphics.closePath();
            graphics.fillStyle(0xFFFFFF, 0.05);
            graphics.fillPath();
            this.alpha = 1;
            this.depth = 500;
            this.scene.scene.stop('CharScene');
            this.scene.scene.start('GameScene', 3);
        });
        
        this.back.on("pointerdown", function(){
            this.scene.scene.stop('CharScene');
            this.scene.scene.start('MenuScene');
        })
    }
}