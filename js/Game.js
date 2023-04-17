export default class Game {
    constructor(player) {
        this.PLAYER_1 = {
            player: player,
            name: player,
        }

        this._PLAYER_2 = {
            player: player,
            name: player,
        };
        this.BOARD = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];

        this.boardArray = Array.from(Array(9).keys());
        this.winner = ``;
        this.cells = document.querySelectorAll(`.cell`);
    }

    set _PLAYER_2(v) {
        if(this.PLAYER_1.player == `✕`) this.PLAYER_2 = { player: `◯`, name: `◯`};
        else this.PLAYER_2 = { player: `✕`, name: `✕`}
    };

    start() {
        this.getButtons();
    };

    makeMove(id, { player, name }) {
        this.boardArray[id] = player;
        this.cells[id].innerHTML = player;
        const isWinner = this.checkWinner(this.boardArray, { player, name });
        if(isWinner) this.gameOver(isWinner)
    };

    checkWinner(board, { player, name }) {
        const newBoard = board.reduce((acc, item, index) => {
          return item === player ? acc.concat(index) : acc
        },[])
      
        let isWinner = null;
      
        this.BOARD.some((arr, index) => {
          if(arr.every(el => newBoard.includes(el))) {
            isWinner = {index: index, player: player, name: name};
            this.winner = isWinner.player
          }
        });

        if([...this.cells].every(el => el.innerHTML) && !isWinner) {
            const modal = document.querySelector(`.modal`)
            modal.classList.remove(`hide`);
            const winnerTxt = document.getElementById(`winnerTxt`);

            winnerTxt.innerHTML = `Ничья! <br> Нажмите "Рестарт"!`;
            setTimeout(() => modal.classList.add(`hide`), 2000);

            this.winner = `Tie`;
        }
      
        return isWinner
    };

    gameOver(x) {
        const modal = document.querySelector(`.modal`);
        modal.classList.remove(`hide`);

        winnerTxt.innerHTML = `<span style="color: red">${x.name}</span> выиграл! <br> нажмите "Рестарт"`;
        setTimeout(() => modal.classList.add(`hide`), 2000);
      
        const cross = document.querySelector(`.cross`);
        const circle = document.querySelector(`.circle`);
      
        if(x.player === this.PLAYER_1.player && this.PLAYER_1.player == `✕` || x.player === this.PLAYER_2.player && this.PLAYER_2.player == `✕`) {
          cross.innerHTML = Number(cross.innerHTML) + 1;
        } else if(x.player === this.PLAYER_1.player && this.PLAYER_1.player != `✕` || x.player === this.PLAYER_2.player && this.PLAYER_2.player != `✕`) {
            circle.innerHTML = Number(circle.innerHTML) + 1 
        }
    };

    getEmptyCells() {
        return this.boardArray.filter(el => typeof el == `number`)
    };

    getButtons() {
        const resetBtn = document.querySelector(`#resetButton`);
        resetBtn.onclick = () => {
            this.boardArray = Array.from(Array(9).keys());
            this.winner = ``;
            this.cells.forEach(el => el.innerHTML = ``);
            this.start()
        };

        const reloadBtn = document.querySelector(`#reloadBtn`);
        reloadBtn.onclick = () => {
            location.reload()
        }
    }
}
