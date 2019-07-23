import Contra from 'contra'
import Chalk from 'chalk'

import ThunderJS from '../../module/thunderJS'

const delay = 2000
const thunderJS = ThunderJS({
  host: '192.168.15.22',
  debug: true,
})

const examples = [
  // promise based examples
  next => {
    log('Promised based examples')
    setTimeout(() => {
      next()
    }, delay)
  },
  next => {
    log('Getting system info')
    thunderJS.DeviceInfo.systeminfo()
      .then(result => {
        log('Success', result)
      })
      .catch(err => {
        log('Error', err.message)
      })
      .finally(setTimeout(next, delay))
  },
  next => {
    log('Getting free ram')
    thunderJS.DeviceInfo.freeRam()
      .then(result => {
        log('Success', result)
      })
      .catch(err => {
        log('Error', err.message)
      })
      .finally(setTimeout(next, delay))
  },
  next => {
    log('Getting version')
    thunderJS.DeviceInfo.version()
      .then(result => {
        log('Success', result)
      })
      .catch(err => {
        log('Error', err.message)
      })
      .finally(setTimeout(next, delay))
  },
  next => {
    log('Getting addresses')
    thunderJS.DeviceInfo.addresses()
      .then(result => {
        log('Success', result)
      })
      .catch(err => {
        log('Error', err.message)
      })
      .finally(setTimeout(next, delay))
  },

  next => {
    log('Setting webkit URL to metrological.com')
    thunderJS.WebKitBrowser.url('http://www.metrological.com')
      .then(result => {
        log('Success', result)
      })
      .catch(err => {
        log('Error', err.message)
      })
      .finally(setTimeout(next, delay))
  },

  // callback examples
  next => {
    log('Callback based examples')
    setTimeout(() => {
      next()
    }, delay)
  },

  next => {
    log('Getting socket info')
    thunderJS.DeviceInfo.socketinfo({}, (err, result) => {
      if (err) {
        log('Error', err)
      } else {
        log('Success', result)
      }
      setTimeout(next, delay)
    })
  },

  // invoke promise examples
  next => {
    log('Invoke style promise examples')
    setTimeout(() => {
      next()
    }, delay)
  },

  next => {
    log('Getting WebKitBrowser url')
    thunderJS
      .call('WebKitBrowser', 'url')
      .then(result => {
        log('Success', result)
      })
      .catch(err => {
        log('Error', err)
      })
      .finally(setTimeout(next, delay))
  },

  next => {
    log('Getting WebKitBrowser visibility')
    thunderJS
      .call('WebKitBrowser', 'visibility')
      .then(result => {
        log('Success', result)
      })
      .catch(err => {
        log('Error', err)
      })
      .finally(setTimeout(next, delay))
  },

  // invoke callback examples
  next => {
    log('Invoke style callback examples')
    setTimeout(() => {
      next()
    }, delay)
  },

  next => {
    log('Getting Version')
    thunderJS.call('DeviceInfo', 'version', (err, result) => {
      if (err) {
        log('Error', err)
      } else {
        log('Success', result)
      }
      setTimeout(next, delay)
    })
  },

  // custom plugin
  next => {
    log('Custom plugin examples')
    setTimeout(() => {
      next()
    }, delay)
  },

  next => {
    thunderJS.registerPlugin('custom', {
      hello() {
        return this.call('hello')
      },
    })

    thunderJS.custom
      .hello()
      .then(result => {
        log('Success', result)
      })
      .catch(err => {
        log('Error', err)
      })
      .finally(setTimeout(next, delay))
  },
]

Contra.series(examples, () => {
  log('All examples done')
})

const log = (...args) => {
  console.log(Chalk.cyan('--------------------------------------------------------------'))
  console.log.apply(this, args)
  console.log(Chalk.cyan('--------------------------------------------------------------'))
}