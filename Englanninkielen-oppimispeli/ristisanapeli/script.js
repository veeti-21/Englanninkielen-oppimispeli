const size = 14;
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const words = ["computer", "javascript", "chatgpt", "moi", "koira","kurapora","authenticate","implement","master","baiter"];
let placedWords = []; 

let sanat = [];

var ding = new Audio('../audio/ding.wav');


for(let i = 0; i < words.length; i++){
  if(words[i].length >= 15){
    console.log("Max wordlength is 14 characters");
  } else {
    sanat[i] = words[i].toUpperCase();
  }
}

let grid = [];
for (let i = 0; i < size; i++) {
  let row = [];
  for (let j = 0; j < size; j++) {
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    row.push(randomLetter);
  }
  grid.push(row);
}



const gridContainer = document.getElementById("grid");
gridContainer.style.gridTemplateColumns = `repeat(${size}, 30px)`;

let selectedCells = [];


// ------------------ NAPIT ------------------
function resetSelection(){
  selectedCells.forEach(c => c.classList.remove("selected"));
  selectedCells = [];
  document.getElementById("message").textContent = "";
}
function selectCell(cell) {
  if (cell.classList.contains("found")) return;
  if (cell.classList.contains("selected")) {
    cell.classList.remove("selected");
    selectedCells = selectedCells.filter(c => c !== cell);
  } else {
    cell.classList.add("selected");
    selectedCells.push(cell);
  }
}
function restartGame() {
  resetSelection();
  sanat = words.map(w => w.toUpperCase());
  createEmptyGrid();
  insertWords();
  fillEmptySpaces();
  renderGrid();
  updateWordList();
  document.getElementById("message").textContent = "";
}
function info(){
  window.alert("Paina kirjaimia kirjoitusjärjestyksessä, jotka muodostavat sanan, joka on listattu alla 'Words to find' osiossa.\n\nSitten kun kirjaimet on valikoitu, paina 'Confirm word' nappia ja sana muuttuu vihreäksi jos valikointi oli oikein.\n\n'Reset selection' napista keltaisena olevat valikoidut ruudut muuttuvat valitsemattomiksi\n\n'Restart game' nappi aloittaa pelin alusta  ");
}

document.getElementById("info").addEventListener("click", () => {
  showInfoModal();
});

document.getElementById("reset").addEventListener("click", () => {
  selectedCells.forEach(c => c.classList.remove("selected"));
  selectedCells = [];
  document.getElementById("message").textContent = "";
});

document.getElementById("restart").addEventListener("click", () => {
  restartGame();
});

document.getElementById("confirm").addEventListener("click", () => {
  const message = document.getElementById("message");

  if (selectedCells.length === 0) {
    return;
  }

  // Collect selected positions
  const selectedPositions = selectedCells.map(c => ({
    row: parseInt(c.dataset.row),
    col: parseInt(c.dataset.col)
  }));

  // Check against stored placements
  const foundWord = placedWords.find(pw =>
    pw.cells.length === selectedPositions.length &&
    pw.cells.every((cell, idx) =>
      cell.row === selectedPositions[idx].row &&
      cell.col === selectedPositions[idx].col
    )
  );

  if (foundWord) {
    selectedCells.forEach(c => {
      c.classList.remove("selected");
      c.classList.add("found");
      ding.play();  
    });

    sanat = sanat.filter(w => w !== foundWord.word);
    placedWords = placedWords.filter(pw => pw.word !== foundWord.word);
    resetSelection();
  } else {
    resetSelection();
  }

  updateWordList();
  a(gameStatus());
});
// ------------------ NAPIT ------------------ 


// ------------------ PELIN ALOTUS FUNKTIOT ------------------
function createEmptyGrid() {
  grid = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push("."); // placeholder for empty cell
    }
    grid.push(row);
  }
}
function canPlaceWord(word, row, col, direction) {
  // Check boundaries
  if (direction === "horizontal" && col + word.length > size) return false;
  if (direction === "vertical" && row + word.length > size) return false;

  for (let j = 0; j < word.length; j++) {
    const r = direction === "horizontal" ? row : row + j;
    const c = direction === "horizontal" ? col + j : col;
    
    // Cell must be empty
    if (grid[r][c] !== ".") {
      return false;
    }
  }

  return true;
}

function insertWords() {
  placedWords = [];
  
  // Sort words by length (longest first) for better placement
  const sortedWords = [...sanat].sort((a, b) => b.length - a.length);

  for (let i = 0; i < sortedWords.length; i++) {
    const word = sortedWords[i];
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 5000) {
      const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if (canPlaceWord(word, row, col, direction)) {
        const cells = [];
        
        for (let j = 0; j < word.length; j++) {
          const r = direction === "horizontal" ? row : row + j;
          const c = direction === "horizontal" ? col + j : col;
          grid[r][c] = word[j];
          cells.push({ row: r, col: c });
        }
        
        placedWords.push({ word: word, cells: cells });
        placed = true;
      }
      attempts++;
    }

    if (!placed) {
      console.warn(`Could not place word: ${word}`);
    }
  }
}
function fillEmptySpaces() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === ".") {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }
}
function renderGrid() {
  gridContainer.innerHTML = "";
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.textContent = grid[i][j];
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", () => selectCell(cell));
      gridContainer.appendChild(cell);
    }
  }
}
function updateWordList() {
  document.getElementById("wordList").textContent = sanat.join(", ");
}
function initSanat() {
  sanat = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].length >= 15) {
      console.log("Max wordlength is 14 characters");
    } else {
      sanat.push(words[i].toUpperCase());
    }
  }
}


createEmptyGrid();
insertWords();
fillEmptySpaces();
renderGrid();
updateWordList();

// ------------------ PELIN ALOTUS FUNKTIOT ------------------


// ------------------ MUUT FUNKTIOT ------------------

function gameStatus(){
  if(sanat.length == 0){
    return "won";
  }else{
    return "";
  }
}
function a(a){
  if(a == "won"){
    showWinModal();
    if(confirm){
      initSanat();
      createEmptyGrid();
      insertWords();
      fillEmptySpaces();
      renderGrid();
      updateWordList();
    }
  }
}
function closeInfoModal() {
  document.getElementById("infoModal").style.display = "none";
}

function showInfoModal(){
    document.getElementById("infoModal").style.display = "flex";
}

function closeWinModal(){
    document.getElementById("winModal").style.display = "none";
}

function showWinModal(){
    document.getElementById("winModal").style.display = "flex";
}
// ------------------ MUUT FUNKTIOT ------------------