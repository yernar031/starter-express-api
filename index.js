const express = require('express')
const bodyParser = require('body-parser')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
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
    fetch(`https://api.trello.com/1/cards?idList=VSNc7MOb&key=6966bdeabfac507a5674d37a611710a2&token=ee339f3335a6113a7241a039e61e6324ae53c91b93c2a077fd9d9ce54ee39502`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "name": `${fullName}, ${number}`
        })
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)
