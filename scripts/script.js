async function renderizaCards() {
  const lista = document.querySelector("#cardList");

  lista.innerHTML = "";

  const arrayDados = await fetch("https://swapi.dev/api/people", {
    method: "GET",
  }).then(function (resposta) {
    return resposta.json();
  });

  for (let indice = 0; indice < arrayDados.results.length; indice++) {
    const elemento = arrayDados.results[indice];

    const li = document.createElement("li");
    const divFrente = document.createElement("div");
    const divNomeFrente = document.createElement("div");
    const divNomeVerso = document.createElement("div");
    const listaDados = document.createElement("ul");
    const anoNasc = document.createElement("li");
    const planeta = document.createElement("li");
    const divVerso = document.createElement("div");
    const imagemVerso = document.createElement("img");

    li.classList.add("listCard", "card");
    divFrente.classList.add("face");
    divFrente.classList.add("front");

    divNomeFrente.innerText = elemento.name;
    divNomeFrente.classList.add("titleCard");

    divNomeVerso.innerText = elemento.name;
    divNomeVerso.classList.add("titleCard");

    listaDados.classList.add("cardData");
    anoNasc.innerText = `Ano de Nascimento: ${elemento.birth_year}`;

    const nomePlaneta = await fetch(elemento.homeworld, {
      method: "GET",
    }).then(function (resposta) {
      return resposta.json();
    });

    planeta.innerText = `Planeta: ${nomePlaneta.name}`;

    divVerso.classList.add("face");
    divVerso.classList.add("back");
    imagemVerso.src = "./assets/starduck.png";
    imagemVerso.alt = "starduck";

    listaDados.append(anoNasc, planeta);
    divFrente.append(divNomeFrente, listaDados);
    divVerso.append(divNomeVerso, imagemVerso);
    li.append(divFrente, divVerso);
    lista.append(li);
  }

  viraCard();
}

function viraCard() {
  const cards = document.querySelectorAll(".listCard");
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    card.addEventListener("click", function () {
      card.classList.toggle('flip')
    });
  }
}

renderizaCards();
