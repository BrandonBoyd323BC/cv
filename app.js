
const https = require("https")
const express = require("express")
const bodyParser = require("body-parser")
 
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {

    const query = req.body.cityName
    const apiKey = "6a50c354bbf351b6fc1c43814ad9e16b"
    const units = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units
    console.log(url)
        
        https.get(url, function(response) {
            
            response.on("data", function(data) {
                const weatherData = JSON.parse(data)
               
                const temp = weatherData.main.temp
                const weatherDescription = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
                
                res.write("<p>The description of weather in "+ query +" is " + weatherDescription + ".")
                res.write("<h1>The temprature is " + temp + " degrees fahrenheit.</h1>")            
                res.write("<div><img src="+imgURL+">Test</div>")
                
                res.send()

            })
        })
})

app.listen(3000, function() {
    console.log("listening in on port 3000.")
})












