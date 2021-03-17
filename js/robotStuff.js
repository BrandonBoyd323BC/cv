const myFunction = (x) => {
    let milkPrice = 2.26
    let bottles = x / milkPrice
    let bottlesRounded = Math.floor(bottles)
    let res = document.getElementById("bottles")

    console.log("leaveHouse");
    console.log("moveRight");
    console.log("moveRight");
    console.log("moveUp");
    console.log("moveUp");
    console.log("moveUp");
    console.log("moveUp");
    console.log("moveRight");
    console.log("moveRight");
    console.log("Buy " + bottlesRounded + " bottles of milk you foolish robot.");
    console.log("moveLeft");
    console.log("moveLeft");
    console.log("moveDown");
    console.log("moveDown");
    console.log("moveDown");
    console.log("moveDown");
    console.log("moveLeft");
    console.log("moveLeft");
    console.log("enterHouse");
    res.innerHTML = bottlesRounded

}