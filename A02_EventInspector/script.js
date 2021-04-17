var EventInspector;
(function (EventInspector) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        //install mouse move listener
        document.addEventListener("mousemove", setInfoBox);
        //install click- and keyup-listeners on document, body and all divs
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        document.body.addEventListener("click", logInfo);
        document.body.addEventListener("keyup", logInfo);
        var documentDivs = document.querySelectorAll("div");
        for (var i = 0; i < documentDivs.length; i++) {
            documentDivs[i].addEventListener("click", logInfo);
            documentDivs[i].addEventListener("keyup", logInfo);
        }
    }
    //display mouse position and event's target in span
    function setInfoBox(_event) {
        var spanElement = document.querySelector(".span");
        //set style attributes top and left of span to mouseposition + offset
        var x = _event.clientX;
        var y = _event.clientY;
        var mousePosition = "X coordinates: " + x + ", Y coordinates: " + y;
        var eventTarget = _event.target;
        spanElement.innerHTML = mousePosition + "<br>" + eventTarget;
        spanElement.style.top = y + 10 + "px";
        spanElement.style.left = x + "px";
    }
    function logInfo(_event) {
        //log
        console.log(_event.type);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event.composedPath());
    }
})(EventInspector || (EventInspector = {}));
