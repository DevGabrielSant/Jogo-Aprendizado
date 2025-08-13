class Jogo {
  constructor(urlJson, ids) {
    this.urlJson = urlJson;
    this.total = 0;
    this.pontuacao = 0;
    this.acertos = 0;
    this.tempo = 0;
    this.timerInterval = null;

    // Sons
    this.somAcerto = new Audio('assets/songs/happy-message-ping-351298.mp3');
    this.somErro = new Audio('assets/songs/error-126627.mp3');

    // Elementos do front
    this.container1 = document.getElementById(ids.container1);
    this.container2 = document.getElementById(ids.container2);
    this.tempoDisplay = document.getElementById(ids.tempo);
    this.placarDisplay = document.getElementById(ids.placar);
    this.toggleContraste = document.getElementById(ids.toggleContraste);

    this.arrastando = null;

    this.inicializar();
  }

  async inicializar() {
    try {
      const response = await fetch(this.urlJson);
      if (!response.ok) throw new Error("Erro ao carregar JSON");
      this.dados = await response.json();
      this.total = this.dados.etapas.length;

      this.carregarCampos();
      this.carregarRespostas();
      this.inicializarEventos();
      this.configurarAltoContraste();
    } catch (error) {
      console.error("Falha ao inicializar o jogo:", error);
    }
  }

  carregarCampos() {
    this.dados.etapas.forEach((etapa, i) => {
      const div = document.createElement('div');
      div.className = 'campo';
      div.draggable = true;
      div.dataset.id = i;
      div.textContent = etapa.descricao;
      this.container1.appendChild(div);
    });
  }

  carregarRespostas() {
    this.dados.etapas.forEach((etapa, i) => {
      const bloco = document.createElement('div');
      bloco.className = 'valores';

      const dropArea = document.createElement('div');
      dropArea.className = 'respostas';
      dropArea.dataset.id = i;

      const nome = document.createElement('div');
      nome.textContent = etapa.nome;

      bloco.appendChild(dropArea);
      bloco.appendChild(nome);
      this.container2.appendChild(bloco);
    });
  }

  inicializarEventos() {
    const campos = this.container1.querySelectorAll('.campo');
    campos.forEach(campo => {
      campo.addEventListener('dragstart', () => {
        this.arrastando = campo;
        campo.classList.add('arrastando');
        this.iniciarTimer();
      });
      campo.addEventListener('dragend', () => {
        this.arrastando = null;
        campo.classList.remove('arrastando');
      });
    });

    const respostas = this.container2.querySelectorAll('.respostas');
    respostas.forEach(area => {
      area.addEventListener('dragover', e => e.preventDefault());
      area.addEventListener('drop', () => this.tratarDrop(area));
    });
  }

  configurarAltoContraste() {
    if (this.toggleContraste) {
      this.toggleContraste.addEventListener('change', () => {
        document.body.classList.toggle('high-contrast', this.toggleContraste.checked);
      });
    }
  }

  iniciarTimer() {
    if (!this.timerInterval) {
      this.timerInterval = setInterval(() => {
        this.tempo++;
        this.tempoDisplay.textContent = `⏱️${this.tempo}`;
      }, 1000);
    }
  }

  pararTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  tratarDrop(area) {
    if (!this.arrastando) return;

    if (this.arrastando.dataset.id === area.dataset.id) {
      area.appendChild(this.arrastando);
      this.arrastando.draggable = false;
      area.parentElement.style.background = 'lightgreen';
      area.style.background = 'none';
      area.style.border = 'none';

      this.somAcerto.currentTime = 0;
      this.somAcerto.play();

      this.pontuacao++;
      this.acertos++;
      this.atualizarPlacar();

      if (this.acertos === this.total) this.finalizarJogo();
    } else {
      const nomeEvento = area.nextElementSibling.textContent;
      area.style.background = 'lightcoral';
      this.somErro.currentTime = 0;
      this.somErro.play();
      setTimeout(() => (area.style.background = ''), 500);

      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: `Essa descrição não corresponde ao evento de ${nomeEvento}, vamos tentar novamente?`,
        confirmButtonText: 'Tentar novamente',
        confirmButtonColor: '#d33',
      });
    }
  }

  atualizarPlacar() {
    this.placarDisplay.textContent = `💰${this.pontuacao}`;
  }

  finalizarJogo() {
    this.pararTimer();
    Swal.fire({
      icon: 'success',
      title: 'Acertou!',
      html: `Parabéns! Você escolheu corretamente!<br><br>Pontuação final: ${this.pontuacao}/${this.total}<br>Tempo: ${this.tempo}s`,
      confirmButtonText: 'Voltar à página principal',
      confirmButtonColor: '#28a745',
      didOpen: () => confetti({ particleCount: 1500, spread: 700, origin: { y: .5 } }),
    }).then(result => {
      if (result.isConfirmed) window.location.href = 'index.html';
    });
  }
}

// Inicialização após o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  new Jogo('jogo.json', {
    container1: 'container1',
    container2: 'container2',
    tempo: 'tempo',
    placar: 'placar',
    toggleContraste: 'toggle-contraste'
  });
});
