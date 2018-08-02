// GLOBAL VARIABLES

const submitButton = document.getElementById('submit');
const newsDiv1 = document.getElementById('news-1');
const newsDiv2 = document.getElementById('news-2');
// FOR TESTING BEFORE APIS ARE READY
let exampleResponse = {
  Guardian: [{
    heading: 'A news article about something relevant',
    author: 'Jimmy J Jackson',
    date: 'XX-XX-XXXX',
    img_url: 'url...',
    link_url: 'url...',
  }, {
    heading: 'A second article about something mentioning the query',
    author: 'Kate Beard',
    date: 'XX-XX-XXXX',
    img_url: 'url...',
    link_url: 'url...',
  }],
  NYTimes: [{
    heading: 'A news article about something relevant',
    author: 'Jessie Beech',
    date: 'XX-XX-XXXX',
    img_url: 'url...',
    link_url: 'url...',
  }, {
    heading: 'A second article about something mentioning the query',
    author: 'Second Author',
    date: 'XX-XX-XXXX',
    img_url: 'url...',
    link_url: 'url...',
  }],
};

// FUNCTION TO GRAB INPUT FROM SEARCH FIELD

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    let searchTerm = document.getElementById('input').value;
    console.log(searchTerm);
    // Makes XHR with query and invokes render as callback
    // genericXHR(searchTerm,renderXHRCallback);
    // renderXHRCallback(exampleResponse);
});

// GENERIC XHR

function genericXHR(query, cb) {
  let url = '/results/' + query;
  let xhr = new XMLHttpRequest(url, cb);
  xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var parsedObj = JSON.parse(xhr.responseText);
            return cb(parsedObj);
        } if (xhr.readyState == 4 && xhr.status !== 200) {
            console.log("Sorry, XHR error");
        }
    };
  xhr.open('GET', url, true);
  xhr.send();
}

// RENDER CALLBACK FROM XHR

function renderXHRCallback(response) {
  for (let key in response) {
    if (key == 'Guardian') {
      // Heading, Author & Date
      response[key].forEach((article) => {
                appendTextElement(newsDiv1,'h2',article.heading)
                appendTextElement(newsDiv1,'h3',article.author)
                appendTextElement(newsDiv1,'h3',article.date)
                // Image 
                appendImage(newsDiv1,article.img_url,"article image")
                // Link 
                appendLink(newsDiv1,article.link_url,"See full article")
            });
    } else if (key == 'NYTimes') {
      // Heading, Author & Date
      response[key].forEach((article) => {
                appendTextElement(newsDiv2,'h2',article.heading)
                appendTextElement(newsDiv2,'h3',article.author)
                appendTextElement(newsDiv2,'h3',article.date)
                // Image 
                appendImage(newsDiv2,article.img_url,"article image")
                // Link 
                appendLink(newsDiv2,article.link_url,"See full article")
            });
    }
  }
}


function appendTextElement(parent, elementType, elementTextContent) {
  let newElement = document.createElement(elementType);
  newElement.textContent = elementTextContent;
  parent.appendChild(newElement);
}

function appendImage(parent, src, alt) {
  let newElement = document.createElement('img');
  newElement.setAttribute('src', src);
  newElement.setAttribute('alt', alt);
  parent.appendChild(newElement);
}

function appendLink(parent, href, linkText) {
  let link = document.createElement('a');
  link.setAttribute('href', href);
  link.setAttribute('target', '_blank');
  link.textContent = linkText;
  parent.appendChild(link);
}

/* <h2 class="">A news article about something relevant</h2>
<h3>Author: Jimmy</h3>
<h3>Date: XXXXX</h3>
<img src="web-url" alt="News Image">
<a href="web-url" target="_blank">See full article</a> */
