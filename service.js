const puppeteer = require('puppeteer');
const config = require('./config');

module.exports = async () => {
    try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // open website
    await page.goto('https://docs.microsoft.com/en-us/rest/api/power-bi/reports/getreports');
    
    // click try it
    await page.waitForSelector('.action.action-interactive')
    await page.click('.action.action-interactive');

    // click sigin
    await page.waitForSelector('.button.is-primary.is-radiusless')
    await page.click('.button.is-primary.is-radiusless')
    

    // Enter email
    await page.waitForSelector('[type=email]')
    await page.type('[type=email]', config.email); // Email
    await page.keyboard.press(String.fromCharCode(13));

    // Enter password
    await page.waitForSelector('[type=password]')
    await page.type('[type=password]', config.password) //Password
    await page.waitFor(1000)
    await page.keyboard.press(String.fromCharCode(13));

    // Next
    await page.waitFor(1000)
    await page.keyboard.press(String.fromCharCode(13));

    // Get token
    await page.waitForSelector('[name=http-request]')
 
    const text = await page.evaluate(() => document.querySelector('[name=http-request]').textContent);
    const token = text.split(' ').slice(-1)[0]
    console.log(token)
    await browser.close();
    return Promise.resolve(token.toString().trim());
    } catch (err) {
        console.log(err)
        return Promise.reject(err.message);
    }
}