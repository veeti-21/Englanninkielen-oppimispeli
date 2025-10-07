
//ladataaan omat lauseet local storagesta
let ownsentences = JSON.parse(localStorage.getItem("ownsentences")) || [];

const sentences = ["This book is very interesting.", "They aren't coming to the party.", "There is a cat on the roof.", "He isn't going to school today.", "We are happy with the results.", "She is not feeling well.", "There are many stars in the sky.", "It isn't easy to learn a new language.", "There are no cookies left in the jar.", "Isn't it a beautiful day?"];
let replacedWords = []; 
let usedsentences = [];
let theword = "";
let score = 0;
let firstTry = true;

//fuctio joka vaihtaa sivua
function switchPage() {
  window.location.href = "add-own-sentences.html";
  resetOwnSentences();
}

//funktio joka arpoo numeron
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateText() {
  let available = ownsentences.length > 0
    ? ownsentences.filter(s => !usedsentences.includes(s)) : sentences.filter(s => !usedsentences.includes(s));
    
  if (available.length === 0) {
    let element = document.getElementById("addOwnBtn");
    element.classList.remove("hidden");
    let element1 = document.getElementById("vastaus");
    element1.classList.remove("hidden");
    document.getElementById("output").textContent = "Voitit sait " + score + " pistettä!";
    return;
  }

  let text = available[getRandomInt(0, available.length - 1)];
  theword = text;

  const regex = /\bisn't\b|\baren't\b|\bis\b|\bare\b|\bthere\b|\bnot\b/gi;
  replacedWords = text.match(regex) || [];
  text = text.replace(regex, "_____");

  document.getElementById("output").textContent = text;
  firstTry = true;
}
//functio joka tarkistaa käyttäjän vastauksen
function checkAnswer() {
  console.log(replacedWords); 
  let text = document.getElementById("userInput").value;

  if (
    replacedWords.join(", ").toLowerCase() === text.toLowerCase() ||
    replacedWords.join(",").toLowerCase() === text.toLowerCase()
  ) { 
    document.getElementById("output2").textContent = "Correct!";
    showAnswer();

    
  } else {
    document.getElementById("output2").textContent = "Try again!";
    firstTry = false;
  }
  //annetaan käyttäjälle valinta näyttää vastaus
  let element = document.getElementById("vastaus");
  element.classList.remove("hidden");
}

//functio joka näyttää vastauksen
function showAnswer() {
  document.getElementById("input").textContent = theword;
  nextSentence();
}

function nextSentence() {
  usedsentences.push(theword); 
    if (firstTry) {
      score++;
    }
  
    setTimeout(() => {
      document.getElementById("output2").textContent = "";
      document.getElementById("input").textContent = "";
      document.getElementById("userInput").value = "";
      updateText();
    }, 3000);
}
//functio joka resetoi omat lauseet
function resetOwnSentences() {
  ownsentences = [];
  localStorage.removeItem("ownsentences");
  console.log("Custom sentences have been reset!");
}

//näytetään popup ilmoitus jos tulee ensimmäistä kertaa sivulle
window.onload = function() {
  updateText();

  if (window.location.pathname.endsWith("fill-in-the-blank.html")) {
    if (localStorage.getItem("fromAddSentences") === "true") {
    } else {
      resetOwnSentences(); 
      updateText();
      showModel
      document.getElementById("gameModal").style.display = "block";
    }
  }
}

function showModel() {
  resetOwnSentences();
  document.getElementById("gameModal").style.display = "block";
}
//functio joka sulkee popup ilmoituksen
function closeModal() {
  document.getElementById("gameModal").style.display = "none";
}

