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

function getParameter(parametro){
	var url_string = window.location.href;
	var url = new URL(url_string);
	var p = url.searchParams.get(parametro);
	return p;
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
	const el = document.createElement('textarea');  // Create a <textarea> element
	el.value = str;                                 // Set its value to the string that you want copied
	el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
	el.style.position = 'absolute';                 
	el.style.left = '-9999px';                      // Move outside the screen to make it invisible
	document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
	const selected =            
	document.getSelection().rangeCount > 0        // Check if there is any content selected previously
	? document.getSelection().getRangeAt(0)     // Store selection if found
	: false;                                    // Mark as false to know no selection existed before
	el.select();                                    // Select the <textarea> content
		document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
		document.body.removeChild(el);                  // Remove the <textarea> element
	if (selected) {                                 // If a selection existed before copying
		document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
		document.getSelection().addRange(selected);   // Restore the original selection
	}
};
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

	table+='</table>'
	return table
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
	if (escape){
		por="\\"+reemplazar;
		return texto.split(reemplazar).join(por);	
	} else {
		return texto.split(reemplazar).join(por);	
	}
	
}

function strReplaceAllNonPrintable(texto,reemplazarPor=' '){
	texto=strReplaceAll	(texto,"'",reemplazarPor);
	return texto;
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
	date=new Date(date);
	return 	date.getDate() + "/"
	        + (date.getMonth()+1)  + "/" 
	        + date.getFullYear() + " @ "  
	        + date.getHours() + ":"  
	        + date.getMinutes() + ":" 
	        + date.getSeconds();
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

function textToSpeech(text){
	var msg = new SpeechSynthesisUtterance(text);
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
function bubbleSorting(arr,ordenarZA) {
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

function arraySortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key]
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
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
						return array.indexOf(item) == pos}
					);
}
function arrayRemove(array,remove=''){
	var auxArray
	array.forEach(function(a){
		if(a!=remove){
			auxArray.push(a);
		}
	});
	return auxArray;
}

function arrayToPipedString(array,separador='|'){
	var result="";
	var i=0;
	array.forEach(function (item){
		if(i=0){
			result=item;
		}else{
			result+=separador+item;
		}
		i++
	});
	return result;
}

function pipedStringToArray(pipedString,separador='|'){
	var result=[];
	result = pipedString.split(separador);
	return result;
}

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