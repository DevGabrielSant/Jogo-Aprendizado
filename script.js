let arrastando = null;
let pontuacao = 0;
let acertos = 0;
let total = 0;
let tempo = 0;
let timerInterval = null;

// Sons
const somAcerto = new Audio('assets/songs/happy-message-ping-351298.mp3');
const somErro = new Audio('assets/songs/error-126627.mp3');

// Elementos
const tempoDisplay = document.getElementById('tempo');
const placarDisplay = document.getElementById('placar');
const toggleContraste = document.getElementById('toggle-contraste');

// Alto contraste
if (toggleContraste) {
  toggleContraste.addEventListener('change', () => {
    document.body.classList.toggle('high-contrast', toggleContraste.checked);
  });
}


// Temporizador
function iniciarTimer() {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      tempo++;
      tempoDisplay.textContent = `⏱️${tempo}`;
    }, 1000);
  }
}

function pararTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Carrega o JSON externo
fetch('jogo.json')
  .then(r => r.json())
  .then(dados => {
    total = dados.etapas.length;

    // Adiciona as descrições como itens arrastáveis
    const container1 = document.getElementById('container1');
    dados.etapas.forEach((etapa, i) => {
      const div = document.createElement('div');
      div.className = 'campo';
      div.draggable = true;
      div.dataset.id = i;
      div.textContent = etapa.descricao;
      container1.appendChild(div);
    });

    // Cria as áreas de respostas com nomes
    const container2 = document.getElementById('container2');
    dados.etapas.forEach((etapa, i) => {
      const bloco = document.createElement('div');
      bloco.className = 'valores';

      const dropArea = document.createElement('div');
      dropArea.className = 'respostas';
      dropArea.dataset.id = i;

      const nome = document.createElement('div');
      nome.textContent = etapa.nome;

      bloco.appendChild(dropArea);
      bloco.appendChild(nome);
      container2.appendChild(bloco);
    });

    inicializarEventos();
  });

function inicializarEventos() {
  const campos = document.querySelectorAll('.campo');
  campos.forEach(campo => {
    campo.addEventListener('dragstart', () => {
      arrastando = campo;
      campo.classList.add('arrastando');
    });
    campo.addEventListener('dragend', () => {
      arrastando = null;
      campo.classList.remove('arrastando');
    });
  });

  const respostas = document.querySelectorAll('.respostas');
  respostas.forEach(area => {
    area.addEventListener('dragover', e => e.preventDefault());

    area.addEventListener('drop', () => {
      iniciarTimer();

      if (arrastando && arrastando.dataset.id === area.dataset.id) {
        area.appendChild(arrastando);
        arrastando.draggable = false;
        area.parentElement.style.background = 'lightgreen';
        area.style.background = 'none';
        area.style.border = 'none';

        somAcerto.currentTime = 0;
        somAcerto.play();

        pontuacao++;
        acertos++;
        atualizarPlacar();

        if (acertos === total) {
          pararTimer();
          Swal.fire({
            icon: 'success',
            title: 'Acertou!',
            html: `Parabéns! Você escolheu corretamente!<br><br>Pontuação final: ${pontuacao}/${total}<br>Tempo: ${tempo}s`,
            confirmButtonText: 'Voltar à página principal',
            confirmButtonColor: '#28a745',
             didOpen: () => {
            confetti({
            particleCount: 1500,
             spread: 700,
             origin: { y: .5}
             });}
            
          }).then((result) => {
            if (result.isConfirmed) {
              // Redireciona para a página inicial (ajuste a URL conforme seu projeto)
              window.location.href = 'index.html';
            }
          });
        }
      } else {
        const nomeEvento = area.nextElementSibling.textContent;
        area.style.background = 'lightcoral';
        somErro.currentTime = 0;
        somErro.play();
        setTimeout(() => (area.style.background = ''), 500);

        Swal.fire({
          icon: 'error',
          title: 'Ops...',
          text: `Essa descrição não corresponde ao evento de ${nomeEvento}, vamos tentar novamente?`,
          confirmButtonText: 'Tentar novamente',
          confirmButtonColor: '#d33',
         
        });
      }
    });
  });
}

function atualizarPlacar() {
  placarDisplay.textContent = `💰${pontuacao}`;
}
