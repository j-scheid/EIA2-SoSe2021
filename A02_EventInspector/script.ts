namespace EventInspector {

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        //install mouse move listener
        document.addEventListener("mousemove", setInfoBox);

        //install click- and keyup-listeners on document, body and all divs
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);

        document.body.addEventListener("click", logInfo);
        document.body.addEventListener("keyup", logInfo);

        let documentDivs: NodeListOf<HTMLDivElement> = document.querySelectorAll("div");
        
        for (let i: number = 0; i < documentDivs.length; i++) {
            documentDivs[i].addEventListener("click", logInfo);
            documentDivs[i].addEventListener("keyup", logInfo);
        }
    }

    //display mouse position and event's target in span
    function setInfoBox(_event: MouseEvent): void {
        let spanElement: HTMLSpanElement = <HTMLSpanElement>document.querySelector(".span");

    //set style attributes top and left of span to mouseposition + offset
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let mousePosition: string = "X coordinates: " + x + ", Y coordinates: " + y;
        let eventTarget: EventTarget = <EventTarget>_event.target; 

        spanElement.innerHTML = mousePosition + "<br>" + eventTarget;
        spanElement.style.top = y + 10 + "px";
        spanElement.style.left = x + "px";
    }

    function logInfo(_event: Event): void {
    //log
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event.composedPath());
    }
}