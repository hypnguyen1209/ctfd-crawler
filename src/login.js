const puppeteer = require('puppeteer')
const { username, password, url } = require('../config.json')
const { createFolder } = require('./utils')

const browser_options = {
    headless: true,
    args: [
        '--no-sandbox',
        '--disable-background-networking',
        '--disable-default-apps',
        '--disable-extensions',
        '--disable-gpu',
        '--disable-sync',
        '--disable-translate',
        '--hide-scrollbars',
        '--metrics-recording-only',
        '--mute-audio',
        '--no-first-run',
        '--safebrowsing-disable-auto-update'
    ]
}
const login = async _ => {
    try {
        const browser = await puppeteer.launch(browser_options)
        const page = await browser.newPage()
        await page.goto(`${url}/login`)
        await page.type('#name', username)
        await page.type('#password', password)
        await page.click('#_submit', { waitUntil: 'domcontentloaded' })
        await console.log('[+] Login done!')
        let cookies = await page.cookies()
        await browser.close()
        await createFolder(__dirname + '/..', (new URL(url)).hostname)
        return cookies
    } catch (e) {
        console.log(e)
        return false
    }
}

module.exports = login