/*
	Pequeña cajita de herramientas para la pagina de wf
*/
/*
	Variables globales
*/
var estadosDesarrollo=['analisis','desarrollo','test','prod','pruebas','completo','bug','rollback'];
var trabajandoEn=[
					[5,'05-06-18 Hacer todo UN POCO mas responsive, si... funciono decente en celulares!']
					,[1,'09-06-18 Mostrar En el titulo de lista cuando todo fue finalizado y esta activo algun item']
					,[5,'09-06-18 Generar lista de desarrollo y estado... y aqui me ves.']
					,[0,'09-06-18 Esperar a Baro para marcar los items que trae']
					,[0,'09-06-18 Crear modo debug']
					,[0,'09-06-18 Conexion DB (persistir en alguna base en algun lado) {en analisis para mediano plazo}']
					,[0,'09-06-18 Conexion Discord {en analisis para largo++}']
					,[0,'09-06-18 Conexion Warframe market (para averiguar precios rapido)']
					,[0,'09-06-18 Conexion a droptables (porque... donde carajo cae el mod vitality?)']
					,[5,'09-06-18 css "Smooth" scroll para anchor links {oh zi... zepsy Smooth scrolling}']
					,[5,'09-06-18 Notificaciones mostrar cantidad cacheado/seleccionado']
					,[1,'09-06-18 Seteo de sonidos dependiendo de tipo']
					,[1,'09-06-18 Reproduccion de sonidos cuando aparece el item marcado']
					,[5,'09-06-18 Algo para eliminar todo lo seleccionado']
				];
var fetching=false;
var resultJson='';

var timer1='';
var counter1=0;
var counter1Max=15;
var estadoTimerTiming=true;

var completado=[];
var informarArr=[];
var informarArrChecked=[];
var informarArrMostrar=[];

var sounds=[];

var campeon;

// arrays activos
var alertaActivaArr=[];
var invasionActivaArr=[];
var sortieActivaArr=[];
var eventActivaArr=[];

function checkCampeon(){
	campeon=getCookie('campeon');
	if(campeon!=undefined&&campeon!=''){
		removeClass("sinImplementar","hidden");
		descripcionForm.innerHTML='<h1>Lince/lincesa, no esta implementado todavia pero al menos me acuerdo de vos campeon ('+campeon+')</h1>(aguanten las galletitas)';
	}
}
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
	  //console.log(request.response);
	  fetching=false;
	  return request.response;
	}
}

