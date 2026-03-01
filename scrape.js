const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const seeds = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    
    await page.goto(url, { waitUntil: "networkidle" });

    // Wait for table to load (important because it's JS generated)
    await page.waitForSelector("table");

    const numbers = await page.$$eval("table td", cells =>
      cells
        .map(cell => parseFloat(cell.innerText.trim()))
        .filter(num => !isNaN(num))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    grandTotal += sum;

    console.log(`Seed ${seed} Sum: ${sum}`);
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
