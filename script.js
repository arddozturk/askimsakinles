let health=100,selectedItem="tomato";
const healthText=document.getElementById("health"),
healthFill=document.getElementById("health-fill"),
gameArea=document.getElementById("gameArea"),
flash=document.getElementById("flash"),
speech=document.getElementById("speech"),
character=document.getElementById("character"),
slapSound=document.getElementById("slapSound"),
kissSound=document.getElementById("kissSound");

const normalTexts=["özür dilerim aşkım","haklısın bitanem","sakin ol güzelim"],
dramaticTexts=["ne olur kızma","kalbimi kırıyorsun","sensiz yapamam"],
loveTexts=["seni seviyorum aşkım","iyi ki varsın","kurban olurum sana"];

function selectItem(t){selectedItem=t}
gameArea.addEventListener("click",e=>{
 const r=gameArea.getBoundingClientRect();
 if(selectedItem==="rose"){heal();kissSound.currentTime=0;kissSound.play();heartRain();showLoveText();}
 else{damage();redFlash();slapSound.currentTime=0;slapSound.play();showSpeech();}
});
function damage(){health=Math.max(0,--health);updateHealth();if(health<=10)character.classList.add("cry")}
function heal(){health=Math.min(100,++health);updateHealth();if(health>10)character.classList.remove("cry")}
function updateHealth(){healthText.textContent=health;healthFill.style.width=health+"%"}
function redFlash(){flash.style.opacity=".4";setTimeout(()=>flash.style.opacity="0",150)}
function showSpeech(){const t=(health<=30?dramaticTexts:normalTexts);speech.textContent=t[Math.floor(Math.random()*t.length)];
speech.style.opacity="1";setTimeout(()=>speech.style.opacity="0",1e3)}
function heartRain(){for(let i=0;i<40;i++){const h=document.createElement("div");h.className="falling-heart";h.textContent="❤️";
h.style.left=Math.random()*100+"vw";document.body.appendChild(h);setTimeout(()=>h.remove(),2500)}}
function showLoveText(){const t=document.createElement("div");t.className="love-text";
t.textContent=loveTexts[Math.floor(Math.random()*loveTexts.length)];
document.body.appendChild(t);setTimeout(()=>t.remove(),1200)}