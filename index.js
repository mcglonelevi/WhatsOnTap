const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let beverageState = {
    kombucha: 0,
    coldBrew: 0,
};

const levelString = {
    0: 'empty',
    1: 'almost gone',
    2: 'halfway full',
    3: 'plenty left',
    4: 'full'
};

app.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(beverageState);
});

app.post('/api', (req, res) => {
    res.set('Content-Type', 'application/json');
    beverageState = req.body;
    res.send(beverageState);
});

app.post('/api/slack', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send({
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `The kombucha is ${levelString[beverageState.kombucha]}!`,
                },
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `The Cold Brew is ${levelString[beverageState.coldBrew]}!`,
                }
            }
        ]
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));