var actualTimers={};
function resourceStructure(){
	let parseado='';
	let parseadoM='';
	let parseadoF='';
	let parseadoH='';

	let resources=arrFreeRoamResources;
	let miningLocation=[];
	let fishingLocation=[];
	let huntingLocation=[];
	
	Object.keys(resources).forEach(function(k) {
		switch (k){
		case 'timeStamp':
		case 'version':
			break;
		default:
			r=resources[k];
			r.mining!=undefined?miningLocation.push([k,r.desc]):'';
			r.fishing!=undefined?fishingLocation.push([k,r.desc]):'';
			r.hunting!=undefined?huntingLocation.push([k,r.desc]):'';

			if(r.resourceMap!=undefined){
				let rm=r.resourceMap;
				let salt=''
				if(r.mining!=undefined){
					salt='mining'
					parseado='<h4>'+r.desc+'</h4><h5>'+rm.title+(rm.lastUpdate!=undefined?' ('+rm.lastUpdate+')':'')+(rm.origin!=undefined?' [<a href="'+rm.origin+'" target="blank">Link to Original Post</a>]':'')+'</h5>';
					parseadoM+=parseado+'<p><label><input type="checkbox" onClick="toggleHide('+"'map"+k+salt+"'"+')">Show general map</label></p><div id="map'+k+salt+'" class="hidden"><img src="static/img/'+(rm.local!=undefined&&rm.local!=''?rm.local:rm.url)+'" class="imgMap"><p>'+(rm.htmlDesc!=undefined&&rm.htmlDesc!=''?rm.htmlDesc:'')+'</p></div>';
				}
				if(r.fishing!=undefined){
					salt='fishing'
					parseado='<h4>'+r.desc+'</h4><h5>'+rm.title+(rm.lastUpdate!=undefined?' ('+rm.lastUpdate+')':'')+(rm.origin!=undefined?' [<a href="'+rm.origin+'" target="blank">Link to Original Post</a>]':'')+'</h5>';
					parseadoF+=parseado+'<p><label><input type="checkbox" onClick="toggleHide('+"'map"+k+salt+"'"+')">Show general map</label></p><div id="map'+k+salt+'" class="hidden"><img src="static/img/'+(rm.local!=undefined&&rm.local!=''?rm.local:rm.url)+'" class="imgMap"><p>'+(rm.htmlDesc!=undefined&&rm.htmlDesc!=''?rm.htmlDesc:'')+'</p></div>';
				}
				if(r.hunting!=undefined){
					salt='hunting'
					parseado='<h4>'+r.desc+'</h4><h5>'+rm.title+(rm.lastUpdate!=undefined?' ('+rm.lastUpdate+')':'')+(rm.origin!=undefined?' [<a href="'+rm.origin+'" target="blank">Link to Original Post</a>]':'')+'</h5>';
					parseadoH+=parseado+'<p><label><input type="checkbox" onClick="toggleHide('+"'map"+k+salt+"'"+')">Show general map</label></p><div id="map'+k+salt+'" class="hidden"><img src="static/img/'+(rm.local!=undefined&&rm.local!=''?rm.local:rm.url)+'" class="imgMap"><p>'+(rm.htmlDesc!=undefined&&rm.htmlDesc!=''?rm.htmlDesc:'')+'</p></div>';
				}
				//parseado+='<p><label><input type="checkbox" onClick="toggleHide('+"'map"+k+salt+"'"+')">Show general map</label></p><div id="map'+k+salt+'" class="hidden"><img src="'+(rm.local!=undefined&&rm.local!=''?rm.local:rm.url)+'" class="imgMap"><p>'+(rm.htmlDesc!=undefined&&rm.htmlDesc!=''?rm.htmlDesc:'')+'</p></div>';
			}


			if (r.mining!=undefined){
				if(r.mining.resourceMap!=undefined){
					let rm=r.mining.resourceMap;
					parseadoM+='<h5>'+rm.title+(rm.lastUpdate!=undefined?' ('+rm.lastUpdate+')':'')+(rm.origin!=undefined?' [<a href="'+rm.origin+'" target="blank">Link to Original Post</a>]':'')+'</h5>';
					parseadoM+='<p><label><input type="checkbox" onClick="toggleHide('+"'map"+k+"Mining'"+')">Show '+rm.title+' map</label></p><div id="map'+k+'Mining" class="hidden"><img src="static/img/'+(rm.local!=undefined?rm.local:rm.url)+'" class="imgMap"><p>'+(rm.htmlDesc!=undefined?rm.htmlDesc:'')+'</p></div>';
				}

			}
			parseadoM+='<div id="'+k+'MiningTable"></div>'
			
			if (r.fishing!=undefined){
				if(r.fishing.resourceMap!=undefined){
					let rm=r.fishing.resourceMap;
					parseadoF+='<h5>'+rm.title+(rm.lastUpdate!=undefined?' ('+rm.lastUpdate+')':'')+(rm.origin!=undefined?' [<a href="'+rm.origin+'" target="blank">Link to Original Post</a>]':'')+'</h5>';
					parseadoF+='<p><label><input type="checkbox" onClick="toggleHide('+"'map"+k+"'"+')">Show '+rm.title+' map</label></p><div id="map'+k+'Fishing" class="hidden"><img src="static/img/'+(rm.local!=undefined?rm.local:rm.url)+'" class="imgMap"><p>'+(rm.htmlDesc!=undefined?rm.htmlDesc:'')+'</p></div>';
				}
			}		
			parseadoF+='<div id="'+k+'FishingTable"></div>';	

			if (r.hunting!=undefined){
				if(r.hunting.resourceMap!=undefined){
					let rm=r.hunting.resourceMap;
					parseadoH+='<h5>'+rm.title+(rm.lastUpdate!=undefined?' ('+rm.lastUpdate+')':'')+(rm.origin!=undefined?' [<a href="'+rm.origin+'" target="blank">Link to Original Post</a>]':'')+'</h5>';
					parseadoH+='<p><label><input type="checkbox" onClick="toggleHide('+"'map"+k+"'"+')">Show '+rm.title+' map</label></p><div id="map'+k+'Hunting" class="hidden"><img src="static/img/'+(rm.local!=undefined?rm.local:rm.url)+'" class="imgMap"><p>'+(rm.htmlDesc!=undefined?rm.htmlDesc:'')+'</p></div>';
				}
			}		
			parseadoH+='<div id="'+k+'HuntingTable"></div>';	
		}
	});
	
	miningData.innerHTML=parseadoM;
	fishingData.innerHTML=parseadoF;
	huntingData.innerHTML=parseadoH;



	let miningLocationHTML='<h5>Location</h5><p><label><input onclick="updateResources(true)" type="radio" name="miningLocationRadio" value="all" checked>All</label>'
	miningLocation.forEach(i=>{
		miningLocationHTML+='<label><input onclick="updateResources(true)" type="radio" name="miningLocationRadio" value="'+i[0]+'">'+i[1]+'</label>';
	});
	miningLocationHTML+='</p>';
	miningLocationSelector.innerHTML=miningLocationHTML;

	let fishingLocationHTML='<h5>Location</h5><p><label><input onclick="updateResources(true)" type="radio" name="fishingLocationRadio" value="all" checked>All</label>'
	fishingLocation.forEach(i=>{
		fishingLocationHTML+='<label><input onclick="updateResources(true)" type="radio" name="fishingLocationRadio" value="'+i[0]+'">'+i[1]+'</label>';
	});
	fishingLocationHTML+='</p>';
	fishingLocationSelector.innerHTML=fishingLocationHTML;	

	let huntingLocationHTML='<h5>Location</h5><p><label><input onclick="updateResources(true)" type="radio" name="huntingLocationRadio" value="all" checked>All</label>'
	huntingLocation.forEach(i=>{
		huntingLocationHTML+='<label><input onclick="updateResources(true)" type="radio" name="huntingLocationRadio" value="'+i[0]+'">'+i[1]+'</label>';
	});
	huntingLocationHTML+='</p>';
	huntingLocationSelector.innerHTML=huntingLocationHTML;	

	updateResources(true);
}

