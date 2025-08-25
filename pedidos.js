// Configuração do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  databaseURL: "SUA_DATABASE_URL",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
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
