const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let beverageState = {
    kombucha: true,
    coldBrew: true,
};

app.get('/api', (req, res) => {
    res.send(beverageState)
});

app.post('/api', (req, res) => {
    beverageState = req.body;
    res.send(beverageState)
});

app.get('/api/slack', (req, res) => {
    res.send(beverageState)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));