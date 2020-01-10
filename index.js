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
                    "text": beverageState.kombucha? `There is kombucha :)` : 'The kombucha is out :(',
                },
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": beverageState.coldBrew? 'There is cold brew :)': 'The cold brew is out :(',
                }
            }
        ]
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));