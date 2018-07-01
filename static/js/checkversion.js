var version='';
var fetchedVersion='';

function versionCheck(){
	//fetchVersion(window.location.href+"/../static/version");
	fetchVersion("http://nekro-warframe.netlify.com/static/version");
	if (version!=''&&fetchedVersion!=version){
		location.reload();	
	}else{
		version=fetchedVersion;
		if (version!=''){
			ultimaVersion.innerHTML="<h3>Ultima version: "+version+"</h3>";
		}
	}
}
function fetchVersion(url){
fetch(url)
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
	  console.log(doc);
	})
}