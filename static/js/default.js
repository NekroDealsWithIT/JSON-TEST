const vitruvianMax=17;
const vitruvianImgCount=1;
let vitruvianImg=[];
function setStyle(data){
	document.body.className='';
	data!='normal'?document.body.className=data:'';
	switch(data){
		case 'vitruvian':
			generateVitruvian();
			break;
		default:

	}
}

function generateVitruvian(callback=''){
	/*
		https://www.robinosborne.co.uk/2016/05/16/lazy-loading-images-dont-rely-on-javascript/
		https://www.sitepoint.com/five-techniques-lazy-load-images-website-performance/
	*/
	console.log(callback);
	if(callback==''){
		let d = document.querySelector('#vitruvianDiv');
		d!=undefined?document.body.removeChild(d):'';
		vitruvianImg=[];

		let vAuxImg=randBetweenUniqueArray(1,vitruvianMax,true,vitruvianImgCount);
		vAuxImg.forEach(i=>vitruvianImg[i]={'src':'static/img/vitruvian/'+i+'.png','id':i,'loaded':false});

		d = document.createElement('div');
		s = document.createElement('style');
		s.id="styleVitrubian";
		s.innerText=".vitruvian{background:#000!important;background-color:#000;z-index:-1}#vitruvianDiv{position:fixed;top:0;left:0;opacity:0.5;}.vitImg{width:100vw;height:100vh;position:sticky;top:0;}";

		d.appendChild(s);

		d.id='vitruvianDiv';
		//d.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000';
		//d.innerText='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
		
		vitruvianImg.forEach(i=>{
			let im = document.createElement('img');
			im.src=i.src;
			im.id='vitImg'+i.id;
			im.classList='vitImg';
			//im.classList+=' hidden';

			//im.load="generateVitruvian("+i+");"

			//im.style='width:100vw;height:100vh;position:sticky;top:0;';
			d.appendChild(im);
		});
		d.onload="generateVitruvian(true);";
		document.body.insertBefore(d,document.body.firstChild);
	}else{
		console.log(callback,"ya cargue");
		console.log(vitruvianImg);
	}
}