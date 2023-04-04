import { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const MovieCard = ({movie, addToFavorites, myMovies}) => {

    const [description, setDescription] = useState(false)
    const [fav, setFav] = useState(false)

    const ratingMovie = () => {
      if( movie?.vote_average >= 9){
          return <span className='bg-blue-500 text-center w-7 h-6 p-1 rounded-md text-xs'>{movie?.vote_average?.toString().slice(0,3)}</span>
      } else if( movie?.vote_average >= 7){
          return <span className='bg-green-400 text-center inline-block w-7 h-6 p-1 rounded-md text-xs font-bold'>{movie?.vote_average?.toString().slice(0,3)}</span>
      } else if( movie?.vote_average >= 5){
          return <span className='bg-orange-500 text-center w-7 h-6 p-1 rounded-md text-xs'>{movie?.vote_average?.toString().slice(0,3)}</span>
      } else {
          return <span className='bg-red-500 text-center w-7 h-6 p-1 rounded-md text-xs'>{movie?.vote_average?.toString().slice(0,3)}</span>
      }
    }

    useEffect(() => {
      const findFav = myMovies?.some( oneMovie => oneMovie.id === movie.id)
      setFav(findFav)
    }, [myMovies, movie])
    
  return (
    <div 
        className='relative cursor-pointer overflow-hidden'
        onMouseEnter={() => setDescription(true)}    
        onMouseLeave={() => setDescription(false)}    
    >
        <img 
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className='w-44 md:w-60 h-64 md:h-80 mx-auto'
        />

        <div 
            className={ description 
            ? 'flex items-end justify-between p-4 absolute bottom-0 left-1/2 -translate-x-1/2 w-44 md:w-60 h-64 md:h-80 mx-auto z-10 bg-gradient-to-t from-black/60 via-black/20 to-black/0 transition-all duration-300 ease-linear overflow-hidden' 
            : 'flex items-end justify-between p-4 absolute bottom-0 left-1/2 -translate-x-1/2 w-44 md:w-60 h-64 md:h-80 mx-auto z-10 opacity-0 bg-gradient-to-t from-black/50 via-black/10 to-black/0 transition-all duration-300 ease-linear overflow-hidden'
        }>
            { !fav ? (
                <AiOutlineHeart 
                    className={ description  
                        ? 'absolute top-4 right-4 text-3xl hover:text-red-500 transition-all duration-150 ease-linear' 
                        : 'absolute top-4 -right-4 text-2xl hover:text-red-500 transition-all duration-150 ease-linear' 
                    }
                    onClick={() => addToFavorites(movie.id, movie.poster_path)}
                />
            ) : (
                <AiFillHeart 
                    className={ description  
                        ? 'absolute top-4 right-4 text-3xl text-red-500 transition-all duration-150 ease-linear' 
                        : 'absolute top-4 -right-4 text-2xl text-red-600 transition-all duration-150 ease-linear' 
                    }
                    onClick={() => addToFavorites(movie.id, movie.poster_path)}
                />
            )}
            
            { movie.vote_average && (
                <p className='text-sm px-2 p-1 font-bold'>Rating: {ratingMovie()}</p>
            )}
            
            <Link to={`/detail/${movie.id}`}
                className='border rounded-md text-xs font-bold px-2 py-2 hover:bg-white hover:text-black transition-all duration-300 ease-in-out'
            >View details</Link>
        </div>
    </div>
  )
}

export default MovieCard