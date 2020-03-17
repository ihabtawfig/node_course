const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3f3e1b4678f35082fde518e8708b40c1/' + latitude + ',' + longitude+"?units=si"
    console.log(url)
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            
            callback('Unable to find location', undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is' +body.daily.data[0].temperatureHigh+ ' and low today is : ' +body.daily.data[0].temperatureLow + 'There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast