// Node.js version: 8.9.4
const puppeteer = require("puppeteer"); // version 1.0.0

(async () => {
  // Prevent Puppeteer from showing the "Chrome is being controlled by automated test
  // software" prompt, but otherwise use Puppeteer's default args.
  const args = await puppeteer
    .defaultArgs()
    .filter(flag => flag !== "--enable-automation");
  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: true,
    args
  });
  const page = await browser.newPage();
  page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
  );

  await page.goto("https://www.instagram.com/abhi_416/");
  await page.waitForSelector(
    "#react-root > section > main > div > div._2z6nI > article > div > div > div:nth-child(1) > div:nth-child(1) > a > div > div._9AhH0"
  );
  await page.click(
    "#react-root > section > main > div > div._2z6nI > article > div > div > div:nth-child(1) > div:nth-child(1) > a > div > div._9AhH0"
  );

  await page.on("request", request => {
    console.log(request);
  });
  const devtoolsProtocolClient = await page.target().createCDPSession();
  await devtoolsProtocolClient.send("Overlay.setShowFPSCounter", {
    show: true
  });
  await page.goto("https://developers.google.com/web/tools/chrome-devtools");
})();
