firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const $ = (id)=>document.getElementById(id);
const hoje = ()=> new Date().toISOString().slice(0,10);
const hora = ()=> new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
const senhaFmt = (n,p='N') => p + String(n||0).padStart(3,'0');
const nomesMesas = {1:'Laudemir',2:'Andrea'};
function toast(msg){ const t=$('toast'); if(t){t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)} }
function falar(txt){ if(!window.vozAtiva) return; try{ speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(txt); u.lang='pt-BR'; u.rate=.92; u.pitch=1.08; const v=speechSynthesis.getVoices().find(x=>/maria|francisca|female|brasil|portugu/i.test(x.name)); if(v)u.voice=v; speechSynthesis.speak(u);}catch(e){} }
function bip(){ if(!window.audioCtx) return; const ctx=window.audioCtx; const o=ctx.createOscillator(); const g=ctx.createGain(); o.frequency.value=880; g.gain.value=.18; o.connect(g); g.connect(ctx.destination); o.start(); setTimeout(()=>{o.stop()},320); }
function ativarSom(){ window.vozAtiva=true; window.audioCtx = window.audioCtx || new (window.AudioContext||window.webkitAudioContext)(); $('btnSom')?.remove(); bip(); falar('Som e voz ativados.'); }
function atualizarRelogio(){ const d=new Date(); if($('hora')) $('hora').textContent=d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}); if($('data')) $('data').textContent=d.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'2-digit',year:'numeric'}); }
setInterval(atualizarRelogio,1000); setTimeout(atualizarRelogio,10);
function registrarLog(tipo, dados){ const ref=db.ref('logs/'+hoje()).push(); ref.set({...dados,tipo,ts:Date.now(),hora:hora()}); }
