/*
	Pequeña cajita de herramientas de nekro
	
*/
/*
-----------------------------------------------------
	Funciones de include html
-----------------------------------------------------
*/
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    
	if (file) {
	  /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
		  if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};

function loadExternalHTML(){
	var z, i, elmnt, file;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		/*search for elements with a certain atrribute:*/
		file = elmnt.getAttribute("w3-include-html");
		
		// Cargo con jquery
		if (file) {
			$('#'+elmnt.id).load(file);			
		}
	}
}

/*
-----------------------------------------------------
	Funciones de QUERY a Google Sheets
-----------------------------------------------------
*/

/*
	getJsonSheets -> processSheetsJson -> parseSheetsJsonData -> callback
	ssId: Key de compartir en sheets.
	gid: Id hoja.
	range: Rango celdas (ver desc).
	output=Preparado para csv.
	desc: true si se usa una matriz que tenga en la primer columna la descripcion para hacerla key.
	constants: (string) nombre de las constantes para reemplazar (para achicar los json).
	callback: funcion de callback si va vacia, retorna el objeto. Sino, llama callback con estos params (objeto,ssId,duracionMs).
*/
function getJsonSheets(ssId,gid,range,output='csv',desc=false,constants='',callback=null){
	gid="&gid="+gid; //Id Hoja //1037375654
	range="&range="+range; //Rango query //B2:B
	output='&output='+output;
	urlSheets=atob("aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXQvcHViP2tleT0=")+ssId+"&single=true"+gid+output+range;

	try{
		var start=new Date().getTime();
		xmlhttp=new XMLHttpRequest();
		var finish;
		
		xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status==200){
			finish=new Date().getTime()-start;
			processSheetsJson(xmlhttp.responseText,ssId,desc,constants,callback,finish);
		}

		xmlhttp.onprogress = function () {
			console.log('LOADING '+ssId+': ', xmlhttp.status);
		};
		xmlhttp.onload = function () {
			finish=new Date().getTime()-start;
			console.log('DONE '+ssId+' ('+finish+' ms): ', xmlhttp.status);
		};
	};
		xmlhttp.open("GET",urlSheets,true);
		xmlhttp.send(null);
	} catch (e){
		console.error('[getJsonSheets]: '+ssId,e.toString());
	}
}

function processSheetsJson(data,ssId,desc,constants,callback,timeMilis){
	//console.log(ssId,desc,constants,callback,timeMilis,data);
	let resultJsonSheets;
	try{
		//Reemplazo las constantes
		if(!(constants==='')){
			var constantsData=parseSheetsJsonData(data,desc,ssId);
			console.log(constantsData);
			if(desc==true){
				constantsData[constants].forEach(c=>{
					data=data.split(c.constant).join(c.value);
				});								
			} else {
				console.log(constantsData[0]);
				constantsData[0].forEach(c=>{
					data=data.split(c.constant).join(c.value);
				});				
			}
		}
		resultJsonSheets=parseSheetsJsonData(data,desc,ssId);
	}catch(e){
		console.error('[processSheetsJson]: '+ssId,e.toString());
	}finally{
		if (callback==null){
			return resultJsonSheets;
		}else{
			callback(resultJsonSheets,ssId,timeMilis);
		}
	}
}

function parseSheetsJsonData(data,desc,ssId){
	//console.log(desc,ssId,data);
	try{
		var response=[];

		//Separo por los enters
		data=data.split('\n');
		data.forEach(j =>{
			//Reemplazo los ""
			var aux=j.split('""').join('"');

			if (desc==true){
				//Tiene la columna de descripcion
				
				//Busco la descripcion
				var descripcion=aux.split(',')[0];
				
				//Elimino el '"' al final si lo tiene
				if(aux.substring(aux.length-1)=='"'){
					aux=aux.substring(0, aux.length-1);
				}	

				//Pongo la descripcion como clave
				aux='{"'+descripcion+'":'+aux.substring(descripcion.length+2, aux.indexOf('}]')+2)+'}';
				console.log('[parseSheetsJsonData] desc:' aux);
			}else{
				//Corto los " al principio y final
				aux=aux.substring(1, aux.length-1);
				if(aux.substring(aux.length-1)=='"'){
					aux=aux.substring(0, aux.length-1);
				}				
			}

			//Convierto a JSON
			aux=JSON.parse(aux);
			response.push(aux);
		});
	}catch(e){
		console.error('[parseSheetsJsonData]: '+ssId,e.toString());
	}finally{
		return response;
	}
}

function testCallbackSheets(jsonSheetsResult,ssId,timeMilis){
	console.log('[recibirCallback] Finalizo '+timeMilis+' ms.',jsonSheetsResult);
}

