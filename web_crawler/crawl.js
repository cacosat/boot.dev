import { JSDOM } from 'jsdom';

function normalizeURL(url) {
    // return url normalized, ex.: blog.boot.dev/path
    // meaning: hostname/pathname
    const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? `${url}` : `http://${url}`;
    try {
        const parsedUrl = new URL(formattedUrl);
        const newUrl = `http://${parsedUrl.hostname}${parsedUrl.pathname}`
        if (newUrl[newUrl.length - 1] === '/') {
            return newUrl.slice(0, -1)
        } else {
            return newUrl
        }
    } catch (error) {
        console.log(`error try catch normalizeURL. Initial url: ${url}`)
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
    if (anchor.href) {
        try {
            const url = new URL(anchor.href, baseURL);
            links.push(url.origin)
        } catch (err) {
            console.log({error: err, log: "error creating URL obj"})
        }
    } else {
        console.log('getUrlsFromHtml if condition of hasAttribute("href") failed')
    }
   }
   return links;
}

async function fetchAndParse(baseUrl) {
    const urlObj = new URL(baseUrl);
    const responseBase = await fetch(urlObj);
    const data = await responseBase.text();
    const contentTypeHeader = responseBase.headers.get('content-type');
    if (responseBase.status >= 400 || !contentTypeHeader.includes('text/html')) {
        console.log(`Error with request: ${responseBase.status} status code; content-type header: ${contentTypeHeader}`)
    } 
    return data
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    const normalizedBase = normalizeURL(baseURL);
    const normalizedCurrent  = normalizeURL(currentURL);

    console.log(`Crawling: ${normalizedCurrent}`);
    
    const urlObjBase = new URL(normalizedBase);
    const urlObjCurrent = new URL(normalizedCurrent);

    if (urlObjBase.hostname != urlObjCurrent.hostname) {
        console.log(`Skipping external URL: ${normalizedCurrent}`);
        return pages
    }
    if (normalizedCurrent in pages) {
        console.log(`Already crawled: ${normalizedCurrent}`);
        pages[normalizedCurrent]++;
        return pages
    }

    pages[normalizedCurrent] = 1;
    pages[normalizedCurrent] = 1;
    console.log(`Added to pages: ${normalizedCurrent}`);
    console.log('Current pages object:', pages);
    
    try {
        console.log(pages);
        const html = await fetchAndParse(normalizedCurrent);
        const links = getUrlsFromHtml(html, currentURL)
        const unrepeatedLinks = [...new Set(links)]
    
        console.log(`Found ${unrepeatedLinks} unique links on ${normalizedCurrent}`)
    
        for (let link of unrepeatedLinks) {
            console.log(`Recursively crawling: ${link}`);
            pages = await crawlPage(baseURL, link, pages);
        }        
    } catch (error) {
        console.error(`Error crawling ${normalizedCurrent}:`, error);
    }

    console.log(pages)
    return pages
}

export { normalizeURL, getUrlsFromHtml, fetchAndParse, crawlPage };