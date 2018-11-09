const rp = require('request-promise')
// makes http requests with promise support
// method can be defined in options.method
// if undefined - default = GET
const $ = require('cheerio')
// parses markup (uses JQuery like selectors)
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'

// make the request:
rp(url)
// returns html markup from webpage
    .then( html => {
        // on success:
        // console.log($('big > a', html))
        // cheerio object = JS object

    // iterate over object:
        const names = []
        for(const key in $('big > a', html)) {
            if($('big > a', html)[key].attribs) {
                // check to see if the element has the attribute in question because cheerio objects have a whole bunch of hidden weird attributes
                names.push($('big > a', html)[key].attribs.title)
            }
        }
        console.log(names)
        //returns array of names

    })
    .catch((err) => {
        //on error
        console.log(err)
    })