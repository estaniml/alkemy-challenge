import { useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Search = () => {

    const [value, setValue] = useState('')
    const inputRef = useRef(null)
    const navigate =  useNavigate()

    const handleSearch = e => {
        e.preventDefault()

        if(value.length === 0 ){
            inputRef.current.focus()
            return
        }

        navigate(`/search/${value}`)
    }

  return (
    <form 
        className='w-36 flex items-center gap-1 border p-1 rounded-lg border-stone-600 shadow-md shadow-stone-800 text-sm'
        onSubmit={handleSearch}
    >
        <input
            className='bg-transparent text-white w-full  focus:outline-none'
            placeholder='Search movie'
            type='text'
            name="keyword"
            onChange={(e) => setValue(e.target.value.trim()) }
            ref={inputRef}
        />
        <button
            type='submit'
        >
            <FaSearch className='text-lg bg-sky-500 hover:bg-white hover:text-sky-500 p-1 rounded-full' />
        </button>
    </form>
  )
}

export default Search