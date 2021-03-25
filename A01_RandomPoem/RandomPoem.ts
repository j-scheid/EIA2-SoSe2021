console.log("Loading random poems:");
namespace RandomPoems {

    //Prefix: Es existieren immer mehrere Versionen eines Charakters in der Welt von Rick&Morty, Multiverse sei Dank
    let prefix: string[] = ["Pickle", "Evil", "Tiny", "Party", "C-137", "Creepy"];
    let subject: string[] = ["Rick", "Morty", "Jerry", "Mr. Meeseeks", "Snuffles", "Henderfinger"];
    let predicate: string[] = ["rides", "created", "uses", "shrinks", "hides", "repairs"];
    let object: string[] = ["the portal gun", "the space cruiser", "an interdimensional cable", "the particle beam wrist watch", "the Series 9000 Brainalyzer", "Tommy's clone"];

    //6 Sätze ausgenem
    for (let i: number = prefix.length; i >= 1; i --) {
            let sentence: string = getSentence(prefix, subject, predicate, object);
            console.log(sentence);
        }
    
    //Sätze per Zufall zusammenstellen
    function getSentence (_prefix: string[], _subjects: string [], _predicate: string [], _object: string []): string {

        let randomPrefix: number = Math.floor(Math.random() * _subjects.length);
        let randomSubject: number = Math.floor(Math.random() * _subjects.length);
        let randomPredicate: number = Math.floor(Math.random() * _subjects.length);
        let randomObject: number = Math.floor(Math.random() * _subjects.length);

        let temp: string = _prefix[randomPrefix] + "-" + _subjects[randomSubject] + " " +   _predicate[ randomPredicate] + " " +  _object[ randomObject] + ".";

        _prefix.splice(randomPrefix, 1);
        _subjects.splice(randomSubject, 1);
        _predicate.splice(randomPredicate, 1);
        _object.splice(randomObject, 1);
  
        return temp; 
    }
}