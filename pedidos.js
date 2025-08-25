// Exemplo de pedidos simulados
let pedidos = [
    { id: 1, whey: "Baunilha", liquido: "Leite", fruta: "Banana", total: 8.5 },
    { id: 2, whey: "Chocolate", liquido: "Água", fruta: "Morango", total: 7.5 },
];

// Função para renderizar pedidos
function renderPedidos() {
    const pedidosDiv = document.getElementById('pedidos');
    pedidosDiv.innerHTML = '';
    pedidos.forEach(p => {
        const div = document.createElement('div');
        div.className = 'pedido';
        div.innerHTML = `
      <div>
        <strong>Whey:</strong> ${p.whey} <br>
        <strong>Líquido:</strong> ${p.liquido} <br>
        <strong>Fruta:</strong> ${p.fruta} <br>
        <strong>Total:</strong> R$${p.total.toFixed(2)}
      </div>
      <button onclick="removerPedido(${p.id})">Entregue</button>
    `;
        pedidosDiv.appendChild(div);
    });
}

function removerPedido(id) {
    pedidos = pedidos.filter(p => p.id !== id);
    renderPedidos();
}

// Render inicial
renderPedidos();
