// fetchingSandbox.js
/*
[{
	method: "POST", // *GET, POST, PUT, DELETE, etc.
	mode: "cors", // no-cors, cors, *same-origin
	cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	credentials: "same-origin", // include, same-origin, *omit
	headers: {
			"Content-Type": "application/json; charset=utf-8",
			// "Content-Type": "application/x-www-form-urlencoded",
		},
	redirect: "follow", // manual, *follow, error
	referrer: "no-referrer", // no-referrer, *client
}]
*/
/*
https://ws.warframestat.us/weapons
https://ws.warframestat.us/warframes
https://nexus-stats.com/api
https://ws.warframestat.us/pc
https://warframechart.ct8.pl/resources/json/market/sell/current.json
*/
let inicio='';
let fin='';

const defaultOptions=[{
	method: "GET", // *GET, POST, PUT, DELETE, etc.
	mode: "same-origin", // no-cors, cors, *same-origin
	cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
	credentials: "omit", // include, same-origin, *omit
	headers: {
			"Content-Type": "application/json; charset=utf-8",
			// "Content-Type": "application/x-www-form-urlencoded",
		},
	redirect: "follow", // manual, *follow, error
	referrer: "client", // no-referrer, *client
}];



const uris=[
	{d:'worldStatus',b:'aHR0cHM6Ly93cy53YXJmcmFtZXN0YXQudXMvcGM='},
	{d:'weapons',b:'aHR0cHM6Ly93cy53YXJmcmFtZXN0YXQudXMvd2VhcG9ucw=='},
	{d:'warframes',b:'aHR0cHM6Ly93cy53YXJmcmFtZXN0YXQudXMvd2FyZnJhbWVz'},
	{d:'nexus',b:'aHR0cHM6Ly9uZXh1cy1zdGF0cy5jb20vYXBp'},
	{d:'wfm pricecheck',b:'aHR0cHM6Ly93YXJmcmFtZWNoYXJ0LmN0OC5wbC9yZXNvdXJjZXMvanNvbi9tYXJrZXQvc2VsbC9jdXJyZW50Lmpzb24='},
	{d:'check ip',b:'aHR0cHM6Ly9nZW8ucXVhbGFyb28uY29tL2pzb24v'}
];

const options=[
	{headers:[{"Content-Type": "application/json; charset=utf-8"},{"Content-Type": "application/x-www-form-urlencoded"}]},
	{method:['GET', 'POST', 'PUT', 'DELETE']},
	{mode:['no-cors', 'cors', 'same-origin']},
	{cache:['default', 'no-cache', 'reload', 'force-cache', 'only-if-cached']},
	{credentials:['include', 'same-origin', 'omit']},
	{redirect:[ 'manual', 'follow', 'error']},
	{referrer:[ 'no-referrer', 'client']}
]

function loadFetchData(){
	let parseado='';
	uris.forEach(u=>{
		parseado+='<p><label><input class="URLS" type="radio" name="url" value="'+u.b+'">'+u.d.toUpperCase()+'</label></p>';
	});
	urls.innerHTML=parseado;
	document.querySelectorAll('.URLS').forEach(u=>{
		u.addEventListener('click',e=>{
			txtUrl.value=atob(u.value);
		});
	});

	parseado='';
	Object.keys(options).forEach(function(k){
		Object.keys(options[k]).forEach(function(k2){
			//console.log(options[k][k2]);
			parseado+='<h4>'+k2.toUpperCase()+'</h4>';
			if(k2!='headers'){
				parseado+='<label><input id="'+k2+'_none" type="radio" value="none" name="'+k2+'" checked>NINGUNA</label>';	
			}else{
				parseado+='<label><input id="'+k2+'_none" type="radio" value="none" name="Content-Type" checked>NINGUNA</label>';	
			}
			options[k][k2].forEach(o=>{
				if(k2!='headers'){
					parseado+='<label><input id="'+k2+'_'+o+'" type="radio" value="'+o+'" name="'+k2+'">'+o+'</label>';	
				}else{
					//console.log(options[k][k2],o);
					console.log(o['Content-Type']);
					parseado+='<label><input id="'+k2+'_'+o+'" type="radio" value="'+o['Content-Type']+'" name="Content-Type">'+o['Content-Type']+'</label>';		
				}
			});
			parseado+='<label><input id="'+k2+'_custom" type="radio" value="" name="'+k2+'">CUSTOM</label><input type="text" onkeyup="'+k2+'_custom.value=this.value">';	
		});		
	});
	comboOptions.innerHTML=parseado;
};

function generateOptions(){
	let newOptions={};
	if(!generateFetchOptions.checked){return newOptions;}
	Object.keys(defaultOptions).forEach(function(k){
		Object.keys(defaultOptions[k]).forEach(function(k2){
			let selected='';
			if(k2!='headers'){
				selected=document.querySelector('input[name="'+k2+'"]:checked').value;
				if(selected!='none'){
					newOptions[k2]=selected;
				}
			}else{
				selected=document.querySelector('input[name="Content-Type"]:checked').value;
				if(selected!='none'){
					let content={'Content-Type':selected};
					//newOptions['headers']['Content-Type']=selected;
					newOptions['headers']=content;
				}
			}
			/*
			newOptions[k][k2].forEach(o=>{
				
				if(k2!='headers'){		
					//parseado+='<label><input id="'+k2+'_'+o+'" type="radio" value="'+o+'" name="'+k2+'">'+o+'</label>';	
				}else{
					//console.log(newOptions[k][k2],o);
					console.log(o['Content-Type']);
					//parseado+='<label><input id="'+k2+'_'+o+'" type="radio" value="'+o['Content-Type']+'" name="Content-Type">'+o['Content-Type']+'</label>';		
				}
			});
			*/
		});		
	});

	return newOptions;

}
function doFetch(callback=false){
	if(!callback){
		inicio=new Date();
		fetchJSONCallback(txtUrl.value,generateOptions(),doFetch,doFetch);
	}else{
		fin=new Date();
		txtRespuesta.innerText=JSON.stringify(callback)
		txtError.innerText=callback;
		let parseado='<ul>'+
					 '<li>Inicio: '+inicio+'</li>'+
					 '<li>Fin: '+fin+'</li>'+
					 '<li>Tiempo: '+(fin-inicio)+' ms</li>'+
					 '<li>Tama&ntilde;o: '+txtRespuesta.innerHTML.length+' bytes</li></ul>';
		estadisticas.innerHTML=parseado;
		txtHumanRedeable.innerHTML=syntaxHighlight(JSON.stringify(callback, undefined, 4));
	}
}

btnFetch.addEventListener('click',e=>{
	doFetch();
});

function syntaxHighlight(json) {
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		var cls = 'number';
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				cls = 'key';
			} else {
				cls = 'string';
			}
		} else if (/true|false/.test(match)) {
			cls = 'boolean';
		} else if (/null/.test(match)) {
			cls = 'null';
		}
		return '<span class="' + cls + '">' + match + '</span>';
	});
}

