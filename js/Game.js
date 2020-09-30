
class Game{
    constructor(firstPlayer, secondPlayer){
        this.firstPlayer = firstPlayer;
        this.secondPlayer = secondPlayer;
        this.cells = this.initializeCells();
        this.gameOver = false;
        this.fourTokens = [];
    }

    start(){
        // Inicialmente el primer turno es del Jugador 1. (Y al resetear el juego, nuevamente vuelve a ser el primero el Jugador 1).
        this.playerTurn = this.firstPlayer;
        this.resetCtx();
        this.setCursor_openHand();
    }



//==================================================================================
//                                     SET
//==================================================================================
    initializeCells(){
        return  [
                    [{x:372, y:117, id:0},{x:431, y:117, id:0},{x:489, y:117, id:0},{x:548, y:117, id:0},{x:607, y:117, id:0},{x:665, y:117, id:0},{x:724, y:117, id:0}],
                    [{x:372, y:176, id:0},{x:431, y:176, id:0},{x:489, y:176, id:0},{x:548, y:176, id:0},{x:607, y:176, id:0},{x:665, y:176, id:0},{x:724, y:176, id:0}],
                    [{x:372, y:235, id:0},{x:431, y:235, id:0},{x:489, y:235, id:0},{x:548, y:235, id:0},{x:607, y:235, id:0},{x:665, y:235, id:0},{x:724, y:235, id:0}],
                    [{x:372, y:294, id:0},{x:431, y:294, id:0},{x:489, y:294, id:0},{x:548, y:294, id:0},{x:607, y:294, id:0},{x:665, y:294, id:0},{x:724, y:294, id:0}],
                    [{x:372, y:352, id:0},{x:431, y:352, id:0},{x:489, y:352, id:0},{x:548, y:352, id:0},{x:607, y:352, id:0},{x:665, y:352, id:0},{x:724, y:352, id:0}],
                    [{x:372, y:411, id:0},{x:431, y:411, id:0},{x:489, y:411, id:0},{x:548, y:411, id:0},{x:607, y:411, id:0},{x:665, y:411, id:0},{x:724, y:411, id:0}],
                ];
    }

    setCursor_openHand(){
        let canvas = document.getElementById('canvas');
        canvas.style.cursor = 'url("images/openHand.png") 30 0,default';
    }

    setCursor_closedHand(x, y){
        let canvas = document.getElementById('canvas');
        // Actualizo el cursor con el de la Token del jugador correspondiente, y la manito cerrada.
        if(this.playerTurn.getData().id == 1){
            canvas.style.cursor = 'url("images/firstPlayer Token closedHand.png") ' + x + ' ' + y + ',default';
        }else{
            canvas.style.cursor = 'url("images/secondPlayer Token closedHand.png") ' + x + ' ' + y + ',default';
        }
    }

    setPlayer(name, player_id){
        // Se encarga de ponerle nombre al Jugador correspondiente en caso de que este escriba uno.
        parseInt(player_id) == 1 ? this.firstPlayer.setName(name) : this.secondPlayer.setName(name);
        // Actualizo el nombre mostrado para el Jugador al que le hayas cambiado el nombre.
        this.showPlayerName(player_id);
    }



//==================================================================================
//                                     GET
//==================================================================================
	get_whosTurn(){
		return this.playerTurn;
    }
    


//==================================================================================
//                                RESET INFO
//==================================================================================
    resetCtx(){
        // Resetea el nombre mostrado de los Jugadores. (Muestra "First Player" y "Second Player").
        this.updatePlayerName(1);
        this.updatePlayerName(2);
        this.gameOver = false;
        // Dibuja las Celdas.
        this.drawCells();
        // Resetea el contenido de la matriz 'cells'.
        this.cells = this.initializeCells();
        this.firstPlayer.reset();
        this.secondPlayer.reset();
        // Prepara las Tokens del Jugador 1 y el Jugador 2. (Las que ambos tienen para jugar).
        this.prepareTokens(canvas, 1);
        this.prepareTokens(canvas, 2);
        // Otorga un Highlight al Jugador del cual sea el turno, y se lo quita al otro.
        this.updatePlayersTurn();
        this.fourTokens = [];
    }

