const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "1a301874a116ded8ea06640d46bfd1f4";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&q=" + query + "&units=" + unit;

    https.get(url, function (respond) {
        console.log(respond.statusCode);
        respond.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is " + weatherDescription + " today </p>")
            res.write("<h1>The temperature in " + query + " is " + temp + " degree celcius.</h1>")
            res.write("<img src=" + imageUrl + ">");
            res.send()
            console.log(respond.statusCode);
        })
    })

})

app.listen(3000, () => console.log('Server is running on port 3000'))