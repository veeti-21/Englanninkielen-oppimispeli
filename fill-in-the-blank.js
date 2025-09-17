
ownsentances.push("Your new sentence");
localStorage.setItem("ownsentances", JSON.stringify(ownsentances));

let ownsentances = JSON.parse(localStorage.getItem("ownsentances")) || [];
let sentances = ["This book is very interesting.", "They aren't coming to the party.", "There is a cat on the roof.", "He isn't going to school today.", "We are happy with the results.", "She is not feeling well.", "There are many stars in the sky.", "It isn't easy to learn a new language.", "There are no cookies left in the jar.", "Isn't it a beautiful day?"];
let replacedWords = []; 
let theword = "";

function showInput() {
  const currentPage = window.location.pathname.split("/").pop();
  console.log(currentPage);
  if (currentPage === "fill-in-the-blank.html") {
    window.location.href = "fill-in-the-blank.html";
  } else if (currentPage === "add-own-sentences.html") {
    window.location.href = "add-own-sentences.html";
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (ownsentances.length > 0) {
text = ownsentances[getRandomInt(0, sentances.length - 1)];
} else {
text = sentances[getRandomInt(0, sentances.length - 1)];
}

theword = text;
const regex = /\bisn't\b|\baren't\b|\bis\b|\bare\b|\bthere\b|\bnot\b/gi;
  
replacedWords = text.match(regex) || [];

text = text.replace(regex, "_____");

document.getElementById("output").textContent = text;

function showInput2() {
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

function showInput3() {
  document.getElementById("input").textContent = theword;
}