    updatePlayerName(player){
        // Actualiza el nombre del jugador en caso de que le hayas hecho algún cambio.
        // (Sin embargo, también se llama cuando reseteas el Juego desde el botón, o cuando finaliza la partida).
        if(player == 1){
            document.getElementById("firstPlayer").innerHTML = this.firstPlayer.getData().name;
            document.getElementById("nameBox_firstPlayer").value = '';
        }else{
            document.getElementById("secondPlayer").innerHTML = this.secondPlayer.getData().name;
            document.getElementById("nameBox_secondPlayer").value = '';
        }
    }


    

    


//==================================================================================
//                              TOKENS MANAGEMENT
//==================================================================================
    generateToken(player_id, token_x, token_y){
        // Ternary. Si el ID del jugador es el '1', carga el Ícono del los Tokens del Player 1. (Si no, los del Player 2).
		let source = player_id == 1 ? "images/firstPlayer Token.png" : "images/secondPlayer Token.png";
        return new Token(token_x, token_y, player_id, source);
    }

    prepareTokens(canvas, player_id){
        let width = ((canvas.width / 2) / 2);
        // Si se trata del Jugador 1, su 'x' es '0'. (Si no, se calcula el X).
        let x = (player_id == 1 ? 0 : canvas.width - width);
        
        // '7' porque las columnas son de '7' Tokens.
        for (let column = 0; column < 7; column++) {
            let token_y = this.define_tokenY(canvas, column);
            // '3' porque las filas son de '3' Tokens.
            for (let row = 0; row < 3; row++) {
                let token_x = this.define_tokenX(canvas, player_id, row);
                // Determina en que posición dibujar cada uno de los Token.
                let token = this.generateToken(player_id, token_x, token_y);
                // Añade la Token a la lista de Tokens del Jugador correspondiente.
                this.addToken_toPlayer(player_id, token);
                // Dibuja finalmente el Token en su posición correspondiente.
                this.drawToken(token.getData());
            }
        }
    }

    define_tokenY(canvas, column){
        // Como son '3' Columnas lo divido por '3'.
        let y = (column % 7);
        switch (y) {
            case 0: return (canvas.height - 420);
            case 1: return (canvas.height - 360);
            case 2: return (canvas.height - 300);
            case 3: return (canvas.height - 240);
            case 4: return (canvas.height - 180);
            case 5: return (canvas.height - 120);
            case 6: return (canvas.height - 60);
        }
    }

    define_tokenX(canvas, player_id, row){
        // Como son '3' Filas lo divido por '3'.
        let x = (row % 3);
        let plus = 0;
        // Al jugador 2 le añado un EXTRA a su X, ya que sus Tokens se dibujan a la derecha, y NO a la izquierda.
        if (player_id != 1){
            plus = ((canvas.width / 2) + ((canvas.width / 2) / 2));
        }

        switch (x) {
            case 0: return (8 + plus);
            case 1: return (98 + plus);
            case 2: return (188 + plus);
        }
    }

    addToken_toPlayer(player_id, token){
        // Añade la Token al Jugador, para que este sepa que puede utilizarla.
        player_id == 1 ? this.firstPlayer.addToken(token) : this.secondPlayer.addToken(token);
    }

    drawToken(token){
        // Dibuja el Token.
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let img = new Image();
        // Determina cual Imagen usar según si el Token pertenece al Jugador 1, o al Jugador 2.
        token.id == 1 ? img.src = "images/firstPlayer Token.png" : img.src = "images/secondPlayer Token.png";
        img.onload = function(){
            ctx.drawImage(this, token.posX, token.posY);
        }
    }




//==================================================================================
//                           EVENTOS (ACCIONES DEL JUGADOR)
//==================================================================================
    clickToken(event){
        // El 'event' equivale a lo que sea que hayas clickeado del canvas (sea una token o no).
        //----------------------------------------
        let mouse_x = (event.layerX - event.currentTarget.offsetLeft);
        let mouse_y = (event.layerY - event.currentTarget.offsetTop);

        // Obtengo la token clickeada por el jugador.
        let token = this.playerTurn.get_clickedToken(mouse_x, mouse_y);

        if (token){
            let token_data = token.getData();
            // Oculta la Token que acabas de agarrar. (De la lista de Tokens disponibles).
            this.hideToken(token_data);

            let x = (event.currentTarget.offsetLeft + 8);
            let y = (event.currentTarget.offsetTop + 30);
            // Actualizo el cursor con el de la Token del jugador correspondiente, y la manito agarrando la Token.
            this.setCursor_closedHand(x, y);

            // Como 'playerTurn' contiene una instancia de Player, y esta class contiene la variable 'selectedToken', sé cual Token agarró el Jugador en cuestión.
            this.playerTurn.selectedToken = token;
        }
    }

