const words = [
  "dog",
  "cat",
  "lion",
  "car",
  "house",
  "book",
  "computer",
  "shoe",
  "tree",
  "river",
  "mountain",
  "ocean",
  "chair",
  "table",
  "lamp",
  "phone",
  "guitar",
  "flower",
  "sun",
  "moon",
  "star",
  "cloud",
  "bird",
  "fish",
  "bear",
  "elephant",
  "tiger",
  "apple",
  "banana",
  "orange",
  "pizza",
  "cake",
  "cookie",
  "train",
  "plane",
  "bus",
  "pen",
  "pencil",
  "marker",
  "mirror",
  "clock",
  "wallet",
  "key",
  "lock",
  "door",
  "window",
  "frame",
  "painting",
  "radio",
  "fan",
  "bottle",
  "cup",
  "plate",
  "spoon",
  "fork",
  "knife",
  "sofa",
  "hat",
  "glove",
  "scarf",
  "sock",
  "boot",
  "jacket",
  "shirt",
  "pants",
  "skirt",
  "dress",
  "tie",
  "bag",
  "backpack",
  "purse",
  "glasses",
  "umbrella",
  "ring",
  "bracelet",
  "necklace",
  "watch",
  "belt",
  "shampoo",
  "soap",
  "toothbrush",
  "toothpaste",
  "towel",
  "comb",
  "brush",
  "razor",
  "perfume",
  "conditioner",
  "floss",
  "bathrobe",
  "slippers",
  "hairdryer",
  "curling iron",
];

const numWordsPerIteration = 2;
let currentSentence = "";
let currentIndex = 0;
let completedSentences = 0;
let badLetterCount = 0;
let startTime;
let bestCompletionTime = Infinity;
let correctTypedLetters = 0;
let totalTypedLetters = 0;
let correctTypedLettersThisSentence = 0;
let totalTypedLettersThisSentence = 0;

const siteLink = document.getElementById("sign");

window.addEventListener("load", () => {
  let popup = document.getElementById("popup");
  const closeButton = document.getElementById("closePopup");

  // Show the popup automatically when the page loads
  popup.style.display = "flex";

  // Add an event listener to the close button
  closeButton.addEventListener("click", () => {
    popup.style.display = "none"; // Hide the popup when close button is clicked
  });
});

siteLink.addEventListener("click", () => {
  window.location.href = "https://www.mpindelski.com/";
});

// Create random sentence
const getRandomSentence = () => {
  const randomIndex = Math.floor(
    Math.random() * (words.length - numWordsPerIteration + 1)
  );
  return words
    .slice(randomIndex, randomIndex + numWordsPerIteration + 3)
    .join(" ");
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
const calculateAccuracyFunction = () => {
  // Calculate accuracy for this sentence
  const accuracyThisSentence =
    (correctTypedLettersThisSentence / totalTypedLettersThisSentence) * 100;
  document.getElementById(
    "accuracy-number"
  ).textContent = `${accuracyThisSentence.toFixed(2)}%`;

  // Reset counters for the next sentence
  correctTypedLettersThisSentence = 0;
  totalTypedLettersThisSentence = 0;
};

// If input = sentence letter color it green and if not - red.
const checkInput = (keyPressed) => {
  const content = document.getElementById("random-sentence");
  totalTypedLetters++;
  totalTypedLettersThisSentence++;

  if (currentSentence[currentIndex] === keyPressed) {
    content.children[currentIndex].style.color = "green";
    currentIndex++;
    correctTypedLetters++;
    correctTypedLettersThisSentence++;
    endSentence();
  } else {
    content.children[currentIndex].style.color = "red";
    badLetterCount++; // Increment badLetterCount
    document.getElementById("bad-letters-number").textContent = badLetterCount; // Display badLetterCount
    currentIndex++;
    endSentence();
  }
};

const endSentence = () => {
  if (currentIndex >= currentSentence.length) {
    const endTime = new Date(); // Record the end time
    const completionTimeMs = endTime - startTime; // Calculate completion time in milliseconds
    const completionTimeSec = completionTimeMs / 1000; // Convert to seconds

    if (completionTimeSec < bestCompletionTime) {
      bestCompletionTime = completionTimeSec;
      document.getElementById(
        "best-completion-time-number"
      ).innerHTML = `${bestCompletionTime.toFixed(2)} s`;
    }

    document.getElementById(
      "completion-time"
    ).innerHTML = `${completionTimeSec.toFixed(2)} s`;
    completedSentences++;
    document.getElementById("sentences-number").textContent =
      completedSentences;
    displaySentence();
    currentIndex = 0;
    calculateAccuracyFunction();
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
        return '<span class="space"> ⸱ </span>';
      } else {
        return `<span>${letter}</span>`;
      }
    })
    .join("");
  sentenceElement.innerHTML = sentenceHTML;
};

displaySentence();
readKeyPressed();
