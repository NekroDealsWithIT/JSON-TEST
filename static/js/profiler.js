var weapons=[];
var warframes=[];
var prices=[];

var arrWeaponsType=[];
var arrSubWeaponsType=[];
var arrWeaponMastery=[];

var weaponsOcultarSentinelas=false;
var weaponsOcultarVaulted=false;
var showAllImages=false;

var we='weapons';
var wa='warframes';
var pr='prices';
var polarities=[
				["madurai","V","(Damage, Powers) - Commonly dropped by Grineer.","https://vignette.wikia.nocookie.net/warframe/images/b/b2/Madurai_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001230"],
				["vazarin","D","(Defensive, Health, Armor) - Dropped by all factions.","https://vignette.wikia.nocookie.net/warframe/images/6/6f/Vazarin_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001231"],
				["naramon","Dash","(Utiliy, Misc.) - Commonly dropped by Corpus.","https://vignette.wikia.nocookie.net/warframe/images/6/60/Naramon_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001230"],
				["zenurik","Scratch","(Warframe Augments and Channeling Mods).","https://vignette.wikia.nocookie.net/warframe/images/8/8c/Zenurik_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001231"],
				["unairu","R","Introduced in Update 13.0 and used for certain Melee Stance Mods.","https://vignette.wikia.nocookie.net/warframe/images/6/61/Unairu_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001230"],
				["penjaga","Y","(Companion Abilities) - Dropped by all factions.","https://vignette.wikia.nocookie.net/warframe/images/5/5f/Penjaga_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001230"],
				["umbra","U","(Anti-Sentient Mods) - Obtained upon completion of The Sacrifice.","https://vignette.wikia.nocookie.net/warframe/images/a/a8/Umbra_Pol.png/revision/latest/scale-to-width-down/20?cb=20180615163632"]
			];

updateWeapons();
updateWarframes();
//updatePrices();

function updatePrices(result=''){
	if (result==''){
		fetchJSONCallback("https://nexus-stats.com/api",updatePrices);
	}else{
		prices=result;
		if (prices.length!=0&&prices.length!=undefined){
			generateToast("Contenido cargado ["+prices.length+"]","Precios de nexus-stats","",5000,'info',"nfc-bottom-right");
			redrawItems(pr);
		}else{
			generateToast("Error cargando contenido","Precios de nexus-stats<br>"+prices,"",5000,'error',"nfc-bottom-right");
		}
	}
}
function updateWeapons(result=''){
	if (result==''){
		fetchJSONCallback("https://ws.warframestat.us/"+we,updateWeapons);
	}else{
		weapons=result;
		if (weapons.length!=0&&weapons.length!=undefined){
			generateToast("Contenido cargado ["+weapons.length+"]",we.toUpperCase(),"",5000,'info',"nfc-bottom-right");
			redrawItems(we);
		}else{
			generateToast("Error cargando contenido",we.toUpperCase()+"<br>"+weapons,"",5000,'error',"nfc-bottom-right");
		}
	}
}
function updateWarframes(result=''){
	if (result==''){
		fetchJSONCallback("https://ws.warframestat.us/"+wa,updateWarframes);
	}else{
		warframes=result;
		if(warframes.length!=0&&warframes.length!=undefined){
			generateToast("Contenido cargado ["+warframes.length+"]",wa.toUpperCase(),"",5000,'info',"nfc-bottom-right");
			generalTabSelectorWarframes.click();
			redrawItems(wa);
		}else{
			generateToast("Error cargando contenido",wa.toUpperCase()+"<br>"+warframes,"",5000,'error',"nfc-bottom-right");
		}
	}
}