/*
-----------------------------------------------------
	Funciones de Parametros en URL
-----------------------------------------------------
*/
function urlGetParameter(parametro,urlToCheck=window.location.href){
	var url = new URL(urlToCheck);
	var p = url.searchParams.get(parametro);
	return p;
}
function urlSetParameter(parametro,valor,update=true,urlToCheck=window.location.href){
	var url = new URL(urlToCheck);
	(update?url.searchParams.delete(parametro):"");
	url.searchParams.append(parametro,valor);
	return url;	
}
function urlDeleteParameter(parametro,urlToCheck=window.location.href){
	var url = new URL(urlToCheck);
	var p = url.searchParams.get(parametro);
	url.searchParams.delete(parametro)
	return url;	
}
function securizeUrl(url){
	return url.substring(0,5)=='http:'?url.replace('http://','https://'):url;
}

function redirectToHttps(){
	if(location.protocol=='http:')location.href=location.href.replace(/^http:/, 'https:');
}

//requiere esto en el HTML
// <script type="text/javascript" charset="utf-8" src="http://bit.ly/javascript-api.js?version=latest&amp;login=emlo&amp;apiKey=R_6b2f33956923c76b2a206af41e4bab0c"></script>
// o
// <script type="text/javascript" charset="utf-8" src="http://bit.ly/javascript-api.js?version=latest&amp;login=delzon&amp;apiKey=R_0438e51fc6cc3e2f3a66179db9a5a0af"></script>
function shortenUrl(url,into){
	BitlyCB.myShortenCallback = function(data) {
	// this is how to get a result of shortening a single url
	var result;
	for (var r in data.results) {
		result = data.results[r];
		result['longUrl'] = r;
		break;
	}
		return document.getElementById(into).innerHTML=result['shortUrl'];
	}
	BitlyClient.shorten(url, 'BitlyCB.myShortenCallback');
}

/*
-----------------------------------------------------
	Funciones de clipboard
-----------------------------------------------------
*/

/*
"copy"
"cut"
"paste"
"selectAll"

"backColor"
"bold"
"createLink"
"defaultParagraphSeparator"
"delete"
"fontName"
"fontSize"
"foreColor"
"formatBlock"
"forwardDelete"
"insertHorizontalRule"
"insertHTML"
"insertImage"
"insertLineBreak"
"insertOrderedList"
"insertParagraph"
"insertText"
"insertUnorderedList"
"justifyCenter"
"justifyFull"
"justifyLeft"
"justifyRight"
"outdent"
"redo"
"strikethrough"
"styleWithCss"
"superscript"
"undo"
"unlink"
"useCSS"
*/

const copyToClipboard = str => {
	const el = document.createElement('textarea');  	// Create a <textarea> element
	el.value = str;                                 	// Set its value to the string that you want copied
	el.setAttribute('readonly', '');                	// Make it readonly to be tamper-proof
	el.style.position = 'absolute';                 
	el.style.left = '-9999px';                      	// Move outside the screen to make it invisible
	document.body.appendChild(el);                  	// Append the <textarea> element to the HTML document
	const selected =            
	document.getSelection().rangeCount > 0        		// Check if there is any content selected previously
	? document.getSelection().getRangeAt(0)     		// Store selection if found
	: false;                                    		// Mark as false to know no selection existed before
	el.select();                                    	// Select the <textarea> content
		document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
		//console.log(str);
		document.body.removeChild(el);                  // Remove the <textarea> element
	if (selected) {                                 	// If a selection existed before copying
		document.getSelection().removeAllRanges();    	// Unselect everything on the HTML document
		document.getSelection().addRange(selected);   	// Restore the original selection
	}
};
/*
-----------------------------------------------------
	Funciones de fetch
-----------------------------------------------------
*/
/*
ejemplo de options 
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

fetchJSONCallback('https://api.warframe.market/v1/items/vitality/orders',[{method: "GET",credentials: "omit",mode: "no-cors",headers: {"Content-Type": "application/json; charset=utf-8"},redirect: "follow",referrer: "no-referrer"}],console.log)
*/
function fetchJSONCallback(url, options, callback,errCallback=console.log) {
  if (typeof options === 'function') {
    callback = options
    options = {}
  }

  options = options || {}

  const headers = (options.headers || (options.headers = {}))
  headers.Accept = 'application/json'
    fetch(url, options)
    .catch(err=>{errCallback("Error al buscar fetch de "+url,err.message);})
    .then(response => response.json())
    .then(json => callback(json), callback)
    .catch(err=>{console.log("Error al buscar fetch de "+url,err.message);})
}

