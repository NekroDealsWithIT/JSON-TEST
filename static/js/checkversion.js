var version='';

function getVersion(){
	if (version!=''&&fetchedVersion!=version){
		location.reload();	
	}else{
		version=fetchedVersion;
	}
}

function fetchVersion(){
	var url=window.location.href+"static/version";
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