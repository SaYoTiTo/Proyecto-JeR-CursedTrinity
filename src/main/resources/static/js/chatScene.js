var chat;
var previousScene;

export default class ChatScene extends Phaser.Scene{
    
    constructor(){
            super({ key:'ChatScene' });
        };
       
    init(data){
        previousScene = data.prev;
    }
    create(){
        
        this.bg = this.physics.add.sprite(210,160,'pauseBg');
        this.bg.alpha = 0.7;
        
        chat = document.getElementById("chatTable");
        chat.style.display = "block";
        
        //The pause
		this.input.keyboard.on('keydown-ESC', goBack, this);
    };
        
    update(){
    }
}

function goBack(){
    chat.style.display = "none";
    this.scene.stop('ChatScene');
    this.scene.resume(previousScene);
}