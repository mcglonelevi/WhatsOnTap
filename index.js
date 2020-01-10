const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let beverageState = {
    kombucha: false,
    coldBrew: false,
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
                    "text": beverageState.kombucha? `There is kombucha :beerparrot:` : 'The kombucha is out :areyoukiddingme:',
                },
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": beverageState.coldBrew? 'There is cold brew :celebrate:': 'The cold brew is out :sleepingparrot:',
                }
            }
        ]
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));