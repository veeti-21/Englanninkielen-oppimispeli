const ekat  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
const tokat = ["yks", "kaks", "kolme", "neljä", "viis", "kuus", "seittemän", "kaheksa", "yheksä", "kymmene", "ykstoist", "kakstoist", "kolmetoist", "neljätoist", "viistoist", "kuustoist", "seittemäntoista", "kaheksantoist"];

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

function isMatch(a, b) {
  return a.pairIndex === b.pairIndex && a.type !== b.type;
}


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
          main.innerText = "you win";
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



for(let i = 0; i < cards.length; i++){
    console.log(cards[i]);
}