# News Comparison Website

> A handy site that retrieves the top 3 news articles on your chosen topic from both the Guardian and the New York Times.

![](https://travis-ci.org/sbinlondon/FAC-Week5-MSJK.svg?branch=master)
[![codecov](https://codecov.io/gh/sbinlondon/FAC-Week5-MSJK/branch/master/graph/badge.svg)](https://codecov.io/gh/sbinlondon/FAC-Week5-MSJK)

![Jason Momoa is the universe's GIFt to humankind](https://media.giphy.com/media/3xz2BtsGiAovlaCsRG/giphy.gif)

### [Online site](https://tranquil-tor-14764.heroku.com/)

### Development Setup

To run our project locally, follow these steps:

In your terminal, write:
```
git clone https://github.com/sbinlondon/FAC-Week5-MSJK.git
```
```
npm install
```
You will need to setup a .env ('dotenv') file in the root directory and set the variables `GUARDIAN` and `NYTIMES` with valid API keys.

[Guardian API](https://open-platform.theguardian.com/)

[NYTimes Article Search API](https://developer.nytimes.com/article_search_v2.json)

To run on localhost from within the root of the directory:
```
node src/server.js
```
Go to http://localhost:3000 to see your locally hosted version.

#### To Run the test suite
```
npm test
```
Tests are run with the npm modules: tape, tap-spec, supertest and nyc.

## User stories

* I can enter a term to search
* This term will be sent to two news sites
* I will receive the top 3 articles from each site based on my search term
* I will be able to read the headline, date published, and see the hero image on the page
* I will be able to click a link to read the full article

## The brief

_Must-haves_

:white_check_mark: Use at least 1 API

:white_check_mark: Make your API calls from the back-end using the Request module (or one you build yourself)

:white_check_mark: Your server should contain a minimum of 2 routes

:white_check_mark: We expect back-end testing using Tape (test as many components as you can) and basic front-end testing.

:white_check_mark: Test your server by injecting fake HTTP requests using Supertest (consider testing for 404's and 500's).

:white_check_mark: Host your project on Heroku, see resources

:white_check_mark: Use module.exports and require to break a single large server file into smaller modules.

:white_check_mark: Consider a good server file structure based on what we have discussed over the week.

:white_check_mark: Employ continuous intergration on your project with Travis or a similar tool.

:white_check_mark: Use CodeCov or a similar tool for test coverage.

:white_check_mark: Include Error Handling.

:white_check_mark: Include a user input field on your web app 

:o: ...and include server-side validation to protect your server from potentially malicious user input.

_Stretch goals 😊:_

:o: Create a route and functionality for a POST request.

:white_check_mark: Display continuous intergration and code coverage badges on your project README.

## Stretch goals

* I can choose two news sites to compare from a list of top UK, US, and EU news sites
* If I search for 'Trump' or 'Brexit', the website turns bright red to discourage me

## How it all went down

### Day 1 

* Kate set up the repo with empty files, and Heroku
* Jessie set up ES Lint, and promptly turned it off
* Jessie and Kate set up npm
* Michael and Sangita set up Travis and CodeCov
* Everyone drew a very basic software architecture
* Michael and Sangita worked on building the server
* Michael and Sangita wrote lots of tests
* Michael got worried about 99% coverage, but it's actually BRILLIANT
* Jessie and Kate built the frontend skeleton (HTML and CSS)
* Jessie and Kate worked on inserting data into the DOM

### Day 2

* Kate and Michael work on /results route that triggers API calls to Guardian and NYC
* Kate and Michael create custom 404 page and redirect to it
* Jessie and Sangita work on parser for API JSON objects
* After lunch we pulled all changes and set about integrating the different modules
* After a few additional callbacks - EUREKA! 
* ... BUT we had hit our request limit for the NYTimes in the process 😑
* Jessie and Michael frantically tried to increase test coverage
* Kate and Sangita wrangled a beautiful layout

## Challenges

Testing.

But we did figure out how to test an asynchronous function in tape! :tada:

## Lessons

* Travis has a case-sensitive filesystem!
* Getting matching output from 2 different APIs doesn't always go smoothly! e.g. one source may always show an article's author, another may not. 
