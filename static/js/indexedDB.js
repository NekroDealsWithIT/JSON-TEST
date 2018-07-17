// https://www.w3.org/TR/2018/REC-IndexedDB-2-20180130/

dbName="library";
tableName="books";
var titleIndex;
var authorIndex;
var items=[
		{title: "Quarry Memories", author: "Fred", isbn: 123456},
		{title: "Water Buffaloes", author: "Fred", isbn: 234567},
		{title: "Bedrock Nights", author: "Barney", isbn: 345678}
	];
var indexes=[
		{title: "by_title", field: "title", options:{unique: true}},
		{title: "by_author", field: "author"}
	];

var dbVersion=1;
var dbKeyPath="isbn";

/*-------*/



var request = indexedDB.open(dbName,dbVersion=1);
request.onupgradeneeded = function() {
  // The database did not previously exist, so create object stores and indexes.
  var db = request.result;
  var store = db.createObjectStore(tableName, {keyPath: dbKeyPath});
  indexes.forEach(function(index){
  	console.log(index);
  	if(index.options!=undefined){
  		store.createIndex(index.title, index.field, index.options);
  	}else{
  		store.createIndex(index.title, index.field);
  	}
  });
  /*
  var titleIndex = store.createIndex("by_title", "title", {unique: true});
  var authorIndex = store.createIndex("by_author", "author");
  */
};

request.onsuccess = function() {
  db = request.result;
};

function populate(tableName,items){
	var tx = db.transaction(tableName, "readwrite");
	var store = tx.objectStore(tableName);
	items.forEach(function(item){
		store.put(item);
	});
	tx.oncomplete = function() {
  	// All requests have succeeded and the transaction has committed.
  		console.log(store);
	};
}

// BuscarDatos
function getLocalDBItm(dbName,tableName,useIndex,itm){
	var tx = db.transaction(tableName, "readonly");
	var store = tx.objectStore(tableName);
	var index = store.index(useIndex);

	var request;
	if(itm!=""){
		request = index.get(itm);
	}else{
		request = store.getAll();
	}
	request.onsuccess = function() {
	  var matching = request.result;
	  console.log(request.result);
	  if (matching !== undefined) {
	    // A match was found.
		console.log('Success',matching);
		return matching;
	  } else {
	    // No match was found.
	    console.log('Fail',matching);
	    return matching;
	  }
	};
}
