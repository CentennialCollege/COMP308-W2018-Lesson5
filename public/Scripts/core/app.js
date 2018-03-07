// IIFE - Immediately Invoked Function Expression
// sometimes called a self-excuting anonymous function
(function(){

    function Start() {
        $(".btn-danger").click(function(event) {
          if(!confirm("Are you Sure???")) {
            event.preventDefault();
            window.location.assign("/games");
          }
        });
    }

    window.onload = Start;
})();
