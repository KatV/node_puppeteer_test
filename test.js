const puppeteer = require('puppeteer');

const APP = "x";

const lead = {
    login: 'admin',
    password: 'x'
};

let page;
let browser;

const {TimeoutError} = require('puppeteer/Errors');
const width = 1920;
const height = 1080;
const timeout = 17000;

beforeAll(async () => {
    browser = await puppeteer.launch({
         headless: false,
         slowMo: 150,
         args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({width, height});
});

afterAll(() => {
    browser.close();
});


describe('Login page', () => {
    test('Login page should load without error', async () => {
        await page.goto(`${APP}`);
        await page.waitForSelector('#login-form > div.credentials');
        //await page.screenshot({path: 'login.png'});
    }, timeout);
    test('All objects on login form are correct', async () => {
        await page.waitForSelector('#login-form > div.rmc');
        const html = await page.$eval('form > h2', e => e.innerHTML);
        expect(html).toBe('Please provide your credentials to login.');
        await page.waitForSelector('div.fields > div:nth-child(1)');
        await page.waitForSelector('div.fields > div:nth-child(2)');
        await page.waitForSelector('#rememberme');
        const html1 = await page.$eval('div.remember-me > label', e => e.innerHTML);
        expect(html1).toBe('Remember Me');
        const html2 = await page.$eval('div.buttons > div > a', e => e.innerHTML);
        expect(html2).toBe('Forgot password?');
    }, timeout);
    test('Go to the rmc under admin', async () => {
        await page.click("input[id='username']");
        await page.type("input[id='username'", lead.login);
        await page.click("input[id='password']");
        await page.type("input[id='password'", lead.password);
        await page.screenshot({path: 'login.png'});
        await page.click(".btn-save");
        await page.waitForSelector('.header.wide');
    }, timeout);
});
