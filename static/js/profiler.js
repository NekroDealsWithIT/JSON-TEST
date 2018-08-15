var weapons=[];
var warframes=[];
var prices=[];

var arrWeaponsType=[];
var arrWeaponsSubType=[];
var arrWeaponMastery=[];
var arrWeaponDamageType=[];
var arrWeaponRivenDisposition=[];

var arrWarframeMastery=[];

var showAllImages=false;

var we='weapons';
var wa='warframes';
var pr='prices';

var showVideos=false;
var videosArr=[
		{wf:'Khora', p:'jaK6cZk-Ris'},
		{wf:'Gara',	p:'UM0KhiQVOa0'},
		{wf:'Oberon', p:'bKUC9XyrhRQ', t:'Ij8Ql_RbdT8'},
		{wf:'Hydroid', p:'b9ZdmGmpPFY'},
		{wf:'Harrow', p:'p2HXpeUh2QY'},
		{wf:'Limbo', p:'Yaj_FuKkGWM'},
		{wf:'Octavia', p:'v2kzd1OCHXw'},
		{wf:'Nidus', p:'cmw4le23JX0'},
		{wf:'Titania', p:'Shm1Yvo2PHI'},
		{wf:'Inaros', p:'vYi1ETSjrFM'},
		{wf:'Nezha', p:'sPkSgfenxfo'},
		{wf:'Ivara', p:'22RpqR-nCCA'},
		{wf:'Wukong', p:'7n4bjy0PbxY'},
		{wf:'Saryn', p:'f0Ufldkykko', t:'qO4ldsvVbjA'},
		{wf:'Atlas', p:'oiLFg1dPum4'},
		{wf:'Equinox', p:'Ln-VsCtDVBU'},
		{wf:'Excalibur', p:'II8Up3NnZpI'},
		{wf:'Chroma', p:'tseneCFkq24'},
		{wf:'Mesa',	p:'29nFicujxn4'},
		{wf:'Mirage', p:'3U8mcBd6yE0', t:'LP9xH9hqC04'},
		{wf:'Zephyr', p:'KurbStEIqrQ'},
		{wf:'Ember', p:'MdM8nUNOASg'},
		{wf:'Valkyr', p:'K-jH6mP37_k', t:'9ubZLPNE4Lk'},
		{wf:'Trinity', p:'1dm7pNIHANo', t:'mtBCbdezpks'},
		{wf:'Nekros', p:'rOO5vS0BpoQ', t:'InN07z-8LwE'},
		{wf:'Ash', p:'wOakp4nbIzw', t:'fKfb8An3t90'},
		{wf:'Volt', p:'ccQ9456TTuo'},
		{wf:'Frost', p:'tecVALgPOFg'},
		{wf:'Nyx', p:'JoyQo38BZf4'},
		{wf:'Rhino', p:'24wDtcTwGvc'},
		{wf:'Nova', p:'TxJMDv4dYIU'},
		{wf:'Mag', p:'TS05wxbrNts'},
		{wf:'Banshee', p:'pJz7ZB0RLhY', t:'OUVNonCWIaM'},
		{wf:'Loki',	p:'VXsg-rMTvAM'},
		{wf:'Vauban', p:'pQgp_dfJ_oI', t:'lm6DS3IDYqI'}
	];

var polarities=[
		["madurai","V","(Damage, Powers) - Commonly dropped by Grineer.","https://vignette.wikia.nocookie.net/warframe/images/b/b2/Madurai_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001230"],
		["vazarin","D","(Defensive, Health, Armor) - Dropped by all factions.","https://vignette.wikia.nocookie.net/warframe/images/6/6f/Vazarin_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001231"],
		["naramon","Dash","(Utiliy, Misc.) - Commonly dropped by Corpus.","https://vignette.wikia.nocookie.net/warframe/images/6/60/Naramon_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001230"],
		["zenurik","Scratch","(Warframe Augments and Channeling Mods).","https://vignette.wikia.nocookie.net/warframe/images/8/8c/Zenurik_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001231"],
		["unairu","R","Introduced in Update 13.0 and used for certain Melee Stance Mods.","https://vignette.wikia.nocookie.net/warframe/images/6/61/Unairu_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001230"],
		["penjaga","Y","(Companion Abilities) - Dropped by all factions.","https://vignette.wikia.nocookie.net/warframe/images/5/5f/Penjaga_Pol.svg/revision/latest/scale-to-width-down/20?cb=20150301001230"],
		["umbra","U","(Anti-Sentient Mods) - Obtained upon completion of The Sacrifice.","https://vignette.wikia.nocookie.net/warframe/images/a/a8/Umbra_Pol.png/revision/latest/scale-to-width-down/20?cb=20180615163632"]
	];

