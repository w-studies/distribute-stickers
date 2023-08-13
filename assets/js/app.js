const distributionCalc = document.querySelector('.distribution-calc-wrapper')
const formWrapper = distributionCalc.querySelector('.form-wrapper')
const messenger = distributionCalc.querySelector('.messenger')
const stage = distributionCalc.querySelector('.stage')

// margem de 5mm
let margem = 5

// dados da página
const page = {
  // A4
  altura: 297 - 2 * margem,
  largura: 210 - 2 * margem
}

page.area = page.altura * page.largura

page.orientation = page.largura < page.altura ? 'portrait' : 'landscape'

// dados para do adesivo
let altura = 10
let largura = 10
let quantidade = 10

const doTheMagic = () => {
  quantidade = formWrapper.querySelector('[name="quantidade"]').value
  margem = formWrapper.querySelector('[name="margem"]').value

  const adesivo = {
    altura: formWrapper.querySelector('[name="altura"]').value,
    largura: formWrapper.querySelector('[name="largura"]').value,
    area: altura * largura
  }

  page.altura = 297 - 2 * margem
  page.largura = 210 - 2 * margem

  // calcular quantos adesivos cabem em uma página portrait
  // Divide-se a largura maior pela largura menor, desconsiderando as casas decimais
  const divisaoLarguras = Math.floor(page.largura / adesivo.largura)
  // Divide-se a altura maior pela altura menor, desconsiderando as casas decimais
  const divisaoAlturas = Math.floor(page.altura / adesivo.altura)
  // Multiplica-se o resultado da divisão das larguras pelo resultado da divisão das alturas
  const maxItemsPerPage = divisaoLarguras * divisaoAlturas

  const adesivoElement = document.createElement('div')
  adesivoElement.classList.add('adesivo')
  adesivoElement.style.width = `${adesivo.largura}mm`
  adesivoElement.style.height = `${adesivo.altura}mm`

  stage.innerHTML = ''
  stage.style.setProperty('--margin', `${margem}mm`)
  stage.style.setProperty('top', `calc(100% + ${margem / 1.5}mm)`)

  const maxItems = quantidade > maxItemsPerPage ? maxItemsPerPage : quantidade

  for (let i = 1; i <= maxItems; i++) {
    adesivoElement.textContent = i

    stage.appendChild(adesivoElement.cloneNode(true))
  }

  const quantidadeDeFolhas = Math.ceil(quantidade / maxItemsPerPage)

  messenger.innerHTML = `Quantidade necessária de folhas: <span>${quantidadeDeFolhas}</span><br>
    Quantidade máxima de adesivos por folha: <span>${maxItemsPerPage}</span>`

  document.querySelector('.logger').innerHTML = JSON.stringify(
    { adesivo, page, quantidadeLargura: divisaoAlturas, quantidadeAltura: divisaoAlturas },
    null,
    1
  )
}

formWrapper.addEventListener('input', doTheMagic)

doTheMagic()
