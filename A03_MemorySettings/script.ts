namespace Memory {
  window.addEventListener("load", handleLoad);

  let div: HTMLDivElement;
  let content: string[] = [
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
  let playingCards: HTMLElement[] = [];
  let selected: HTMLElement[] = [];
  let hidden: HTMLElement[] = [];
  let numberInput: number = 0;
  let start: number = 0;
  let end: number = 0;

  function handleLoad(_event: Event): void {
    let start: HTMLButtonElement = <HTMLButtonElement>(
      document.querySelector("button")
    );
    start.addEventListener("click", layOutCards);
  }

  function layOutCards(_event: Event): void {
    let formData: FormData = new FormData(document.forms[0]);
    let inputString: FormDataEntryValue | null = formData.get("Number");
    if (inputString) {
      numberInput = Number(inputString);
    } else {
      numberInput = 5;
    }
    if (numberInput < 5 || numberInput > 25) {
      layOutCards(_event);
    }
    let slider: FormDataEntryValue = <FormDataEntryValue>formData.get("Slider");
    let backgroundColor: FormDataEntryValue = <FormDataEntryValue>(
      formData.get("backgroundColor")
    );
    let cardColor: FormDataEntryValue = <FormDataEntryValue>(
      formData.get("cardColor")
    );
    let textColor: FormDataEntryValue = <FormDataEntryValue>(
      formData.get("textColor")
    );
    let fontFamily: FormDataEntryValue = <FormDataEntryValue>(
      formData.get("fontFamily")
    );

    div = <HTMLDivElement>document.querySelector(".form");
    div.innerHTML = "";
    div.style.backgroundColor = backgroundColor.toString();
    for (let i: number = 0; i < numberInput; i++) {
      let card: HTMLElement = document.createElement("div");
      card.innerHTML = "<p class='cardText'>" + content[i] + "</p>";
      card.style.width = slider + "px";
      card.style.height = slider + "px";
      card.setAttribute("class", "front turned");
      card.style.backgroundColor = cardColor.toString();
      card.style.color = textColor.toString();
      card.style.fontFamily = fontFamily.toString();
      playingCards.push(card);
      div.appendChild(card);

      let card2: HTMLElement = document.createElement("div");
      card2.innerHTML = "<p class='cardText'>" + content[i] + "</p>";
      card2.style.width = slider + "px";
      card2.style.height = slider + "px";
      card2.setAttribute("class", "front turned");
      card2.style.backgroundColor = cardColor.toString();
      card2.style.color = textColor.toString();
      card2.style.fontFamily = fontFamily.toString();
      playingCards.push(card2);
      div.appendChild(card2);

      card.addEventListener("click", function (): void {
        if (
          selected.length < 2 &&
          card.classList.contains("turned") &&
          card != selected[0]
        ) {
          card.classList.remove("turned");
          console.log(card);
          selected.push(card);
          checkForMatch(_event);
        }
      });
      card2.addEventListener("click", function (): void {
        if (
          selected.length < 2 &&
          card2.classList.contains("turned") &&
          card2 != selected[0]
        ) {
          card2.classList.remove("turned");
          selected.push(card2);
          checkForMatch(_event);
        }
      });
      playingCards.sort(() => 0.5 - Math.random());
      div.appendChild(playingCards[i]);
    }
    start = new Date().getTime();
  }

  function checkForMatch(_event: Event): void {
    if (selected.length == 2) {
      setTimeout(() => {
        if (selected[0].innerHTML == selected[1].innerHTML) {
          selected[0].classList.add("show");
          selected[1].classList.add("show");
          hidden.push(selected[0]);
          hidden.push(selected[1]);
        } else {
          selected[0].classList.add("turned");
          selected[1].classList.add("turned");
          selected = [];
        }
        selected = [];
        endGame();
      },         2000);
    }
  }

  function endGame(): void {
    if (hidden.length == playingCards.length) {
      end = new Date().getTime() - start;
      let timeCounter: number = Math.floor(end / 1000);
      console.log(timeCounter);
      div.innerHTML = "";
      let message: HTMLElement = document.createElement("div");
      message.innerHTML =
        "<h2>You win!</h2><p>Time: " + timeCounter + " sec</p>";
      div.appendChild(message);
      let again: HTMLElement = document.createElement("div");
      again.innerHTML = "<button>Play again</button>";
      div.appendChild(again);
      again.addEventListener("click", function (e: Event): void {
        e.preventDefault();
        location.reload();
      });
    }
  }
}
