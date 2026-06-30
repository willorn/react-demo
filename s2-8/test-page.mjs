import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
const logs = [];
page.on('console', (msg) => logs.push(`${msg.type()}: ${msg.text()}`));
page.on('pageerror', (err) => logs.push(`PAGEERROR: ${err.message}`));

await page.goto('http://localhost:5176/', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(2000);

const text = await page.locator('main p').textContent();
const html = await page.locator('main').innerHTML();
console.log('P_TEXT:', JSON.stringify(text));
console.log('MAIN_HTML:', html);
console.log('LOGS:', logs.join('\n'));

await browser.close();
