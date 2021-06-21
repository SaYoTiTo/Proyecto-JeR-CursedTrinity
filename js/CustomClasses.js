const Phaser = require("../phaser");

// E N E M I G O S
class Enemie extends Phaser.Physics.Arcade.Sprite {

    constructor(vida, daño){
        this.vida = vida;
        this.daño = daño;   
    } 

    damage(){
        
    }

}


class Spider extends Enemie {

    constructor(vida, daño){
        //super('Enemie');
        this.vida = 2;
        this.daño = 1;
    }

    damage(){

        this.Heroe.vida = this.Heroe.vida - this.daño; //No se si funciona asi
    }


}


class Vigilante extends Enemie {
    
    constructor(vida, daño){
        //super('Enemie');
        this.vida = 5;
        this.daño = 2;
    }

    damage(){

        this.Heroe.vida = this.Heroe.vida - this.daño; //No se si funciona asi
    }

}

class Diablillo extends Enemie {

    constructor(vida, daño){
        //super('Enemie');
        this.vida = 7;
        this.daño = 2;
    }


    damage(){

        this.Heroe.vida = this.Heroe.vida - this.daño; //No se si funciona asi
    }
}


class Muerte extends Enemie{
    constructor(vida,daño){
        this.vida = 20;
        this.daño = 3;
    }

    damage(){

        this.Heroe.vida = this.Heroe.vida - this.daño; //No se si funciona asi
    }
}

// H E R O E S

class Heroe extends Phaser.Physics.Arcade.Sprite{

    constructor(vida){
        
        this.vida = 5;
        
    }

}

class Blade extends Heroe{

    constructor(vida, prob_fallo){
        super('Heroe');
        this.prob_fallo = 0.0;
    }
}


class Arrow extends Heroe{

    constructor(vida,flechas){
        super('Heroe');
        this.flechas = 4;
    }

}

class Cauldron extends Heroe{
    constructor(vida, num_hechizos){
        super('Heroe');
        this.num_hechizos = 0;
    }
}


