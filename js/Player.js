class Player{
    
   constructor(name, id){
    this.name = name;
    this.id = id;
    this.tokens = [];
    // Por defecto, el Jugador inicia sabiendo que NO es su turno hasta que el juego le diga lo contrario.
    this.turn = false;
    this.selectedToken;
}

    reset(){
        this.tokens = [];
        this.selectedToken = -1;
        this.turn = false;
    }

    setName(name){
        this.name = name;
    }

    addToken(token){
        this.tokens.push(token);
    }

    switchTurn(){
        // Como cada jugador almacena dentro suyo si es su turno o no, toogleo su valor.
        this.turn = !this.turn;
    }




//==================================================================================
//                                     GET
//==================================================================================
    getData(){
        return {'name': this.name, 'id': this.id};
    }

    getTokens(){
        return this.tokens;
    }

    get_clickedToken(mouse_x, mouse_y){
        let token;

        // Busca cual Token fue clickeada.
        for (let i = 0; i < this.tokens.length; i++) {
            if(this.tokens[i].clicked(mouse_x, mouse_y)){
                token = this.tokens[i];
                this.tokens = this.tokens.slice(0, i).concat(this.tokens.slice((i + 1), this.tokens.length));
                break;
            };
        }
        // La guarda y luego la retorna.
        this.selectedToken = token;
        return token;
    }

    getToken_positionDrop(event, token, board){
        // Retorna la posición de X e Y donde el Jugador soltó la Token. (Como es una matriz, 'X' equivale al ID de la fila e 'Y' al ID de la Columna).
        let mouse_x = (event.layerX - event.currentTarget.offsetLeft);

        let col = this.getToken_columnDrop(mouse_x, token, board);
        let row;
        if (col != -1){
            row = this.getToken_rowDrop(token, board, col);
        }
        return {x: col, y: row};
    }

    getToken_columnDrop(mouse_x, token, board){
        // Determina la Columna donde fue jugada la Token.
        let radius = parseInt(token.getData().radius);
        let row = board[0];

        for (let col = 0; col < row.length; col++) {
            let min = row[col].x - radius;
            let max = row[col].x + radius;
            if((mouse_x >= min) && (mouse_x <= max)){
                return col;
            }
        }
        return -1;
    }

    getToken_rowDrop(token, board, col){
        // Determina la Fila donde fue jugada la Token.
        let radius = parseInt(token.getData().radius);
        let result = -1;

        for (let row = 0; row < board.length; row++) {
            if(parseInt(board[row][col].id) == 0){
                result = row;
            } else {
                break;
            }
        }
        return result;
    }
}