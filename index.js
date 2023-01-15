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
    fetch(`https://api.trello.com/1/cards?idList=60818195d6c5c48e9ab0638e&key=6966bdeabfac507a5674d37a611710a2&token=ATTA692f55a135390459173fe088de3bb6fb4af7138698944e3a04d1c20be571224387104FDE`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            "name": `Имя: ${fullName} | Номер: ${number} | Установка : ${time}`,
            "idLabels": ["6081819724f11404f188d491"]
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
})
app.listen(process.env.PORT || 3000)
