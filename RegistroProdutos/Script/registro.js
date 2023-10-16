var produtos = [];
// Funcao para validar os campos do formulario antes de cadastrar
function ValidarCampos() {
    var nomeProduto = document.getElementById("nomeProduto").value;
    var valorProduto = document.getElementById("valorProduto").value;
    var qtdProduto = document.getElementById("qtdProduto").value;
    var descricaoProduto = document.getElementById("descricaoProduto").value;
    var disponibilidade = document.querySelector("input[name='disponibilidade']:checked");
    if (nomeProduto === '') {
        alert("Por favor, preencha o campo Nome do Produto.");
        return false;
    }
    if(qtdProduto == 0){
        alert("Por favorm, insira um valor valido para o Produto")
        return false;
    }
    if (isNaN(parseFloat(valorProduto)) || valorProduto <= 0) {
        alert("Por favor, insira um valor valido para o Produto.");
        return false;
    }
    if (descricaoProduto === '') {
        alert("Por favor, preencha o campo Descricao do Produto.");
        return false;
    }
    if (!disponibilidade) {
        alert("Por favor, selecione a disponibilidade do Produto.");
        return false;
    }
    return true;
}
function produtoComMesmoNomeExisteNoLocalStorage(nome) {
    var produtosCadastrados = JSON.parse(localStorage.getItem("produtos")) || [];
    for (var i = 0; i < produtosCadastrados.length; i++) {
        if (produtosCadastrados[i].nome === nome) {
            return true;
        }
    }
    return false;
}
function Cadastrar(){
    if (ValidarCampos()){
        var nomeProduto = document.getElementById("nomeProduto").value;        
        if (produtoComMesmoNomeExisteNoLocalStorage(nomeProduto)) {
            alert("Ja existe um produto com o mesmo nome. Por favor, escolha um nome diferente.");
        } else {
            var valorProduto = parseFloat(document.getElementById("valorProduto").value);
            var qtdProduto = parseInt(document.getElementById("qtdProduto").value);
            var descricaoProduto = document.getElementById("descricaoProduto").value;
            var disponibilidade = document.querySelector("input[name='disponibilidade']:checked").value;
            var produtosCadastrados = JSON.parse(localStorage.getItem("produtos")) || [];

            produtosCadastrados.push({
                nome: nomeProduto,
                valor: valorProduto,
                descricao: descricaoProduto,
                disponibilidade: disponibilidade,
                qtdProduto: qtdProduto
            });
            localStorage.setItem("produtos", JSON.stringify(produtosCadastrados));
            // Redirecionando para a pagina de listagem
            window.location.href = "lista.html";
        }
    }
}