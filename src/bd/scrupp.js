// https://www.extension.ninja/blog/post/solved-permission-is-unknown-or-url-pattern-is-malformed/

import cheerio from 'cheerio'
import axios from 'axios'

// const puppeteer = require("puppeteer")

// export async function oppenWebPage() {
//     const browser = await puppeteer.launch({
//         headless: 'new'
//         // ,slowMo: 200
//     })
//     const page = await browser.newPage()
    
//     await page.goto('https://example.com')
//     await browser.close()
// }

// export async function captureScreenShot() {
//     const browser = await puppeteer.launch({
//         headless: 'new'
//         // ,slowMo: 200
//     })
//     const page = await browser.newPage()
    
//     await page.goto('https://example.com')
//     await page.screenshot({path: 'example.png'})
//     await browser.close()
// }

export async function getDataFromWebPag(Url = 'https://jkanime.net/mairimashita-iruma-kun/') {
    console.log(Url)
    const response = await axios.get(Url).then(urlResult => {
        const $ = cheerio.load(urlResult.data)
        const dataExtrack = {
            favIconUrl: '',
            url: '',
            title: '',
            id: ''
        }
        dataExtrack['title'] = $('title').html();
        dataExtrack['url'] = Url;
        //  ?? "https://res.cloudinary.com/dhxefh3r2/image/upload/v1689703655/zo3smzqslh5bm3idmrml.ico";
        dataExtrack['favIconUrl'] = $('link[rel=icon]').attr('href');
        return dataExtrack
    }).catch((err) => console.log(err));
    return response
}