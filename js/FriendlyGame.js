import Game from "./Game.js";
export class FriendlyGame extends Game {
    constructor(X, O, crossName, circleName) {
        super();

        this.PLAYER_1 = {
            player: X,
            name: crossName,
        }

        this.PLAYER_2 = {
            player: O,
            name: circleName,
        };
        this.player = {};
    };

    set _PLAYER_2(v) {
        return;
    };

    start() {
        super.start();
        const score = document.querySelector(`.score`);
        score.innerHTML = `
            <div class="firs">
              ${this.PLAYER_1.name} <span class="cross">0</span>
            </div>
            
            <div class="sec">
               ${this.PLAYER_2.name} <span class="circle">0</span>
            </div>
        `

        this.cells.forEach((cell, index) => {
            cell.id = index;
            cell.onclick = event => {
                if(event.target.innerHTML || this.winner) return;
                this.player = this.player === this.PLAYER_1 ? this.PLAYER_2 : this.PLAYER_1;

                this.makeMove(event.target.id, this.player, this.player);
        }})
    };

    getButtons() {
        const resetBtn = document.querySelector(`#resetButton`);
        resetBtn.onclick = () => {
            this.boardArray = Array.from(Array(9).keys());
            this.winner = ``;
            this.cells.forEach(el => el.innerHTML = ``);
            this.player = {}
        };

        const reloadBtn = document.querySelector(`#reloadBtn`);
        reloadBtn.onclick = () => {
            location.reload()
        }
    }
}