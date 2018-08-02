// GLOBAL VARIABLES

const submitButton = document.getElementById('submit');
const newsDiv1 = document.getElementById('news-1');
const newsDiv2 = document.getElementById('news-2');

//const pageThreeButton = document.getElementById('pageThree');

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

function showPageOneDivOne() {
  const articleOne = document.getElementById('child-1');
  const articleTwo = document.getElementById('child-2');
  const articleThree = document.getElementById('child-3');
  articleOne.style.display = "flex";
  articleTwo.style.display = "none";
  articleThree.style.display = "none";
}

function showPageTwoDivOne() {
  const articleOne = document.getElementById('child-1');
  const articleTwo = document.getElementById('child-2');
  const articleThree = document.getElementById('child-3');
  articleOne.style.display = "none";
  articleTwo.style.display = "flex";
  articleThree.style.display = "none";
}

function showPageThreeDivOne() {
  const articleOne = document.getElementById('child-1');
  const articleTwo = document.getElementById('child-2');
  const articleThree = document.getElementById('child-3');
  articleOne.style.display = "none";
  articleTwo.style.display = "none";
  articleThree.style.display = "flex";
}

function showPageOneDivTwo() {
  const articleOne = document.getElementById('child-4');
  const articleTwo = document.getElementById('child-5');
  const articleThree = document.getElementById('child-6');
  articleOne.style.display = "flex";
  articleTwo.style.display = "none";
  articleThree.style.display = "none";
}

function showPageTwoDivTwo() {
  const articleOne = document.getElementById('child-4');
  const articleTwo = document.getElementById('child-5');
  const articleThree = document.getElementById('child-6');
  articleOne.style.display = "none";
  articleTwo.style.display = "flex";
  articleThree.style.display = "none";
}

function showPageThreeDivTwo() {
  const articleOne = document.getElementById('child-4');
  const articleTwo = document.getElementById('child-5');
  const articleThree = document.getElementById('child-6');
  articleOne.style.display = "none";
  articleTwo.style.display = "none";
  articleThree.style.display = "flex";
}

function appendPagination() {
  // div 1 guardian
  const pageOneDiv1 = document.createElement('button');
  pageOneDiv1.setAttribute('id', 'pageOneDiv1');
  pageOneDiv1.setAttribute('onclick', 'showPageOneDivOne()');
  pageOneDiv1.textContent = '1';
  newsDiv1.appendChild(pageOneDiv1);
  const pageTwoDiv1 = document.createElement('button');
  pageTwoDiv1.setAttribute('id', 'pageTwoDiv1');
  pageTwoDiv1.setAttribute('onclick', 'showPageTwoDivOne()');
  pageTwoDiv1.textContent = '2';
  newsDiv1.appendChild(pageTwoDiv1);
  const pageThreeDiv1 = document.createElement('button');
  pageThreeDiv1.setAttribute('id', 'pageThreeDiv1');
  pageThreeDiv1.setAttribute('onclick', 'showPageThreeDivOne()');
  pageThreeDiv1.textContent = '3';
  newsDiv1.appendChild(pageThreeDiv1);
  // div 2 nytimes
  const pageOneDiv2 = document.createElement('button');
  pageOneDiv2.setAttribute('id', 'pageOneDiv2');
  pageOneDiv2.setAttribute('onclick', 'showPageOneDivTwo()');
  pageOneDiv2.textContent = '1';
  newsDiv2.appendChild(pageOneDiv2);
  const pageTwoDiv2 = document.createElement('button');
  pageTwoDiv2.setAttribute('id', 'pageTwoDiv2');
  pageTwoDiv2.setAttribute('onclick', 'showPageTwoDivTwo()');
  pageTwoDiv2.textContent = '2';
  newsDiv2.appendChild(pageTwoDiv2);
  const pageThreeDiv2 = document.createElement('button');
  pageThreeDiv2.setAttribute('id', 'pageThreeDiv2');
  pageThreeDiv2.setAttribute('onclick', 'showPageThreeDivTwo()');
  pageThreeDiv2.textContent = '3';
  newsDiv2.appendChild(pageThreeDiv2);
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
  appendPagination();
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