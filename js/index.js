import data from '../data.json'  assert {type: "json"}


// campos de preencher
const campoNome = document.querySelector(`.campo-nome`)
const campoEmail = document.querySelector('.campo-email')
const campoNumber = document.querySelector('.campo-number')

// avisos

const avisos = document.querySelectorAll(`.aviso`)

// botao
const btProximo = document.querySelectorAll('.proximo')
const planos = document.querySelectorAll('.plano');
const botoesAddons = document.querySelectorAll('.addons');
const checks = document.querySelectorAll('.check');
const btMensalOuAnual = document.querySelector(".circulo-input");
const btGoBack = document.querySelectorAll('.go-back');

// telas ou renderizadores
const telaPasso = document.querySelectorAll('.passo');
const renderizacaoCustos = document.querySelector('.renderizacao-custos');
const planoPreco = document.querySelectorAll('.plano-preco');
const addonPreco = document.querySelectorAll('.addon-preco');
const telaFinalizacao = document.querySelector('.div-finalizacao')
const descontoP = document.querySelectorAll('.desconto');
//circulos
const circulos = document.querySelectorAll('.circle');


// PS: nao esquecer de calcular os planos mensais e anuais



//botao enviar + checa se está concluido

btProximo.forEach((botao, index) => {

    botao.addEventListener('click', () => {


        if (telaPasso[0].classList.contains("aberto")) {


            if (campoNome.value === '' || campoEmail.value === '' || campoNumber.value === '') {

                avisos.forEach((aviso) => {
                    aviso.innerHTML = `This field is required`
                })

                campoNome.style.border = "2px solid hsl(354, 84%, 57%)"
                campoEmail.style.border = "2px solid hsl(354, 84%, 57%)"
                campoNumber.style.border = "2px solid hsl(354, 84%, 57%)"

                return
            }
            else if (!isNaN(campoNome.value)) {

                avisos[0].innerHTML = `This field is a text field`
                campoNome.style.border = "2px solid hsl(354, 84%, 57%)"
            }
            else if (isNaN(campoNumber.value)) {

                avisos[2].innerHTML = `This field is a number field`
                campoNumber.style.border = "2px solid hsl(354, 84%, 57%)"

            } else {

                removeSelecionados()

                let indiceAtual = index + 1

                telaPasso[indiceAtual].classList.add("aberto")
                circulos[indiceAtual].classList.add("selecionado")
            }

        } else if (telaPasso[1].classList.contains("aberto")) {


            checarSePlanoFoiSelecionado(index)

            renderizaPlanosSelecioandos()

            // botao mudar plano: 



        } else if (telaPasso[2].classList.contains("aberto")) {

            checarSeAddonFoiSelecionado(index)

            renderizaAddonsSelecionados()

            botaoChangeEventoClick()

        } else if (telaPasso[3].classList.contains("aberto")) {

            const planosSelecionadosPrecos = document.querySelectorAll('.plano.selecionado .nome-plano')
            const addonsSelecionadosPrecos = document.querySelectorAll('.addons.selecionado .nome-servico')

          

            let anualOumensal = btMensalOuAnual.classList.contains('anual');

            if (anualOumensal === true) {

                console.log('caiu no anual')
                let precosDosPlanosSelecionados = []
                let localizaPlanoPrecos = Object.entries(data.planos.yearly);

                let precosDosAddonsSelecionados = []
                let localizaAddonPrecos = Object.entries(data.addons.yearly)

                planosSelecionadosPrecos.forEach((planSelecionado) => {

                    encontrarPlanos(precosDosPlanosSelecionados, localizaPlanoPrecos, planSelecionado)
                })

                addonsSelecionadosPrecos.forEach((addonSelecionado) => {

                    encontrarAddons(precosDosAddonsSelecionados, localizaAddonPrecos, addonSelecionado)
                })

                somaPlanosValor(precosDosPlanosSelecionados,somaPrecosPlanos)

                somaAddonsValor(precosDosAddonsSelecionados,somaDosAddons)

                let somaPrecos = somaDosAddons + somaPrecosPlanos

                renderizacaoCustos.innerHTML += `
                <div class="div-total">
                    <p class="total-por">Total (per month)</p>
                    <h3 class="total">${somaPrecos}</h3>
                </div> 
                `

            } else {

                console.log('caiu no mensal')

                let precosDosPlanosSelecionados = []
                let localizaPlanoPrecos = Object.entries(data.planos.monthly);

                let precosDosAddonsSelecionados = []
                let localizaAddonPrecos = Object.entries(data.addons.monthly)

                planosSelecionadosPrecos.forEach((planSelecionado) => {

                    encontrarPlanos(precosDosPlanosSelecionados, localizaPlanoPrecos, planSelecionado)
                })

                addonsSelecionadosPrecos.forEach((addonSelecionado) => {

                    encontrarAddons(precosDosAddonsSelecionados, localizaAddonPrecos, addonSelecionado)
                })

                somaPlanosValor(precosDosPlanosSelecionados)

                somaAddonsValor(precosDosAddonsSelecionados)

                let somaPrecos = somaDosAddons + somaPrecosPlanos

                renderizacaoCustos.innerHTML += `
                <div class="div-total">
                    <p class="total-por">Total (per year)</p>
                    <h3 class="total">${somaPrecos}</h3>
                </div> 
                `
            }

            // percorrer cada planos selecionados e addons e somalos individualmente, depois somar os dois juntos e renderizar por ultimo


            if (renderizacaoCustos.childElementCount >= 2) {

                removeSelecionados()


                telaFinalizacao.classList.add('aberto');


            } else {
                return
            }

        }
    })
})

