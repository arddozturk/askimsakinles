let health=100,selectedItem='tomato';
const h=document.getElementById('health'),hf=document.getElementById('health-fill'),
ga=document.getElementById('gameArea'),
punch=document.getElementById('punchSound'),
kiss=document.getElementById('kissSound');

function selectItem(t){selectedItem=t}

ga.onclick=e=>{
 const r=ga.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
 if(selectedItem==='tomato'){damage();fx('tomato_splat.png',x,y);play(punch)}
 if(selectedItem==='boxing'){damage();fx('punch_fx.png',x,y);play(punch)}
 if(selectedItem==='rose'){heal();play(kiss)}
}

function play(a){a.currentTime=0;a.play()}
function damage(){health=Math.max(0,--health);update()}
function heal(){health=Math.min(100,++health);update()}
function update(){h.textContent=health;hf.style.width=health+'%'}

function fx(img,x,y){
 const i=document.createElement('img');
 i.src=img;i.className='fx';
 i.style.left=x+'px';i.style.top=y+'px';
 ga.appendChild(i);setTimeout(()=>i.remove(),400)
}