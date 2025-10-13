
    const words = [
      { en: "Cat", fi: "kissa" },
      { en: "Dog", fi: "koira" },
      { en: "House", fi: "talo" },
      { en: "Tree", fi: "puu" },
      { en: "Water", fi: "vesi" },
      { en: "Sun", fi: "aurinko" },
      { en: "Book", fi: "kirja" },
      { en: "Chair", fi: "tuoli" },
      { en: "Table", fi: "pöytä" },
      { en: "Car", fi: "auto" },
      { en: "Bird", fi: "lintu" },
      { en: "Milk", fi: "maito" }
    ];

    let score = 0;
    const totalMatches = words.length;
    let lastDragged = null;

    const wordBox = document.getElementById("wordBox");
    const successMessage = document.getElementById("successMessage");
    const modalOverlay = document.getElementById("modalOverlay");
    const endModal = document.getElementById("endModal");
    const menuOverlay = document.getElementById("menuOverlay");
    const menuModal = document.getElementById("menuModal");

    function shuffle(array) {
      for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i +1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function showEndModal() {
      modalOverlay.style.display = "block";
      endModal.style.display = "block";
    }

    function hideEndModal() {
      modalOverlay.style.display = "none";
      endModal.style.display = "none";
    }

    function showMenu() {
      menuOverlay.style.display = "block";
      menuModal.style.display = "block";
    }

    function hideMenu() {
      menuOverlay.style.display = "none";
      menuModal.style.display = "none";
    }

    function initGame() {
      wordBox.innerHTML = "";
      successMessage.style.display = "none";
      hideEndModal();
      hideMenu();
      score = 0;
      lastDragged = null;

      const allWords = [];
      words.forEach(pair => {
        allWords.push({ word: pair.en, pairId: pair.en, lang: 'en' });
        allWords.push({ word: pair.fi, pairId: pair.en, lang: 'fi' });
      });

      shuffle(allWords);

      allWords.forEach(item => {
        const div = document.createElement("div");
        div.className = "word";
        div.textContent = item.word;
        div.dataset.pairId = item.pairId;
        div.draggable = true;

        div.addEventListener("dragstart", () => {
          lastDragged = div;
        });

        div.addEventListener("dragover", (e) => {
          e.preventDefault();
          if (!div.classList.contains("matched")) {
            div.classList.add("drag-over");
          }
        });

        div.addEventListener("dragleave", () => {
          div.classList.remove("drag-over");
        });

        div.addEventListener("drop", () => {
          div.classList.remove("drag-over");
          if (
            lastDragged &&
            lastDragged !== div &&
            lastDragged.dataset.pairId === div.dataset.pairId &&
            !lastDragged.classList.contains("matched") &&
            !div.classList.contains("matched")
          ) {
            lastDragged.classList.add("matched");
            div.classList.add("matched");
            lastDragged.draggable = false;
            div.draggable = false;
            score++;
            if (score === totalMatches) {
              successMessage.style.display = "block";
              showEndModal();
            }
          }
        });

        wordBox.appendChild(div);
      });
    }
    document.getElementById("playAgainBtn").onclick = initGame;
    document.getElementById("restartBtn").onclick = initGame;

    document.getElementById("menuBtn").onclick = () => window.location.href = "index.html";
    document.getElementById("menuToMenuBtn").onclick = () => window.location.href = "index.html";

    document.getElementById("menuToggleBtn").onclick = showMenu;
    menuOverlay.onclick = hideMenu;
    modalOverlay.onclick = () => {};
    initGame();
 
