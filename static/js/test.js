var dropsFlag=false;
var worldStateFlag=false;

function buscarDrops(url=atob("aHR0cHM6Ly9kcm9wcy53YXJmcmFtZXN0YXQudXMvZGF0YS9hbGwuanNvbg==")){
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		dropsFlag=true;
		resultJsonDrops = request.response;
		console.info(resultJsonDrops)
		return request.response;
	}
}

function buscarWFWorldstate(url=atob("aHR0cHM6Ly93cy53YXJmcmFtZXN0YXQudXMv")+'pc'){
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		worldStateFlag=true;
		resultJson = request.response;
		console.info(resultJson);
		if(firstTime==true){firstTime=false;comenzarTesting();}
		
		return request.response;
	}
	request.onerror=e=>{
		let data={};
		data.title='Error al actualizar datos';
		data.url=url;
		data.body='Revisar configuraciones proxy';
		data.type='error';
		informarStatusFetch(data);
		counter1=counter1Max-5;
		fetching=false;
	}
}
