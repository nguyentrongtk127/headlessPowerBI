const express = require('express')
const service = require('./service')
const config = require('./config');
const app = express()
const port = config.port || 3000

app.get('/api/token', (req, res) => {
    service().then(token=> {
        res.json({token})
    }).catch(err => {
        res.status(500).json(err)
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))