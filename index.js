const express = require('express')
const bodyParser = require('body-parser')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const app = express()
let counter = 0;
let boardId = ""

app.use(bodyParser.json())

app.post('/parse', (req, res) => {
    const lead_data = req.body.lead_data;
    const fullName = lead_data.answer_1;
    const number = lead_data.answer_2;
    const region = lead_data.answer_3
    const filter = lead_data.answer_4;
    const limescale = lead_data.answer_5;
    const time = lead_data.answer_6
    const price = lead_data.answer_7;
    var formdata = new FormData();
    formdata.append("name", `Имя: ${fullName} | Номер: ${number} | Установка : ${time}`);
    formdata.append("desc", `Район: ${region}\nCу фильтр бар ма: ${filter}\nҚанша төлеуге дайын: ${price}`)
    if (counter == 0) {
        formdata.append("idLabels", ["63c48b8a98a005037b05c9f5"])
        boardId = "63c48b8a98a005037b05c9c5";
        counter = 1;
    } else if (counter == 1) {
        formdata.append("idLabels", ["63c48b6bb88f130277f8e57b"])
        boardId = "63c48b6bb88f130277f8e54b";
        counter = 0;
    }
    fetch(`https://api.trello.com/1/cards?idList=${boardId}&key=6966bdeabfac507a5674d37a611710a2&token=ATTA692f55a135390459173fe088de3bb6fb4af7138698944e3a04d1c20be571224387104FDE`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formdata
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => res.send(text))
        .catch(err => res.send(err));
})

app.post('/parse2', (req, res) => {
    const lead_data = req.body.lead_data;
    const fullName = lead_data.answer_1;
    const number = lead_data.answer_2;
    const address = lead_data.answer_3
    var formdata = new FormData();
    formdata.append("name", `Имя: ${fullName} | Номер: ${number} | Адресс : ${address}`);
    if (counter == 0) {
        formdata.append("idLabels", ["63c48b8a98a005037b05c9f5"])
        boardId = "63c48b8a98a005037b05c9f8";
        counter = 1;
    } else if (counter == 1) {
        formdata.append("idLabels", ["63c48b6bb88f130277f8e57b"])
        boardId = "63c48b6bb88f130277f8e57e";
        counter = 0;
    }
    fetch(`https://api.trello.com/1/cards?idList=${boardId}&key=6966bdeabfac507a5674d37a611710a2&token=ATTA692f55a135390459173fe088de3bb6fb4af7138698944e3a04d1c20be571224387104FDE`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formdata
    })
        .then(response => {
            console.log(
                `Response: ${response.status} ${response.statusText}`
            );
            return response.text();
        })
        .then(text => res.send(text))
        .catch(err => res.send(err));
})
app.listen(process.env.PORT || 3000)
