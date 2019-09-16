module.exports = Response = (page, responses, images) => {
  page.on("response", async response => {
    const url = response.url();
    if (url.match(".*/graphql/.*")) {
      // console.log(url);
      const body = await response.text();
      if (body) {
        try {
          // const json = JSON.parse(body);
          // console.log(JSON.stringify(json, null, 4));

          const json = JSON.parse(body);
          console.log(json.data.shortcode_media.display_resources[2].src);
          // console.log(
          //   JSON.stringify(
          //     json.data.shortcode_media.display_resources[2].src,
          //     null,
          //     4
          //   )
          // );
          responses++;

          await Download(
            json.data.shortcode_media.display_resources[2].src,
            `${responses}.png`,
            () => {
              console.log("done");
            }
          );
          images.push(json.data.shortcode_media.display_resources[2].src);

          console.log(images);
        } catch (e) {}
      }
    }
    console.log("Response Number: " + responses + " ends");
  });
};
