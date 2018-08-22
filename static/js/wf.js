/*
	Pequeña cajita de herramientas para la pagina de wf
	*/
/*
	Variables globales
	*/
	var timerCopy=0
	var timersWindow=undefined;

	var estadosDesarrollo=['analisis','desarrollo','test','prod','pruebas','completo','bug','rollback'];
	var trabajandoEn=[
	[3,'12-06-2018 Migre el manejo del desarrollo a trello!']
	];
	
	let notificationStatus={};
	let notificationTimers=[50,30,20,10,5,2,1,-5,-10];

	let carouselItems=[];

	const persistentEnemiesProfiles={
		'angst':'https://vignette.wikia.nocookie.net/warframe/images/e/ec/StrikerAcolyte.png',
		'malice':'https://vignette.wikia.nocookie.net/warframe/images/1/1b/HeavyAcolyte.png',
		'mania':'https://vignette.wikia.nocookie.net/warframe/images/a/a9/RogueAcolyte.png',
		'misery':'https://vignette.wikia.nocookie.net/warframe/images/1/19/AreaCasterAcolyte.png',
		'torment':'https://vignette.wikia.nocookie.net/warframe/images/3/38/ControlAcolyte.png',
		'violence':'https://vignette.wikia.nocookie.net/warframe/images/5/56/DuellistAcolyte.png',
	}

	const p_r={
		'MiArIDE=':'3',
		'MiArIDg=':'10',
		'MiB5IDI=':'4',
		'NCAmIDI=':'6',
		'NiArIDI=':'8',
		'OCArIDg=':'16'
	};
	function mAq(p='',r=''){if(r==''){q=Object.keys(p_r);return atob(q[randBetween(1,q.length,1)-1]);}else{return (p_r[btoa(p)]==r?1:0)}};
	function submitMe(){
		if(
			(mAq(calculoQ.innerText,calculoR.value)==1)&&
			formNombre.checkValidity()&&
			(document.getElementsByName('email')[0]).checkValidity()&&
			(document.getElementsByName('asunto')[0]).checkValidity()&&
			(document.getElementsByName('mensaje')[0]).checkValidity()){
				/*
				fetch("https://nekro-warframe.000webhostapp.com/",{body: contactMe,mode:"no-cors",method: "post"})
				.then(()=>{
					toggleHide("camposForm");
					toggleHide("soon");
				})
				.catch((err)=>{
					console.log(err)
				})
				.finally(()=>{
					toggleHide("camposForm");
					toggleHide("soon");				
				});
				*/
				var formData = new FormData();

				formData.append("nombre", (formNombre.value));
				formData.append("email", (document.getElementsByName('email')[0]).value);
				formData.append("asunto", (document.getElementsByName('asunto')[0]).value);
				formData.append("mensaje", (document.getElementsByName('mensaje')[0]).value);
				formData.append("tipo",getRadioSelectedByName('tipo'));

				var request = new XMLHttpRequest();
				request.open("POST", "https://nekro-warframe.000webhostapp.com/");
				request.send(formData);
				toggleHide("camposForm");
				toggleHide("soon");				

		}else{
			errorPQ.innerText=mAq(calculoQ.innerText,calculoR.value)!=1?'Captcha incorrecto (srsly?)':'Revisa los campos con marco rojo';
		}
		
	}

	//http://warframe.wikia.com/wiki/Star_Chart
	const planetas={
		'timeStamp':'2018-08-10',
		'Mercury':{'level':'6 - 11','faction':'Grineer','boss':'Vor','bossLocation':'Tolstoj','drops':['Morphics','Ferrite','Polymer Bundle','Detonite Ampule']},
		'Venus':{'level':'3 - 18','faction':'Corpus','boss':'Jackal','bossLocation':'Fossa','drops':['Alloy Plate','Polymer Bundle','Circuits','Fieldron Sample']},
		'Earth':{'level':'1 - 25','faction':'Grineer','boss':'Vay Hek','bossLocation':'Oro','drops':['Ferrite','Rubedo','Neurodes','Detonite Ampule']},
		'Lua':{'level':'25 - 30','faction':'Sentient','boss':'n/a','bossLocation':'n/a','drops':['Ferrite','Rubedo','Neurodes','Detonite Ampule']},
		'Mars':{'level':'8 - 20','faction':'Grineer','boss':'Lieutenant Lech Kril','bossLocation':'War','drops':['Morphics','Salvage','Gallium','Fieldron Sample']},
		'Phobos':{'level':'10 - 25','faction':'Corpus','boss':'The Sergeant','bossLocation':'Iliad','drops':['Rubedo','Morphics','Plastids','Alloy Plate']},
		'Ceres':{'level':'12 - 25','faction':'Grineer','boss':'Lech Kril & Vor','bossLocation':'Exta','drops':['Alloy Plate','Circuits','Orokin Cell','Detonite Ampule']},
		'Jupiter':{'level':'15 - 30','faction':'Corpus','boss':'Alad V','bossLocation':'Themisto','drops':['Salvage','Fieldron Sample','Neural Sensors','Alloy Plate']},
		'Europa':{'level':'18 - 33','faction':'Corpus','boss':'Raptors','bossLocation':'Naamah','drops':['Morphics','Rubedo','Fieldron Sample','Control Module']},
		'Saturn':{'level':'21 - 36','faction':'Grineer','boss':'Sargas Ruk','bossLocation':'Tethys','drops':['Nano Spores','Plastids','Orokin Cell','Detonite Ampule']},
		'Uranus':{'level':'24 - 37','faction':'Grineer','boss':'Tyl Regor','bossLocation':'Titania','drops':['Polymer Bundle','Plastids','Gallium','Detonite Ampule']},
		'Neptune':{'level':'27 - 40','faction':'Corpus','boss':'Hyena Pack','bossLocation':'Psamathe','drops':['Nano Spores','Ferrite','Control Module','Fieldron Sample']},
		'Pluto':{'level':'30 - 45','faction':'Corpus','boss':'Ambulas','bossLocation':'Hades','drops':['Alloy Plate','Rubedo','Plastids','Morphics','Fieldron Sample']},
		'Sedna':{'level':'30 - 85','faction':'Grineer','boss':'Kela De Thaym','bossLocation':'Merrow','drops':['Rubedo','Alloy Plate','Salvage','Detonite Ampule']},
		'Kuva Fortress':{'level':'28 - 34','faction':'Grineer','boss':'n/a','bossLocation':'n/a','drops':['Salvage','Circuits','Neural Sensors','Detonite Ampule']},
		'Eris':{'level':'30 - 45','faction':'Infestation','boss':'Mutalist Alad V or Jordas Golem','bossLocation':'Requires key','drops':['Nano Spores','Plastids','Neurodes','Mutagen Sample']},
		'Orokin Derelict':{'level':'25 - 35','faction':'Infestation','boss':'Lephantis','bossLocation':'Requires Key','drops':['Nano Spores','Mutagen Sample','Orokin Cell','Neurodes']},
		'Void':{'level':'10 - 45','faction':'Orokin','boss':'Corrupted Vor','bossLocation':'any node of Level ≥40','drops':['Ferrite','Rubedo','Argon Crystal','Control Module']}
	}

	
	const compressedURL=[
		{id:'@1@',url:'https://i.imgur.com'},
		{id:'@2@',url:'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources'},
		{id:'@3@',url:'https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources'},
		{id:'@4@',url:'static/img/factions'}
	];

	const compressedItemName=[
		{i:'@1@',t:'Blueprint'},
		{i:'@2@',t:'Helmet '},
		{i:'@3@',t:'Aura'},
		{i:'@4@',t:'Systems '},
		{i:'@5@',t:'Orokin Catalyst'},
		{i:'@6@',t:'Orokin Reactor'},
		{i:'@7@',t:'Exilus Adapter '},
		{i:'@8@',t:'Detonite Injector'},
		{i:'@9@',t:'Fieldron'},
		{i:'@a@',t:'Mutagen Mass'},
		{i:'@b@',t:'Endo'},
		{i:'@c@',t:'Kubrow Egg'},
		{i:'@d@',t:'Skin'},
		{i:'@e@',t:'Baro'},
		{i:'@f@',t:'Booster'},
		{i:'@g@',t:'Syandana'},
		{i:'@h@',t:'Scavenger'},
		{i:'@i@',t:'Stock'},
		{i:'@j@',t:'Barrel'},
		{i:'@k@',t:'Receiver'},
		{i:'@l@',t:'Hilt'},
		{i:'@m@',t:'Wraith'},
		{i:'@n@',t:'Vandal'},
		{i:'@o@',t:'Prisma'},
		{i:'@p@',t:'Mutalist Alad V Nav Coordinate'},
		{i:'@q@',t:'Dagger'},
		{i:'@r@',t:'Sword'}
	];

	const compressedItemType=[
		{i:'@1@',t:'nightmare'},
		{i:'@2@',t:'aura'},
		{i:'@3@',t:'helmet'},
		{i:'@4@',t:'weapon'},
		{i:'@5@',t:'invasion'},
		{i:'@6@',t:'forma'},
		{i:'@7@',t:'skin'},
		{i:'@8@',t:'catalyst'},
		{i:'@9@',t:'kubrowEgg'},
		{i:'@a@',t:'morphics'},
		{i:'@b@',t:'resource'},
		{i:'@c@',t:'vauban'},
		{i:'@d@',t:'synthula'},
		{i:'@f@',t:'plastis'},
		{i:'@g@',t:'controlModule'},
		{i:'@h@',t:'baro'},
		{i:'@i@',t:'circuits'},
		{i:'@j@',t:'oxium'},
		{i:'@k@',t:'polymerBundle'},
		{i:'@l@',t:'orokinCell'},
		{i:'@m@',t:'rubedo'},
		{i:'@n@',t:'ferrite'},
		{i:'@o@',t:'alloyPlate'},
		{i:'@p@',t:'gallium'},
		{i:'@q@',t:'gallium'},
		{i:'@r@',t:'nanoSpores'},
		{i:'@s@',t:'endo'},
		{i:'@t@',t:'argonCrystal'},
		{i:'@u@',t:'neuralSensors'},
		{i:'@v@',t:'nitain'},
		{i:'@w@',t:'credits'},
		{i:'@x@',t:'salvage'},
		{i:'@y@',t:'traces'},
		{i:'@z@',t:'tellurium'},
		{i:'@A@',t:'plastids'},
		{i:'@B@',t:'reactor'},
		{i:'@C@',t:'orokinCell'},
		{i:'@D@',t:'kavatGene'}
	];

	var platform='';

	var fetching=false;
	var fetchingDrops=false;
	var firstRun=true;
	var resultJson='';
	var resultJsonDrops='';
	var dropsEncontrados=0;

	var availableNodes=[];
	var farmingMark=[];
	var farmingMarkComplete=[];
	var farmingOnlyNonCompleted=false;

	var missionTypesArr=[];
	var planetasArr=[];

	var notifOnlyActive=false;
	var notifOnlyNonCompleted=false;
	var notifShowLastDate=true;

	var setsToCheck=['vigilante','gladiator','blueprint','relic','augur'];

	var timer1='';
	var counter1=0;
	var counter1Max=60;

	var fetchingCounter=0;
	var fetchingCounterMax=30;

	var estadoTimerTiming=true;

	var completado=[];
	var informarArr=[];
	var informarArrChecked=[];
	var informarArrMostrar=[];

	var sounds=[];
	var selectedSounds=[];
	var elementActiveFocus='';

	var campeon;

// arrays activos
var alertaActivaArr=[];
var invasionActivaArr=[];
var sortieActivaArr=[];
var eventActivaArr=[];

