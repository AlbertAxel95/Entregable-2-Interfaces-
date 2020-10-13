
class Player{
    constructor(args = {}){
        this.name = args.name;
        this.id = args.id;
        this.tokens = [];
        // Por defecto, el Jugador inicia sabiendo que NO es su turno hasta que el juego le diga lo contrario.
        this.onTurn = false;
        this.selectedToken;
    }




//==================================================================================
//                                     SET
//==================================================================================
    setName(name){
        this.name = name;
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

    get_clickedToken(x,y){
        let token;

        for (let i = 0; i < this.tokens.length; i++) {
            if(this.tokens[i].clicked(x,y)){
                token = this.tokens[i];
                this.tokens = this.tokens.slice(0, i).concat(this.tokens.slice(i+1, this.tokens.length));
                break;
            };
        }
        this.selectedToken = token;
        return token;
    }

    getToken_playedPosition(event, token, cells){
        // Retorna la posición de X e Y donde el Jugador soltó la Token. (Como es una matriz, 'X' equivale al ID de la fila e 'Y' al ID de la Columna).
        let mouse_x = (event.layerX - event.currentTarget.offsetLeft);

        let col = this.getToken_columnDrop(mouse_x, token, cells);
        let row;
        if (col != -1){
            row = this.getToken_rowDrop(token, cells, col);
        }
        return {x: col, y: row};
    }

    getToken_columnDrop(mouse_x, token, cells){
        // Determina la Columna donde fue jugada la Token.
        let radius = parseInt(token.getData().radius);
        let row = cells[0];

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




//==================================================================================
//                                     
//==================================================================================
    reset(){
        this.tokens = [];
        this.selectedToken = -1;
        this.onTurn = false;
    }

    addToken(token){
        this.tokens.push(token);
    }

    switchTurn(){
        this.onTurn = !this.onTurn;
    }
}