/*
-----------------------------------------------------
	Funciones de tablas
-----------------------------------------------------
*/
/*
	//Como armarlo
	var arrayTH=[[
				 ['Línea Evolución<BR>Vigencia del 01/05/2018 al 31/05/2018','prendarios-lineas-table-linea','','rowspan="7"'],
				 ['Plazo (meses)','prendarios-lineas-table-meses'],
				 ['Tasa Nominal Anual (TNA)','prendarios-lineas-table-meses'],
				 ['Tasa Efectiva Anual (TEA)'],
				 ['CFT (Efectivo S/IVA)'],
				 ['CFT (Efectivo C/IVA)']
				]];//Array de headers
	var arrayTD=[
				 [['12','prendarios-lineas-table-azul'],['31,50%'],['36,47%'],['43,36%'],['54,33%']],
				 [['18','prendarios-lineas-table-azul'],['31,50%'],['36,47%'],['43,21%'],['54,09%']],
				 [['24','prendarios-lineas-table-azul'],['31,50%'],['36,47%'],['43,36%'],['53,78%']],
				 [['36','prendarios-lineas-table-azul'],['31,50%'],['36,47%'],['42,99%'],['53,19%']],
				 [['48','prendarios-lineas-table-azul'],['31,50%'],['36,47%'],['41,86%'],['52,29%']],
				 [['60','prendarios-lineas-table-azul'],['31,50%'],['36,47%'],['41,86%'],['51,28%']]
				];//Array de datos
	var claseTable='prendarios-lineas-table',
		
		idTable='sin ID', //ID de table				
		atribsTable='style="background-color: rebeccapurple; color:yellow;"',//que atribs para el table
		headTable=false,//con headTable
		bodyTable=false;//con bodyTable
	// asi se llena el div
	superTable.innerHTML=generateTable(arrayTD,arrayTH,claseTable,idTable,atribsTable,headTable,bodyTable);
*/
function generateTable(arrayTable,arrayTH='',claseTable='',idTable='',atribsTable='',headTable=false,bodyTable=false){
	var table='<table'+
				((claseTable!=''&&claseTable!=undefined)?' class="'+claseTable+'"':'')+
				((idTable!=''&&idTable!=undefined)?' id="'+idTable+'"':'')+
				((atribsTable!=''&&atribsTable!=undefined)?' '+atribsTable:'')+
				'>\n';
	
	if(arrayTH!=''&&arrayTH!=undefined){
		if(headTable){
			table+='<THEAD>\n<TR>\n';
		}else{
			table+='<TR>\n';
		}
		arrayTH.forEach(function(arrayTHvalues) {
			arrayTHvalues.forEach(function(TH) {
				if (TH!=undefined){
					var valueTH=TH[0],classTH=TH[1],idTH=TH[2],attribTH=TH[3];
					table+='<TH'+ 
						((classTH!=undefined&&classTH!='')?' class="'+classTH+'"':'') +
						((classTH!=undefined&&classTH.includes("sortable"))?' onclick="sortTable(event)"':'') +
						((idTH!=undefined&&idTH!='')?' id="'+idTH+'"':'') +
						((attribTH!=undefined&&attribTH!='')?' '+attribTH:'') +
						'>\n'+valueTH+'\n</TH>\n';
						'</TH>\n';
				}
			});
		});
		if(headTable){
			table+='</TR>\n</THEAD>\n';
		}else{
			table+='</TR>\n';
		}
	}
	if(bodyTable){
		table+=((arrayTable!=''&&arrayTable!=undefined)?'<TBODY>\n':'');
	}
	arrayTable.forEach(function(arrayTD) {
		table+='<TR>\n'
		arrayTD.forEach(function(TD){
			if (TD!=undefined){
				var valueTD=TD[0],classTD=TD[1],idTD=TD[2],atribTD=TD[3];
				table+='<TD'+ 
					((classTD!=undefined&&classTD!='')?' class="'+classTD+'"':'') +
					((idTD!=undefined&&idTD!='')?' id="'+idTD+'"':'') +
					((atribTD!=undefined&&atribTD!='')?' '+atribTD:'') +
					'>\n'+valueTD+'\n</TD>\n';
			}
		});
		table+='</TR>\n'
	});
	if(bodyTable){
		table+=((arrayTable!=''&&arrayTable!=undefined)?'</TBODY>\n':'');
	}

	table+='</table>';
	return table;
}
// TODO Hacer multisort con shift
// https://datatables.net/examples/basic_init/multi_col_sort.html
// https://stackoverflow.com/questions/29642295/sorting-html-table-by-two-columns
// agregar un data set con sort ID en el TD
function sortTable(ev) {
  if(!ev.target.classList.contains("sortable")){return false}
  let multipleSort=false;
  //ths[pos].classList.add(dir=="asc"?"sortAZ":'sortZA');
  if(ev.target.classList.contains("sortZA")){ev.target.classList.remove("sortZA");return false;}
  else if(ev.target.classList.contains("sortAZ")){ev.target.classList.remove("sortAZ");ev.target.classList.add("sortZA");}
  else{ev.target.classList.add("sortAZ");}

  let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  let table=ev.target.parentNode.parentNode.parentNode;
  let ths=table.getElementsByTagName("TH");
  let pos='false';
  for (i=0;i<(ths.length);i++){
      ths[i]==ev.target?pos=i:'';
      if(ths[i].classList.contains("sortable")){
        /* TO DO Multiple Filtro con shift */
        if(multipleSort==false){
	        ths[i].classList.remove("sortAZ");
	        ths[i].classList.remove("sortZA");
	    }
      }
  }
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare, one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[pos];
      y = rows[i + 1].getElementsByTagName("TD")[pos];
      let xValue=x.dataset.sortid==undefined?x.innerHTML.toLowerCase():x.dataset.sortid;
      let yValue=y.dataset.sortid==undefined?y.innerHTML.toLowerCase():y.dataset.sortid;
      //Evaluo sort numerico
      isNaN(Number(xValue))?'':xValue=Number(xValue);
      isNaN(Number(yValue))?'':yValue=Number(yValue);

      /*check if the two rows should switch place, based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (xValue > yValue) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (xValue < yValue) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;      
    } else {
      /*If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.*/
      if (switchcount==0&&dir=="asc") {
        dir="desc";
        switching=true;
      }
    }
  }
  /*deshabilitar esto cuando este el multisort*/
  if(multipleSort==false){
  	ths[pos].classList.add(dir=="asc"?"sortAZ":'sortZA');
  	ths[pos].dataset.sorted=dir;
  }
}
//TODO integrar al sort arriba
function sortTableNumeric() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) > Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
/*
-----------------------------------------------------
	Manejo de combos
-----------------------------------------------------
*/
function comboRemoveAllOptions(comboID,preservarSeleccionado=false){
	if(comboID==''){return false;}
	var frm=document.getElementById(comboID);
	// For existing Types remove all options from the Type field (except the selected) so it can't be changed
	for (i=frm.options.length-1;i>=0;i--){
		if (frm.options[i].value!=frm.value||!preservarSeleccionado){
			frm.options[i]=null;
		}
	}
	return true;
}

  function comboAddOption(comboID,text,value,selected=false){
	if(comboID==''){return false;}
	var option = document.createElement("option");
	var combo = document.getElementById(comboID);

	option.text = text;
	option.value = value;
	option.selected = selected;
	
	combo.appendChild(option);

	return true;
  }

