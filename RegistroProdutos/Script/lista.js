function habilitarEdicaoSalvar(index) {
    var nomeInput = document.getElementById("input-nome");
    var valorInput = document.getElementById("input-valor");
    var quantInput = document.getElementById("input-quant");
    var textDescricao = document.getElementById("areatxtDescicao");
    var selectDispo = document.getElementById("select-dispo");
    nomeInput.disabled = false;
    valorInput.disabled = false;
    quantInput.disabled = false;
    textDescricao.disabled = false;
    selectDispo.disabled = false;
    var salvarBotao = document.getElementById("btn-salvar");
    if (!salvarBotao) {
      // Criando um botao se nao existir
      salvarBotao = document.createElement("button");
      salvarBotao.textContent = "Salvar";
      salvarBotao.id = "btn-salvar";
      salvarBotao.classList.add("btn-salvar");
      salvarBotao.addEventListener("click", function() {
        var produtosCadastrados = JSON.parse(localStorage.getItem("produtos")) || [];
        // Atualizando os campos do produto com os novos valores
        produtosCadastrados[index].nome = nomeInput.value;
        produtosCadastrados[index].valor = parseFloat(valorInput.value);
        produtosCadastrados[index].qtdProduto = parseInt(quantInput.value);
        produtosCadastrados[index].descricao = textDescricao.value;
        produtosCadastrados[index].disponibilidade = selectDispo.value;
        // Salvando as alteracoes no localStorage
        localStorage.setItem("produtos", JSON.stringify(produtosCadastrados));
        nomeInput.disabled = true;
        valorInput.disabled = true;
        quantInput.disabled = true;
        textDescricao.disabled = true;
        selectDispo.disabled = true;
        salvarBotao.remove();
      });
      var EditRemove = document.querySelector(".div-EditRemove");
      EditRemove.appendChild(salvarBotao);
    }
  }
  //REMOVER ITENS DA LISTA
  function removeItem(index){
      var produtosCadastrados = JSON.parse(localStorage.getItem("produtos")) || [];  
        produtosCadastrados.splice(index, 1);
        localStorage.setItem("produtos", JSON.stringify(produtosCadastrados));
        carregarProdutos();
        window.location.href = "listagemP.html";
  }
  //MOSTRANDO OS PRODUTOS QUE FORAM CADASTRADOS NA OUTRA PAGINA
  function carregarProdutos() {
      var listaProdutos = document.getElementById("listaProdutos");
      listaProdutos.innerHTML = "";
      var produtosCadastrados = JSON.parse(localStorage.getItem("produtos")) || [];
      for (var i = 0; i < produtosCadastrados.length; i++) {
        var produto = produtosCadastrados[i];
        var disponibilidadeSpan = document.createElement("span");
        var itemProduto = document.createElement("div");
        itemProduto.classList.add("produto");
        (function (produto, index) {
          itemProduto.addEventListener("click", function () {
            exibirDetalhesProduto(produto, index);
          });
        })(produto, i);
        disponibilidadeSpan.textContent = produto.disponibilidade;
        if (produto.disponibilidade === "disponivel") {
          disponibilidadeSpan.classList.add("disponivel");
        } else if (produto.disponibilidade === "indisponivel") {
          disponibilidadeSpan.classList.add("indisponivel");
        }
        var listProd = document.createElement("li");
        listProd.classList.add("info-prod");
        listProd.textContent = "Nome: " + produto.nome + " | Disponibilidade: ";
        itemProduto.appendChild(listProd);
        listaProdutos.appendChild(itemProduto);
        listProd.appendChild(disponibilidadeSpan);
        // itemProduto.appendChild(criarBotaoRemover(i));
      }
  }
  //MOSTRAR OS DETALHES DOS PRODUTOS
  function exibirDetalhesProduto(produto, index) {
      var painelInfoProd = document.getElementById("painel-Infoprod");
      var listaProdutos = document.getElementById("listaProdutos");
      var containerQuantDispo = document.createElement("div");
      var divQuant = document.createElement("div");
      var divDispo = document.createElement("div");
      divQuant.classList.add("div-Quant");
      divDispo.classList.add("div-Dispo");
      containerQuantDispo.classList.add("contianer-QuantDispo");
      var disponibilidadeSpan = document.createElement("span");
      //Criando uma div para o botao remover e o editar
      var EditRemove = document.createElement("div");
      EditRemove.classList.add("div-EditRemove");
      //Deixando a div das informacoes visivel
      painelInfoProd.style.display = "inline";
      //Deixando a lista de produtos invisivel
      listaProdutos.style.display = "none";
      var listProd = document.createElement("li");
      listProd.classList.add("info-prodPainel");
      //Modificando a cor da disponibilidade
      disponibilidadeSpan.textContent = produto.disponibilidade;
      if (produto.disponibilidade === "disponivel") {
        disponibilidadeSpan.classList.add("disponivel");
      } else if (produto.disponibilidade === "indisponivel") {
        disponibilidadeSpan.classList.add("indisponivel");
      }
      //Criando INPUT nome
      var nomeProduto = document.createElement("p");
      var nomeInput = document.createElement("input");
      nomeInput.id = "input-nome";
      nomeProduto.textContent = "Nome: ";
      nomeInput.type = "text";
      nomeInput.value = ""+produto.nome;
      nomeInput.disabled = true;
      //Criando INPUT valor
      var valorProduto = document.createElement("p");
      var valorInput = document.createElement("input")
      valorInput.id = "input-valor";
      valorProduto.textContent = "Valor: ";
      valorInput.type = "number"
      valorInput.value = +produto.valor;
      valorInput.disabled = true;
      //Criando INPUT quantidade
      var quantInput = document.createElement("input");
      var quantProduto = document.createElement("p");
      quantInput.id = "input-quant";
      quantProduto.textContent = "Quantidade: ";
      quantInput.type = "number";
      quantInput.value = +produto.qtdProduto;
      quantInput.disabled = true;
      //Criando o SELECT para disponibilidade
      var dispoProduto = document.createElement("p");
      dispoProduto.textContent = "Disponibilidade: ";
      var selectDispo = document.createElement("select");
      selectDispo.id = "select-dispo";
      // Criando as opcoes
      var optionDisponivel = document.createElement("option");
      optionDisponivel.value = "disponivel";
      optionDisponivel.text = "Disponível";
      var optionIndisponivel = document.createElement("option");
      optionIndisponivel.value = "indisponivel";
      optionIndisponivel.text = "Indisponível";
      selectDispo.value = ""+produto.disponibilidade;
      selectDispo.appendChild(optionDisponivel);
      selectDispo.appendChild(optionIndisponivel);
      selectDispo.disabled = true;
      //Adicionando o input qunt e o select na mesma div
      divQuant.appendChild(quantProduto);
      divQuant.appendChild(quantInput);
  
      divDispo.appendChild(dispoProduto);
      divDispo.appendChild(selectDispo);
      
      containerQuantDispo.appendChild(divQuant);
      containerQuantDispo.appendChild(divDispo);
  
      // Definindo a opção padrao com base na disponibilidade do produto
    var disponibilidade = produto.disponibilidade;
    for (var i = 0; i < selectDispo.options.length; i++) {
      if (selectDispo.options[i].value === disponibilidade) {
        selectDispo.selectedIndex = i;
        break;
      }
    }
      //Criando TEXTAREA descricao
      var descricaoProduto = document.createElement("p");
      descricaoProduto.textContent = "Descrição: ";
      var textDescricao = document.createElement("textarea");
      textDescricao.id = "areatxtDescicao";
      textDescricao.disabled = true;
      textDescricao.value = "" + produto.descricao;
      //Criando BOTAO para remover
      var botaoRemover = document.createElement("button");
      botaoRemover.classList.add("btn-delete");
      botaoRemover.textContent = "Remover";
      botaoRemover.addEventListener("click", function() {
          removeItem(index);
      });
      //Criando o botao para editar
      var botaoEditar = document.createElement("button");
      botaoEditar.classList.add("btn-editar");
      botaoEditar.textContent = "Editar";
      botaoEditar.addEventListener("click", function(){
        habilitarEdicaoSalvar(index);
      })
      listProd.appendChild(nomeProduto);
      listProd.appendChild(nomeInput);
  
      listProd.appendChild(valorProduto);
      listProd.appendChild(valorInput);
  
      listProd.appendChild(containerQuantDispo);
  
      listProd.appendChild(descricaoProduto);
      listProd.appendChild(textDescricao);
  
      EditRemove.appendChild(botaoRemover);
      EditRemove.appendChild(botaoEditar);
      listProd.appendChild(EditRemove);
      painelInfoProd.appendChild(listProd);
  }
    //ORDENANDO OS PRODUTOS PELOS VALORES DO MENOR PARA O MAIOR
  function ordenar(){
      var produtosCadastrados = JSON.parse(localStorage.getItem("produtos")) || [];
      produtosCadastrados.sort(function(a, b) {
          return a.valor - b.valor;
      });
      localStorage.setItem("produtos", JSON.stringify(produtosCadastrados));
      carregarProdutos();
  }
  function voltar(){
      window.location.href = "lista.html";
  }