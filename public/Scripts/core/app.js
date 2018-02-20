// IIFE - Immediately Invoked Function Expression
// sometimes called a self-excuting anonymous function
(function(){
    let name = "Pedro";
    let otherName = "Ash";


    function Start() {
        console.log("application starting");

        console.log(`The guy in the front is ${name}`);
        console.log(`The Girl near the front is ${otherName}`);
        Main();
    }

    function Main() {
        console.log("App Started");
    }

    window.onload = Start;
})();