var version='';

function checkVersion(){
	if (version!=''&&fetchedVersion!=version){
		location.reload();	
	}else{
		version=fetchedVersion;
	}
}

function versionCheck(){
	fetchVersion("../static/version");
}
function fetchVersion(url){
fetch(url)
.then(function(response) {
  // When the page is loaded convert it to text
  version = response.text();
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

  console.log(doc);
})
}

function fetchVersion1(){
	var url=window.location.href+"../static/version";
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
	  version = request.response;
	  console.log(version);
	  //getVersion();
	}
}

function fetchVersion2(){
	var url="http://nekro-warframe.netlify.com/static/version";
	console.log(url);
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
	  version = request.response;
	  console.log(version);
	  //getVersion();
	}
}

function getFileFromServer(url, doneCallback) {
    var xhr;

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange;
    xhr.open("GET", url, true);
    xhr.send();

    function handleStateChange() {
        if (xhr.readyState === 4) {
            doneCallback(xhr.status == 200 ? xhr.responseText : null);
        }
    }
}