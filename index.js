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
                    "text": "We have kombucha!"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "We have cold brew!"
                }
            }
        ]
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));