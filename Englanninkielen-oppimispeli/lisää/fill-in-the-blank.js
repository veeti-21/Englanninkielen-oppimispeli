
//ladataaan omat lauseet local storagesta
let ownsentences = JSON.parse(localStorage.getItem("ownsentences")) || [];

const sentences = ["This book is very interesting.", "They aren't coming to the party.", "There is a cat on the roof.", "He isn't going to school today.", "We are happy with the results.", "She is not feeling well.", "There are many stars in the sky.", "It isn't easy to learn a new language.", "There are no cookies left in the jar.", "Isn't it a beautiful day?"];
let replacedWords = []; 
let usedsentences = [];
let theword = "";
let score = 0;
let firstTry = true;

const correctSound = new Audio('../audio/ding.wav');
const wrongSound   = new Audio('../audio/buzzer.mp3');

correctSound.volume = 0.8;  
wrongSound.volume = 0.15;    

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
  element?.classList.remove("hidden");
  let element1 = document.getElementById("showModel");
  element1?.classList.remove("hidden");

  const winTitle = document.getElementById("winTitle");
  const winText = document.getElementById("winText");
  const winModal = document.getElementById("winModal");

  if (score >= usedsentences.length / 2) {
    winTitle.textContent = "🎉 You Won! 🎉";
    winText.textContent = `Voitit! Sait ${score} pistettä.`;
  } else {
    winTitle.textContent = "😢 You Lost 😢";
    winText.textContent = `Hävisit. Sait ${score} pistettä.`;
  }

  winModal.style.display = "flex";
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
    correctSound.currentTime = 0; 
    correctSound.play(); 
    document.getElementById("output2").textContent = "Correct!";
    showAnswer();

    
  } else {
    wrongSound.currentTime = 0; 
    wrongSound.play();
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
      let element = document.getElementById("vastaus");
      element.classList.add("hidden");
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
  updateText();
}

//näytetään popup ilmoitus jos tulee ensimmäistä kertaa sivulle
window.onload = function() { 
  updateText();

  const cameFromAddSentences = localStorage.getItem("fromAddSentences") === "true";

  if (cameFromAddSentences) {
    // Remove the flag so it only skips once
    localStorage.removeItem("fromAddSentences");
    closeModal();
  } else {
    showModel();
  }
}

function showModel() {
  resetOwnSentences();
}

//functio joka sulkee popup ilmoituksen
function closeModal() {
  document.getElementById("gameModal").style.display = "none";
}

function restartGame() {
  usedsentences = [];
  score = 0;
  document.getElementById("winModal").style.display = "none";
  updateText();
}
