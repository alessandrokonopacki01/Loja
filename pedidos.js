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

// Função para renderizar pedidos
function renderPedidos(pedidosData) {
  const pedidosDiv = document.getElementById('pedidos');
  pedidosDiv.innerHTML = '';
  pedidosData.forEach(p => {
    const div = document.createElement('div');
    div.className = 'pedido';
    div.innerHTML = `
      <div>
        <strong>Nome:</strong> ${p.nome} <br>
        <strong>Telefone:</strong> ${p.telefone} <br>
        <strong>Whey:</strong> ${p.whey} <br>
        <strong>Líquido:</strong> ${p.liquido} <br>
        <strong>Fruta:</strong> ${p.fruta} <br>
        <strong>Total:</strong> R$${p.total.toFixed(2)}
      </div>
      <button onclick="entregarPedido('${p.id}')">Entregue</button>
    `;
    pedidosDiv.appendChild(div);
  });
}

// Ouvir mudanças no Firebase em tempo real
pedidosRef.on('value', snapshot => {
  const pedidosData = [];
  snapshot.forEach(childSnapshot => {
    const pedido = childSnapshot.val();
    pedido.id = childSnapshot.key;
    pedidosData.push(pedido);
  });
  renderPedidos(pedidosData);
});

// Remover pedido do Firebase
function entregarPedido(id) {
  pedidosRef.child(id).remove();
}