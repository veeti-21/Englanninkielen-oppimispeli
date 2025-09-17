let ownsentences = JSON.parse(localStorage.getItem("ownsentences")) || [];

let sentances = ["This book is very interesting.", "They aren't coming to the party.", "There is a cat on the roof.", "He isn't going to school today.", "We are happy with the results.", "She is not feeling well.", "There are many stars in the sky.", "It isn't easy to learn a new language.", "There are no cookies left in the jar.", "Isn't it a beautiful day?"];
let replacedWords = []; 
let theword = "";

function showInput() {
  const currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "fill-in-the-blank.html") {
    window.location.href = "add-own-sentences.html";
  } else if (currentPage === "add-own-sentences.html") {
    // Set a flag to indicate we are coming from add-own-sentences
    localStorage.setItem("fromAddSentences", "true");
    window.location.href = "fill-in-the-blank.html";
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (ownsentences.length > 0) {
  text = ownsentences[getRandomInt(0, ownsentences.length - 1)];
} else {
  text = sentances[getRandomInt(0, sentances.length - 1)];
}

theword = text;
const regex = /\bisn't\b|\baren't\b|\bis\b|\bare\b|\bthere\b|\bnot\b/gi;
  
replacedWords = text.match(regex) || [];

text = text.replace(regex, "_____");

document.getElementById("output").textContent = text;

function checkAnswer() {
  console.log(replacedWords); 
  let text = document.getElementById("userInput2").value;

  if(replacedWords.join(", ").toLowerCase() === text.toLowerCase() | replacedWords.join(",").toLowerCase() === text.toLowerCase()){ 
    document.getElementById("output2").textContent = "Correct!";
    document.getElementById("input").textContent = theword;
  } else {
    document.getElementById("output2").textContent = "Try again!";
  }

  let element = document.getElementById("test");
  element.classList.remove("test");
}

function showAnswer() {
  document.getElementById("input").textContent = theword;
}

function addCentences() {
  // Get the value from the input field
  const input = document.getElementById("userInput").value.trim();

  if (input.length > 0) {
    if (!input.match(regex)) {
      alert("The sentence must contain at least one of: isn't, aren't, is, are, there, not.");
      return;
    }
    ownsentences.push(input);
    localStorage.setItem("ownsentences", JSON.stringify(ownsentences));
    document.getElementById("userInput").value = ""; // Clear input
    alert("Sentence added!");
  } else {
    alert("Please enter a sentence.");
  }
}

function resetOwnSentences() {
  ownsentences = [];
  localStorage.removeItem("ownsentences");
  console.log("Custom sentences have been reset!");
}

window.onload = function() {
  // Only show modal if NOT coming from add-own-sentences
  if (window.location.pathname.endsWith("fill-in-the-blank.html")) {
    if (localStorage.getItem("fromAddSentences") === "true") {
      localStorage.removeItem("fromAddSentences");
    } else {
      document.getElementById("gameModal").style.display = "block";
    }
  }
};

function closeModal() {
  document.getElementById("gameModal").style.display = "none";
}

function goToAddSentences() {
  localStorage.setItem("fromAddSentences", "true");
  window.location.href = "add-own-sentences.html";
}