/*
-----------------------------------------------------
	Manejo de radios
-----------------------------------------------------
*/
  function getRadioSelectedByName(name){
  	return document.querySelector('input[name="'+name+'"]:checked').value
  }
/*
-----------------------------------------------------
	Funciones de texto
-----------------------------------------------------
*/
function fillStr(string,positions=0,char='0',left=true){
	var result=string;
	while(result.length<positions){
		if(left){
			result=char+result;
		}else{
			result=result+char;
		}
		
	}
	return result;
}

function strReplaceAll(texto,reemplazar,por,escape=false){
	//return str.replace(new RegExp(find, 'g'), replace);
	//console.log(texto,reemplazar,por);
	if (texto!=undefined&&texto.length>0){
		if (escape){
			por="\\"+reemplazar;
			return texto.split(reemplazar).join(por);	
		} else {
			return texto.split(reemplazar).join(por);	
		}
	}else{
		return texto;
	}
}
function strReplaceAllNonPrintable(texto,reemplazarPor=' '){
	texto=strReplaceAll	(texto,"'",reemplazarPor);
	return texto;
}

function stringToSlug(str) {
	str = str.replace(/^\s+|\s+$/g, ""); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	var from = 	"åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
	var to = 	"aaaaaaeeeeiiiioooouuuunc------";

	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
	}

	str = str
	.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
	.replace(/\s+/g, "-") // collapse whitespace and replace by -
	.replace(/-+/g, "-"); // collapse dashes

	return str;
}

/*
-----------------------------------------------------
	Funciones de tiempo
-----------------------------------------------------
*/
function sleep(timer=1000,idTimer=true){
	return window.setTimeout(idTimer, timer);
}
function setClock(interval=1000,funcion='clock',variable){
	variable = window.setInterval(funcion, interval);
	return variable;
}
function stopClock(variableClock){
	return window.clearInterval(variableClock);
}
function tiempoStr(tiempo=new Date(),mascara=''){
	var resultado;
	if(mascara==''){
		resultado=tiempo.toLocaleTimeString();
	}else{
		resultado=tiempo.format(mascara);
	}
	return resultado;
}

/*
// get Bombay time
alert(calcActualTimeTimezone('Bombay', '+5.5'));

// get Singapore time
alert(calcActualTimeTimezone('Singapore', '+8'));

// get London time
alert(calcActualTimeTimezone('London', '+1'));
*/
function calcActualTimeTimezone(offset) {
    // create Date object for current location
    d = new Date();
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // create new Date object for different city
    // using supplied offset
    nd = new Date(utc + (3600000*offset));
    // return time as a string
    return nd.toLocaleString();
}

function convertDateLocalToIso(fecha,revertir=false){
	try{
		if(!revertir){
			return new Date(fecha).toISOString();
		}else{
			return new Date(fecha);
		}
	}catch(e){
		return null;
	}
}

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

function dateToString(date){
	if(date==null||date==undefined){
		return '---';
	}else{
	date=new Date(date);
	return 	date.getDate() + "/"
	        + (date.getMonth()+1)  + "/" 
	        + date.getFullYear() + " @ "  
	        + date.getHours() + ":"  
	        + date.getMinutes() + ":" 
	        + date.getSeconds();
	}
}
/*
-----------------------------------------------------
	Chequeo de cuit
-----------------------------------------------------
*/

