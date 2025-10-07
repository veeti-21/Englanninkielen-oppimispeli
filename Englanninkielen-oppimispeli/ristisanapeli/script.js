const size = 14;
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const words = ["ONE", "two", "three"];

let sanat = [];
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

function insertWords(){
  for(let i = 0; i < sanat.length; i++){
    const word = sanat[i];
    let placed = false;
    let attempts = 0;

    while(!placed && attempts < 1000) {
      const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);

      if(direction === 'horizontal') {
        if(col + word.length <= size) {
          for(let j = 0; j < word.length; j++) {
            grid[row][col + j] = word[j];
          }
          placed = true;
        }
      } else {
        if(row + word.length <= size) {
          for(let j = 0; j < word.length; j++) {
            grid[row + j][col] = word[j];
          }
          placed = true;
        }
      }
      attempts++;
    }
  }
}
insertWords();

const gridContainer = document.getElementById("grid");
gridContainer.style.gridTemplateColumns = `repeat(${size}, 30px)`;

let selectedCells = [];

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

document.getElementById("confirm").addEventListener("click", () => {
  const selectedWord = selectedCells.map(c => c.textContent).join("");
  const message = document.getElementById("message");

  if (sanat.includes(selectedWord)) {
    message.textContent = `✅ Correct! You found "${selectedWord}"!`;
    selectedCells.forEach(c => {
      c.classList.remove("selected");
      c.classList.add("found");
    });
    sanat = sanat.filter(w => w !== selectedWord);
  } else {
    message.textContent = `❌ "${selectedWord}" is not in the list.`;
    selectedCells.forEach(c => c.classList.remove("selected"));
  }

  selectedCells = [];
  updateWordList();
});

document.getElementById("reset").addEventListener("click", () => {
  selectedCells.forEach(c => c.classList.remove("selected"));
  selectedCells = [];
  document.getElementById("message").textContent = "";
});

function updateWordList() {
  document.getElementById("wordList").textContent = sanat.join(", ");
}

renderGrid();
updateWordList();

