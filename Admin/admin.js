// Configuração do Firebase (mesma do cliente/pedidos)
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
const itensRef = db.ref('itens');

// Adicionar item
function adicionarItem() {
  const categoria = document.getElementById('categoria').value;
  const nome = document.getElementById('nomeItem').value.trim();
  const preco = parseFloat(document.getElementById('precoItem').value);

  if (!nome || isNaN(preco)) {
    alert("Preencha nome e preço corretamente.");
    return;
  }

  const item = { nome, preco };
  itensRef.child(categoria).push(item)
    .then(() => {
      alert("Item cadastrado com sucesso!");
      document.getElementById('nomeItem').value = '';
      document.getElementById('precoItem').value = '';
    })
    .catch(err => alert("Erro: " + err));
}

// Listar itens cadastrados
itensRef.on('value', snapshot => {
  const div = document.getElementById('itensCadastrados');
  div.innerHTML = '';
  snapshot.forEach(categoriaSnap => {
    const categoria = categoriaSnap.key;
    div.innerHTML += `<h3>${categoria}</h3>`;
    categoriaSnap.forEach(itemSnap => {
      const item = itemSnap.val();
      div.innerHTML += `<p>${item.nome} - R$${item.preco.toFixed(2)}</p>`;
    });
  });
});
