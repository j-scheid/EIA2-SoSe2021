console.log("Loading random poems:");
var RandomPoems;
(function (RandomPoems) {
    //Prefix: Es existieren immer mehrere Versionen eines Charakters in der Welt von Rick&Morty, Multiverse sei Dank
    var prefix = ["Pickle", "Evil", "Tiny", "Party", "C-137", "Creepy"];
    var subject = ["Rick", "Morty", "Jerry", "Mr. Meeseeks", "Snuffles", "Henderfinger"];
    var predicate = ["rides", "created", "uses", "shrinks", "hides", "repairs"];
    var object = ["the portal gun", "the space cruiser", "an interdimensional cable", "the particle beam wrist watch", "the Series 9000 Brainalyzer", "Tommy's clone"];
    //6 Sätze ausgenem
    for (var i = prefix.length; i >= 1; i--) {
        var sentence = getSentence(prefix, subject, predicate, object);
        console.log(sentence);
    }
    //Sätze per Zufall zusammenstellen
    function getSentence(_prefix, _subjects, _predicate, _object) {
        var randomPrefix = Math.floor(Math.random() * _subjects.length);
        var randomSubject = Math.floor(Math.random() * _subjects.length);
        var randomPredicate = Math.floor(Math.random() * _subjects.length);
        var randomObject = Math.floor(Math.random() * _subjects.length);
        var temp = _prefix[randomPrefix] + "-" + _subjects[randomSubject] + " " + _predicate[randomPredicate] + " " + _object[randomObject] + ".";
        _prefix.splice(randomPrefix, 1);
        _subjects.splice(randomSubject, 1);
        _predicate.splice(randomPredicate, 1);
        _object.splice(randomObject, 1);
        return temp;
    }
})(RandomPoems || (RandomPoems = {}));
