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
        return;
      }
      recognition.start();
      output.textContent = "🎤 Listening...";
    }

    function stopRecognition() {
      recognition.stop();
      output.textContent = "🛑 Stopped listening.";
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
        feedback.textContent = "✅ Perfect!";
        feedback.style.color = "green";
      } else if (spoken.includes(target) || target.includes(spoken)) {
        feedback.textContent = "🟡 Almost!";
        feedback.style.color = "orange";
      } else {
        feedback.textContent = "❌ Try again!";
        feedback.style.color = "red";
      }
    }