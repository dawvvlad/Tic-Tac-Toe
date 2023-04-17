import Game from "./Game.js";
export class EasyMode extends Game {
    constructor(player) {
        super(player)
    };

    start() {
        super.start();
        if(this.PLAYER_1.player !== `✕`) { 
            for (let i = 0; i < this.cells.length; i++) {
                if(this.winner !== `Tie`) this.makeMove(this.easyModeMove(), this.PLAYER_2);
                break;
            }
        }

        this.cells.forEach((cell, index) => {
            cell.id = index;
            cell.onclick = event => {
            
                if(this.winner) return
                if(typeof this.boardArray[event.target.id] == `number`) {
                    this.makeMove(event.target.id, this.PLAYER_1);
                    if(!this.winner && this.getEmptyCells().length !== 0) this.makeMove(this.easyModeMove(), this.PLAYER_2)
                };
            };
        })
    };

    easyModeMove() {
        let move = Math.floor(Math.random() * this.getEmptyCells().length);
        return this.getEmptyCells()[move];
    }
}