let notFlippedCardI;
let flippedCardI;
let cards;
let imgCard;
let time;
let minute = 0;
let second = 0;

//const createGameCard = (defaultIcon, flippedCardIcon) => {
const createGameCard = (defaultIcon) => {
  const card = document.createElement("div");
  card.classList.add("game-card");
  card.id = defaultIcon;

  notFlippedCardI = document.createElement("img");
  notFlippedCardI.classList.add("img");
  notFlippedCardI.src = "./js/src/img/" + defaultIcon + ".png";

  flippedCardI = document.createElement("img");
  flippedCardI.src = "./js/src/img/flippedCardIcon.png";

  //card.append(notFlippedCardI);
  card.append(flippedCardI, notFlippedCardI);

  setTimeout(() => {
    displayNone();
  }, 5000);
  return card;
};

function startTimer() {
  second++;
  if (second >= 60) {
    second = 0;
    minute++;
  }
}

function timer() {
  time = setTimeout(handler, 1000);
}

function handler() {
  startTimer();
  document.querySelector(".time").textContent =
    (minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 10 ? "0" + second : second);
  timer();
}

function stopTimer() {
  clearInterval(time);
  document.querySelector(".time").textContent =
    (minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 10 ? "0" + second : second);
}

function displayNone() {
  // console.log(imgCard);
  imgCard.forEach((img) => (img.style.visibility = "hidden"));
}

const createGameMenu = () => {
  const gameSection = document.querySelector(".game-section__container");
  gameSection.innerHTML = "";
  gameSection.classList.add("container");

  const title = document.createElement("h2");
  title.textContent = "Выбери сложность";
  title.classList.add("game-menu__title");

  const blockButtons = document.createElement("div");
  blockButtons.classList.add("blockButtons");

  const restartBtn = document.createElement("button");
  restartBtn.classList.add("restart-btn");
  restartBtn.textContent = "Старт";

  const createDifficultButton = (difficult) => {
    const button = document.createElement("button");
    button.classList.add("game-menu__difficult-btn");
    button.textContent = difficult;

    button.onclick = function () {
      restartBtn.addEventListener("click", () => startGame(difficult));
    };

    return button;
  };

  blockButtons.append(
    createDifficultButton(1),
    createDifficultButton(2),
    createDifficultButton(3)
  );

  gameSection.append(title, blockButtons, restartBtn);
};

const cardsApp = () => {
  createGameMenu();
};

cardsApp();

const startGame = (difficult) => {
  let firstCard = null;
  let secondCard = null;
  let clickable = true;

  const gameSection = document.querySelector(".game-section__container");
  gameSection.classList.remove("container");
  gameSection.innerHTML = "";

  const buttonAndTime = document.createElement("div");
  buttonAndTime.classList.add("buttonAndTime");

  time = document.createElement("div");
  time.classList.add("time");
  time.textContent = "00:00";

  const gameTable = document.createElement("div");
  gameTable.classList.add("game-table");

  const cardsIcons = createIconsArray(difficult);
  const duplicatedCardsIcons = duplicateArray(cardsIcons);

  const restartBtn = document.createElement("button");
  restartBtn.classList.add("restart-btn");
  restartBtn.textContent = "Начать заново";

  buttonAndTime.append(time, restartBtn);

  shuffle(duplicatedCardsIcons);

  duplicatedCardsIcons.forEach((images) =>
    gameTable.append(createGameCard(images))
  );

  gameSection.append(buttonAndTime, gameTable);

  imgCard = document.querySelectorAll(".img");

  cards = document.querySelectorAll(".game-card");

  //timeOut();
  handler();

  restartBtn.addEventListener("click", clearInterval(handler), createGameMenu);

  cards.forEach((card, index) =>
    card.addEventListener("click", () => {
      if (clickable == true && !card.classList.contains("successfully")) {
        card.classList.add("flip");

        if (firstCard == null) {
          firstCard = index;
          console.log(firstCard);
        } else {
          if (index != firstCard) {
            secondCard = index;
            clickable = false;
          }
        }

        if (
          firstCard != null &&
          secondCard != null &&
          firstCard != secondCard
        ) {
          if (cards[firstCard].id === cards[secondCard].id) {
            console.log(cards[firstCard]);
            console.log(card.id);

            setTimeout(() => {
              cards[firstCard].classList.add("successfully");
              cards[secondCard].classList.add("successfully");

              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 500);
          } else {
            setTimeout(() => {
              cards[firstCard].classList.remove("flip");
              cards[secondCard].classList.remove("flip");

              firstCard = null;
              secondCard = null;
              clickable = true;
            }, 500);
          }
        }
        if (
          Array.from(cards).every((card) => card.className.includes("flip"))
        ) {
          win();
          stopTimer();
        }
      }
    })
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const duplicateArray = (array) =>
  array.reduce((res, current) => res.concat([current, current]), []);

const createIconsArray = (initialCount) => {
  const cardsIcons = [
    "6bubni",
    "7bubni",
    "8bubni",
    "9bubni",
    "10bubni",
    "valetbubni",
    "damabubni",
    "korolbubni",
    "tuzbubni",
    "6chervi",
    "7chervi",
    "8chervi",
    "9chervi",
    "10chervi",
    "valetchervi",
    "damachervi",
    "korolchervi",
    "tuzchervi",
    "6piki",
    "7piki",
    "8piki",
    "9piki",
    "10piki",
    "valetpiki",
    "damapiki",
    "korolpiki",
    "tuzpiki",
    "6kresti",
    "7kresti",
    "8kresti",
    "9kresti",
    "10kresti",
    "valetkresti",
    "damakresti",
    "korolkresti",
    "tuzkresti",
  ];

  switch (initialCount) {
    case 1:
      return cardsIcons.slice(0, 3);
    case 2:
      return cardsIcons.slice(0, 6);
    case 3:
      return cardsIcons.slice(0, 9);
    default:
      break;
  }
};

function win() {
  const gameSection = document.querySelector(".game-section__container");
  gameSection.innerHTML = "";
  gameSection.classList.add("container");

  const winImg = document.createElement("img");
  winImg.src = "./js/src/img/win.png";

  const textWin = document.createElement("h1");
  textWin.textContent = "Вы выиграли!";
  textWin.classList.add("textWin");

  const textTime = document.createElement("h2");
  textTime.textContent = "Затраченное время:";
  textTime.classList.add("textTime");

  const elapsedTime = document.createElement("div");
  elapsedTime.classList.add("time");
  elapsedTime.textContent = time;

  const restartBtn = document.createElement("button");
  restartBtn.classList.add("restart-btn");
  restartBtn.textContent = "Играть снова";

  gameSection.append(winImg, textWin, textTime, elapsedTime, restartBtn);

  restartBtn.addEventListener(
    "click",
    // minute = 0,
    //second = 0,
    //clearTimeout(timer),
    createGameMenu
  );
}
