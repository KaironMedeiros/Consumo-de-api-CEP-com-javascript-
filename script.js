const formCep = document.querySelector('#formCep')
const inputCep = document.querySelector('#inputCep')
const tbEndereco = document.querySelector('#tbEndereco')
const msgError = document.querySelector('#msgError')

const fildNome = document.querySelector('#fildNome')
const fildBairro = document.querySelector('#fildBairro')
const fildUf = document.querySelector('#fildUf')
const fildCep = document.querySelector('#fildCep')


formCep.addEventListener('submit', (e) => {

    validInput(inputCep.value)

    e.preventDefault()
})

//valida input
const validInput = (input) => {
    const cep = input.replace(/\D/g, '') 
    const validCep = /^[0-9]{8}$/ 
    if (validCep.test(cep)) { 
        pesquisaCep(cep)
        isValid(true)
    }
    else {
        isValid(false)
        limpaForm()
    }
}

const isValid = (cep) => {
    if (cep) {
        msgError.setAttribute('style', 'display:none')
    }
    else {
        msgError.setAttribute('style', 'display:block')
    }
}

//envia cep validado ao servidor
const pesquisaCep = async () => {
    const cep = inputCep.value
    const url = `http://viacep.com.br/ws/${cep}/json/`

    const dados = await fetch(url)
    const endereco = await dados.json()

    //tratamendo de erro do servidor
    if (endereco.hasOwnProperty('erro')) {
        msgError.setAttribute('style', 'display:block')
        limpaForm()

    } else {
        preencheForm(endereco)

    }
}

const limpaForm = () => {
    fildNome.value = ""
    fildBairro.value = ""
    fildUf.value = ""
    fildCep.value = ""
}

const preencheForm = (ende) => {
    fildNome.value = ende.logradouro
    fildBairro.value = ende.bairro
    fildUf.value = ende.uf
    fildCep.value = ende.cep
}
