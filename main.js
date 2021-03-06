const puppeteer = require('puppeteer')
const fs = require('fs')
let browser

const INITIAL_CHANNEL_NAME = 'uriirc'

function log(message) {
    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    console.log(`LOG [${date}] ${message}`)
}

const { username, password } =
    JSON.parse(fs.readFileSync('./secret.json').toString('utf8'))

process.on('SIGINT', async () => {
    log('Received SIGINT. Good bye!')
    await browser.close()
    process.exit(0)
})

// function for login to irccloud.com
async function login(username, password) {
    const page = await browser.newPage()

    const URL = 'https://www.irccloud.com/'
    log('Navigating to irccloud...')
    await page.goto(URL, { timeout: 0 })

    log('Trying to login...')
    await page.waitForSelector('p.form>input[name=email]')
    await page.waitForSelector('p.form>input[name=password]')
    await page.waitForSelector('p.form>button[type=submit]')

    await page.type('p.form>input[name=email]', username)
    await page.type('p.form>input[name=password]', password)

    await page.click('p.form>button[type=submit]')

    await page.waitForNavigation()
    log('Login done!')

    const CHANNEL_URL = `https://www.irccloud.com/irc/${INITIAL_CHANNEL_NAME}`
    await page.goto(CHANNEL_URL, { timeout: 0 })

    return page
}

// main
(async () => {
    opts = {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
    }
    browser = await puppeteer.launch(opts)
    await login(username, password)
})()
