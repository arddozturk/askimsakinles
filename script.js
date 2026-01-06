let health=100,dead=false,selected='tomato';

const gameLayer=document.getElementById('game-layer');
const uiLayer=document.getElementById('ui-layer');
const speech=document.getElementById('speech');
const overlay=document.getElementById('overlay');
const grave=document.getElementById('grave-scene');

const h=document.getElementById('health');
const hf=document.getElementById('health-fill');

const punch=document.getElementById('punchSound');
const kiss=document.getElementById('kissSound');
const sad=document.getElementById('sadMusic');

const normalTexts=['özür dilerim aşkım','haklısın bitanem','sakin ol güzelim'];
const loveTexts=['seni seviyorum aşkım','iyi ki varsın','kurban olurum sana'];

document.querySelectorAll('.top-bar button').forEach(b=>{
 b.onclick=()=>selected=b.dataset.item;
});

gameLayer.onclick=e=>{
 if(dead) return;
 const r=gameLayer.getBoundingClientRect();
 throwItem(e.clientX-r.left,e.clientY-r.top);
};

function throwItem(x,y){
 const p=document.createElement('div');
 p.className='projectile';
 p.textContent=selected==='tomato'?'🍅':selected==='boxing'?'🥊':'🌹';
 p.style.left='50%';p.style.top='90%';
 gameLayer.appendChild(p);
 requestAnimationFrame(()=>{
  p.style.transform=`translate(${x-gameLayer.clientWidth/2}px,${y-gameLayer.clientHeight}px)`;
 });
 setTimeout(()=>{p.remove();impact(x,y)},350);
}

function impact(x,y){
 if(selected==='tomato'||selected==='boxing'){
   hit(x,y);
 }
 if(selected==='rose'){
   heal();play(kiss);hearts();showSpeech(loveTexts);
 }
}

function hit(x,y){
 damage();play(punch);
 gameLayer.classList.add('shake');
 setTimeout(()=>gameLayer.classList.remove('shake'),250);
 fx(selected==='tomato'?'tomato_splat.png':'punch_fx.png',x,y);
 showSpeech(normalTexts);
}

function damage(){
 health--;
 if(health<=0){health=0;die();}
 update();
}

function heal(){health=Math.min(100,health+1);update()}
function update(){h.textContent=health;hf.style.width=health+'%'}

function fx(img,x,y){
 const i=document.createElement('img');
 i.src=img;i.className='fx';
 i.style.left=x+'px';i.style.top=y+'px';
 gameLayer.appendChild(i);
 setTimeout(()=>i.remove(),400);
}

function showSpeech(arr){
 speech.textContent=arr[Math.floor(Math.random()*arr.length)];
 speech.style.opacity=1;
 clearTimeout(speech.t);
 speech.t=setTimeout(()=>speech.style.opacity=0,900);
}

function hearts(){
 for(let i=0;i<30;i++){
  const h=document.createElement('div');
  h.className='heart';
  h.textContent='❤️';
  h.style.left=Math.random()*100+'vw';
  uiLayer.appendChild(h);
  setTimeout(()=>h.remove(),2500);
 }
}

function die(){dead=true;overlay.style.display='flex'}

document.getElementById('reviveBtn').onclick=()=>{
 play(kiss);sad.pause();sad.currentTime=0;
 health=100;dead=false;
 overlay.style.display='none';
 update();
};

document.getElementById('watchBtn').onclick=()=>{
 overlay.style.display='none';
 grave.style.display='flex';
 sad.play();
};

function play(a){a.currentTime=0;a.play()}