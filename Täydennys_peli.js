let replacedWords = []; 

function showInput() {
  let text = document.getElementById("userInput").value;

  if (text == "test") {
    document.getElementById("output2").textContent = text + 2;
  }


  const regex = /\bisn['’]t\b|\baren['’]t\b|\bis\b|\bare\b|\bthere\b|\bnot\b/gi;


  replacedWords = text.match(regex) || [];

  text = text.replace(regex, "_____");

  document.getElementById("output").textContent = text;
}

function showInput2() {
  console.log(replacedWords); 
  let text = document.getElementById("userInput2").value;

  if(replacedWords.join(", ").toLowerCase() === text.toLowerCase() | replacedWords.join(",").toLowerCase() === text.toLowerCase()){ 
    document.getElementById("output2").textContent = "Correct!";
  } else {
    document.getElementById("output2").textContent = "Try again!";
  }

}