let myFunction = () => {
     a = Math.floor(Math.random() * 6) + 1 
     b = Math.floor(Math.random() * 6) + 1 
     x = String(a)
     y = String(b) 
     // console.log(a)


     if (a > b) {
          document.getElementById("dice-result").innerHTML = "Player One Wins"
     } else if (a < b) {
          document.getElementById("dice-result").innerHTML = "Player Two Wins"
     } else {
          document.getElementById("dice-result").innerHTML = "It is a Draw"
     }
          
     document.getElementById('img1').src='img/dice/dice'+x+'.png'
     document.getElementById('img2').src='img/dice/dice'+y+'.png'
 }