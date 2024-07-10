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
    if (anchor.hasAttribute('href')) {
        try {
            const url = new URL(anchor.getAttribute('href'));
            console.log(url)
            links.push(url.origin)
        } catch (err) {
            console.log({error: err, log: "error creating URL obj"})
        }
    }
   }
   return links;
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const formattedUrl = currentURL.startsWith('http://') || currentURL.startsWith('https://') ? currentURL : `http://${currentURL}`;
    const urlObj = new URL(formattedUrl);
    const response = await fetch(urlObj);
    // if (response.status >= 400 || response.headers)
    const data = await response.text();
    const contentTypeHeader = response.headers.get('content-type');
    if (response.status >= 400 || !contentTypeHeader.includes('text/html')) {
        console.log(`Error with request: ${response.status} status code; content-type header: ${contentTypeHeader}`)
    } else {
        console.log(data);
    }
}

export { normalizeURL, getUrlsFromHtml, crawlPage };