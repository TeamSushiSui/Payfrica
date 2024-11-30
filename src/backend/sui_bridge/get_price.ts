import puppeteer, { Browser } from 'puppeteer';

const url = 'https://monierate.com/converter/bybit?Amount=1&From=USD&To=NGN';

let browserInstance: Browser | null = null;

export async function usdToNgnRate(): Promise<number> {
    try {
        // Initialize a shared browser instance if not already open
        if (!browserInstance) {
            browserInstance = await puppeteer.launch({
                headless: true, // Run in headless mode for better performance
                args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for some server environments
            });
        }

        const page = await browserInstance.newPage();

        try {
            await page.goto(url, { waitUntil: 'domcontentloaded' });

            // Wait for the element containing the exchange rate
            const selector = '.block.font-bold.text-3xl.mb-2.dark\\:text-gray-200';
            await page.waitForSelector(selector, { timeout: 10000 });

            // Extract the USD to NGN exchange rate
            const exchangeRate = await page.$eval(
                selector,
                (el: Element) => {
                    const rawText = el.textContent?.trim() || ''; // e.g., "1,737 Nigerian Naira"
                    const numericMatch = rawText.replace(/,/g, '').match(/\d+/);
                    return numericMatch ? parseFloat(numericMatch[0]) : NaN; // Extracts 1737
                }
            );

            return exchangeRate;
        } finally {
            await page.close(); // Always close the page to prevent memory leaks
        }
    } catch (error) {
        console.error('Error scraping USD to NGN rate:', error);
        return NaN; // Return NaN if there's an error
    }
}

// Close the browser instance when the server shuts down
export async function closeBrowser(): Promise<void> {
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
    }
}

// Example usage (if running manually)
// (async () => {
//     const rate = await usdToNgnRate();
//     console.log('USD to NGN Exchange Rate:', rate);
//     await closeBrowser();
// })();
