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

function appendArticleWrapperElement(parent, elementType, id) {
  const newElement = document.createElement(elementType);
  newElement.setAttribute('id', id)
  parent.appendChild(newElement);
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

function appendPagination() {
  const pageTwo = document.createElement('button');
  pageTwo.setAttribute('id', 'pageTwo');
  pageTwo.textContent = '2';
  newsDiv1.appendChild(pageTwo);
}

//RENDER CALLBACK FROM XHR

function renderXHRCallback(response) {
  for (i = 1; i < 4; i++) {
    appendArticleWrapperElement(newsDiv1, 'div', ('child-' + i));
    appendTextElement(document.getElementById(('child-' + i)), 'h2', response.Guardian[i-1].heading);
    appendTextElement(document.getElementById(('child-' + i)), 'h3', response.Guardian[i-1].author);
    appendTextElement(document.getElementById(('child-' + i)), 'h3', response.Guardian[i-1].date);
    appendImage(document.getElementById(('child-' + i)), response.Guardian[i-1].img_url, 'article image');
    appendLink(document.getElementById(('child-' + i)), response.Guardian[i-1].link_url, 'See full article');
  };
  for (i = 4; i < 7; i++) {
    appendArticleWrapperElement(newsDiv2, 'div', ('child-' + i));
    appendTextElement(document.getElementById(('child-' + i)), 'h2', response.NYTimes[i-4].heading);
    appendTextElement(document.getElementById(('child-' + i)), 'h3', response.NYTimes[i-4].author);
    appendTextElement(document.getElementById(('child-' + i)), 'h3', response.NYTimes[i-4].date);
    appendImage(document.getElementById(('child-' + i)), response.NYTimes[i-4].img_url, 'article image');
    appendLink(document.getElementById(('child-' + i)), response.NYTimes[i-4].link_url, 'See full article');
  };
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