function updatePlanetas(){
	sortableTH='class="sortable" onclick="sortTable(event)"';
	let parseado='<table border="1px solid red" style="background: darkcyan;" class="tableResources">';
	
	parseado+='<tbody><tr>'+
			'<th '+sortableTH+'>Planet</th>'+
			'<th '+sortableTH+'>Faction</th>'+
			'<th '+sortableTH+'>Level</th>'+
			'<th '+sortableTH+'>Drops</th>'+
			'<th '+sortableTH+'>Boss</th>'+
			'<th '+sortableTH+'>Boss Location</th>'+
			'<th '+sortableTH+'>frameFighter</th>'+
		'</tr>'

	Object.keys(planetas).forEach(function(p){
		switch (p){
			case 'timeStamp':
			case 'version':
				break;
			default:
				parseado+='<tr>'+
					'<TD '+'data-sortid="'+p+'"'+'>'+p+'</TD>'+
					'<TD '+'data-sortid="'+planetas[p].faction+'"'+'>'+planetas[p].faction+'</TD>'+
					'<TD '+'data-sortid="'+planetas[p].level+'"'+'>'+planetas[p].level+'</TD>'+
					'<TD '+'data-sortid="'+planetas[p].drops.toString()+'"'+'>'+planetas[p].drops.toString().split(",").join('<br>')+'</TD>'+
					'<TD '+'data-sortid="'+planetas[p].boss+'"'+'>'+planetas[p].boss+'</TD>'+
					'<TD '+'data-sortid="'+planetas[p].bossLocation+'"'+'>'+planetas[p].bossLocation+'</TD>'+
					'<TD '+'data-sortid="'+planetas[p].frameFighter.toString()+'"'+'>'+planetas[p].frameFighter.toString().split(",").join('<br>');+'</TD>'+
				'</tr>';
				break;
		}
	});
	parseado+='</tbody></table>';
	planetResourcesData.innerHTML=parseado;	
}

