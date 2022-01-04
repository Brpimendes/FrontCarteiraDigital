const urlBase = "http://localhost:3000/";

window.addEventListener("load", function () {
  const transfSaldo = document.querySelector("#transf");
  transfSaldo.addEventListener("click", () => cardTransfSaldo());

  const adicionarSaldo = document.querySelector("#adicionar");
  adicionarSaldo.addEventListener("click", () => cardAdicionarSaldo());

  const fazerCompras = document.querySelector("#compras");
  fazerCompras.addEventListener("click", () => cardFazerCompras());

  const verHistorico = document.querySelector("#historico");
  verHistorico.addEventListener("click", () => cardVerHistorico());

  const cadUsu = document.querySelector("button#cadastrar");
  cadUsu.addEventListener("click", () => cadastrarUsuarios());

  const alterarUsu = document.querySelector("button#alterar");
  alterarUsu.addEventListener("click", () => alterarUsuarios());

  const desativarUsu = document.querySelector("button#desativar");
  desativarUsu.addEventListener("click", () => desativarUsuarios());
});

// Função responsável por montar o card de Transferência de saldo entre carteiras
function cardTransfSaldo() {
  const option = document.querySelector(".option");
  option.innerHTML = "";

  let section = document.createElement("section");
  section.classList.add("transf");

  let formOption = document.createElement("form");

  let title = document.createElement("h1");
  title.append(document.createTextNode("Transferência entre Contas"));

  let labelEnvio = document.createElement("label");

  let spanEnvio = document.createElement("span");
  spanEnvio.appendChild(document.createTextNode("Conta de Envio:"));

  let inputEnvio = document.createElement("input");
  inputEnvio.setAttribute("type", "text");
  inputEnvio.setAttribute("name", "contaEnvio");

  let labelDestino = document.createElement("label");

  let spanDestino = document.createElement("span");
  spanDestino.appendChild(document.createTextNode("Conta de Destino:"));

  let inputDestino = document.createElement("input");
  inputDestino.setAttribute("type", "text");
  inputDestino.setAttribute("name", "contaDestino");

  let labelValor = document.createElement("label");

  let spanValor = document.createElement("span");
  spanValor.appendChild(document.createTextNode("Valor:"));

  let inputValor = document.createElement("input");
  inputValor.setAttribute("type", "number");
  inputValor.setAttribute("name", "valor");

  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.appendChild(document.createTextNode("Transferir Dinheiro"));

  labelEnvio.appendChild(spanEnvio);
  labelEnvio.appendChild(inputEnvio);
  labelDestino.appendChild(spanDestino);
  labelDestino.appendChild(inputDestino);
  labelValor.appendChild(spanValor);
  labelValor.appendChild(inputValor);

  formOption.appendChild(title);
  formOption.appendChild(labelEnvio);
  formOption.appendChild(labelDestino);
  formOption.appendChild(labelValor);
  formOption.appendChild(submit);

  section.appendChild(formOption);
  option.appendChild(section);

  submit.addEventListener("click", function () {
    if (!inputEnvio.value)
      return alert(`A conta de Envio é obrigatória, favor informar uma conta.`);

    if (!inputDestino.value)
      return alert(
        `A conta de Destino é obrigatória, favor informar uma conta.`
      );

    if (inputEnvio.value === inputDestino.value)
      return alert(
        `A conta de Destino não pode ser a mesma que a conta de Envio. Favor selecionar outra conta.`
      );

    transferirSaldo(
      Number(inputEnvio.value),
      Number(inputDestino.value),
      Number(inputValor.value)
    );
  });
}

// Função responsável por montar o card de adicionar saldo à carteira
function cardAdicionarSaldo() {
  const option = document.querySelector(".option");
  option.innerHTML = "";

  let section = document.createElement("section");
  section.classList.add("adicionar");

  let formOption = document.createElement("form");

  let title = document.createElement("h1");
  title.append(document.createTextNode("Adicionar Saldo"));

  let labelValor = document.createElement("label");

  let spanValor = document.createElement("span");
  spanValor.appendChild(document.createTextNode("Valor:"));

  let inputValor = document.createElement("input");
  inputValor.setAttribute("type", "number");
  inputValor.setAttribute("name", "valor");

  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.appendChild(document.createTextNode("Adicionar Saldo"));

  labelValor.appendChild(spanValor);
  labelValor.appendChild(inputValor);

  formOption.appendChild(title);
  formOption.appendChild(labelValor);
  formOption.appendChild(submit);

  section.appendChild(formOption);
  option.appendChild(section);

  submit.addEventListener("click", function () {
    adicionarSaldo(Number(inputValor.value));
  });
}

