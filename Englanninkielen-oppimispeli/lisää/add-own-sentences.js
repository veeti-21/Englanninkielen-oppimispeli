
let ownsentences = JSON.parse(localStorage.getItem("ownsentences")) || [];

const regex = /\bisn't\b|\baren't\b|\bis\b|\bare\b|\bthere\b|\bnot\b/gi;

// lisätään uusi input kenttä
function addInput() {
  const container = document.getElementById("inputsContainer");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "userInput";
  input.placeholder = "Type something...";
  container.appendChild(document.createElement("br"));
  container.appendChild(input);
}

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




