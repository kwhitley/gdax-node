const request = require('request')

function determineProductIDs(productIDs) {
  if (!productIDs || !productIDs.length) {
    return ['BTC-USD'];
  }

  if (Array.isArray(productIDs)) {
    return productIDs;
  }

  // If we got this far, it means it's a string.
  // Return an array for backwards compatibility.
  return [productIDs];
}

let clock = (() => {
  let syncedTime = new Date()
  let lastSync = new Date()

  const updateTime = () => {
    request({
      url: 'https://api.gdax.com/time',
      json: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    }, (err, response, body) => {
      if (!err && body) {
        let time = new Date(body.iso)
        console.log('resyncing internal gdax timestamp to', new Date(body.iso))
        syncedTime = new Date(body.iso)
        lastSync = new Date
      } else {
        console.log('unable to resync gdax timestamp...')
      }
    })
  }

  const getTime = () => {
    let s = new Date(syncedTime)
    let offset = new Date - lastSync

    if (offset > 30000) {
      updateTime()
    }

    s.setTime(s.getTime() + offset)
    // console.log('getTime = ', s)

    return s
  }

  updateTime()

  return {
    getTime
  }
})()

module.exports = {
  determineProductIDs,
  clock
};
