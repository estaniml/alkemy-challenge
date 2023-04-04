import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import LoadingCard from "./LoadingCard";
import Favorites from "./Favorites";
import { FaFire } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2
  }
};

const List = ({myMovies, addToFavorites}) => {
    
    const [moviesList, setMoviesList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
      status: false,
      msg: ''
    })

    const token = sessionStorage.getItem('token')

    useEffect(() => {
  
      setLoading(true)
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=957cc4425bba8222d653064c4c47d9b9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`

      axios.get(url)
        .then( res => {
          const moviesData = res.data
          setMoviesList(moviesData.results)
          setError({
            status: false,
            msg: ''
          })
        })
        .catch( err => {
          console.log(err);
          setError({
            status: true,
            msg: 'Error! Please try again later.'
          })
        })
        .finally( () => {
          setLoading(false)
        })
    }, [])

  return (
    <>
      <section >
        <h1 className="font-bold text-stone-300 text-xl md:text-2xl flex items-center gap-2"><FaFire className="text-red-400 animate-pulse" />  Most recent & popular movies:</h1>

        { error.status && (
          <p className="mt-4 border border-stone-700 p-4 text-center rounded-lg text-red-500">{error.msg}</p>
        )}

        <ul className="relative mt-4">

          <Carousel responsive={responsive}>
            { !loading && moviesList?.map( movie => (
              <MovieCard 
                key={movie.id}
                movie={movie}
                myMovies={myMovies}
                addToFavorites={addToFavorites}
              />
            ))} 
          </Carousel>

          { loading && (
            <div className='relative mt-4'>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </div>
          )}
        </ul>
        
      </section>
      
      { token ? (
        <Favorites 
          myMovies={myMovies}
          addToFavorites={addToFavorites}
        />
      ) : (
        <div className="flex justify-center items-center my-20">
          <Link to='/login'
            type='submit'
            className='text-sm bg-white shadow-md hover:bg-stone-400 rounded-md py-1 px-3 text-black transition-all duration-200 ease-linear tracking-wider'
          >Iniciar sesión</Link>
        </div>
      )}


    </>
  )
}

export default List