// Load custom sentences from localStorage
let ownsentences = JSON.parse(localStorage.getItem("ownsentences")) || [];

// Regex for auxiliary verbs
const regex = /\bisn't\b|\baren't\b|\bis\b|\bare\b|\bthere\b|\bnot\b/gi;

// Add a new input field
function addInput() {
  const container = document.getElementById("inputsContainer");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "userInput";
  input.placeholder = "Type something...";
  container.appendChild(document.createElement("br"));
  container.appendChild(input);
}

// When "Valmis" is clicked, collect all inputs and add valid sentences
function switchPage() {
  const inputs = document.querySelectorAll(".userInput");
  let added = false;
  inputs.forEach(input => {
    const value = input.value.trim();
    if (value.length > 0) {
      if (!value.match(regex)) {
        // Skip invalid sentences
        return;
      }
      ownsentences.push(value);
      added = true;
    }
  });
  if (added) {
    localStorage.setItem("ownsentences", JSON.stringify(ownsentences));
  }
  localStorage.setItem("fromAddSentences", "true");
  window.location.href = "fill-in-the-blank.html";
}


