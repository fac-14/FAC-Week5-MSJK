// GLOBAL VARIABLES

let submitButton = document.getElementById('submit');
let newsDiv1 = document.getElementById('news-1');
let newsDiv2 = document.getElementById('news-2');
// FOR TESTING BEFORE APIS ARE READY
var exampleParsedObj = {
    Guardian: {
        heading: "A news article about something relevant",
        author: "Jimmy J Jackson",
        date: "XX-XX-XXXX",
        img_url: "url...",
        link_url: "url..."
    },
    NYTimes: {
        heading: "A news article about something relevant",
        author: "Jimmy J Jackson",
        date: "XX-XX-XXXX",
        img_url: "url...",
        link_url: "url..."  
    }
}

// FUNCTION TO GRAB INPUT FROM SEARCH FIELD

submitButton.addEventListener('click', function(event){
    event.preventDefault();
    let searchTerm = document.getElementById('input').value;
    console.log(searchTerm);
    // Makes XHR with query and invokes render as callback
    // guardian XHR
    //genericXHR(searchTerm,renderXHRCallback);
    renderXHRCallback(exampleParsedObj);
});

// GENERIC XHR

function genericXHR(query, cb) {
    var url =  "/results/" + query
    var xhr = new XMLHttpRequest(url, cb);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var parsedObj = JSON.parse(xhr.responseText);
            return cb(parsedObj,dest);
        } else if (xhr.readyState == 4 && xhr.status !== 200) {
            console.log("Sorry, XHR error");
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}

// RENDER CALLBACK FROM XHR

function renderXHRCallback(response) {
    for (var key in exampleParsedObj) {
        if (key == "Guardian") {
            // Heading
            var heading = document.createElement('h2')
            newsDiv1.appendChild(heading)
            var headingContent = document.createTextNode(exampleParsedObj[key].heading)
            heading.appendChild(headingContent);
            // Author
            var author = document.createElement('h3')
            newsDiv1.appendChild(author)
            var authorContent = document.createTextNode(exampleParsedObj[key].author)
            author.appendChild(authorContent);
            // Date
            var date = document.createElement('h3')
            newsDiv1.appendChild(date)
            var dateContent = document.createTextNode(exampleParsedObj[key].date)
            date.appendChild(dateContent);
            // Image 
            var img = document.createElement('img');
            img.setAttribute('src', exampleParsedObj[key].img_url);
            newsDiv1.appendChild(img)
            // Link to webpage
            var link = document.createElement('a');
            link.setAttribute('href', exampleParsedObj[key].link_url);
            link.setAttribute('target', "_blank");
            link.textContent = "See full UK article";
            newsDiv1.appendChild(link);
        } else if (key == "NYTimes") {
            // Heading
            var heading = document.createElement('h2')
            newsDiv2.appendChild(heading)
            var headingContent = document.createTextNode(exampleParsedObj[key].heading)
            heading.appendChild(headingContent);
            // Author
            var author = document.createElement('h3')
            newsDiv2.appendChild(author)
            var authorContent = document.createTextNode(exampleParsedObj[key].author)
            author.appendChild(authorContent);
            // Date
            var date = document.createElement('h3')
            newsDiv2.appendChild(date)
            var dateContent = document.createTextNode(exampleParsedObj[key].date)
            date.appendChild(dateContent);
            // Image 
            var img = document.createElement('img');
            img.setAttribute('src', exampleParsedObj[key].img_url);
            newsDiv2.appendChild(img)
            // Link to webpage
            var link = document.createElement('a');
            link.setAttribute('href', exampleParsedObj[key].link_url);
            link.setAttribute('target', "_blank");
            link.textContent = "See full US article";
            newsDiv2.appendChild(link);
        }
    }
};



/* <h2 class="">A news article about something relevant</h2>
<h3>Author: Jimmy</h3>
<h3>Date: XXXXX</h3>
<img src="web-url" alt="News Image">
<a href="web-url" target="_blank">See full article</a> */