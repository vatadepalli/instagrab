module.exports = Login = async (page, userName, password) => {
  await page.goto("https://www.instagram.com/accounts/login/", {
    waitUntil: "networkidle2"
  });
  await page.waitForSelector(
    "#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(2) > div > label > input"
  );

  await page.focus(
    "#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(2) > div > label > input"
  );
  await page.keyboard.type(userName);

  await page.focus(
    "#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(3) > div > label > input"
  );
  await page.keyboard.type(password);

  await page.click(
    "#react-root > section > main > div > article > div > div:nth-child(1) > div > form > div:nth-child(4)"
  );

  await page.waitForSelector(
    "#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(1) > a > span"
  );
};
