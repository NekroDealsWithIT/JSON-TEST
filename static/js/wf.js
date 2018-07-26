/*
	Pequeña cajita de herramientas para la pagina de wf
	*/
/*
	Variables globales
	*/
	var estadosDesarrollo=['analisis','desarrollo','test','prod','pruebas','completo','bug','rollback'];
	var trabajandoEn=[
	[3,'12-06-2018 Migre el manejo del desarrollo a trello!']
	];
	
	const compressedURL=[
		{id:'#@1',url:'https://i.imgur.com'},
		{id:'#@2',url:'https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources'},
		{id:'#@3',url:'https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources'},
		{id:'#@4',url:'static/img/factions'}
	];

	const compressedItemType=[
		{i:'#1',t:'nightmare'},
		{i:'#2',t:'aura'},
		{i:'#3',t:'helmet'},
		{i:'#4',t:'weapon'},
		{i:'#5',t:'invasion'},
		{i:'#6',t:'forma'},
		{i:'#7',t:'skin'},
		{i:'#8',t:'catalyst'},
		{i:'#9',t:'kubrowEgg'},
		{i:'#10',t:'morphics'},
		{i:'#11',t:'resource'},
		{i:'#12',t:'vauban'},
		{i:'#13',t:'synthula'},
		{i:'#14',t:'plastis'},
		{i:'#15',t:'controlModule'},
		{i:'#16',t:'baro'},
		{i:'#17',t:'circuits'},
		{i:'#18',t:'oxium'},
		{i:'#19',t:'polymerBundle'},
		{i:'#20',t:'orokinCell'},
		{i:'#21',t:'rubedo'},
		{i:'#22',t:'ferrite'},
		{i:'#23',t:'alloyPlate'},
		{i:'#24',t:'gallium'},
		{i:'#24',t:'gallium'},
		{i:'#25',t:'nanoSpores'},
		{i:'#26',t:'endo'},
		{i:'#27',t:'argonCrystal'},
		{i:'#28',t:'neuralSensors'},
		{i:'#29',t:'nitain'},
		{i:'#30',t:'credits'},
		{i:'#31',t:'salvage'},
		{i:'#32',t:'traces'},
		{i:'#33',t:'tellurium'},
		{i:'#33',t:'plastids'}
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
{cachedType: "nightmare", cachedItem: "Focus Energy", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 10 2018 01:12:42 GMT-0300 (Argentina Standard Time)"},
{cachedType: "aura", cachedItem: "Rejuvenation", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jun 10 2018 04:35:38 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Ember Phoenix Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 10 2018 04:50:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Inaros Canopic Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 10 2018 06:53:55 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Dark Dagger Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Sun Jun 10 2018 08:16:15 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Ceramic Dagger Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Sun Jun 10 2018 09:28:26 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Zephyr Tengu Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 10 2018 10:59:42 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Forma Blueprint", cachedImgLink: "https://i.imgur.com/2b0FT3D.png", cachedTime: "Sun Jun 10 2018 11:25:36 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Orokin Catalyst Blueprint", cachedImgLink: "https://i.imgur.com/C4X9NWm.png", cachedTime: "Sun Jun 10 2018 11:25:36 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nezha Circa Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 10 2018 11:51:34 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Rhino Vanguard Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 10 2018 13:44:26 GMT-0300 (Argentina Standard Time)"},
{cachedType: "forma", cachedItem: "Forma Blueprint", cachedImgLink: "https://i.imgur.com/2b0FT3D.png", cachedTime: "Sun Jun 10 2018 15:33:21 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Blaze", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 10 2018 17:07:51 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Heat Dagger Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Sun Jun 10 2018 18:55:31 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Fortitude", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Mon Jun 11 2018 01:22:56 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Vigor", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Mon Jun 11 2018 12:19:30 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Rending Strike", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Mon Jun 11 2018 13:19:21 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Trinity Aura Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 11 2018 14:08:40 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Trinity Meridian Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 11 2018 14:39:29 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Pangolin Sword Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Mon Jun 11 2018 18:08:30 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Ash Locust Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 11 2018 19:41:41 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Hydroid Triton Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 11 2018 22:16:27 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Valkyr Kara Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 11 2018 22:59:54 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Chroma Drac Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 00:36:04 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Loki Swindle Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 01:29:38 GMT-0300 (Argentina Standard Time)"},
{cachedType: "skin", cachedItem: "Brokk Hammer Skin Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/weapon_skin_thumb.png", cachedTime: "Tue Jun 12 2018 01:55:43 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Rhino Thrak Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 05:26:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Atlas Tartarus Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 12:36:06 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Oberon Markhor Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 14:01:25 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Seeking Fury", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Tue Jun 12 2018 14:24:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Valkyr Bastet Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 15:24:40 GMT-0300 (Argentina Standard Time)"},
{cachedType: "aura", cachedItem: "Speed Holster", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Tue Jun 12 2018 16:16:30 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Jaw Sword Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Tue Jun 12 2018 19:48:54 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Volt Pulse Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 20:12:55 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Mirage Harlequin Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 21:59:11 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Sheev Blueprint", cachedImgLink: "", cachedTime: "Tue Jun 12 2018 22:35:55 GMT-0300 (Argentina Standard Time)"},
{cachedType: "catalyst", cachedItem: "Orokin Catalyst Blueprint", cachedImgLink: "https://i.imgur.com/C4X9NWm.png", cachedTime: "Tue Jun 12 2018 23:39:47 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Vauban Esprit Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Tue Jun 12 2018 23:47:41 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Constitution", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Wed Jun 13 2018 01:17:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Banshee Chorus Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Sheev Heatsink", cachedImgLink: "", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Karak Wraith Blueprint", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Snipetron Vandal Stock", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Latron Wraith Receiver", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Dera Vandal Barrel", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Thu Jun 14 2018 10:53:05 GMT-0300 (Argentina Standard Time)"},
{cachedType: "kubrowEgg", cachedItem: "Kubrow Egg", cachedImgLink: "https://i.imgur.com/Vv3LXnz.png", cachedTime: "Thu Jun 14 2018 11:33:00 GMT-0300 (Argentina Standard Time)"},
{cachedType: "aura", cachedItem: "Shield Disruption", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Thu Jun 14 2018 15:27:21 GMT-0300 (Argentina Standard Time)"},
{cachedType: "morphics", cachedItem: "", cachedImgLink: "https://i.imgur.com/SF3XWd6.png", cachedTime: "Thu Jun 14 2018 17:11:24 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Plasma Sword Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Thu Jun 14 2018 18:02:20 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nidus Prion Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 18:48:45 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Ivara Loxley Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 19:22:39 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Ash Scorpion Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 19:24:42 GMT-0300 (Argentina Standard Time)"},
{cachedType: "resource", cachedItem: "", cachedImgLink: "https://i.imgur.com/Bq5TEPo.png", cachedTime: "Thu Jun 14 2018 20:16:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Heat Sword Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Thu Jun 14 2018 20:37:45 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nekros Raknis Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 21:06:40 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Saryn Chlora Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Thu Jun 14 2018 23:54:17 GMT-0300 (Argentina Standard Time)"},
{cachedType: "vauban", cachedItem: "Vauban Systems Blueprint", cachedImgLink: "https://i.imgur.com/r5x0owi.png", cachedTime: "Fri Jun 15 2018 00:30:23 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Wraith Twin Vipers Blueprint", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Fri Jun 15 2018 08:58:59 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Dera Vandal Stock", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Fri Jun 15 2018 08:58:59 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Karak Wraith Receiver", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Fri Jun 15 2018 08:58:59 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Dera Vandal Receiver", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Fri Jun 15 2018 08:58:59 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Exilus Adapter Blueprint", cachedImgLink: "https://i.imgur.com/eQNeNpY.png", cachedTime: "Fri Jun 15 2018 09:41:15 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Orokin Reactor Blueprint", cachedImgLink: "https://i.imgur.com/6Hm1BEq.png", cachedTime: "Fri Jun 15 2018 09:41:15 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Frost Aurora Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Fri Jun 15 2018 23:29:24 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Zephyr Cierzo Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Fri Jun 15 2018 23:56:43 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nyx Menticide Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 01:39:22 GMT-0300 (Argentina Standard Time)"},
{cachedType: "aura", cachedItem: "Sprint Boost", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sat Jun 16 2018 14:01:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Wraith Twin Vipers Barrel", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Sat Jun 16 2018 14:01:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Dera Vandal Blueprint", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Sat Jun 16 2018 14:01:46 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Gara Virago Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 14:52:08 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Armored Agility", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sat Jun 16 2018 16:09:34 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Stunning Speed", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sat Jun 16 2018 16:10:34 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Glaive Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Sat Jun 16 2018 16:58:24 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Oberon Oryx Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 18:13:49 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Limbo Magrite Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 19:21:12 GMT-0300 (Argentina Standard Time)"},
{cachedType: "synthula", cachedItem: "", cachedImgLink: "https://i.imgur.com/X0Lvfc9.png", cachedTime: "Sat Jun 16 2018 20:42:37 GMT-0300 (Argentina Standard Time)"},
{cachedType: "weapon", cachedItem: "Dark Sword Blueprint", cachedImgLink: "https://i.imgur.com/A2gbH8k.png", cachedTime: "Sat Jun 16 2018 20:42:37 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nova Slipstream Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 21:40:18 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Nekros Shroud Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 22:28:44 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Octavia Cadenza Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sat Jun 16 2018 23:33:35 GMT-0300 (Argentina Standard Time)"},
{cachedType: "aura", cachedItem: "Dead Eye", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jun 17 2018 00:45:25 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Harrow Suffragan Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 01:10:34 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Limbo Aristeas Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 01:40:02 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Volt Storm Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 02:42:19 GMT-0300 (Argentina Standard Time)"},
{cachedType: "plastids", cachedItem: "", cachedImgLink: "https://i.imgur.com/5yVfTEF.png", cachedTime: "Sun Jun 17 2018 03:02:40 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Vauban Gambit Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 03:38:38 GMT-0300 (Argentina Standard Time)"},
{cachedType: "controlModule", cachedItem: "", cachedImgLink: "https://i.imgur.com/F1UUub1.png", cachedTime: "Sun Jun 17 2018 03:53:02 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Loki Essence Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 04:21:42 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Wildfire", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Snipetron Vandal Blueprint", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "invasion", cachedItem: "Sheev Hilt", cachedImgLink: "", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Baro Visor", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Primed Continuity", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Thermite Rounds", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Scattering Inferno", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Scorch", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Volcanic Edge", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Prisma Grakata", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Twin Grakata Towsun Skin", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Prisma Skana", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Baro Kiteer Sekhara", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Prisma Hecate Syandana", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Prisma Naberus Arm Armor", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Scimitar Prisma Skin", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Sonicor Exilis Skin", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Noggle Statue - Baro Ki teer", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Prisma Sigil ", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "3 Day Credit Booster", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "baro", cachedItem: "Sands Of Inaros", cachedImgLink: "static/img/factions/Baro.png", cachedTime: "Sun Jun 17 2018 11:09:16 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Excalibur Avalon Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 11:53:32 GMT-0300 (Argentina Standard Time)"},
{cachedType: "circuits", cachedItem: "", cachedImgLink: "https://i.imgur.com/OxJvWIx.png", cachedTime: "Sun Jun 17 2018 13:05:01 GMT-0300 (Argentina Standard Time)"},
{cachedType: "skin", cachedItem: "Dagger Zoren Skin Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/weapon_skin_thumb.png", cachedTime: "Sun Jun 17 2018 13:45:14 GMT-0300 (Argentina Standard Time)"},
{cachedType: "oxium", cachedItem: "", cachedImgLink: "https://i.imgur.com/hY8NCjk.png", cachedTime: "Sun Jun 17 2018 15:12:10 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Lethal Torrent", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 17 2018 15:34:40 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Wukong Dasheng Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 15:47:58 GMT-0300 (Argentina Standard Time)"},
{cachedType: "vauban", cachedItem: "Vauban Chassis Blueprint", cachedImgLink: "https://i.imgur.com/r5x0owi.png", cachedTime: "Sun Jun 17 2018 17:33:54 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Accelerated Blast", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 17 2018 17:33:54 GMT-0300 (Argentina Standard Time)"},
{cachedType: "helmet", cachedItem: "Mirage Trivelin Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Sun Jun 17 2018 17:33:54 GMT-0300 (Argentina Standard Time)"},
{cachedType: "nightmare", cachedItem: "Shred", cachedImgLink: "https://i.imgur.com/cAYNH7j.png", cachedTime: "Sun Jun 17 2018 18:43:46 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "polymerBundle", cachedItem: "", cachedImgLink: "https://i.imgur.com/pg8asnC.png", cachedTime: "Sun Jun 17 2018 18:55:13 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Energy Siphon", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jun 17 2018 20:13:10 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "orokinCell", cachedItem: "", cachedImgLink: "https://i.imgur.com/tEQdoDE.png", cachedTime: "Sun Jun 17 2018 20:13:10 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "rubedo", cachedItem: "", cachedImgLink: "https://i.imgur.com/gSO9ILf.png", cachedTime: "Sun Jun 17 2018 20:45:59 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Rifle Scavenger", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jun 17 2018 21:31:31 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "ferrite", cachedItem: "", cachedImgLink: "https://i.imgur.com/h93eVLr.png", cachedTime: "Sun Jun 17 2018 22:47:48 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Pistol Scavenger", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Sun Jun 17 2018 23:37:55 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "alloyPlate", cachedItem: "", cachedImgLink: "https://i.imgur.com/E8K3fOI.png", cachedTime: "Mon Jun 18 2018 00:11:55 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Equinox Solstice Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 18 2018 01:23:37 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "gallium", cachedItem: "", cachedImgLink: "https://i.imgur.com/pvpc73S.png", cachedTime: "Mon Jun 18 2018 01:37:32 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "nanoSpores", cachedItem: "", cachedImgLink: "https://i.imgur.com/bb71Cy7.png", cachedTime: "Mon Jun 18 2018 09:08:42 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "endo", cachedItem: "100 Endo", cachedImgLink: "https://i.imgur.com/mS8oSwx.png", cachedTime: "Mon Jun 18 2018 09:08:42 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "endo", cachedItem: "80 Endo", cachedImgLink: "https://i.imgur.com/mS8oSwx.png", cachedTime: "Mon Jun 18 2018 09:08:42 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "aura", cachedItem: "Infested Impedance", cachedImgLink: "https://github.com/Warframe-Community-Developers/warframe-worldstate-parser/raw/master/resources/aura_thumb.png", cachedTime: "Mon Jun 18 2018 09:57:03 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "argonCrystal", cachedItem: "", cachedImgLink: "https://i.imgur.com/DdJJYSB.png", cachedTime: "Mon Jun 18 2018 10:18:38 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "neuralSensors", cachedItem: "", cachedImgLink: "https://i.imgur.com/Gq6cz9p.png", cachedTime: "Mon Jun 18 2018 10:39:30 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "nitain", cachedItem: "", cachedImgLink: "https://i.imgur.com/3Db4PHh.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "helmet", cachedItem: "Wukong Macak Helmet Blueprint", cachedImgLink: "https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/alt_helmet_thumb.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "endo", cachedItem: "150 Endo", cachedImgLink: "https://i.imgur.com/mS8oSwx.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Latron Wraith Barrel", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Snipetron Vandal Barrel", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Snipetron Vandal Receiver", cachedImgLink: "https://i.imgur.com/kPQcg5B.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Strun Wraith Barrel", cachedImgLink: "https://i.imgur.com/B5sv3mQ.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Mutalist Alad V Nav Coordinate", cachedImgLink: "https://i.imgur.com/96AWqr8.png", cachedTime: "Mon Jun 18 2018 17:15:45 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "credits", cachedItem: "", cachedImgLink: "https://i.imgur.com/JCKyUXJ.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "salvage", cachedItem: "", cachedImgLink: "https://i.imgur.com/3L7xLYg.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "traces", cachedItem: "", cachedImgLink: "https://i.imgur.com/vvZGMPv.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "tellurium", cachedItem: "", cachedImgLink: "https://i.imgur.com/ocjnGU8.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "3 Detonite Injector", cachedImgLink: "https://i.imgur.com/rV6lN4W.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "3 Fieldron", cachedImgLink: "https://i.imgur.com/qlrlfft.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "2 Mutagen Mass", cachedImgLink: "https://i.imgur.com/vV7kzub.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"},
{cachedType: "invasion", cachedItem: "Mutagen Mass", cachedImgLink: "https://i.imgur.com/vV7kzub.png", cachedTime: "Mon Jun 18 2018 17:18:27 GMT-0300 (hora estándar de Argentina)"}
];

function sendToConsole(itm){
	console.log(itm);
}
function checkCampeon(){
	campeon=getCookie('campeon');
	if(campeon!=undefined&&campeon!=''){
		removeClass("sinImplementar","hidden");
		descripcionForm.innerHTML='<h1>Lince/lincesa, no esta implementado todavia pero al menos me acuerdo de vos campeon ('+campeon+')</h1>(aguanten las galletitas)';
	}
}
function getWFWorldstate(proxy=false){
	var dataJson=getJson("https://ws.warframestat.us/"+platform,proxy);
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
	  // checkear la version sino recargar la pagina
	  versionCheck();
	  fetching=false;
	  if (firstRun){
	  	checkSystems();
	  }
	  return request.response;
	}
}
function updateJsonDrops(proxy=false){
	drops.innerHTML='<img class="loading" src="static/img/loading.gif">';
	dropsDisable(true);
	dropsMetrics.innerText='';
	getJsonDrops('https://drops.warframestat.us/data/all.json',false);
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

	//llamo el worldstate
	getWFWorldstate();

	//Cargo las cookies por defecto
	//setCachedDefaultData();

	//busco el json de drops
	updateJsonDrops();

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
		
		workingOn.innerHTML+='<hr><a class="dev_analisis" href="https://trello.com/b/Gu0xFtVG" target="blank">Link al dashboard de trello</a>'
		workingOn.innerHTML+='<iframe src="https://trello.com/b/Gu0xFtVG.html" frameBorder="0" width="100%" height="300vh"></iframe><hr>';

		workingOn.innerHTML+='<h2>Recorda, que si algo falla... <span class="lineThrough">Un hechicero lo hizo</span><br><img class="omfg" src="queIronia.com_soy_una_imagen_con_el_path_mal_formado._re_loco_no?.imagenQueNoCarga" alt="(Que ironia... soy una imagen sobre bugs, en comic sanz... y no cargo.)"><br> shit happens everywhere... y muy probablemente ya este trabajando en el problema.</h2>';
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
		cookiesShow.innerHTML+=arrayToPipedString(getCachedData());


		//Timestamp
		timeStamp.innerHTML='Timestamp: '+resultJson.timestamp;
		// timeStamp.innerHTML+= '<BR>Local UTF<BR> '+new Date(new Date().toUTCString()).getTime();
		// timeStamp.innerHTML+= '<BR>Local<BR> '+(new Date()).getTime();
		// timeStamp.innerHTML+= '<BR>JSON<BR> '+new Date(resultJson.timestamp).getTime();
		// timeStamp.innerHTML+= '<BR>UTC JSON<BR> '+moment(resultJson.timestamp).utc();
		// timeStamp.innerHTML+= '<BR>DIFF<BR>'+diff;
		
		//CetusTimer
		timers.innerHTML='';
		timers.innerHTML+='<div>Cetus Timer: <p class='+((resultJson.cetusCycle.isDay)?'pDay':'pNight')+'>'+strDiff(resultJson.cetusCycle.timeLeft,diff) + '</p></div>';
		timers.innerHTML+='<div>Earth Timer: <p class='+((resultJson.earthCycle.isDay)?'pDay':'pNight')+'>'+strDiff(resultJson.earthCycle.timeLeft,diff) + '</p></div>';
		
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
				if(c['t']!=''&&c['t']!=undefined&&c['i']!=undefined){
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
				var comboSonido=getComboSound(t);
				cacheado.forEach(function (c){
					var actual='';
					var actualId='';
					var completa=false;
					var timerNotificacion='';
					var tipo='';
					// hay que recorrer las alertas!
					alertasActuales.forEach(function(a){
						if(!a.expired){
							if (c['i']==undefined){
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
					if(t=='recursos'&&c['i']==undefined){
						//de paso revisamos si esta completa para marcarlo tambien!
						
						// chequeo si hay alguno en la lista para remarcar la lista entera
						if(actual!=''){listaActiva=true;}
						var notificar=chequearInformar(c['t']);
						var isCompleted=(completa?' completed':'');
							
						if((!notifOnlyNonCompleted||(notifOnlyNonCompleted&&!completa))&&(!notifOnlyActive||(notifOnlyActive&&actual!=''))){
							notificacion+='<li class="'+(actual!=''?'notifActive':'notifInactive')+isCompleted+'">'+
							'<label><input type="checkbox" onClick="toggleInformar(this.name,this.checked);" name="'+c['t']+'"' + (notificar?" checked":"")+'></label>'+
							'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+c['t']+'" target="blank">'+
							'<img class="thumbnailNotif" src="'+c['l']+'">'+
							'<span class="capitalize">'+c['t']+'</span>'+
							'</a>'+
							(actual==''?'':'<label>(<input type="checkbox" onclick="toggleCompletar(this.name);"'+(completa?" checked ":"")+'name="'+actual+'"' +'>Completa?)</label>')+
							(notifShowLastDate?' ('+dateToString(c[platform])+')':"")+(actual!=''?' <a href="#'+actual+'" data-idgrouptype="'+tipo+'" onclick="clickAnchorLink(event);">ACTIVA!! (eta: '+timerNotificacion+')</a>':'')+
							'</li>';
						}
					}else{
						if(t==c['t']){
							if(actual!=''){listaActiva=true;}
							var notificar=chequearInformar(c['i']);
							var isCompleted=(completa?' completed':'');
							var notifId=(actualId!=''?actualId:c['i']);
							if((!notifOnlyNonCompleted||(notifOnlyNonCompleted&&!completa))&&(!notifOnlyActive||(notifOnlyActive&&actual!=''))){
								notificacion+='<li class="'+(actual!=''?'notifActive':'notifInactive')+isCompleted+'">'+
								'<label><input type="checkbox" onClick="toggleInformar(this.name,this.checked);" name="'+c['i']+'"' + (notificar?" checked":"")+'></label>'+
								'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+c['i']+'" target="blank">'+
								'<img class="thumbnailNotif" src="'+c['l']+'">'+
								'<span class="capitalize">'+c['i']+'</span>'+
								'</a>'+
								(actual==''?'':'<label>(<input type="checkbox" onclick="toggleCompletar(this.name);"'+(completa?" checked ":"")+'name="'+notifId+'"' +'>Completa?)</label>')+
								(notifShowLastDate?' ('+dateToString(c[platform])+')':"")+(actual!=''?' <a href="#'+actual+'" data-idgrouptype="'+tipo+'" onclick="clickAnchorLink(event);">ACTIVA!! (eta: '+timerNotificacion+')</a>':'')+
								'</li>';
							}
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
					parseado+='<hr>';
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
		// parseado='<a id="A"></a>';
		// parseado+='<h3>Alertas</h3>';
		
		var alertsData=resultJson.alerts;
		ths.push([['Tiempo','alertTH'],['Mods','alertTH'],['Tipo Mision','alertTH'],['Nodo','alertTH'],['Faccion','alertTH'],['Nivel','alertTH'],['Reward','alertTH']])
		alertsData.forEach(function(a){
			var td=[];
			var idFaction=a.mission.faction.toLowerCase();
			var idAlerta="'"+a.id+"'";
			var alertaCompleta=chequearCompleto(a.id);

			var txtCopiar="'"+a.mission.reward.asString+" | "+a.mission.node+" | "+a.mission.type+" ("+a.mission.faction+" "+a.mission.minEnemyLevel+"-"+a.mission.maxEnemyLevel+")"+(a.mission.nightmare?" {Nightmare}":"")+(a.mission.archwingRequired?" {Archwing}":"")+" {"+strDiff((a.eta),diff)+"}"+' {http://nekro-warframe.netlify.com}'+"'";
			var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>";

			// agrego a la lista la alertaActiva
			alertaActivaArr.push(a.id);

			var checkBoxCompleted='<a id='+idAlerta+'></a><label><input type="checkbox" onclick="toggleCompletar('+idAlerta+')"'+(alertaCompleta?' checked':'')+'>Completa?</label><br>'
			var isCompleted=(alertaCompleta?' completed':'');
			
			var cookieStore='';
			if(a.rewardTypes.length>0){
				a.rewardTypes.forEach(function(rt){
					// setCookie('a_'+rt,new Date(),365*24*60*60*1000);
					if(rt!=''){
						cookieStore+='t_'+compressItemType(rt);
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
			cookieStore+='_l_'+compressURL(a.mission.reward.thumbnail);
			
			persistInfo(cookieStore);

			td.push([checkBoxCompleted+'<img src="'+a.mission.reward.thumbnail +'">'+imgCopiar+'<BR>'+ strDiff((a.eta),diff)+'('+a.eta+')','tdAlert '+idFaction]);
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
		alertsTitle.innerHTML='🌑 Alertas ['+alertaActivaArr.length+']';
		tabTitleAlertas.innerHTML='Alertas ['+alertaActivaArr.length+']';
		//Invasions
		ths=[];
		tds=[];
		parseado='';
		// parseado='<a id="I"></a>';
		// parseado+='<h3>Invasiones</h3>'
		
		parseado+='<div>Construcciones:'
		parseado+='<ul><li class="grineer">Fomorian: '+resultJson.constructionProgress.fomorianProgress+'%</li>'
		parseado+='<li class="corpus">RazorBack: '+resultJson.constructionProgress.razorbackProgress+'%</li>'
		parseado+='<li class="infested">Unknown: '+resultJson.constructionProgress.unknownProgress+'%</li></ul></div'
		
		var invasionData=resultJson.invasions;
		//ths.push([['Descripcion Mision','invTH'],['Nodo','invTH'],['Porcentaje','invTH'],['Ataca','invTH'],['Reward A','invTH'],['Defiende','invTH'],['Reward D','invTH'],['VS infested','invTH']])
		ths.push([['Descripcion Mision','invTH'],['Nodo','invTH'],['Porcentaje','invTH'],['Ataca','invTH'],['Reward A','invTH'],['Defiende','invTH'],['Reward D','invTH']])
		invasionData.forEach(function(inv){
			var td=[];
			if (!inv.completed){
				
				//Agregado a la lista de notificaciones de cookies
				var cookieStore='';
				if(!inv.vsInfestation){
					cookieStore='t_'+compressItemType('invasion')+'_i_'+inv.attackerReward.asString+'_l_'+compressURL(inv.attackerReward.thumbnail);
					persistInfo(cookieStore);
				}
				cookieStore='t_'+compressItemType('invasion')+'_i_'+inv.defenderReward.asString+'_l_'+compressURL(inv.defenderReward.thumbnail);
				persistInfo(cookieStore);

				var atk=inv.attackingFaction.toLowerCase();
				var def=inv.defendingFaction.toLowerCase();
				var idInvasion="'"+inv.id+"'";
				var invasionCompleta=chequearCompleto(inv.id);
				var checkBoxCompleted='<label><input type="checkbox" onclick="toggleCompletar('+idInvasion+')"'+(invasionCompleta?' checked':'')+'>Completa?</label><br>'
				var isCompleted=(invasionCompleta?' completed':'');

				// agrego la invasionActiva
				invasionActivaArr.push(inv.id);

				var txtCopiar="'"+"Invasion: "+inv.desc+"|"+inv.node+"|"+atk.toUpperCase()+(!inv.vsInfestation?" ("+inv.attackerReward.asString+")":"")+" vs "+def.toUpperCase()+" ("+inv.defenderReward.asString+")|"+ Math.round(inv.completion,5)+'% - '+strDiff(inv.eta,diff)+' {http://nekro-warframe.netlify.com}'+"'";
				var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>";

				td.push([imgCopiar+checkBoxCompleted+inv.desc,'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)]);
				td.push([inv.node,'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)+isCompleted]);
				td.push(['<div class=progressInv'+((Math.round(inv.completion,5))>50?atk:def)+'><progress value='+inv.completion+' max=100 /></div>'+Math.round(inv.completion,5)+'% - '+strDiff(inv.eta,diff),'tdInvasion '+((Math.round(inv.completion,5))>50?atk:def)+isCompleted]);
				td.push([inv.attackingFaction.toUpperCase(),'tdInvasion '+atk+isCompleted]);
				td.push([(!inv.vsInfestation?'<a id="'+inv.attackerReward.asString+'"></a><img src="'+inv.attackerReward.thumbnail +'"><BR>'+ '<a href="http://warframe.wikia.com/wiki/Special:Search?search='+inv.attackerReward.asString+'" target="blank">'+inv.attackerReward.asString+'</a>':'❌'),'tdInvasion '+atk+isCompleted]);
				td.push([inv.defendingFaction.toUpperCase(),'tdInvasion '+def+isCompleted]);
				td.push(['<a id="'+inv.defenderReward.asString+'"></a><img src="'+inv.defenderReward.thumbnail +'"><BR>'+ '<a href="http://warframe.wikia.com/wiki/Special:Search?search='+inv.defenderReward.asString+'" target="blank">'+inv.defenderReward.asString+'</a>','tdInvasion '+def+isCompleted]);
				//td.push([inv.vsInfestation,'tdInvasion '+def+isCompleted]);
				tds.push(td);	
			}
		});

		parseado += '<div class="tableInvasion enlargeMe">'+generateTable(tds,ths,'tableInvasion','','border="1px solid white"')+'</div>';
		parseado += '<hr>';
		invasions.innerHTML=parseado;
		invasionsTitle.innerHTML='🌑 Invasiones ['+invasionActivaArr.length+']';
		tabTitleInvasiones.innerHTML='Invasiones ['+invasionActivaArr.length+']';
		
		//Sortie
		ths=[];
		tds=[];
		parseado='';
		var sortieData=resultJson.sortie;
		// parseado ='<a id="S"></a>';
		if (sortieData!=undefined){
			// parseado += '<h3>(Sortie '+'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+sortieData.boss+'" target="blank">'+sortieData.boss+'</a>'+'-'+'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+sortieData.faction+'" target="blank">'+sortieData.faction+'</a>'+'-'+strDiff((sortieData.eta),diff)+')</h3><div>Jefe: '+sortieData.boss;
			sortieTitle.innerHTML = '🌑 Sortie '+'(<a href="http://warframe.wikia.com/wiki/Special:Search?search='+sortieData.boss+'" target="blank">'+sortieData.boss+'</a>'+'-'+'<a href="http://warframe.wikia.com/wiki/Special:Search?search='+sortieData.faction+'" target="blank">'+sortieData.faction+'</a>'+'-'+strDiff((sortieData.eta),diff)+')';
			tabTitleSortie.innerHTML='Sortie ['+strDiff((sortieData.eta),diff)+']';
			parseado += '<div>Jefe: '+sortieData.boss
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

				var txtCopiar="'"+"Sortie: "+v.missionType+"|"+v.node+"|"+sortieFaction.toUpperCase()+"|"+v.modifier+"|"+sortieData.eta+' {http://nekro-warframe.netlify.com}'+"'";
				var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>";

				var td=[];
				td.push([imgCopiar+checkBoxCompleted+v.missionType,'tdSortie '+sortieFaction]);
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
		// parseado +='<h3>Fisures</h3>';
		
		ths=[];
		tds=[];
		ths.push([['Tier'],['Tiempo'],['Enemigo'],['Tipo'],['Nodo']]);
		
		fisureData.forEach(function(f){
			var td=[];
			var fisureFaction=f.enemy.toLowerCase();

			//var txtCopiar="'"+"Invasion: "+inv.desc+"|"+inv.node+"|"+atk.toUpperCase()+(!inv.vsInfestation?" ("+inv.attackerReward.asString+")":"")+" vs "+def.toUpperCase()+" ("+inv.defenderReward.asString+")|"+ Math.round(inv.completion,5)+'% - '+strDiff(inv.eta,diff)+' {http://nekro-warframe.netlify.com}'+"'";
			//var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img><br>";

			var txtCopiar="'"+"Fissure: "+f.tier+' ('+f.tierNum+')'+"|"+f.node+"|"+f.missionType+"|"+strDiff(f.eta,diff)+' {http://nekro-warframe.netlify.com}'+"'";
			var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>&nbsp;";

			td.push([imgCopiar+f.tier+' ('+f.tierNum+')','tdFisure '+fisureFaction]);
			td.push([strDiff(f.eta,diff),'tdFisure '+fisureFaction]);
			td.push([f.enemy,'tdFisure '+fisureFaction]);
			td.push([f.missionType,'tdFisure '+fisureFaction]);
			td.push([f.node,'tdFisure '+fisureFaction]);
			tds.push(td);	
		});
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
		var txtCopiar="'"+"Baro: "+'Llega a '+baroData.location+' {'+strDiff((baroData.startString),diff)+"} "+" | "+' Se va:{'+strDiff((baroData.endString),diff)+"}"+(baroData.active?' | Items: '+itemsBaro:'')+' {http://nekro-warframe.netlify.com}'+"'";
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
				persistInfo(cookieStore);

				//Agrego copiar
				var txtCopiar="'"+"Baro: "+item+" | Ducats:"+i.ducats+" | Creditos:"+i.credits+" | Ubicacion: "+baroData.location+' ('+strDiff((baroData.endString),diff)+') {http://nekro-warframe.netlify.com}'+"'";
				var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>&nbsp;";

				// agrego link al item y anchor
				item='<a id="'+item+'"><a href="http://warframe.wikia.com/wiki/Special:Search?search='+item+'" target="blank">'+item+'</a>'
				td.push([imgCopiar+item,'tdBaro orokin']);
				td.push([i.ducats,'tdBaro orokin']);
				td.push([i.credits,'tdBaro orokin']);

				tds.push(td);
			});
			parseado +=generateTable(tds,ths,'tableBaro enlargeMe','','');
		}			
		parseado +='<hr>';
		baro.innerHTML=parseado;
		baroTitle.innerHTML='🌑 '+baroData.character +' - '+(baroData.active?"ESTA ACTIVO":"NO ESTA ACTIVO");

		//Syndicates
		var synData=resultJson.syndicateMissions;
		parseado="";
		// parseado +='<h3>Sindicatos</h3>'
		synData.forEach	(function(s){
			parseado+="<h2>"+s.syndicate+" | "+strDiff(s.eta,diff)+"</h2>";
			/* saco los nodos porque no tiene mucho sentido
			if(s.nodes.length>0){
				parseado+='<h4 class="syndicateTitle">Nodos:</h4><ul>';

				s.nodes.forEach(function (n){
					//Agrego copiar
					var txtCopiar="'"+s.syndicate+' ('+strDiff(s.eta,diff)+')'+" | "+n+' {http://nekro-warframe.netlify.com}'+"'";
					var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>&nbsp;";

					parseado+='<li class="syndicateNode">'+imgCopiar+n+"</li>";
				});
				parseado+="</ul>";
			}
			*/
			
			if(s.jobs.length>0){
				parseado+="<ul>";
				s.jobs.forEach(function (j){
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
						var txtCopiar="'"+s.syndicate+' ('+strDiff(s.eta,diff)+')'+" | "+j.type+" | "+rp+' {http://nekro-warframe.netlify.com}'+"'";
						var imgCopiar='<img title="Copiar" src="static/img/Copy.png" class="thumbnailCopiar" alt="copiar" onClick='+'"copyToClipboard('+txtCopiar+')"'+"></img>&nbsp;";
						var link='<a href="http://warframe.wikia.com/wiki/Special:Search?search='+rp+'" target="blank">🔗</a>';

						rewards+='<li class="syndicateReward '+checkSetsClass(rp)+ '"'+'>'+imgCopiar+link+"&nbsp;"+rp+'</li>';
					});
					rewards+="</ol>";

					standingStages="Standing: "+standingStages;

					parseado+='<li class="syndicateTitle">'+j.type+"<br>"+enemyLevels+"<br>"+standingStages+rewards+"<br><hr></li>";
				});
				parseado+="</ul>";
			}
		});
		syndicates.innerHTML=parseado;

		//News
		var newsData=resultJson.news;
		parseado='';
		// parseado='<a id="N"></a>';
		// parseado='<h3>News</h3>';
		
		parseado+='<ul class="news enlargeMe">';
		newsData.forEach(function(n){
			parseado+='<li><img src="'+n.imageLink+'" alt="'+n.message+'">&nbsp;&nbsp;<a href="'+n.link+'" target="blank">'+n.message+'</a>&nbsp;&nbsp;&nbsp;&nbsp;['+strDiff(n.eta, diff*-1)+']</li>'
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
			notif['t']=compressItemType(n['cachedType'],decompress); //t
			notif['i']=compressItemType(n['cachedItem'],decompress); //i
			notif['l']=compressURL(n['cachedImgLink'],decompress); //l
			notif['pc']=convertDateLocalToIso(n['cachedTime'],decompress);
			notif['ps4']=null;
			notif['xb1']=null;
		}else{
			notif['t']=compressItemType(n['t'],decompress); //t
			notif['i']=compressItemType(n['i'],decompress); //i
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

function persistInfo(data){
	setCookie(data,new Date(),365*24*60*60*1000);
}