const express = require('express')
const app = express()
app.post('/parse', (req, res) => {
    console.log("Just got a request!")
    console.log(req.body)
    res.send('Yo!')
})
app.listen(process.env.PORT || 3000)
