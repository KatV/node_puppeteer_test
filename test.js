const puppeteer = require('puppeteer');

const {TimeoutError} = require('puppeteer/Errors');
const width = 1920;
const height = 1080;
const timeout = 7000;


describe('Login page', () => {

    it('Login page should load without error', async () => {
        const browser = await puppeteer.launch({
           // headless: false,
            //slowMo: 150,
            // args: [`--window-size=${width},${height}`]
        });
        page = await browser.newPage();
        await page.goto('https://x.net');
        //await page.setViewport({width: 1000, height: 500});
        try {
            await page.waitForSelector('#login-form > div.credentials');
        } catch (e) {
            if (e instanceof TimeoutError) {
                return 'Can\'t wait for the page'
            }
        }
        await page.screenshot({path: 'login.png'});
        await page.close();
    }, timeout);
});
