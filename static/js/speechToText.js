// Speech to text
//https://mdn.github.io/web-speech-api/speech-color-changer/
//https://mdn.github.io/web-speech-api/speech-color-changer/script.js
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var comandos = [ 'commando' , 'commando no' ,'commando si', 'stop','confirm'];
var grammar = '#JSGF V1.0; grammar comandos; public <color> = ' + comandos.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-ES';//'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//var diagnostic = document.querySelector('.output');
//var bg = document.querySelector('html');
//var hints = document.querySelector('.hints');

//var colorHTML= '';
comandos.forEach(function(v, i, a){
  console.log(v, i,a);
  //colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
//hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try '+ colorHTML + '.';

//activateRecognitionBtn.onclick = function() {
document.body.onclick = function() {
  try{
  	recognition.stop();
  }finally{
  	recognition.start();
  }
  responseRecognition('i am listening!','en-GB');
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var result = event.results[last][0].transcript;

  //diagnostic.textContent = 'Result received: ' + result + '.';
  console.log('Result received: ' + result + '.');
  //bg.style.backgroundColor = result;
  responseRecognition(result,'en-GB');
  console.log('Confidence: ' + event.results[0][0].confidence);
  console.log(event.results);
}

recognition.onspeechend = function() {
  //recognition.stop();

}

recognition.onnomatch = function(event) {
  //diagnostic.textContent = "I didn't recognise that color.";
  responseRecognition('Try again','en-GB');
  console.log("I didn't recognise that color.");
}

recognition.onerror = function(event) {
  //diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  responseRecognition('Error occurred in recognition: ' + event.error,'en-GB');
  console.log('Error occurred in recognition: ' + event.error);
}

function responseRecognition(text,lang=''){
	var msg = new SpeechSynthesisUtterance(text);
	if (lang!=''){
		msg.lang=lang;
	}
	window.speechSynthesis.speak(msg);
}