let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0
let numero = ``
let votoBranco = false

function comecarEtapa() {
    let etapa = etapas[etapaAtual]

    let numeroHtml = ''
    numero = ''
    votoBranco = false

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += `<div class="numero pisca"></div>`
        } else {
            numeroHtml += `<div class="numero"></div>`
        }

    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}

function atualizaInterface() {
    let candidato = etapas[etapaAtual].candidatos.filter((item) => {
        if (numero == item.numero) {
            return true
        } else {
            return false
        }
    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`
        aviso.style.display = 'block'
        let fotosHtml = ``
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `
                    <div class="d-1-image small">
                            <img src="assets/images/${candidato.fotos[i].url}" alt="" />
                            ${candidato.fotos[i].legenda}
                    </div>
                `
            } else {
                fotosHtml += `
                    <div class="d-1-image">
                            <img src="assets/images/${candidato.fotos[i].url}" alt="" />
                            ${candidato.fotos[i].legenda}
                    </div>
                `
            }
        }
        lateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
        aviso.style.display = 'block'
    }
}

document.querySelectorAll('.teclado--botao').forEach((botao) => {
    botao.addEventListener('click', e => {
        let elNumero = document.querySelector('.numero.pisca')
        if (elNumero != null) {
            if (!isNaN(Number(e.target.innerHTML))) {
                elNumero.innerHTML = !isNaN(parseInt(e.target.innerHTML)) ? parseInt(e.target.innerHTML) : ''
                numero = `${numero}${String(e.target.innerHTML)}`
                elNumero.classList.remove('pisca')

                if (elNumero.nextElementSibling != null) {
                    elNumero.nextElementSibling.classList.add('pisca')
                } else {
                    atualizaInterface()
                }
            }
        }
        if (e.target.innerHTML.toLowerCase() == 'corrige') {
            comecarEtapa()
        } else if (e.target.innerHTML.toLowerCase() == 'branco') {
            votoBranco = true
            numero = ``
            numeros.innerHTML = ``
            seuVotoPara.style.display = 'block'
            descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
            aviso.style.display = 'block'
            lateral.innerHTML = ''
        } else if (e.target.innerHTML.toLowerCase() == 'confirma') {
            let etapa = etapas[etapaAtual]
            let votoConfirmado = false
            let candidatoEncontrado = etapa.candidatos.filter(item => numero == item.numero)

            if (votoBranco === true) {
                votoConfirmado = true
                console.log("Confirmando como BRANCO")
            } else if (candidatoEncontrado.length > 0) {
                votoConfirmado = true
                console.log("Confirmado como " + numero)
            } else if (candidatoEncontrado.length < 1) {
                votoConfirmado = true
                console.log("Confirmado como NULO")
            }

            if (votoConfirmado) {
                etapaAtual++
                if (etapas[etapaAtual] !== undefined) {
                    comecarEtapa()
                } else {
                    document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM</div>`
                }
            }
        }
    })
})

comecarEtapa()