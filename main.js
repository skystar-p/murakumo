const puppeteer = require('puppeteer');
const fs = require('fs');
let browser;
function log(message) {
    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    console.log(`LOG [${date}] ${message}`);
}

const { username, password } =
    JSON.parse(fs.readFileSync('./secret.json').toString('utf8'));

(async () => {
    opts = {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: false,
    };
    browser = await puppeteer.launch(opts);
})();

async function login(username, password) {
    const page = await browser.newPage();

    const URL = 'https://www.irccloud.com/';
    log('navigating to irccloud...');
    await page.goto(URL, { timeout: 0 });

    log('typing the credential...');
    await page.waitForSelector('p.form>input[name=email]');
    await page.waitForSelector('p.form>input[name=password]');
    await page.waitForSelector('p.form>button[type=submit]');

    await page.type('p.form>input[name=email]', username);
    await page.type('p.form>input[name=password]', password);

    await page.click('p.form>button[type=submit]');

    return page;
}
