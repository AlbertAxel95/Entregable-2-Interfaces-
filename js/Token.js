
class Token{
    constructor(args = {}){
        this.x = (parseInt(args.posX) + 28.5);
        this.y = (parseInt(args.posY) + 28.5);
        // ID = 1 (Player 1);  ID = 2 (Player 2).
        this.id = parseInt(args.id);
        this.src = args.src;
        // diametro de 74px
        this.radius = 28.5;
        // Inicialmente esta Token NO FUE jugada.
		this.played = false;
    }

    getData(){
        return {'posX': (this.x - 28.5), 'posY': (this.y - 28.5), 'id': this.id, 'radius': this.radius, 'src': this.src, 'played': this.played};
    }

    clicked(mouse_x, mouse_y){
        // Returna 'true' si la Token fue clickeada, y 'false' si NO lo fue.
        let x = (mouse_x - this.x);   let y = (mouse_y - this.y);
        return Math.sqrt((x*x) + (y*y)) < this.radius ? true : false;
    }
}