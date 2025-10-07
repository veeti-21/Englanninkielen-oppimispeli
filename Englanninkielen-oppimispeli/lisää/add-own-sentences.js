
let ownsentences = JSON.parse(localStorage.getItem("ownsentences")) || [];

const regex = /\bisn't\b|\baren't\b|\bis\b|\bare\b|\bthere\b|\bnot\b/gi;

// funktio joka tallentaa lauseet ja siirtyy täydennys peliin
function switchPage() {
  const inputs = document.querySelectorAll(".userInput");
  let allValid = true; // Oletetaan aluksi, että kaikki kentät ovat kunnossa

  inputs.forEach(input => {
    const value = input.value.trim();
    if (value.length === 0 || !value.match(regex)) {
      allValid = false; // Jos kenttä on tyhjä tai ei vastaa regexiä
    }
  });

  if (!allValid) {
    alert("Lauseessa täytyy olla ainakin yksi sana: is, isn't, are, aren't, there tai not.");
    return; // Estää siirtymisen toiselle sivulle
  }

  // Jos kaikki kentät ovat kunnossa, tallennetaan ja siirrytään eteenpäin
  const ownsentences = [];
  inputs.forEach(input => {
    ownsentences.push(input.value.trim());
  });

  localStorage.setItem("ownsentences", JSON.stringify(ownsentences));
  localStorage.setItem("fromAddSentences", "true");
  window.location.href = "fill-in-the-blank.html";
}

function addCard() {
  const inputs = document.querySelectorAll(".userInput");
  let allValid = true;

  inputs.forEach(input => {
    const value = input.value.trim();
    if (value.length === 0 || !value.match(regex)) {
      allValid = false;
    }
  });

  if (!allValid) {
    alert("Lauseessa täytyy olla ainakin yksi sana: is, isn't, are, aren't, there tai not.");
    return; // Stop here if validation fails
  }

  // ✅ Only create a new card if all existing inputs are valid
  const cardsContainer = document.getElementById("cardsContainer");

  const newCard = document.createElement("div");
  newCard.className = "card";

  const inputsContainer = document.createElement("div");
  inputsContainer.className = "inputsContainer";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "userInput";
  input.placeholder = "Type something...";
  inputsContainer.appendChild(input);

  const btnGroup = document.createElement("div");
  btnGroup.className = "btnGroup";

  const addBtn = document.createElement("button");
  addBtn.className = "add_btn";
  addBtn.textContent = "+";
  addBtn.onclick = addCard;

  const delBtn = document.createElement("button");
  delBtn.className = "del_btn";
  delBtn.textContent = "-";
  delBtn.onclick = removeCard;

  btnGroup.appendChild(addBtn);
  btnGroup.appendChild(delBtn);

  newCard.appendChild(inputsContainer);
  newCard.appendChild(btnGroup);

  cardsContainer.appendChild(newCard);
}



// Remove the last card (but keep at least one)
function removeCard() {
  const cardsContainer = document.getElementById("cardsContainer");
  const cards = cardsContainer.querySelectorAll(".card");

  if (cards.length > 1) {
    cardsContainer.removeChild(cards[cards.length - 1]);
  }
}


