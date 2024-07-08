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

}

export { normalizeURL, getUrlsFromHtml };