    hideToken(token){
        // Se encarga de ocultar la Token en el Canvas. ('token' contiene la Data de la token).
        //-----------------------------------
        let ctx = document.getElementById('canvas').getContext('2d');
        // Clears the current internal path object and its sub-paths.
        ctx.beginPath();
        // The existing content is kept where it doesn't overlap the new shape.
        ctx.globalCompositeOperation = "destination-out";

        let x = (token.posX + token.radius);
        let y = (token.posY + token.radius);
        let width = (token.radius + 1);
        // Creates a circle.
        ctx.arc(x, y, width, 0, 2 * Math.PI);
        ctx.fill();

        // Connects the current path, or sub-path, position with the first point on that path created either with beginPath().
        ctx.closePath();
        // This is the default setting and draws new shapes on top of the existing canvas content.
        ctx.globalCompositeOperation = "source-over";
    }

    playToken(event){
        let token = this.playerTurn.selectedToken;
        if(token){
            if(this.isValidPlay(event, token)){
                let tokenPosition = this.playerTurn.getToken_positionDrop(event, token, this.cells);
                // Mete la Token en la Celda correspondiente.
                this.insertToken(token, tokenPosition);
                this.switchPlayerOnTurn();
                this.updatePlayersTurn();

                // Chequea si se cumplen las condiciones para que alguno de los 2 Jugadores gane.
                let result = this.checkMove(token, tokenPosition);
                this.isGameOver(result);
            } else {
				this.cancelPlayToken(token);
            }
            // Devuelvo el cursor a lo normal, ya que soltaste la Token.
            this.setCursor_openHand();
        }
    }

    isValidPlay(event, token){
        let mouse_x = (event.layerX - event.currentTarget.offsetLeft);
        let mouse_y = (event.layerY - event.currentTarget.offsetTop);

        let canvas = document.getElementById('canvas');
        let marginLeft = (((canvas.width / 2) / 2) + 4);
        let marginRight = ((canvas.width - marginLeft) - 4);
        let marginTop = 84;

        let tokenPosition = this.playerTurn.getToken_positionDrop(event, token, this.cells);

        return (this.between(mouse_x, marginLeft, marginRight) && this.between(mouse_y, 0, marginTop) && (parseInt(tokenPosition.y) != -1) && (parseInt(tokenPosition.x) != -1));
    }

    insertToken(token, pos){
        let cell = this.cells[pos.y][pos.x];
        let id = parseInt(token.getData().id);
        let radius = token.getData().radius;
        let x = (cell.x - radius);
        let y = (cell.y - (radius + 1));
        cell.id = id;
        // Redibujo la Token pero esta vez en la Celda.
        let auxiliar_Token = this.generateToken(id, x, y);
        this.reDrawToken(auxiliar_Token.getData(), token.src);
    }

    reDrawToken(token){
		let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let img = new Image();
        img.src = token.src;
        ctx.drawImage(img, token.posX, token.posY);
    }

    cancelPlayToken(token){
        // Le devuelvo la Token al Jugador.
        this.playerTurn.addToken(token);
        // Redibujo la Token en el Canvas.
        this.reDrawToken(token.getData());
        // Indica que no hay ninguna Token seleccionada.
        this.playerTurn.selectedToken = -1;
	}


    
    
//==================================================================================
//                         MANEJO DE TURNOS Y GAME OVER
//==================================================================================
    switchPlayerOnTurn(){
        this.playerTurn.switchTurn();
        // Ternary. Si la instancia de playerTurn era la del Jugador 1, la cambio por la del Jugador 2. (Y a la inversa).
        parseInt(this.playerTurn.getData().id) == 1 ? this.playerTurn = this.secondPlayer : this.playerTurn = this.firstPlayer;
        // Luego de cambiar de cual jugador es el turno, le digo a ese jugador que es su turno, y lo guarda.
        this.playerTurn.switchTurn();
    }


