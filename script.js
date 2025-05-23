// Seleciona os elementos do DOM usados no script
const bars = document.querySelector("#bars");
const strengthDiv = document.querySelector("#forte");
const passwordInput = document.querySelector("#senha");
const emailInput = document.querySelector("#usuario");
const form = document.querySelector(".login-form");
const tooltips = document.querySelectorAll(".tooltip");

// Mapeamento dos níveis de força da senha para classes CSS
const strengthMap = {
  1: "weak",
  2: "medium",
  3: "strong",
};

// Texto correspondente a cada nível de força da senha
const strengthTextMap = {
  1: "Fraca",
  2: "Média",
  3: "Forte",
};

// Função que verifica os critérios da senha e retorna classe e texto de força
const getStrengthClass = (password, strengthFlags) => {
  strengthFlags.upper = /[A-Z]/.test(password);  // Contém letra maiúscula?
  strengthFlags.lower = /[a-z]/.test(password);  // Contém letra minúscula?
  strengthFlags.numbers = /\d/.test(password);   // Contém número?

  let strengthLevel = 0;

  // Conta quantos critérios foram atendidos
  for (let key in strengthFlags) {
    if (strengthFlags[key]) {
      strengthLevel++;
    }
  }

  // Retorna a classe e o texto para o nível de força detectado
  return {
    className: strengthMap[strengthLevel] || "",
    label: strengthTextMap[strengthLevel] || "",
  };
};

// Função que atualiza a barra e o texto da força da senha enquanto o usuário digita
const handleChange = () => {
  const password = passwordInput.value;

  const strengthFlags = {
    upper: false,
    lower: false,
    numbers: false,
  };

  // Obtem a classe e o texto de força da senha
  const { className, label } = getStrengthClass(password, strengthFlags);

  // Reseta a barra de força
  bars.className = "";
  bars.innerHTML = "<div></div>"; // Mantém a barra interna

  if (className) {
    bars.classList.add(className);       // Aplica classe para estilo da barra
    strengthDiv.innerText = `senha ${label}`; // Atualiza o texto de força
  } else {
    strengthDiv.innerText = ""; // Limpa o texto se senha vazia
  }
};

// Escuta o evento de digitação na senha para atualizar força
passwordInput.addEventListener("input", handleChange);

// Validação ao submeter o formulário
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Previne envio padrão para fazer validação

  let isValid = true;

  // Para cada campo (email e senha)
  [emailInput, passwordInput].forEach((input) => {
    const tooltip = input.parentElement.querySelector(".tooltip");

    // Se o campo estiver vazio
    if (input.value.trim() === "") {
      input.classList.add("erro", "shake"); // Aplica borda vermelha e efeito de vibrar
      tooltip.style.display = "block";     // Mostra tooltip de erro
      isValid = false;

      // Remove a classe 'shake' após a animação para permitir repetir
      setTimeout(() => {
        input.classList.remove("shake");
      }, 500);
    } else {
      input.classList.remove("erro");      // Remove erro se preenchido
      tooltip.style.display = "none";      // Oculta tooltip
    }
  });

  // Se tudo estiver válido, envia o formulário (ou você pode integrar backend)
  if (isValid) {
    alert("Login enviado!");
    form.submit();
  }
});

// Aplica animação de entrada vindo da esquerda ao carregar a página
window.addEventListener('load', () => {
  document.querySelector('.login-card').classList.add('animate-slide-in-left');
});
