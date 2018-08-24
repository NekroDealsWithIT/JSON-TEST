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
	if(callback==''){
		let cargandoVitruvian=document.createElement('img');
		cargandoVitruvian.src='static/img/loading.gif';
		cargandoVitruvian.id='vitImgCargando';
		cargandoVitruvian.classList='vitImg';

		let d = document.querySelector('#vitruvianDiv');
		d!=undefined?document.body.removeChild(d):'';
		vitruvianImg=[];

		let vAuxImg=randBetweenUniqueArray(1,vitruvianMax,true,vitruvianImgCount);
		vAuxImg.forEach(i=>vitruvianImg[i]={'src':'static/img/vitruvian/'+i+'.png','id':i,'loaded':false});

		d = document.createElement('div');
		s = document.createElement('style');
		s.id="styleVitrubian";
		s.innerText=".vitruvian{background:#000!important;background-color:#000;}#vitruvianDiv{position:fixed;top:0;left:0;opacity:0.5;z-index:-1;}.vitImg{width:100vw;height:100vh;position:sticky;top:0;}";

		d.appendChild(s);

		d.id='vitruvianDiv';

		d.appendChild(cargandoVitruvian);

		vitruvianImg.forEach(i=>{
			let p=document.createElement('picture');
			let source650=document.createElement('source');
			source650.media="(min-width: 650px)";
			source650.srcset=i.src;
			p.appendChild(source650);

			let source465=document.createElement('source');
			source465.media="(min-width: 465px)";
			source465.srcset=i.src;
			p.appendChild(source465);

			let im = document.createElement('img');
			im.src=i.src;
			im.classList='vitImg';

			p.id='vitImg'+i.id;
			p.classList='vitImg';
			p.classList+=' hidden';
			//im.oncomplete=(i)=>{generateVitruvian(i)};
			p.appendChild(im);
			d.appendChild(p);
			p.addEventListener('oncomplete',generateVitruvian(i));
		});
		document.body.insertBefore(d,document.body.firstChild);
	}else{
		console.log(callback,"ya cargue!");
		callback.loaded=true;
		setTimeout(()=>{
			document.querySelector('#vitImgCargando').classList.add('hidden');
			document.querySelector('#vitImg'+callback.id).classList.remove('hidden');
		}, 1000);
		console.log(callback);
	}
}