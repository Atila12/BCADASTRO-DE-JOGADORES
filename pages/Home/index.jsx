import { useEffect, useState, useRef } from 'react'
import Trash from '../../src/assets/lixo1.svg'
//import "../../src/assets/imagem_fundo.png"
import api from '../../src/services/api'
import "./styles.css"
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { pegarErroDeValidacao } from '../../src/utils/error.utils'

function Home() {
  const [user, setUser] = useState([])

  const inputNome = useRef()
  const inputSetor = useRef()
  const inputLider = useRef()
  const inputPosicao = useRef()
  const inputTelefone = useRef()

  async function getUsers() {
    const userFromApi = await api.get('/usuarios')

    setUser(userFromApi.data)
  }

  // envio de informações para o servidor prisma
  async function createUsers() {
    try {
      const result = await api.post('/usuarios', {
        nome: inputNome.current.value,
        setor: inputSetor.current.value,
        lider: inputLider.current.value,
        posicao: inputPosicao.current.value,
        telefone: inputTelefone.current.value
      })

      console.log("result: " + JSON.stringify(result))
      getUsers()

      const data = result.data

      toast.success(`Cadastro de ${data.nome} realizado com sucesso`)
    } catch (error) {
      if (isAxiosError(error)) {
        const message = pegarErroDeValidacao(error)
        toast.error(message)
      } else
        toast.error("Erro no cadastro")
    }
  }

  // deletar usuários do sistema 
  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>BID DE JOGADORES</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputNome} />
        <input placeholder="Setor" name='setor' type='text' ref={inputSetor} />
        <input placeholder="Lider" name='lider' type='text' ref={inputLider} />
        <input placeholder="Posicao" name='posicao' type='text' ref={inputPosicao} />
        <input placeholder="Telefone" name='telefone' type='text' ref={inputTelefone} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {user.map(user => (

        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>setor: <span>{user.setor}</span></p>
            <p>lider: <span>{user.lider}</span></p>
            <p>posicao: <span>{user.posicao}</span></p>
            <p>Telefone:  <span>{user.telefone}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} />
          </button>
        </div >
      ))
      }

    </div >

  )
}

export default Home
