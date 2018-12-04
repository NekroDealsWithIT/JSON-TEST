const timerExtension={
	'vallisCycle':{'cycle':'isWarm','dayDesc':'Warm','nightDesc':'Cold'},
	'cetusCycle':{'cycle':'isDay','dayDesc':'Day','nightDesc':'Night'}
}

const arrSets={
	'data':{'timeStamp':'2018-12-04','wiki':'https://warframe.fandom.com/wiki/Set_Mods'},
	'Augur':{'bonus':'40%/80%/120%/160%/200%/240% Energy spent on abilities is converted to shields. This only seems to be able to accumulate overshields as long as the Warframe has no overshields when casting an ability (similar to  Brief Respite), though this isnt mentioned in the description of the set bonus. The set bonus also does not convert energy drained over time by channeled abilities such as Ember World On Fire.','farm':'The Augur Mod Set is rewarded from Completing Bounties on the Plains Of Eidolon.','comp':'Comprised of 4 Warframe Mods and 2 Pistol Mods.','set':['Accord','Message','Pact','Reach','Secrets','Seeker'],'setImg':'https://vignette.wikia.nocookie.net/warframe/images/0/09/AugurSetIcon.png'},
	'Gladiator':{'bonus':'+15%/+30%/+45%/+60%/+75%/+90% critical chance, stacks with Melee Combo Multiplier. This effect stacks with Blood Rush for a total of +255%.','farm':'The Gladiator Mod Set is rewarded from Completing Bounties on the Plains Of Eidolon.','comp':'Comprised of 3 Warframe Mods and 3 Melee Mods.','set':['Aegis','Finesse','Might','Resolve','Rush','Vice'],'setImg':'https://vignette.wikia.nocookie.net/warframe/images/e/e0/GladiatorSetIcon.png'},
	'Vigilante':{'bonus':'5%/10%/15%/20%/25%/30% chance to enhance Critical Hits from Primary Weapons, increasing critical tier by 1.','farm':'The Vigilante Mod Set is rewarded from Completing Bounties on the Plains Of Eidolon.','comp':'Comprised of 2 Warframe Mods and 4 Primary Mods.','set':['Armaments','Fervor','Offense','Pursuit','Supplies','Vigor'],'setImg':'https://vignette.wikia.nocookie.net/warframe/images/2/2c/VigilanteSetIcon.png'},
	'Hunter':{'bonus':'Companions deal 25%/50%/75%/100%/125%/150% Extra Damage against enemies affected by Slash status.','farm':'The Hunter Mod Set was rewarded from Operation: Plague Star and can drop from Ghouls on the Plains of Eidolon.','comp':'Comprised of 1 Warframe Mod, 2 Primary Mods, and 3 Companion Mods.','set':['Adrenaline','Command','Munitions','Recovery','Synergy','Track'],'setImg':'https://vignette.wikia.nocookie.net/warframe/images/a/aa/HunterSetIcon.png'},
	'Umbral':{'bonus':'Enhances all equipped mods within the set.','farm':'Awarded during the course of The Sacrifice quest line, pre-equipped on Excalibur Umbra.','comp':'Comprised of 3 Warframe Mods.','set':['Fiber','Intensify','Vitality'],'setImg':'https://vignette.wikia.nocookie.net/warframe/images/6/63/UmbralSetIcon.png'},
	'Sacrificial':{'bonus':'Enhances all equipped mods within the set.','farm':'Awarded during the course of The Sacrifice quest line, pre-equipped on Skiajati and Excalibur Umbra Exalted Umbra Blade.','comp':'Comprised of 2 Melee Mods.','set':['Pressure','Steel'],'setImg':'https://vignette.wikia.nocookie.net/warframe/images/6/63/UmbralSetIcon.png'},
	'Mecha':{'bonus':'Kubrow marks an enemy every 60/45/30/15 seconds for 3/6/9/12 seconds. Kill them to apply their Status Effects to all enemies within 7.5/15/22.5/30 meters.','farm':'The Mecha Mod Set is rewarded from Completing Bounties on the Orb Vallis.','comp':'Comprised of 1 Warframe Mod, 2 Kubrow Mods, and 1 Aura Mod.','set':['Empowered','Overdrive','Pulse','Recharge'],'setImg':'https://vignette.wikia.nocookie.net/warframe/images/f/fe/MechaSetIcon.png'},
	'Synth':{'bonus':'Reloads 5%/10%/15%/20% of Primary and Secondary weapon magazine per second while that weapon is holstered.','farm':'The Synth Mod Set is rewarded from Completing Bounties on the Orb Vallis.','comp':'Comprised of 1 Pistol Mod, 2 Sentinel Mods, and 1 Warframe Mod.','set':['Charge','Deconstruct','Fiber','Reflex'],'setImg':'https://vignette.wikia.nocookie.net/warframe/images/b/bb/SynthSetIcon.png'},
	'Tek':{'bonus':'Kavat marks a 3/6/9/12 meter zone every 60/45/30/15 seconds that inflicts 50/100/150/200 Damage per second to enemies within the zone.','farm':'The Tek Mod Set is rewarded from Completing Bounties on the Orb Vallis.','comp':'Comprised of 1 Warframe Mod, 2 Kavat Mods, and 1 Melee Mod.','set':['Assault','Collateral','Enhance','Gravity'],'setImg':'https://vignette.wikia.nocookie.net/warframe/images/2/27/TekSetIcon.png'}
}

