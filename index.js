const rp = require('request-promise')
// makes http requests with promise support
// method can be defined if undefined - default = GET
const $ = require('cheerio')
// parses markup (uses JQuery like selectors)
const potusParse = require('./potusParse')
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'

// make the request:
rp(url)
// returns html markup from webpage
    .then( html => {
        // on success iterate over cheerio object:
        const links = []
        for(const key in $('big > a', html)) {
            if($('big > a', html)[key].attribs) {
                // check to see if the element has the attribs property because cheerio objects have a whole bunch of hidden/weird attributes
                links.push($('big > a', html)[key].attribs.href)
            }
        }
        // console.log(links)
        //returns array of links for each president
        // https://www.youtube.com/watch?v=0jcEluMNy5A
        return Promise.all(links.map((url) => {
            return potusParse('https://en.wikipedia.org' + url)
            // will return an array of the results of each resolved promise  
            })
         )
     })
     .then((presidents) => console.log(presidents))
    .catch((err) => {
        //on error
        console.log(err)
    })

     