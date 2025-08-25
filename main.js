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

function finalizarPedido() {
    const whey = document.getElementById('whey');
    const liquido = document.getElementById('liquido');
    const fruta = document.getElementById('fruta');

    const wheyPreco = parseFloat(whey.selectedOptions[0].dataset.preco);
    const liquidoPreco = parseFloat(liquido.selectedOptions[0].dataset.preco);
    const frutaPreco = parseFloat(fruta.selectedOptions[0].dataset.preco);

    const total = (wheyPreco + liquidoPreco + frutaPreco).toFixed(2);

    // Monta objeto do pedido
    const pedido = {
        whey: whey.value,
        liquido: liquido.value,
        fruta: fruta.value,
        total: parseFloat(total),
        timestamp: Date.now()
    };

    // Envia para o Firebase
    pedidosRef.push(pedido)
        .then(() => {
            document.getElementById('resumo').innerHTML = `
        Pedido enviado com sucesso!<br>
        Whey: ${pedido.whey} <br>
        Líquido: ${pedido.liquido} <br>
        Fruta: ${pedido.fruta} <br>
        Total: R$${pedido.total.toFixed(2)}
      `;
        })
        .catch(err => {
            alert("Erro ao enviar pedido: " + err);
        });
}
