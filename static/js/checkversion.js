/*https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch*/

var version='';
var fetchedVersion='';

function versionCheck(){
	//fetchVersion(window.location.href+"/../static/version");
	fetchVersion("static/version");
	if (version!=''&&fetchedVersion!=version){
		location.reload();	
	}else{
		version=fetchedVersion;
		if (version!=''){
			ultimaVersion.innerHTML="<h3>Ultima version: "+version+" ultimo chequeo: "+tiempoStr()+"</h3>";
		}
	}
}
function fetchVersion(url){
fetch(url,
		{
		mode: "no-cors"
		}
	)
	.then(function(response) {
	  // When the page is loaded convert it to text
	  return response.text();
	})
	.then(function(html) {
	  // Initialize the DOM parser
	  var parser = new DOMParser();
	  // Parse the text
	  var doc = parser.parseFromString(html, "text/html");
	  
	  // You can now even select part of that html as you would in the regular DOM 
	  // Example:
	  // var docArticle = doc.querySelector('article').innerHTML;
	  fetchedVersion=html;
	  //console.log(doc);
	})
}

function fetchVersion3(url){
	postData(url, {answer: 42})
	  .then(data => fetchedVersion=data) // JSON from `response.json()` call
	  .catch(error => console.error(error));
}

const postData = (url = ``, data = {}) => {
  // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, cors, *same-origin
        cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "omit", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()) // parses response to JSON
    .catch(error => console.error(`Fetch Error =\n`, error));
};