function validarCuit(cuit) {
 
        if(cuit.length != 11) {
            return false;
        }
 
        var acumulado   = 0;
        var digitos     = cuit.split("");
        var digito      = digitos.pop();
 
        for(var i = 0; i < digitos.length; i++) {
            acumulado += digitos[9 - i] * (2 + (i % 6));
        }
 
        var verif = 11 - (acumulado % 11);
        if(verif == 11) {
            verif = 0;
        } else if(verif == 10) {
            verif = 9;
        }
 
        return digito == verif;
}

/*
-----------------------------------------------------
	Funciones numericas
-----------------------------------------------------
*/
function validateRandomizer(parentFunction, min, max, esInt, tipo, cantPos, arrayVerif){
	var msg='';
	//console.log(parentFunction+' '+min+' '+max+' '+esInt+' '+tipo+' '+cantPos+' '+arrayVerif);

	if(tipo==0||tipo==1){
		if(min>max){
			msg='[validateRandomizer:'+parentFunction+'] El min: '+min+' no puede ser mayor al maximo: '+max+'\n'
		}
	}
	if(tipo==0||tipo==1){
		if(min==max){
			msg='[validateRandomizer:'+parentFunction+'] El min: '+min+' no puede ser igual al maximo: '+max+'\n'
		}
	}
	if(tipo==1){
		if((max-min)<cantPos&&esInt){
			msg='[validateRandomizer:'+parentFunction+'] No hay suficientes posiciones('+cantPos+') si usamos INT para usar un minimo: '+min+' y un maximo: '+max+'\n'
		}
	}
	if (tipo==2){
		if(arrayVerif.length==0){
			msg='[validateRandomizer:'+parentFunction+'] La lista no puede estar vacia\n'
		}
	}
	
	
	if (msg===''){
		return true
	}else{
		console.log(msg);
		return false
	}
}

function randBetween(min, max, esInt){
	var tipo = 0, parentFunction = 'randBetween';
	if(!validateRandomizer(parentFunction,min, max, esInt, tipo)){return false};
	//console.log('validateRandomizer('+"'"+parentFunction+"'"+','+min+','+max+','+esInt+','+tipo+')');
	
	if(esInt){
		return Math.floor(Math.random()*(max-min+1)+min);
	}else{
		return Math.random()*(max-min)+min;
	}
}

function randBetweenUniqueArray(min, max, esInt, posiciones){
	var tipo = 1, parentFunction = 'randBetweenUniqueArray';
	if(!validateRandomizer(parentFunction,min, max, esInt, tipo, posiciones)){return false};
	//console.log('validateRandomizer('+"'"+parentFunction+"'"+','+min+','+max+','+esInt+','+tipo+','+posiciones+')');

	var arrayUnique=[];
		
	while (posiciones > arrayUnique.length){
		var nro = randBetween(min,max,esInt);
		var existe = false;
		arrayUnique.forEach(function(nroArray) {
			if(nro==nroArray){
				existe=true;
			}
		});
		if(!existe){
			arrayUnique.push(nro);
		}
	}
	return arrayUnique;
}

function randLista(arrayLista){
	var tipo = 2, parentFunction = 'randLista';
	var max = arrayLista.length-1, min=0,esInt=true,posiciones=1;
	if(!validateRandomizer(parentFunction,min, max, esInt, tipo, posiciones,arrayLista)){return false};
	//console.log('validateRandomizer('+"'"+parentFunction+"'"+','+min+','+max+','+esInt+','+tipo+','+posiciones+')');
	
	var id = randBetween(min,max,esInt);
	return arrayLista[id];
}

function randListaArray(arrayLista){
	var tipo = 2, parentFunction = 'randListaArray';
	var max = arrayLista.length-1, min=0,esInt=true,posiciones=1;
	if(!validateRandomizer(parentFunction,min, max, esInt, tipo, posiciones,arrayLista)){return false};
	//console.log('validateRandomizer('+"'"+parentFunction+"'"+','+min+','+max+','+esInt+','+tipo+','+posiciones+','+arrayLista+')');
		
	var arrayUnique=[];
	var existe = false;
	while (arrayLista.length > arrayUnique.length){
		var nro = randBetween(min,max,esInt);
		var existe = false;
		arrayUnique.forEach(
			function(nroArray) {
				if(nro==nroArray){
					existe=true;
				}
			}
		);
		if(!existe){
			arrayUnique.push(nro);
		}
	}	
	var arrayFinal=[];
	arrayUnique.forEach(
		function(idArray) {
			arrayFinal.push(arrayLista[idArray]);
		}
	);
	return arrayFinal;
}

/*
-----------------------------------------------------
	Manejo de sonidos
-----------------------------------------------------
*/
function cargarSonido(source='', soundControl){
	if (source==''){return false;}
	if (source=='Hablado'){textToSpeech(source);return;}
	source='static/sound/alerts/'+source;
	soundControl.src =source;
	soundControl.load();
	soundControl.play();
}

function textToSpeech(text,lang=''){
	var msg = new SpeechSynthesisUtterance(text);
	if (lang!=''){
		msg.lang=lang;
	}
	window.speechSynthesis.speak(msg);
}

