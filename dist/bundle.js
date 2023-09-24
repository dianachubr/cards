/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/styles.css */ "./src/css/styles.css");
//import { string } from "postcss-selector-parser";

var notFlippedCardI;
var flippedCardI;
var cards;
var imgCard;
var time;
var showTime;
var minute = 0;
var second = 0;
/*const createGameCard = (defaultIcon, flippedCardIcon) => {*/
var createGameCard = function (defaultIcon) {
    var card = document.createElement("div");
    card.classList.add("game-card");
    card.id = defaultIcon;
    notFlippedCardI = document.createElement("img");
    notFlippedCardI.classList.add("img");
    notFlippedCardI.src = "./static/" + defaultIcon + ".png";
    flippedCardI = document.createElement("img");
    flippedCardI.src = "./static/flippedCardIcon.png";
    /*card.append(notFlippedCardI);*/
    card.append(flippedCardI, notFlippedCardI);
    setTimeout(function () {
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
    var time = setTimeout(handler, 1000);
}
function handler() {
    startTimer();
    /* minute = 0;*/
    /* second = 0;*/
    debugger;
    if (document.querySelector(".time")) {
        document.querySelector(".time").textContent =
            (minute < 10 ? "0" + minute : minute) +
                ":" +
                (second < 10 ? "0" + second : second);
        timer();
    }
}
function stopTimer() {
    clearInterval(time);
    document.querySelector(".time").textContent =
        (minute < 10 ? "0" + minute : minute) +
            ":" +
            (second < 10 ? "0" + second : second);
}
function displayNone() {
    /* console.log(imgCard);*/
    imgCard.forEach(function (img) { return (img.style.visibility = "hidden"); });
}
var createGameMenu = function () {
    var gameSection = document.querySelector(".game-section__container");
    gameSection.innerHTML = "";
    gameSection.classList.add("container");
    var title = document.createElement("h2");
    title.textContent = "Выбери сложность";
    title.classList.add("game-menu__title");
    var blockButtons = document.createElement("div");
    blockButtons.classList.add("blockButtons");
    var restartBtn = document.createElement("button");
    restartBtn.classList.add("restart-btn");
    restartBtn.textContent = "Старт";
    var createDifficultButton = function (difficult) {
        var button = document.createElement("button");
        button.classList.add("game-menu__difficult-btn");
        button.textContent = difficult;
        button.onclick = function () {
            restartBtn.addEventListener("click", function () { return startGame(difficult); });
        };
        return button;
    };
    blockButtons.append(createDifficultButton(1), createDifficultButton(2), createDifficultButton(3));
    gameSection.append(title, blockButtons, restartBtn);
};
var cardsApp = function () {
    createGameMenu();
};
cardsApp();
var startGame = function (difficult) {
    var firstCard; /*: null = null*/
    var secondCard; /*: null = null;*/
    var clickable; /*: boolean = true;*/
    var gameSection = document.querySelector(".game-section__container");
    if (gameSection) {
        gameSection.classList.remove("container");
        gameSection.innerHTML = "";
    }
    var buttonAndTime = document.createElement("div");
    buttonAndTime.classList.add("buttonAndTime");
    var showTime = document.createElement("div"); //const
    showTime.classList.add("time");
    showTime.textContent = "00:00";
    var gameTable = document.createElement("div");
    gameTable.classList.add("game-table");
    var cardsIcons = createIconsArray(difficult);
    var duplicatedCardsIcons = duplicateArray(cardsIcons);
    var restartBtn = document.createElement("button");
    restartBtn.classList.add("restart-btn");
    restartBtn.textContent = "Начать заново";
    buttonAndTime.append(showTime, restartBtn);
    shuffle(duplicatedCardsIcons);
    duplicatedCardsIcons.forEach(function (images) {
        return gameTable.append(createGameCard(images));
    });
    gameSection === null || gameSection === void 0 ? void 0 : gameSection.append(buttonAndTime, gameTable);
    imgCard = document.querySelectorAll(".img");
    cards = document.querySelectorAll(".game-card");
    /*timeOut();*/
    handler();
    /*restartBtn.addEventListener("click", createGameMenu());*/
    restartBtn.addEventListener("click", function () {
        clearTimeout(time), createGameMenu();
    });
    cards.forEach(function (card, index) {
        return card.addEventListener("click", function () {
            if (clickable == true && !card.classList.contains("successfully")) {
                card.classList.add("flip");
                if (firstCard == null) {
                    firstCard = index;
                    console.log(firstCard);
                }
                else {
                    if (index != firstCard) {
                        secondCard = index;
                        clickable = false;
                    }
                }
                if (firstCard != null &&
                    secondCard != null &&
                    firstCard != secondCard) {
                    if (cards[firstCard].id === cards[secondCard].id) {
                        console.log(cards[firstCard]);
                        console.log(card.id);
                        setTimeout(function () {
                            cards[firstCard].classList.add("successfully");
                            cards[secondCard].classList.add("successfully");
                            firstCard = null;
                            secondCard = null;
                            clickable = true;
                        }, 500);
                    }
                    else {
                        setTimeout(function () {
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
                if (Array.from(cards).every(function (card) { return card.className.includes("flip"); })) {
                    win();
                    stopTimer();
                }
            }
        });
    });
};
var shuffle = function (array) {
    var _a;
    var currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        _a = [
            array[randomIndex],
            array[currentIndex],
        ], array[currentIndex] = _a[0], array[randomIndex] = _a[1];
    }
    return array;
};
var duplicateArray = function (array) {
    return array.reduce(function (res, current) { return res.concat([current, current]); }, []);
};
var createIconsArray = function (initialCount) {
    var cardsIcons = [
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
    var gameSection = document.querySelector(".game-section__container");
    gameSection.innerHTML = "";
    gameSection.classList.add("container");
    var winImg = document.createElement("img");
    winImg.src = "./static/win.png";
    var textWin = document.createElement("h1");
    textWin.textContent = "Вы выиграли!";
    textWin.classList.add("textWin");
    var textTime = document.createElement("h2");
    textTime.textContent = "Затраченное время:";
    textTime.classList.add("textTime");
    var elapsedTime = document.createElement("div");
    elapsedTime.classList.add("time");
    elapsedTime.textContent = showTime;
    var restartBtn = document.createElement("button");
    restartBtn.classList.add("restart-btn");
    restartBtn.textContent = "Играть снова";
    gameSection.append(winImg, textWin, textTime, elapsedTime, restartBtn);
    restartBtn.addEventListener("click", function () {
        /* minute = 0,*/
        /*second = 0,*/
        clearTimeout(time), createGameMenu();
    });
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map