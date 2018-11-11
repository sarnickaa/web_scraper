const rp = require('request-promise')
const $ = require('cheerio')
// example url to hardcode const url = 'https://en.wikipedia.org/wiki/George_Washington'

const potusParse = (url) => {
// make the request:
return rp(url)
// returns html markup from webpage
    .then( html => {
        return {
            name: $('.firstHeading', html).text(),
            birthday: $('.bday', html).text()
        }
    })
    .catch( err => console.log(err))
}
    module.exports = potusParse