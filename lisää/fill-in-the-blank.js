
//ladataaan omat lauseet local storagesta
let ownsentences = JSON.parse(localStorage.getItem("ownsentences")) || [];

let sentances = ["This book is very interesting.", "They aren't coming to the party.", "There is a cat on the roof.", "He isn't going to school today.", "We are happy with the results.", "She is not feeling well.", "There are many stars in the sky.", "It isn't easy to learn a new language.", "There are no cookies left in the jar.", "Isn't it a beautiful day?"];
let replacedWords = []; 
let theword = "";

//fuctio joka vaihtaa sivua
function switchPage() {
  const currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "fill-in-the-blank.html") {
    window.location.href = "add-own-sentences.html";
  } else if (currentPage === "add-own-sentences.html") {
    localStorage.setItem("fromAddSentences", "true");
    window.location.href = "fill-in-the-blank.html";
  }
}

//funktio joka arpoo numeron
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//jos omia lauseita on niin ne otetaan käyttöön
if (ownsentences.length > 0) {
  text = ownsentences[getRandomInt(0, ownsentences.length - 1)];
} else {
  text = sentances[getRandomInt(0, sentances.length - 1)];
}
//otetaan talteen lause ilman apu verbejä
theword = text;

//etsitään apu verbit ja korvataan ne viivalla
const regex = /\bisn't\b|\baren't\b|\bis\b|\bare\b|\bthere\b|\bnot\b/gi;  
replacedWords = text.match(regex) || [];
text = text.replace(regex, "_____");

//näytetään lause jossa on viivat
document.getElementById("output").textContent = text;

//functio joka tarkistaa käyttäjän vastauksen
function checkAnswer() {
  console.log(replacedWords); 
  let text = document.getElementById("userInput2").value;

  if(replacedWords.join(", ").toLowerCase() === text.toLowerCase() | replacedWords.join(",").toLowerCase() === text.toLowerCase()){ 
    document.getElementById("output2").textContent = "Correct!";
    showAnswer();
  } else {
    document.getElementById("output2").textContent = "Try again!";
  }
  //annetaan käyttäjälle valinta näyttää vastaus
  let element = document.getElementById("test");
  element.classList.remove("test");
}

//functio joka näyttää vastauksen
function showAnswer() {
  document.getElementById("input").textContent = theword;
}

//fuctio joka lisää omat lauseet local storageen
function addCentences() {
  const input = document.getElementById("userInput").value.trim();

  if (input.length > 0) {
    if (!input.match(regex)) {
      alert("The sentence must contain at least one of: isn't, aren't, is, are, there, not.");
      return;
    }
    ownsentences.push(input);
    localStorage.setItem("ownsentences", JSON.stringify(ownsentences));
    document.getElementById("userInput").value = ""; 
    alert("Sentence added!");
  } else {
    alert("Please enter a sentence.");
  }
}

//functio joka resetoi omat lauseet
function resetOwnSentences() {
  ownsentences = [];
  localStorage.removeItem("ownsentences");
  console.log("Custom sentences have been reset!");
}

//näytetään popup ilmoitus jos tulee ensimmäistä kertaa sivulle
window.onload = function() {
  if (window.location.pathname.endsWith("fill-in-the-blank.html")) {
    if (localStorage.getItem("fromAddSentences") === "true") {
      localStorage.removeItem("fromAddSentences");
    } else {
      resetOwnSentences(); 
      document.getElementById("gameModal").style.display = "block";
    }
  }
};

//functio joka sulkee popup ilmoituksen
function closeModal() {
  document.getElementById("gameModal").style.display = "none";
}
