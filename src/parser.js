const parseGuardian = (response, responseNumber) => {
  const data = JSON.parse(response);
  // Create 'parent' obj property that will hold an array of articles
  const resultObj = { Guardian: [] };
  // loop through JSON assembling article and pushing to parent obj
  for (let i = 0; i < responseNumber; i += 1) {
    const article = {};
    article.heading = data.response.results[i].fields.headline;
    article.date = data.response.results[i].webPublicationDate;
    article.img_url = data.response.results[i].fields.thumbnail;
    article.link_url = data.response.results[i].fields.shortUrl;
    // push to parent
    resultObj.Guardian.push(article);
  }
  // console.log(resultObj);
  return resultObj;
};

const parseNYTimes = (response, responseNumber) => {
  const dataNY = JSON.parse(response);
  const resultObj = { NYTimes: [] };
  for (let i = 0; i < responseNumber; i += 1) {
    const article = {};
    article.heading = dataNY.response.docs[i].headline.main;
    article.date = dataNY.response.docs[i].pub_date;
    if (dataNY.response.docs[i].multimedia.length > 0) {
      let link = 'https://www.nytimes.com/';
      link += dataNY.response.docs[i].multimedia[0].url;
      article.img_url = link;
    } else {
      article.img_url = 'https://placeimg.com/640/480/arch';
    }
    article.link_url = dataNY.response.docs[i].web_url;
    resultObj.NYTimes.push(article);
  }
  // console.log(resultObj);
  return resultObj;
};

module.exports = { parseGuardian, parseNYTimes };
