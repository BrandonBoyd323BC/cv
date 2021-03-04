const myFunction = () => {
    let age = document.getElementById("age").value
    let output = document.getElementById("output")
    let daysOutput = (90 - age) * 365
    let weeksOutput = (90 - age) * 52
    let monthsOutput = (90 - age) * 12
    output.innerHTML = `You have ${daysOutput} days, ${weeksOutput} weeks, and ${monthsOutput} months left.`
}



const bmiCalcualtor = (weight, height) => {
    let bmiReturn = document.getElementById("bmiReturn")    
    let bmi = (weight / (height * height));
    return bmiReturn.innerHTML = bmi;
};



