const fs = require("fs");
const user = require("./user.js");
const puppeteer = require("puppeteer");
const Response = require("./Response/Response");
const Download = require("./Download/Download");
const Login = require("./Login");

// Flags
var responses = 0;
// var imageCount = 0;
var numberOfPics = 0;

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

    // Login
    await Login(page, user.loginUser, user.password);

    // GOTO User Page
    await page.goto("https://www.instagram.com/" + user.userName + "/", {
      waitUntil: "networkidle2"
    });

    // Get Number of Images
    await page.waitForSelector(
      // "#react-root > section > main > div > header > section > ul > li:nth-child(1) > a > span" // - Not Logged In
      "#react-root > section > main > div > header > section > ul > li:nth-child(1) > span > span" // - Logged In
    );

    const element = await page.$(".-nal3");
    var text = await page.evaluate(element => element.textContent, element);
    console.log("_______________ DEBUG _____________________-");
    console.log("********************************************************");
    text = await parseInt(text, 10);
    console.log(typeof text);
    console.log(text);
    numberOfPics = text;

    // await console.log(typeof numberOfPics);
    // await console.log(numberOfPics);

    // Wait for 1st Photo
    await page.waitForSelector(
      "#react-root > section > main > div > div._2z6nI > article > div > div > div:nth-child(2) > div:nth-child(3) > a > div > div._9AhH0"
    );

    // Get Response
    await Response(page, responses, images);

    // Count the number of images on the page - Legacy
    // let texts = await page.evaluate(() => {
    //   let data = [];
    //   let elements = document.getElementsByClassName("v1Nh3");
    //   for (var element of elements) data.push(element.textContent);
    //   return data;
    // });

    // imageCount = texts.length;
    // console.log(imageCount);

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

    for (i = 0; i < numberOfPics - 2; i++) {
      // for (i = 0; i < numberOfPics - 2; i++) {
      // for (i = 0; i < text - 2; i++) {
      console.log(i + 1);
      await page.waitForSelector(
        "body > div._2dDPU.vCf6V > div.EfHg9 > div > div > a.HBoOv.coreSpriteRightPaginationArrow"
      );
      await page.click(
        "body > div._2dDPU.vCf6V > div.EfHg9 > div > div > a.HBoOv.coreSpriteRightPaginationArrow"
      );
    }

    console.log("Done");
  } catch (e) {
    console.log("Puppet", e);
  }
})();
