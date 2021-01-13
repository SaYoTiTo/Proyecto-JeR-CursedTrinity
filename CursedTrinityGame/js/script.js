// V A R I A B L E S //
var idServer;
var idPJ;
var timer;
var connection = false;

// F U N C I O N E S _ A J A X //


function beginConnection(){
	
	if(!connection){
		var m = $("#name").val();
		$.ajax({
			method: "POST",
            url: "http://localhost:8080/",	
			//url: "http://3b7d106e75f1.ngrok.io/",
            data: JSON.stringify(m),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
		}).done(function(data){
			if(data.chatId==null || data.chatId == undefined){
				$('#message').empty();
				$("#message").append("<p> Jugador ya conectado </p>" );
				connection = false;
			}else{
				server = data.chatId;
				player = data.id;
				console.log("ID SERVER: " + idServer + " ID PLAYER: " + idPJ);
				timer = setInterval(function(){
					ping();},1000);
					connection = true;
				}
			})
			
		
	}
	
}


function finishConnection(){
	if(connection){
		clearInterval(timer);
		connection = false;
		$('#players').empty();
        $('#players').append("<p>Disconnected<p>");
        $('#message').empty();
	}
}

function postMessage() {
    if(connection){
    var message = $("#enterMessage").val();
    var mnsj = {
        name: "" + player + "", 
        message : message
    }
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/" + server,
		//url: "http://3b7d106e75f1.ngrok.io/" + server,
        data: JSON.stringify(mnsj),
        processData: false,
        headers: {
            "Content-Type": "application/json"
        }
    })

    console.log("Item created: " + JSON.stringify(mnsj));
    }
}


function ping(){
    //console.log("ping");
    $.ajax({
        url:"http://localhost:8080/" + server + "/" + player,
		//url:"http://3b7d106e75f1.ngrok.io/" + server + "/" + player,
    }).done(function(data){   
        $('#players').empty();
        $('#players').append("<p><l3>Connected Players: " + data.players.length + "</l3></p>");
        for(var i = 0; i<data.players.length;i++){
            $("#players").append("<p><l3>"+data.players[i]+ "</l3></p>");
        }
        $('#message').empty();
        for(var i = 0; i<data.messages.length;i++){
            var d = data.messages[i];
            $("#message").append("<p><l1>"+ d.name + ":</l1>                                             <l2>" + d.message+ "</l2></p>", "<p></p>");
			//<p><l1>FFFFF </l1><l2> This is a paragraph.</l2></p>
        }
    })
    
}

// 

$(document).ready(function () {
    
    
    $("#connect").click(function () {
        beginConnection();
    })
    $("#disconnect").click(function () {
        finishConnection();
    })
   
    $("#sendMessage").click(function () {
        postMessage();
    })
})