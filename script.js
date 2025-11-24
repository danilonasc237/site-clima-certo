// Seletores principais
const floatingBtn = document.getElementById('floatingBtn');
const bottomBtn = document.getElementById('bottomBtn');
const manualBtn = document.getElementById('manualBtn');
const modal = document.getElementById('manualModal');
const closeModalBtn = document.getElementById('closeModal');

// Função de efeito de tempestade (raio/flash/chuva)
function stormEffect(button) {
  const shape = button.querySelector('.cloud-shape');
  if (!shape) return;

  // Raio
  const ln = document.createElement('div');
  ln.className = 'lightning';
  shape.appendChild(ln);
  ln.addEventListener('animationend', () => ln.remove(), { once: true });

  // Flash
  const flash = document.createElement('div');
  flash.className = 'flash';
  document.body.appendChild(flash);
  flash.addEventListener('animationend', () => flash.remove(), { once: true });

  // Chuva
  const rain = document.createElement('div');
  rain.className = 'rain';
  document.body.appendChild(rain);
  const drops = 120;
  for (let i = 0; i < drops; i++) {
    const drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = (0.6 + Math.random() * 1.4) + 's';
    drop.style.animationDelay = Math.random() * 1.5 + 's';
    drop.style.height = (8 + Math.random() * 6) + 'px';
    rain.appendChild(drop);
  }
  setTimeout(() => { if (rain.parentNode) rain.remove(); }, 4000);
}

// Simula download do APK (mesmo arquivo para ambos os botões)
function iniciarDownload() {
  const conteudo = "Simulação de download do aplicativo Clima Certo.\n\nArquivo demonstrativo gerado automaticamente.";
  const blob = new Blob([conteudo], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ClimaCerto.apk";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Mostrar/ocultar botão flutuante vs bottom cloud button conforme rolagem/posição do manual
function checkPosition(){
  const rect = manualBtn.getBoundingClientRect();
  const vh = window.innerHeight;
  if (rect.top < vh - 60) {
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

// Cliques — ambos botões disparam o mesmo efeito e download
floatingBtn.addEventListener('click', () => { stormEffect(floatingBtn); iniciarDownload(); });
bottomBtn.addEventListener('click', () => { stormEffect(bottomBtn); iniciarDownload(); });

// Modal abrir/fechar
manualBtn.addEventListener('click', () => {
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
});
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});
