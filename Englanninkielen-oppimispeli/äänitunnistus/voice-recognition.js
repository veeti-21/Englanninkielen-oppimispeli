const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  const userInput = document.getElementById("userInput");
  const output = document.getElementById("output");
  const feedback = document.getElementById("feedback");
  const targetWordEl = document.getElementById("targetWord");

  const words = [
    "apple",
    "banana",
    "hello world",
    "good morning",
    "open the door",
    "I love programming",
    "thank you very much"
  ];

  let currentTarget = "";

  // 🎵 Load audio files
  const correctSound = new Audio('../audio/ding.wav');
  const wrongSound   = new Audio('../audio/buzzer.mp3');

  // Adjust volume (0.0 = silent, 1.0 = full volume)
  correctSound.volume = 0.8;  // slightly lower than full
  wrongSound.volume = 0.2;    // make the wrong one quieter

  function setNewWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentTarget = words[randomIndex];
    targetWordEl.textContent = currentTarget;
    feedback.textContent = "";
    output.textContent = "";
    userInput.value = "";
  }

  function startRecognition() {
    if (!currentTarget) {
      feedback.textContent = "Press 'New Word' first!";
      feedback.style.color = "#f7d26a";
      return;
    }
    recognition.start();
    output.textContent = "Listening...";
  }

  function stopRecognition() {
    recognition.stop();
    output.textContent = "Stopped listening.";
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    userInput.value = transcript;
    output.textContent = `You said: "${transcript}"`;
    checkPronunciation(transcript);
  };

  recognition.onerror = (event) => {
    output.textContent = `Error: ${event.error}`;
  };

  function checkPronunciation(spoken) {
    const target = currentTarget.toLowerCase();
    if (spoken === target) {
      feedback.textContent = "Perfect!";
      feedback.style.color = "#7CFC00";
      correctSound.currentTime = 0; // restart audio
      correctSound.play();
    } else if (spoken.includes(target) || target.includes(spoken)) {
      feedback.textContent = "Almost!";
      feedback.style.color = "#FFD700";
    } else {
      feedback.textContent = "Try again!";
      feedback.style.color = "#FF6347";
      wrongSound.currentTime = 0; // restart audio
      wrongSound.play();
    }
  }

  function testsound() {
    wrongSound.currentTime = 0;
    wrongSound.play();
  }