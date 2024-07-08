import { normalizeURL, getUrlsFromHtml } from "./crawl";
import { test, expect } from "@jest/globals"

/* EXAMPLE TEST
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
*/

test('normalizeURL test', () => {
  expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
  expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
  expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
  expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
})

test('get urls from html', () => { 
  const testHtml = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><main><a href="google.com">Test Button</a></main></body></html>'
  const bootUrl = 'https://blog.boot.dev'
  getUrlsFromHtml(testHtml, bootUrl)
  expect(getUrlsFromHtml(testHtml, bootUrl)).toBe('blog.boot.dev/path');
})