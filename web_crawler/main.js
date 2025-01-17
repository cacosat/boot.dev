import readline from 'node:readline'
import { argv } from 'node:process'
import { crawlPage } from './crawl.js';

function main() {
    if (argv.length > 2 && argv.length < 4) {
        const args = argv.slice(2);
        const url = args[0]
        crawlPage(url)
    } else {
        console.log("Provide only 1 argument");
    }

}

main()