const months = [
      { en: "January", fi: "tammikuu" },
      { en: "February", fi: "helmikuu" },
      { en: "March", fi: "maaliskuu" },
      { en: "April", fi: "huhtikuu" },
      { en: "May", fi: "toukokuu" },
      { en: "June", fi: "kesäkuu" },
      { en: "July", fi: "heinäkuu" },
      { en: "August", fi: "elokuu" },
      { en: "September", fi: "syyskuu" },
      { en: "October", fi: "lokakuu" },
      { en: "November", fi: "marraskuu" },
      { en: "December", fi: "joulukuu" }
    ];

    let score = 0;

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function initGame() {
      score = 0;
      document.getElementById("score").textContent = "";
      hideModal();

      const leftCol = document.getElementById("leftColumn");
      const rightCol = document.getElementById("rightColumn");
      leftCol.innerHTML = "<h3>Pudota tähän</h3>";
      rightCol.innerHTML = "<h3>Vedä tästä</h3>";

      const shuffledMonths = [...months];
      shuffle(shuffledMonths);

      const usedPairs = [];

      shuffledMonths.forEach((month) => {
        const leftLang = Math.random() > 0.5 ? "fi" : "en";
        const rightLang = leftLang === "fi" ? "en" : "fi";

        const drop = document.createElement("div");
        drop.className = "drop-zone";
        drop.textContent = month[leftLang];
        drop.dataset.match = month[rightLang];
        drop.dataset.lang = rightLang;

        drop.addEventListener("dragover", (e) => e.preventDefault());
        drop.addEventListener("drop", (e) => {
          e.preventDefault();
          const draggedValue = e.dataTransfer.getData("text/plain");
          const draggedLang = e.dataTransfer.getData("lang");

          if (draggedValue === drop.dataset.match && draggedLang === drop.dataset.lang) {
            drop.classList.add("matched");
            drop.innerHTML += ` ✅ <span class="matched-text">${draggedValue}</span>`;
            const draggedEl = document.getElementById(draggedLang + "-" + draggedValue);
            if (draggedEl) draggedEl.remove();
            score++;
            updateScore();
            if (score === 12) showModal();
          } else {
            showWrongAlert();
          }
        });

        leftCol.appendChild(drop);
        usedPairs.push({ text: month[rightLang], lang: rightLang });
      });

      shuffle(usedPairs);

      usedPairs.forEach((item) => {
        const dragItem = document.createElement("div");
        dragItem.className = "draggable-item";
        dragItem.textContent = item.text;
        dragItem.id = item.lang + "-" + item.text;
        dragItem.draggable = true;

        dragItem.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", item.text);
          e.dataTransfer.setData("lang", item.lang);
        });

        rightCol.appendChild(dragItem);
      });
    }

    function updateScore() {
      document.getElementById("score").textContent = `Pisteet: ${score} / 12`;
    }

    function showWrongAlert() {
      const alertBox = document.getElementById("wrongAlert");
      alertBox.style.display = "block";
      setTimeout(() => alertBox.style.display = "none", 1200);
    }

    function showModal() {
      document.getElementById("finalScore").textContent = score;
      document.getElementById("modalOverlay").style.display = "block";
      document.getElementById("endModal").style.display = "block";
    }

    function hideModal() {
      document.getElementById("modalOverlay").style.display = "none";
      document.getElementById("endModal").style.display = "none";
    }

    const menuOverlay = document.getElementById("menuOverlay");
const menuModal = document.getElementById("menuModal");

// Show menu
function showMenu() {
    menuOverlay.style.display = "flex"; // use flex to center if needed
    menuModal.style.display = "block";
    menuModal.setAttribute("aria-hidden", "false");
}

// Hide menu
function hideMenu() {
    menuOverlay.style.display = "none";
    menuModal.style.display = "none";
    menuModal.setAttribute("aria-hidden", "true");
}

function homePage() {
    window.location.href = "../etusivu/index.html";
}
function resetGame() {
    location.reload();
}
// Click outside to close
menuOverlay.addEventListener("click", hideMenu);

// Optional: prevent clicks inside modal from closing it
menuModal.addEventListener("click", (event) => {
    event.stopPropagation();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        hideMenu();
    }
});
    
    
    initGame();