const arrFreeRoamResources={
	'timeStamp':'2018-11-27 16_10',
	'version':5.7,
	'vallisCycle':
	{
		'desc':'Orb Vallis',
		'resourceMap':{'title':'All in one resource map Orb Vallis','lastUpdate':'2018-12-11','url':'https://forums.warframe.com/applications/core/interface/imageproxy/imageproxy.php?img=https://www.framemastery.com/wp-content/uploads/orb_vallis_map_v21.jpg&key=f3ab2ff5b875ac9e629047865821ca51ec2f1575cba1e5fbb374acf20a976153','origin':'https://forums.warframe.com/topic/1029502-orb-vallis-map-high-res-caves-fishing-toroids-mining-k-drive-races-marked','local':'tips/Orb_Vallis/orbVallisFarming.jpg', 'htmlDesc':'<ul><li>Fish Picture = Good fishing spot</li><li>Mining Picture = Best mining spot on map in our opinion</li><li>White Cave = Regular Cave</li><li>Cyan Cave = Fishing Available</li><li>Triangle with Cave = Toroid Cave</li><li>Red water = Pond</li><li>Yellow water = Lake</li><li>Green Circle = K-Drive Race (K-Drive locations that are currently active before reset. Might not be able to update here on regular basis, but will at least have it updated on site)</li><li>Purple Circle = K-Drive Race (K-Drive locations that are currently inactive, but can become active after reset)</li><li>Blue Circle = Bounties</li></ul>'},
		'timerDesc':{'cycle':'isWarm','dayDesc':'Warm','nightDesc':'Cold'},
		'fishing':{
			// 'resourceMap':{'title':'','lastUpdate':'','url':'','origin':'','local':'','htmlDesc':''},
			'description':'All fish drops scrap<p>All Baits are one use</p>',

			'Brickie':{'spear':'Shockprod, Stunna','s':35,'m':45,'l':70,'loc':'Orb Vallis','bio':'1','bioDesc':'Pond','cycle':'Warm','mats':'Muon Battery','bait':'Broad Spectrum [50]','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/b/b0/Brickie.png'},
			'Charamote':{'spear':'Shockprod, Stunna','s':200,'m':300,'l':500,'loc':'Orb Vallis','bio':'3','bioDesc':'Cave (H)','cycle':'Any','mats':'Sagan Module','bait':'Charamote Bait [300] (H)','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/2/2e/Charamote.png'},
			'Echowinder':{'spear':'Shockprod, Stunna','s':35,'m':45,'l':70,'loc':'Orb Vallis','bio':'2','bioDesc':'Lake','cycle':'Warm','mats':'Anoscopic sensor','bait':'None','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/c/c3/Echowinder.png'},
			'Eye-Eye':{'spear':'Shockprod, Stunna','s':45,'m':60,'l':100,'loc':'Orb Vallis','bio':'1','bioDesc':'Pond','cycle':'Cold','mats':'Rotoblade','bait':'Narrow Spectrum [100] (H)','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/7/7f/Eye-Eye.png'},
			'Kriller':{'spear':'Shockprod, Stunna','s':45,'m':60,'l':100,'loc':'Orb Vallis','bio':'2','bioDesc':'Lake','cycle':'Warm','mats':'Thermal Laser','bait':'Kriller Bait [100]','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/2/21/Kriller.png'},
			'Longwinder':{'spear':'Shockprod, Stunna','s':200,'m':300,'l':500,'loc':'Orb Vallis','bio':'2','bioDesc':'Lake','cycle':'Warm','mats':'Lathe Coogulant','bait':'Longwinder Bait [200] (H)','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/1/19/Longwinder.png'},
			'Mirewinder':{'spear':'Shockprod, Stunna','s':45,'m':60,'l':100,'loc':'Orb Vallis','bio':'3','bioDesc':'Cave','cycle':'Any','mats':'Parallel Biode','bait':'Mirewinder Bait [200]','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/8/81/Mirewinder.png'},
			'Recaster':{'spear':'Shockprod, Stunna','s':45,'m':60,'l':100,'loc':'Orb Vallis','bio':'1','bioDesc':'Pond (H)','cycle':'Cold','mats':'Neural Relay','bait':'Narrow Spectrum [100] (H)','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/5/51/Recaster.png'},
			'Sapcaddy':{'spear':'Shockprod, Stunna','s':35,'m':45,'l':70,'loc':'Orb Vallis','bio':'2','bioDesc':'Lake','cycle':'Cold','mats':'Venedo Case','bait':'Broad Spectrum [50]','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/a/af/Sapcaddy.png'},
			'Scrubber':{'spear':'Shockprod, Stunna','s':35,'m':45,'l':70,'loc':'Orb Vallis','bio':'3','bioDesc':'Cave','cycle':'Any','mats':'EXA Brain','bait':'None','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/e/e9/Scrubber.png'},
			'Synathid':{'spear':'Shockprod, Stunna','s':600,'m':800,'l':1000,'loc':'Orb Vallis','bio':'3','bioDesc':'Cave (H)','cycle':'Any','mats':'Ecosynth analyzer','bait':'Synathid Bait [400] (H)','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/e/eb/Synathid.png'},
			'Tink':{'spear':'Shockprod, Stunna','s':35,'m':45,'l':70,'loc':'Orb Vallis','bio':'1','bioDesc':'Pond','cycle':'Cold','mats':'Dissipator Coil','bait':'Broad Spectrum [50]','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/4/49/Tink.png'},
			'Tromyzon':{'spear':'Shockprod, Stunna','s':200,'m':300,'l':500,'loc':'Orb Vallis','bio':'1','bioDesc':'Pond (H)','cycle':'Cold','mats':'EntroPlasma','bait':'Tromizon Bait [300] (H)','loot':'Scrap','img':'https://vignette.wikia.nocookie.net/warframe/images/5/55/Tromyzon.png'}

		},
		'mining':{
			// 'resourceMap':{'title':'','lastUpdate':'','url':'','origin':'','local':'','htmlDesc':''},
			'description':'Recommended> Sunpoint Plasma Drill',

			'Amarast':{'type':'Gem','loc':'Orb Vallis','vein':'Blue','stand':'500','img':'https://vignette.wikia.nocookie.net/warframe/images/b/b9/Amarast.png','cycle':'Any','mat':'Star Amarast','qty':'6','matimg':'https://vignette.wikia.nocookie.net/warframe/images/7/70/StarAmarast.png'},
			'Goblite':{'type':'Gem','loc':'Orb Vallis','vein':'Blue','stand':'200','img':'https://vignette.wikia.nocookie.net/warframe/images/3/39/Goblite.png','cycle':'Any','mat':'Goblite Tears','qty':'10','matimg':'https://vignette.wikia.nocookie.net/warframe/images/5/5a/GobliteTears.png'},
			'Noctrul':{'type':'Gem','loc':'Orb Vallis','vein':'Blue','stand':'50','img':'https://vignette.wikia.nocookie.net/warframe/images/1/10/Noctrul.png','cycle':'Any','mat':'Heart Noctrul','qty':'10','matimg':'https://vignette.wikia.nocookie.net/warframe/images/1/1e/HeartNoctrul.png'},
			'Phasmin':{'type':'Gem','loc':'Orb Vallis','vein':'Blue','stand':'50','img':'https://vignette.wikia.nocookie.net/warframe/images/c/c3/Phasmin.png','cycle':'Any','mat':'Smooth Phasmin','qty':'10','matimg':'https://vignette.wikia.nocookie.net/warframe/images/6/63/SmoothPhasmin.png'},
			'Thyst':{'type':'Gem','loc':'Orb Vallis','vein':'Blue','stand':'1000','img':'https://vignette.wikia.nocookie.net/warframe/images/a/a6/Thyst.png','cycle':'Any','mat':'Marquise Thyst','qty':'3','matimg':'https://vignette.wikia.nocookie.net/warframe/images/e/e1/MarquiseThyst.png'},
			'Zodian':{'type':'Gem','loc':'Orb Vallis','vein':'Blue','stand':'1000','img':'https://vignette.wikia.nocookie.net/warframe/images/a/a0/Zodian.png','cycle':'Any','mat':'Radiant Zodian','qty':'3','matimg':'https://vignette.wikia.nocookie.net/warframe/images/0/0d/RadiantZodian.png'},
			'Axidite':{'type':'Ore','loc':'Orb Vallis','vein':'Red','stand':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/2/26/Axidite.png','cycle':'Any','mat':'Axidrol Alloy','qty':'20','matimg':'https://vignette.wikia.nocookie.net/warframe/images/8/8e/AxidrolAlloy.png'},
			'Hesperon':{'type':'Ore','loc':'Orb Vallis','vein':'Red','stand':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/5/53/Hesperon.png','cycle':'Any','mat':'Hespazym Alloy','qty':'20','matimg':'https://vignette.wikia.nocookie.net/warframe/images/b/bb/HespazymAlloy.png'},
			'Travoride':{'type':'Ore','loc':'Orb Vallis','vein':'Red','stand':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/6/6f/Travoride.png','cycle':'Any','mat':'Travocyte Alloy','qty':'20','matimg':'https://vignette.wikia.nocookie.net/warframe/images/4/47/TravocyteAlloy.png'},
			'Venerol':{'type':'Ore','loc':'Orb Vallis','vein':'Red','stand':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/2/21/Venerol.png','cycle':'Any','mat':'Venerdo Alloy','qty':'20','matimg':'https://vignette.wikia.nocookie.net/warframe/images/5/5a/VenerdoAlloy.png'}

		},
		'hunting':{
			// 'resourceMap':{'title':'','lastUpdate':'','url':'','origin':'','local':'','htmlDesc':''},
			'description':'Recommended> Ivara-Sleep Equinox',			

			'Sunny':{'class':'Pobber','pack':'3','desc':'Native to the fungal forests of Venus, the Pobber is a skittish rodent possessed of an objectionable odor. Always found in groups, they flee at the slightest hint of trouble. They are a primary food source for the Virmink and Sawgaw.','cycle':'Any','agressive':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/5/57/PobberCommon.png','perfect':'400','good':'300','bad':'-'},
			'Delicate':{'class':'Pobber','pack':'3','desc':'Native to the fungal forests of Venus, the Pobber is a skittish rodent possessed of an objectionable odor. Always found in groups, they flee at the slightest hint of trouble. They are a primary food source for the Virmink and Sawgaw.','cycle':'Any','agressive':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/d/df/PobberUncommon.png','perfect':'600','good':'450','bad':'300'},
			'Subterranean':{'class':'Pobber','pack':'3','desc':'Native to the fungal forests of Venus, the Pobber is a skittish rodent possessed of an objectionable odor. Always found in groups, they flee at the slightest hint of trouble. They are a primary food source for the Virmink and Sawgaw.','cycle':'Any','agressive':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/a/af/PobberRare.png','perfect':'800','good':'600','bad':'-'},
			'White-breasted':{'class':'Virmink','pack':'1','desc':'Sleek and silky, the adorable appearance of the Venusian Virmink belies its aggressive demeanor. Favoring rocky landscapes Virmink packs nose the air, scenting for Pobbers - their primary food source.','cycle':'Any','agressive':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/7/72/VirminkCommon.png','perfect':'600','good':'450','bad':'-'},
			'Dusky-headed':{'class':'Virmink','pack':'1','desc':'Sleek and silky, the adorable appearance of the Venusian Virmink belies its aggressive demeanor. Favoring rocky landscapes Virmink packs nose the air, scenting for Pobbers - their primary food source.','cycle':'Any','agressive':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/7/7e/VirminkUncommon.png','perfect':'800','good':'600','bad':'400'},
			'Red-crested':{'class':'Virmink','pack':'1','desc':'Sleek and silky, the adorable appearance of the Venusian Virmink belies its aggressive demeanor. Favoring rocky landscapes Virmink packs nose the air, scenting for Pobbers - their primary food source.','cycle':'Any','agressive':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/7/7d/VirminkRare.png','perfect':'1000','good':'750','bad':'-'},
			'Spotted':{'class':'Bolarola','pack':'1','desc':'Favoring thunder, lightning and cratered-out areas Bolarolas are all about defense. Their armored plates protect them from most predators, tucking-and-rolling to make good their escape.','cycle':'Any','agressive':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/e/ea/BolarolaCommon.png','perfect':'1000','good':'750','bad':'-'},
			'Black-banded':{'class':'Bolarola','pack':'1','desc':'Favoring thunder, lightning and cratered-out areas Bolarolas are all about defense. Their armored plates protect them from most predators, tucking-and-rolling to make good their escape.','cycle':'Any','agressive':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/f/fc/BolarolaUncommon.png','perfect':'1500','good':'1125','bad':'-'},
			'Thorny':{'class':'Bolarola','pack':'1','desc':'Favoring thunder, lightning and cratered-out areas Bolarolas are all about defense. Their armored plates protect them from most predators, tucking-and-rolling to make good their escape.','cycle':'Any','agressive':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/f/f7/BolarolaRare.png','perfect':'2500','good':'1875','bad':'-'},
			'Brindle':{'class':'Kubrodon','pack':'1','desc':'The apex predator of the Venusian plains. These massively framed beasts travel in groups and mark the territory surrounding Orokin cooling towers as their own. Kubrodons are a danger best avoided.','cycle':'Any','agressive':'1','img':'https://vignette.wikia.nocookie.net/warframe/images/a/a4/KubrodonCommon.png','perfect':'2000','good':'1500','bad':'1000'},
			'Vallis':{'class':'Kubrodon','pack':'1','desc':'The apex predator of the Venusian plains. These massively framed beasts travel in groups and mark the territory surrounding Orokin cooling towers as their own. Kubrodons are a danger best avoided.','cycle':'Any','agressive':'1','img':'https://vignette.wikia.nocookie.net/warframe/images/2/2a/KubrodonUncommon.png','perfect':'4000','good':'3000','bad':'-'},
			'Incarnadine':{'class':'Kubrodon','pack':'1','desc':'The apex predator of the Venusian plains. These massively framed beasts travel in groups and mark the territory surrounding Orokin cooling towers as their own. Kubrodons are a danger best avoided.','cycle':'Any','agressive':'1','img':'https://vignette.wikia.nocookie.net/warframe/images/a/ac/KubrodonRare.png','perfect':'8000','good':'6000','bad':'-'}

		}
	},
	'cetusCycle':
	{
		'desc':'Plains Of Eidolon',
		'resourceMap':{'title':'All in one farming for Plains of Eidolon','lastUpdate':'2018-12-11','url':'http://i.imgur.com/YuYrTHD.png?1','origin':'https://forums.warframe.com/topic/859322-plains-of-eidolon-maps-complete-all-landmarks-resources-fishing-mining/','local':'tips/POE/Cetus All in one.png', 'htmlDesc':'<ol><li>Check for Iradite and mine for Gems/Ore. Get Iradite on the way to 2</li><li>Look for Cetus Wisps</li><li>Look for Cetus Wisps</li><li>Look for Cetus Wisps</li><li>Mine the Caves near the Grineer Outpost for Gems/Ore. Get Grokdrul. Get Maprico on the way to 6</li><li>Mine the Cliffside for Gems/Ore,  Get Maprico in the area</li><li>Look for Cetus Wisps, Get Iradite in the area</li><li>Look for Cetus Wisps</li><li>Get Maprico</li><li>Get Nistlepod. If looking for more Nistlepod go to 10a, otherwise move to 11</li><li>Get Nistlepod if looking for more Nistlepod head to 10c, otherwise head to 10b</li><li>Fish (Pond) if desired, move to 11</li><li>Get Nistlepod and Maprico. Get Nistlepod on the way to  11</li><li>Look for Cetus Wisps</li><li>Mine the Cliffside for Gems/Ore, Fish (Pond) if desired, if looking for more Gems/Ore or Iradite move to 12a, otherwise move to 13</li><li>Get Iradite. Raid Outpost for Grokdrul or mine Gems/Ores</li><li>Look for Cetus Wisps, Fish (Lake) if desired, Get Iradite on the way to 14</li><li>Mine the caves near the Grineer Outpost for Gems/Ore, if Ocean fish are needed head towards 14a, otherwise Return to the Gates and complete the run</li><li>Fish (Ocean) if desired</li></ol>'},
		'timerDesc':{'cycle':'isDay','dayDesc':'Day','nightDesc':'Night'},
		'fishing':{
			"resourceMap": {"title": "Plains of Eidolon Fishing","lastUpdate": "2018-12-11","url": "http://i.imgur.com/mIo4RG6.png","origin": "https://forums.warframe.com/topic/859322-plains-of-eidolon-maps-complete-all-landmarks-resources-fishing-mining/","local": "tips/POE/Cetus fishing spots.png","htmlDesc": ""},
			// 'resourceMap':{'title':'','lastUpdate':'','url':'','origin':'','local':'','htmlDesc':''},
			'description':'All fish drops Fish Meat, Fish Scales, Fish Oil<p>All Baits are crafteable</p>',

			'Charc Eel':{'spear':'Lanzo/Tulok/Peram','s':25,'m':35,'l':50,'loc':'POE','bio':'2','bioDesc':'Lake','cycle':'Any','mats':'Charc Electroplax','bait':'Twilight Bait [2000]','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/5/54/CharcEel.png'},
			'Cuthol':{'spear':'Lanzo','s':500,'m':650,'l':1000,'loc':'POE','bio':'1','bioDesc':'Pond','cycle':'Night','mats':'Cuthol Tendrils','bait':'Cuthol Bait [10000] (H)','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/1/19/Cuthol.png'},
			'Glappid':{'spear':'Peram','s':1200,'m':1500,'l':2000,'loc':'POE','bio':'3','bioDesc':'Ocean','cycle':'Night','mats':'Seram Beetle Shell','bait':'Glappid Bait [12500] (H)','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/e/ed/Glappid.png'},
			'Goopolla':{'spear':'Lanzo/Tulok/Peram','s':25,'m':35,'l':50,'loc':'POE','bio':'3','bioDesc':'Ocean','cycle':'Any','mats':'Goopola Spleen','bait':'Twilight Bait [2000]','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/e/e4/Goopolla.png'},
			'Karkina':{'spear':'Lanzo/Tulok','s':100,'m':125,'l':200,'loc':'POE','bio':'3','bioDesc':'Ocean','cycle':'Any','mats':'Karkina Antenna','bait':'Twilight Bait [2000]','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/b/b1/Karkina.png'},
			'Khut-Khut':{'spear':'Lanzo/Tulok/Peram','s':25,'m':35,'l':50,'loc':'POE','bio':'1','bioDesc':'Pond','cycle':'Day','mats':'Khut-Khut Venom Sac','bait':'Preppered Bait [500]','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/1/17/KhutKhut.png'},
			'Mawfish':{'spear':'Lanzo/Tulok/Peram','s':25,'m':35,'l':50,'loc':'POE','bio':'2','bioDesc':'Lake','cycle':'Day','mats':'Mawfish Bones','bait':'Preppered Bait [500]','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/6/6b/Mawfish.png'},
			'Mortus Lungfish':{'spear':'Lanzo/Peram','s':100,'m':125,'l':200,'loc':'POE','bio':'1','bioDesc':'Pond','cycle':'Night','mats':'Mortus Horn','bait':'None','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/1/1d/MortusLungfish.png'},
			'Murkray':{'spear':'Lanzo','s':500,'m':650,'l':1000,'loc':'POE','bio':'3','bioDesc':'Ocean','cycle':'Any','mats':'Murkray Liver','bait':'Murkray Bait [5000] (H)','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/9/94/Murkray.png'},
			'Norg':{'spear':'Peram','s':500,'m':650,'l':1000,'loc':'POE','bio':'2','bioDesc':'Lake','cycle':'Night','mats':'Norg Brain','bait':'Norg Bait [7500] (H)','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/4/47/Norg.png'},
			'Sharrac':{'spear':'Lanzo/Tulok','s':100,'m':125,'l':200,'loc':'POE','bio':'3','bioDesc':'Ocean','cycle':'Any','mats':'Sharrac Teeth','bait':'Twilight Bait [2000]','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/c/ca/Sharrac.png'},
			'Tralok':{'spear':'Tulok/Peram','s':100,'m':125,'l':200,'loc':'POE','bio':'3','bioDesc':'Ocean','cycle':'Day','mats':'Tralok Eyes','bait':'Preppered Bait [500]','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/5/5e/Tralok.png'},
			'Yogwun':{'spear':'Lanzo/Tulok/Peram','s':25,'m':35,'l':50,'loc':'POE','bio':'1','bioDesc':'Pond','cycle':'Day','mats':'Yogwun Stomach','bait':'Preppered Bait [500]','loot':'Fish Meat, Fish Scales, Fish Oil','img':'https://vignette.wikia.nocookie.net/warframe/images/f/f1/Yogwun.png'}

		},
		'mining':{
			"resourceMap": {"title": "Plains of Eidolon Mining","lastUpdate": "2018-12-11","url": "http://i.imgur.com/SKEeHzQ.png?1","origin": "https://forums.warframe.com/topic/859322-plains-of-eidolon-maps-complete-all-landmarks-resources-fishing-mining/","local":"tips/POE/Cetus Mining Map.png","htmlDesc": ""},
			// 'resourceMap':{'title':'','lastUpdate:':'','url':'','origin':'','local':'','htmlDesc':''},
			'description':'Recommended> Advanced Nosam Cutter, Best> Sunpoint Plasma Drill',

			'Azurite':{'type':'Gem','loc':'POE','vein':'Blue','stand':'50','img':'https://vignette.wikia.nocookie.net/warframe/images/e/ee/Azurite.png','cycle':'Any','mat':'Tear Azurite','qty':'10','matimg':'https://vignette.wikia.nocookie.net/warframe/images/9/93/TearAzurite.png'},
			'Crimzian':{'type':'Gem','loc':'POE','vein':'Blue','stand':'100','img':'https://vignette.wikia.nocookie.net/warframe/images/8/8d/Crimzian.png','cycle':'Any','mat':'Star Crimzian','qty':'6','matimg':'https://vignette.wikia.nocookie.net/warframe/images/7/72/StarCrimzian.png'},
			'Devar':{'type':'Gem','loc':'POE','vein':'Blue','stand':'50','img':'https://vignette.wikia.nocookie.net/warframe/images/1/11/Devar.png','cycle':'Any','mat':'Esher Devar','qty':'10','matimg':'https://vignette.wikia.nocookie.net/warframe/images/0/02/EsherDevar.png'},
			'Veridos':{'type':'Gem','loc':'POE','vein':'Blue','stand':'75','img':'https://vignette.wikia.nocookie.net/warframe/images/e/ec/Veridos.png','cycle':'Any','mat':'Marquise Veridos','qty':'10','matimg':'https://vignette.wikia.nocookie.net/warframe/images/3/37/MarquiseVeridos.png'},
			'Nyth':{'type':'Gem','loc':'POE','vein':'Blue (Rare)','stand':'400','img':'https://vignette.wikia.nocookie.net/warframe/images/d/dc/Nyth.png','cycle':'Any','mat':'Heart Nyth','qty':'3','matimg':'https://vignette.wikia.nocookie.net/warframe/images/c/c6/HeartNyth.png'},
			'Sentirum':{'type':'Gem','loc':'POE','vein':'Blue (Rare)','stand':'400','img':'https://vignette.wikia.nocookie.net/warframe/images/a/ad/Sentrium.png','cycle':'Any','mat':'Radian Sentirum','qty':'3','matimg':'https://vignette.wikia.nocookie.net/warframe/images/9/9c/RadianSentirum.png'},
			'Auron':{'type':'Ore','loc':'POE','vein':'Red','stand':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/d/de/Auron.png','cycle':'Any','mat':'Auroxium Alloy','qty':'20','matimg':'https://vignette.wikia.nocookie.net/warframe/images/f/fa/AuroxiumAlloy.png'},
			'Coprun':{'type':'Ore','loc':'POE','vein':'Red','stand':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/f/f1/Coprun.png','cycle':'Any','mat':'Coprite Alloy','qty':'20','matimg':'https://vignette.wikia.nocookie.net/warframe/images/8/84/CopriteAlloy.png'},
			'Ferros':{'type':'Ore','loc':'POE','vein':'Red','stand':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/6/6b/Ferros.png','cycle':'Any','mat':'Fersteel Alloy','qty':'20','matimg':'https://vignette.wikia.nocookie.net/warframe/images/6/61/FersteelAlloy.png'},
			'Pyrol':{'type':'Ore','loc':'POE','vein':'Red','stand':'0','img':'https://vignette.wikia.nocookie.net/warframe/images/9/92/Pyrol.png','cycle':'Any','mat':'Pyrotic Alloy','qty':'20','matimg':'https://vignette.wikia.nocookie.net/warframe/images/0/0b/PyroticAlloy.png'}

		}
	}
}



//Values definidos para el sorting de tablas js
const sortValues={
	'rarity':{'peculiar':0,'common':1,'uncommon':2,'rare':3,'legendary':4,'riven':5},
	'relic':{'lith':1,'meso':2,'neo':3,'axi':4},
	'relicstatus':{'intact':1,'exceptional':2,'flawless':3,'radiant':4}
}
//http://warframe.wikia.com/wiki/Star_Chart
const relicState=['intact','exceptional','flawless','radiant'];

const persistentEnemiesProfiles={
	'angst':'https://vignette.wikia.nocookie.net/warframe/images/e/ec/StrikerAcolyte.png',
	'malice':'https://vignette.wikia.nocookie.net/warframe/images/1/1b/HeavyAcolyte.png',
	'mania':'https://vignette.wikia.nocookie.net/warframe/images/a/a9/RogueAcolyte.png',
	'misery':'https://vignette.wikia.nocookie.net/warframe/images/1/19/AreaCasterAcolyte.png',
	'torment':'https://vignette.wikia.nocookie.net/warframe/images/3/38/ControlAcolyte.png',
	'violence':'https://vignette.wikia.nocookie.net/warframe/images/5/56/DuellistAcolyte.png'
}

const p_r={
	'MiArIDE=':'3',
	'MiArIDg=':'10',
	'MiB5IDI=':'4',
	'NCAmIDI=':'6',
	'NiArIDI=':'8',
	'OCArIDg=':'16'
};

const planetas={
	'timeStamp':'2018-09-24',
	'Mercury':{'level':'6 - 11','faction':'Grineer','boss':'Vor','bossLocation':'Tolstoj','drops':['Morphics','Ferrite','Polymer Bundle','Detonite Ampule'],'frameFighter':['Rhino','Ivara']},
	'Venus':{'level':'3 - 18','faction':'Corpus','boss':'Jackal','bossLocation':'Fossa','drops':['Alloy Plate','Polymer Bundle','Circuits','Fieldron Sample'],'frameFighter':['Banshee', 'Khora']},
	'Earth':{'level':'1 - 25','faction':'Grineer','boss':'Vay Hek','bossLocation':'Oro','drops':['Ferrite','Rubedo','Neurodes','Detonite Ampule'],'frameFighter':['Hydroid','Gara','Revenant']},
	'Lua':{'level':'25 - 30','faction':'Sentient','boss':'n/a','bossLocation':'n/a','drops':['Ferrite','Rubedo','Neurodes','Detonite Ampule'],'frameFighter':['Excalibur Umbra','Harrow']},
	'Mars':{'level':'8 - 20','faction':'Grineer','boss':'Lieutenant Lech Kril','bossLocation':'War','drops':['Morphics','Salvage','Gallium','Fieldron Sample'],'frameFighter':['Inaros','Mirage']},
	'Phobos':{'level':'10 - 25','faction':'Corpus','boss':'The Sergeant','bossLocation':'Iliad','drops':['Rubedo','Morphics','Plastids','Alloy Plate'],'frameFighter':['Nidus','Wukong']},
	'Ceres':{'level':'12 - 25','faction':'Grineer','boss':'Lech Kril & Vor','bossLocation':'Exta','drops':['Alloy Plate','Circuits','Orokin Cell','Detonite Ampule'],'frameFighter':['Frost','Oberon']},
	'Jupiter':{'level':'15 - 30','faction':'Corpus','boss':'Alad V','bossLocation':'Themisto','drops':['Salvage','Fieldron Sample','Neural Sensors','Alloy Plate'],'frameFighter':['Valkyr','Limbo']},
	'Europa':{'level':'18 - 33','faction':'Corpus','boss':'Raptors','bossLocation':'Naamah','drops':['Morphics','Rubedo','Fieldron Sample','Control Module'],'frameFighter':['Nova','Vauban']},
	'Saturn':{'level':'21 - 36','faction':'Grineer','boss':'Sargas Ruk','bossLocation':'Tethys','drops':['Nano Spores','Plastids','Orokin Cell','Detonite Ampule'],'frameFighter':['Ember','Zephyr','Nezha']},
	'Uranus':{'level':'24 - 37','faction':'Grineer','boss':'Tyl Regor','bossLocation':'Titania','drops':['Polymer Bundle','Plastids','Gallium','Detonite Ampule'],'frameFighter':['Ash','Equinox']},
	'Neptune':{'level':'27 - 40','faction':'Corpus','boss':'Hyena Pack','bossLocation':'Psamathe','drops':['Nano Spores','Ferrite','Control Module','Fieldron Sample'],'frameFighter':['Loki','Nyx']},
	'Pluto':{'level':'30 - 45','faction':'Corpus','boss':'Ambulas','bossLocation':'Hades','drops':['Alloy Plate','Rubedo','Plastids','Morphics','Fieldron Sample'],'frameFighter':['Chroma','Trinity']},
	'Sedna':{'level':'30 - 85','faction':'Grineer','boss':'Kela De Thaym','bossLocation':'Merrow','drops':['Rubedo','Alloy Plate','Salvage','Detonite Ampule'],'frameFighter':['Saryn','Titania']},
	'Kuva Fortress':{'level':'28 - 34','faction':'Grineer','boss':'n/a','bossLocation':'n/a','drops':['Salvage','Circuits','Neural Sensors','Detonite Ampule'],'frameFighter':[]},
	'Eris':{'level':'30 - 45','faction':'Infestation','boss':'Mutalist Alad V or Jordas Golem','bossLocation':'Requires key','drops':['Nano Spores','Plastids','Neurodes','Mutagen Sample'],'frameFighter':['Atlas','Mesa']},
	'Orokin Derelict':{'level':'25 - 35','faction':'Infestation','boss':'Lephantis','bossLocation':'Requires Key','drops':['Nano Spores','Mutagen Sample','Orokin Cell','Neurodes'],'frameFighter':['Nekros','Octavia']},
	'Void':{'level':'10 - 45','faction':'Orokin','boss':'Corrupted Vor','bossLocation':'Any node of Level ≥40','drops':['Ferrite','Rubedo','Argon Crystal','Control Module'],'frameFighter':[]}
}
const frameFighter={
	 'timeStamp':'2018-09-24'
	,'Atlas':['Landslide','Dashes forwards and hits the enemy, dealing high damage.']
	,'Ash':['Shuriken','Throws shurikens, dealing damage.']
	,'Banshee':['Sonic Boom','Deals damage, knocks back, and knocks the enemy down face-up.']
	,'Chroma':['Spectral Scream','Screams, dealing high damage over a short period of time.']
	,'Ember':['Fireball','']
	,'Equinox':['Metamorphosis','Swaps between forms; one with damage reduction, and the other with damage booster']
	,'Excalibur':['Slash Dash','Charges at the enemy, dealing damage and knocking down face-up if it hits.']
	,'Excalibur Umbra':['Radial Howl','Deals damage, blinds the enemy for 1 second, and restricts jumping for a short while.']
	,'Frost':['Freeze','']
	,'Gara':['Shattered Lash','']
	,'Harrow':['Condemn','Restricts the enemy movement for a short while.']
	,'Hydroid':['Tempest Barrage','Summons a barrage of water at the enemy location.']
	,'Inaros':['Desiccation','Launches a blast of sand that deals damage and recovers a negligible amount of health for Inaros.']
	,'Ivara':['Quiver','']
	,'Khora':['Whipclaw','Deals damage from a distance.']
	,'Limbo':['Banish','Deals damage, knocks back, and knocks the enemy down face-up.']
	,'Loki':['Switch Teleport','Swaps your location with the enemy, deals damage, and knocks them down face-up. Cannot be blocked.']
	,'Mag':['Pull','Deals damage, pulls in and knocks the enemy down face-up.']
	,'Mesa':['Peacemaker','Shoots a few shots of her Peacemaker gun. Can be grabbed during the animation.']
	,'Mirage':['Prism','Blinds enemy if it hits. Can knock down face-up.']
	,'Nekros':['Soul Punch','']
	,'Nezha':['Blazing Chakram','']
	,'Nidus':['Virulence','Creates an area along the ground that deals damage when touched. Energy is greatly replenished on hit.']
	,'Nova':['Antimatter Drop','']
	,'Nyx':['Psychic Bolts','Fires bolts at the the enemy, dealing damage']
	,'Oberon':['Smite','']
	,'Octavia':['Mallet','Drops a Mallet that increases Octavias damage, while in range']
	,'Revenant':['Reave','']
	,'Rhino':['Rhino Stomp','']
	,'Saryn':['Spores','']
	,'Titania':['Lantern','']
	,'Trinity':['Well Of Life','Heals Trinity as you deal damage to the enemy. Includes damage dealt while the enemy is blocking.']
	,'Valkyr':['Rip Line','']
	,'Vauban':['Tesla','Throws a grenade which deals damage if touched']
	,'Volt':['Shock','Deals damage from a distance.']
	,'Wukong':['Iron Jab','Deals damage, knocks down face-up']
	,'Zephyr':['Tail Wind','']
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

