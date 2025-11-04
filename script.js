const floatingBtn = document.getElementById('floatingBtn');
const bottomBtn = document.getElementById('bottomBtn');
const manualBtn = document.getElementById('manualBtn');
const modal = document.getElementById('manualModal');
const closeModalBtn = document.getElementById('closeModal');

// Função de tempestade: raio, flash e chuva
function stormEffect(button){
  const shape = button.querySelector('.cloud-shape');
  if(!shape) return;

  // RAIO
  const ln = document.createElement('div');
  ln.className = 'lightning';
  shape.appendChild(ln);
  ln.addEventListener('animationend', ()=> ln.remove(), {once:true});

  // FLASH
  const flash = document.createElement('div');
  flash.className = 'flash';
  document.body.appendChild(flash);
  flash.addEventListener('animationend', ()=> flash.remove(), {once:true});

  // CHUVA
  const rain = document.createElement('div');
  rain.className = 'rain';
  document.body.appendChild(rain);
  const drops = 150;
  for(let i=0; i<drops; i++){
    const drop = document.createElement('div');
    drop.className='drop';
    drop.style.left = Math.random()*100 + 'vw';
    drop.style.animationDuration = (0.5 + Math.random()*1.5)+'s';
    drop.style.animationDelay = Math.random()*2+'s';
    drop.style.height = (8 + Math.random()*5)+'px';
    rain.appendChild(drop);
  }

  setTimeout(()=> rain.remove(), 5000);
}

// Clique no botão flutuante
floatingBtn.addEventListener('click', ()=> stormEffect(floatingBtn));

// Função de mostrar/esconder botão flutuante ao rolar
function checkPosition(){
  const rect = manualBtn.getBoundingClientRect();
  const vh = window.innerHeight;
  if(rect.top < vh - 60){
    floatingBtn.classList.add('fade-hidden');
    floatingBtn.classList.remove('fade-visible');
    bottomBtn.classList.add('visible');
  } else {
    floatingBtn.classList.add('fade-visible');
    floatingBtn.classList.remove('fade-hidden');
    bottomBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', checkPosition);
window.addEventListener('resize', checkPosition);
checkPosition();

// Adiciona função para simular o download após o efeito da tempestade
function iniciarDownload() {
  const link = document.createElement('a');
  link.href = 'exemplo.txt'; // arquivo de exemplo (mesma pasta do HTML)
  link.download = 'exemplo.txt'; // nome do arquivo para salvar
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Quando o botão "Em Breve" for clicado
bottomBtn.addEventListener('click', () => {
  stormEffect(bottomBtn); // efeito de raio e chuva
  setTimeout(iniciarDownload, 1200); // inicia o download após 1.2s
});


// MODAL
manualBtn.addEventListener('click', ()=>{
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

closeModalBtn.addEventListener('click', ()=>{
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

window.addEventListener('click', e=>{
  if(e.target===modal){
    modal.style.display='none';
    document.body.style.overflow='auto';
  }
});

// Clique no botão de baixo (em breve)
bottomBtn.addEventListener('click', ()=> stormEffect(bottomBtn));
