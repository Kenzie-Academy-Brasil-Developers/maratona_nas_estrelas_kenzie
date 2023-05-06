// o que são variáveis

// let nome = 'Bertoldo'
// const idade = 33
// nome = 'Rafael'

// funções

// function mostraNome() {
//   let nome = 'Rafael'

//   return nome
// }

// let nomeVindoDaFuncao = mostraNome()

// loop e repetições

// for(let indice = 0; indice < 10; indice + 1) {
//   console.log(indice)
// }

async function renderizaCards() {
  const lista = document.querySelector('#cardList')

  lista.innerHTML = ""

  const listaDeDados = await fetch('https://swapi.dev/api/people', {
    method: "GET"
  })
  .then(function(resposta) {
    return resposta.json()
  })

  for(let indice = 0; indice < listaDeDados.results.length; indice++) {
    const elemento = listaDeDados.results[indice]

    const li = document.createElement("li")
    const divFrente = document.createElement('div')
    const divVerso = document.createElement('div')
    const divNomeFrente = document.createElement('div')
    const divNomeVerso = document.createElement('div')
    const listaDados = document.createElement('ul')
    const anoNasc = document.createElement('li')
    const planeta = document.createElement('li')
    const imagem = document.createElement('img')

    li.classList.add('card', 'listCard')
    divFrente.classList.add("face");
    divFrente.classList.add("front");

    divNomeFrente.classList.add("titleCard")
    divNomeFrente.innerText = elemento.name

    divNomeVerso.classList.add("titleCard")
    divNomeVerso.innerText = elemento.name

    listaDados.classList.add("cardData")

    anoNasc.innerText = 'Ano de Nascimento: ' + elemento.birth_year

    const nomePlaneta = await fetch(elemento.homeworld, {
      method: "GET"
    })
    .then(function(resposta) {
      return resposta.json()
    })

    planeta.innerText = 'Planeta: ' + nomePlaneta.name

    divVerso.classList.add('face', 'back')

    imagem.src = "./assets/starduck.png"
    imagem.alt = "starduck"

    listaDados.append(anoNasc, planeta)
    divFrente.append(divNomeFrente, listaDados)
    divVerso.append(divNomeVerso, imagem)
    li.append(divFrente, divVerso)
    lista.append(li)
  }
  viraCard()
}

function viraCard() {
  const cards = document.querySelectorAll('.listCard')

  for(let indice = 0; indice < cards.length; indice++) {
    const card = cards[indice]

    card.addEventListener('click', function() {
      card.classList.toggle('flip')
    })
  }
}

renderizaCards()
