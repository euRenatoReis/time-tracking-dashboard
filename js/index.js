
import data from '../services/data.json' assert { type: "json"};


const BtsRotina = document.querySelectorAll('.opcoes-rotina');

const anteriores = document.querySelectorAll('.anterior');

const timerAtual = document.querySelectorAll('.timerA')



BtsRotina[0].addEventListener('click', () => {


    let diario = data.daily

    let tarefas = Object.entries(diario);

    tarefas.forEach((tarefa, index) => {

        tarefa.forEach((rotina) => {

            timerAtual[index].innerHTML = `<h1>${rotina.number}</h1>`
            anteriores[index].innerHTML = `<p>Last Day - ${rotina.Previous}<p>`
        })

    })

    BtsRotina.forEach((botao)=>{

          botao.classList.remove('active')
    })

    BtsRotina[0].classList.add('active')

})


BtsRotina[1].addEventListener('click', () => {


    let semanal = data.weekly;

    let tarefas = Object.entries(semanal);

    tarefas.forEach((tarefa, index) => {

        tarefa.forEach((rotina) => {

            timerAtual[index].innerHTML = `<h1>${rotina.number}</h1>`
            anteriores[index].innerHTML = `<p>Last Week - ${rotina.Previous}<p>`
        })
    })

    BtsRotina.forEach((botao)=>{

          botao.classList.remove('active');
    })

    BtsRotina[1].classList.add('active');
})


BtsRotina[2].addEventListener('click', () => {

    let mensal = data.monthly;

    let tarefas = Object.entries(mensal);

    tarefas.forEach((tarefa, index) => {

        tarefa.forEach((rotina) => {

            timerAtual[index].innerHTML = `<h1>${rotina.number}</h1>`
            anteriores[index].innerHTML = `<p>Last Month - ${rotina.Previous}</p>`
        })
    })

    BtsRotina.forEach((botao)=>{

        botao.classList.remove('active');
    })

    BtsRotina[2].classList.add('active');
})
