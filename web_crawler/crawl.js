import { JSDOM } from 'jsdom';

function normalizeURL(url) {
    // return url normalized, ex.: blog.boot.dev/path
    // meaning: hostname/pathname
    try {
        const parsedUrl = new URL(url);
        const newUrl = `${parsedUrl.hostname}${parsedUrl.pathname}`
        if (newUrl[newUrl.length - 1] === '/') {
            return newUrl.slice(0, -1)
        } else {
            return newUrl
        }
    } catch (error) {
        console.log('error try catch')
    }
}

function getUrlsFromHtml(htmlBody, baseURL) {
    /*
    Takes a string of HTML as input and returns
    a list of all the link URLs (un-normalized) using JSDOM
    */
   const htmlDOM = new JSDOM(htmlBody);
   const document = htmlDOM.window.document;
   const anchorTags = document.querySelectorAll('a');
   let links = [];
   for (let anchor of anchorTags) {
    links.push(anchor.getAttribute('href'))
   }
   console.log(links)
}

export { normalizeURL, getUrlsFromHtml };

const testHtml = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><main><a href="google.com">Test Button</a></main></body></html>'
const bootUrl = 'https://blog.boot.dev'
getUrlsFromHtml(testHtml, bootUrl)