// historico
var historicCachedData=[
{cachedType: "alloyPlate", cachedItem: "", cachedImgLink: "https://i.imgur.com/E8K3fOI.png", cachedTime: "Mon Jun 18 2018 00:11:55 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "argonCrystal", cachedItem: "", cachedImgLink: "https://i.imgur.com/DdJJYSB.png", cachedTime: "Mon Jun 18 2018 10:18:38 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Sniper Scavenger", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Tue Jul 24 2018 02:30:25 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Enemy Radar", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jul 22 2018 21:19:35 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Sprint Boost", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sat Jun 16 2018 14:01:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "aura", cachedItem: "Infested Impedance", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Mon Jun 18 2018 09:57:03 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Loot Detector", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Mon Jul 23 2018 09:00:43 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Rifle Amp", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Thu Jul 19 2018 14:09:16 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Steel Charge", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Mon Jul 23 2018 21:45:47 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Dead Eye", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jun 17 2018 00:45:25 GMT-0300 (Argentina Standard Time)"},
{cachedType: "aura", cachedItem: "Corrosive Projection", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Tue Jul 24 2018 09:11:05 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Shotgun Scavenger", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jul 22 2018 06:07:51 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Pistol Scavenger", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jun 17 2018 23:37:55 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Rejuvenation", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jun 10 2018 04:35:38 GMT-0300 (Argentina Standard Time)"},
{cachedType: "aura", cachedItem: "Rifle Scavenger", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jun 17 2018 21:31:31 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Energy Siphon", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jun 17 2018 20:13:10 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Shield Disruption", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Thu Jun 14 2018 15:27:21 GMT-0300 (Argentina Standard Time)"},
{cachedType: "aura", cachedItem: "Speed Holster", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Tue Jun 12 2018 16:16:30 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "3 Day Credit Booster", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Baro Visor", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Thermite Rounds", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Scattering Inferno", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Sands Of Inaros", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Scorch", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Prisma Sigil ", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Noggle Statue - Baro Ki teer", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Sonicor Exilis Skin", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Scimitar Prisma Skin", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Primed Continuity", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Prisma Naberus Arm Armor", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Prisma Hecate Syandana", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Volcanic Edge", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Baro Kiteer Sekhara", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Prisma Skana", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Twin Grakata Towsun Skin", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Prisma Grakata", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "catalyst", cachedItem: "Orokin Catalyst Blueprint", cachedImgLink: "https://i.imgur.com/C4X9NWm.png", cachedTime: "Tue Jun 12 2018 23:39:47 GMT-0300 (Argentina Standard Time)"},
{cachedType: "circuits", cachedItem: "", cachedImgLink: "https://i.imgur.com/OxJvWIx.png", cachedTime: "Sun Jun 17 2018 13:05:01 GMT-0300 (Argentina Standard Time)"},
{cachedType: "controlModule", cachedItem: "", cachedImgLink: "https://i.imgur.com/F1UUub1.png", cachedTime: "Sun Jun 17 2018 03:53:02 GMT-0300 (Argentina Standard Time)"},
{cachedType: "credits", cachedItem: "", cachedImgLink: "https://i.imgur.com/JCKyUXJ.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "endo", cachedItem: "100 Endo", cachedImgLink: "https://i.imgur.com/mS8oSwx.png", cachedTime: "Mon Jun 18 2018 09:08:42 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "endo", cachedItem: "80 Endo", cachedImgLink: "https://i.imgur.com/mS8oSwx.png", cachedTime: "Mon Jun 18 2018 09:08:42 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "endo", cachedItem: "150 Endo", cachedImgLink: "https://i.imgur.com/mS8oSwx.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "ferrite", cachedItem: "", cachedImgLink: "https://i.imgur.com/h93eVLr.png", cachedTime: "Sun Jun 17 2018 22:47:48 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "forma", cachedItem: "Forma Blueprint", cachedImgLink: "https://i.imgur.com/2b0FT3D.png", cachedTime: "Sun Jun 10 2018 15:33:21 GMT-0300 (Argentina Standard Time)"},
{cachedType: "gallium", cachedItem: "", cachedImgLink: "https://i.imgur.com/pvpc73S.png", cachedTime: "Mon Jun 18 2018 01:37:32 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Excalibur Pendragon Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jul 19 2018 21:39:53 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Zephyr Tengu Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 10 2018 10:59:42 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Mirage Trivelin Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 17:33:54 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Wukong Dasheng Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 15:47:58 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nezha Circa Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 10 2018 11:51:34 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Rhino Vanguard Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 10 2018 13:44:26 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Ember Backdraft Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jul 22 2018 04:25:58 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Khora Delphi Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jul 23 2018 19:36:57 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Excalibur Avalon Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 11:53:32 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Ivara Zirastra Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jul 23 2018 21:36:49 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Titania Aurai Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jul 22 2018 05:51:54 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Nyx Vespa Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jul 21 2018 02:55:54 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Trinity Aura Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 11 2018 14:08:40 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Trinity Meridian Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 11 2018 14:39:29 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Atlas Shikoro Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jul 24 2018 03:35:51 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Ash Locust Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 11 2018 19:41:41 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Hydroid Triton Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 11 2018 22:16:27 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Valkyr Kara Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 11 2018 22:59:54 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Chroma Drac Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 00:36:04 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Loki Swindle Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 01:29:38 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nova Flux Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jul 24 2018 06:19:16 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Rhino Thrak Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 05:26:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Atlas Tartarus Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 12:36:06 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Oberon Markhor Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 14:01:25 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Saryn Chlora Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 23:54:17 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Valkyr Bastet Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 15:24:40 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Inaros Anubis Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Fri Jul 20 2018 11:31:53 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Vauban Armistice Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jul 24 2018 12:20:06 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Volt Pulse Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 20:12:55 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Mirage Harlequin Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 21:59:11 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Mesa Longhorn Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jul 24 2018 19:33:22 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Excalibur Mordred Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jul 24 2018 22:13:12 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Vauban Esprit Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 23:47:41 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nezha Jinza Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jul 23 2018 01:52:21 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Banshee Chorus Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Chroma Amaru Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Wed Jul 25 2018 03:05:51 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Mag Gauss Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Wed Jul 25 2018 07:44:07 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Equinox Solstice Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 18 2018 01:23:37 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Mag Coil Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Wed Jul 25 2018 12:55:14 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Mesa Ovis Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Wed Jul 25 2018 19:30:41 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Nova Quantum Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Wed Jul 25 2018 20:02:47 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Banshee Reverb Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jul 23 2018 04:13:59 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Wukong Macak Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Saryn Hemlock Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jul 23 2018 06:05:37 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Nidus Prion Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 18:48:45 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Ivara Loxley Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 19:22:39 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Ash Scorpion Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 19:24:42 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Frost Squall Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jul 21 2018 18:24:05 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Loki Essence Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 04:21:42 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nekros Raknis Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 21:06:40 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Ember Phoenix Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 10 2018 04:50:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Inaros Canopic Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 10 2018 06:53:55 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Vauban Gambit Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 03:38:38 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Volt Storm Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 02:42:19 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Limbo Aristeas Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 01:40:02 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Harrow Suffragan Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 01:10:34 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Equinox Clisthert Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jul 23 2018 11:43:52 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Octavia Cadenza Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 23:33:35 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Frost Aurora Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Fri Jun 15 2018 23:29:24 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Zephyr Cierzo Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Fri Jun 15 2018 23:56:43 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nyx Menticide Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 01:39:22 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Hydroid Ketos Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jul 23 2018 14:42:05 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Nekros Shroud Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 22:28:44 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nova Slipstream Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 21:40:18 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Gara Virago Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 14:52:08 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Limbo Magrite Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 19:21:12 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Oberon Oryx Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 18:13:49 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Mutagen Mass", cachedImgLink: "https://i.imgur.com/vV7kzub.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Orokin Reactor Blueprint", cachedImgLink: "https://i.imgur.com/6Hm1BEq.png", cachedTime: "Wed Jul 25 2018 21:18:42 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "3 Fieldron", cachedImgLink: "https://i.imgur.com/qlrlfft.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Dera Vandal Blueprint", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Sat Jun 16 2018 14:01:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Wraith Twin Vipers Barrel", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Sat Jun 16 2018 14:01:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Orokin Reactor Blueprint", cachedImgLink: "https://i.imgur.com/6Hm1BEq.png", cachedTime: "Fri Jun 15 2018 09:41:15 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Exilus Adapter Blueprint", cachedImgLink: "https://i.imgur.com/eQNeNpY.png", cachedTime: "Fri Jun 15 2018 09:41:15 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Dera Vandal Receiver", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Fri Jun 15 2018 08:58:59 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Karak Wraith Receiver", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Fri Jun 15 2018 08:58:59 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Dera Vandal Stock", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Fri Jun 15 2018 08:58:59 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Latron Wraith Barrel", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Wraith Twin Vipers Blueprint", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Fri Jun 15 2018 08:58:59 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "3 Detonite Injector", cachedImgLink: "https://i.imgur.com/rV6lN4W.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Snipetron Vandal Blueprint", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Sheev Hilt", cachedImgLink: "", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Forma Blueprint", cachedImgLink: "https://i.imgur.com/2b0FT3D.png", cachedTime: "Sun Jun 10 2018 11:25:36 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "2 Mutagen Mass", cachedImgLink: "https://i.imgur.com/vV7kzub.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Snipetron Vandal Barrel", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Dera Vandal Barrel", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Latron Wraith Receiver", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Snipetron Vandal Stock", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Karak Wraith Blueprint", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Sheev Heatsink", cachedImgLink: "", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Sheev Blueprint", cachedImgLink: "", cachedTime: "Tue Jun 12 2018 22:35:55 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Mutalist Alad V Nav Coordinate", cachedImgLink: "https://i.imgur.com/96AWqr8.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Strun Wraith Barrel", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Snipetron Vandal Receiver", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Orokin Catalyst Blueprint", cachedImgLink: "https://i.imgur.com/C4X9NWm.png", cachedTime: "Sun Jun 10 2018 11:25:36 GMT-0300 (Argentina Standard Time)"},
{cachedType: "kavatGene", cachedImgLink: "https://i.imgur.com/ijVUmQV.png", cachedTime: "Sat Jul 21 2018 03:03:11 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "kubrowEgg", cachedItem: "Kubrow Egg", cachedImgLink: "https://i.imgur.com/Vv3LXnz.png", cachedTime: "Thu Jun 14 2018 11:33:00 GMT-0300 (Argentina Standard Time)"},
{cachedType: "morphics", cachedItem: "", cachedImgLink: "https://i.imgur.com/SF3XWd6.png", cachedTime: "Thu Jun 14 2018 17:11:24 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nanoSpores", cachedItem: "", cachedImgLink: "https://i.imgur.com/bb71Cy7.png", cachedTime: "Mon Jun 18 2018 09:08:42 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "neuralSensors", cachedItem: "", cachedImgLink: "https://i.imgur.com/Gq6cz9p.png", cachedTime: "Mon Jun 18 2018 10:39:30 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "nightmare", cachedItem: "Vigor", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Mon Jun 11 2018 12:19:30 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Fortitude", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Mon Jun 11 2018 01:22:56 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Ice Storm", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Tue Jul 24 2018 11:23:57 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "nightmare", cachedItem: "Blaze", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 10 2018 17:07:51 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Stunning Speed", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sat Jun 16 2018 16:10:34 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Constitution", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Wed Jun 13 2018 01:17:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Lethal Torrent", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 17 2018 15:34:40 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Wildfire", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Seeking Fury", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Tue Jun 12 2018 14:24:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Accelerated Blast", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 17 2018 17:33:54 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Armored Agility", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sat Jun 16 2018 16:09:34 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Shred", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 17 2018 18:43:46 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "nightmare", cachedItem: "Hammer Shot", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Wed Jul 25 2018 11:10:19 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "nightmare", cachedItem: "Animal Instinct", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Mon Jul 23 2018 15:00:02 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "nightmare", cachedItem: "Rending Strike", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Mon Jun 11 2018 13:19:21 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Focus Energy", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 10 2018 01:12:42 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nitain", cachedItem: "", cachedImgLink: "https://i.imgur.com/3Db4PHh.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "orokinCell", cachedItem: "", cachedImgLink: "https://i.imgur.com/tEQdoDE.png", cachedTime: "Sun Jun 17 2018 20:13:10 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "other", cachedItem: "Emp Aura", cachedImgLink: "", cachedTime: "Mon Jul 23 2018 01:04:19 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "oxium", cachedItem: "", cachedImgLink: "https://i.imgur.com/hY8NCjk.png", cachedTime: "Sun Jun 17 2018 15:12:10 GMT-0300 (Argentina Standard Time)"},
{cachedType: "plastids", cachedItem: "", cachedImgLink: "https://i.imgur.com/5yVfTEF.png", cachedTime: "Sun Jun 17 2018 03:02:40 GMT-0300 (Argentina Standard Time)"},
{cachedType: "polymerBundle", cachedItem: "", cachedImgLink: "https://i.imgur.com/pg8asnC.png", cachedTime: "Sun Jun 17 2018 18:55:13 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "reactor", cachedItem: "Orokin Reactor Blueprint", cachedImgLink: "https://i.imgur.com/6Hm1BEq.png", cachedTime: "Sat Jul 21 2018 14:20:15 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "resource", cachedItem: "", cachedImgLink: "https://i.imgur.com/Bq5TEPo.png", cachedTime: "Thu Jun 14 2018 20:16:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "riven", cachedItem: "Veiled Melee Riven Mod", cachedImgLink: "https://i.imgur.com/LoficZr.png", cachedTime: "Sat Jul 21 2018 16:12:07 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "rubedo", cachedItem: "", cachedImgLink: "https://i.imgur.com/gSO9ILf.png", cachedTime: "Sun Jun 17 2018 20:45:59 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "salvage", cachedItem: "", cachedImgLink: "https://i.imgur.com/3L7xLYg.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "skin", cachedItem: "Scindo Manticore Axe Skin Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/weapon_skin_thumb.png", cachedTime: "Mon Jul 23 2018 04:13:59 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "skin", cachedItem: "Brokk Hammer Skin Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/weapon_skin_thumb.png", cachedTime: "Tue Jun 12 2018 01:55:43 GMT-0300 (Argentina Standard Time)"},
{cachedType: "skin", cachedItem: "Dagger Zoren Skin Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/weapon_skin_thumb.png", cachedTime: "Sun Jun 17 2018 13:45:14 GMT-0300 (Argentina Standard Time)"},
{cachedType: "skin", cachedItem: "Dagger Axe Scindo Skin", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/weapon_skin_thumb.png", cachedTime: "Tue Jul 24 2018 22:57:29 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "synthula", cachedItem: "", cachedImgLink: "https://i.imgur.com/X0Lvfc9.png", cachedTime: "Sat Jun 16 2018 20:42:37 GMT-0300 (Argentina Standard Time)"},
{cachedType: "tellurium", cachedItem: "", cachedImgLink: "https://i.imgur.com/ocjnGU8.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "traces", cachedItem: "", cachedImgLink: "https://i.imgur.com/vvZGMPv.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "vauban", cachedItem: "Vauban Neuroptics Blueprint", cachedImgLink: "https://i.imgur.com/r5x0owi.png", cachedTime: "Wed Jul 25 2018 21:16:37 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "vauban", cachedItem: "Vauban Chassis Blueprint", cachedImgLink: "https://i.imgur.com/r5x0owi.png", cachedTime: "Sun Jun 17 2018 17:33:54 GMT-0300 (Argentina Standard Time)"},
{cachedType: "vauban", cachedItem: "Vauban Systems Blueprint", cachedImgLink: "https://i.imgur.com/r5x0owi.png", cachedTime: "Fri Jun 15 2018 00:30:23 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Jaw Sword Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Tue Jun 12 2018 19:48:54 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Dark Dagger Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Sun Jun 10 2018 08:16:15 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Heat Sword Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Thu Jun 14 2018 20:37:45 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Ceramic Dagger Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Sun Jun 10 2018 09:28:26 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Glaive Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Sat Jun 16 2018 16:58:24 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Heat Dagger Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Sun Jun 10 2018 18:55:31 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Dark Sword Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Sat Jun 16 2018 20:42:37 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Pangolin Sword Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Mon Jun 11 2018 18:08:30 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Plasma Sword Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Thu Jun 14 2018 18:02:20 GMT-0300 (Argentina Standard Time)"}
];

function onExit(){
	if(timersWindow!=undefined&&timersWindow!=''&&!timersWindow.closed){
		timersWindow.close();
	}
	//mato el speechSynthesis por si se da la casualidad de reinicio mientras que habla.
	speechSynthesis.cancel();
}

function getWFWorldstate(proxy=false){
	var dataJson=getJson(atob("aHR0cHM6Ly93cy53YXJmcmFtZXN0YXQudXMv")+platform,proxy);
	//var dataJson=getJson('http://www.pepito.com.ar'+platform,proxy);
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
		resultJson.news.reverse();
		arraySortByKey(resultJson.fissures,'tierNum',true);
		// por si se trabo
	    speechSynthesis.cancel();
		// checkear la version sino recargar la pagina
		versionCheck();
		//generar carousel
		generateCarousel(resultJson.news);
		calculoQ.innerText=mAq();
		fetching=false;
		if (firstRun){
			checkSystems();
		}
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
function informarStatusFetch(data){
	generateToast(data.title,data.body,"",5000,data.type);
}
function updateJsonDrops(proxy=false){
	drops.innerHTML='<img class="loading" src="static/img/loading.gif">';
	dropsDisable(true);
	dropsMetrics.innerText='';
	getJsonDrops(atob("aHR0cHM6Ly9kcm9wcy53YXJmcmFtZXN0YXQudXMvZGF0YS9hbGwuanNvbg=="),false);
}
function getJsonDrops(url='',viaCors=true){
	fetchingDrops=true;
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
		resultJsonDrops = request.response;
		fetchingDrops=false;
		habemusDrops();		  
		return request.response;
	}
}
function habemusDrops(){
	if(resultJsonDrops!=''){
		drops.innerHTML='';
		dropsDisable(false);
		var cantidadItems=resultJsonDrops.blueprintLocations.length
		cantidadItems+=resultJsonDrops.relics.length;
		cantidadItems+=resultJsonDrops.cetusBountyRewards.length
		cantidadItems+=resultJsonDrops.transientRewards.length;
		cantidadItems+=resultJsonDrops.blueprintLocations.length;
		cantidadItems+=resultJsonDrops.enemyBlueprintTables.length;
		cantidadItems+=resultJsonDrops.modLocations.length;
		cantidadItems+=resultJsonDrops.enemyModTables.length;
		cantidadItems+=resultJsonDrops.keyRewards.length;
		cantidadItems+=resultJsonDrops.miscItems.length;
		cantidadItems+=resultJsonDrops.sortieRewards.length;
		dropsMetrics.innerHTML='Cantidad de nodos cargados: '+(cantidadItems)+'<br>Ultimo update:<br>'+dateToString(new Date());
		getDropsComboLists();
		getFarmingMarks();
	}else{
		console.log('Hubo un error al buscar los drops');
	}
}
function getFarmingMarks(){
	farmingMark=pipedStringToArray(getCookie('farmingMark'));
	farmingMarkComplete=pipedStringToArray(getCookie('farmingMarkComplete'));
	llenarFarmingFocus();
}
function generateCarousel(data){
	if (data.length!=carouselItems.length){
		carouselItems=data;
		let imgDelay=5;
		let parseado='';
		let parseadoStyle='@keyframes carouselFadeInOut {0% {opacity:1;}17% {opacity:1;}25% { opacity:0;}92% { opacity:0;}100% {opacity:1;}}'+
							'#carousel {position:relative;height:50vh;margin:10px auto;margin-bottom:20vh}'+
							'#carousel div {width:100%;position:absolute;left:0;opacity:0;}'+
							'#carousel img {width:100%;height:50vh;position:absolute;left:0;}'+
							'#carousel div {animation-name: carouselFadeInOut;animation-timing-function: ease-in-out;animation-iteration-count: infinite;animation-duration: '+imgDelay*carouselItems.length+'s;}'
		let idSelector=0;
		carouselItems.forEach(n=>{
			if(n.imageLink!=undefined&&n.imageLink!=''){
				
				let d={};
				let tipoNews='';
				tipoNews+=n.primeAccess!=undefined&&n.primeAccess==true?' (PRIME ACCESS) ':'';
				tipoNews+=n.priority!=undefined&&n.priority==true?' (PRIORITY) ':'';
				tipoNews+=n.stream!=undefined&&n.stream==true?' (STREAM) ':'';
				tipoNews+=n.update!=undefined&&n.update==true?' (UPDATE) ':'';

				d.il=securizeUrl(n.imageLink);
				d.m=n.message;
				d.l=n.link;
				d.d=n.date;
				d.dId='carrouselDiv'+n.id;
				d.iId='carrouselImg'+n.id;

				parseado+='<div id="'+d.dId+'"><h4>['+(idSelector+1)+'] '+(tipoNews!=''?'<span class="infested">'+tipoNews+'</span> ':'')+d.m+'</h4><img id="'+d.iId+'" alt="'+d.m+'" src="'+d.il+'"></img></div>';
				
				let delay=imgDelay*idSelector+'s';
				parseadoStyle+='#'+d.dId+',#'+d.iId+'{animation-delay: '+delay+';}';

				idSelector++;
			}
		});
		carouselStyle.innerHTML+=parseadoStyle;
		carousel.innerHTML=parseado;
	}
}
function checkSystems(){
	if (firstRun){
		if(resultJson!=''){
			firstRun=false;
			//notificationGeneralSound.play();
			generateToast("Welcome back, Operator!","","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWlywyQP08F1llP_JfBsuvQbp4z6n6t2lxCr9G-C3liEviKzuC",5000,"info");
		}
	}
}

function getDropsComboLists(){
	planetasArr=[];
	missionTypesArr=[];
	dropsDisable(true);
	key0=resultJsonDrops.missionRewards;
	Object.keys(key0).forEach( function(key1) { 
		// Planeta
		planetasArr.push(key1);
		Object.keys(key0[key1]).forEach( function(key2) { 
			// Nodo
			var itemNodo=[key2];
			var itemNodeGameMode=key0[key1][key2]['gameMode'];
			var itemNodeIsEvent=key0[key1][key2]['isEvent'];

			missionTypesArr.push(itemNodeGameMode);
		});
	});

	// seteo las array para que tengan contenido unico
	planetasArr=arrayUnique(planetasArr);
	missionTypesArr=arrayUnique(missionTypesArr);

	// seteo a todos (defecto)
	formPlanetaMision.value="All";
	formTipoMision.value="All";

	// Remuevo todas las option
	comboRemoveAllOptions('formPlanetaMision',true);
	comboRemoveAllOptions('formTipoMision',true);

	// Agrego las option
	planetasArr.forEach(function(p){
		comboAddOption('formPlanetaMision',p,p,false);	
	});
	
	missionTypesArr.forEach(function(p){
		comboAddOption('formTipoMision',p,p,false);	
	});

	dropsDisable(false);
}

function dropsDisable(disable=true){
	formUpdateButton.disabled=disable;
	formClearButton.disabled=disable;
	formAddPipeButton.disabled=disable;

	formItem.disabled=disable;
	formTipo.disabled=disable;

	formTipoRelic.disabled=disable;
	formPlanetaMision.disabled=disable;
	formTipoMision.disabled=disable;
}
function filtroAplicadoColor(){
	var combos=[];
	combos.push(formTipo);
	combos.push(formRareza);
	
	combos.push(formTipoRelic);
	combos.push(formPlanetaMision);
	combos.push(formTipoMision);
	combos.push(formRotacion);
	
	combos.forEach(function (combo){
		if(combo.value.toLowerCase()!='all'){
			combo.style="color: tomato;"
		}else{
			combo.style=""
		}		
	});
}

function agregarBusqueda(busquedaActual){
	result=busquedaActual;

	if(result.length>2&&result.substr(result.length - 2).indexOf("|")<0){
		result+='|';
		formItem.value=result;
	}

	formItem.focus()
}

function addDropQuery(data,formTipoValue='All'){
	if(formItem.value.indexOf(data)==-1){
		let txtFormItem=formItem.value;
		clearForm();
		formItem.value=txtFormItem==''?data:txtFormItem+'|'+data;
		formTipo.value=formTipoValue;
		buscarDrop();
		tabTitleDrops.click();
	}
	generateToast('Item agregado a la busqueda','<a href="#DROPS">'+data+' Agregado a la busqueda actual (click para ver drops)</a>',"",5000,"success");
}
function clearForm(){
	formItem.value='';
	
	var combos=[];
	combos.push(formTipo);
	combos.push(formRareza);
	
	combos.push(formTipoRelic);
	combos.push(formPlanetaMision);
	combos.push(formTipoMision);
	combos.push(formRotacion);

	combos.forEach(function (combo){
		combo.value='All';
	});

	filtroAplicadoColor();
	buscarDrop();
}
function buscarDrop(){
	var item=formItem.value;
	var tipo=formTipo.value;
	
	addClass('liTipoRelic','hidden');
	addClass('liPlanetaMision','hidden');
	addClass('liTipoMision','hidden');
	addClass('liRotacion','hidden');
	switch(tipo){
		case 'All':
		removeClass('liTipoRelic','hidden');
		removeClass('liPlanetaMision','hidden');
		removeClass('liTipoMision','hidden');
		removeClass('liRotacion','hidden');
		break;
		case 'relics':
		removeClass('liTipoRelic','hidden');

		break;
		case 'missionRewards':
		removeClass('liPlanetaMision','hidden');
		removeClass('liTipoMision','hidden');
		removeClass('liRotacion','hidden');
		break;
		case 'cetusBountyRewards':
		removeClass('liRotacion','hidden');
		break;
		case 'transientRewards':
		removeClass('liRotacion','hidden');
		break;
		case 'blueprintLocations':

		break;
		case 'enemyBlueprintTables':

		break;
		case 'modLocations':

		break;
		case 'enemyModTables':

		break;
		case 'keyRewards':

		break;
		case 'miscItems':

		break;
		case 'sortieRewards':

		break;
		default:

		break;
	}

	var subtipo=[];

	// relics
	// missionRewards
	// cetusBountyRewards
	// transientRewards
	// blueprintLocations
	// enemyBlueprintTables
	// modLocations
	// enemyModTables
	// keyRewards
	// miscItems
	// sortieRewards
	
	subtipo['relics']=formTipoRelic.value;
	subtipo['planet']=formPlanetaMision.value;
	subtipo['missionType']=formTipoMision.value;
	subtipo['itemRarity']=formRareza.value
	subtipo['rotacion']=formRotacion.value

	filtroAplicadoColor();

	dropsFormBuscando.innerHTML='<p>Buscando item: '+item+' ('+formTipo.selectedOptions[0].innerText+')</p>'
	dropsEncontrados=0;
	
	var result='';
	var arrayItems=[];
	arrayItems=pipedStringToArray(item);

	dropResult.innerHTML='';
	if(item.length>2){
		arrayItems.forEach(function (i){
			var titulo='';
			if(i!=''&&i.length>2){
				dropResult.innerHTML='';
				switch (tipo){
					case 'All':
					titulo='Relics';
					result+=buscarDropsRelics(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					titulo='Misiones';
					result+=buscarDropsMisiones(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					titulo='Cetus Bounty';
					result+=buscarDropsCetusBounty(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					titulo='Eventos';
					result+=buscarDropsEventos(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					titulo='Mods de enemigo';
					result+=buscarDropsModEnemigo(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					titulo='Enemy droptable';
					result+=buscarDropsEnemigoMod(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					titulo='Sortie';
					result+=buscarDropsSortieReward(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					break;
					case 'relics':
					titulo='Relics';
					result+=buscarDropsRelics(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					break;
					case 'missionRewards':
					titulo='Misiones';
					result+=buscarDropsMisiones(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					break;
					case 'cetusBountyRewards':
					titulo='Cetus Bounty';
					result+=buscarDropsCetusBounty(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					break;
					case 'transientRewards':
					titulo='Eventos';
					result+=buscarDropsEventos(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					break;
					case 'blueprintLocations':

					break;
					case 'enemyBlueprintTables':

					break;
					case 'modLocations':
					titulo='Enemy droptable';
					result+=buscarDropsEnemigoMod(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					break;
					case 'enemyModTables':
					titulo='Mods de enemigo';
					result+=buscarDropsModEnemigo(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					break;
					case 'keyRewards':

					break;
					case 'miscItems':

					break;
					case 'sortieRewards':
					result+=buscarDropsSortieReward(i,subtipo,[],'tableDrops'+titulo,'DROPS '+titulo+" para '"+i.toUpperCase()+"'");
					break;
					default:

					break;
				}
				dropsFormBuscando.innerHTML+='<br>* '+i.toUpperCase()+' ('+dropsEncontrados+' matchs)';
				dropsEncontrados=0;
				dropResult.innerHTML+=result;
			}
		});
	}else{
		dropResult.innerHTML='';
	}
}
function setFarmingCheck(itemID,add=true){
	if(add){
		farmingMark.push(itemID);	
	}else{
		arrayRemove(farmingMark,itemID);
	}
	setCookie('farmingMark',arrayToPipedString(farmingMark),365*24*60*60*1000)
	llenarFarmingFocus();
}
function setFarmingCompleteCheck(itemID,add=true){
	if(add){
		farmingMarkComplete.push(itemID);	
	}else{
		arrayRemove(farmingMarkComplete,itemID);
	}
	setCookie('farmingMarkComplete',arrayToPipedString(farmingMarkComplete),365*24*60*60*1000)
	llenarFarmingFocus();
}
function isFarmingChecked(itemID){
	return farmingMark.includes(itemID);
}

function isFarmingCompleteChecked(itemID){
	return farmingMarkComplete.includes(itemID);
}
function llenarFarmingFocus(){
	var result='';
	result+='<label><input type="checkbox" '+(farmingOnlyNonCompleted?"checked":"")+' onClick="farmingOnlyNonCompleted=this.checked;llenarFarmingFocus();">Mostrar solo no completado</label><br>';
	if (farmingMark.length>0){
		
		var subtipo=[];
		subtipo['relics']='All';
		subtipo['planet']='All';
		subtipo['missionType']='All';
		subtipo['itemRarity']='All';
		subtipo['rotacion']='All';
		
		result+=buscarDropsRelics('',subtipo,farmingMark,"tableDropsRelicsFarming",sectionTitle='Relics para farmear');
		result+=buscarDropsMisiones('',subtipo,farmingMark,"tableDropsMisionesFarming",sectionTitle='Misiones para farmear');
		result+=buscarDropsCetusBounty('',subtipo,farmingMark,"tableDropsCetusBountyFarming",sectionTitle='Cetus Bounty para farmear');
		result+=buscarDropsEventos('',subtipo,farmingMark,"tableDropsEventosFarming",sectionTitle='Eventos para farmear');
		result+=buscarDropsModEnemigo('',subtipo,farmingMark,"tableDropsEnemyModFarming",sectionTitle='Mods de Enemigo para farmear');
		result+=buscarDropsEnemigoMod('',subtipo,farmingMark,"tableDropsEnemyModFarming",sectionTitle='Enemy Drop para farmear');
		result+=buscarDropsEnemigoMod('',subtipo,farmingMark,"tableDropsEnemyModFarming",sectionTitle='Enemigos para farmear');
		result+=buscarDropsSortieReward('',subtipo,farmingMark,"tableDropsSortieRewardFarming",sectionTitle='Sortie Rewards para farmear');
	}else{
		result='<h2>No hay items seleccionados para farming en drops</h2>'
	}
	farmingList.innerHTML=result;
}
function buscarDropsRelics(item,subtipo,idList=[],idTable="tableDropsRelics",sectionTitle='Relics'){
	var ths=[];
	ths.push([['Item','dropsTH'],['Relic','dropsTH'],['Estado','dropsTH'],['Rareza','dropsTH'],['Chance','dropsTH']]);
	var tds=[];
	var result='';
	item=item.toLowerCase();
	resultJsonDrops.relics.forEach(function (r){
		r.rewards.forEach(function (rew){
			var itemAnalizado=rew.itemName.toLowerCase();
			if(r.state==subtipo.relics||subtipo.relics=='All'){
				if(itemAnalizado.includes(item)||(r.tier+' '+r.relicName).toLowerCase().includes(item)){
					var td=[];
					var tier=r.tier.toLowerCase();
					
					var itemRareza=rew.rarity;
					var itemFarmingID=r._id+rew.itemName;
					var checkedFarming=(isFarmingChecked(itemFarmingID)?" checked":"");
					var checkboxFarming='<label class="farm"><input type="checkbox"'+checkedFarming+' onClick="setFarmingCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Farm</label>&nbsp;';
					var checkedFarmingComplete=(isFarmingCompleteChecked(itemFarmingID)?" checked":"");
					var checkboxFarmingComplete='<label class="farmComplete"><input type="checkbox"'+checkedFarmingComplete+' onClick="setFarmingCompleteCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Completa</label><br>';

					td.push([checkboxFarming+checkboxFarmingComplete+rew.itemName,tier]);
					td.push([r.tier+' '+r.relicName,tier]);
					td.push([r.state,tier]);
					td.push([itemRareza,tier]);
					td.push([rew.chance+'%',tier]);

					if(itemRareza==subtipo.itemRarity||subtipo.itemRarity=="All"){
						if (idList.length>0){
							if(isFarmingChecked(itemFarmingID)){
								if(!farmingOnlyNonCompleted||(farmingOnlyNonCompleted&&!isFarmingCompleteChecked(itemFarmingID))){
									tds.push(td);
									dropsEncontrados++;							
								}
							}
						}else{
							tds.push(td);
							dropsEncontrados++;
						}			
					}
				}
			}
		});
	});
	if (tds.length>0){
		var result='<h3 onclick="toggleHide('+"'"+idTable+"'"+')"> * '+sectionTitle+' ('+tds.length+' resultados)</h3>';
		result+=generateTable(tds,ths,'tableDrops enlargeMe',idTable,'border="1px solid white"');
		availableNodes[idTable]=tds.length;
		return result;
	}else{
		return '';
	}
}


function buscarDropsMisiones(item,subtipo,idList=[],idTable="tableDropsMisiones",sectionTitle='Misiones'){
	var ths=[];
	ths.push([
		['Item','dropsTH'],
		['Planeta','dropsTH'],
		['Nodo','dropsTH'],
		['Tipo','dropsTH'],
		['Rotacion','dropsTH'],
		['Evento','dropsTH'],
		['Rareza','dropsTH'],
		['Chance','dropsTH']
		]);
	var tds=[];
	var result='';
	item=item.toLowerCase();
	

	key0=resultJsonDrops.missionRewards;
	Object.keys(key0).forEach( function(key1) { 
		// Planeta
		var itemPlaneta=key1;
		if(itemPlaneta==subtipo.planet||subtipo.planet=='All'){
			Object.keys(key0[key1]).forEach( function(key2) { 
				// Nodo
				var itemNodo=[key2];
				var itemNodeGameMode=key0[key1][key2]['gameMode'];
				var itemNodeIsEvent=key0[key1][key2]['isEvent'];
				var rotacionArray=['A','B','C'];
				if(itemNodeGameMode==subtipo.missionType||subtipo.missionType=='All'){
					rotacionArray.forEach(function(itemRotacion){
						if(key0[key1][key2]['rewards'][itemRotacion]!=undefined){
							Object.keys(key0[key1][key2]['rewards'][itemRotacion]).forEach( function(key3) { 
								//llegamos al itemName
								var itemName=key0[key1][key2]['rewards'][itemRotacion][key3]['itemName'];
								var itemRarity=key0[key1][key2]['rewards'][itemRotacion][key3]['rarity'];
								var itemChance=key0[key1][key2]['rewards'][itemRotacion][key3]['chance'];

								var itemRareza=itemRarity;
								var itemFarmingID=key0[key1][key2]['rewards'][itemRotacion][key3]['_id']+itemName+itemPlaneta+itemNodo+itemNodeGameMode+itemRotacion;
								var checkedFarming=(isFarmingChecked(itemFarmingID)?" checked":"");
								var checkboxFarming='<label class="farm"><input type="checkbox"'+checkedFarming+' onClick="setFarmingCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Farm</label>&nbsp;';
								var checkedFarmingComplete=(isFarmingCompleteChecked(itemFarmingID)?" checked":"");
								var checkboxFarmingComplete='<label class="farmComplete"><input type="checkbox"'+checkedFarmingComplete+' onClick="setFarmingCompleteCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Completa</label><br>';

								//console.log('valido:'+itemPlaneta+' Subtipo:'+subtipo.planet+' Item:'+itemName+' Rotacion:'+itemRotacion);
								if(itemName!=undefined&&itemName.toLowerCase().includes(item.toLowerCase())){
									var td=[];
									td.push([checkboxFarming+checkboxFarmingComplete+itemName,itemRarity]);
									td.push([itemPlaneta,itemRarity]);
									td.push([itemNodo,itemRarity]);
									td.push([itemNodeGameMode,itemNodeGameMode]);
									td.push([itemRotacion,itemRotacion]);
									td.push([(itemNodeIsEvent?"Si":"No"),itemNodeGameMode + (itemNodeIsEvent?" NodeIsEvent":" NodeIsNotEvent")]);
									td.push([itemRarity,itemRarity]);
									td.push([itemChance,itemRarity]);

									if(itemRotacion==subtipo.rotacion||subtipo.rotacion=='All'){
										if(itemRareza==subtipo.itemRarity||subtipo.itemRarity=="All"){
											if (idList.length>0){
												if(isFarmingChecked(itemFarmingID)){
													if(!farmingOnlyNonCompleted||(farmingOnlyNonCompleted&&!isFarmingCompleteChecked(itemFarmingID))){
														tds.push(td);
														dropsEncontrados++;							
													}
												}
											}else{
												tds.push(td);
												dropsEncontrados++;
											}			
										}
									}
									// tds.push(td);
									// dropsEncontrados++;
								}
							});
						}				
					});
					
					if(key0[key1][key2]['rewards']!=undefined){
						Object.keys(key0[key1][key2]['rewards']).forEach( function(key3) { 
							var itemName=key0[key1][key2]['rewards'][key3]['itemName'];
							var itemRarity=key0[key1][key2]['rewards'][key3]['rarity'];
							var itemChance=key0[key1][key2]['rewards'][key3]['chance'];
							var itemRotacion='---';

							var itemRareza=itemRarity;
							var itemFarmingID=key0[key1][key2]['rewards'][key3]['_id']+itemName+itemPlaneta+itemNodo+itemNodeGameMode;
							var checkedFarming=(isFarmingChecked(itemFarmingID)?" checked":"");
							var checkboxFarming='<label class="farm"><input type="checkbox"'+checkedFarming+' onClick="setFarmingCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Farm</label>&nbsp;';
							var checkedFarmingComplete=(isFarmingCompleteChecked(itemFarmingID)?" checked":"");
							var checkboxFarmingComplete='<label class="farmComplete"><input type="checkbox"'+checkedFarmingComplete+' onClick="setFarmingCompleteCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Completa</label><br>';

							if(itemName!=undefined&&itemName.toLowerCase().includes(item.toLowerCase())){
								var td=[];
								td.push([checkboxFarming+checkboxFarmingComplete+itemName,itemRarity]);
								td.push([itemPlaneta,itemRarity]);
								td.push([itemNodo,itemRarity]);
								td.push([itemNodeGameMode,itemNodeGameMode]);
								td.push([itemRotacion,itemRotacion]);
								td.push([(itemNodeIsEvent?"Si":"No"),itemNodeGameMode + (itemNodeIsEvent?" NodeIsEvent":" NodeIsNotEvent")]);
								td.push([itemRarity,itemRarity]);
								td.push([itemChance,itemRarity]);

								if(itemRotacion==subtipo.rotacion||subtipo.rotacion=='All'){
									if(itemRareza==subtipo.itemRarity||subtipo.itemRarity=="All"){
										if (idList.length>0){
											if(isFarmingChecked(itemFarmingID)){
												if(!farmingOnlyNonCompleted||(farmingOnlyNonCompleted&&!isFarmingCompleteChecked(itemFarmingID))){
													tds.push(td);
													dropsEncontrados++;							
												}
											}
										}else{
											tds.push(td);
											dropsEncontrados++;
										}			
									}
								}
								// tds.push(td);
								// dropsEncontrados++;
							}
						});
					}
				}
			});
}
});

if (tds.length>0){
	var result='<h3 onclick="toggleHide('+"'"+idTable+"'"+')"> * '+sectionTitle+' ('+tds.length+' resultados)</h3>';
	result+=generateTable(tds,ths,'tableDrops enlargeMe',idTable,'border="1px solid white"');
	availableNodes[idTable]=tds.length;
	return result;
}else{
	return '';
}
}

function buscarDropsCetusBounty(item,subtipo,idList=[],idTable="tableDropsCetusBounty",sectionTitle='Cetus Bounty'){
	var ths=[];
	ths.push([['Item','dropsTH'],
		['Bounty','dropsTH'],
		['Stage','dropsTH'],
		['Rotacion','dropsTH'],
		['Rareza','dropsTH'],
		['Chance','dropsTH']]);
	var tds=[];
	var result='';
	item=item.toLowerCase();
	resultJsonDrops.cetusBountyRewards.forEach(function (r){
		var rotacionArray=['A','B','C'];
		rotacionArray.forEach(function (itemRotacion){
			r.rewards[itemRotacion].forEach(function (rew){
				var itemName=rew.itemName;
				var itemRarity=rew.rarity;
				var itemChance=rew.chance;
				var itemStage=rew.stage;

				var itemRareza=rew.rarity;
				var itemFarmingID=r._id+itemName+itemStage+itemRarity;
				var checkedFarming=(isFarmingChecked(itemFarmingID)?" checked":"");
				var checkboxFarming='<label class="farm"><input type="checkbox"'+checkedFarming+' onClick="setFarmingCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Farm</label>&nbsp;';
				var checkedFarmingComplete=(isFarmingCompleteChecked(itemFarmingID)?" checked":"");
				var checkboxFarmingComplete='<label class="farmComplete"><input type="checkbox"'+checkedFarmingComplete+' onClick="setFarmingCompleteCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Completa</label><br>';


				if(itemName!=undefined&&itemName.toLowerCase().includes(item.toLowerCase())){
					var td=[];
					td.push([checkboxFarming+checkboxFarmingComplete+itemName,itemRotacion]);
					td.push([r.bountyLevel,itemRotacion]);
					td.push([itemStage,itemRotacion]);
					td.push([itemRotacion,itemRotacion]);
					td.push([itemRarity,itemRarity]);
					td.push([itemChance,itemRarity]);
					if(itemRotacion==subtipo.rotacion||subtipo.rotacion=='All'){
						if(itemRareza==subtipo.itemRarity||subtipo.itemRarity=="All"){
							if (idList.length>0){
								if(isFarmingChecked(itemFarmingID)){
									if(!farmingOnlyNonCompleted||(farmingOnlyNonCompleted&&!isFarmingCompleteChecked(itemFarmingID))){
										tds.push(td);
										dropsEncontrados++;							
									}
								}
							}else{
								tds.push(td);
								dropsEncontrados++;
							}			
						}
					}
					// tds.push(td);
					// dropsEncontrados++;
				}
			});
		});
	});
	if (tds.length>0){
		var result='<h3 onclick="toggleHide('+"'"+idTable+"'"+')"> * '+sectionTitle+' ('+tds.length+' resultados)</h3>';
		result+=generateTable(tds,ths,'tableDrops enlargeMe',idTable,'border="1px solid white"');
		availableNodes[idTable]=tds.length;
		return result;
	}else{
		return '';
	}	
}

function buscarDropsEventos(item,subtipo,idList=[],idTable="tableDropsEvents",sectionTitle='Eventos'){
	var ths=[];
	ths.push([['Item','dropsTH'],
		['Objetivo','dropsTH'],
		['Rotacion','dropsTH'],
		['Rareza','dropsTH'],
		['Chance','dropsTH']]);
	var tds=[];
	var result='';
	item=item.toLowerCase();
	resultJsonDrops.transientRewards.forEach(function (r){
		var itemObjetivo=r['objectiveName'];
		r.rewards.forEach(function (rew){
			var itemName=rew.itemName;
			var itemRarity=rew.rarity;
			var itemChance=rew.chance;
			var itemRotacion=rew.rotation;
			if(itemRotacion==null){
				itemRotacion='---';
			}

			var itemRareza=rew.rarity;
			var itemFarmingID=rew._id+itemName+itemObjetivo+itemRotacion+itemRarity;
			var checkedFarming=(isFarmingChecked(itemFarmingID)?" checked":"");
			var checkboxFarming='<label class="farm"><input type="checkbox"'+checkedFarming+' onClick="setFarmingCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Farm</label>&nbsp;';
			var checkedFarmingComplete=(isFarmingCompleteChecked(itemFarmingID)?" checked":"");
			var checkboxFarmingComplete='<label class="farmComplete"><input type="checkbox"'+checkedFarmingComplete+' onClick="setFarmingCompleteCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Completa</label><br>';


			if(itemName!=undefined&&itemName.toLowerCase().includes(item.toLowerCase())){
				var td=[];
				td.push([checkboxFarming+checkboxFarmingComplete+itemName,itemRotacion]);
				td.push([itemObjetivo,itemRotacion]);
				td.push([itemRotacion,itemRotacion]);
				td.push([itemRarity,itemRarity]);
				td.push([itemChance,itemRarity]);
				if(itemRotacion==subtipo.rotacion||subtipo.rotacion=='All'){
					if(itemRareza==subtipo.itemRarity||subtipo.itemRarity=="All"){
						if (idList.length>0){
							if(isFarmingChecked(itemFarmingID)){
								if(!farmingOnlyNonCompleted||(farmingOnlyNonCompleted&&!isFarmingCompleteChecked(itemFarmingID))){
									tds.push(td);
									dropsEncontrados++;							
								}
							}
						}else{
							tds.push(td);
							dropsEncontrados++;
						}			
					}
				}
				// tds.push(td);
				// dropsEncontrados++;
			}
		});
	});
	if (tds.length>0){
		var result='<h3 onclick="toggleHide('+"'"+idTable+"'"+')"> * '+sectionTitle+' ('+tds.length+' resultados)</h3>';
		result+=generateTable(tds,ths,'tableDrops enlargeMe',idTable,'border="1px solid white"');
		availableNodes[idTable]=tds.length;
		return result;
	}else{
		return '';
	}	
}
function buscarDropsModEnemigo(item,subtipo,idList=[],idTable="tableDropsModEnemigo",sectionTitle='Mods de Enemigo'){
	var ths=[];
	ths.push([['MOD','dropsTH'],
		['Enemigo','dropsTH'],
		['Mod Drop Chance','dropsTH'],
		['Rareza','dropsTH'],
		['Chance','dropsTH']]);
	var tds=[];
	var result='';
	item=item.toLowerCase();
	resultJsonDrops.enemyModTables.forEach(function (r){
		var itemEnemigo=r['enemyName'];
		var itemEnemigoModDropChance=r['enemyModDropChance'];
		var id1=r['_id'];
		r['mods'].forEach(function (rew){
			var itemName=rew.modName;
			var itemRarity=rew.rarity;
			var itemChance=rew.chance;
			var id2=rew._id;
			// var itemRotacion=rew.rotation;

			var itemRareza=rew.rarity;
			var itemFarmingID=id1+id2+itemName;
			var checkedFarming=(isFarmingChecked(itemFarmingID)?" checked":"");
			var checkboxFarming='<label class="farm"><input type="checkbox"'+checkedFarming+' onClick="setFarmingCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Farm</label>&nbsp;';
			var checkedFarmingComplete=(isFarmingCompleteChecked(itemFarmingID)?" checked":"");
			var checkboxFarmingComplete='<label class="farmComplete"><input type="checkbox"'+checkedFarmingComplete+' onClick="setFarmingCompleteCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Completa</label><br>';


			if(itemName!=undefined&&itemName.toLowerCase().includes(item.toLowerCase())){
				var td=[];
				td.push([checkboxFarming+checkboxFarmingComplete+itemName,itemRarity]);
				td.push([itemEnemigo,itemRarity]);
				td.push([itemEnemigoModDropChance+"%",itemRarity]);
				td.push([itemRarity,itemRarity]);
				td.push([itemChance,itemRarity]);

				if(itemRareza==subtipo.itemRarity||subtipo.itemRarity=="All"){
					if (idList.length>0){
						if(isFarmingChecked(itemFarmingID)){
							if(!farmingOnlyNonCompleted||(farmingOnlyNonCompleted&&!isFarmingCompleteChecked(itemFarmingID))){
								tds.push(td);
								dropsEncontrados++;							
							}						
						}
					}else{
						tds.push(td);
						dropsEncontrados++;
					}			
				}
				// tds.push(td);
				// dropsEncontrados++;
			}
		});
	});
	if (tds.length>0){
		var result='<h3 onclick="toggleHide('+"'"+idTable+"'"+')"> * '+sectionTitle+' ('+tds.length+' resultados)</h3>';
		result+=generateTable(tds,ths,'tableDrops enlargeMe',idTable,'border="1px solid white"');
		availableNodes[idTable]=tds.length;
		return result;
	}else{
		return '';
	}	
}

function buscarDropsEnemigoMod(item,subtipo,idList=[],idTable="tableDropsModEnemigoExtendido",sectionTitle='Enemigo - Mod'){
	var ths=[];
	ths.push([
		['Enemigo','dropsTH'],
		['MOD','dropsTH'],
		['Mod Drop Chance','dropsTH'],
		['Rareza','dropsTH'],
		['Chance','dropsTH']]);
	var tds=[];
	var result='';
	item=item.toLowerCase();
	resultJsonDrops.modLocations.forEach(function (r){
		var itemName=r.modName;
		var id1=r['_id'];
		r['enemies'].forEach(function (rew){
			var itemEnemigo=rew['enemyName'];
			var itemEnemigoModDropChance=rew['enemyModDropChance'];
			var itemRarity=rew.rarity;
			var itemChance=rew.chance;
			var id2=rew._id;
			// var itemRotacion=rew.rotation;

			var itemRareza=rew.rarity;
			var itemFarmingID=id1+id2+itemName;
			var checkedFarming=(isFarmingChecked(itemFarmingID)?" checked":"");
			var checkboxFarming='<label class="farm"><input type="checkbox"'+checkedFarming+' onClick="setFarmingCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Farm</label>&nbsp;';
			var checkedFarmingComplete=(isFarmingCompleteChecked(itemFarmingID)?" checked":"");
			var checkboxFarmingComplete='<label class="farmComplete"><input type="checkbox"'+checkedFarmingComplete+' onClick="setFarmingCompleteCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Completa</label><br>';


			if(itemEnemigo!=undefined&&itemEnemigo.toLowerCase().includes(item.toLowerCase())){
				var td=[];
				td.push([checkboxFarming+checkboxFarmingComplete+itemEnemigo,itemRarity]);
				td.push([itemName,itemRarity]);
				td.push([itemEnemigoModDropChance+"%",itemRarity]);
				td.push([itemRarity,itemRarity]);
				td.push([itemChance,itemRarity]);

				if(itemRareza==subtipo.itemRarity||subtipo.itemRarity=="All"){
					if (idList.length>0){
						if(isFarmingChecked(itemFarmingID)){
							if(!farmingOnlyNonCompleted||(farmingOnlyNonCompleted&&!isFarmingCompleteChecked(itemFarmingID))){
								tds.push(td);
								dropsEncontrados++;							
							}						
						}
					}else{
						tds.push(td);
						dropsEncontrados++;
					}			
				}
				// tds.push(td);
				// dropsEncontrados++;
			}
		});
	});
	if (tds.length>0){
		var result='<h3 onclick="toggleHide('+"'"+idTable+"'"+')"> * '+sectionTitle+' ('+tds.length+' resultados)</h3>';
		result+=generateTable(tds,ths,'tableDrops enlargeMe',idTable,'border="1px solid white"');
		availableNodes[idTable]=tds.length;
		return result;
	}else{
		return '';
	}	
}

function buscarDropsSortieReward(item,subtipo,idList=[],idTable="tableDropsSortieReward",sectionTitle='Sortie Rewards'){
	var ths=[];
	ths.push([['Item','dropsTH'],
		['Rarity','dropsTH'],
		['Chance','dropsTH']]);
	var tds=[];
	var result='';
	item=item.toLowerCase();
	resultJsonDrops.sortieRewards.forEach(function (r){
		var id1=r['_id'];
		
		var itemName=r.itemName;
		var itemRarity=r.rarity;
		var itemChance=r.chance;

		var itemRareza=r.rarity;
		var itemFarmingID=id1+itemName;
		var checkedFarming=(isFarmingChecked(itemFarmingID)?" checked":"");
		var checkboxFarming='<label class="farm"><input type="checkbox"'+checkedFarming+' onClick="setFarmingCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Farm</label>&nbsp;';
		var checkedFarmingComplete=(isFarmingCompleteChecked(itemFarmingID)?" checked":"");
		var checkboxFarmingComplete='<label class="farmComplete"><input type="checkbox"'+checkedFarmingComplete+' onClick="setFarmingCompleteCheck('+"'"+itemFarmingID+"'"+',this.checked);buscarDrop();">Completa</label><br>';

		if(itemName!=undefined&&itemName.toLowerCase().includes(item.toLowerCase())){
			var td=[];
			td.push([checkboxFarming+checkboxFarmingComplete+itemName,itemRarity]);
			td.push([itemRarity,itemRarity]);
			td.push([itemChance,itemRarity]);

			if(itemRareza==subtipo.itemRarity||subtipo.itemRarity=="All"){
				if (idList.length>0){
					if(isFarmingChecked(itemFarmingID)){
						if(!farmingOnlyNonCompleted||(farmingOnlyNonCompleted&&!isFarmingCompleteChecked(itemFarmingID))){
							tds.push(td);
							dropsEncontrados++;							
						}					
					}
				}else{
					tds.push(td);
					dropsEncontrados++;
				}			
			}
			// tds.push(td);
			// dropsEncontrados++;
		}
	});
	if (tds.length>0){
		var result='<h3 onclick="toggleHide('+"'"+idTable+"'"+')"> * '+sectionTitle+' ('+tds.length+' resultados)</h3>';
		result+=generateTable(tds,ths,'tableDrops enlargeMe',idTable,'border="1px solid white"');
		availableNodes[idTable]=tds.length;
		return result;
	}else{
		return '';
	}	
}

function startAll(){
	//Busco la plataforma y la cargo sino... pc.
	platform=urlGetParameter("platform");
	//changePlatform('pc');
	((platform==null)?platform="pc":"");
	switch(platform){
		case "ps4":
			platformSelectorPS.click();
			break;
		case "xb1":
			platformSelectorXB.click();
			break;
		case "pc":
		default:
			platformSelectorPC.click();
	}
	window.addEventListener('beforeunload', function(event) {
  		onExit();
	}, false);
	/*
	window.onbeforeunload = confirmExit;
	function confirmExit(){
	    alert("confirm exit is being called");
	    return false;
	}
	*/
	//llamo el worldstate
	getWFWorldstate();

	//Cargo las cookies por defecto
	//setCachedDefaultData();

	//busco el json de drops
	updateJsonDrops();

	// busco en las cookies las completadas de los ultimos 7 dias
	completado=arrayRemove(completado.concat(getCookieArray("completas")));
	// console.log('completado:');
	// console.log(completado);
	informarArr=arrayRemove(informarArr.concat(getCachedData()));
	// console.log('informarArr:');
	// console.log(informarArr);
	informarArrChecked=arrayRemove(informarArrChecked.concat(getCookieArray("informarArrChecked")));
	// console.log('informarArrChecked:');
	// console.log(informarArrChecked);
	informarArrMostrar=arrayRemove(informarArrMostrar.concat(getCookieArray("informarArrMostrar")));
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
		
		workingOn.innerHTML+='<hr><a class="dev_analisis" href="https://trello.com/b/Gu0xFtVG" target="blank">Link al dashboard de trello</a>'
		workingOn.innerHTML+='<iframe src="https://trello.com/b/Gu0xFtVG.html" frameBorder="0" width="100%" height="300vh"></iframe><hr>';

		workingOn.innerHTML+='<h2>Recorda, que si algo falla... <span class="lineThrough">Un hechicero lo hizo</span><br><img class="omfg" src="static/img/404-error-page.jpeg" alt="(Que ironia... soy una imagen sobre bugs, en comic sanz... y no cargo.)"><br> shit happens everywhere... y muy probablemente ya este trabajando en el problema.</h2>';
		workingOn.innerHTML+='(realidad)<br><img class="ahhhhhhhhhhhhhh" src="static/img/bug.gif" alt="yo tampoco cargo."><br><br>';
		workingOn.innerHTML+='Discord:Nekro#0089<br>'+'serioMode=true;';
	}	
	//fin de en que estoy trabajando?

	timer1=setClock(1000,timerTime,timer1);

	tabShowAll.click();
}
function timerTime(){
	rellenarDatos();
	if (!fetching){
		fetchingCounter=0;
		counter1++;
		if (counter1>=counter1Max){
			getWFWorldstate();
			counter1=0;
		}
	}else{
		fetchingCounter++;
		if (fetchingCounter>=fetchingCounterMax){
			getWFWorldstate();
			fetchingCounter=0;
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

		let txtCopyAll;

		var ths=[];
		var tds=[];
		var parseado='';

		//var diff=moment(new Date()).utc()-moment(resultJson.timestamp);
		//getMilliseconds()
		var diff=new Date(new Date().toUTCString())-moment(resultJson.timestamp);
		
		//cookies
		//cookiesShow.innerHTML='<h2>Cookies capturados al '+ dateToString(new Date(new Date().toUTCString()))+':</h2>';
		//cookiesShow.innerHTML+=document.cookie;
		//cookiesShow.innerHTML+='<h2>Completas:</h2>';
		//cookiesShow.innerHTML+=getCookie("completas");
		//cookiesShow.innerHTML+='<h2>Data cacheada(notificaciones):</h2>';
		//cookiesShow.innerHTML+=arrayToPipedString(getCachedData());


		//Timestamp
		timeStamp.innerHTML='Timestamp: '+resultJson.timestamp;
		
		//CetusTimer
		timers.innerHTML='';
		timers.innerHTML+='<div>Cetus Timer: <p class='+((resultJson.cetusCycle.isDay)?'pDay':'pNight')+'>'+strDiff(resultJson.cetusCycle.timeLeft,diff) + '</p></div>';
		timers.innerHTML+='<div>Earth Timer: <p class='+((resultJson.earthCycle.isDay)?'pDay':'pNight')+'>'+strDiff(resultJson.earthCycle.timeLeft,diff) + '</p></div>';

		notifyTimer('cetus',resultJson.cetusCycle,'cetusTimerNotification',diff);
		notifyTimer('earth',resultJson.earthCycle,'earthTimerNotification',diff);

		updateNotificationTimers('',true);

		//let timerStr='Cetus: '+strDiff(resultJson.cetusCycle.timeLeft,diff)+ ' to ' + (resultJson.cetusCycle.isDay?'NIGHT':'DAY');
		try{
			if (timersWindow==undefined){
				//timersWindow = window.open("", "Timers", "width=350,height=150");
    		}
    		if (timersWindow!=undefined&&timersWindow.closed==false){
	    		if(timersWindow.timerCetus==undefined){
		    		timersWindow.document.write('<link rel="stylesheet" type="text/css" href="static/css/stylesWF.css">');
		    		//timersWindow.document.write('<h4>Timers</h4>');
		    		timersWindow.document.write('<div id="windowTimersContent">')
		    		timersWindow.document.write('<div id="timerCetus" >Cetus: <p class='+((resultJson.cetusCycle.isDay)?'pDay':'pNight')+'>'+strDiff(resultJson.cetusCycle.timeLeft,diff) + '</p></div>');
		    		timersWindow.document.write('<div id="timerEarth" >Earth: <p class='+((resultJson.earthCycle.isDay)?'pDay':'pNight')+'>'+strDiff(resultJson.earthCycle.timeLeft,diff) + '</p></div>');
		    		timersWindow.document.write('</div>')
	    			timersWindow.document.title='Timers';
	    			//console.log(timersWindow)
	    		}else{
	    			timersWindow.timerCetus.innerHTML='<div>Cetus: <p class='+((resultJson.cetusCycle.isDay)?'pDay':'pNight')+'>'+strDiff(resultJson.cetusCycle.timeLeft,diff) + '</p></div>';
	    			timersWindow.timerEarth.innerHTML='<div>Earth: <p class='+((resultJson.earthCycle.isDay)?'pDay':'pNight')+'>'+strDiff(resultJson.earthCycle.timeLeft,diff) + '</p></div>';
	    			timersWindow.document.title='Time: [C'+((resultJson.cetusCycle.isDay)?'☼':'☾')+':'+strDiff(resultJson.cetusCycle.timeLeft,diff)+']'+'[E'+((resultJson.earthCycle.isDay)?'☼':'☾')+':'+strDiff(resultJson.earthCycle.timeLeft,diff)+']';
	    		}
    		}
    	}catch(e){
    		//console.log(e);
    		timersWindow.close();
    	}

		//Manejo de sonidos
		var cacheado=[];
		cacheado=getCachedData();
		if (cacheado.length>0){
			notificacionesTitle.innerHTML='🌑 Notificar ['+(informarArrChecked.length)+'/'+(cacheado.length)+']';
			tabTitleNotificaciones.innerHTML='Notificaciones ['+(informarArrChecked.length)+'/'+(cacheado.length)+']';

			notificaciones.innerHTML='<h2 onclick="informarArrChecked=[];toggleInformar('+"''"+',false);timerTime();alert('+"'Elimine todas las selecciones hechas!'"+')">Eliminar TODO lo seleccionado</h2><div class="notificacionesParent">';
			
			notificaciones.innerHTML+='<label><input type="checkbox" '+(notifOnlyActive?"checked":"")+' onClick="notifOnlyActive=this.checked;rellenarDatos();">Mostrar solo activas actualmente</label><br>';
			notificaciones.innerHTML+='<label><input type="checkbox" '+(notifOnlyNonCompleted?"checked":"")+' onClick="notifOnlyNonCompleted=this.checked;rellenarDatos();">Mostrar solo no completadas</label><br>';
			notificaciones.innerHTML+='<label><input type="checkbox" '+(notifShowLastDate?"checked":"")+' onClick="notifShowLastDate=this.checked;rellenarDatos();">Mostrar ultima fecha de aparicion</label><br>';
			notificacionesTitle.innerHTML+=(notifOnlyActive?" (Mostrando solo activas)":"")+(notifOnlyNonCompleted?" (Mostrando solo no completas)":"")+(notifShowLastDate?"":" (Ocultando fechas)");
			var tipos=[];
			cacheado.forEach(function(c){
				if(c['t']!=undefined&&c['t']!=''&&c['i']!=undefined&&c['i']!=''){
					tipos.push(c['t']);
				}
			});
			// Agrego clase generica
			tipos.push('recursos');
			// Dejo unico el array para no repetir data
			tipos=arrayUnique(tipos);
			// hago un ordenamiento burbuja (A-Z) para los titulos
			tipos=bubbleSorting(tipos);
			// hago un ordenamiento para los items
			cacheado=arraySortByKey(cacheado,'t');
			cacheado=arraySortByKey(cacheado,'i');

			var alertasActuales=resultJson.alerts;
			var invasionesActuales=resultJson.invasions;
			var itemsBaroActuales=resultJson.voidTrader;
			tipos.forEach(function(t){
				// notificaciones.innerHTML+='<div class="listaNotificaciones"><article><h4 class="ucase subrayado">'+t+'</h4><ul id="typeNotif'+t.toUpperCase()+'">';
				var notificacion='';
				var listaActiva=false;
				var comboSonido='';//getComboSound(t);
				cacheado.forEach(function (c){
					var actual='';
					var actualId='';
					var completa=false;
					var timerNotificacion='';
					var tipo='';
					// hay que recorrer las alertas!
					alertasActuales.forEach(function(a){
						if(!a.expired){
							if (c['i']==undefined||c['i']==''){
								if(a.rewardTypes!=undefined&&a.rewardTypes.includes(c['t'])){
									actual=a.id;
									completa=chequearCompleto(a.id);
									timerNotificacion=strDiff((a.eta),diff);
									tipo='alerta';
								}
							}else{
								if(a.mission!=undefined&&a.mission.reward.items!=undefined&&a.mission.reward.items.includes(c['i'])){
									actual=a.id;	
									completa=chequearCompleto(a.id);
									timerNotificacion=strDiff((a.eta),diff);
									tipo='alerta';
								}
							}
						}
					});
					// hay que recorrer las invasiones!
					if(t=='invasion'){
						invasionesActuales.forEach(function(i){
							if (!i.completed){
								if(i.attackerReward!=undefined&&i.attackerReward.asString==c['i']){
									actual=i.attackerReward.asString;
									actualId=i.id;
									completa=chequearCompleto(i.id);
									timerNotificacion=strDiff((i.eta),diff);
									tipo='invasion';
								}
								if(i.defenderReward!=undefined&&i.defenderReward.asString==c['i']){
									actual=i.defenderReward.asString;
									actualId=i.id;
									completa=chequearCompleto(i.id);
									timerNotificacion=strDiff((i.eta),diff);
									tipo='invasion';
								}
							}
						});
					}
					// Si esta baro... hay que recorrerle los items
					if(t=='baro'){
						if(itemsBaroActuales.inventory!=undefined){
							itemsBaroActuales.inventory.forEach(function(i){
								if(strReplaceAllNonPrintable(i.item)==strReplaceAllNonPrintable(c['i'])){
									actual=i.item;
									completa=chequearCompleto(actual);
									timerNotificacion=strDiff(itemsBaroActuales.endString,diff);
									tipo='baro';
								}
							});
						}
					}
					
					(c['l']!=undefined?c['l']=securizeUrl(c['l']):'');

					if(t=='recursos'&&(c['i']==undefined||c['i']=='')){
						//de paso revisamos si esta completa para marcarlo tambien!
						
						// chequeo si hay alguno en la lista para remarcar la lista entera
						if(actual!=''){listaActiva=true;}
						var notificar=chequearInformar(c['t']);
						var isCompleted=(completa?' completed':'');	

						if((!notifOnlyNonCompleted||(notifOnlyNonCompleted&&!completa))&&(!notifOnlyActive||(notifOnlyActive&&actual!=''))){
							notificacion+='<li class="'+(actual!=''?'notifActive':'notifInactive')+isCompleted+'">'+
							'<label><input type="checkbox" onClick="toggleInformar(this.name,this.checked);" name="'+c['t']+'"' + (notificar?" checked":"")+'> 📣 📣 📣 </label>'+
							'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+c['t']+'" target="blank">'+
							'<img class="thumbnailNotif" src="'+c['l']+'">'+
							'<span class="capitalize">'+c['t']+'</span>'+
							'</a>'+
							(actual==''?'':'<label>(<input type="checkbox" onclick="toggleCompletar(this.name);"'+(completa?" checked ":"")+'name="'+actual+'"' +'>Completa?)</label>')+
							(notifShowLastDate?' ('+dateToString(c[platform])+')':"")+(actual!=''?' <a href="#'+actual+'" data-idgrouptype="'+tipo+'" onclick="clickAnchorLink(event);">ACTIVA!! (eta: '+timerNotificacion+')</a>':'')+
							'</li>';
						}
						if(actual!=''){
							let data=c;
							data.actual=actual;
							data.tipo=tipo;
							data.timeLeft=timerNotificacion;
							if(notificar==true){
								notifyNotification(data);
							}
						}
					}else{
						if(t==c['t']){
							if(actual!=''){listaActiva=true;}
							var notificar=chequearInformar(c['i']);
							var isCompleted=(completa?' completed':'');
							var notifId=(actualId!=''?actualId:c['i']);
							if((!notifOnlyNonCompleted||(notifOnlyNonCompleted&&!completa))&&(!notifOnlyActive||(notifOnlyActive&&actual!=''))){
								notificacion+='<li class="'+(actual!=''?'notifActive':'notifInactive')+isCompleted+'">'+
								'<label><input type="checkbox" onClick="toggleInformar(this.name,this.checked);" name="'+c['i']+'"' + (notificar?" checked":"")+'> 📣 📣 📣 </label>'+
								'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+c['i']+'" target="blank">'+
								'<img class="thumbnailNotif" src="'+c['l']+'">'+
								'<span class="capitalize">'+c['i']+'</span>'+
								'</a>'+
								(actual==''?'':'<label>(<input type="checkbox" onclick="toggleCompletar(this.name);"'+(completa?" checked ":"")+'name="'+notifId+'"' +'>Completa?)</label>')+
								(notifShowLastDate?' ('+dateToString(c[platform])+')':"")+(actual!=''?' <a href="#'+actual+'" data-idgrouptype="'+tipo+'" onclick="clickAnchorLink(event);">ACTIVA!! (eta: '+timerNotificacion+')</a>':'')+
								'</li>';
							}
							if(actual!=''){
								let data=c;
								data.actual=actual;
								data.tipo=tipo;
								data.timeLeft=timerNotificacion;
								if(notificar==true){
									notifyNotification(data);
								}
							}
						}
					}
				});
				var idLista="'typeNotif"+t.toUpperCase()+"'";
				var ocultarTipo=chequearInformarNotif("typeNotif"+t.toUpperCase());
				// crear un array que guarde que tipo mostrar
				notificaciones.innerHTML+=(notificacion!=''?'<div class="listaNotificaciones"><article><h5 class="ucase subrayado '+(listaActiva!=''?'notifActive':'notifInactive')+'" onClick="toggleHide('+idLista+');toggleInformarNotif('+idLista+')">'+t+(ocultarTipo?' (▼▼▼▼▼)':' (▲▲▲▲▲)')+'</h5><ul id="typeNotif'+t.toUpperCase()+'" class='+(ocultarTipo?"hidden":"")+'>'+comboSonido+notificacion+'</ul></article></div>':'');
			});
			notificaciones.innerHTML+='</div>'
		}

		//Events
		var eventsData=resultJson.events;
		if (eventsData.length>0){

			eventsTitle.innerHTML="🌑 Eventos ("+eventsData.length+' activo)';
			tabTitleEventos.innerHTML="Eventos ["+eventsData.length+']';

			removeClass('eventsCheckbox','hidden');
			parseado='';
			// parseado='<a id="E"></a>';
			// parseado+='<h3>Eventos</h3>';
			
			eventsData.forEach(function(e){
				parseado +='<article>';

				if(e.jobs!=null){
					parseado +='<span class="subrayado"><h2>' +e.description+'(<a href="http://warframe.wikia.com/wiki/Special:Search?search='+e.affiliatedWith+'" target="blank">'+e.affiliatedWith+'</a>)</h2></span>';
					parseado +='<p>' +e.tooltip+'</p>';
					parseado +='<p>Nodo: ' +e.victimNode+'('+e.health+'%)</p>';
					parseado += '<hr>';

					if(e.jobs!=null&&e.jobs.length>0){
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
				}else{
					parseado +='<span class="subrayado"><h2>'+e.description+' (Expira:'+dateToString(e.expiry)+')</h2></span>';
					parseado +='<p>'+e.asString+'</p>';
					(e.faction!=undefined&&e.faction!=''?parseado +='<p>Faccion: '+e.faction+'</p>':'');
					(e.node!=undefined&&e.node!=''?parseado +='<p>Nodo: '+e.node+'</p>':'');
					if(e.concurrentNodes!=null&&e.concurrentNodes.length>0){
						parseado +='<ul>';
						e.concurrentNodes.forEach(cn=>{
							parseado +='<li>'+(cn.thumbnail!=undefined&&cn.thumbnail!=''?'<img src="'+securizeUrl(cn.thumbnail)+'">':'')+' '+cn+'</li>'
						});
						parseado +='</ul>';
					}

					parseado+='<hr>';
					if(e.rewards!=null&&e.rewards.length>0){
						parseado +='<ul>';
						e.rewards.forEach(rew=>{
							parseado +='<li>'+(rew.thumbnail!=undefined&&rew.thumbnail!=''?'<img src="'+securizeUrl(rew.thumbnail)+'">':'')+' '+rew.asString+'</li>'
						});
						parseado +='</ul>';
					}
					parseado +='</article>';


				}
			});

			// parseado += '<hr>';
			events.innerHTML=parseado;
		}else{
			// addClass('eventsCheckbox','hidden');
			events.innerHTML='<h2>No hay eventos activos</h2>';
			eventsTitle.innerHTML="❌ Eventos (No hay eventos activos)"
			tabTitleEventos.innerHTML='Eventos [0]';
		}

		//Alerts
		ths=[];
		tds=[];
		parseado='';
		txtCopyAll='';

		// parseado='<a id="A"></a>';
		// parseado+='<h3>Alertas</h3>';
		
		var alertsData=resultJson.alerts;
		ths.push([['Tiempo','alertTH'],['Tipo Mision','alertTH'],['Nodo','alertTH'],['Faccion','alertTH'],['Reward','alertTH']])
		let countAlertasCompletas=0;
		alertsData.forEach(function(a){
			var td=[];
			var idFaction=a.mission.faction.toLowerCase();
			var idAlerta="'"+a.id+"'";
			var alertaCompleta=chequearCompleto(a.id);
			alertaCompleta?countAlertasCompletas++:'';
			var txtCopiar="'Alerta: "+a.mission.reward.asString+" | "+a.mission.node+" | "+a.mission.type+" ("+a.mission.faction+" "+a.mission.minEnemyLevel+"-"+a.mission.maxEnemyLevel+")"+(a.mission.nightmare?" (Nightmare)":"")+(a.mission.archwingRequired?" (Archwing)":"")+" ("+strDiff((a.eta),diff)+")"+(alertaCompleta?' (Completa) ':'')+' (https://nekro-warframe.netlify.com)'+"'";
			txtCopyAll+=strReplaceAllNonPrintable(txtCopiar+'\\n');

			var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>";

			// agrego a la lista la alertaActiva
			alertaActivaArr.push(a.id);

			var checkBoxCompleted='<a id='+idAlerta+'></a><label><input type="checkbox" onclick="toggleCompletar('+idAlerta+')"'+(alertaCompleta?' checked':'')+'>Completa?</label><br>'
			var isCompleted=(alertaCompleta?' completed':'');
			
			var cookieStore='';
			var persistObject={};
			if(a.rewardTypes.length>0){
				a.rewardTypes.forEach(function(rt){
					// setCookie('a_'+rt,new Date(),365*24*60*60*1000);
					if(rt!=''){
						cookieStore+='t_'+compressItemType(rt);
						persistObject.t=rt
					}
				});
			}
			if(a.mission.reward.items+!undefined&&a.mission.reward.items.length>0){
				a.mission.reward.items.forEach(function(ri){
					// setCookie('a_'+rt,new Date(),365*24*60*60*1000);
					if(ri!=''){
						cookieStore+='_i_'+compressItemName(ri);
						persistObject.i=ri;
					}
				});
			}
			cookieStore+='_l_'+compressURL(a.mission.reward.thumbnail);
			persistObject.l=a.mission.reward.thumbnail;
			persistObject.d=new Date();
			persistObject.p=platform;
			
			persistObject[platform]=persistObject.d
			
			persistInfo(cookieStore,persistObject);

			td.push([checkBoxCompleted+'<img src="'+compressURL(a.mission.reward.thumbnail,true) +'">'+imgCopiar+'<BR>'+ strDiff((a.eta),diff),'tdAlert '+idFaction]);
			var modifs='';
			/*
			(a.mission.nightmare?modifs+='N ':'');
			(a.mission.archwingRequired?modifs+='Aw ':'');
			td.push([modifs,'tdAlert '+idFaction+isCompleted]);
			modifs='';
			*/
			(a.mission.nightmare?modifs+='N ':'');
			(a.mission.archwingRequired?modifs+='Aw ':'');
			modifs+=(a.mission.maxWaveNum!=undefined&&a.mission.maxWaveNum!='')?'Waves:'+ a.mission.maxWaveNum :'';
			modifs=(modifs!='')?' ('+modifs+')':'';
			td.push([a.mission.type+modifs,'tdAlert '+idFaction+ isCompleted]);
			td.push([a.mission.node,'tdAlert '+idFaction+ isCompleted]);
			td.push([idFaction.toUpperCase()+' ('+a.mission.minEnemyLevel+'-'+a.mission.maxEnemyLevel+')','tdAlert '+idFaction+ isCompleted]);
			// td.push([a.mission.minEnemyLevel+'-'+a.mission.maxEnemyLevel,'tdAlert '+idFaction+ isCompleted]);
			td.push(['<a href="http://warframe.wikia.com/wiki/Special:Search?search='+a.mission.reward.asString+'" target="blank">'+a.mission.reward.asString+'</a>','tdAlert '+idFaction+ isCompleted]);
			if (!a.expired){tds.push(td);}
		});
		parseado += '<br><img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"warframeCopyToClipboard('+"'"+txtCopyAll+"','Alerts'"+')"'+"></img>Copiar todo ["+tds.length+']';
		parseado += generateTable(tds,ths,'tableAlerts enlargeMe','','');
		parseado += '<hr>';
		alerts.innerHTML=parseado;
		alertsTitle.innerHTML='🌑 Alertas ['+countAlertasCompletas+'-'+alertaActivaArr.length+']';
		tabTitleAlertas.innerHTML='Alertas ['+countAlertasCompletas+'-'+alertaActivaArr.length+']';
    	
    	//Persistent enemies
    	if(resultJson.persistentEnemies!=undefined&&resultJson.persistentEnemies.length>0){
	    	removeClass('persistentEnemiesTab','hidden');
	    	
	    	persistentEnemiesSpeech.checked=chequearInformar('persistentEnemiesSpeech');
	    	
	    	tds=[];
	    	ths=[];
	    	ths.push([['Nombre','alertTH'],['HP %','alertTH'],['Status','alertTH'],['Ultimo Nodo','alertTH'],['Ultima vez visto','alertTH'],['Nivel','alertTH'],['Drops','alertTH']]);
	    	resultJson.persistentEnemies.forEach(e=>{
	    		let diffPersistent=new Date(new Date().toUTCString())-moment(e.lastDiscoveredTime);
	    		
	    		//console.log(diffPersistent);
	    		var td=[];
	    		let status='';
	    		let pep=persistentEnemiesProfiles;
	    		let profileImg=(pep[e.agentType.toLowerCase()]!=undefined?'<img src="'+pep[e.agentType.toLowerCase()]+'"':'');
	    		if(e.healthPercent>0){
	    			status=(e.isDiscovered?'Found':'Hidden');
	    		}else{
	    			status='Dead';
	    		}

	    		let gameMode='';
	    		let faccionNodoAccolyte='';
	    		let nivelNodoAccolyte='';

	    		if(resultJsonDrops!=''&&resultJsonDrops!=undefined){
	    			if(e.lastDiscoveredAt!=''){
		    			let dato= pipedStringToArray(e.lastDiscoveredAt," (");
		    			let planeta=strReplaceAll(dato[1],')','');
		    			//planeta=planeta.split(",")[0];
		    			let nodo=dato[0];
		    			//console.log("+"+planeta+"+"+nodo+"+");
		    			if(resultJsonDrops.missionRewards[planeta]!=undefined&&resultJsonDrops.missionRewards[planeta][nodo]!=undefined){
		    				gameMode=' - {'+resultJsonDrops.missionRewards[planeta][nodo].gameMode+'}';	
		    			}else{
		    				//console.log(planeta, (resultJsonDrops.missionRewards[planeta]!=undefined?resultJsonDrops.missionRewards[planeta]:undefined));
		    				//console.log(nodo, (resultJsonDrops.missionRewards[planeta]!=undefined&&resultJsonDrops.missionRewards[planeta][nodo]?resultJsonDrops.missionRewards[planeta][nodo]:undefined));
		    			}
		    			if(planetas[planeta]!=undefined){
		    				nivelNodoAccolyte=planetas[planeta].level;
		    				faccionNodoAccolyte=planetas[planeta].faction;
	    				}else{
	    					console.log(planeta);
	    				}
	    			}
	    		}

	    		if((notificationStatus[e.agentType]==undefined||notificationStatus[e.agentType]!=status)&&(!window.speechSynthesis.speaking)){
	    			//resultJson.persistentEnemies[0].isDiscovered=false
	    			let imgToast=(profileImg!=''?'<p>'+profileImg+' class="thumbnail"></p>':'');
	    			switch(status){
	    				case 'Found':
	    					generateToast(e.agentType+' health:'+Math.round(e.healthPercent*100,2)+'% ('+status+')','<a href="#PE">'+imgToast+e.agentType+' '+status+' in '+e.lastDiscoveredAt+(gameMode!=''?' mission type ' +gameMode:'')+' Time: ' + strDiff(e.lastDiscoveredTime,diffPersistent*-1)+'</a>',"",15000,"success");
	    					break;
	    				case 'Hidden':
	    					generateToast(e.agentType+' health:'+Math.round(e.healthPercent*100,2)+'% ('+status+')','<a href="#PE">'+imgToast+e.agentType+' '+status+' last seen in '+e.lastDiscoveredAt+(gameMode!=''?' mission type ' +gameMode:'')+' Time: ' + strDiff(e.lastDiscoveredTime,diffPersistent*-1)+'</a>',"",15000,"info");
	    					break;
	    				case 'Dead':
	    					generateToast(e.agentType+' is '+status,'<a href="#PE">'+imgToast+e.agentType+' '+status+' last seen in '+e.lastDiscoveredAt+(gameMode!=''?' mission type ' +gameMode:'')+' Time: ' + strDiff(e.lastDiscoveredTime,diffPersistent*-1)+'</a>',"",15000,"error");
	    					break;
	    				default:
	    			}
	    			
	    			if(persistentEnemiesSpeech.checked==true){
		    			let say='';
		    			switch(status){
		    				case 'Found':
		    					say = 'Attention Acolyte ' + e.agentType.toUpperCase()+', health: '+Math.round(e.healthPercent*100,2)+'%, '+status.toUpperCase()+', in '+e.lastDiscoveredAt+(gameMode!=''?', mission type ' +gameMode:'')+ ', Time update: ' + convertTimeToSpeacheable(strDiff(e.lastDiscoveredTime,diffPersistent*-1))+'. Repeating: '+e.agentType.toUpperCase()+', is now '+status.toUpperCase()+', health: '+Math.round(e.healthPercent*100,2)+'% ';
		    					break;
		    				case 'Hidden':
		    					say = 'Info Acolyte ' +e.agentType.toUpperCase()+', health: '+Math.round(e.healthPercent*100,2)+'%, '+status.toUpperCase()+', last seen in '+e.lastDiscoveredAt+(gameMode!=''?', mission type ' +gameMode:'')+', Time update: ' +  convertTimeToSpeacheable(strDiff(e.lastDiscoveredTime,diffPersistent*-1))+'. Repeating: '+e.agentType.toUpperCase()+', is now '+status.toUpperCase()+', health: '+Math.round(e.healthPercent*100,2)+'% ';
		    					break;
		    				case 'Dead':
		    					say = 'Info Acolyte ' +e.agentType.toUpperCase()+', is now '+status.toUpperCase()+', last seen in '+e.lastDiscoveredAt+(gameMode!=''?', mission type ' +gameMode:'')+ ', Time update: ' +  convertTimeToSpeacheable(strDiff(e.lastDiscoveredTime,diffPersistent*-1))+'. Repeating: '+e.agentType.toUpperCase()+', is now '+status.toUpperCase();	
		    					break;
		    				default:
		    			}
		    			console.log(say);
	    				textToSpeech(say,'en-GB');
	    			}
	    			notificationStatus[e.agentType]=status;
	    		}
	    		let tableProfileImg=(profileImg!=''?profileImg+' class="thumbnailNotif">':'');
	    		let classTD='persistentEnemy'+status;
	    		td.push(['<a href="http://warframe.wikia.com/wiki/'+e.agentType+'" target="blank">'+tableProfileImg+e.agentType+'</a>',classTD]);
	    		td.push(['<p><progress max="100" value="'+e.healthPercent*100+'"></p><p>'+e.healthPercent*100+'%'+'</p>',classTD]);
	    		td.push([status,classTD]);
	    		td.push(['<p>'+e.lastDiscoveredAt+gameMode+'</p>'+(faccionNodoAccolyte!=''?'<p class="'+faccionNodoAccolyte.toLowerCase()+'">'+faccionNodoAccolyte+' ('+nivelNodoAccolyte+')</p>':''),classTD]);
	    		td.push([strDiff(e.lastDiscoveredTime,diffPersistent*-1),classTD]);
	    		td.push([e.rank,classTD]);
	    		td.push(['<input type="button" value="Drops '+e.agentType+'" onClick="addDropQuery('+"'"+e.agentType+"','modLocations'"+');">',classTD]);
	    		tds.push(td);
	    		/*
	    		agentType:"Angst"
	    		fleeDamage:50000
				healthPercent:1
				id:"5b69b2ea66db80f7fba392ec"
				isDiscovered:true
				isUsingTicketing:false
				lastDiscoveredAt:"Gabii (Ceres)"
				lastDiscoveredTime:"2018-08-07T18:27:16.979Z"
				locationTag:"Angst"
				pid:"5b69b2ea66db80f7fba392ectrue"
				rank:35
				region:9
				*/
	    	})
	    	persistentEnemies.innerHTML=generateTable(tds,ths,'tableAlerts','','border="1px solid white"');
    	}else{
    		addClass('persistentEnemiesTab','hidden');
    		persistentEnemies.innerHTML='';
    	}		
		
		//Invasions
		ths=[];
		tds=[];
		parseado='';
		// parseado='<a id="I"></a>';
		// parseado+='<h3>Invasiones</h3>'
		
		parseado+='<div class="">Construcciones:'
		parseado+='<ul><li class="grineer">Fomorian: '+resultJson.constructionProgress.fomorianProgress+'%</li>'
		parseado+='<li class="corpus">RazorBack: '+resultJson.constructionProgress.razorbackProgress+'%</li>'
		parseado+='<li class="infested hidden">Unknown: '+resultJson.constructionProgress.unknownProgress+'%</li></ul></div'
		
		var invasionData=resultJson.invasions;
		//ths.push([['Descripcion Mision','invTH'],['Nodo','invTH'],['Porcentaje','invTH'],['Ataca','invTH'],['Reward A','invTH'],['Defiende','invTH'],['Reward D','invTH'],['VS infested','invTH']])
		ths.push([['Descripcion Mision','invTH'],['Nodo','invTH'],['Defiende','invTH'],['Porcentaje','invTH'],['Ataca','invTH']])
		txtCopyAll='';
		let countInvasionsCompletas=0;
		invasionData.forEach(function(inv){
			var td=[];
			if (!inv.completed){
				
				//Agregado a la lista de notificaciones de cookies
				var cookieStore='';
				if(!inv.vsInfestation){
					cookieStore='t_'+compressItemType('invasion')+'_i_'+compressItemName(inv.attackerReward.asString)+'_l_'+compressURL(inv.attackerReward.thumbnail);
					var persistObject={'t':'invasion','i':inv.attackerReward.asString,'l':inv.attackerReward.thumbnail,'d':new Date(),'p':platform};
					persistObject[platform]=new Date();
					persistInfo(cookieStore,persistObject);
				}
				cookieStore='t_'+compressItemType('invasion')+'_i_'+compressItemName(inv.defenderReward.asString)+'_l_'+compressURL(inv.defenderReward.thumbnail);
				var persistObject={'t':'invasion','i':inv.defenderReward.asString,'l':inv.defenderReward.thumbnail,'d':new Date(),'p':platform};
				persistObject[platform]=new Date();
				persistInfo(cookieStore,persistObject);

				var atk=inv.attackingFaction.toLowerCase();
				var def=inv.defendingFaction.toLowerCase();
				var idInvasion="'"+inv.id+"'";
				var invasionCompleta=chequearCompleto(inv.id);
				invasionCompleta?countInvasionsCompletas++:'';
				var checkBoxCompleted='<label><input type="checkbox" onclick="toggleCompletar('+idInvasion+')"'+(invasionCompleta?' checked':'')+'>Completa?</label><br>'
				var isCompleted=(invasionCompleta?' completed':'');

				// agrego la invasionActiva
				invasionActivaArr.push(inv.id);

				var txtCopiar="'"+"Invasion: "+inv.desc+"|"+inv.node+"|"+atk.toUpperCase()+(!inv.vsInfestation?" ("+inv.attackerReward.asString+")":"")+" vs "+def.toUpperCase()+" ("+inv.defenderReward.asString+")|"+ Math.round(inv.completion,5)+'% - '+strDiff(inv.eta,diff)+(invasionCompleta?' (Completa) ':'')+' (https://nekro-warframe.netlify.com)'+"'";
				txtCopyAll+=strReplaceAllNonPrintable(txtCopiar+'\\n');
				var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>";

				td.push([imgCopiar+checkBoxCompleted+inv.desc,'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)]);
				td.push([inv.node,'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)+isCompleted]);
				td.push([inv.defendingFaction.toUpperCase()+'<br>'+'<a id="'+inv.defenderReward.asString+'"></a><img src="'+compressURL(inv.defenderReward.thumbnail,true) +'"><BR>'+ '<a href="http://warframe.wikia.com/wiki/Special:Search?search='+inv.defenderReward.asString+'" target="blank">'+inv.defenderReward.asString+'</a>','tdInvasion '+def+isCompleted]);
				td.push(['<img src="static/img/arrowRight.gif" class="'+((Math.round(inv.completion,5))>50?'':'invert')+'">'+'<div class=progressInv'+((Math.round(inv.completion,5))>50?atk:def)+'><progress value='+inv.completion+' max=100 /></div>'+Math.round(inv.completion,5)+'% - '+strDiff(inv.eta,diff),'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)+isCompleted]);
				td.push([inv.attackingFaction.toUpperCase()+'<BR>'+(!inv.vsInfestation?'<a id="'+inv.attackerReward.asString+'"></a><img src="'+compressURL(inv.attackerReward.thumbnail,true) +'"><BR>'+ '<a href="http://warframe.wikia.com/wiki/Special:Search?search='+inv.attackerReward.asString+'" target="blank">'+inv.attackerReward.asString+'</a>':'❌'),'tdInvasion '+atk+isCompleted]);
				tds.push(td);	
			}
		});

		parseado += '<br><img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"warframeCopyToClipboard('+"'"+txtCopyAll+"','Invasion'"+')"'+"></img>Copiar todo ["+tds.length+']';
		parseado += '<div>'+generateTable(tds,ths,'tableInvasion','','border="1px solid white"')+'</div>';
		parseado += '<hr>';
		invasions.innerHTML=parseado;
		invasionsTitle.innerHTML='🌑 Invasiones ['+countInvasionsCompletas+'-'+invasionActivaArr.length+']';
		tabTitleInvasiones.innerHTML='Invasiones ['+countInvasionsCompletas+'-'+invasionActivaArr.length+']';
		
		//Sortie
		ths=[];
		tds=[];
		parseado='';
		txtCopyAll='';
		var sortieData=resultJson.sortie;
		// parseado ='<a id="S"></a>';
		if (sortieData!=undefined){
			// parseado += '<h3>(Sortie '+'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+sortieData.boss+'" target="blank">'+sortieData.boss+'</a>'+'-'+'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+sortieData.faction+'" target="blank">'+sortieData.faction+'</a>'+'-'+strDiff((sortieData.eta),diff)+')</h3><div>Jefe: '+sortieData.boss;
			parseado += '<div>Jefe: '+sortieData.boss
			parseado += '<BR>Faccion: '+sortieData.faction;
			parseado += '<BR>Tiempo Restante: '+strDiff((sortieData.eta),diff)+'('+sortieData.eta+')</div>';
			var sortieFaction=sortieData.faction.toLowerCase();
			ths.push([['Tipo Mision'],['Nodo'],['Modificador'],['Descripcion Modificador']]);
			let countSortieCompletas=0;
			sortieData.variants.forEach(function(v){
				var idSortie="'"+v.missionType+v.node+v.modifier+"'";
				var sortieCompleta=chequearCompleto(v.missionType+v.node+v.modifier);
				var checkBoxCompleted='<label><input type="checkbox" onclick="toggleCompletar('+idSortie+')"'+(sortieCompleta?' checked':'')+'></label>'
				var isCompleted=(sortieCompleta?' completed':'');
				isCompleted?countSortieCompletas++:'';
				// agego la sortieActiva
				sortieActivaArr.push(v.missionType+v.node+v.modifier);

				var txtCopiar="'"+"Sortie: "+v.missionType+"|"+v.node+"|"+sortieFaction.toUpperCase()+"|"+v.modifier+"|"+sortieData.eta+(sortieCompleta?' (Completa) ':'')+' (https://nekro-warframe.netlify.com)'+"'";
				txtCopyAll+=strReplaceAllNonPrintable(txtCopiar+'\\n');
				var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>";

				var td=[];
				td.push([imgCopiar+checkBoxCompleted+v.missionType,'tdSortie '+sortieFaction]);
				td.push([v.node,'tdSortie '+sortieFaction+isCompleted]);
				td.push([v.modifier,'tdSortie '+sortieFaction+isCompleted]);
				td.push([v.modifierDescription,'tdSortie '+sortieFaction+isCompleted]);
				tds.push(td);	
			});
			parseado += '<br><img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"warframeCopyToClipboard('+"'"+txtCopyAll+"','Sortie'"+')"'+"></img>Copiar todo ["+tds.length+']';
			parseado += generateTable(tds,ths,'tableSortie enlargeMe','','');
			parseado +='<hr>';
			sortie.innerHTML=parseado;
			sortieTitle.innerHTML = '🌑 Sortie '+'(<a href="http://warframe.wikia.com/wiki/Special:Search?search='+sortieData.boss+'" target="blank">'+sortieData.boss+'</a>'+'-'+'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+sortieData.faction+'" target="blank">'+sortieData.faction+'</a>'+'-'+strDiff((sortieData.eta),diff)+')';
			tabTitleSortie.innerHTML='Sortie [('+countSortieCompletas+'-3) '+strDiff((sortieData.eta),diff)+']';
		}
		
		//Fisures
		parseado='';
		var fisureData=resultJson.fissures;
		// parseado ='<a id="F"></a>';
		// parseado +='<h3>Fisures</h3>';
		
		ths=[];
		tds=[];
		ths.push([['Tier'],['Tiempo'],['Enemigo'],['Tipo'],['Nodo']]);
		txtCopyAll='';

		fisureData.forEach(function(f){
			var td=[];
			var fisureFaction=f.enemy.toLowerCase();

			//var txtCopiar="'"+"Invasion: "+inv.desc+"|"+inv.node+"|"+atk.toUpperCase()+(!inv.vsInfestation?" ("+inv.attackerReward.asString+")":"")+" vs "+def.toUpperCase()+" ("+inv.defenderReward.asString+")|"+ Math.round(inv.completion,5)+'% - '+strDiff(inv.eta,diff)+' (https://nekro-warframe.netlify.com)'+"'";
			//var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img><br>";

			var txtCopiar="'"+"Fissure: "+f.tier+' ('+f.tierNum+')'+"|"+f.node+"|"+f.enemy.toUpperCase()+' - '+f.missionType+"|"+strDiff(f.eta,diff)+' (https://nekro-warframe.netlify.com)'+"'";
			txtCopyAll+=strReplaceAllNonPrintable(txtCopiar+'\\n');
			var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>&nbsp;";

			td.push([imgCopiar+f.tier+' ('+f.tierNum+')','tdFisure '+fisureFaction]);
			td.push([strDiff(f.eta,diff),'tdFisure '+fisureFaction]);
			td.push([f.enemy,'tdFisure '+fisureFaction]);
			td.push([f.missionType,'tdFisure '+fisureFaction]);
			td.push([f.node,'tdFisure '+fisureFaction]);
			tds.push(td);	
		});
		parseado += '<br><img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"warframeCopyToClipboard('+"'"+txtCopyAll+"','Fissure'"+')"'+"></img>Copiar todo ["+tds.length+']';
		parseado += generateTable(tds,ths,'tableFisures enlargeMe','','');
		parseado +='<hr>';
		fissures.innerHTML=parseado;
		fissuresTitle.innerHTML='🌑 Fisuras ['+fisureData.length+']';
		tabTitleFisuras.innerHTML='Fisuras ['+fisureData.length+']';

		//Baro
		var baroData=resultJson.voidTrader;
		parseado='';
		// parseado ='<a id="B"></a>';		
		// parseado +='<h3>'+baroData.character+'</h3>'
		txtCopyAll='';
		var itemsBaro='';
		if(baroData.active){
			baroData.inventory.forEach(function (i){
				itemsBaro+="("+i.item+" | Ducats:"+i.ducats+" | Creditos:"+i.credits+") ";
			});
			tabTitleBaro.innerHTML="Baro ["+baroData.inventory.length+']('+strDiff((baroData.endString),diff)+')';
		}else{
			tabTitleBaro.innerHTML='Baro ('+strDiff((baroData.startString),diff)+')';
		}
		itemsBaro=strReplaceAllNonPrintable(itemsBaro);
		var txtCopiar="'"+"Baro: "+'Llega a '+baroData.location+' ('+strDiff((baroData.startString),diff)+") "+" | "+' Se va:('+strDiff((baroData.endString),diff)+")"+(baroData.active?' | Items: '+itemsBaro:'')+' (https://nekro-warframe.netlify.com)'+"'";
		txtCopyAll+=strReplaceAllNonPrintable(txtCopiar+'\\n');
		var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>";

		parseado +='<p class='+(baroData.active?'"baroEsta"':'"baroNoEsta"')+'>'+(baroData.active?'Se va: '+strDiff((baroData.endString),diff):'Llega: '+strDiff((baroData.startString),diff))+imgCopiar+'</p>';
		
		parseado+=baroData.character+
		'<BR>Llega a: '+baroData.location+' Activo: '+baroData.active+
		'<BR>Llega: '+strDiff((baroData.startString),diff)+' Se va: '+strDiff((baroData.endString),diff);
		if(baroData.active){
			parseado +='<h2>Inventario</h2>';
			ths=[];
			tds=[];
			ths.push([['Item'],['Ducats'],['Creditos']]);
			baroData.inventory.forEach(function (i){
				var td=[];
				var item=strReplaceAllNonPrintable(i.item);

				//Agregado a la lista de notificaciones de cookies
				var cookieStore='';
				cookieStore='t_'+compressItemType('baro')+'_i_'+item+'_l_'+compressURL('static/img/factions/Baro.png');
				var persistObject={'t':'baro','i':item,'l':'static/img/factions/Baro.png','p':platform,'d':new Date()};
				persistObject[platform]=new Date();
				persistInfo(cookieStore,persistObject);

				//Agrego copiar
				var txtCopiar="'"+"Baro: "+item+" | Ducats:"+i.ducats+" | Creditos:"+i.credits+" | Ubicacion: "+baroData.location+' ('+strDiff((baroData.endString),diff)+') (https://nekro-warframe.netlify.com)'+"'";
				txtCopyAll+=strReplaceAllNonPrintable(txtCopiar+'\\n');
				var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>&nbsp;";

				// agrego link al item y anchor
				item='<a id="'+item+'"><a href="http://warframe.wikia.com/wiki/Special:Search?search='+item+'" target="blank">'+item+'</a>'
				td.push([imgCopiar+item,'tdBaro orokin']);
				td.push([i.ducats,'tdBaro orokin']);
				td.push([i.credits,'tdBaro orokin']);

				tds.push(td);
			});
			parseado += '<br><img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"warframeCopyToClipboard('+"'"+txtCopyAll+"','Baro'"+')"'+"></img>Copiar todo ["+tds.length+']';
			parseado +=generateTable(tds,ths,'tableBaro enlargeMe','','');
		}			
		parseado +='<hr>';
		baro.innerHTML=parseado;
		baroTitle.innerHTML='🌑 '+baroData.character +' - '+(baroData.active?"ESTA ACTIVO":"NO ESTA ACTIVO");

		//Syndicates
		var synData=resultJson.syndicateMissions;
		let generalSyndicateCopy='';
		parseado="";
		// parseado +='<h3>Sindicatos</h3>'
		synData.forEach	(function(s){
			parseado+="<h2>"+s.syndicate+" | "+strDiff(s.eta,diff)+"</h2>";
			/* saco los nodos porque no tiene mucho sentido
			if(s.nodes.length>0){
				parseado+='<h4 class="syndicateTitle">Nodos:</h4><ul>';

				s.nodes.forEach(function (n){
					//Agrego copiar
					var txtCopiar="'"+s.syndicate+' ('+strDiff(s.eta,diff)+')'+" | "+n+' (https://nekro-warframe.netlify.com)'+"'";
					var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>&nbsp;";

					parseado+='<li class="syndicateNode">'+imgCopiar+n+"</li>";
				});
				parseado+="</ul>";
			}
			*/
			txtCopyAll='';
			if(s.jobs.length>0){
				parseado+="<ul>";
				s.jobs.forEach(function (j){
					txtCopyAll='';
					var enemyLevels	="";
					j.enemyLevels.forEach(function (el){
						if (enemyLevels==""){
							enemyLevels+=el;
						}else{
							enemyLevels+="-"+el;
						}

					});
					enemyLevels="Nivel: "+enemyLevels;

					var standingStages	="";
					j.standingStages.forEach(function (ss){
						if (standingStages==""){
							standingStages+=ss;
						}else{
							standingStages+="-"+ss;
						}
					});

					var rewards="<h4>Rewards"+" | ("+strDiff(s.eta,diff)+"):</h4><ol>";
					j.rewardPool.forEach(function (rp){
						//Agrego copiar
						var txtCopiar="'Syndicate Faction: "+s.syndicate+' ('+strDiff(s.eta,diff)+')'+" | "+j.type+" | "+enemyLevels+" | "+"Standing ("+j.standingStages.length+"): "+standingStages+" | "+rp+' (https://nekro-warframe.netlify.com)'+"'";						
						txtCopyAll+=strReplaceAllNonPrintable(txtCopiar+'\\n');
						generalSyndicateCopy+=strReplaceAllNonPrintable(txtCopiar+'\\n');
						var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>&nbsp;";
						var link='<a href="http://warframe.wikia.com/wiki/Special:Search?search='+rp+'" target="blank">🔗</a>';

						rewards+='<li class="syndicateReward '+checkSetsClass(rp)+ '"'+'>'+imgCopiar+link+"&nbsp;"+rp+'</li>';
					});
					rewards+="</ol>";

					standingStages="Standing: "+standingStages;
					parseado += '<br><img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"warframeCopyToClipboard('+"'"+txtCopyAll+"','Syndicate'"+')"'+"></img>Copiar todo";
					parseado+='<li class="syndicateTitle">'+j.type+"<br>"+enemyLevels+"<br>"+standingStages+rewards+"<br><hr></li>";
				});
				parseado+="</ul>";
			}
		});
		syndicates.innerHTML= '<br><img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"warframeCopyToClipboard('+"'"+generalSyndicateCopy+"','Syndicate'"+')"'+"></img>Copiar todas las rewards";
		syndicates.innerHTML+= parseado;

		//News
		var newsData=resultJson.news;
		parseado='';
		// parseado='<a id="N"></a>';
		// parseado='<h3>News</h3>';
		parseado+='<h4 style="text-align:center;">DE TIMEZONE<br>||| EDT(-4): '+calcActualTimeTimezone(-4)+' <|||> EST(-5): '+calcActualTimeTimezone(-5)+' |||</h4>';
		parseado+='<ul class="news enlargeMe">';
		newsData.forEach(function(n){
			let tipoNews=''
			tipoNews+=n.primeAccess!=undefined&&n.primeAccess==true?' PRIME ACCESS ':'';
			tipoNews+=n.priority!=undefined&&n.priority==true?' PRIORIDAD ':'';
			tipoNews+=n.stream!=undefined&&n.stream==true?' STREAM ':'';
			tipoNews+=n.update!=undefined&&n.update==true?' UPDATE ':'';

			parseado+='<li><img src="'+securizeUrl(n.imageLink)+'" alt="'+n.message+'">&nbsp;'+(tipoNews!=''?'<span class="infested">'+tipoNews+'</span> ':'')+'&nbsp;<a href="'+n.link+'" target="blank">'+n.message+'</a>&nbsp;&nbsp;&nbsp;&nbsp;['+strDiff(n.eta, diff*-1)+']</li>'
		});
		parseado +='</ul><hr>';
		news.innerHTML=parseado;
		newsTitle.innerHTML='🌑 News ['+newsData.length+']';

		limpiarCompletasFinalizadas();
	}
}
function checkSetsClass(reward){
	reward=reward.toLowerCase();
	result='';
	setsToCheck.forEach(function (s){
		s=s.toLowerCase();
		if(reward.indexOf(s)>-1){
			result=s;
		}
	});
	if (result!=''){
		return result;
	}else{
		return result;
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
			//console.log(stringDate+'*'+t+'*'+caracter+'* default');
		}
	});
	return response;
}

function strDiff(strDate, diff){
	var result = strToDate(strDate)-diff;
	if (result<0){
		return '---';
	}
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
		dias=(dias!=1&&dias!=31)?fillStr(dias, 2)+'d ':'';

		horas=(horas!=0)?fillStr(horas, 2)+'h ':'';
		minutos=(minutos!=0)?fillStr(minutos, 2)+'m ':'';
		segundos=fillStr(segundos, 2)+'s ';

		result=dias +''+horas+''+minutos+''+segundos;
	// }

	return result;
}

function convertTimeToSpeacheable(time){
	let splited=time.split(" ");
	let result='';
	splited.forEach(s=>{
		switch(s.substring(s.length-1)){
			case 'd':
				result+=s.substring(0,s.length-1)+' days ';
				break;
			case 'h':
				result+=s.substring(0,s.length-1)+' hours ';
				break;
			case 'm':
				result+=s.substring(0,s.length-1)+' minutes ';
				break;
			case 's':
				result+=s.substring(0,s.length-1)+' seconds ';
				break;
			default:
		}
	});
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
	var cookieData="BCSI-CS-53631f2127934e24=2; BCSI-CS-170bdc07205ed45e=2; completas=5b19335af3cc7f49b2e101fc; t_helmet_i_Zephyr Cierzo Helmet Blueprint_l_https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png=Thu Jun 07 2018 10:57:25 GMT-0300 (hora estándar de Argentina); t_plastids_l_https://i.imgur.com/5yVfTEF.png=Thu Jun 07 2018 10:57:25 GMT-0300 (hora estándar de Argentina); t_credits_l_https://i.imgur.com/JCKyUXJ.png=Thu Jun 07 2018 10:57:25 GMT-0300 (hora estándar de Argentina); "
	cookieData+="t_endo_i_100 Endo_l_https://i.imgur.com/mS8oSwx.png=Thu Jun 07 2018 09:43:41 GMT-0300 (Argentina Standard Time); t_catalyst_i_Orokin Catalyst Blueprint_l_https://i.imgur.com/C4X9NWm.png=Thu Jun 07 2018 09:48:41 GMT-0300 (Argentina Standard Time); completas=; t_oxium_l_https://i.imgur.com/hY8NCjk.png=Thu Jun 07 2018 09:49:41 GMT-0300 (Argentina Standard Time); t_traces_l_https://i.imgur.com/vvZGMPv.png=Thu Jun 07 2018 10:04:30 GMT-0300 (Argentina Standard Time); t_endo_i_80 Endo_l_https://i.imgur.com/mS8oSwx.png=Thu Jun 07 2018 10:15:34 GMT-0300 (Argentina Standard Time); t_argonCrystal_l_https://i.imgur.com/DdJJYSB.png=Thu Jun 07 2018 10:41:41 GMT-0300 (Argentina Standard Time); t_helmet_i_Zephyr Cierzo Helmet Blueprint_l_https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png=Thu Jun 07 2018 10:57:42 GMT-0300 (Argentina Standard Time); t_plastids_l_https://i.imgur.com/5yVfTEF.png=Thu Jun 07 2018 11:18:43 GMT-0300 (Argentina Standard Time); t_nitain_l_https://i.imgur.com/3Db4PHh.png=Thu Jun 07 2018 11:49:41 GMT-0300 (Argentina Standard Time); t_helmet_i_Valkyr Kara Helmet Blueprint_l_https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png=Thu Jun 07 2018 12:41:41 GMT-0300 (Argentina Standard Time); t_helmet_i_Ember Backdraft Helmet Blueprint_l_https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png=Thu Jun 07 2018 14:10:40 GMT-0300 (Argentina Standard Time); t_endo_i_150 Endo_l_https://i.imgur.com/mS8oSwx.png=Thu Jun 07 2018 14:35:00 GMT-0300 (Argentina Standard Time); t_helmet_i_Oberon Oryx Helmet Blueprint_l_https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png=Thu Jun 07 2018 14:40:33 GMT-0300 (Argentina Standard Time); t_credits_l_https://i.imgur.com/JCKyUXJ.png=Thu Jun 07 2018 14:40:33 GMT-0300 (Argentina Standard Time)"
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
        	var cachedPlatform='';
            // (cookieMasticada)
            var cM=cookie;

            cV='=';
            if (cM.indexOf(cV) > -1) {
            	cachedTime=cM.substring(cM.indexOf(cV), cM.length);
            	cM=cM.substring(0, cM.length-cachedTime.length);
            	cachedTime=cachedTime.replace(cV,'');
            }
            
            cV='_p_';
            if (cM.indexOf(cV) > -1) {
            	cachedPlatform=cM.substring(cM.indexOf(cV), cM.length);
            	cM=cM.substring(0, cM.length-cachedPlatform.length);
            	cachedPlatform=cachedPlatform.replace(cV,'');
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
            if(cachedPlatform==platform||document.cookie==''){
            	cachedData.push({cachedType,cachedItem,cachedImgLink,cachedTime,cachedPlatform});
            }
        }
    }
    return compressNotification(cachedData,true);
}
function cargarSonidos(){
	var auxArr=[];

	sounds.push({'value':'Deshabilitado','texto':'Deshabilitado','default':true});
	//sounds.push({'value':'Hablado','texto':'Hablado','default':false});

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
	var comboSelectedValue='Deshabilitado';
	var comboItemChecked=false;
	var comboTypeChecked=false;
	var comboPushChecked=false;
	var textoADecir='';

	var sonidoPersistido=[];
	sonidoPersistido=getPersistedSound(id);
	if(sonidoPersistido.combo!=undefined){
		comboSelectedValue=sonidoPersistido.combo;
		comboItemChecked=sonidoPersistido.checkItem;
		comboTypeChecked=sonidoPersistido.checkTipo;
		comboPushChecked=sonidoPersistido.checkPush;
		textoADecir=sonidoPersistido.texto;
	}

	var comboHtml='<select id="'+id+'Combo" class="audioCombo" onchange="cargarSonido(value,'+id+'Sound);" onClick="focusSound('+"'"+id+"'"+",'combo',true);" +'" onFocus="focusSound('+"'"+id+"'"+",'combo',true);" +'" onblur="focusSound('+"'"+id+"'"+",'combo',false)"+'">';
	sounds.forEach(function(s){
		s.default=(s.value==comboSelectedValue?true:false);
		comboHtml+='<option value="'+s.value+'"'+(s.default?' selected':'')+'>'+s.texto+'</option>';
	});
	comboHtml+='</select><audio id="'+id+'Sound"></audio>';
	comboHtml+='<label class="audioCheckbox '+(comboTypeChecked?"soundActive":"soundInactive")+'"><input type="checkbox" '+(comboTypeChecked?" checked":"")+' onclick="focusSound('+"'"+id+"'"+",'CheckTipo',this.checked);"+'" id="'+id+'CheckTipo">Decir Tipo</label>';
	comboHtml+='<label class="audioCheckbox '+(comboItemChecked?"soundActive":"soundInactive")+'"><input type="checkbox" '+(comboItemChecked?" checked":"")+' onclick="focusSound('+"'"+id+"'"+",'CheckItem',this.checked);"+'" id="'+id+'CheckItem">Decir Item</label>';
	comboHtml+='<label class="audioCheckbox hidden '+(comboPushChecked?"soundActive":"soundInactive")+'"><input type="checkbox" '+(comboPushChecked?" checked":"")+' onclick="focusSound('+"'"+id+"'"+",'CheckPush',this.checked);"+'" id="'+id+'CheckPush">Notificar con push</label>';
	comboHtml+='<input class="audioText" type="text" id="'+id+'Text" value="'+textoADecir+'" placeholder="Texto a decir" onfocus="focusSound('+"'"+id+"'"+",'text',true);"+'"'+' onblur="'+"focusSound("+"'"+id+"'"+",'text',false);textToSpeech(value);"+'">';
	comboHtml+='<span class="audioProbar" id="'+id+'Span" onclick="focusSound('+"'"+id+"'"+",'SpanTipo',false);"+'"> (Probar ▶)</span>';
	return comboHtml;
}

function focusSound(id,type,hold){
	// console.log('id: '+id+' type: '+type+' hold: '+hold);
	// console.log('id:'+id+' combotTipo:'+(id+'CheckTipo').checked);

	objCombo=document.getElementById(id+'Combo');
	objCheckTipo=document.getElementById(id+'CheckTipo');
	objCheckItem=document.getElementById(id+'CheckItem');
	objCheckPush=document.getElementById(id+'CheckPush');
	objTexto=document.getElementById(id+'Text');
	objAudio=document.getElementById(id+'Sound');
	persistSound(id,objCombo,objCheckTipo,objCheckItem,objCheckPush,objTexto);

	switch(type){
		case 'combo':

		holdTimer(hold);

		break;
		case 'text':
		holdTimer(hold);

		break;
		case 'CheckTipo':
		if (hold){
			textToSpeech("tipo: "+id);
		}
		break;
		case 'CheckItem':
		if (hold){
			textToSpeech("item de "+id);
		}
		break;
		case 'CheckPush':
		break;
		case 'SpanTipo':
		var decir='';
		if(objCheckTipo.checked){
			decir="tipo: "+id;
		}
		if(objCheckItem.checked){
			decir+=" item de: "+id;
		}
		if(objTexto.value!=''){
			decir+= ' '+objTexto.value
		}
		objAudio.play();
		textToSpeech(decir);
		break;
	}
}
function persistSound(id,combo,checkTipo,checkItem,checkPush,texto){
	var i=0;
	var pos=-1;
	selectedSounds.forEach(function(s){
		if(s.id==id){
			pos=i;
			// console.log('estoy '+pos);
		}
		i++
	});
	// console.log({'id':id,'combo':combo.value,'checkTipo':checkTipo.checked,'checkItem':checkItem.checked,'texto':texto.value});
	if(pos==-1){
		// console.log('agrego '+pos);
		selectedSounds.push({'id':id,'combo':combo.value,'checkTipo':checkTipo.checked,'checkItem':checkItem.checked,'checkPush':checkPush.checked,'texto':texto.value});
	}else{
		// console.log('reemplazo '+pos);
		// selectedSounds[pos].id=id;
		// selectedSounds[pos].combo=combo.value;
		// selectedSounds[pos].checkTipo=checkTipo.checked;
		// selectedSounds[pos].checkItem=checkItem.checked;
		// selectedSounds[pos].texto=texto.value;

		selectedSounds[pos]={'id':id,'combo':combo.value,'checkTipo':checkTipo.checked,'checkItem':checkItem.checked,'checkPush':checkPush.checked,'texto':texto.value}
	}
}
function getPersistedSound(id){
	var response='';
	selectedSounds.forEach(function(sonidoP){
		if(sonidoP.id==id){
			//return {'id':sonidoP.id,'combo':sonidoP.combo,'checkTipo':sonidoP.checkTipo,'checkItem':sonidoP.checkItem};
			response=sonidoP;
			return response;
		}
	});	
	return response;
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

function setCachedDefaultData(){
	var agregados=0;
	//t_neuralSensors_l_https://i.imgur.com/Gq6cz9p.png
	var cookies=document.cookie;
	historicCachedData.forEach(function (hcd){
		var cookieStore='';
		if(hcd.cachedItem!=''){
			cookieStore='t_'+compressItemType(hcd.cachedType)+'_i_'+hcd.cachedItem+'_l_'+compressedURL(hcd.cachedImgLink);
		}else{
			cookieStore='t_'+compressItemType(hcd.cachedType)+'_l_'+compressedURL(hcd.cachedImgLink);
		}
		
		//if(getCookie(cookieStore)==""){
			if(!cookies.includes(cookieStore)){
				if (document.cookie!=''){
					console.log("Agrego:"+cookieStore+"-"+hcd.cachedTime);	
				}
				setCookie(cookieStore,hcd.cachedTime,365*24*60*60*1000);
				agregados++;
			}
		});
	if (agregados>0&&document.cookie!=''){
		console.log(agregados+" agregados!");	
	}
}

function clickAnchorLink(e){
	var id=e.target.dataset.idgrouptype;
	switch (id){
		case 'baro':
			tabTitleBaro.click();
			break;
		case 'alerta':
			tabTitleAlertas.click();
			break;
		case 'invasion':
			tabTitleInvasiones.click();
			break;
		default:
			tabShowAll.click();
	}
}

function openTab(evt, tabName,hasDivContent=true) {
	var i, tabcontent, tablinks;
	var id=evt.target.dataset.idgroupname;
	tabcontent = document.getElementsByClassName("tabcontent");
	if(hasDivContent||tabName=="showAllTab"||tabName=="hideAllTab"){
		for (i = 0; i < tabcontent.length; i++) {
			if(tabcontent[i].dataset.idgroupname==id){
				if(tabName!="showAllTab"){
					tabcontent[i].style.display = "none";	
				}else{
					tabcontent[i].style.display = "block";
				}
			}
		}
		if(tabName!="showAllTab"){
			var tabContent=document.getElementById(tabName);
			if(tabContent!=null&&tabContent.dataset.idgroupname==id){
				tabContent.style.display = "block";
			}
		}
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {       
		if(tablinks[i].dataset.idgroupname==id){
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
	}
	evt.currentTarget.className += " active";
}

function changePlatform(to){
	platform=to;
	counter1=counter1Max-1;
	document.title='['+platform.toUpperCase()+']'+ " Nekro's WF Check";
}

function compressNotification (notifArray,decompress=false){
	let res=[];
	notifArray.forEach(n=>{
		let notif={};
		if(n['t']==undefined){
			n['cachedPlatform']==undefined?n['cachedPlatform']='pc':'';
			n['k']==undefined?n['k']=n['k']=n['cachedType']+'-'+n['cachedItem']:'';
			
			notif['k']=n['k']; //k (key)
			notif['t']=compressItemType(n['cachedType'],decompress); //t
			notif['i']=compressItemName(n['cachedItem'],decompress); //i
			notif['l']=compressURL(n['cachedImgLink'],decompress); //l
			notif[n['cachedPlatform']]=convertDateLocalToIso(n['cachedTime'],decompress);
		}else{
			n['k']==undefined?n['k']=n['k']=n['t']+'-'+n['i']:'';

			notif['k']=n['k']; //k (key)
			notif['t']=compressItemType(n['t'],decompress); //t
			notif['i']=compressItemName(n['i'],decompress); //i
			notif['l']=compressURL(n['l'],decompress); //l
			notif['pc']=convertDateLocalToIso(n['pc'],decompress);
			notif['ps4']=convertDateLocalToIso(n['ps4'],decompress);
			notif['xb1']=convertDateLocalToIso(n['xb1'],decompress);
		}
		res.push(notif);
	});
	return res;
}

function compressURL(data,decompress=false){
	if (data==undefined||data==''){
		data='static/img/factions/stevie_wonder.png';
	}
	compressedURL.forEach(c=>{
		if(!decompress){
			data=strReplaceAll(data,c['url'],c['id']);
		}else{
			data=strReplaceAll(data,c['id'],c['url']);
		}
	});

	
	return data;
}
function compressItemType(data,decompress=false){
	compressedItemType.forEach(c=>{
		if(!decompress){
			data=strReplaceAll(data,c['t'],c['i']);
		}else{
			data=strReplaceAll(data,c['i'],c['t']);
		}
	});
	return data;
}
function compressItemName(data,decompress=false){
	compressedItemName.forEach(c=>{
		if(!decompress){
			data=strReplaceAll(data,c['t'],c['i']);
		}else{
			data=strReplaceAll(data,c['i'],c['t']);
		}
	});
	return data;
}

function persistInfo(data,clase=[]){
	setCookie(data+'_p_'+platform,convertDateLocalToIso(new Date()),7*24*60*60*1000);
	if(clase!=[]){
		//clase[clase.p]=clase.d;
		clase.k=clase.t+'_'+clase.i;
		//clase[platform]=clase.d;
		clase=compressNotification([clase]);
		//console.log(clase[0]);
		//console.log('persistInfo',data,clase,compressNotification([clase]));
	}
}

function warframeCopyToClipboard(data,title=''){
	let url='(https://nekro-warframe.netlify.com)';
	let items=pipedStringToArray(data,'\n');

	data=strReplaceAll(data,'(https://nekro-warframe.netlify.com)','');
	data=strReplaceAll(data,'(https://nekro-warframe.netlify.com)','');
	
	title=title+' {'+items.length+'} ('+ dateToString(new Date()) +') '+url+'\n';
	data=title+data;
	copyToClipboard(data);
	generateToast("Datos copiados al clipboard",title,"",5000,'success',"nfc-bottom-left");
}

function toggleChildTimerWindow(){
	if(timersWindow==undefined||timersWindow.closed==true){
		timersWindow=window.open('', 'Timers', 'top='+window.screenY+',left='+window.screenX+',width=260,height=70')
	}else{
		timersWindow.close()
	};
}

function updateNotificationTimers(data,updateFront=false){
	if(updateFront==false){
		notificationTimers=bubbleSorting(arrayUnique(pipedStringToArray(data.trim(),',')));
	}else{
		if(document.activeElement!=timerNotificationTimes){
			timerNotificationTimes.value=arrayToPipedString(notificationTimers,',');
		}
	}
}

function notifyTimer(title,j,nameID,diff){
		let selected=getRadioSelectedByName(nameID);
		let time=pipedStringToArray(strDiff(j.timeLeft,diff),' ');
		let talk='';
		let id='';
		title=title.toUpperCase();
		time.forEach(t=>{(t.indexOf('m')>-1?id=t+(j.isDay==true?'d':'n'):'');});
		switch(selected){
			case 'no':
				break;
			case 'day':
				if(time.length<3){
				time.forEach(t=>{notificationTimers.forEach(n=>{if(t==n+'m'&&j.isDay==true){talk=true;}else{if(t==(n*-1)+'m'){talk=true;}}});});
				}
				break;
			case 'night':
				if(time.length<3){
				time.forEach(t=>{notificationTimers.forEach(n=>{if(t==n+'m'&&j.isDay==false){talk=true;}else{if(t==(n*-1)+'m'){talk=true;}}});});		
				}
				break;
			case 'both':
				if(time.length<3){
				time.forEach(t=>{notificationTimers.forEach(n=>{if(t==n+'m'||t==(n*-1)+'m'){talk=true;}});});
				}
				break;			
		}
		if(talk!=''&&
		!window.speechSynthesis.speaking&&
		(notificationStatus[title+'Timer']==undefined||notificationStatus[title+'Timer']!=id))
		{
			talk=title+' timer: '+convertTimeToSpeacheable(strDiff(j.timeLeft,diff))+' to '+(resultJson.cetusCycle.isDay==true?'night':'day');
			notificationStatus[title+'Timer']=id;
			textToSpeech(talk,'en-GB');
			console.log(talk);
			talk='<a href="#T">'+talk+'<hr><a href="#T">Link</a></a>'
			generateToast('⏰ '+title.toUpperCase()+' Timer '+(resultJson.cetusCycle.isDay==true?'(night 🌙)':'(day ☀'),talk,"",15000,"info");
		}		
}
function navigateToAnchor(anchor){
	if(location.hash==anchor){
		location.hash='#';
		setTimeout(function() {}, 3000);
	}
	location.hash=anchor;
	
}
function notifyNotification(data){
	let talk;	
	let title=data.t+' '+data.i;
	let id=data.actual;
	if(talk!=''&&
	!window.speechSynthesis.speaking&&
	(notificationStatus[title+id]==undefined||notificationStatus[title+id]!=id))
	{
		talk='Platform: '+platform+', ('+data.tipo+') '+title+': '+convertTimeToSpeacheable(data.timeLeft);
		notificationStatus[title+id]=id;
		textToSpeech(talk,'en-GB');
		console.log(talk);
		
		let img=(data.l!=undefined&&data.l!=''?'<p><img class="thumbnail" src="'+strReplaceAll(data.l,"http://","https://")+'" alt="'+title+'"></p>':'')
		
		generateToast('('+data.tipo.toUpperCase()+') '+title.toUpperCase(),'<div class="formulario" data-idgrouptype="'+data.tipo+'" onClick="clickAnchorLink(event);">'+img+talk+'</div>',"",10000,"warning");
	}
}

