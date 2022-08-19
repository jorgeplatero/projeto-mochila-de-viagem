const form = document.getElementById('novoItem') //Buscando dados do formulário
const lista = document.getElementById('lista') //Buscando lista não ordenada
const itens = JSON.parse(localStorage.getItem('itens')) || [] //array para armazenar itens no local storage e também dele receber objetos. 'JSON.parse' converte strings em objetos

itens.forEach( (elemento) => { //Iterando em objeto salvo no local storage
    criaElemento(elemento) //Criando elementos salvos no local storage
})

//Buscando dados do formulário

form.addEventListener('submit', (evento) => {
    evento.preventDefault() //Interrompendo rotina do evento padrão

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    //Verificando se item do formulá já existe

    const existe = itens.find( elemento => elemento.nome === nome.value) //Guardando objeto existente ou não definido
    
    const itemAtual = { //Criando objeto submetido
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    //Condição para atualizar ou criar elemento na lista

    if(existe) {
        itemAtual.id = existe.id //Atribuindo id do objeto existente
        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual //Atualizando item no local storage
    } 
    else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0; //Atribuindo id. Se o id existir, isto, se houver elemento no array, ele encontra o último id e soma 1, caso contrário será 0
        criaElemento(itemAtual)
        itens.push(itemAtual) //Adicionando novo objeto no array
    }
    
    localStorage.setItem('itens', JSON.stringify(itens)) //Salvando novo objeto no local storage

    nome.value = '' //Limpando formulário
    quantidade.value = ''
})

//Função para criar elemento no HTML

function criaElemento(item) {

    const novoItem = document.createElement('li') //criando tag HTML
    novoItem.classList.add('item') //Adicionando classe na tag

    const numeroItem = document.createElement('strong') //criando tag HTML
    numeroItem.innerHTML = item.quantidade //Inserindo texto HTML na tag
    numeroItem.dataset.id = item.id //inserindo id na tag strong

    novoItem.appendChild(numeroItem) //Inserindo tag dentro da tag li
    novoItem.innerHTML += item.nome //Adicionando texto HTML na tag
    
    novoItem.appendChild(deletaBotao(item.id))
    lista.appendChild(novoItem) //Adicionando na lista o novo item criado
}

//Função para atualizar elemento no HTML

function atualizaElemento(item) {

    document.querySelector('[data-id="'+item.id+'"]').innerHTML = item.quantidade //atualizando quantodade do elemento
}

//Função para deletar item

function deletaBotao(id) {
    const elementoBotao = document.createElement('button')
    elementoBotao.innerHTML = 'X'
    elementoBotao.classList.add('botao')

    elementoBotao.addEventListener('click', function() {
        deletaElemento(this.parentNode, id) //passando tag li como parâmetro, pai do botao
    })

    return elementoBotao
}

function deletaElemento(elemento, id) {
    elemento.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id)) //Removendo elemento do array
    localStorage.setItem('itens', JSON.stringify(itens)) //Atualizando local storage
}