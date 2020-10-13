let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let game = new Game();
game.start();

// Bindea la funcionalidad una vez termina de cargar el documento.
document.addEventListener('DOMContentLoaded', (event) => {
    canvas.addEventListener("mousedown", function(event){
        // Se activa cuando presionas el Click del Mouse.
        // ---------------------------
        if (!game.gameOver){
            game.clickToken(event);
        }
    });

    canvas.addEventListener("mouseleave", function(event){
        // Se activa cuando el Mouse se sale del Canvas.
        // ---------------------------
        game.cancelPlayToken(player);
        game.setCursor_openHand();
    });

    canvas.addEventListener("mouseup", function(event){
        // Se activa cuando dejas de presionar el Click del Mouse.
        // ---------------------------
        if(!game.gameOver){
            game.playToken(event);
        }
    });

    document.getElementById("confirmButton_firstPlayer").addEventListener("click", function(){
        let name = document.getElementById("nameBox_firstPlayer").value;
        game.setPlayer_name(name, 1);
    });

    document.getElementById("confirmButton_secondPlayer").addEventListener("click", function(){
        let name = document.getElementById("nameBox_secondPlayer").value;
        game.setPlayer_name(name, 2);
    });

    document.getElementById("resetButton").addEventListener("click", function(){
        game.start();
    });
})