function updateResources(forceUpdate=false){
	let resources=arrFreeRoamResources;
	Object.keys(resources).forEach(function(k){
		switch (k){
			case 'timeStamp':
			case 'version':
				break;
			default:
				let updateMe;

				if (resultJson!=""&&resultJson!=undefined&&resultJson[k]!=undefined){
					actualTimers[k]=resultJson[k];
					Object.keys(resultJson[k]).forEach(function(t){
						if(t==resources[k].timerDesc.cycle){
							if(actualTimers[k+'DayCycle']!=undefined&&actualTimers[k+'DayCycle']==resultJson[k][t]){
								updateMe=false;
							}else{
								actualTimers[k+'DayCycle']=resultJson[k][t];
								updateMe=true;	
							}
						}
					});			
				}

				forceUpdate==true?updateMe=true:'';

				if (resources[k].mining!=undefined&&updateMe==true){
					let data={};
					data.r=resources[k].mining;
					data.d=resources[k].desc;
					data.c=k;
					data.t=actualTimers[k];
					data.td=resources[k].timerDesc;
					drawMining(data);
				}
				
				if (resources[k].fishing!=undefined&&updateMe==true){
					let data={};
					data.r=resources[k].fishing;
					data.d=resources[k].desc
					data.c=k
					data.t=actualTimers[k];
					data.td=resources[k].timerDesc;
					drawFishing(data);
				}		

				if (resources[k].hunting!=undefined&&updateMe==true){
					let data={};
					data.r=resources[k].hunting;
					data.d=resources[k].desc
					data.c=k
					data.t=actualTimers[k];
					data.td=resources[k].timerDesc;
					drawHunting(data);
				}	
		}
	});
}
function drawHunting(o){
	let parseado='';
	let sortableTH='class="sortable" onclick="sortTable(event)"';

	var diff=resultJson!=''?new Date(new Date().toUTCString())-moment(resultJson.timestamp):0;
	
	parseado='<h4>'+o.d+' Hunting ('+strDiff(o.t.timeLeft, diff)+' to '+(o.t[o.td.cycle]==true?o.td.nightDesc:o.td.dayDesc)+' cycle)</h4><p>'+o.r.description+'</p><table border="1px solid red" style="background: darkcyan;" class="tableResources">';
	
	parseado+='<tbody><tr>'+
			'<th '+sortableTH+'>Hunt</th>'+
			'<th '+sortableTH+'>Class</th>'+
			'<th '+sortableTH+'>Pack</th>'+
			'<th '+sortableTH+'>Shoots</th>'+
			'<th '+sortableTH+'>Agressive</th>'+
			'<th '+sortableTH+'>Cycle</th>'+
			'<th '+sortableTH+'>Bad</th>'+
			'<th '+sortableTH+'>Good</th>'+
			'<th '+sortableTH+'>Perfect</th>'+
		'</tr>'

	let selection=['huntingLocationRadio']
	let selectedRadios={};
	selection.forEach(s=>{
		selectedRadios[s]=getRadioSelectedByName(s);
	});
	
	
	Object.keys(o.r).forEach(k=>{
		if(k!='description'&&k!='resourceMap'){
			let i=o.r[k];

			if(
				(o.c==selectedRadios[selection[0]]||selectedRadios[selection[0]]=='all')
				//&&(selectedRadios[selection[1]]==i.type.toLowerCase()||selectedRadios[selection[1]]=='all')
			){
			
			parseado+='<tr>'+
					'<TD '+'data-sortid="'+k+'"'+'>'+k+'<p><img src="'+i.img+'" style="max-width:10vw!important;"></p></TD>'+
					'<TD '+'data-sortid="'+i.class+'"'+'>'+i.class+'</TD>'+
					'<TD '+'data-sortid="'+i.shoots+'"'+'>'+i.shoots+'</TD>'+
					'<TD '+'data-sortid="'+i.pack+'"'+'>'+i.pack+'</TD>'+
					'<TD '+'data-sortid="'+i.agressive+'"'+'>'+(i.agressive==true?'YES':'NO')+'</TD>'+
					'<TD '+'data-sortid="'+i.cycle+'"'+'>'+i.cycle+'</TD>'+
					'<TD '+'data-sortid="'+i.bad+'"'+'>'+i.bad+'</TD>'+
					'<TD '+'data-sortid="'+i.good+'"'+'>'+i.good+'</TD>'+
					'<TD '+'data-sortid="'+i.perfect+'"'+'>'+i.perfect+'</TD>'+
				'</tr>';
			}
		}
	});
	parseado+='</tbody></table>';
	document.getElementById(o.c+'HuntingTable').innerHTML=parseado;	
}