var imagesDamageTypes={
	'impact':'https://vignette.wikia.nocookie.net/warframe/images/c/c9/Impact_b.svg/revision/latest/scale-to-width-down/18?cb=20150811174304',
	'puncture':'https://vignette.wikia.nocookie.net/warframe/images/8/89/Puncture_b.svg/revision/latest/scale-to-width-down/18?cb=20150810075255',
	'slash':'https://vignette.wikia.nocookie.net/warframe/images/5/54/Slash_b.svg/revision/latest/scale-to-width-down/18?cb=20150811174234',
	'cold':'https://vignette.wikia.nocookie.net/warframe/images/1/11/Cold_b.png/revision/latest/scale-to-width-down/18?cb=20140124221425',
	'electricity':'https://vignette.wikia.nocookie.net/warframe/images/c/c6/Electricity_b.png/revision/latest/scale-to-width-down/18?cb=20140124221426',
	'heat':'https://vignette.wikia.nocookie.net/warframe/images/8/88/Heat_b.png/revision/latest/scale-to-width-down/18?cb=20140124221428',
	'toxin':'https://vignette.wikia.nocookie.net/warframe/images/5/57/Toxin_b.png/revision/latest/scale-to-width-down/18?cb=20140124221459',
	'blast':'https://vignette.wikia.nocookie.net/warframe/images/f/f0/Blast_b.png/revision/latest/scale-to-width-down/18?cb=20140124221425',
	'corrosive':'https://vignette.wikia.nocookie.net/warframe/images/f/fc/Corrosive_b.png/revision/latest/scale-to-width-down/18?cb=20140124221426',
	'gas':'https://vignette.wikia.nocookie.net/warframe/images/4/43/Gas_b.png/revision/latest/scale-to-width-down/18?cb=20140124221427',
	'magnetic':'https://vignette.wikia.nocookie.net/warframe/images/6/64/Magnetic_b.png/revision/latest/scale-to-width-down/18?cb=20140124221429',
	'radiation':'https://vignette.wikia.nocookie.net/warframe/images/7/76/Radiation_b.png/revision/latest/scale-to-width-down/18?cb=20140124221430',
	'viral':'https://vignette.wikia.nocookie.net/warframe/images/4/45/Viral_b.png/revision/latest/scale-to-width-down/18?cb=20140124221459',
	'true':'https://vignette.wikia.nocookie.net/warframe/images/7/75/LotusBlack.png/revision/latest/scale-to-width-down/18?cb=20140311074920',
	'void':'https://vignette.wikia.nocookie.net/warframe/images/5/57/VoidTearIcon_b.png/revision/latest/scale-to-width-down/18?cb=20160713085454'
};
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
			arrWeaponsSubType=[];
			arrWeaponDamageType=[];
			arrWeaponRivenDisposition=[];
			var selectedType='all';
			var selectedSubType='all';
			var selectedMastery='all';
			var selectedDamageType='all';
			var selectedRivenDisposition='all';
			if(combosWeapons.innerHTML!=''){
				selectedType=weaponTipo.value;
				selectedSubType=weaponSubTipo.value;
				selectedMastery=weaponMastery.value;
				selectedDamageType=weaponDamageType.value;
				selectedRivenDisposition=weaponRivenDisposition.value;
			}

			var wn=txtWeaponName.value.toUpperCase();
			var counter=0;

			weapons.forEach(function (weapon){
				let wpnRadioVaulted=true;	
				let wpnRadioSentinel=true;	
				let wpnRadioNoise=true;
				let wpnDamageType=true;
				let wpnRivenDisposition=true;

				wpnRadioVaulted=getRadioSelectedByName('wpnVaulted');
				if(wpnRadioVaulted=='all'){
					wpnRadioVaulted=true;
				}else{
					switch(wpnRadioVaulted){
					case 'vaultedExclusive':
						if(weapon.vaulted==false&&weapon.vaulted!=undefined){
							wpnRadioVaulted=false;
						}else{
							wpnRadioVaulted=(weapon.vaulted!=undefined?true:false);
							console.log(weapon);
						}
						break;
					case 'vaultedHide':
						if(weapon.vaulted==false&&weapon.vaulted!=undefined){
							wpnRadioVaulted=true;
						}else{
							wpnRadioVaulted=false;
						}
						break;
					default:
					}
				}

				wpnRadioSentinel=getRadioSelectedByName('wpnSentinel');
				if(wpnRadioSentinel=='all'){
					wpnRadioSentinel=true;
				}else{
					switch(wpnRadioSentinel){
					case 'sentinelExclusive':
						if(weapon.sentinel==false){
							wpnRadioSentinel=false;
						}else{
							wpnRadioSentinel=true;
						}
						break;
					case 'sentinelHide':
						if(weapon.sentinel==false){
							wpnRadioSentinel=true;
						}else{
							wpnRadioSentinel=false;
						}
						break;
					default:
					}
				}

				wpnRadioNoise=getRadioSelectedByName('wpnNoise');
				if(wpnRadioNoise=='all'){
					wpnRadioNoise=true;
				}else{
					switch(wpnRadioNoise){
					case 'noiseSilent':
						if(weapon.noise=='Silent'||weapon.noise==undefined){
							wpnRadioNoise=true;
						}else{
							wpnRadioNoise=false;
						}
						break;
					case 'noiseAlarming':
						if(weapon.noise=='Alarming'){
							wpnRadioNoise=true;
						}else{
							wpnRadioNoise=false;
						}
						break;
					default:
					}
				}

				if(selectedDamageType=='all'){
					wpnDamageType=true;
				}else{
					if(weapon.damageTypes!=undefined&&selectedDamageType in weapon.damageTypes){
						wpnDamageType=true;
					}else{
						wpnDamageType=false;
					}
				}

				if(selectedRivenDisposition=='all'){
					wpnRivenDisposition=true;
				}else{
					if(weapon.disposition!=undefined&&weapon.disposition==selectedRivenDisposition){
						wpnRivenDisposition=true;
					}else{
						wpnRivenDisposition=false;
					}
				}

				if(
					(wpnRivenDisposition==true)&&
					(wpnDamageType==true)&&
					(wpnRadioVaulted==true)&&
					(wpnRadioSentinel==true)&&
					(wpnRadioNoise==true)&&
					(weapon.name.toUpperCase().indexOf(wn)>-1)&&
					//(weapon.sentinel==false||(weapon.sentinel&&!weaponsOcultarSentinelas))&&
					(selectedType=='all'||selectedType==(weapon.category))&&
					(selectedSubType=='all'||selectedSubType==(weapon.type))&&
					(selectedMastery=='all'||selectedMastery==(weapon.masteryReq))
				){
					arrWeaponMastery.push(weapon.masteryReq);
					arrWeaponsType.push(weapon.category);
					arrWeaponsSubType.push(weapon.category+'|'+weapon.type);
					if(weapon.damageTypes!=undefined){
						for (var key in weapon.damageTypes) {
							arrWeaponDamageType.push(key);
						};
					}
					weapon.disposition!=undefined?arrWeaponRivenDisposition.push(weapon.disposition):'';

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
			arrWeaponsSubType=arrayUnique(arrWeaponsSubType).sort();
			arrWeaponDamageType=arrayUnique(arrWeaponDamageType).sort();
			arrWeaponRivenDisposition=arrayUnique(arrWeaponRivenDisposition).sort();

			generalTabSelectorWeapons.innerText='Armas ['+counter+']';

			document.getElementById(tabGroupName+'ShowAllTab').click();
			refreshWeaponsCombos();
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

			var selectedMastery='all';
			if(combosWarframes.innerHTML!=''){
				selectedMastery=warframeMastery.value
			}

			warframes.forEach(function (warframe){
				let warRadioVaulted=getRadioSelectedByName('warVaulted');

				if(warRadioVaulted=='all'){
					warRadioVaulted=true;
				}else{
					switch(warRadioVaulted){
					case 'vaultedHide':
						if(warframe.vaulted==false||warframe.vaulted==undefined){
							warRadioVaulted=true;
						}else{
							warRadioVaulted=false;
						}
						break;
					case 'vaultedExclusive':
						if(warframe.vaulted==true){
							warRadioVaulted=true;
						}else{
							warRadioVaulted=false;
						}
						break;
					default:
					}
				}


				if((warframe.name.toUpperCase().indexOf(wn)>-1)&&
					(warRadioVaulted==true)&&
					(selectedMastery=='all'||selectedMastery==(warframe.masteryReq))){
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

			refreshWarframeCombos();
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
	let vaulted='';
	if(wea.vaulted!=undefined){
		vaulted=(wea.vaulted==true?' profilerVaulted':'');
	}

	let rivenRadios='';
	for(i=1;i<=wea.disposition;i++){
		rivenRadios+=' 🌑 ';
	}
	
	let masteryRadios='';
	for(i=1;i<=wea.masteryReq;i++){
		masteryRadios+=' 🌑 ';
	}

	var parseado='<div class="tabFrame'+vaulted+'"'+"><h4>"+wea.name+(vaulted==''?'':' [VAULTED] ')+(wea.sentinel==false?'':' [SENTINEL] ')+" (<a href="+wea.wikiaUrl+" target="+'"blank"'+">wiki</a>)</h4>";
	(showAllImages==true&&wea.wikiaThumbnail!=undefined?parseado+='<img class="imgWeapon" src='+wea.wikiaThumbnail+'>':'');
	parseado+='<p>Description: '+wea.description+'</p>'+
	'<p>Category: '+wea.category+'</p>'+
	'<p>Type: '+wea.type+'</p>'+
	'<p>Mastery Req: ('+wea.masteryReq+') '+masteryRadios+'</p>'+
	// '<p>Sentinel: '+wea.sentinel+'</p>'+
	'<p>Riven Disposition: '+'('+wea.disposition+') '+rivenRadios+'</p>';
	if(wea.polarities!=undefined&&wea.polarities.length>0){
		parseado+=generatePolaritiesHTML(wea.polarities,new Date().getTime()+wea.category+wea.name,wea.name);
	}
	parseado+='<p>Noise: '+wea.noise+'</p>'+
	
	(wea.buildTime!=undefined?'<p>Build Time: '+wea.buildTime/60/60+" hs"+'</p>':"")+
	(wea.buildTime!=undefined?'<p>Skip Build Time: '+wea.skipBuildTimePrice+" plat"+'</p>':"")+

	(wea.proyectile!=undefined?'<p>Proyectile:'+wea.proyectile/60/60+" hs"+'</p>':"")+
	'<p>Accuracy: '+wea.accuracy+'</p>'+
	(wea.ammo!=undefined?'<p>Ammo:'+wea.ammo+'</p>':"")+
	'<p>Magazine Size: '+wea.magazineSize+'</p>'+
	'<p>Reload Time: '+wea.reloadTime+'</p>'+
	'<p>Trigger: '+wea.trigger+'</p>';
	
	if(wea.damageTypes!=undefined){
		parseado+='<h4>DamageTypes</h4><ul>';
		for (var key in wea.damageTypes) {
			parseado+='<li><span class="spanPolarity"><img src="'+imagesDamageTypes[key]+'"></span> '+key.toUpperCase()+': '+wea.damageTypes[key]+'</li>';
		};
		parseado+='</ul>';
	}
	parseado+='<p>Damage: '+wea.damage+'</p>'+
	'<p>Damage Per Second: '+wea.damagePerSecond+'</p>'+
	'<p>Total Damage: '+wea.totalDamage+'</p>'+
	'<p>Fire Rate: '+wea.fireRate+'</p>'+
	'<p>Seconds Per Shot: '+wea.secondsPerShot+'</p>'+
	
	'<p>Critical Chance: '+Math.round(wea.criticalChance*100)+'%</p>'+
	'<p>Critical Multiplier: '+wea.criticalMultiplier+'</p>'+

	'<p>Proc Chance: '+Math.round(wea.procChance*100)+'%</p>'+
	(wea.chargeAttack!=0?'<p>Charge Attack: '+wea.chargeAttack+'</p>':'')+
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
		vaulted=(war.vaulted==true?' profilerVaulted':'');
	}
	var parseado='<div class="tabFrame'+vaulted+'"'+"><h4>"+war.name+(vaulted==''?'':' [VAULTED] ')+" (<a href="+war.wikiaUrl+" target="+'"blank"'+">wiki</a>)</h4>"+
	(showAllImages==true&&war.wikiaThumbnail!=undefined?'<img class="imgWarframe" src='+war.wikiaThumbnail+'>':'')+
	'<p>Description: '+war.description+'</p>'+
	'<p>Aura: '+war.aura+'</p>'+
	'<p>Introduced: '+war.introduced+'</p>';
	if (showVideos==true){
		videosArr.forEach(v=>{
			if(v.wf.indexOf(war.name)>-1||(v.wf+' Prime').indexOf(war.name)>-1||(v.wf+' Umbra').indexOf(war.name)>-1){
				if (v.t!=undefined&&v.t!=''){
					parseado+="<h4>Teaser</h4>";
					parseado+='<p class="video"><iframe width="100%" height="400" src="https://www.youtube-nocookie.com/embed/'+v.t+'?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></p>';
				}
				if (v.p!=undefined&&v.p!=''){
					parseado+="<h4>Profile</h4>";
					parseado+='<p class="video"><iframe width="100%" height="400" src="https://www.youtube-nocookie.com/embed/'+v.p+'?rel=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></p>';
				}
			}
		})
	}
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


function refreshWeaponsCombos(){
	let parseado='';
	let selectedType='all';
	let selectedSubType='all';
	let selectedMastery='all';
	let selectedDamageType='all';
	let selectedRivenDisposition='all';

	if (combosWeapons.innerHTML!=''){
		/*
			comboRemoveAllOptions(comboID,preservarSeleccionado=false)
			comboAddOption(comboID,text,value,selected=false)
		*/
		selectedType=weaponTipo.value;
		selectedSubType=weaponSubTipo.value;
		selectedMastery=weaponMastery.value;
		selectedDamageType=weaponDamageType.value;
		selectedRivenDisposition=weaponRivenDisposition.value;
	}

	combosWeapons.innerHTML='<ul>';
	combosWeapons.innerHTML+='<li>Tipo:<select id="weaponTipo" class="field-split" onchange="redrawItems(we);"></li><br>';
	combosWeapons.innerHTML+='<li>SubTipo:<select id="weaponSubTipo" class="field-split" onchange="redrawItems(we);"></li><br>';
	combosWeapons.innerHTML+='<li>Riven Disposition:<select id="weaponRivenDisposition" class="field-split" onchange="redrawItems(we);"></li><br>';
	combosWeapons.innerHTML+='<li>Mastery Req:<select id="weaponMastery" class="field-split" onchange="redrawItems(we);"></li><br>';
	combosWeapons.innerHTML+='<li>Damage Type:<select id="weaponDamageType" class="field-split" onchange="redrawItems(we);"></li><br>';
	combosWeapons.innerHTML+='</ul>'
	
	comboAddOption("weaponTipo",'All','all',true);
	arrWeaponsType=["Primary", "Secondary","Melee"]
	arrWeaponsType.forEach(wt=>{
		let selected= (wt==selectedType?true:false);
		comboAddOption("weaponTipo",wt,wt,selected);
	});

	comboAddOption("weaponSubTipo",'All','all',true);
	arrWeaponsSubType.forEach(swt=>{
		let realSwt=pipedStringToArray(swt)
		if(realSwt[0]==selectedType||selectedType=='all'){
			let selected= (realSwt[1]==selectedSubType?true:false);
			comboAddOption("weaponSubTipo",realSwt[1],realSwt[1],selected);
		}
	});

	comboAddOption("weaponMastery",'All','all',true);
	arrWeaponMastery.forEach(wm=>{
		let selected= (wm==selectedMastery?true:false);
		comboAddOption("weaponMastery",wm,wm,selected);
	});

	comboAddOption("weaponDamageType",'All','all',true);
	arrWeaponDamageType.forEach(dt=>{
		let selected= (dt==selectedDamageType?true:false);
		comboAddOption("weaponDamageType",dt.toUpperCase(),dt,selected);
	});

	comboAddOption("weaponRivenDisposition",'All','all',true);
	arrWeaponRivenDisposition.forEach(rd=>{
		console.log(rd);
		let selected=(rd==selectedRivenDisposition?true:false);
		comboAddOption("weaponRivenDisposition",rd,rd,selected);
	});
}

function refreshWarframeCombos(){
	let parseado='';
	let selectedMastery='all';

	if (combosWarframes.innerHTML!=''){
		selectedMastery=warframeMastery.value;
	}

	combosWarframes.innerHTML='<ul>';
	combosWarframes.innerHTML+='<li>MasteryReq:<select id="warframeMastery" class="field-split" onchange="redrawItems(wa);"></li><br>';
	combosWarframes.innerHTML+='</ul>'

	comboAddOption("warframeMastery",'All','all',true);
	arrWarframeMastery.forEach(wm=>{
		let selected= (wm==selectedMastery?true:false);
		comboAddOption("warframeMastery",wm,wm,selected);
	});

}