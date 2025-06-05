// função para os erros aparecer no front end 
export function pegarErroDeValidacao(axiosError) {
    //localizando o caminho dos possivceis erros
    const data = axiosError.response.data

    //
    const erros = Object.entries(data.erro.fieldErrors)

    const primeiroErro = erros[0]

    const [campo, listaDeErroDoCampo] = primeiroErro

    return `O ${campo} ${listaDeErroDoCampo[0]}`
}
