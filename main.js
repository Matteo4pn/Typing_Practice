const words = [
  "cat",
  "zebra",
  "dog",
  "elephant",
  "fox",
  "car",
  "books",
  "chicken",
  "dogs",
  "cats",
  "zebras",
  "dog",
  "desk",
  "window",
  "pen",
  "keyboard",
  "juice",
  "orange",
  "banana",
];

const numWordsPerIteration = 2;
let currentSentence = "";
let currentIndex = 0;
let completedSentences = 0;
let badLetterCount = 0;
let startTime;

// Create random sentence
const getRandomSentence = () => {
  const randomIndex = Math.floor(
    Math.random() * (words.length - numWordsPerIteration + 1)
  );
  return words.slice(randomIndex, randomIndex + numWordsPerIteration).join(" ");
};

// Chceck what key was pressed
const readKeyPressed = () => {
  document.addEventListener("keydown", (event) => {
    const keyPressed = event.key;
    // Check if the pressed key is not the backspace key. If not, continue. If yes, ignore it.
    if (keyPressed !== "Backspace") {
      checkInput(keyPressed);
    }
  });
};

// If input = sentence letter color it green and if not - red.
const checkInput = (keyPressed) => {
  const content = document.getElementById("random-sentence");

  if (currentSentence[currentIndex] === keyPressed) {
    console.log("good letter");
    content.children[currentIndex].style.color = "green";
    currentIndex++;

    if (currentIndex >= currentSentence.length) {
      const endTime = new Date(); // Record the end time
      const completionTimeMs = endTime - startTime; // Calculate completion time in milliseconds
      const completionTimeSec = completionTimeMs / 1000; // Convert to seconds
      
      document.getElementById('completion-time').innerHTML = `${completionTimeSec.toFixed(2)} s`;
      console.log(`Completion time: ${completionTimeSec.toFixed(2)} seconds`);
      completedSentences++;
      document.getElementById("sentences-number").textContent =
        completedSentences;
      displaySentence();
      currentIndex = 0;
    }
  } else {
    console.log("bad letter");
    content.children[currentIndex].style.color = "red";
    badLetterCount++; // Increment badLetterCount
    document.getElementById("bad-letters-number").textContent = badLetterCount; // Display badLetterCount
  }
};

const displaySentence = () => {
  startTime = new Date(); 
  currentSentence = getRandomSentence();
  const sentenceElement = document.getElementById("random-sentence");
  const sentenceHTML = currentSentence
    .split("")
    .map((letter) => {
      if (letter === " ") {
        return '<span class="space">_</span>';
      } else {
        return `<span>${letter}</span>`;
      }
    })
    .join("");
  sentenceElement.innerHTML = sentenceHTML;
};

displaySentence();
readKeyPressed();