function redrawItems(tipo,filters=[]){
	switch(tipo){
		case we:
			resultadoArmas.innerHTML='';
			tabResultadoArmas.innerHTML='';
			var tabs='';

			var tabGroupName='weaponsTab';

			tabResultadoArmasGroup.innerHTML='<button data-idgroupname="'+tabGroupName+'" class="tablinks subrayado" name="hideAllTab" onclick="openTab(event, this.name,false)">OCULTAR TODO</button>';
			tabResultadoArmasGroup.innerHTML+='<button data-idgroupname="'+tabGroupName+'" id="'+tabGroupName+'ShowAllTab" class="tablinks subrayado" name="showAllTab" onclick="openTab(event, this.name,false)">MOSTRAR TODO</button>';
			
			var weaponsHTML='';

			arrWeaponMastery=[];
			arrWeaponsType=[];
			arrSubWeaponsType=[];

			var wn=txtWeaponName.value.toUpperCase();
			var counter=0;

			weapons.forEach(function (weapon){
				if(
					(weapon.name.toUpperCase().indexOf(wn)>-1)&&
					(weapon.sentinel==false||(weapon.sentinel&&!weaponsOcultarSentinelas))
				){
					arrWeaponMastery.push(weapon.masteryReq);
					arrWeaponsType.push(weapon.category);
					arrSubWeaponsType.push(weapon.category+'|'+weapon.type);

					var id=strReplaceAll(weapon.uniqueName,"/","_");
					var vaultedMark=(weapon.vaulted==true?' VAULTED':'');

					tabs+='<button data-idgroupname="'+tabGroupName+'" class="tablinks'+vaultedMark.toLowerCase()+'" id="" name="'+id+'" onclick="openTab(event, this.name)">'+weapon.name+vaultedMark+(weapon.sentinel==false?'':' (Sentinel)')+'</button>';
					
					weaponsHTML+='<div id="'+id+'" data-idgroupname="'+tabGroupName+'" class="tabcontent">';
					weaponsHTML+=weaponToHTML(weapon);
					weaponsHTML+='</div>';

					counter++;
				}
			});
			resultadoArmas.innerHTML=weaponsHTML;
			tabResultadoArmas.innerHTML=tabs;
			
			arrWeaponMastery=bubbleSorting(arrayUnique(arrWeaponMastery));
			arrWeaponsType=arrayUnique(arrWeaponsType).sort();
			arrSubWeaponsType=arrayUnique(arrSubWeaponsType).sort();

			generalTabSelectorWeapons.innerText='Armas ['+counter+']';

			document.getElementById(tabGroupName+'ShowAllTab').click();
			break;
		case wa:
			resultadoWarframes.innerHTML='';
			tabResultadoWarframes.innerHTML='';
			var tabs='';

			var tabGroupName='warframesTab';

			tabResultadoWarframesGroup.innerHTML='<button data-idgroupname="'+tabGroupName+'" class="tablinks subrayado" name="hideAllTab" onclick="openTab(event, this.name,false)">OCULTAR TODO</button>';
			tabResultadoWarframesGroup.innerHTML+='<button data-idgroupname="'+tabGroupName+'" id="'+tabGroupName+'ShowAllTab" class="tablinks subrayado" name="showAllTab" onclick="openTab(event, this.name,false)">MOSTRAR TODO</button>';

			arrWarframeMastery=[];

			var counter=0;
			var warframesHTML='';
			var wn=txtWarframeName.value.toUpperCase();
			
			warframes.forEach(function (warframe){
				if((warframe.name.toUpperCase().indexOf(wn)>-1)){
					var id=strReplaceAll(warframe.uniqueName,"/","_");
					var vaultedMark=(warframe.vaulted==true?' VAULTED':'');

					arrWarframeMastery.push(warframe.masteryReq);

					tabs+='<button data-idgroupname="'+tabGroupName+'" class="tablinks'+vaultedMark.toLowerCase()+'" id="" name="'+id+'" onclick="openTab(event, this.name)">'+warframe.name+vaultedMark+'</button>';

					warframesHTML+='<div id="'+id+'" data-idgroupname="'+tabGroupName+'" class="tabcontent">';
					warframesHTML+=warframeToHTML(warframe);
					warframesHTML+='</div>';
					counter++;
				}
			});
			resultadoWarframes.innerHTML=warframesHTML;
			tabResultadoWarframes.innerHTML=tabs;

			arrWarframeMastery=bubbleSorting(arrayUnique(arrWarframeMastery));

			generalTabSelectorWarframes.innerText='Warframes ['+counter+']';

			document.getElementById(tabGroupName+'ShowAllTab').click();
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
	var vaulted='';
	if(wea.vaulted!=undefined){
		vaulted=(wea.vaulted==true?'"profilerVaulted"':'');
	}
	var parseado="<div class="+vaulted+"><h4>"+wea.name+(vaulted==''?'':' [VAULTED] ')+(wea.sentinel==false?'':' [SENTINEL] ')+" (<a href="+wea.wikiaUrl+" target="+'"blank"'+">wiki</a>)</h4>";
	(showAllImages==true&&wea.wikiaThumbnail!=undefined?parseado+='<img src='+wea.wikiaThumbnail+'>':'');
	parseado+='<p>Description: '+wea.description+'</p>'+
	'<p>Category:'+wea.category+'</p>'+
	'<p>Type:'+wea.type+'</p>'+
	'<p>Mastery Req:'+wea.masteryReq+'</p>'+
	'<p>Sentinel:'+wea.sentinel+'</p>'+
	'<p>Disposition:'+wea.disposition+'</p>';
	if(wea.polarities!=undefined&&wea.polarities.length>0){
		parseado+=generatePolaritiesHTML(wea.polarities,new Date().getTime()+wea.category+wea.name,wea.name);
	}
	parseado+='<p>noise: '+wea.noise+'</p>'+
	
	(wea.buildTime!=undefined?'<p>Build Time:'+wea.buildTime/60/60+" hs"+'</p>':"")+
	(wea.buildTime!=undefined?'<p>Skip Build Time:'+wea.skipBuildTimePrice+" plat"+'</p>':"")+

	(wea.proyectile!=undefined?'<p>Proyectile:'+wea.proyectile/60/60+" hs"+'</p>':"")+
	'<p>accuracy: '+wea.accuracy+'</p>'+
	(wea.ammo!=undefined?'<p>Ammo:'+wea.ammo+'</p>':"")+
	'<p>magazineSize: '+wea.magazineSize+'</p>'+
	'<p>reloadTime: '+wea.reloadTime+'</p>'+
	'<p>trigger: '+wea.trigger+'</p>';
	if(wea.damageTypes!=undefined&&wea.damageTypes.length>0){
		parseado+='<h4>DamageTypes</h4><ul>';
		wea.damageTypes.forEach(function (dt){
			parseado+='<li>'+dt+'</li>';
		});
		parseado+='</ul>';
	}
	parseado+='<p>damage: '+wea.damage+'</p>'+
	'<p>damagePerSecond: '+wea.damagePerSecond+'</p>'+
	'<p>totalDamage: '+wea.totalDamage+'</p>'+
	'<p>fireRate: '+wea.fireRate+'</p>'+
	'<p>secondsPerShot: '+wea.secondsPerShot+'</p>'+
	
	'<p>criticalChance: '+wea.criticalChance+'</p>'+
	'<p>criticalMultiplier: '+wea.criticalMultiplier+'</p>'+

	'<p>procChance: '+wea.procChance+'</p>'+
	'<p>chargeAttack: '+wea.chargeAttack+'</p>'+
	(wea.spinAttack!=0?'<p>spinAttack: '+wea.spinAttack+'</p>':'')+
	(wea.leapAttack!=0?'<p>leapAttack: '+wea.leapAttack+'</p>':'')+
	(wea.wallAttack!=0?'<p>wallAttack: '+wea.wallAttack+'</p>':'')+

	'<p>slot: '+wea.slot+'</p>'+
	""
	if(wea.components!=undefined){
		//console.log(war.name,war.components);
		parseado+=generateComponentsHTML(wea.components,new Date().getTime()+wea.category+wea.name,wea.name);
	}
		
	if(wea.patchlogs!=undefined){
		parseado+=generatePatchlogsHTML(wea.patchlogs,new Date().getTime()+wea.category+wea.name,wea.name);
	}
	parseado+="</div><hr>"
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
	var vaulted='';
	if(war.vaulted!=undefined){
		vaulted=(war.vaulted==true?'"profilerVaulted"':'');
	}
	var parseado="<div class="+vaulted+"><h4>"+war.name+(vaulted==''?'':' [VAULTED] ')+" (<a href="+war.wikiaUrl+" target="+'"blank"'+">wiki</a>)</h4>"+
	(showAllImages==true&&war.wikiaThumbnail!=undefined?'<img src='+war.wikiaThumbnail+'>':'')+
	'<p>Description: '+war.description+'</p>'+
	'<p>Aura: '+war.aura+'</p>'+
	'<p>Introduced: '+war.introduced+'</p>';
	if(war.polarities!=undefined){
		parseado+=generatePolaritiesHTML(war.polarities,new Date().getTime()+war.category+war.name,war.name);
	}
	parseado+='<p>Mastery: '+war.masteryReq+'</p>'+
	'<p>Health: '+war.health+'</p>'+
	'<p>Shield: '+war.shield+'</p>'+
	'<p>Power: '+war.power+'</p>'+
	'<p>Sprint: '+war.sprint+'</p>'+
	'<p>Tradeable: '+(war.tradable!=undefined?war.tradable:false)+'</p>'+
	(war.buildTime!=undefined?'<p>Build Time: '+war.buildTime/60/60+" hs"+'</p>':"")+
	(war.skipBuildTimePrice!=undefined?'<p>skipBuildTimePrice: '+war.skipBuildTimePrice+'</p>':"")+
	(war.vaulted!=undefined?'<p>Vaulted:'+war.vaulted+'</p>':"");
	//"<img src="+war.wikiaThumbnail+">"+"|";
	if(war.components!=undefined){
		parseado+=generateComponentsHTML(war.components,new Date().getTime()+war.category+war.name,war.name);
	}
	
	if(war.patchlogs!=undefined){
		parseado+=generatePatchlogsHTML(war.patchlogs,new Date().getTime()+war.category+war.name,war.name);
	}
	parseado+='</div><hr>';
	return parseado;
}

function generatePatchlogsHTML(pl,id,nombre,hidden=true){
	var parseado='';
	id="patchlogs"+id;
	
	parseado+="<h4 onclick="+'"toggleHide('+"'"+id+"'"+");"+'">🌑 Patchlogs de '+nombre+' ['+pl.length+"] [&Uacute;ltimo: "+dateToString(pl[0].date)+"]</h4>";
	parseado+='<ul id="'+id+'" class="'+(hidden?'hidden':'')+'">';
	parseado+='<div>';
	pl.forEach(function (p){
		parseado+="<li><a href='"+p.url+"' target='blank'<h5>("+dateToString(p.date)+") "+p.name+"</h5></a>";
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
	
	parseado+="<h4 onclick="+'"toggleHide('+"'"+id+"'"+");"+'">🌑 Componentes de '+nombre+' ['+comp.length+"]</h4>";
	parseado+='<ul id="'+id+'" class="'+(hidden?'hidden':'')+'">';
	parseado+='<div>';
	comp.forEach(function (p){
		var linkWM=' <a href="https://warframe.market/items/'+strReplaceAll(nombre.toLowerCase()+' '+p.name.toLowerCase()," ","_")+'" target="blank">(Tradeable, Link a WM)</a>';
		parseado+='<li><h4 class="'+(p.tradable?'tradable':'noTradable')+'">'+p.name+" ["+p.itemCount+"]"+(p.tradable?linkWM:'')+"</h4>";
		parseado+="<p>"+p.description+"</p>";
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
	
	parseado+="<h4 onclick="+'"toggleHide('+"'"+id+"'"+");"+'">🌑 Drops de '+nombre+' ['+drop.length+"]</h4>";
	parseado+='<ul id="'+id+'" class="'+(hidden?'hidden':'')+'">';
	parseado+='<div>';
	drop.forEach(function (p){
		parseado+='<li><p class="'+p.rarity+'">'+p.type+" - "+p.location+" - "+p.rarity+"</p></li>";
	});
	parseado+="</div></ul>";
	return parseado;
}

function generatePolaritiesHTML(polarityData,id,nombre,hidden=true){
	var parseado='';
	var parseadoFinal='';
	id="polarities"+id;
	var auxTitle="";
	parseado+='<ul id="'+id+'" class="'+(hidden?'hidden':'')+'">';
	parseado+='<div>';
	polarityData.forEach(function (pol){
		var resultPolarity="";
		polarities.forEach(function (polData){
			if(polData[0]==pol.toLowerCase()){
				resultPolarity='<span class="spanPolarity"><img src="'+polData[3]+'"></span> - '+ pol + ' ['+polData[1]+'] '+polData[2];
				auxTitle==""?auxTitle=polData[1]:auxTitle+=' - '+polData[1];
			}
		});
		parseado+='<li>'+resultPolarity+'</li>';
	});
	parseado+="</div></ul>";
	
	parseadoFinal="<h4 onclick="+'"toggleHide('+"'"+id+"'"+");"+'">🌑 Polarities de '+nombre+' ['+polarityData.length+' ('+auxTitle+")]</h4>"+parseado;
	return parseadoFinal;	
}
