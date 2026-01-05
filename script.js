let health=100;
let selectedItem='tomato';
let dead=false;

const healthEl=document.getElementById('health');
const healthFill=document.getElementById('health-fill');
const gameArea=document.getElementById('gameArea');
const speech=document.getElementById('speech');
const overlay=document.getElementById('overlay');

const punchSound=document.getElementById('punchSound');
const kissSound=document.getElementById('kissSound');

const normalTexts=['özür dilerim aşkım','haklısın bitanem','sakin ol güzelim'];
const loveTexts=['seni seviyorum aşkım','iyi ki varsın','kurban olurum sana'];

document.querySelectorAll('.top-bar button').forEach(btn=>{
  btn.onclick=()=>{selectedItem=btn.dataset.item;}
});

gameArea.onclick=(e)=>{
 if(dead) return;
 const r=gameArea.getBoundingClientRect();
 throwItem(e.clientX-r.left,e.clientY-r.top);
};

function throwItem(x,y){
 const p=document.createElement('div');
 p.className='projectile';
 p.textContent= selectedItem==='tomato'?'🍅':selectedItem==='boxing'?'🥊':'🌹';
 p.style.left='50%'; p.style.top='90%';
 gameArea.appendChild(p);

 requestAnimationFrame(()=>{
   p.style.transform=`translate(${x-gameArea.clientWidth/2}px,${y-gameArea.clientHeight}px)`;
 });

 setTimeout(()=>{p.remove(); impact(x,y);},350);
}

function impact(x,y){
 if(selectedItem==='tomato'){hit(x,y,true)}
 if(selectedItem==='boxing'){hit(x,y,false)}
 if(selectedItem==='rose'){heal(); play(kissSound); hearts(); showSpeech(loveTexts)}
}

function hit(x,y,tomato){
 damage();
 play(punchSound);
 gameArea.classList.add('shake');
 setTimeout(()=>gameArea.classList.remove('shake'),250);
 fx(tomato?'tomato_splat.png':'punch_fx.png',x,y);
 showSpeech(normalTexts);
}

function damage(){
 health--;
 if(health<=0){health=0;die();}
 updateHealth();
}

function heal(){
 health=Math.min(100,health+1);
 updateHealth();
}

function updateHealth(){
 healthEl.textContent=health;
 healthFill.style.width=health+'%';
}

function fx(img,x,y){
 const i=document.createElement('img');
 i.src=img; i.className='fx';
 i.style.left=x+'px'; i.style.top=y+'px';
 gameArea.appendChild(i);
 setTimeout(()=>i.remove(),400);
}

function showSpeech(arr){
 speech.textContent=arr[Math.floor(Math.random()*arr.length)];
 speech.style.opacity=1;
 clearTimeout(speech.timer);
 speech.timer=setTimeout(()=>speech.style.opacity=0,900);
}

function hearts(){
 for(let i=0;i<25;i++){
   const h=document.createElement('div');
   h.className='falling-heart';
   h.textContent='❤️';
   h.style.left=Math.random()*100+'vw';
   document.body.appendChild(h);
   setTimeout(()=>h.remove(),2500);
 }
}

function die(){
 dead=true;
 overlay.style.display='flex';
}

document.getElementById('reviveBtn').onclick=()=>{
 play(kissSound);
 health=100;
 dead=false;
 overlay.style.display='none';
 updateHealth();
};

document.getElementById('watchBtn').onclick=()=>{};

function play(a){a.currentTime=0; a.play();}