import { Link } from 'react-router-dom'
import Search from './Search'
import { useLocation } from 'react-router-dom';

const Navbar = ({myMovies}) => {

  let location = useLocation();
  const token = sessionStorage.getItem('token')

  return (
    <section className='bg-black/70 backdrop-blur-md w-full fixed top-0 h-16 flex justify-between items-center px-4 md:px-[10%] z-50 '>
      <div className=' text-xl'>
        <Link to='/'>
          <h1><strong className='text-sky-400 '>Alkemy</strong> <span className='font-light'>movies</span></h1>
        </Link>
      </div>

      <nav className='relative'>
        <ul className='hidden md:flex items-center gap-4'>
          <li className={ location.pathname === '/list' ? 'font-bold text-sky-400' : 'hover:text-sky-400'}>
            <Link to='/list'>Movies</Link> 
          </li>
          { token && (
            <li className={ location.pathname === '/favorites' ? 'font-bold text-sky-400' : 'hover:text-sky-400'}>
              <Link to='/favorites' >Favorites {myMovies.length > 0 ? <small>({myMovies.length})</small> : null }</Link> 
            </li>
          )}
          <Search />
        </ul>

        <ul className='w-full flex flex-col md:hidden gap-4 z-40'>
          <Search />
        </ul>
      </nav>
    </section>
  )
}

export default Navbar