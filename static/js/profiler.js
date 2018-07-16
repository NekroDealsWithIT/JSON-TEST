var weapons='';
var warframes='';
var we='weapons'
var wa='warframes'

updateWeapons();
updateWarframes();

function updateWeapons(result=''){
	if (result==''){
		fetchJSONCallback("https://ws.warframestat.us/"+we,updateWeapons);
		//generateToast("Buscando",we,"",3000,'info',"nfc-bottom-right");
	}else{
		weapons=result;
		generateToast("Contenido cargado ["+weapons.length+"]",we.toUpperCase(),"",5000,'success',"nfc-bottom-right");
		redrawItems(we);
	}
}
function updateWarframes(result=''){
	if (result==''){
		fetchJSONCallback("https://ws.warframestat.us/"+wa,updateWarframes);
		//generateToast("Buscando",wa,"",3000,'info',"nfc-bottom-right");
	}else{
		warframes=result;
		generateToast("Contenido cargado ["+warframes.length+"]",wa.toUpperCase(),"",5000,'success',"nfc-bottom-right");
		redrawItems(wa);
	}
}

function redrawItems(tipo,filters=[]){
	switch(tipo){
		case we:
			resultadoArmas.innerHTML='';
			var weaponsHTML='';
			weapons.forEach(function (weapon){
				weaponsHTML+=weaponToHTML(weapon);
			});
			resultadoArmas.innerHTML=weaponsHTML;
			break;
		case wa:
			resultadoWarframes.innerHTML='';
			var warframesHTML='';
			warframes.forEach(function (warframe){
				warframesHTML+=warframeToHTML(warframe);
			});
			resultadoWarframes.innerHTML=warframesHTML;
			break;
		default:
			console.log(tipo);
	}

}

/*
--accuracy:100
buildPrice:65000
buildQuantity:1
--buildTime:86400
--category:"Melee"
channeling:1.5
chargeAttack:50
components:(5) [{…}, {…}, {…}, {…}, {…}]
consumeOnBuild:true
criticalChance:0.2
criticalMultiplier:2
--damage:"50.0"
--damagePerSecond:50
damagePerShot:(20) [6, 6, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
damageTypes:{impact:5, slash:40, puncture:5}
description:"Tyl Regor’s custom axe and shield are how he likes to eliminate ‘frustrations’."
disposition:3
--fireRate:0.83333337
imageName:"ack-&-brunt.png"
leapAttack:50
magazineSize:0
marketCost:150
masteryReq:3
--name:"Ack & Brunt"
noise:"Alarming"
omegaAttenuation:0.89999998
--patchlogs:(7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
polarities:[]
procChance:0.10000002
reloadTime:0
secondsPerShot:1.1999999
sentinel:false
skipBuildTimePrice:35
slot:5
spinAttack:50
stancePolarity:"Madurai"
tags:["Grineer"]
totalDamage:60
tradable:false
trigger:"Melee"
type:"Sword and Shield"
uniqueName:"/Lotus/Weapons/Grineer/Melee/GrineerTylAxeAndBoar/RegorAxeShield"
--vaulted:false
wallAttack:50
--wikiaThumbnail:"http:/vignette.wikia.nocookie.net/warframe/images/4/41/RegorAxeShield.png/revision/latest?cb=20150731174942"
wikiaUrl:"htt:/warframe.wikia.com/wiki/Ack_%26_Brunt"
*/
function weaponToHTML(wea){
	var parseado="<h4>"+wea.name+"</h4>"+
	'<p>Category:'+wea.category+'</p>'+
	'<p>Type:'+wea.type+'</p>'+
	(wea.buildTime!=undefined?'<p>Build Time:'+wea.buildTime/60/60+" hs"+'</p>':"")+
	'<p>vaulted: '+wea.vaulted+'</p>'+
	'<p>damage: '+wea.damage+'</p>'+
	'<p>damagePerSecond: '+wea.damagePerSecond+'</p>'+
	'<p>accuracy: '+wea.accuracy+'</p>'+
	'<p>fireRate: '+wea.fireRate+'</p>';
	//"<img src="+wea.wikiaThumbnail+">"+"|";
	if(wea.components!=undefined){
		//console.log(war.name,war.components);
		parseado+=generateComponentsHTML(wea.components,new Date().getTime()+wea.category+wea.name,wea.name);
	}
		
	if(wea.patchlogs!=undefined){
		parseado+=generatePatchlogsHTML(wea.patchlogs,new Date().getTime()+wea.category+wea.name,wea.name);
	}
	return parseado;
}
/*
abilities:(4) [{…}, {…}, {…}, {…}]
armor:65
aura:"madurai"
buildPrice:25000
buildQuantity:1
buildTime:259200
category:"Warframes"
color:7170143
components:(5) [{…}, {…}, {…}, {…}, {…}]
conclave:true
consumeOnBuild:true
description:"Ash is great for players looking for a stealthier approach to combat. Lethal abilities are complemented by powers of distraction."
health:150
imageName:"ash.png"
introduced:"Vanilla"
masteryReq:0
name:"Ash"
patchlogs:(104) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
polarities:(2) ["madurai", "madurai"]
power:100
sex:"Male"
shield:100
skipBuildTimePrice:50
sprint:1.15
stamina:3
tradable:false
type:"Warframe"
uniqueName:"/Lotus/Powersuits/Ninja/Ninja"
wikiaThumbnail:"https://vignette.wikia.nocookie.net/warframe/images/1/17/AshNewLook.png/revision/latest?cb=20141124022921"
wikiaUrl:"http://warframe.wikia.com/wiki/Ash"
*/
function warframeToHTML(war){
	var parseado="<h4>"+war.name+" (<a href="+war.wikiaUrl+" target="+'"blank"'+">wiki</a>)</h4>"+
	'<p>Mastery: '+war.masteryReq+'</p>'+
	'<p>Description: '+war.description+'</p>'+
	'<p>Aura: '+war.aura+'</p>'+
	'<p>Introduced: '+war.introduced+'</p>'+
	'<p>Health: '+war.health+'</p>'+
	'<p>Shield: '+war.shield+'</p>'+
	'<p>Power: '+war.power+'</p>'+
	'<p>Sprint: '+war.sprint+'</p>'+
	'<p>Tradeable: '+(war.tradeable!=undefined?war.tradeable:false)+'</p>'+
	(war.buildTime!=undefined?'<p>Build Time: '+war.buildTime/60/60+" hs"+'</p>':"")+
	(war.skipBuildTimePrice!=undefined?'<p>skipBuildTimePrice: '+war.skipBuildTimePrice+'</p>':"")+
	(war.vaulted!=undefined?'<p>'+war.vaulted+'</p>':"");
	//"<img src="+war.wikiaThumbnail+">"+"|";
	if(war.components!=undefined){
		//console.log(war.name,war.components);
		parseado+=generateComponentsHTML(war.components,new Date().getTime()+war.category+war.name,war.name);
	}
	
	if(war.patchlogs!=undefined){
		parseado+=generatePatchlogsHTML(war.patchlogs,new Date().getTime()+war.category+war.name,war.name);
	}
	return parseado;
}

