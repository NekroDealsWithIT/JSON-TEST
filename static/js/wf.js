/*
	Pequeña cajita de herramientas para la pagina de wf
*/
/*
	Variables globales
*/
var fetching=false;
var resultJson='';

var timer1='';
var counter1=0;
var counter1Max=15;



function getWFWorldstate(proxy=false){
	var dataJson=getJson("https://ws.warframestat.us/pc",proxy);
}

function getJson(url='',viaCors=true){
	fetching=true;
	if(viaCors){
		// cors sirve como proxy externo
		//http://cors.io/?u=http://content.warframe.com/dynamic/worldState.php
		url="http://cors.io/?u="+url;
	}
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
	  resultJson = request.response;
	  //alert(dataJson['USD']['transferencia']);
	  // console.log(request.response);
	  fetching=false;
	  return request.response;
	}
}

function startAll(){
	getWFWorldstate();
	setClock(1000,timerTime);
}
function timerTime(){
	rellenarDatos();
	if (!fetching){
		counter1++
		if (counter1>=counter1Max){
			getWFWorldstate();
			counter1=0;
		}
	}
}

function rellenarDatos(){
	var estado='';
	estado='<p class='+((fetching)?'infoFetch':'infoNoFetch')+'>';
	estado+='('+tiempoStr()+') Proximo fetch:'+(counter1Max-counter1)+'</p>';
	datosPagina.innerHTML=estado;
	if (resultJson!=''){
		var ths=[];
		var tds=[];
		var parseado='';

		//var diff=moment(new Date()).utc()-moment(resultJson.timestamp);
		//getMilliseconds()
		var diff=new Date(new Date().toUTCString())-moment(resultJson.timestamp);
		
		//Timestamp
		timeStamp.innerHTML='Timestamp: '+resultJson.timestamp;
		timeStamp.innerHTML+= '<BR>Local UTF<BR> '+new Date(new Date().toUTCString()).getTime();
		timeStamp.innerHTML+= '<BR>Local<BR> '+(new Date()).getTime();
		timeStamp.innerHTML+= '<BR>JSON<BR> '+new Date(resultJson.timestamp).getTime();
		timeStamp.innerHTML+= '<BR>UTC JSON<BR> '+moment(resultJson.timestamp).utc();
		timeStamp.innerHTML+= '<BR>DIFF<BR>'+diff;
		
		//CetusTimer
		cetusTimer.innerHTML='Cetus Timer: <p class='+((resultJson.cetusCycle.isDay)?'pDay':'pNight')+'>'+strDiff(resultJson.cetusCycle.timeLeft,diff) + '('+resultJson.cetusCycle.timeLeft+')</p>';
		
		//Alerts
		ths=[];
		tds=[];
		parseado='<h3>Alertas</h3>'
		var alertsData=resultJson.alerts;
		ths.push([['Tiempo'],['Mods'],['Tipo Mision'],['Nodo'],['Faccion'],['Nivel'],['Reward']])
		alertsData.forEach(function(a){
			var td=[];
			var idFaction=a.mission.faction.toLowerCase();
			td.push(['<img src="'+a.mission.reward.thumbnail +'"><BR>'+ (a.eta),'tdAlert '+idFaction]);
			var modifs='';
			(a.mission.nightmare?modifs+='N ':'');
			(a.mission.archwingRequired?modifs+='Aw ':'');
			td.push([modifs,'tdAlert '+idFaction]);
			modifs='';
			modifs=(a.mission.maxWaveNum!=undefined&&a.mission.maxWaveNum!='')?'Waves:'+ a.mission.maxWaveNum :'';
			modifs=(modifs!='')?' ('+modifs+')':'';
			td.push([a.mission.type+modifs,'tdAlert '+idFaction]);
			td.push([a.mission.node,'tdAlert '+idFaction]);
			td.push([idFaction.toUpperCase(),'tdAlert '+idFaction]);
			td.push([a.mission.minEnemyLevel+'-'+a.mission.maxEnemyLevel,'tdAlert '+idFaction]);
			td.push([a.mission.reward.asString,'tdAlert '+idFaction]);
			if (!a.expired){tds.push(td);}
		});
		parseado += generateTable(tds,ths,'tableAlerts','','');
		parseado += '<hr>';
		alerts.innerHTML=parseado;
		
		//Invasions
		ths=[];
		tds=[];
		parseado='<h3>Invasiones</h3>'
		parseado+='Construcciones:'
		parseado+='<ul><li class="grineer">Fomorian: '+resultJson.constructionProgress.fomorianProgress+'</li>'
		parseado+='<li class="corpus">RazorBack: '+resultJson.constructionProgress.razorbackProgress+'</li>'
		parseado+='<li class="infested">Unknown: '+resultJson.constructionProgress.unknownProgress+'</li></ul>'
		
		var invasionData=resultJson.invasions;
		ths.push([['Descripcion Mision'],['Nodo'],['Porcentaje'],['Ataca'],['Reward A'],['Defiende'],['Reward D'],['VS infested']])
		invasionData.forEach(function(inv){
			var td=[];
			if (!inv.completed){
				var atk=inv.attackingFaction.toLowerCase();
				var def=inv.defendingFaction.toLowerCase();
				
				td.push([inv.desc,'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)]);
				td.push([inv.node,'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)]);
				td.push([Math.round(inv.completion,5)+'% - '+inv.eta,'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)]);
				td.push([inv.attackingFaction.toUpperCase(),'tdInvasion '+atk]);
				td.push(['<img src="'+inv.attackerReward.thumbnail +'"><BR>'+ inv.attackerReward.asString,'tdInvasion '+atk]);
				td.push([inv.defendingFaction.toUpperCase(),'tdInvasion '+def]);
				td.push(['<img src="'+inv.defenderReward.thumbnail +'"><BR>'+ inv.defenderReward.asString,'tdInvasion '+def]);
				td.push([inv.vsInfestation,'tdInvasion '+def]);
				tds.push(td);	
			}
		});

		parseado += generateTable(tds,ths,'tableInvasion','','border="1px solid white"');
		parseado += '<hr>';
		invasions.innerHTML=parseado;

		//Sortie
		ths=[];
		tds=[];
		parseado='';
		var sortieData=resultJson.sortie;
		parseado = 	'<h3>Sortie</h3>Jefe: '+sortieData.boss;
		parseado += '<BR>Faccion: '+sortieData.faction;
		parseado += '<BR>Tiempo Restante: '+sortieData.eta;
		var sortieFaction=sortieData.faction.toLowerCase();
		ths.push([['Tipo Mision'],['Nodo'],['Modificador'],['Descripcion Modificador']])
		sortieData.variants.forEach(function(v){
			var td=[];
			td.push([v.missionType,'tdSortie '+sortieFaction]);
			td.push([v.node,'tdSortie '+sortieFaction]);
			td.push([v.modifier,'tdSortie '+sortieFaction]);
			td.push([v.modifierDescription,'tdSortie '+sortieFaction]);
			tds.push(td);	
		});
		parseado += generateTable(tds,ths,'tableSortie','','');
		parseado +='<hr>';
		sortie.innerHTML=parseado;
		//Baro
		var baroData=resultJson.voidTrader;
		parseado='<h3>'+baroData.character+'</h3>'
		parseado+=baroData.character+
			'<BR>Llega a: '+baroData.location+' Activo: '+baroData.active+
			'<BR>Llega: '+baroData.startString+' Se va: '+baroData.endString+
			'<BR>Inventario: '+baroData.inventory;
		parseado +='<hr>';
		baro.innerHTML=parseado;
		//News
		var newsData=resultJson.news;
		parseado='<h3>News</h3>';
		parseado+='<ul class="news">';
		newsData.forEach(function(n){
			parseado+='<li><img src="'+n.imageLink+'" alt="'+n.message+'">['+n.eta+']<a href="'+n.link+'">'+n.message+'</a></li>'
		});
		parseado +='</ul><hr>';
		news.innerHTML=parseado;
	}
}
function toggleHide(id){
	document.getElementById(id).classList.toggle("hidden");
}
function strToDate(stringDate){
	var res=stringDate.split(" ");
	var response=0;
	res.forEach(function(t){
		var caracter=t.substring(t.length-1);
		
		t=t.substring(0,t.length-1);
		switch (caracter){
		case 'd':
			response+=t*1000*60*60*24;
			break;		
		case 'h':
			response+=t*1000*60*60;
			break;
		case 'm':
			response+=t*1000*60;
			break;
		case 's':
			response+=t*1000;
			break;
		default:
			console.log('*'+t+'*'+caracter+'* default');
		}
	});
	return response;
}
function dateToStr(stringDate){
	var res=stringDate.split(" ");
	var response=0;
	res.forEach(function(t){
		var caracter=t.substring(t.length-1);
		
		t=t.substring(0,t.length-1);
		switch (caracter){
		case 'd':
			response+=t*1000*60*60*24;
			break;		
		case 'h':
			response+=t*1000*60*60;
			break;
		case 'm':
			response+=t*1000*60;
			break;
		case 's':
			response+=t*1000;
			break;
		default:
			console.log('*'+t+'*'+caracter+'* default');
		}
	});
	return response;
}
function strDiff(strDate, diff){
	var result = strToDate(strDate)-diff;
	//result=new Date(result+ (new Date().getTimezoneOffset() * 60000));

	dias=new Date(result+ (new Date().getTimezoneOffset() * 60000)).getDate();
	horas=new Date(result+ (new Date().getTimezoneOffset() * 60000)).getHours();
	minutos=new Date(result+ (new Date().getTimezoneOffset() * 60000)).getMinutes();
	segundos=new Date(result+ (new Date().getTimezoneOffset() * 60000)).getSeconds();
	test.innerHTML=dias +''+horas +''+ minutos +''+ segundos;
	//test.innerHTML=new Date(result+ (new Date().getTimezoneOffset() * 60000));
	if(dias=31){
		result='-FINALIZADO-';
	}else{
		(dias!=1)?dias=fillStr(dias, 2)+' ':'';
		(horas!=0)?horas=fillStr(horas, 2)+':':'';
		(minutos!=0)?minutos=fillStr(minutos, 2)+':':'';
		segundos=fillStr(segundos, 2);

		result=dias +horas + minutos + segundos;
	}

	
	return result;
}