/*
-----------------------------------------------------
	Manejo de clases
-----------------------------------------------------
*/
function toggleHide(id){
	// requiere clase .hidden{display: none;}
	document.getElementById(id).classList.toggle("hidden");
}
function removeClass(id, clase){
	document.getElementById(id).classList.remove(clase);
}
function addClass(id,clase){
	document.getElementById(id).classList.add(clase);
}
function toggleClass(id,clase,aplicar=''){
	if (aplicar==''){
		document.getElementById(id).classList.toggle(clase);
	}else{
		if(aplicar){
			document.getElementById(id).classList.add(clase);
		}else{
			document.getElementById(id).classList.remove(clase);
		}
	}
}
/*
-----------------------------------------------------
	Cookies
	Verificar el maximo en esta url:
	http://browsercookielimits.squawky.net/
-----------------------------------------------------
*/

function isCookieEnabled(){
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;
    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled){ 
        document.cookie="testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled);
}

function setCookie(cname,cvalue,tiempoExpiracion=1*24*60*60*1000, path='/') {
    // 1 dia= 1*24*60*60*1000
    var d = new Date();
    d.setTime(d.getTime() + (tiempoExpiracion));
    var expires = "expires=" + d.toGMTString();
    var cookie =cname + "=" + cvalue + "; " + expires + ", path="+path;
    document.cookie = cookie;
    // console.log(cookie);
}
function setCookieArray(cname,cvalueArray,tiempoExpiracion=1*24*60*60*1000, path='/') {
    // 1 dia= 1*24*60*60*1000
    var d = new Date();
    d.setTime(d.getTime() + (tiempoExpiracion));
    var expires = "expires=" + d.toGMTString();
    var cookie =cname + "=" + arrayToPipedString(cvalueArray) + "; " + expires + ", path="+path;
    document.cookie = cookie;
    // console.log(cookie);
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function getCookieArray(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return pipedStringToArray(c.substring(name.length, c.length));
        }
    }
    return "";
}
function deleteCookie(cname) {
	document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
           setCookie("username", user, (1*24*60*60*1000));
       }
    }
}

function cookieTest(){
	document.cookie = "name=oeschger";  
	document.cookie = "favorite_food=tripe";  
	console.log(document.cookie); 
}

/*
-----------------------------------------------------
	Ordenamientos
-----------------------------------------------------
*/
// ordenamiento burbuja
function bubbleSorting(arr,ordenarZA=false) {
	var len = arr.length;
	for (var i = 0; i < len ; i++) {
		for(var j = 0 ; j < len - i - 1; j++){
			if(ordenarZA){
				if (arr[j] < arr[j + 1]) {
					// cambiazo (es menor)
					var temp = arr[j+1];
					arr[j+1] = arr[j];
					arr[j] = temp;
				}
			}else{
				if (arr[j] > arr[j + 1]) {
					// cambiazo (es mayor)
					var temp = arr[j];
					arr[j] = arr[j+1];
					arr[j + 1] = temp;				
				}
			}
		}
	}
	return arr;
}

function arraySortByKey(array, key,reverse=false) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key]
        if(reverse){
        	return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	    }else{
	    	return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	    }
    });
}

/*
-----------------------------------------------------
	Arrays
-----------------------------------------------------
*/

function arrayUnique(array){
	return array.filter(
		function (item, pos){
			return array.indexOf(item) == pos
		}
	);
}
function arrayRemove(array,remove=''){
	var auxArray=[];
	// array.forEach(function(a){
	// 	console.log(a+'-'+remove);
	// 	if(a!=remove){
	// 		auxArray.push(a);
	// 	}
	// });
	// return auxArray;
	
	var index = array.indexOf(remove);
    if (index > -1) {
       array.splice(index, 1);
    }
	return array;
}

