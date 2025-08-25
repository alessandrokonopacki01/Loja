// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAVTDL2V_QSbDpuaBkj3udu076SWB6slEo",
    authDomain: "loja-39682.firebaseapp.com",
    databaseURL: "https://loja-39682-default-rtdb.firebaseio.com/",
    projectId: "loja-39682",
    storageBucket: "loja-39682.firebasestorage.app",
    messagingSenderId: "670675092880",
    appId: "1:670675092880:web:d3842a07053073b9bc1f15",
    measurementId: "G-JSR2LNV3TL"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const pedidosRef = db.ref('pedidos');
const itensRef = db.ref('itens'); // referência para os itens

// Função para carregar itens do Firebase
function carregarItens() {
  itensRef.on('value', snapshot => {
    const wheySelect = document.getElementById('whey');
    const liquidoSelect = document.getElementById('liquido');
    const frutaSelect = document.getElementById('fruta');

    // Limpa selects
    wheySelect.innerHTML = '';
    liquidoSelect.innerHTML = '';
    frutaSelect.innerHTML = '';

    snapshot.forEach(categoriaSnap => {
      const categoria = categoriaSnap.key;
      categoriaSnap.forEach(itemSnap => {
        const item = itemSnap.val();
        const option = document.createElement('option');
        option.value = item.nome;
        option.textContent = `${item.nome} (R$${item.preco.toFixed(2)})`;
        option.dataset.preco = item.preco;

        if (categoria === 'whey') wheySelect.appendChild(option);
        if (categoria === 'liquido') liquidoSelect.appendChild(option);
        if (categoria === 'fruta') frutaSelect.appendChild(option);
      });
    });
  });
}

// Chama ao carregar a página
window.onload = carregarItens;

// Função para finalizar pedido (seu código original)
function finalizarPedido() {
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const whey = document.getElementById('whey');
  const liquido = document.getElementById('liquido');
  const fruta = document.getElementById('fruta');

  if (!nome || !telefone) {
    alert("Por favor, preencha nome e telefone.");
    return;
  }

  const wheyPreco = parseFloat(whey.selectedOptions[0].dataset.preco);
  const liquidoPreco = parseFloat(liquido.selectedOptions[0].dataset.preco);
  const frutaPreco = parseFloat(fruta.selectedOptions[0].dataset.preco);

  const total = (wheyPreco + liquidoPreco + frutaPreco).toFixed(2);

  const pedido = {
    nome: nome,
    telefone: telefone,
    whey: whey.value,
    liquido: liquido.value,
    fruta: fruta.value,
    total: parseFloat(total),
    timestamp: Date.now()
  };

  pedidosRef.push(pedido)
    .then(() => {
      const resumoDiv = document.getElementById('resumo');
      resumoDiv.className = "resumo pedido-concluido"; // aplica a classe com animação
      resumoDiv.innerHTML = `
        Pedido concluído!<br>
        Nome: ${pedido.nome}<br>
        Telefone: ${pedido.telefone}<br>
        Whey: ${pedido.whey} <br>
        Líquido: ${pedido.liquido} <br>
        Fruta: ${pedido.fruta} <br>
        Total: R$${pedido.total.toFixed(2)}
      `;
      // Limpa campos do formulário após 2 segundos
      setTimeout(() => {
        resumoDiv.className = "resumo";
        resumoDiv.innerHTML = "Seu resumo aparecerá aqui.";
        document.getElementById('nome').value = '';
        document.getElementById('telefone').value = '';
      }, 2000);
    })
    .catch(err => {
      alert("Erro ao enviar pedido: " + err);
    });
}