// Função responsável por montar o card de Realização de compras
function cardFazerCompras() {
  const option = document.querySelector(".option");
  option.innerHTML = "";

  let section = document.createElement("section");
  section.classList.add("compras");

  let formOption = document.createElement("form");

  let title = document.createElement("h1");
  title.append(document.createTextNode("Fazer Compras"));

  let labelValor = document.createElement("label");

  let spanValor = document.createElement("span");
  spanValor.appendChild(document.createTextNode("Valor:"));

  let inputValor = document.createElement("input");
  inputValor.setAttribute("type", "number");
  inputValor.setAttribute("name", "valor");

  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.appendChild(document.createTextNode("Finalizar Compra"));

  labelValor.appendChild(spanValor);
  labelValor.appendChild(inputValor);

  formOption.appendChild(title);
  formOption.appendChild(labelValor);
  formOption.appendChild(submit);

  section.appendChild(formOption);
  option.appendChild(section);

  submit.addEventListener("click", function () {
    fazerCompras(inputValor.value);
  });
}

// Função responsável por montar o card de Visualização do Extrato
function cardVerHistorico() {
  let main = document.querySelector(".main");
  let p = document.createElement('p')
  p.classList.add("srv-msg")
  // let msg = document.querySelector(".srv-msg");

  let table = document.createElement('table')
  let thead = document.createElement('thead')
  let tbody = document.createElement('tbody')
  let thOper = document.createElement('th')
  let thValor = document.createElement('th')

  thOper.append(document.createTextNode('Operação'))
  thValor.append(document.createTextNode('Valor'))

  thead.appendChild(thOper)
  thead.appendChild(thValor)

  const conta = 1;

  const req = axios.get(urlBase + `extratos/${conta}`);

  req
    .then(function (res) {
      const resultado = res.data
      p.innerHTML = ""

      for(result of resultado){
        const tr = document.createElement('tr')
        let tdOper = document.createElement('td')
        let tdValor = document.createElement('td')

        tdOper.append(document.createTextNode(result.operacao))
        tdValor.append(document.createTextNode(result.valor))

        tr.appendChild(tdOper)
        tr.appendChild(tdValor)

        tbody.appendChild(tr)
      }
      
      table.appendChild(thead)
      table.appendChild(tbody)

      p.appendChild(table)
      return main.appendChild(p)
    })
    .catch(function (error) {
      return console.log(error);
    });
}

// SESSÃO DE OPERAÇÕES NA CARTEIRA
function transferirSaldo(contaEnvio, contaDestino, valor) {
  let main = document.querySelector(".main");
  let p = document.createElement('p')
  p.classList.add("srv-msg")

  const req = axios.post(urlBase + "carteiras", {
    contaEnvio,
    contaDestino,
    valor,
  });

  req
    .then(function (res) {
      p.append(document.createTextNode(res.data));

      return main.appendChild(p);
    })
    .catch(function (error) {
      // msg.append(document.createTextNode(`Ocorreu um erro: ${error.data}`));

      // return main.appendChild(msg);
      alert(error.data)
    });
}

function adicionarSaldo(valor) {
  let main = document.querySelector('.main')
  let p = document.createElement('p')
  p.classList.add('srv-msg')

  if (valor <= 0)
    alert(`O valor a ser depositado precisa ser maior que 0(zero).`);

  const conta = 1;

  const req = axios.put(urlBase + `carteiras/${conta}`, {
    valor,
  });

  req
    .then(function (res) {
      const resultado = res.data

      p.append(document.createTextNode(resultado))

      return main.appendChild(p);
    })
    .catch(function (error) {
      return alert(error.data);
    });
}

function fazerCompras(compra) {
  if (compra <= 0) alert(`O valor da compra precisa ser maior que 0(zero).`);

  const conta = 2;

  const req = axios.put(urlBase + `carteiras/fazerCompra/${conta}`, {
    compra,
  });

  req
    .then(function (res) {
      return alert(res.data);
    })
    .catch(function (error) {
      return alert(error.data);
    });
}

// SESSÃO DE OPERAÇÕES COM O USUÁRIO
function cadastrarUsuarios() {
  let msg = document.querySelector(".main p");
  msg.innerHTML = "cheguei aqui";

  // const nome = document.querySelector("input#nome");
  // const cpf = document.querySelector("input#cpf");
  // const telefone = document.querySelector("input#telefone");

  // if (!nome.value.trim() || !cpf.value) {
  //   msg.append(
  //     document.createTextNode(`O nome e CPF são campos obrigatórios.`)
  //   );

  //   return;
  // } else {
  //   const req = axios.post(urlBase + "usuarios", {
  //     nome: nome.value.trim(),
  //     cpf: cpf.value.trim(),
  //     telefone: telefone.value,
  //   });

  //   req
  //     .then(function (res) {
  //       msg.append(document.createTextNode(res.data));
  //       return;
  //     })
  //     .catch(function (error) {
  //       msg.append(document.createTextNode(error.data));
  //       return;
  //     });
  // }
}

function alterarUsuarios() {
  alert("alterando usuario");
}

function desativarUsuarios() {
  const id = 5;
  const req = axios.delete(urlBase + `usuarios/${id}`);

  req
    .then(function (res) {
      return alert(res.data);
    })
    .catch(function (error) {
      return alert(error.data);
    });
}
