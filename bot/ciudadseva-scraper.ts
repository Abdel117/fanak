import { chromium, Browser } from "playwright";
import * as fs from 'fs/promises';
import * as path from 'path';

const MAX_CONCURRENCY = 10; // número de páginas concurrentes

async function getAuthorLinks(browser: Browser) {
    const page = await browser.newPage();
    console.log("Abriendo página de índice de autores...");
    await page.goto(`https://ciudadseva.com/biblioteca/indice-autor-cuentos/`);

    // @ts-ignore
    const links = await page.$$eval('div.row.xs-center a', els => els.map(el => el.href));
    console.log(`Encontrados ${links.length} autores.`);
    await page.close();
    return links;
}

async function saveTextAsPDF(browser: Browser, authorPath: string, title: string, htmlContent: string) {
    const pdfPage = await browser.newPage();
    await pdfPage.setContent(`
        <html>
        <head>
            <style>
                body { font-family: Georgia, serif; line-height: 1.6; margin: 40px; }
                p { margin-bottom: 1em; text-align: justify; }
            </style>
        </head>
        <body>
            ${htmlContent}
        </body>
        </html>
    `);

    const safeTitle = title.replace(/[\/\\?%*:|"<>]/g, '_');
    const pdfPath = path.join(authorPath, `${safeTitle}.pdf`);

    await pdfPage.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' }
    });

    await pdfPage.close();
    console.log(`    PDF guardado: ${safeTitle}`);
}

async function dwTextsFromAuthor(browser: Browser, authorLink: string, limit: number) {
    const page = await browser.newPage();
    await page.goto(authorLink);

    const authorName = await page.$eval('h1', el => el.textContent?.trim() || 'Unknown');
    const authorPath = path.join('./docs', authorName);
    await fs.mkdir(authorPath, { recursive: true });

    const meta = await fs.open(path.join(authorPath, `0.txt`), 'a+');

    console.log(`Procesando autor: ${authorName}`);

    await meta.appendFile(authorName + '\n');

    // @ts-ignore
    let textLinks = await page.$$eval('div.text-center li a', els => els.map(el => el.href));
    textLinks = textLinks.slice(0,limit);

    console.log(`  ${textLinks.length} textos encontrados para ${authorName}`);

    const chunks = [];
    for (let i = 0; i < textLinks.length; i += MAX_CONCURRENCY) {
        chunks.push(textLinks.slice(i, i + MAX_CONCURRENCY));
    }

    for (const chunk of chunks) {
        await Promise.all(chunk.map(async (textLink) => {
            try {
                const textPage = await browser.newPage();
                await textPage.goto(textLink);

                const textTitle = await textPage.$eval('h1', el => el.textContent?.trim() || 'Untitled');
                const textContent = await textPage.$eval('div.text-justify', el => el.innerHTML?.trim() || '');

                // Guardar como PDF
                await saveTextAsPDF(browser, authorPath, textTitle, textContent);

                // Modificar archivo meta
                const len = textContent.replace(/\s+/g, '').length;
                await meta.appendFile(`${textTitle};${len}\n`);
                const safeTitle = textTitle.replace(/[\/\\?%*:|"<>]/g, '_');
                await fs.writeFile(path.join(authorPath, `${safeTitle}.txt`), textContent);

                await textPage.close();
            } catch (err) {
                console.error(`    Error procesando ${textLink}:`, err);
            }
        }));
    }

    await meta.close();
    await page.close();
}

async function main() {
    const browser = await chromium.launch({ headless: true });
    const authorLinks = await getAuthorLinks(browser);

    for (const link of authorLinks) {
        await dwTextsFromAuthor(browser, link, 10);
    }

    await browser.close();
    console.log("Todos los autores procesados.");
}

main();
