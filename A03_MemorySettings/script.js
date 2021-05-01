var Memory;
(function (Memory) {
    window.addEventListener("load", handleLoad);
    var div;
    var content = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y"
    ];
    var playingCards = [];
    var selected = [];
    var hidden = [];
    var numberInput = 0;
    var start = 0;
    var end = 0;
    function handleLoad(_event) {
        var start = (document.querySelector("button"));
        start.addEventListener("click", layOutCards);
    }
    function layOutCards(_event) {
        var formData = new FormData(document.forms[0]);
        var inputString = formData.get("Number");
        if (inputString) {
            numberInput = Number(inputString);
        }
        else {
            numberInput = 5;
        }
        if (numberInput < 5 || numberInput > 25) {
            layOutCards(_event);
        }
        var slider = formData.get("Slider");
        var backgroundColor = (formData.get("backgroundColor"));
        var cardColor = (formData.get("cardColor"));
        var textColor = (formData.get("textColor"));
        var fontFamily = (formData.get("fontFamily"));
        div = document.querySelector(".form");
        div.innerHTML = "";
        div.style.backgroundColor = backgroundColor.toString();
        var _loop_1 = function (i) {
            var card = document.createElement("div");
            card.innerHTML = "<p class='cardText'>" + content[i] + "</p>";
            card.style.width = slider + "px";
            card.style.height = slider + "px";
            card.setAttribute("class", "front turned");
            card.style.backgroundColor = cardColor.toString();
            card.style.color = textColor.toString();
            card.style.fontFamily = fontFamily.toString();
            playingCards.push(card);
            div.appendChild(card);
            var card2 = document.createElement("div");
            card2.innerHTML = "<p class='cardText'>" + content[i] + "</p>";
            card2.style.width = slider + "px";
            card2.style.height = slider + "px";
            card2.setAttribute("class", "front turned");
            card2.style.backgroundColor = cardColor.toString();
            card2.style.color = textColor.toString();
            card2.style.fontFamily = fontFamily.toString();
            playingCards.push(card2);
            div.appendChild(card2);
            card.addEventListener("click", function () {
                if (selected.length < 2 &&
                    card.classList.contains("turned") &&
                    card != selected[0]) {
                    card.classList.remove("turned");
                    console.log(card);
                    selected.push(card);
                    checkForMatch(_event);
                }
            });
            card2.addEventListener("click", function () {
                if (selected.length < 2 &&
                    card2.classList.contains("turned") &&
                    card2 != selected[0]) {
                    card2.classList.remove("turned");
                    selected.push(card2);
                    checkForMatch(_event);
                }
            });
            playingCards.sort(function () { return 0.5 - Math.random(); });
            div.appendChild(playingCards[i]);
        };
        for (var i = 0; i < numberInput; i++) {
            _loop_1(i);
        }
        start = new Date().getTime();
    }
    function checkForMatch(_event) {
        if (selected.length == 2) {
            setTimeout(function () {
                if (selected[0].innerHTML == selected[1].innerHTML) {
                    selected[0].classList.add("show");
                    selected[1].classList.add("show");
                    hidden.push(selected[0]);
                    hidden.push(selected[1]);
                }
                else {
                    selected[0].classList.add("turned");
                    selected[1].classList.add("turned");
                    selected = [];
                }
                selected = [];
                endGame();
            }, 2000);
        }
    }
    function endGame() {
        if (hidden.length == playingCards.length) {
            end = new Date().getTime() - start;
            var timeCounter = Math.floor(end / 1000);
            console.log(timeCounter);
            div.innerHTML = "";
            var message = document.createElement("div");
            message.innerHTML =
                "<h2>You win!</h2><p>Time: " + timeCounter + " sec</p>";
            div.appendChild(message);
            var again = document.createElement("div");
            again.innerHTML = "<button>Play again</button>";
            div.appendChild(again);
            again.addEventListener("click", function (e) {
                e.preventDefault();
                location.reload();
            });
        }
    }
})(Memory || (Memory = {}));