// botao voltar:

btGoBack.forEach((bt, index) => {

    bt.addEventListener('click', () => {

        removeSelecionados()

        let indiceAtual = index;

        indiceAtual - 1

        telaPasso[indiceAtual].classList.add('aberto');
        circulos[indiceAtual].classList.add('selecionado')

        planos.forEach((plan) => {

            plan.classList.remove('selecionado');
        })

        botoesAddons.forEach((addon) => {

            addon.classList.remove('selecionado')
        })


        checarSePlanoFoiSelecionado(index)
        checarSeAddonFoiSelecionado(index)


        renderizacaoCustos.innerHTML = ``


    })

})


// botao alternancia de plano mensal ou anual



let entradasDatasPlanosMensais = Object.entries(data.planos.monthly)

entradasDatasPlanosMensais.forEach((obj, index) => {

    planoPreco[index].innerHTML = `$${obj[1].preco}/mo`
})


let entradasDatasAddonsMensais = Object.entries(data.addons.monthly)

entradasDatasAddonsMensais.forEach((obj, index) => {

    addonPreco[index].innerHTML = `+$${obj[1].preco}/mo`
})



btMensalOuAnual.addEventListener("click", () => {


    if (btMensalOuAnual.classList.contains("anual")) {



        let entradasDatasPlanosMensais = Object.entries(data.planos.monthly)


        entradasDatasPlanosMensais.forEach((obj, index) => {

            planoPreco[index].innerHTML = `$${obj[1].preco}/mo`
            descontoP[index].innerHTML = ``
        })


        let entradasDatasAddonsMensais = Object.entries(data.addons.monthly)

        entradasDatasAddonsMensais.forEach((obj, index) => {

            addonPreco[index].innerHTML = `+$${obj[1].preco}/mo`
        })

        btMensalOuAnual.classList.remove("anual");

    } else {

       

        let entradasDatasPlanosAnuais = Object.entries(data.planos.yearly)

        entradasDatasPlanosAnuais.forEach((entrada, index) => {
            planoPreco[index].innerHTML = `$${entrada[1].preco}/yr`
            descontoP[index].innerHTML += `${entrada[1].desconto}`
        })

        let entradasDatasAddonsAnuais = Object.entries(data.addons.yearly)

        entradasDatasAddonsAnuais.forEach((entrada, index) => {
            addonPreco[index].innerHTML = `+$${entrada[1].preco}/yr`
        })


        btMensalOuAnual.classList.add("anual");
    }

})


// adicionando plano

planos.forEach((plano) => {

    plano.addEventListener('click', () => {

        if (plano.classList.contains("selecionado")) {
            plano.classList.remove("selecionado");
        }
        else {
            plano.classList.add("selecionado");
        }
    })
})

// addons:

botoesAddons.forEach((addons, index) => {

    addons.addEventListener('click', () => {

        if (addons.classList.contains('selecionado')) {

            addons.classList.remove('selecionado');
            checks[index].checked = false

        } else {

            addons.classList.add('selecionado');
            checks[index].checked = true

        }

    })

})


// planos escolhidos:


function renderizaPlanosSelecioandos() {


    let planosSelecionadosNomes = document.querySelectorAll('.plano.selecionado span');
    let planosSelecionadosPrecos = document.querySelectorAll('.plano.selecionado .plano-preco');


    planosSelecionadosNomes.forEach((planNomes, index) => {

        renderizacaoCustos.innerHTML += `<div class="plano-escolhido">
                                    <div>
                                     <h3>${planNomes.textContent}</h3>
                                     <input class="bt-change" type="button" value="change">
                                   </div>
                                   <p class="plano-preco">${planosSelecionadosPrecos[index].textContent}</p>
                                </div>`
    })

}

