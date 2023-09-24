//import { string } from "postcss-selector-parser";
import "../css/styles.css";
import * as _ from "lodash";

let notFlippedCardI;
let flippedCardI;
let cards: NodeListOf<Element>;
let imgCard: any[] | NodeListOf<Element>;
let time;
let showTime;
let minute: number = 0;
let second: number = 0;
let finishTime: string;
//let gameOver: string;

/*const createGameCard = (defaultIcon, flippedCardIcon) => {*/
const createGameCard = (defaultIcon: string) => {
  const card = document.createElement("div") as HTMLElement;
  card.classList.add("game-card");
  card.id = defaultIcon;

  notFlippedCardI = document.createElement("img");
  notFlippedCardI.classList.add("img");
  notFlippedCardI.src = "./static/" + defaultIcon + ".png";

  flippedCardI = document.createElement("img");
  flippedCardI.src = "./static/flippedCardIcon.png";

  /*card.append(notFlippedCardI);*/
  card.append(flippedCardI, notFlippedCardI);
  minute = 0;
  second = 0;
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
  let time: ReturnType<typeof setTimeout> = setTimeout(handler, 1000);
}

function handler() {
  startTimer();
  //minute = 0;
  //second = 0;
  //debugger;
  //showTime.textContent = "00:00";
  if (document.querySelector(".time") as HTMLDivElement) {
    finishTime = document.querySelector(".time")!.textContent =
      (minute < 10 ? "0" + minute : minute) +
      ":" +
      (second < 10 ? "0" + second : second);
    timer();
  }
}

function stopTimer() {
  clearInterval(time);
  document.querySelector(".time")!.textContent =
    (minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 10 ? "0" + second : second);
}

function displayNone() {
  /* console.log(imgCard);*/
  imgCard.forEach((img) => (img.style.visibility = "hidden"));
}

const createGameMenu = () => {
  //minute = 0;
  //second = 0;
  const gameSection = document.querySelector(
    ".game-section__container"
  ) as HTMLDivElement;
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
  let firstCard; /*: null = null*/
  let secondCard; /*: null = null;*/
  let clickable: boolean = true;

  const gameSection: HTMLElement | null = document.querySelector(
    ".game-section__container"
  );
  if (gameSection) {
    gameSection.classList.remove("container");
    gameSection.innerHTML = "";
  }

  const buttonAndTime: HTMLDivElement = document.createElement("div");
  buttonAndTime.classList.add("buttonAndTime");

  const showTime: HTMLDivElement = document.createElement("div");
  showTime.classList.add("time");
  // showTime.textContent = "00:00";

  const gameTable: HTMLDivElement = document.createElement("div");
  gameTable.classList.add("game-table");

  const cardsIcons = createIconsArray(difficult);
  const duplicatedCardsIcons = duplicateArray(cardsIcons);

  const restartBtn = document.createElement("button");
  restartBtn.classList.add("restart-btn");
  restartBtn.textContent = "Начать заново";

  buttonAndTime.append(showTime, restartBtn);

  shuffle(duplicatedCardsIcons);

  duplicatedCardsIcons.forEach((images) =>
    gameTable.append(createGameCard(images))
  );

  gameSection?.append(buttonAndTime, gameTable);

  imgCard = document.querySelectorAll(".img");

  cards = document.querySelectorAll(".game-card");

  /*timeOut();*/
  handler();
  /*restartBtn.addEventListener("click", createGameMenu());*/
  restartBtn.addEventListener("click", () => {
    //minute = 0;
    //second = 0;
    clearTimeout(time), createGameMenu();
  });

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
        /*if (*/
        /* Array.from(cards).every((card) => card.className.includes("flip"))*/
        /*)*/
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
  const gameSection: HTMLElement | any = document.querySelector(
    ".game-section__container"
  );
  gameSection.innerHTML = "";
  gameSection.classList.add("container");

  const winImg = document.createElement("img");
  winImg.src = "./static/win.png";

  const textWin = document.createElement("h1");
  textWin.textContent = "Вы выиграли!";
  textWin.classList.add("textWin");

  const textTime = document.createElement("h2");
  textTime.textContent = "Затраченное время:";
  textTime.classList.add("textTime");

  const elapsedTime = document.createElement("div");
  elapsedTime.classList.add("time");
  //const finishTime = document.querySelector(".time").textContent;
  elapsedTime.textContent = finishTime;
  console.log(finishTime);
  clearTimeout(time);
  //elapsedTime.textContent = showTime;

  const restartBtn = document.createElement("button");
  restartBtn.classList.add("restart-btn");
  restartBtn.textContent = "Играть снова";

  gameSection.append(winImg, textWin, textTime, elapsedTime, restartBtn);

  restartBtn.addEventListener("click", () => {
    minute = 0;
    second = 0;
    clearTimeout(time), createGameMenu();
  });
}
