const puppeteer = require('puppeteer')
// https://developers.google.com/web/tools/puppeteer/get-started
// allows you to control a headless browser i.e. a browser that doesnt have a GUI = a browser that can access webpages programatically (i.e through CLI) but that doesn't show them to a viewer. Usually used to provide the content of webpages to other programs.
const $ = require('cheerio')
const url = 'https://www.reddit.com'

puppeteer.launch()
// launch headless browser
.then((browser) => {
    return browser.newPage()
    //promise that resolves to a new Page object
    //Page object has methods that allow interaction with a url i.e. the Page object can be navigated to a url with goto() then can get full html contents of the page with .content()
})
.then((pageObject) => {
    return pageObject.goto(url).then(() => {
        return pageObject.content()
    })
})
.then((html) => {
    // console.log(html)
    const headlines = []
    $('h2', html).each((i, e) => {
        headlines[i] = $(e).text()
})
    console.log(headlines.join('\r\n'))
})
.catch((err) => console.log(err))

