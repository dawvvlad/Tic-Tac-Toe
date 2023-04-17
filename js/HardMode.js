import Game from "./Game.js";
export class HardMode extends Game{
    constructor(player) {
        super(player)
    };

    start() {
      super.start();
      
        if(this.PLAYER_1.player !== `✕`) {
            for (let i = 0; i < this.cells.length; i++) {
                if(this.winner !== `Tie`) this.makeMove(this.hardModeMove(), this.PLAYER_2);
                break;
            };
        }

        this.cells.forEach((cell, index) => {
            cell.id = index;
            cell.onclick = event => {

              
              if(typeof this.boardArray[event.target.id] == `number`) {
                  this.makeMove(event.target.id, this.PLAYER_1);
                  if(this.getEmptyCells().length !== 0) this.makeMove(this.hardModeMove(), this.PLAYER_2);
              };
            };
        })
        
    }

    hardModeMove() {
        return this.minimax(this.boardArray, this.PLAYER_2).index
    };

    minimax(newBoard, player) { 
        const emptyCells = this.getEmptyCells() 
      
        if(this.checkWinner(newBoard, player)) { 
          return {score: -10}
        }
        else if(this.checkWinner(newBoard, this.PLAYER_2)) { 
          return {score: 10}
        }
        else if(emptyCells.length === 0) {
          return {score: 0}
        };
      
        let moves = []; 
      
        for (let i = 0; i < emptyCells.length; i++) {
          let move = {} 
          move.index = newBoard[emptyCells[i]];
          newBoard[emptyCells[i]] = player.player;
      
          if(player.player == this.PLAYER_2.player) {
            let result = this.minimax(newBoard, this.PLAYER_1);
            move.score = result.score;
          } else {
            let result = this.minimax(newBoard, this.PLAYER_2);
            move.score = result.score;
          };
      
          newBoard[emptyCells[i]] = move.index;
          moves.push(move)
        }
      
        let bestMove;
      
        if(player.player === this.PLAYER_2.player) {
          let bestScore = -Infinity;
      
          for (let i = 0; i < moves.length; i++) {
            if(moves[i].score > bestScore) {
              bestScore = moves[i].score;
              bestMove = i
            }
          }
        } else {
          let bestScore = Infinity;
      
          for (let i = 0; i < moves.length; i++) {
            if(moves[i].score < bestScore) {
              bestScore = moves[i].score;
              bestMove = i
            }
          }
        }
        
        return moves[bestMove];
      }
}