    updatePlayersTurn(){
        let firstPlayer = document.getElementById("firstPlayer");
        let secondPlayer = document.getElementById("secondPlayer");

        // Tooglea entre el turno del Jugador 1, y el turno del Jugador 2.
        // (Al tooglear añadir/quitar la Class, se activa/desactiva el estilo del Jugador activo).
        //-----
        // Si el ID de esta instancia de Player es '1', remuevo del Player 2 y añado al Player 1. (Si no, a la inversa).
        if(this.playerTurn.getData().id == 1){
            secondPlayer.classList.remove("activeTurn");
            firstPlayer.classList.add("activeTurn");
        }else{
            firstPlayer.classList.remove("activeTurn");
            secondPlayer.classList.add("activeTurn");
        }
    }


    isGameOver(result){
        let noTokensLeft = (this.firstPlayer.getTokens().length == 0 && this.secondPlayer.getTokens().length == 0);
        if(noTokensLeft || result.gameOver){
            if(noTokensLeft){
                this.showDraw();
            } else {
                this.showWinner(result.player);
            }

            this.gameOver = true;
            let thisObject = this;
            // Produce un Highlight sobre las Token ganadores que desaparece al cabo de 3000 milisegundos.
			thisObject.draw_winerTokens();
            setTimeout(function(){ thisObject.start(); }, 3000);
        }
    }



//==================================================================================
//                   MUESTRA AL GANADOR, O SI ES EMPATE
//==================================================================================
    showWinner(winner){
        // Ternary. Si el jugador que ganó es el '1', tomo su nombre. Si no, tomo el del Jugador 2.
        let winnerName = parseInt(winner) == 1 ? this.firstPlayer.getData().name : this.secondPlayer.getData().name;
        document.getElementById("displayWinner").innerHTML = (winnerName + ' WINS!!!');
        // Borro el texto del ganador luego de 3 segundos, (3000 milisegundos).
        setTimeout(function(){ document.getElementById("displayWinner").innerHTML = ''; }, 3000);
    }


    showDraw(){
        // En caso de que los jugadores empaten, no muestro ningún nombre, solo menciono que empataron.
        document.getElementById("displayWinner").innerHTML = 'DRAW!!!';
        setTimeout(function(){ document.getElementById("displayWinner").innerHTML = ''; }, 3000);
    }



//==================================================================================
//              CHEQUEA LAS DISTINTAS FORMAS DE GANAR, Y SI SE CUMPLE ALGUNA
//==================================================================================
    checkMove(token, tokenPosition){
        // Chequea si se cumple alguna de las formas de ganar la Partida.
        let result = this.checkHorizontal(token, tokenPosition);
        if(!result.gameOver){
            result = this.checkVertical(token, tokenPosition);
            if(!result.gameOver){
                result = this.checkDiagonals(token, tokenPosition);
            }
        }
        return result;
    }

    checkHorizontal(token, tokenPosition){
        this.addLine(tokenPosition.x, tokenPosition.y);
        let right_x = tokenPosition.x;
        let left_x = tokenPosition.x;
        let count = 1;
        let row = this.cells[tokenPosition.y];

        while((right_x < (row.length - 1)) && (row[right_x+1].id == token.id)){
            count++;
            right_x++;
            this.addLine(right_x, tokenPosition.y);
        }

        while((left_x > 0) && (row[left_x-1].id == token.id)){
            count++;
            left_x--;
            this.addLine(left_x, tokenPosition.y);
        }

        return this.winningCondition(count) ? {gameOver: true, player: token.id} : {gameOver:false};
    }

    checkVertical(token, tokenPosition){
        this.addLine(tokenPosition.x, tokenPosition.y);
        let top_y = tokenPosition.y;
        let y_bottom = tokenPosition.y;
        let count = 1;
        let col = tokenPosition.x;
        
        while((top_y > 0) && (this.cells[top_y-1][col].id == token.id)){
            count++;
            top_y--;
            this.addLine(tokenPosition.x, top_y);
        }

        while((y_bottom < (this.cells.length - 1)) && (this.cells[y_bottom+1][col].id == token.id)){
            count++;
            y_bottom++;
            this.addLine(tokenPosition.x, y_bottom);
        }

        return this.winningCondition(count) ? {gameOver: true, player: token.id} : {gameOver: false};
    }

