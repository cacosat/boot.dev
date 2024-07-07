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

export { normalizeURL };