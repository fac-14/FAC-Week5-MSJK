// GLOBAL VARIABLES

const submitButton = document.getElementById('submit');
const newsDiv1 = document.getElementById('news-1');
const newsDiv2 = document.getElementById('news-2');

// GENERIC XHR

function genericXHR(query, cb) {
  const url = `/results?q=${query}`;
  const xhr = new XMLHttpRequest(url, cb);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const parsedObj = JSON.parse(xhr.responseText);
      return cb(parsedObj);
    } if (xhr.readyState === 4 && xhr.status !== 200) {
    //   console.log('Sorry, XHR error');
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}
function deleteChildren() {
  while (newsDiv1.firstChild) {
    newsDiv1.removeChild(newsDiv1.firstChild);
  }
  while (newsDiv2.firstChild) {
    newsDiv2.removeChild(newsDiv2.firstChild);
  }
}

function appendTextElement(parent, elementType, elementTextContent) {
  const newElement = document.createElement(elementType);
  newElement.textContent = elementTextContent;
  parent.appendChild(newElement);
}

function appendImage(parent, src, alt) {
  const newElement = document.createElement('img');
  newElement.setAttribute('src', src);
  newElement.setAttribute('alt', alt);
  parent.appendChild(newElement);
}

function appendLink(parent, href, linkText) {
  const link = document.createElement('a');
  link.setAttribute('href', href);
  link.setAttribute('target', '_blank');
  link.textContent = linkText;
  parent.appendChild(link);
}

// RENDER CALLBACK FROM XHR

function renderXHRCallback(response) {
  response.Guardian.forEach((article) => {
    appendTextElement(newsDiv1, 'h2', article.heading);
    appendTextElement(newsDiv1, 'h3', article.author);
    appendTextElement(newsDiv1, 'h3', article.date);
    appendImage(newsDiv1, article.img_url, 'article image');
    appendLink(newsDiv1, article.link_url, 'See full article');
  });
  response.NYTimes.forEach((article) => {
    appendTextElement(newsDiv2, 'h2', article.heading);
    appendTextElement(newsDiv2, 'h3', article.author);
    appendTextElement(newsDiv2, 'h3', article.date);
    appendImage(newsDiv2, article.img_url, 'article image');
    appendLink(newsDiv2, article.link_url, 'See full article');
  });
}

// FUNCTION TO GRAB INPUT FROM SEARCH FIELD

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  deleteChildren();
  const searchTerm = document.getElementById('input').value;
  // console.log(searchTerm);
  // Makes XHR with query and invokes render as callback
  genericXHR(searchTerm, renderXHRCallback);
// renderXHRCallback(exampleResponse);
});

/* <h2 class="">A news article about something relevant</h2>
<h3>Author: Jimmy</h3>
<h3>Date: XXXXX</h3>
<img src="web-url" alt="News Image">
<a href="web-url" target="_blank">See full article</a> */
