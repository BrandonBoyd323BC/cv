const myFunction = () => {
    let res = document.getElementById("result")
    let one = document.getElementById("nameOne").value
    let two = document.getElementById("nameTwo").value
    let n = Math.random()
    n = n * 101
    n = Math.floor(n)
    res.innerHTML = n + "%"

    if (n <= 30) {
        reply.innerHTML = `It's me, Tuttle.`
    } 
    else if (n >= 31 && n <= 60) {
        reply.innerHTML = "You better cheat of her paper."
    }
    else if (n >= 61 && n <= 80) {
        reply.innerHTML =  "Bubbles in the tub, bubbles in the glass. A fig in your mouth and a finger in your "+ one +"."
    }
    else if (n >= 81 && n <= 99) {
        reply.innerHTML =  "Gimme Some of that " + two + " Fannie!"
    }
    else if (n == 100) {
        reply.innerHTML =  "!!!!!!!!!!!!!!!!!!!!!!!You get the rod! YOU GET THE ROD!!!!!!!!!!!!!!!!!!!!!!!"
    }

}