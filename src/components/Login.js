import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [error, setError] = useState({
    status: false,
    msg: ''    
  })
  
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if(token !== null){
      navigate('/list')
    }      
  }, [token, navigate])

  const handleSubmit = e => {
    e.preventDefault();

    const email = e.target.email.value
    const password = e.target.password.value
    
    if(email === '' || password === '') {
      setError({
        status: true,
        msg: '* Los campos son obligatorios'
      })
      return
    }

    if(email !== 'challenge@alkemy.org' || password !== 'react'){
      setError({
        status: true,
        msg: '* Los campos son incorrectos. Intente de nuevo'
      })
      return
    }

    axios
      .post( 'http://challenge-react.alkemy.org', {
        email,
        password
      })
      .then( res => {
        const tokenRes = res.data.token
        sessionStorage.setItem('token', tokenRes)
        navigate('/list')
      })

    setError({
      status: false,
      msg: ''
    })

  }

  return (
    <form
      className='mt-32 border border-stone-900 p-8 flex flex-col gap-4 rounded-xl w-full md:w-4/5 mx-auto bg-gradient-to-tr from-black via-stone-900 to-black'
      onSubmit={handleSubmit}  
    >
      <h1 className='text-xl uppercase font-bold tracking-widest text-center'>Iniciar sesión</h1>


      <label
        className='flex flex-col w-full md:w-2/4 md:mx-auto gap-1 text-sm'
        >
        { error.status && (<p className='text-red-600'>{error.msg}</p>)}
        
        <span>Correo Electrónico:</span>
        <input 
          type="email" 
          name="email"
          className='p-1 focus:outline-none border border-stone-700 focus:border-sky-500 active:border bg-transparent rounded-md'
        />
      </label>

      <label
        className='flex flex-col w-full md:w-2/4 md:mx-auto gap-1 text-sm'
      >
        <span>Contraseña:</span>
        <input 
          type="password" 
          name="password"
          className='p-1 focus:outline-none border border-stone-700 focus:border-sky-500 active:border bg-transparent rounded-md'
        />
      </label>

      <button
        type='submit'
        className='text-sm bg-white shadow-md hover:bg-stone-400 rounded-md w-full md:w-1/4 py-1 px-3 text-black transition-all duration-200 ease-linear tracking-wider mx-auto'
      >Ingresar</button>
    </form>
  )
}

export default Login