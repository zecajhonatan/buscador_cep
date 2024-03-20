import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './styles.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import api from './services/api.js'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {

    if (input === '') {
      toast.warn("Preencha algum CEP")
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      toast.success("CEP Encontrado", {
        position: "top-right",
        autoClose: 500,
      })
      setInput('')
    } catch (error) {
      toast.error(error.message)
      setInput('')
    }

  }

  return (
    <>
      <div className="container">
        <h1 className="title">Buscador CEP</h1>
        <div className="containerInput">
          <input
            type="text"
            placeholder="Digite seu cep..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="buttonSearch" onClick={handleSearch}>
            <FiSearch size={25} color='#fff' />
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className='main'>
            <h2>Cep: {cep.cep}</h2>
            <span>Logradouro: {cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>Bairro:{cep.bairro}</span>
            <span>Localidade: {cep.localidade} - {cep.uf}</span>
          </main>
        )}

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          theme="dark"
        />

      </div>
    </>
  );
}

export default App;