function arrayToPipedString(array,separador='|',allowBlanks=false){
	var result="";
	array.forEach(function (item){
		if(allowBlanks==false){
			if(result==""){
				result=item;
			}else{
				result+=separador+item;
			}
		}else{
			if(item.trim()!=''){
				if(result==""){
					result=item;
				}else{
					result+=separador+item;
				}
			}
		}
	});
	return result;
}
function pipedStringToArray(pipedString,separador='|',allowBlanks=false){
	var result=[];
	result = pipedString.split(separador);
	if(!allowBlanks){
		result=arrayRemove(result);
	}
	return result;
}
/*
-----------------------------------------------------
	Notificaciones TOAST
-----------------------------------------------------
*/
function generateToast(title="titulo",message="mensaje",iconUrl="",duration="3000",theme='success',position="nfc-bottom-right",displayClose=true,closeOnClick=true){
	if(typeof notificationToastStyle != 'undefined'){document.head.removeChild(notificationToastStyle);}
	var notifIconSucess='urL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==")';
	var notifIconInfo='urL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=")';
	var notifIconWarning='urL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=")';
	var notifIconError='urL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=")';
	
	var notifIcon='url("'+iconUrl+'");background-size: 35px 50px;';

	// Ejemplo con soporte HTML! '<img src="https://raw.githubusercontent.com/Warframe-Community-Developers/warframe-worldstate-parser/master/resources/weapon_skin_thumb.png" height="40px" style="float: left">prueba'
	if(iconUrl!=''){
		switch(theme){
			case "success":
				notifIconSucess=notifIcon;
				break;		
			case "info":
				notifIconInfo=notifIcon;
				break;
			case "warning":
				notifIconWarning=notifIcon;
				break;
			case "error":
				notifIconError=notifIcon;
				break;
			default:
		}
	}
	var styleData='.ncf-container{font-size:14px;box-sizing:border-box;position:fixed;z-index:999}.ncf-container.nfc-top-left{top:12px;left:12px}.ncf-container.nfc-top-right{top:12px;right:12px}.ncf-container.nfc-bottom-right{bottom:12px;right:12px}.ncf-container.nfc-bottom-left{bottom:12px;left:12px}@media (max-width:767px){.ncf-container{left:0;right:0}}.ncf-container .ncf{background:#fff;transition:.3s ease;position:relative;pointer-events:auto;overflow:hidden;margin:0 0 6px;padding:30px;width:300px;border-radius:3px 3px 3px 3px;box-shadow:0 0 12px #999;color:#000;opacity:.9;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=90);filter:alpha(opacity=90);background-position:15px!important;background-repeat:no-repeat!important;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ncf-container .ncf:hover{box-shadow:0 0 12px #000;opacity:1;cursor:pointer}.ncf-container .ncf .ncf-title{font-weight:700;font-size:16px;text-align:left;margin-top:0;margin-bottom:6px;word-wrap:break-word}.ncf-container .ncf .nfc-message{margin:0;text-align:left;word-wrap:break-word}.ncf-container .success{background:#51a351;color:#fff;padding:15px 15px 15px 50px;background-image:'+notifIconSucess+'}.ncf-container .info{background:#2f96b4;color:#fff;padding:15px 15px 15px 50px;background-image:'+notifIconInfo+'}.ncf-container .warning{background:#f87400;color:#fff;padding:15px 15px 15px 50px;background-image:'+notifIconWarning+'}.ncf-container .error{background:#bd362f;color:#fff;padding:15px 15px 15px 50px;background-image:'+notifIconError+'!important}.ncf-container button{position:relative;right:-.3em;top:-.3em;float:right;font-weight:700;color:#fff;text-shadow:0 1px 0 #fff;opacity:.8;line-height:1;font-size:16px;padding:0;cursor:pointer;background:transparent;border:0}.ncf-container button:hover{opacity:1}';
	var styleNode = document.createElement('style');
	styleNode.type = 'text/css';
	styleNode.id = "notificationToastStyle";
	styleNode.innerText = styleData;
	document.head.appendChild(styleNode);
	window.createNotificationToast({
		closeOnClick: closeOnClick,
		displayCloseButton: displayClose,
		positionClass: position,
		showDuration: duration,
		theme: theme
	})({
		title: title,
		message: message
	});
}
!function(t){function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=0)}([function(t,n,e){e(1),t.exports=e(4)},function(t,n,e){"use strict";var i=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t};e(2);var o=e(3);!function(t){function n(t){return t=i({},c,t),function(t){return["nfc-top-left","nfc-top-right","nfc-bottom-left","nfc-bottom-right"].indexOf(t)>-1}(t.positionClass)||(console.warn("An invalid notification position class has been specified."),t.positionClass=c.positionClass),t.onclick&&"function"!=typeof t.onclick&&(console.warn("Notification on click must be a function."),t.onclick=c.onclick),"number"!=typeof t.showDuration&&(t.showDuration=c.showDuration),(0,o.isString)(t.theme)&&0!==t.theme.length||(console.warn("Notification theme must be a string with length"),t.theme=c.theme),t}function e(t){return t=n(t),function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=n.title,i=n.message,c=r(t.positionClass);if(!e&&!i)return console.warn("Notification must contain a title or a message!");var a=(0,o.createElement)("div","ncf",t.theme);if(!0===t.closeOnClick&&a.addEventListener("click",function(){return c.removeChild(a)}),t.onclick&&a.addEventListener("click",function(n){return t.onclick(n)}),t.displayCloseButton){var s=(0,o.createElement)("button");s.innerText="X",!1===t.closeOnClick&&s.addEventListener("click",function(){return c.removeChild(a)}),(0,o.append)(a,s)}if((0,o.isString)(e)&&e.length&&(0,o.append)(a,(0,o.createParagraph)("ncf-title")(e)),(0,o.isString)(i)&&i.length&&(0,o.append)(a,(0,o.createParagraph)("nfc-message")(i)),(0,o.append)(c,a),t.showDuration&&t.showDuration>0){var l=setTimeout(function(){c.removeChild(a),0===c.querySelectorAll(".ncf").length&&document.body.removeChild(c)},t.showDuration);(t.closeOnClick||t.displayCloseButton)&&a.addEventListener("click",function(){return clearTimeout(l)})}}}function r(t){var n=document.querySelector("."+t);return n||(n=(0,o.createElement)("div","ncf-container",t),(0,o.append)(document.body,n)),n}var c={closeOnClick:!0,displayCloseButton:!1,positionClass:"nfc-top-right",onclick:!1,showDuration:3500,theme:"success"};t.createNotificationToast?console.warn("Window already contains a create notification Toast function. Have you included the script twice?"):t.createNotificationToast=e}(window)},function(t,n,e){"use strict";!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}if(!(void 0===window.Element||"classList"in document.documentElement)){var n=Array.prototype,e=n.push,i=n.splice,o=n.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);i.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,function(t,n,e){Object.defineProperty?Object.defineProperty(t,n,{get:e}):t.__defineGetter__(n,e)}(Element.prototype,"classList",function(){return new t(this)})}}()},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=n.partial=function(t){for(var n=arguments.length,e=Array(n>1?n-1:0),i=1;i<n;i++)e[i-1]=arguments[i];return function(){for(var n=arguments.length,i=Array(n),o=0;o<n;o++)i[o]=arguments[o];return t.apply(void 0,e.concat(i))}},o=(n.append=function(t){for(var n=arguments.length,e=Array(n>1?n-1:0),i=1;i<n;i++)e[i-1]=arguments[i];return e.forEach(function(n){return t.appendChild(n)})},n.isString=function(t){return"string"==typeof t},n.createElement=function(t){for(var n=arguments.length,e=Array(n>1?n-1:0),i=1;i<n;i++)e[i-1]=arguments[i];var o=document.createElement(t);return e.length&&e.forEach(function(t){return o.classList.add(t)}),o}),r=function(t,n){return t.innerHTML=n,t},c=function(t){for(var n=arguments.length,e=Array(n>1?n-1:0),c=1;c<n;c++)e[c-1]=arguments[c];return i(r,o.apply(void 0,[t].concat(e)))};n.createParagraph=function(){for(var t=arguments.length,n=Array(t),e=0;e<t;e++)n[e]=arguments[e];return c.apply(void 0,["p"].concat(n))}},function(t,n){}]);
/*
-----------------------------------------------------
	Notificaciones Push
	https://developer.mozilla.org/en-US/docs/Web/API/Push_API
-----------------------------------------------------
*/