    checkDiagonals(token, tokenPosition){
        let result;
        result = this.checkFirstDiagonal(token, tokenPosition);
        if(!result.gameOver){
            result = this.checkSecondDiagonal(token, tokenPosition);
        }
        return result;
    }

    checkFirstDiagonal(token, tokenPosition){
        this.addLine(tokenPosition.x, tokenPosition.y);
        let middleTop = 2;
        let middleBottom = 3;
        let middleX = 3;

        let posX = tokenPosition.x;
        let posY = tokenPosition.y;
        let count = 1;

        if((posY <= middleTop && posX <= (middleX + posY)) || (posY >= middleBottom && posX > (0 + (posY % 3)))){
            let auxX = posX;
            let auxY = posY;

            while(this.exists(auxX-1, auxY-1) && (this.cells[auxY-1][auxX-1].id == token.id)){
                count++;
                auxX--;
                auxY--;
                this.addLine(auxX,auxY);
            }

            auxX = posX;
            auxY = posY;

            while((this.exists(auxX+1, auxY+1)) && (this.cells[auxY+1][auxX+1].id == token.id)){
                count++;
                auxX++;
                auxY++;
                this.addLine(auxX, auxY);
            }
        }
        return this.winningCondition(count) ? {gameOver: true, player: token.id} : {gameOver: false};
    }

    checkSecondDiagonal(token, tokenPosition){
        this.addLine(tokenPosition.x, tokenPosition.y);
        let middleTop = 2;
        let middleBottom = 3;
        let middleX = 3;

        let posX = tokenPosition.x;
        let posY = tokenPosition.y;
        let count = 1;
        if((posY <= middleTop && posX >= (middleX - posY)) || (posY >= middleBottom && posX < ((this.cells.length) - (posY % 3)))){
            let auxX = posX;
            let auxY = posY;
            while(this.exists(auxX+1, auxY-1) && (this.cells[auxY-1][auxX+1].id == token.id)){
                count++;
                auxX++;
                auxY--;
                this.addLine(auxX,auxY);
            }
            auxX = posX;
            auxY = posY;
            while(this.exists(auxX-1, auxY+1) && (this.cells[auxY+1][auxX-1].id == token.id)){
                count++;
                auxX--;
                auxY++;
                this.addLine(auxX,auxY);
            }
        }
        return this.winningCondition(count) ? {gameOver:true, player:token.id} : {gameOver:false};
    }

    addLine(posX, posY){
        this.fourTokens.push({x:posX, y:posY});
    }

    winningCondition(count){
        // Retorna si hubo un ganador o no.
        if(count >= 4){
            return true;
        }
        this.fourTokens = [];
        return false;
    }





//==================================================================================
//                               DRAW FUNCTIONS      
//================================================================================== 
    drawCells(){
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');

        let img = new Image();
        img.src = "images/board.png";
        img.onload = function(){
            let x = (canvas.width / 3.23);
            let y = (canvas.height - img.height);
            ctx.clearRect(x, y, img.width, img.height);
            ctx.drawImage(this, x, y);
        }
    }

    draw_winerTokens(){
        for (let i = 0; i < this.fourTokens.length; i++) {
            let x = this.fourTokens[i].x;
            let y = this.fourTokens[i].y;
            // Dibuja circulos en las Token ganadoras.
            this.highlight_winerTokens(this.cells[y][x]);
        }
    }

    highlight_winerTokens(args){
        let ctx = document.getElementById('canvas').getContext('2d');
        ctx.beginPath();
        ctx.arc(args.x-1, args.y-2, 28, 0, Math.PI * 2);
        ctx.fillStyle = "rgb(255, 0, 0, 0.2)"
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.closePath();
    }
    


//==================================================================================
//                         AUXILIAR FUNCTIONS
//==================================================================================
    between(x, min, max){
      return ((x >= min) && (x <= max));
    }

    exists(x, y){
        return (x >= 0 && x < this.cells[0].length) && (y >= 0 && y < this.cells.length);
    }
}
