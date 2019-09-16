const fs = require("fs");
const user = require("./user.js");
const puppeteer = require("puppeteer");
const Response = require("./Response/Response");
const Download = require("./Download/Download");

// Flags
responses = 0;
imageCount = 0;

// Data
images = [];

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
    await page.goto("https://www.instagram.com/" + user.userName + "/", {
      waitUntil: "networkidle2"
    });
    await page.waitForSelector(
      "#react-root > section > main > div > div._2z6nI > article > div > div > div:nth-child(2) > div:nth-child(3) > a > div > div._9AhH0"
    );

    // Get Response
    await Response(page, responses, images);

    // Count the number of images on the page
    let texts = await page.evaluate(() => {
      let data = [];
      let elements = document.getElementsByClassName("v1Nh3");
      for (var element of elements) data.push(element.textContent);
      return data;
    });

    imageCount = texts.length;
    console.log(imageCount);

    // Click the first image
    await page.click(
      "#react-root > section > main > div > div._2z6nI > article > div > div > div:nth-child(1) > div:nth-child(1) > a > div > div._9AhH0"
    );
    await page.waitForSelector(
      "body > div._2dDPU.vCf6V > div.EfHg9 > div > div > a"
    );

    // 2nd Image
    await page.click("body > div._2dDPU.vCf6V > div.EfHg9 > div > div > a");

    // Loop Through All Images

    for (i = 0; i < imageCount - 2; i++) {
      console.log(i + 1);
      await page.waitForSelector(
        "body > div._2dDPU.vCf6V > div.EfHg9 > div > div > a.HBoOv.coreSpriteRightPaginationArrow"
      );
      await page.click(
        "body > div._2dDPU.vCf6V > div.EfHg9 > div > div > a.HBoOv.coreSpriteRightPaginationArrow"
      );
    }

    // Download
    // await images.forEach(image => {
    //   console.log("PANDI**********");
    // });

    // await Download(
    //   "https://www.google.com/images/srpr/logo3w.png",
    //   "google.png",
    //   () => {
    //     console.log("done");
    //   }
    // );

    console.log("Done");
  } catch (e) {
    console.log("Puppet", e);
  }
})();
