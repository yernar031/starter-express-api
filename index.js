const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.post('/parse', (req, res) => {
    lead_data = req.body.lead_data;
    fullName = lead_data.answer_1;
    number = lead_data.answer_2;
    region = lead_data.answer_3
    filter = lead_data.answer_4;
    limescale = lead_data.answer_5;
    time = lead_data.answer_6
    price = lead_data.answer_7;
    console.log(fullName, number, region, filter, limescale, time, price)
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)
