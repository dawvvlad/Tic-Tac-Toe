import { EasyMode } from "./EasyMode.js";
import { FriendlyGame } from "./FriendlyGame.js"
import { HardMode } from "./HardMode.js";

const selectMode = document.querySelector(`.select-mode`);

function chooseMode() {
  let arrEasy = 0;
  let arrHard = 0;

  const friendlyModeBtn = document.getElementById(`friendlyModeBtn`);

  friendlyModeBtn.onclick = function() {
    this.classList.add(`hidden`);
    selectMode.innerHTML = `
        <p>Введите имена</p>

        <div class="names">
          <input type="text" id="name1" class="name">
          <input type="text" id="name2" class="name">

          <button class="Button" id="startBtn">Начать</button>
          
        </div>
    `

    startBtn.onclick = function() {
      if(!name1.value || !name2.value) {
        const names = document.querySelectorAll(`.name`);
        names.forEach(inp => inp.placeholder = `Заполните поле`);
        return
      }

      selectMode.classList.add(`hidden`)
      const game = new FriendlyGame(`✕`, `◯`, name1.value, name2.value);
      game.start();
    }

  }

  const PvE = document.querySelector(`.PvE`);
  PvE.onclick = function(event) {
    const target = event.target;
    friendlyModeBtn.classList.add(`hidden`);

    easyMode.onclick = function() { 
      arrEasy++;
      [Xplayer, Oplayer].forEach(el => el.classList.remove(`hidden`));
      this.classList.add(`hidden`);
      hardMode.classList.add(`hidden`)
    }

    hardMode.onclick = function() {
      arrHard++;
      [Xplayer, Oplayer].forEach(el => el.classList.remove(`hidden`));
      this.classList.add(`hidden`);
      easyMode.classList.add(`hidden`)
    }
  
    if(target.id == `compModeBtn`) {
      target.classList.add(`hidden`);
      [easyMode, hardMode].forEach(el => el.classList.remove(`hidden`))
    }

    Xplayer.onclick = function() {
      const func = selMode.bind(this);
      func(`✕`, arrEasy, arrHard)
    };

    Oplayer.onclick = function() {
      const func = selMode.bind(this);
      func(`◯`, arrEasy, arrHard)
    }
  }
}

function selMode(symbol, a, b) {
  this.classList.add(`hidden`);
  selectMode.classList.add(`hide`);

  if(a === 1) { 
    new EasyMode(symbol).start()
  }
  if(b === 1) {
    new HardMode(symbol).start()
  }
}
chooseMode()