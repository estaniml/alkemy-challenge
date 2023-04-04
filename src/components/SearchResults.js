import axios from 'axios'
import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { useParams } from 'react-router-dom'
import LoadingCard from './LoadingCard'
import { AiOutlineWarning } from 'react-icons/ai'

const SearchResults = ({myMovies, addToFavorites}) => {

    const [moviesList, setMoviesList] = useState([])
    const [loading, setLoading] = useState(false)

    let { id } = useParams();

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=957cc4425bba8222d653064c4c47d9b9&query=${id}&page=1`
  
       setLoading(true)
       axios.get(url)
         .then( res => {
           const movieData = res.data
           const filteredMovies = movieData.results.filter( movie => movie.poster_path !== null                )
          setMoviesList(filteredMovies);
        })
        .catch( err => {
          console.log(err);
        })
        .finally( () => {
          setLoading(false)
        })
    }, [id])

  return (
    <div className='mt-20'>
        <h1 className="font-bold text-stone-300 text-xl md:text-2xl">Results for: {id}</h1>

        <ul className="relative grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 mt-4">

                { !loading && moviesList?.map( movie => (
                    <MovieCard 
                        key={movie.id}
                        movie={movie}
                        myMovies={myMovies}
                        addToFavorites={addToFavorites}
                    />
                ))} 

          { loading && (
            <div className='absolute grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 mt-4'>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </div>
          )}
        </ul>

        { !loading && moviesList?.length === 0 && (
            <div className='flex items-center gap-2 text-red-300'>
                <AiOutlineWarning className='text-xl' />
                <p>We didnt find movies with information. Please try with another word</p>
            </div>
        ) }
    </div>
  )
}



export default SearchResults