(() => {
  const COLD_BREW = 'coldBrew'
  const KOMBUCHA = 'kombucha'

  const selectors = {
    [COLD_BREW]: 'cold-brew',
    [KOMBUCHA]: 'kombucha',
  }

  const text = {
    [COLD_BREW]: {
      on: 'We have cold brew!',
      off: 'We are out of cold brew :(',
    },
    [KOMBUCHA]:{
      on: 'We have kombucha!',
      off: 'We are out of kombucha :('
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    fetch('http://whats-on-tap.nextwebtoday.com/api')
      .then(response => {
        const body = response.json()

        console.log(body)

        Object.keys(body).forEach(drink => {
          const status = body[drink]
          updateStatus(drink, status)
        })
      })
      .catch(err => {
        document.querySelectorAll('.status-icons .icon').forEach(el => {
          el.classList.remove('spinning')
        })
        document.querySelectorAll('.status-icons .status').forEach(el => {
          el.innerHTML = 'Sorry, something went wrong!'
        })
      })
  })

  function updateStatus (drink, status) {
    const selector = selectors[drink]

    const container = document.querySelector('.status-icons ' + selector)
    const icon = container.querySelector('.icon')
    const status_el = container.querySelector('.status')

    // stop spinning the icon
    icon.classList.remove('spinning')

    // update the text on screen
    const text_on_off = status ? 'on' : 'off'
    status_el.innerHTML = text[drink][text_on_off]
  }

})()
