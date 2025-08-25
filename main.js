
function calcular() {
  const whey = document.getElementById('whey');
  const liquido = document.getElementById('liquido');
  const fruta = document.getElementById('fruta');

  const wheyPreco = parseFloat(whey.selectedOptions[0].dataset.preco);
  const liquidoPreco = parseFloat(liquido.selectedOptions[0].dataset.preco);
  const frutaPreco = parseFloat(fruta.selectedOptions[0].dataset.preco);

  const total = (wheyPreco + liquidoPreco + frutaPreco).toFixed(2);

  const resumoDiv = document.getElementById('resumo');
  resumoDiv.innerHTML = `
    <strong>Seu Shake:</strong><br>
    Whey: ${whey.value}<br>
    Líquido: ${liquido.value}<br>
    Fruta: ${fruta.value}<br>
    <strong>Total aproximado: R$${total}</strong>
  `;
}
