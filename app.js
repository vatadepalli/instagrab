const fs = require("fs");
const user = require("./user.js");
const puppeteer = require("puppeteer");

(async () => {
  try {
    // SETUP
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--window-size=1920x1080", "--window-position=0,0"]
    });

    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
    );

    // GOTO User Page
    await page.goto("https://www.instagram.com/abhi_416/");
    await page.waitForSelector(
      "#react-root > section > main > div > div._2z6nI > article > div > div > div:nth-child(2) > div:nth-child(3) > a > div > div._9AhH0"
    );

    page.on("response", async response => {
      const url = response.url();
      if (url.match(".*/graphql/.*")) {
        console.log(url);
        const body = await response.text();
        if (body) {
          try {
            const json = JSON.parse(body);
            console.log(JSON.stringify(json, null, 4));
          } catch (e) {}
        }
      }
    });
  } catch (e) {
    console.log("Puppet", e);
  }
})();