/*
1. Check for serviceWorker on navigator.
2. Check for PushManager on window.
*/
function checkPushServiceWorker(){
	if (!('serviceWorker' in navigator)) {
		// Service Worker isn't supported on this browser, disable or hide UI.
		return 'serviceWorker FAIL';
	}
	if (!('PushManager' in window)) {
		// Push isn't supported on this browser, disable or hide UI.
		return 'PushManager FAIL';
	}
	return true
}

function registerServiceWorker(archivoJs) {
	if (archivoJs==undefined||archivoJs==''){return false;}
	
	return navigator.serviceWorker.register()
	.then(function(registration) {
		console.log('Service worker registrado.');
		return registration;
	})
	.catch(function(err) {
		console.error('Service worker no registrado.', err);
	});
}

function askPermission() {
	return new Promise(function(resolve, reject) {
		const permissionResult = Notification.requestPermission(function(result) {
			resolve(result);
		});
		if (permissionResult) {
			permissionResult.then(resolve, reject);
		}
	})
	.then(function(permissionResult) {
		if (permissionResult !== 'granted') {
			throw new Error('No tenemos permisos.');
		}
	});
}

function getNotificationPermissionState() {
	if (navigator.permissions) {
		return navigator.permissions.query({name: 'notifications'})
		.then((result) => {
			return result.state;
		});
	}
	return new Promise((resolve) => {
		resolve(Notification.permission);
	});
}

function subscribeUserToPush() {
	return getSWRegistration()
	.then(function(registration) {
		const subscribeOptions = {
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(
				'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
				)
		};
		return registration.pushManager.subscribe(subscribeOptions);
	})
	.then(function(pushSubscription) {
		console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
		return pushSubscription;
	});
}


const sendNotification = (body, title = 'test', sound, link) => {
  if (Notification.permission === 'granted') {
    const notif = new Notification(title, {icon: 'https://warframestat.us/wfcd_logo_color.png', body});
    setTimeout(notif.close.bind(notif), 15000);
    if (sound) {
      const audio = new Audio(sound);
      audio.volume = 0.2;
      audio.play();
    }
    notif.onclick = event => {
      if (link) {
        event.preventDefault();
        window.open(link, '_blank');
      } else {
        window.focus();
      }
      notif.close.bind(notif);
    };
    return notif;
  }
  return undefined;
};

function pedirPermiso(){
	if (!('Notification' in window)) {
		// eslint-disable-next-line no-console
		console.error('[Error] This browser does not support system notifications');
	} else if (Notification.permission === 'granted') {
		// Do nothing
	} else if (Notification.permission !== 'denied') {
		// Otherwise, we need to ask the user for permission
		Notification.requestPermission(permission => {
			// If the user accepts, let's create a notification
			if (permission === 'granted') {
				sendNotification('Woot, now we can send you notifications.');
			}
		});
	}
}