function drawMining(o){
	let parseado='';
	let sortableTH='class="sortable" onclick="sortTable(event)"';

	var diff=resultJson!=''?new Date(new Date().toUTCString())-moment(resultJson.timestamp):0;
	
	//parseado='<h4>'+o.d+' Mining ('+strDiff(o.t.timeLeft, diff)+' to '+(o.t[timerExtension[o.c].cycle]==true?timerExtension[o.c].nightDesc:timerExtension[o.c].dayDesc)+' cycle)</h4><p>'+o.r.description+'</p><table border="1px solid red" style="background: darkcyan;">';
	parseado='<h4>'+o.d+' Mining ('+strDiff(o.t.timeLeft, diff)+' to '+(o.t[o.td.cycle]==true?o.td.nightDesc:o.td.dayDesc)+' cycle)</h4><p>'+o.r.description+'</p><table border="1px solid red" style="background: darkcyan;" class="tableResources">';
	
	parseado+='<tbody><tr>'+
			'<th '+sortableTH+'>Resource</th>'+
			'<th '+sortableTH+'>Type</th>'+
			'<th '+sortableTH+'>Vein</th>'+
			'<th '+sortableTH+'>Stand</th>'+
			'<th '+sortableTH+'>Material</th>'+
		'</tr>'

	let selection=['miningLocationRadio','miningTypeRadio']
	let selectedRadios={};
	selection.forEach(s=>{
		selectedRadios[s]=getRadioSelectedByName(s);
	});
	
	
	Object.keys(o.r).forEach(k=>{
		if(k!='description'&&k!='resourceMap'){
			let i=o.r[k];


			if(
				(o.c==selectedRadios[selection[0]]||selectedRadios[selection[0]]=='all')&&
				(selectedRadios[selection[1]]==i.type.toLowerCase()||selectedRadios[selection[1]]=='all')
			){
			parseado+='<tr>'+
					'<TD '+'data-sortid="'+k+'"'+'></p>'+k+'<p><img src="'+i.img+'" style="max-width:10vw!important;"></TD>'+
					'<TD '+'data-sortid="'+i.type+'"'+'>'+i.type+'</TD>'+
					'<TD '+'data-sortid="'+i.vein+'"'+'>'+i.vein+'</TD>'+
					'<TD '+'data-sortid="'+i.stand+'"'+'>'+i.stand+'</TD>'+
					'<TD '+'data-sortid="'+i.mat+'"'+'><p><img src="'+i.matimg+'" style="max-width:10vw!important;"></p>'+i.mat+' ['+i.qty+']'+'</TD>'+
				'</tr>';
			}
		}
	});
	parseado+='</tbody></table>';
	document.getElementById(o.c+'MiningTable').innerHTML=parseado;
}

