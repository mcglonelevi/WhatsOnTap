const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static('public'))

let beverageState = {
  kombucha: false,
  coldBrew: false,
}

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/api', cors(corsOptions), (req, res) => {
  res.set('Content-Type', 'application/json')
  res.send(beverageState)
})

app.post('/api', cors(corsOptions), (req, res) => {
  res.set('Content-Type', 'application/json')
  beverageState = req.body
  res.send(beverageState)
})

app.post('/api/slack', cors(corsOptions), (req, res) => {
  res.set('Content-Type', 'application/json')
  res.send({
    'blocks': [
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': beverageState.kombucha ? `There is kombucha :beerparrot:` : 'The kombucha is out :areyoukiddingme:',
        },
      },
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': beverageState.coldBrew ? 'There is cold brew :celebrate:' : 'The cold brew is out :sleepingparrot:',
        }
      },
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': "PS - Be a good Rootizen and flip the switch to off if you take the last of the keg!\n<http://whats-on-tap.nextwebtoday.com|More Info>"
        }
      }
    ]
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
