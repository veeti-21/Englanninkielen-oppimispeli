// voice-recognition.js

// Check for browser support
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
  alert("Your browser does not support Speech Recognition.");
} else {
  const recognition = new SpeechRecognition();
  recognition.continuous = true; // keep listening until stopped
  recognition.interimResults = true; // show results while speaking
  recognition.lang = "en-US"; // language

  const startBtn = document.getElementById("startRecognition");
  const stopBtn = document.getElementById("stopRecognition");
  const userInput = document.getElementById("userInput");
  const output = document.getElementById("output");

  // Start recognition
  startBtn.addEventListener("click", () => {
    recognition.start();
    output.textContent = "Listening...";
  });

  // Stop recognition
  stopBtn.addEventListener("click", () => {
    recognition.stop();
    output.textContent = "Stopped listening.";
  });

  // Capture results
  recognition.addEventListener("result", (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    // Update text input
    userInput.value = transcript;
    output.textContent = `You said: ${transcript}`;
  });

  // Handle errors
  recognition.addEventListener("error", (event) => {
    output.textContent = `Error: ${event.error}`;
  });
}
