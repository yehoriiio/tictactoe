let area = document.querySelector(".area");
let cell = document.getElementsByClassName("cell");
let currentPlayer = document.getElementById("curPlyr");

let playerA = "X";
let statistic = {
  'X': 0,
  'O': 0, 
  'd': 0,
}
let winCombination = [
  // горизонтальные комбинации победы
  [0,1,2],
  [3,4,5],
  [6,7,8],
  // вертикальные комбинации победы
  [0,3,6],
  [1,4,7],
  [2,5,8],
  // крестовые комбинации победы
  [0,4,8],
  [2,4,6]
]
console.log(winCombination);


// создаю клеточки
for (let i = 0; i < 9; i++) {
  area.innerHTML += "<div class = 'cell' pos=" + i + "></div>"
}

// создаю действие при клике
for (let i = 0; i < cell.length; i++) {
  cell[i].addEventListener('click', cellClick, false)
}

function cellClick() {
  let numbers = [];

  if(this.innerHTML) {
    alert("Эта ячейка занята. Используйте другую.")
    return;
  } else {
    this.innerHTML = playerA;
  }

  for (let i in cell) {
    if(cell[i].innerHTML == playerA)
    numbers.push(parseInt(cell[i].getAttribute('pos')));
    console.log(numbers);
    
  }

  if(checkingWin(numbers)) {
    statistic[playerA] += 1;
    restart("Победил: ИГРОК " + playerA)
  } else {
    let draw = true;
    for (let i in cell) {
      if(cell[i].innerHTML == '') draw = false;
    }
    if(draw) {
      statistic.d += 1;
      restart("Ничья!");
    }
  }
  
  playerA = playerA == "X" ? "O" : "X";
  currentPlayer.innerHTML = playerA.toUpperCase();
  function checkingWin(numbers) {

    for(let i in winCombination) {
      let win = true;

      for(let r in winCombination[i]) {
        let res = winCombination[i][r];

        let result= numbers.indexOf(res);
        
        if (result == -1) {
          win = false
        }
        }

        if(win) return true;
      }
      return false;
    }
  }

  function restart(text) {
    console.log(statistic)
    alert(text);
    for(let i = 0; i < cell.length; i++) {
      cell[i].innerHTML = '';
    }
    Statistic();
  }
  function Statistic() {

    document.getElementById("statsX").innerHTML = statistic.X;
    document.getElementById("statsO").innerHTML = statistic.O;
    document.getElementById("statsD").innerHTML = statistic.d;
  }