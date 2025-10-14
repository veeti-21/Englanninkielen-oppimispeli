const ekat = ["dog","cat","cow","house","car","bicycle","computer","mouse","squirrel","table","tree","phone","book","chair","window","flower","bird","lamp"]
const tokat = ["koira","kissa","lehmä","talo","auto","polkupyörä","tietokone","hiiri","orava","pöytä","puu","puhelin","kirja","tuoli","ikkuna","kukka","lintu","lamppu"]

var ding = new Audio('../audio/ding.wav');

let cards = [];
for (let i = 0; i < ekat.length; i++) {
  cards.push({ value: ekat[i], pairIndex: i, type: "eka" });
  cards.push({ value: tokat[i], pairIndex: i, type: "toka" });
}


for (let i = cards.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cards[i], cards[j]] = [cards[j], cards[i]];
}

const grid = document.getElementById("grid");
const main = document.getElementById("main");

let flipped = [];
let lockBoard = false;
let matchedCount = 0;


cards.forEach((card, idx) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = idx;
  cell.innerText = "";

  cell.addEventListener("click", () => {
    if (lockBoard) return;
    if (cell.classList.contains("matched")) return;
    if (flipped[0] && flipped[0].cell === cell) return;

    
    cell.innerText = card.value;
    flipped.push({ cell, ...card });

    if (flipped.length === 2) {
      const [first, second] = flipped;

      if (isMatch(first, second)) {
        first.cell.classList.add("matched");
        second.cell.classList.add("matched");
        matchedCount += 2;
        flipped = [];
        ding.play();

        if (matchedCount === cards.length) {
          showWinModal();
        }
      } else {
        lockBoard = true;
        setTimeout(() => {
          first.cell.innerText = "";
          second.cell.innerText = "";
          flipped = [];
          lockBoard = false;
        }, 1000);
      }
    }
  });

  grid.appendChild(cell);
});


function logCards(){
for(let i = 0; i < cards.length; i++){
    console.log(cards[i]);
}
}

function win(){
  matchedCount = cards.length-2;
}

function closeWinModal(){
    document.getElementById("winModal").style.display = "none";
}

function showWinModal(){
    document.getElementById("winModal").style.display = "flex";
}

function createCards(){
cards.forEach((card, idx) => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = idx;
  cell.innerText = "";

  cell.addEventListener("click", () => {
    if (lockBoard) return;
    if (cell.classList.contains("matched")) return;
    if (flipped[0] && flipped[0].cell === cell) return;

    
    cell.innerText = card.value;
    flipped.push({ cell, ...card });

    if (flipped.length === 2) {
      const [first, second] = flipped;

      if (isMatch(first, second)) {
        first.cell.classList.add("matched");
        second.cell.classList.add("matched");
        matchedCount += 2;
        flipped = [];
        ding.play();

        if (matchedCount === cards.length) {
          showWinModal();
        }
      } else {
        lockBoard = true;
        setTimeout(() => {
          first.cell.innerText = "";
          second.cell.innerText = "";
          flipped = [];
          lockBoard = false;
        }, 1000);
      }
    }
  });

  grid.appendChild(cell);
});
}

function destroyCards(){
  const cards = document.getElementsByClassName("cell");
  Array.from(cards).forEach(card => {
    card.remove();
  });
}

function reset(){

  destroyCards();

  // Reset game state variables
  flipped = [];
  lockBoard = false;
  matchedCount = 0;
  
  // Clear and reset all cells
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("matched");
  });
  
  // Reshuffle cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  createCards();

  
  // Close win modal if open
  closeWinModal();
}

function isMatch(a, b) {
  return a.pairIndex === b.pairIndex && a.type !== b.type;
}