function renderizaAddonsSelecionados() {

    let addonsSelecionadosNomes = document.querySelectorAll('.addons.selecionado .nome-servico')
    let addonsSelecionadosPrecos = document.querySelectorAll('.addons.selecionado .addon-preco')

    addonsSelecionadosNomes.forEach((addon, index) => {

        renderizacaoCustos.innerHTML += `
          <div class="service-escolhido">
              <p>${addon.textContent}</p>
              <p>${addonsSelecionadosPrecos[index].textContent}</p>
          </div>
        
        `
    })
}

//funções:

//remover

function removeSelecionados() {

    telaPasso.forEach((tela) => {
        tela.classList.remove("aberto")
    })

    circulos.forEach((circulo) => {
        circulo.classList.remove("selecionado")
    })

    checks.forEach((check) => {

        check.checked = false;
    })

}

// checar se os planos foram selecionados

function checarSePlanoFoiSelecionado(index) {

    planos.forEach((plano) => {

        if (plano.classList.contains('selecionado')) {

            removeSelecionados()

            let indiceAtual = index + 1
            telaPasso[indiceAtual].classList.add('aberto');
            circulos[indiceAtual].classList.add('selecionado');

        } else {
            return
        }

    })
}

//checar se os addons foram selecionados

function checarSeAddonFoiSelecionado(index) {

    botoesAddons.forEach((addon) => {

        if (addon.classList.contains('selecionado')) {

            removeSelecionados()

            let indiceAtual = index + 1;

            telaPasso[indiceAtual].classList.add('aberto');
            circulos[indiceAtual].classList.add('selecionado');



        } else {

            return
        }
    })
}


// adicionar evento ao botao change

function botaoChangeEventoClick() {

    const btChange = document.querySelectorAll('.bt-change');

    btChange.forEach((bt) => {

        bt.addEventListener('click', () => {

            removeSelecionados()

            telaPasso[1].classList.add('aberto');

            renderizacaoCustos.innerHTML = ``

            planos.forEach((plan) => {

                plan.classList.remove('selecionado');
            })

            botoesAddons.forEach((addon) => {

                addon.classList.remove('selecionado')
            })

        })

    })


}

// encontrar e somar planos:

function encontrarPlanos(precosDosPlanosSelecionados, localizaPlanoPrecos, planSelecionado) {

    // planSelecionado = nome vindo da lista de nomes
    // localizaPlanoPrecos = caminhos de data até o divisor: anual/mensal 
    // precosDosPlanosSelecionados = a array vazia

    let valorDasSelecoes = planSelecionado.textContent.toLowerCase()

    localizaPlanoPrecos.forEach((entrada) => {

        if (entrada[0] === valorDasSelecoes) {

            let entradaAlvo = entrada[1].preco

            precosDosPlanosSelecionados.push(entradaAlvo)

            console.log('o valor da array de preços é:', precosDosPlanosSelecionados)

        } else {
            return
        }

    })

}

function encontrarAddons(precosDosAddonsSelecionados, localizaAddonPrecos, addonSelecionado) {

    // planSelecionado = nome vindo da lista de nomes
    // localizaPlanoPrecos = caminhos de data até o divisor: anual/mensal 
    // precosDosPlanosSelecionados = a array vazia

    let valorDasSelecoes = addonSelecionado.textContent.toLowerCase().trim()

    let nomePlan = valorDasSelecoes.replace(" ", "_")

    console.log("addon pego pelo id ", nomePlan)

    localizaAddonPrecos.forEach((addPreco) => {

        if (addPreco[0] === valorDasSelecoes) {

            let entradaAlvo = addPreco[1].preco

            precosDosAddonsSelecionados.push(entradaAlvo)

            console.log('o valor da array de addons selecionados é:', precosDosAddonsSelecionados)

        } else {
            return
        }
    })
}

// planos soma

function somaPlanosValor(precosDosPlanosSelecionados, somaPrecosPlanos) {

    var somaPrecosPlanos = 0;

    for (let i = 0; i < precosDosPlanosSelecionados.length; i++) {

        somaPrecosPlanos += precosDosPlanosSelecionados[i]
    }

    console.log('soma dos planos é:', somaPrecosPlanos)

    return somaPrecosPlanos

}

// addons  soma

function somaAddonsValor(precosDosAddonsSelecionados, somaDosAddons) {

    var somaDosAddons = 0;

    for (let i = 0; i < precosDosAddonsSelecionados.length; i++) {

        somaDosAddons += precosDosAddonsSelecionados[i]
    }

    console.log('soma  dos addons é:', somaDosAddons)

    return somaDosAddons
}
