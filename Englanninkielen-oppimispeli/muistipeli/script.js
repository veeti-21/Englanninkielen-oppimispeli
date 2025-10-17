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
  const size = Math.sqrt(cards.length);
  let pos = 0;

  for(let i = 1; i<= size; i++){
    for(let j = 1; j<=size; j++){
      pos = (i-1) * size + j;

      console.log("Row " + i + " " + "Column " + j + " " + (cards[pos-1].value));
    }
    console.log("\n");
  }
}

function win(){
  matchedCount = cards.length-matchedCount;
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

const menuOverlay = document.getElementById("menuOverlay");
const menuModal = document.getElementById("menuModal");

// Show menu
function showMenu() {
    menuOverlay.style.display = "flex"; // use flex to center if needed
    menuModal.style.display = "block";
    menuModal.setAttribute("aria-hidden", "false");
}

// Hide menu
function hideMenu() {
    menuOverlay.style.display = "none";
    menuModal.style.display = "none";
    menuModal.setAttribute("aria-hidden", "true");
}

function homePage() {
    window.location.href = "../etusivu/index.html";
}
function resetGame() {
    location.reload();
}
// Click outside to close
menuOverlay.addEventListener("click", hideMenu);

// Optional: prevent clicks inside modal from closing it
menuModal.addEventListener("click", (event) => {
    event.stopPropagation();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        hideMenu();
    }
});