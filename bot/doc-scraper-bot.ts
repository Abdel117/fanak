import { chromium } from "playwright";
import fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

async function GetURLS (until: number) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    let indexes: number[] = [];

    for(let i = 26; i <= until; i+=25 ){
        await page.goto(`https://www.gutenberg.org/ebooks/search/?query=l.es&start_index=${i}`);
        // const trs = await page.$$("tr");
        // const indexes = await Promise.all(trs.map(async el => {
        //     const text = await el.textContent();
        //     const match = text.match(/\d+/g);
        //     if (match) {
        //         const num = parseInt(match[0], 10);
        //         if(num != undefined) return num;
        //     }
        // }));

        const new_indexes = await page.$$eval(".link", els =>
            els.map(el => {
                let href = el.getAttribute("href");
                const match = href.match(/\d+/g);
                if(match && match != undefined) {
                    console.log(match);
                    return parseInt(match[0]);
                }
            })
        );

        indexes.push(...new_indexes);

        console.log(`Scrapeando elemento hasta el ${i}, encontrados ${new_indexes.length} docs\n`);
    }



    await browser.close();

    return indexes.map(i => `https://www.gutenberg.org/ebooks/${i}.epub`);
};

async function DownloadDocument(docURL: string) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const texto = await page.evaluate(() => document.body.innerText);

    console.log(texto);

    fs.writeFileSync(`./documentos/${Math.random()}.txt`, texto, "utf-8");

    await browser.close();
}


async function main() {
    const urls = await GetURLS(1000); // función que devuelve un array de URLs

    const downloadFolder = './descargas';
    if (!fs.existsSync(downloadFolder)) fs.mkdirSync(downloadFolder);

    await Promise.all(urls.map(async (url) => {
        const filename = path.basename(url);
        const filepath = path.join(downloadFolder, filename);

        const res = await fetch(url);
        if (!res.ok) {
            console.error(`Error al descargar ${url}: ${res.status} ${res.statusText}`);
            return;
        }

        const buffer = await res.arrayBuffer();
        fs.writeFileSync(filepath, Buffer.from(buffer));
        console.log(`Descargado: ${filename}`);
    }));
}

main();