function drawFishing(o){
	let parseado='';
	let sortableTH='class="sortable" onclick="sortTable(event)"';
	
	var diff=resultJson!=''?new Date(new Date().toUTCString())-moment(resultJson.timestamp):0;

				/*
				data.r=resources[k].mining;
				data.d=resources[k].desc;
				data.c=k;
				data.t=actualTimers[k];
				data.td=resources[k].timerDesc
				*/

	//parseado='<h4>'+o.d+' Fishing ('+strDiff(o.t.timeLeft, diff)+' to '+(o.t[timerExtension[o.c].cycle]==true?timerExtension[o.c].nightDesc:timerExtension[o.c].dayDesc)+' cycle)</h4><p>'+o.r.description+'</p><table border="1px solid red" style="background: darkcyan;">';
	parseado='<h4>'+o.d+' Fishing ('+strDiff(o.t.timeLeft, diff)+' to '+(o.t[o.td.cycle]==true?o.td.nightDesc:o.td.dayDesc)+' cycle)</h4><p>'+o.r.description+'</p><table border="1px solid red" style="background: darkcyan;" class="tableResources">';
	parseado+='<tbody><tr>'+
			'<th '+sortableTH+'>Resource</th>'+
			'<th '+sortableTH+'>Active</th>'+
			'<th '+sortableTH+'>Spear</th>'+
			'<th '+sortableTH+'>Bio</th>'+
			'<th '+sortableTH+'>Bait</th>'+
			'<th '+sortableTH+'>Cycle</th>'+
			'<th '+sortableTH+'>Material</th>'+
			'<th '+sortableTH+'>Reputation</th>'+
		'</tr>'

	let selection=['fishingLocationRadio','fishingBioRadio','fishingActiveRadio']
	let selectedRadios={};
	selection.forEach(s=>{
		selectedRadios[s]=getRadioSelectedByName(s);
	});
	

	Object.keys(o.r).forEach(k=>{
		if(k!='description'&&k!='resourceMap'){
			let i=o.r[k];
			
			if(
				(o.c==selectedRadios[selection[0]]||selectedRadios[selection[0]]=='all')&&
				(selectedRadios[selection[1]]==i.bio||selectedRadios[selection[1]]=='all')&&
				(checkActiveResource(i,o.t)==selectedRadios[selection[2]]||selectedRadios[selection[2]]=='all')
			){
				parseado+='<tr>'+
						'<TD data-sortid="'+k+'" rowspan="1">'+k+'<p><img src="'+i.img+'" style="max-width:10vw!important;"><p></TD>'+
						'<TD data-sortid="'+i.cycle+'" rowspan="1">'+(checkActiveResource(i,o.t)==true?strDiff(o.t.timeLeft, diff):'---')+'</TD>'+
						'<TD data-sortid="'+i.spear+'" rowspan="1">'+i.spear+'</TD>'+
						'<TD data-sortid="'+i.bio+'" rowspan="1">'+i.bioDesc+'</TD>'+
						'<TD data-sortid="'+i.bait+'" rowspan="1">'+i.bait+'</TD>'+
						'<TD data-sortid="'+i.cycle+'" rowspan="1">'+i.cycle+'</TD>'+
						'<TD data-sortid="'+i.mats+'" rowspan="1">'+i.mats+'</TD>'+
						'<TD data-sortid="'+i.s+'"><p>S: '+i.s+'</p><p>M: '+i.m+'</p><p>L: '+i.l+'</p></TD>'+
						//'<tr><TD data-sortid="'+i.m+'">M: '+i.m+'</TD></tr>'+
						//'<tr><TD data-sortid="'+i.l+'">L: '+i.l+'</TD></tr>'+
					'</tr>';
			}
		}
	});
	parseado+='</tbody></table>';
	document.getElementById(o.c+'FishingTable').innerHTML=parseado;
}

function checkActiveResource(r,t){
	let response=false;
	if (r.cycle!=undefined){
		switch(r.cycle.toLowerCase()){
			case 'day':
			case 'warm':
				response=t.dayCycle;
				break;
			case 'night':
			case 'cold':
				response=!t.dayCycle;
				break;
			case 'any':
			default:
				response=true;
		}
	}else{
		response=true;
	}
	return response;
}