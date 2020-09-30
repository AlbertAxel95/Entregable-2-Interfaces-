let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// Name, Id.
let firstPlayer = new Player('First Player:', 1);
let secondPlayer = new Player('Second Player:', 2);

let game = new Game(firstPlayer, secondPlayer);
game.start();

document.addEventListener('DOMContentLoaded', (event) => {
    canvas.addEventListener("mousedown", function(event){
        // Si clickeas y la partida aún no terminó.
        if(!game.gameOver){
            // Paso el evento, el cual contiene lo que clickeaste.
            game.clickToken(event);
        }
    });

    canvas.addEventListener("mouseleave", function(event){
        // 'player' contiene al jugador del cual es el Turno actual.
        let player = game.get_whosTurn();
        // Si la Token seleccionada de ese jugador NO ES '-1'.
        if(player.selectedToken != -1){
            game.cancelPlayToken(player);
            game.setCursor_openHand();
        }
    });

    canvas.addEventListener("mouseup", function(event){
        // Si sueltas el botón del Mouse y la partida aún no terminó, intenta jugar la Token que hayas clickeado (si es que clickeaste alguna).
        if(!game.gameOver){
            console.log("llama a la función")
            game.playToken(event);
        }
    });

    document.getElementById("confirmButton_firstPlayer").addEventListener("click", function(){
        let name = document.getElementById("nameBox_firstPlayer").value;
        game.setPlayer(name, 1);
    });

    document.getElementById("confirmButton_secondPlayer").addEventListener("click", function(){
        let name = document.getElementById("nameBox_secondPlayer").value;
        game.setPlayer(name, 2);
    });

    document.getElementById("resetButton").addEventListener("click", function(){
        game.start();
    });
})
