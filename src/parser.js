/* 
API REQUEST FORMATS

GUARDIAN

var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "c49aae7f6fec4b2996bd9cd4231ad8f2",
  'q': QUERYSTRING,
  'sort': "newest",
  'fl': "headline, web_url, pub_date, multimedia",
  'page': 0
});

NYT 

https://content.guardianapis.com/search?q=" + QUERYSTRING + "&format=json&from-date=2010-01-01&page-size=5&show-tags=contributor&show-fields=headline,thumbnail,short-url,byline&order-by=newest&order-date=published&api-key=dc8546af-0f12-4efe-9f34-eaba3153ae96

API RESPONSE FORMATS

GUARDIAN

Headline: response.results[i].fields.headline
Author: response.results[i].tags.webTitle
Date: response.results[i].webPublicationDate ("2018-08-01T08:00:08Z")
Image: response.results[i].fields.thumbnail
Link: response.results[i].fields.shortUrl

NYT

Headline: response.docs[i].headline.main
Author: response.docs[i].web_url.byline.original ("By FIRST LAST")
Date: response.docs[i].pub_date
Image: response.docs[i].multimedia[17].url
Link: response.docs[i].web_url

*/