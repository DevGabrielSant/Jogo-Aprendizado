Jogo de Arrastar e Soltar - Eventos e Descrições
📝 Descrição
Este é um jogo educativo de arrastar e soltar que permite ao usuário associar descrições a eventos correspondentes. Ele é projetado para ser escalável e pode ser utilizado para diferentes capítulos e disciplinas simplesmente alterando o arquivo JSON de entrada.

O jogo conta com:

-Arrastar e soltar (drag & drop) para vincular descrições a nomes corretos.

-Pontuação em tempo real.

-Temporizador para medir o tempo de conclusão.

-Sons para acerto e erro.

-Popups interativos com feedback usando SweetAlert2.

-Confetes de comemoração ao concluir corretamente todas as etapas.

-Modo Alto Contraste para acessibilidade.



📂 Estrutura de Arquivos

projeto-jogo/
│
├─ index.html             Estrutura principal da página
├─ style.css              Estilo e layout do jogo
├─ script.js              Lógica do jogo (drag & drop, timer, pontuação)
├─ jogo.json              Dados do jogo (eventos e descrições)
└─ assets/
   └─ songs/
      ├─ happy-message-ping-351298.mp3   Som de acerto
      └─ error-126627.mp3               Som de erro

      
⚙️ Como o jogo funciona

1. Carregamento de Dados
   
O jogo lê um arquivo JSON externo (jogo.json) que contém todas as etapas do capítulo: nomes e descrições.

Exemplo de JSON:

{
  "titulo": "Capítulo 3 - O Ciclo da Água",
  "etapas": [
    { "nome": "Evaporação", "descricao": "A água aquece e se transforma em vapor." },
    { "nome": "Condensação", "descricao": "O vapor se transforma em nuvens." },
    { "nome": "Precipitação", "descricao": "A água retorna como chuva ou neve." }
  ]
}

também é possível incluir mais linhas no JSON para que o projeto seja escalavel. Segue exemplo abaixo:
{
"titulo": "Capítulo 3 - O Ciclo da Água",
"etapas": [
{"nome": "Evaporação",
"descricao": "A água presente na superfície dos rios, lagos e oceanos se aquece com a luz do sol e se transforma em vapor, subindo para a atmosfera."},
{"nome": "Condensação",
"descricao": "O vapor de água sobe e, ao encontrar camadas frias da atmosfera, se resfria, formando as nuvens."},
{"nome": "Precipitação",
"descricao": "Quando as nuvens estão carregadas de vapor, a água retorna à superfície da Terra em forma de chuva, neve ou granizo."},{"nome": "Infiltração",
"descricao": "Parte da água da precipitação penetra no solo, abastecendo os lençóis freáticos e alimentando nascentes e aquíferos."},{"nome": "Solidificação",
"descricao": "É a mudança física do estado líquido para o estado sólido."}
]
}


2. Criação dos Elementos do Jogo
   
Container 1: recebe as descrições que podem ser arrastadas.

Container 2: recebe os nomes dos eventos e suas respectivas áreas de drop.


4. Drag & Drop
O jogador arrasta a descrição até o nome correto.

Se estiver correto:

-A descrição é fixada.

-O bloco muda de cor para verde.

-Toca som de acerto.

-Atualiza a pontuação.


Se estiver errado:

-O bloco fica vermelho temporariamente.

-Toca som de erro.

-Exibe um popup informando o nome correto.


4. Timer e Placar

O temporizador inicia no primeiro movimento e conta os segundos.

O placar atualiza a cada acerto, exibindo a pontuação em tempo real.

5. Feedback e Finalização
   
Ao finalizar todas as etapas corretamente:

-Aparece um popup de sucesso com pontuação e tempo.

-Disparam confetes para comemorar.

6. Alto Contraste
   
-Um checkbox permite ativar o modo alto contraste, alterando as cores da interface para melhor visibilidade.

🛠️ Tecnologias Utilizadas
HTML5: Estrutura da página.

CSS3: Estilo, layout e modos de contraste.

JavaScript (ES6): Lógica do jogo, drag & drop, timer, pontuação.

SweetAlert2: Popups bonitos para acerto e erro.

Confetti.js: Efeito de comemoração.

JSON: Arquivo externo de dados para fácil escalabilidade.



Como Executar:

Clone o repositório:

git clone https://github.com/seu-usuario/projeto-jogo.git

-Abra index.html no navegador.

-Clique no botão Iniciar Jogo.

-Arraste as descrições para os nomes corretos e divirta-se!


Como Escalar para outros capítulos:

-Crie um novo arquivo JSON com o mesmo formato (capituloX.json).

-Atualize o urlJson no script.js para apontar para o novo arquivo.

-O mesmo código funciona para qualquer disciplina ou capítulo, sem alterações adicionais.


Possíveis Melhorias Futuras

-Criar níveis ou capítulos sequenciais.

-Salvar pontuação em localStorage ou banco de dados.

-Incluir temporizador regressivo com limite de tempo.


📸 Screenshot
<img width="533" height="940" alt="image" src="https://github.com/user-attachments/assets/6ff2249f-01df-4001-8204-30b8cbf3d48e" />