function startAll(){
	getWFWorldstate();
	// busco en las cookies las completadas de los ultimos 7 dias
	completado=completado.concat(getCookieArray("completas"));
	// console.log('completado:');
	// console.log(completado);
	informarArr=informarArr.concat(getCachedData());
	// console.log('informarArr:');
	// console.log(informarArr);
	informarArrChecked=informarArrChecked.concat(getCookieArray("informarArrChecked"));
	// console.log('informarArrChecked:');
	// console.log(informarArrChecked);
	informarArrMostrar=informarArrMostrar.concat(getCookieArray("informarArrMostrar"));
	// console.log('informarArrMostrar:');
	// console.log(informarArrMostrar);
	cargarSonidos();

	// en que estoy trabajando?
	if(trabajandoEn.length>-1){
		workingOn.innerHTML='var serioMode=false;<h3 class="somethingWentVeryWrong" onClick="toggleHide('+"'workingOn'"+');"><img class="thumbnail" src="static/img/warning.webp"> Trabajando actualmente en <img class="thumbnail" src="static/img/warning.webp"> (click en esta barra para ocultar este exceso de COMIC SANZ)<ul>';
		listaTrabajo='';
		trabajandoEn.forEach(function(te){
			listaTrabajo+='<li class="dev_'+estadosDesarrollo[te[0]]+'">('+estadosDesarrollo[te[0]].toUpperCase()+') '+te[1]+'</li>';
		});
		workingOn.innerHTML+=listaTrabajo+'</ul>';
		workingOn.innerHTML+='<h2>Recorda, que si algo falla... <br><img class="omfg" src="queIronia.com_soy_una_imagen_con_el_path_mal_formado._re_loco_no?.imagenQueNoCarga" alt="(Que ironia... soy una imagen sobre bugs, en comic sanz... y no cargo.)"><br> shit happens everywhere... y muy probablemente ya este trabajando en el problema.</h2>';
		workingOn.innerHTML+='(realidad)<br><img class="ahhhhhhhhhhhhhh" src="static/img/bug.gif" alt="yo tampoco cargo."><br><br>';
		workingOn.innerHTML+='Discord:Nekro#0089<br>'+'serioMode=true;';
	}	
	//fin de en que estoy trabajando?1

	timer1=setClock(1000,timerTime,timer1);
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

function toggleTimer(activar){
	//console.log(activar);
	if(activar){
		startAll();
	}else{
		stopClock(timer1);
	}
}

function rellenarDatos(){
	var estado='';

	estado='<p class='+((fetching)?'infoFetch':'infoNoFetch')+'>';
	estado+='('+tiempoStr()+') Proximo fetch:'+(counter1Max-counter1)+'</p>';
	datosPagina.innerHTML=estado;
	// toggleTimer(this.checked);toggleClass('autoUpdateCheckbox','active',this.checked	)
	barraProgreso.innerHTML='<progress value='+counter1+' max='+(counter1Max-1)+' class="barraProgreso" onClick="autoUpdateCheckbox.click()"/>';
	if (resultJson!=''){
		// reseteo las activas
		alertaActivaArr=[];
		invasionActivaArr=[];
		sortieActivaArr=[];
		eventActivaArr=[];

		var ths=[];
		var tds=[];
		var parseado='';

		//var diff=moment(new Date()).utc()-moment(resultJson.timestamp);
		//getMilliseconds()
		var diff=new Date(new Date().toUTCString())-moment(resultJson.timestamp);
		
		//cookies
		cookiesShow.innerHTML='<h2>Cookies capturados al '+ dateToString(new Date(new Date().toUTCString()))+':</h2>';
		cookiesShow.innerHTML+=document.cookie;
		cookiesShow.innerHTML+='<h2>Completas:</h2>';
		cookiesShow.innerHTML+=getCookie("completas");
		cookiesShow.innerHTML+='<h2>Data cacheada(notificaciones):</h2>';
		cookiesShow.inne1rHTML+=arrayToPipedString(getCachedData());


		//Timestamp
		timeStamp.innerHTML='Timestamp: '+resultJson.timestamp;
		// timeStamp.innerHTML+= '<BR>Local UTF<BR> '+new Date(new Date().toUTCString()).getTime();
		// timeStamp.innerHTML+= '<BR>Local<BR> '+(new Date()).getTime();
		// timeStamp.innerHTML+= '<BR>JSON<BR> '+new Date(resultJson.timestamp).getTime();
		// timeStamp.innerHTML+= '<BR>UTC JSON<BR> '+moment(resultJson.timestamp).utc();
		// timeStamp.innerHTML+= '<BR>DIFF<BR>'+diff;
		
		//CetusTimer
		timers.innerHTML='<h3>Timers</h3>';
		timers.innerHTML+='<div>Cetus Timer: <p class='+((resultJson.cetusCycle.isDay)?'pDay':'pNight')+'>'+strDiff(resultJson.cetusCycle.timeLeft,diff) + '</p></div>';
		timers.innerHTML+='<div>Earth Timer: <p class='+((resultJson.earthCycle.isDay)?'pDay':'pNight')+'>'+strDiff(resultJson.earthCycle.timeLeft,diff) + '</p></div>';
		
		//Manejo de sonidos
		var cacheado=[];
		cacheado=getCachedData();
		if (cacheado.length>0){
			notificaciones.innerHTML='<h3>Notificar ('+cacheado.length+' Items cacheados | '+(informarArrChecked.length-1)+' Items seleccionados)</h3>';
			notificaciones.innerHTML+='<h2 onclick="informarArrChecked=[];toggleInformar('+"''"+',false);timerTime();alert('+"'Elimine todas las selecciones hechas!'"+')">Eliminar TODO lo seleccionado</h2><div class="notificacionesParent">';
			var tipos=[];
			cacheado.forEach(function(c){
				if(c.cachedItem!=''){
					tipos.push(c.cachedType);
				}
			});
			// Agrego clase generica
			tipos.push('recursos');
			// Dejo unico el array para no repetir data
			tipos=arrayUnique(tipos);
			// hago un ordenamiento burbuja (A-Z) para los titulos
			tipos=bubbleSorting(tipos);
			// hago un ordenamiento para los items
			cacheado=arraySortByKey(cacheado,'cachedType');
			cacheado=arraySortByKey(cacheado,'cachedItem');
			
			var alertasActuales=resultJson.alerts;
			var invasionesActuales=resultJson.invasions;
			tipos.forEach(function(t){
				// notificaciones.innerHTML+='<div class="listaNotificaciones"><article><h4 class="ucase subrayado">'+t+'</h4><ul id="typeNotif'+t.toUpperCase()+'">';
				var notificacion='';
				var listaActiva=false;
				var comboSonido=getComboSound(t);
				cacheado.forEach(function (c){
					var actual='';
					var completa=false;
					var timerNotificacion='';
					// hay que recorrer las alertas!
					alertasActuales.forEach(function(a){
						if(!a.expired){
							if (c.cachedItem==''){
								if(a.rewardTypes!=undefined&&a.rewardTypes.includes(c.cachedType)){
									actual=a.id;
									completa=chequearCompleto(a.id);
									timerNotificacion=strDiff((a.eta),diff);
								}
							}else{
								if(a.mission!=undefined&&a.mission.reward.items!=undefined&&a.mission.reward.items.includes(c.cachedItem)){
									actual=a.id;	
									completa=chequearCompleto(a.id);
									timerNotificacion=strDiff((a.eta),diff);
								}
							}
						}
					});
					// hay que recorrer las invasiones!
					if(t=='invasion'){
						invasionesActuales.forEach(function(i){
							if (!i.completed){
								if(i.attackerReward!=undefined&&i.attackerReward.asString==c.cachedItem){
									actual=i.attackerReward.asString;
									completa=chequearCompleto(i.id);
									timerNotificacion=strDiff((i.eta),diff);
								}
								if(i.defenderReward!=undefined&&i.defenderReward.asString==c.cachedItem){
									actual=i.defenderReward.asString;
									completa=chequearCompleto(i.id);
									timerNotificacion=strDiff((i.eta),diff);
								}
							}
						});
					}



					if(t=='recursos'&&c.cachedItem==''){
							//de paso revisamos si esta completa para marcarlo tambien!

							// chequeo si hay alguno en la lista para remarcar la lista entera
							if(actual!=''){listaActiva=true;}
							var notificar=chequearInformar(c.cachedType);
							var isCompleted=(completa?' completed':'');
							
							notificacion+='<li class="'+(actual!=''?'notifActive':'notifInactive')+isCompleted+'">'+
								'<input type="checkbox" onClick="toggleInformar(this.name,this.checked);" name="'+c.cachedType+'"' + (notificar?" checked":"")+'>'+
								'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+c.cachedType+'" target="blank">'+
								'<img class="thumbnailNotif" src="'+c.cachedImgLink+'">'+
								'<span class="capitalize">'+c.cachedType+'</span>'+
								'</a>'+
								' ('+dateToString(c.cachedTime)+')'+(actual!=''?' <a href="#'+actual+'">ACTIVA!!</a> (eta: '+timerNotificacion+')':'')+
								'</li>';
					}else{
						if(t==c.cachedType){
							if(actual!=''){listaActiva=true;}
							var notificar=chequearInformar(c.cachedItem);
							var isCompleted=(completa?' completed':'');
							
							notificacion+='<li class="'+(actual!=''?'notifActive':'notifInactive')+isCompleted+'">'+
								'<input type="checkbox" onClick="toggleInformar(this.name,this.checked);" name="'+c.cachedItem+'"' + (notificar?" checked":"")+'>'+
								'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+c.cachedItem+'" target="blank">'+
								'<img class="thumbnailNotif" src="'+c.cachedImgLink+'">'+
								'<span class="capitalize">'+c.cachedItem+'</span>'+
								'</a>'+
								' ('+dateToString(c.cachedTime)+')'+(actual!=''?' <a href="#'+actual+'">ACTIVA!! (eta: '+timerNotificacion+')</a>':'')+
								'</li>';
						}
					}

				});
				var idLista="'typeNotif"+t.toUpperCase()+"'";
				var ocultarTipo=chequearInformarNotif("typeNotif"+t.toUpperCase());
				// crear un array que guarde que tipo mostrar
				notificaciones.innerHTML+='<div class="listaNotificaciones"><article><h5 class="ucase subrayado '+(listaActiva!=''?'notifActive':'notifInactive')+'" onClick="toggleHide('+idLista+');toggleInformarNotif('+idLista+')">'+t+(ocultarTipo?' (▼▼▼▼▼)':' (▲▲▲▲▲)')+'</h5><ul id="typeNotif'+t.toUpperCase()+'" class='+(ocultarTipo?"hidden":"")+'>'+comboSonido+notificacion+'</ul></article></div>';
			});
			notificaciones.innerHTML+='</div>'
		}

		//Events
		var eventsData=resultJson.events;
		if (eventsData.length>0){
			removeClass('eventsCheckbox','hidden');
			parseado='';
			// parseado='<a id="E"></a>';
			parseado+='<h3>Eventos</h3>';
			
			eventsData.forEach(function(e){
				parseado +='<article>';
				parseado +='<span class="subrayado"><h2>' +e.description+'(<a href="http://warframe.wikia.com/wiki/Special:Search?search='+e.affiliatedWith+'" target="blank">'+e.affiliatedWith+'</a>)</h2></span>';
				parseado +='<p>' +e.tooltip+'</p>';
				parseado +='<p>Nodo: ' +e.victimNode+'('+e.health+'%)</p>';
				parseado += '<hr>';
				if(e.jobs.length>0){
					parseado+='<span class="subrayado"><h4>&#8227; Misiones</h4></span><div class="eventMission">';
					e.jobs.forEach(function(j){

						var idEvent="'"+j.id+"'";
						var eventoCompleta=chequearCompleto(j.id);
						
						//agrego eventActiva
						eventActivaArr.push(j.id);

						var checkBoxCompleted='<label><input type="checkbox" onclick="toggleCompletar('+idEvent+')"'+(eventoCompleta?' checked':'')+'>Completa?</label><br>'
						var isCompleted=(eventoCompleta?' completed':'');
						
						parseado+=checkBoxCompleted+' Tipo: '+j.type;
						if(j.enemyLevels.length>0){
							parseado+='<p class='+isCompleted+'>Nivel:';
							j.enemyLevels.forEach(function(el){
								parseado+= ' '+el;
							});
							parseado+='</p>';
						}
						if(j.rewardPool.length>0){
							parseado+='<p class='+isCompleted+'>Recompensas: ';
							j.rewardPool.forEach(function(rp){
								parseado+= '[<a href="http://warframe.wikia.com/wiki/Special:Search?search='+rp+'" target="blank">'+rp+'</a>]';
							});
							parseado+='</p>';
						}
						if(j.standingStages.length>0){
							parseado+='<p class='+isCompleted+'>Reputacion: ';
							var suma=0;
							j.standingStages.forEach(function(ss){
								parseado+= '['+ss+']';
								suma+=ss;
							});
							parseado+=' <b>(Total: '+suma+')</b>';
							parseado+='</p>';
						}
						parseado+='<hr>';
					});
				}

				parseado +='</article>';
			});

			// parseado += '<hr>';
			events.innerHTML=parseado;
		}else{
			addClass('eventsCheckbox','hidden');
			events.innerHTML='';
		}

		//Alerts
		ths=[];
		tds=[];
		parseado='';
		// parseado='<a id="A"></a>';
		parseado+='<h3>Alertas</h3>';
		
		var alertsData=resultJson.alerts;
		ths.push([['Tiempo','alertTH'],['Mods','alertTH'],['Tipo Mision','alertTH'],['Nodo','alertTH'],['Faccion','alertTH'],['Nivel','alertTH'],['Reward','alertTH']])
		alertsData.forEach(function(a){
			var td=[];
			var idFaction=a.mission.faction.toLowerCase();
			var idAlerta="'"+a.id+"'";
			var alertaCompleta=chequearCompleto(a.id);

			// agrego a la lista la alertaActiva
			alertaActivaArr.push(a.id);

			var checkBoxCompleted='<a id='+idAlerta+'></a><label><input type="checkbox" onclick="toggleCompletar('+idAlerta+')"'+(alertaCompleta?' checked':'')+'>Completa?</label><br>'
			var isCompleted=(alertaCompleta?' completed':'');
			
			var cookieStore='';
			if(a.rewardTypes.length>0){
				a.rewardTypes.forEach(function(rt){
					// setCookie('a_'+rt,new Date(),365*24*60*60*1000);
					if(rt!=''){
						cookieStore+='t_'+rt;
					}
				});
			}
			if(a.mission.reward.items+!undefined&&a.mission.reward.items.length>0){
				a.mission.reward.items.forEach(function(ri){
					// setCookie('a_'+rt,new Date(),365*24*60*60*1000);
					if(ri!=''){
						cookieStore+='_i_'+ri;
					}
				});
			}
			cookieStore+='_l_'+a.mission.reward.thumbnail;
			
			setCookie(cookieStore,new Date(),365*24*60*60*1000);

			td.push([checkBoxCompleted+'<img src="'+a.mission.reward.thumbnail +'"><BR>'+ strDiff((a.eta),diff)+'('+a.eta+')','tdAlert '+idFaction]);
			var modifs='';
			(a.mission.nightmare?modifs+='N ':'');
			(a.mission.archwingRequired?modifs+='Aw ':'');
			td.push([modifs,'tdAlert '+idFaction+isCompleted]);
			modifs='';
			modifs=(a.mission.maxWaveNum!=undefined&&a.mission.maxWaveNum!='')?'Waves:'+ a.mission.maxWaveNum :'';
			modifs=(modifs!='')?' ('+modifs+')':'';
			td.push([a.mission.type+modifs,'tdAlert '+idFaction+ isCompleted]);
			td.push([a.mission.node,'tdAlert '+idFaction+ isCompleted]);
			td.push([idFaction.toUpperCase(),'tdAlert '+idFaction+ isCompleted]);
			td.push([a.mission.minEnemyLevel+'-'+a.mission.maxEnemyLevel,'tdAlert '+idFaction+ isCompleted]);
			td.push(['<a href="http://warframe.wikia.com/wiki/Special:Search?search='+a.mission.reward.asString+'" target="blank">'+a.mission.reward.asString+'</a>','tdAlert '+idFaction+ isCompleted]);
			if (!a.expired){tds.push(td);}
		});
		parseado += generateTable(tds,ths,'tableAlerts enlargeMe','','');
		parseado += '<hr>';
		alerts.innerHTML=parseado;
		
		//Invasions
		ths=[];
		tds=[];
		parseado='';
		// parseado='<a id="I"></a>';
		parseado+='<h3>Invasiones</h3>'
		
		parseado+='<div>Construcciones:'
		parseado+='<ul><li class="grineer">Fomorian: '+resultJson.constructionProgress.fomorianProgress+'%</li>'
		parseado+='<li class="corpus">RazorBack: '+resultJson.constructionProgress.razorbackProgress+'%</li>'
		parseado+='<li class="infested">Unknown: '+resultJson.constructionProgress.unknownProgress+'%</li></ul></div'
		
		var invasionData=resultJson.invasions;
		ths.push([['Descripcion Mision','invTH'],['Nodo','invTH'],['Porcentaje','invTH'],['Ataca','invTH'],['Reward A','invTH'],['Defiende','invTH'],['Reward D','invTH'],['VS infested','invTH']])
		invasionData.forEach(function(inv){
			var td=[];
			if (!inv.completed){
				
				//Agregado a la lista de notificaciones de cookies
				var cookieStore='';
				if(!inv.vsInfestation){
					cookieStore='t_'+'invasion_i_'+inv.attackerReward.asString+'_l_'+inv.attackerReward.thumbnail;
					setCookie(cookieStore,new Date(),365*24*60*60*1000);
				}
				cookieStore='t_'+'invasion_i_'+inv.defenderReward.asString+'_l_'+inv.defenderReward.thumbnail;
				setCookie(cookieStore,new Date(),365*24*60*60*1000);

				var atk=inv.attackingFaction.toLowerCase();
				var def=inv.defendingFaction.toLowerCase();
				var idInvasion="'"+inv.id+"'";
				var invasionCompleta=chequearCompleto(inv.id);
				var checkBoxCompleted='<label><input type="checkbox" onclick="toggleCompletar('+idInvasion+')"'+(invasionCompleta?' checked':'')+'>Completa?</label><br>'
				var isCompleted=(invasionCompleta?' completed':'');

				// agrego la invasionActiva
				invasionActivaArr.push(inv.id);

				td.push([checkBoxCompleted+inv.desc,'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)]);
				td.push([inv.node,'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)+isCompleted]);
				td.push(['<div class=progressInv'+((Math.round(inv.completion,5))>50?atk:def)+'><progress value='+inv.completion+' max=100 /></div>'+Math.round(inv.completion,5)+'% - '+strDiff(inv.eta,diff),'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)+isCompleted]);
				td.push([inv.attackingFaction.toUpperCase(),'tdInvasion '+atk+isCompleted]);
				td.push(['<a id="'+inv.attackerReward.asString+'"></a><img src="'+inv.attackerReward.thumbnail +'"><BR>'+ '<a href="http://warframe.wikia.com/wiki/Special:Search?search='+inv.attackerReward.asString+'" target="blank">'+inv.attackerReward.asString+'</a>','tdInvasion '+atk+isCompleted]);
				td.push([inv.defendingFaction.toUpperCase(),'tdInvasion '+def+isCompleted]);
				td.push(['<a id="'+inv.defenderReward.asString+'"></a><img src="'+inv.defenderReward.thumbnail +'"><BR>'+ '<a href="http://warframe.wikia.com/wiki/Special:Search?search='+inv.defenderReward.asString+'" target="blank">'+inv.defenderReward.asString+'</a>','tdInvasion '+def+isCompleted]);
				td.push([inv.vsInfestation,'tdInvasion '+def+isCompleted]);
				tds.push(td);	
			}
		});

		parseado += '<div class="tableInvasion enlargeMe">'+generateTable(tds,ths,'tableInvasion','','border="1px solid white"')+'</div>';
		parseado += '<hr>';
		invasions.innerHTML=parseado;

		//Sortie
		ths=[];
		tds=[];
		parseado='';
		var sortieData=resultJson.sortie;
		// parseado ='<a id="S"></a>';
		if (sortieData!=undefined){
			parseado += '<h3>(Sortie '+'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+sortieData.boss+'" target="blank">'+sortieData.boss+'</a>'+'-'+'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+sortieData.faction+'" target="blank">'+sortieData.faction+'</a>'+'-'+strDiff((sortieData.eta),diff)+')</h3><div>Jefe: '+sortieData.boss;
			
			parseado += '<BR>Faccion: '+sortieData.faction;
			parseado += '<BR>Tiempo Restante: '+strDiff((sortieData.eta),diff)+'('+sortieData.eta+')</div>';
			var sortieFaction=sortieData.faction.toLowerCase();
			ths.push([['Tipo Mision'],['Nodo'],['Modificador'],['Descripcion Modificador']]);
			sortieData.variants.forEach(function(v){
				var idSortie="'"+v.missionType+v.node+v.modifier+"'";
				var sortieCompleta=chequearCompleto(v.missionType+v.node+v.modifier);
				var checkBoxCompleted='<label><input type="checkbox" onclick="toggleCompletar('+idSortie+')"'+(sortieCompleta?' checked':'')+'></label>'
				var isCompleted=(sortieCompleta?' completed':'');
				
				// agego la sortieActiva
				sortieActivaArr.push(v.missionType+v.node+v.modifier);

				var td=[];
				td.push([checkBoxCompleted+v.missionType,'tdSortie '+sortieFaction]);
				td.push([v.node,'tdSortie '+sortieFaction+isCompleted]);
				td.push([v.modifier,'tdSortie '+sortieFaction+isCompleted]);
				td.push([v.modifierDescription,'tdSortie '+sortieFaction+isCompleted]);
				tds.push(td);	
			});
			parseado += generateTable(tds,ths,'tableSortie enlargeMe','','');
			parseado +='<hr>';
			sortie.innerHTML=parseado;
		}
		//Fisures
		parseado='';
		var fisureData=resultJson.fissures;
		// parseado ='<a id="F"></a>';
		parseado +='<h3>Fisures</h3>';
		
		ths=[];
		tds=[];
		ths.push([['Tier'],['Tiempo'],['Enemigo'],['Tipo'],['Nodo']]);
		
		fisureData.forEach(function(f){
			var td=[];
			var fisureFaction=f.enemy.toLowerCase();
			td.push([f.tier+' ('+f.tierNum+')','tdFisure '+fisureFaction]);
			td.push([strDiff(f.eta,diff),'tdFisure '+fisureFaction]);
			td.push([f.enemy,'tdFisure '+fisureFaction]);
			td.push([f.missionType,'tdFisure '+fisureFaction]);
			td.push([f.node,'tdFisure '+fisureFaction]);
			tds.push(td);	
		});
		parseado += generateTable(tds,ths,'tableFisures enlargeMe','','');
		parseado +='<hr>';
		fissures.innerHTML=parseado;
		
		//Baro
		var baroData=resultJson.voidTrader;
		parseado='';
		// parseado ='<a id="B"></a>';
		parseado +='<h3>'+baroData.character+'</h3>'
		parseado +='<p class='+(baroData.active?'"baroEsta"':'"baroNoEsta"')+'>'+(baroData.active?'Se va: '+strDiff((baroData.endString),diff):'Llega: '+strDiff((baroData.startString),diff))+'</p>';
		
		parseado+=baroData.character+
			'<BR>Llega a: '+baroData.location+' Activo: '+baroData.active+
			'<BR>Llega: '+strDiff((baroData.startString),diff)+' Se va: '+strDiff((baroData.endString),diff)+
			'<BR>Inventario: '+baroData.inventory;
		parseado +='<hr>';
		baro.innerHTML=parseado;
		
		//News
		var newsData=resultJson.news;
		parseado='';
		// parseado='<a id="N"></a>';
		parseado='<h3>News</h3>';
		
		parseado+='<ul class="news enlargeMe">';
		newsData.forEach(function(n){
			parseado+='<li><img src="'+n.imageLink+'" alt="'+n.message+'">&nbsp;&nbsp;<a href="'+n.link+'" target="blank">'+n.message+'</a>&nbsp;&nbsp;&nbsp;&nbsp;['+strDiff(n.eta, diff*-1)+']</li>'
		});
		parseado +='</ul><hr>';
		news.innerHTML=parseado;

		limpiarCompletasFinalizadas();
	}
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
		case 'g':
		case 'o':
		case '*':
		case 'n':
		case 'i':
			break;
		default:
			console.log(stringDate+'*'+t+'*'+caracter+'* default');
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
	//test.innerHTML=dias +''+horas +''+ minutos +''+ segundos;
	//test.innerHTML=new Date(result+ (new Date().getTimezoneOffset() * 60000));	dias=(dias=31)?0:dias;
	// if(dias!=31){
	// 	result='-FINALIZADO-';
	// }else{
		dias=(dias!=1&&dias!=31)?fillStr(dias, 2)+'dias ':'';

		horas=(horas!=0)?fillStr(horas, 2)+'h ':'';
		minutos=(minutos!=0)?fillStr(minutos, 2)+'m ':'';
		segundos=fillStr(segundos, 2)+'s ';

		result=dias +''+horas+''+minutos+''+segundos;
	// }

	return result;
}

// funciones de completado
function toggleCompletar(id){
	var pos=-1;
	var posElemento=-1;
	//if (completado.includes(id)){alert("existe");}
	completado.forEach(function(valor){
		pos++;
		if (valor==id){
			posElemento=pos;
		}
	});

	if(posElemento!=-1){
		//console.log(completado);
		completado.splice(posElemento, 1);
		// console.log("eliminado:" +id+'\n'+completado);
	}else{
		completado.push(id);
		// console.log("agregado:" +id+'\n'+completado);
	}
	timerTime();
}
function chequearCompleto(id){
	var pos=-1;
	var posElemento=-1;
	completado.forEach(function(valor){
		pos++;
		if (valor==id){
			posElemento=pos;
			// console.log(id);
		}
	});
	if (posElemento>-1){
		return true;
	}else{
		return false;	
	}
}
function toggleInformar(id){
	var pos=-1;
	var posElemento=-1;
	//if (informarArrChecked.includes(id)){alert("existe");}
	informarArrChecked.forEach(function(valor){
		pos++;
		if (valor==id){
			posElemento=pos;
		}
	});

	if(posElemento!=-1){
		//console.log(informarArrChecked);
		informarArrChecked.splice(posElemento, 1);
		// console.log("eliminado:" +id+'\n'+informarArrChecked);
	}else{
		informarArrChecked.push(id);
		// console.log("agregado:" +id+'\n'+informarArrChecked);
	}
	arrayUnique(informarArrChecked);
	arrayRemove(informarArrChecked);
	setCookieArray("informarArrChecked",informarArrChecked,30*24*60*60*1000);
	// timerTime();
}
function chequearInformar(id){
	var pos=-1;
	var posElemento=-1;
	informarArrChecked.forEach(function(valor){
		pos++;
		if (valor==id){
			posElemento=pos;
			// console.log(id);
		}
	});
	if (posElemento>-1){
		return true;
	}else{
		return false;	
	}
}
function toggleInformarNotif(id){
	var pos=-1;
	var posElemento=-1;
	//if (informarArrMostrar.includes(id)){alert("existe");}
	informarArrMostrar.forEach(function(valor){
		pos++;
		if (valor==id){
			posElemento=pos;
		}
	});

	if(posElemento!=-1){
		//console.log(informarArrMostrar);
		informarArrMostrar.splice(posElemento, 1);
		// console.log("eliminado:" +id+'\n'+informarArrMostrar);
	}else{
		informarArrMostrar.push(id);
		// console.log("agregado:" +id+'\n'+informarArrMostrar);
	}
	arrayUnique(informarArrMostrar);
	setCookieArray("informarArrMostrar",informarArrMostrar,30*24*60*60*1000);
	// timerTime();	
}
function chequearInformarNotif(id){
	var pos=-1;
	var posElemento=-1;
	// console.log(id);
	informarArrMostrar.forEach(function(valor){
		pos++;
		if (valor==id){
			posElemento=pos;
		}
	});
	if (posElemento>-1){
		return true;
	}else{
		return false;	
	}
}


function limpiarCompletasFinalizadas(){
	var auxArr=[];
	//busco en las cookies las alertas completas
	// console.log("inicial:"+completado);
	// solo debe de ejecutarse la primera vez!
	// completado=completado.concat(getCookie("completas"))
	// console.log("con cookie:"+completado);
	//limpio las completas duplicadas
	completado = completado.filter(function (item, pos) {return completado.indexOf(item) == pos});
	// console.log("filtrado:"+completado);

	if (completado.length>0){
		var arrayCompleto=[];
		arrayCompleto=arrayCompleto.concat(alertaActivaArr);
		arrayCompleto=arrayCompleto.concat(invasionActivaArr);
		arrayCompleto=arrayCompleto.concat(sortieActivaArr);
		arrayCompleto=arrayCompleto.concat(eventActivaArr);
		completado.forEach(function(c){
			if(arrayCompleto.includes(c)){
				auxArr.push(c);
			}
		})		
	}
	completado=auxArr;
	// le tiro un unique
	completado = completado.filter(function (item, pos) {return completado.indexOf(item) == pos});
	setCookieArray("completas",auxArr,7*24*60*60*1000);

}


function getCachedData(){
	var cachedData=[];
	var cookieData="BCSI-CS-53631f2127934e24=2; BCSI-CS-170bdc07205ed45e=2; completas=5b19335af3cc7f49b2e101fc; t_helmet_i_Zephyr Cierzo Helmet Blueprint_l_https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png=Thu Jun 07 2018 10:57:25 GMT-0300 (hora estándar de Argentina); t_plastids_l_https://i.imgur.com/5yVfTEF.png=Thu Jun 07 2018 10:57:25 GMT-0300 (hora estándar de Argentina); t_credits_l_https://i.imgur.com/JCKyUXJ.png=Thu Jun 07 2018 10:57:25 GMT-0300 (hora estándar de Argentina)"
	cookieData="t_endo_i_100 Endo_l_https://i.imgur.com/mS8oSwx.png=Thu Jun 07 2018 09:43:41 GMT-0300 (Argentina Standard Time); t_catalyst_i_Orokin Catalyst Blueprint_l_https://i.imgur.com/C4X9NWm.png=Thu Jun 07 2018 09:48:41 GMT-0300 (Argentina Standard Time); completas=; t_oxium_l_https://i.imgur.com/hY8NCjk.png=Thu Jun 07 2018 09:49:41 GMT-0300 (Argentina Standard Time); t_traces_l_https://i.imgur.com/vvZGMPv.png=Thu Jun 07 2018 10:04:30 GMT-0300 (Argentina Standard Time); t_endo_i_80 Endo_l_https://i.imgur.com/mS8oSwx.png=Thu Jun 07 2018 10:15:34 GMT-0300 (Argentina Standard Time); t_argonCrystal_l_https://i.imgur.com/DdJJYSB.png=Thu Jun 07 2018 10:41:41 GMT-0300 (Argentina Standard Time); t_helmet_i_Zephyr Cierzo Helmet Blueprint_l_https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png=Thu Jun 07 2018 10:57:42 GMT-0300 (Argentina Standard Time); t_plastids_l_https://i.imgur.com/5yVfTEF.png=Thu Jun 07 2018 11:18:43 GMT-0300 (Argentina Standard Time); t_nitain_l_https://i.imgur.com/3Db4PHh.png=Thu Jun 07 2018 11:49:41 GMT-0300 (Argentina Standard Time); t_helmet_i_Valkyr Kara Helmet Blueprint_l_https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png=Thu Jun 07 2018 12:41:41 GMT-0300 (Argentina Standard Time); t_helmet_i_Ember Backdraft Helmet Blueprint_l_https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png=Thu Jun 07 2018 14:10:40 GMT-0300 (Argentina Standard Time); t_endo_i_150 Endo_l_https://i.imgur.com/mS8oSwx.png=Thu Jun 07 2018 14:35:00 GMT-0300 (Argentina Standard Time); t_helmet_i_Oberon Oryx Helmet Blueprint_l_https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png=Thu Jun 07 2018 14:40:33 GMT-0300 (Argentina Standard Time); t_credits_l_https://i.imgur.com/JCKyUXJ.png=Thu Jun 07 2018 14:40:33 GMT-0300 (Argentina Standard Time)"
	// busco esto: t_helmet_i_Zephyr Cierzo Helmet Blueprint_l_https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png=Thu Jun 07 2018 10:57:25 GMT-0300 (hora estándar de Argentina); t_plastids_l_https://i.imgur.com/5yVfTEF.png=Thu Jun 07 2018 10:57:25 GMT-0300 (hora estándar de Argentina); t_credits_l_https://i.imgur.com/JCKyUXJ.png=Thu Jun 07 2018 10:57:25 GMT-0300 (hora estándar de Argentina)

	if (document.cookie==''){
		// estoy local
		var decodedCookie = decodeURIComponent(cookieData);
	}else{
		var decodedCookie = decodeURIComponent(document.cookie);
	}
	
    var cookieArray = decodedCookie.split(';');
	for(var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        
        // Variable de checkeo
        var cV='t_';
        if (cookie.indexOf(cV) == 0) {
            var cachedType='';
            var cachedItem='';
            var cachedImgLink='';
            var cachedTime='';
            // (cookieMasticada)
            var cM=cookie;
 
            cV='=';
            if (cM.indexOf(cV) > -1) {
            	cachedTime=cM.substring(cM.indexOf(cV), cM.length);
            	cM=cM.substring(0, cM.length-cachedTime.length);
            	cachedTime=cachedTime.replace(cV,'');
            }

            cV='_l_';
            if (cM.indexOf(cV) > -1) {
            	cachedImgLink=cM.substring(cM.indexOf(cV), cM.length);
            	cM=cM.substring(0, cM.length-cachedImgLink.length);
            	cachedImgLink=cachedImgLink.replace(cV,'');
            }

            cV='_i_';
            if (cM.indexOf(cV) > -1) {
            	cachedItem=cM.substring(cM.indexOf(cV), cM.length);
            	cM=cM.substring(0, cM.length-cachedItem.length);
            	cachedItem=cachedItem.replace(cV,'');
            }

            cV='t_';
        	cachedType=cM.substring(cM.indexOf(cV), cM.length);
        	cachedType=cachedType.replace(cV,'');
        	cachedData.push({cachedType,cachedItem,cachedImgLink,cachedTime});
        }
    }
    return cachedData;
}
function cargarSonidos(){
	var texto='';
	var value=''
	var selected='';
	var auxArr=[];

	value='';	
	selected=true;
	texto='Deshabilitado';
	sounds.push({'value':'Deshabilitado','texto':'Deshabilitado','default':true});
	sounds.push({'value':'Hablado','texto':'Hablado','default':false});

	auxArr.push('case-closed.ogg');
	auxArr.push('cheerful.ogg');
	auxArr.push('decay.ogg');
	auxArr.push('hold-on.ogg');
	auxArr.push('horse.ogg');
	auxArr.push('just-like-magic.ogg');
	auxArr.push('case-closed.ogg');
	auxArr.push('relentless.ogg');
	auxArr.push('system-fault.ogg');
	auxArr.push('to-the-point.ogg');
	auxArr.push('your-turn.ogg');

	auxArr.forEach(function(aux){
		sounds.push({'value':aux,'texto':aux.split('.')[0],'default':false});	
	});
}
function getComboSound(id){
				// <select id="catalystCombo" class="comboText" onchange="cargarSonido(value,catalystSound);" onclick="focusSound('catalyst','combo',true);onfocus=" focussound('catalyst','combo',true);onblur="focusSound('catalyst','combo',false)>
				// <select id="catalystCombo" class="comboText" onchange="cargarSonido(value,catalystSound);" onclick="focusSound('catalyst','combo',true);" onfocus="focusSound('catalyst','combo',true);" onblur="focusSound('catalyst','combo',false)">
	var comboHtml='<select id="'+id+'Combo" class="comboText" onchange="cargarSonido(value,'+id+'Sound);" onClick="focusSound('+"'"+id+"'"+",'combo',true);" +'" onFocus="focusSound('+"'"+id+"'"+",'combo',true);" +'" onblur="focusSound('+"'"+id+"'"+",'combo',false)"+'">';
	sounds.forEach(function(s){
		comboHtml+='<option value="'+s.value+'"'+(s.default?' selected':'')+'>'+s.texto+'</option>';
	});
	comboHtml+='</select><audio id="'+id+'Sound"></audio>';
	comboHtml+='<label class="audioCheckbox"><input type="checkbox" onclick="focusSound('+"'"+id+"'"+",'CheckTipo',this.checked);"+'" id="'+id+'CheckTipo">Decir Tipo</label>';
	comboHtml+='<label class="audioCheckbox"><input type="checkbox" onclick="focusSound('+"'"+id+"'"+",'CheckItem',this.checked);"+'" id="'+id+'CheckItem">Decir Item</label>';
	comboHtml+='<input class="audioText" type="text" id="'+id+'Text" placeholder="Texto a decir" onfocus="focusSound('+"'"+id+"'"+",'text',true);"+'"'+' onblur="'+"focusSound("+"'"+id+"'"+",'text',false);textToSpeech(value);"+'">';
	return comboHtml;1
}


function focusSound(id,type,hold){
	console.log('id: '+id+' type: '+type+' hold: '+hold)
	switch(type){
		case 'combo':
			holdTimer(hold);	
			break;
		case 'text':
			holdTimer(hold);
			break;
		case 'checkTipo':
			if (hold){
				
			}
			break;
		case 'CheckItem':
			if (hold){

			}
			break;
	}
}
function holdTimer(hold){
	console.log('holdTimer: '+hold)
	if(hold){
		// tengo que detener los timers
		toggleTimer(false);
	}else{
		//lo dejo en el estado que lo encontre
		toggleTimer(autoUpdateHiddenCheckbox.checked);
	}
}