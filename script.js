import { perguntas } from "./perguntas.js";

const btnIniciar = document.querySelector(".btn-init");
const msg = document.querySelector(".msg");
const quizContent = document.querySelector(".quiz-content");
const quizTitle = document.querySelector(".quiz-title h3");
const quizBody = document.querySelector(".quiz-body");

const respostas = [];
let i = 0;

const button = {
  add() {
    btnIniciar.addEventListener("click", renderizar);
  },
  remove() {
    btnIniciar.removeEventListener("click", renderizar);
  },
  restart() {
    btnIniciar.addEventListener("click", () => window.location.reload());
  },
};

const renderizar = () => {
  if (i > perguntas.length - 1) {
    btnIniciar.classList.remove("disabled");
    button.restart();
    resultadoDoQuiz();
  } else {
    msg.style.display = "none";
    quizContent.style.display = "grid";
    quizTitle.innerText = perguntas[i].pgt;
    quizTitle.dataset.key = perguntas[i].id;

    perguntas[i].alternativas.forEach((item) => {
      const btn = `<button class="response">${item}</button>`;
      quizBody.innerHTML += btn;
    });

    button.remove();
    btnIniciar.classList.add("disabled");

    proximaPgt();
  }
};

const btnHandleClick = (e) => {
  const idPgt = e.target.parentElement.parentElement.querySelector("h3").dataset.key;
  const btnResposta = e.target.innerText;
  respostas.push({ idPgt: idPgt, selecionada: btnResposta });
  i++;
  quizBody.innerHTML = "";
  renderizar();
};

const proximaPgt = () => {
  const quizBtn = document.querySelectorAll(".quiz-body button");
  quizBtn.forEach((btn) => btn.addEventListener("click", btnHandleClick));
};

const contarPontos = () => {
  return respostas.filter(
    (res, index) => res.selecionada === perguntas[index].resposta,
  );
};

const respostasErrada = () => {
  const pgtErrada = [];
  const erradas = respostas.filter(
    (res, index) => res.selecionada != perguntas[index].resposta,
  );
  erradas.forEach((item) =>
    pgtErrada.push({
      pgt: perguntas[item.idPgt].pgt,
      resposta: perguntas[item.idPgt].resposta,
    }),
  );
  return pgtErrada;
};

const resultadoDoQuiz = () => {
  quizTitle.innerText = `Perguntas corretas: ${contarPontos().length}`;
  if (respostasErrada().length === 0) {
    quizBody.innerHTML += `
    <div class="text">
      <h1>Parabéns, todas respostas corretas</h1>
    </div>
    `;
  } else {
    respostasErrada().forEach((res) => {
      quizBody.innerHTML += `
    <div class="text">
      <p>Pgt que você errou: <br> ${res.pgt}</p>
      <p>Resposta: ${res.resposta}</p>
    </div>
    `;
    });
  }
};

button.add();
