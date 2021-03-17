function myFunction() {
     var x = document.getElementById("nav");
     if (x.className === "nav") {
       x.className += " responsive";
     } else {
       x.className = "nav";
     }
   }

$(document).ready(function () {
     // $("#project-img").hover(function () {
     //      $("#project-img").animate({
     //           opacity: '0.5',
     //      }, 800)
     //      .animate({
     //           opacity: '1',
     //      }, 5000)
     // });

     // $("#resume-img-hover").mouseover(function () {
     //      $("#resume-img")

     //      .animate({ left: "-20rem" }, 3000)
     //      .animate({left: "0"}, 8000)
     // });


     $(function () {
          function loop() {
               $("#chevron-container")
                    .animate({ bottom: 5 }, 1000)
                    .animate({ bottom: 40 }, 1000, loop)
          }
          loop()
     });

     $("#chevron-container").click(function () {
          $("#jumbotron").show(function () {
               $("#jumbotron").click()
          })
     })
     $("#home").click(function () {
          $("#jumbotron").show(function () {
               $("#jumbotron").delay(1000).click()
          })
     })


});

