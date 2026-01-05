let health=100,selectedItem='tomato',dead=false;
const h=document.getElementById('health'),
hf=document.getElementById('health-fill'),
ga=document.getElementById('gameArea'),
speech=document.getElementById('speech'),
flash=document.getElementById('flash'),
death=document.getElementById('death'),
punch=document.getElementById('punchSound'),
kiss=document.getElementById('kissSound');

const textsNormal=['özür dilerim aşkım','haklısın bitanem','sakin ol güzelim'];
const textsLove=['seni seviyorum aşkım','iyi ki varsın','kurban olurum sana'];

function selectItem(t){if(!dead)selectedItem=t}

ga.onclick=e=>{
 if(dead) return;
 const r=ga.getBoundingClientRect();
 throwItem(e.clientX-r.left,e.clientY-r.top);
}

function throwItem(x,y){
 const p=document.createElement('div');
 p.className='projectile';
 p.textContent=selectedItem==='tomato'?'🍅':selectedItem==='boxing'?'🥊':'🌹';
 p.style.left='50%';p.style.top='90%';
 ga.appendChild(p);
 requestAnimationFrame(()=>{
  p.style.transform=`translate(${x-ga.clientWidth/2}px,${y-ga.clientHeight}px)`;
 });
 setTimeout(()=>{p.remove();impact(x,y)},350);
}

function impact(x,y){
 if(selectedItem==='tomato'){hit(x,y,true)}
 if(selectedItem==='boxing'){hit(x,y,false)}
 if(selectedItem==='rose'){heal();play(kiss);hearts();speak(textsLove)}
}

function hit(x,y,drip){
 damage();play(punch);flashRed();shake();
 fx(drip?'tomato_splat.png':'punch_fx.png',x,y);
 if(drip) dripEffect(x,y);
 speak(textsNormal);
}

function damage(){
 health--;
 if(health<=0){health=0;die()}
 update();
}

function heal(){health=Math.min(100,++health);update()}
function update(){h.textContent=health;hf.style.width=health+'%'}

function fx(img,x,y){
 const i=document.createElement('img');
 i.src=img;i.className='fx';
 i.style.left=x+'px';i.style.top=y+'px';
 ga.appendChild(i);setTimeout(()=>i.remove(),400);
}

function dripEffect(x,y){
 for(let i=0;i<3;i++){
  const d=document.createElement('div');
  d.className='drip';
  d.style.left=(x-5+Math.random()*10)+'px';
  d.style.top=y+'px';
  ga.appendChild(d);
  setTimeout(()=>d.remove(),1500);
 }
}

function speak(arr){
 speech.textContent=arr[Math.floor(Math.random()*arr.length)];
 speech.style.opacity=1;
 setTimeout(()=>speech.style.opacity=0,1000);
}

function hearts(){
 for(let i=0;i<30;i++){
  const h=document.createElement('div');
  h.className='falling-heart';
  h.textContent='❤️';
  h.style.left=Math.random()*100+'vw';
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),2500);
 }
}

function flashRed(){flash.style.opacity=.35;setTimeout(()=>flash.style.opacity=0,150)}
function shake(){ga.classList.add('shake');setTimeout(()=>ga.classList.remove('shake'),250)}
function play(a){a.currentTime=0;a.play()}

function die(){dead=true;death.style.display='flex'}
function revive(){
 kiss.play();
 health=100;dead=false;
 update();
 death.style.display='none';
}
function watchDie(){}