function generatePatchlogsHTML(pl,id,nombre,hidden=true){
	var parseado='';
	id="patchlogs"+id;
	
	parseado+="<h4 onclick="+'"toggleHide('+"'"+id+"'"+");"+'">V Patchlogs de '+nombre+' ['+pl.length+"] [&Uacute;ltimo: "+dateToString(pl[0].date)+"]</h4>";
	parseado+='<ul>';
	parseado+='<div id="'+id+'" class="'+(hidden?'hidden':'')+'">';
	pl.forEach(function (p){
		parseado+="<li><a href='"+p.url+"'<h5>("+dateToString(p.date)+") "+p.name+"</h5></a>";
		//parseado+="<img src="+p.imgUrl+">";
		(p.additions!=''?parseado+='<p class="patchAdicion">Adiciones: '+p.additions+"</p>":'');
		(p.changes!=''?parseado+='<p class="patchCambio">Cambios: '+p.changes+"</p>":'');
		(p.fixes!=''?parseado+='<p class="patchFix">Fixes: '+p.fixes+"</p>":'');
		parseado+="</li>";
	});
	parseado+="</div></ul>";
	return parseado;
}

function generateComponentsHTML(comp,id,nombre,hidden=true){
	var parseado='';
	id="components"+id;
	
	parseado+="<h4 onclick="+'"toggleHide('+"'"+id+"'"+");"+'">V Componentes de '+nombre+' ['+comp.length+"]</h4>";
	parseado+='<ul>';
	parseado+='<div id="'+id+'" class="'+(hidden?'hidden':'')+'">';
	comp.forEach(function (p){
		parseado+="<li><h5>"+p.name+" (Tradeable: "+p.tradable+")</h5>";
		parseado+="<p>"+p.description+"</p>"
		if(p.drops!=undefined){
			parseado+=generateDropsHTML(p.drops,id+p.name,p.name);
		}
		parseado+="</li>";
	});
	parseado+="</div></ul>";
	return parseado;
}
function generateDropsHTML(drop,id,nombre,hidden=true){
	var parseado='';
	id="drops"+id;
	
	parseado+="<h4 onclick="+'"toggleHide('+"'"+id+"'"+");"+'">V Drops de '+nombre+' ['+drop.length+"]</h4>";
	parseado+='<ul>';
	parseado+='<div id="'+id+'" class="'+(hidden?'hidden':'')+'">';
	drop.forEach(function (p){
		parseado+="<li><p>"+p.type+" - "+p.location+" - "+p.rarity+"</p></li>";
	});
	parseado+="</div></ul>";
	return parseado;
}