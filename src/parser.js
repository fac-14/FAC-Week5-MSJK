
const responseNumber = 3;

const parseGuardian = (response) => {
  const data = JSON.parse(response);
  const resultObj = { Guardian: [] };
  for (let i = 0; i < responseNumber; i += 1) {
    const article = {};
    article.heading = data.response.results[i].fields.headline;
    article.author = data.response.results[i].tags.webTitle;
    article.date = data.response.results[i].webPublicationDate; //("2018-08-01T08:00:08Z")
    article.img_url = data.response.results[i].fields.thumbnail;
    article.link_url = data.response.results[i].fields.shortUrl;
    resultObj.Guardian.push(article);
  }
  // console.log(resultObj);
  return resultObj;
}

const parseNYTimes = (response) => {
  const dataNY = JSON.parse(response);
  const resultObj = { NYTimes: [] };
  for (let i = 0; i < responseNumber; i += 1) {
    const article = {};
    article.heading = dataNY.response.docs[i].headline.main;
    article.author = dataNY.response.docs[i].byline.original;
    article.date = dataNY.response.docs[i].pub_date;
    if (dataNY.response.docs[i].multimedia.length > 0) {
      let link = "https://www.nytimes.com/";
      link += dataNY.response.docs[i].multimedia[0].url;
      article.img_url = link;
    } else {
      article.img_url = "https://placeimg.com/640/480/arch";
    }
    article.link_url = dataNY.response.docs[i].web_url;
    resultObj.NYTimes.push(article);
  }
  // console.log(resultObj);
  return resultObj;
};

module.exports = { parseGuardian, parseNYTimes };
