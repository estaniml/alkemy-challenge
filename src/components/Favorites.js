import React, { useEffect, useState } from 'react'
import LoadingCard from './LoadingCard'
import { FaStar } from 'react-icons/fa'
import MovieCard from './MovieCard'
import { MdMovieFilter } from "react-icons/md"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"


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

const Favorites = ({myMovies, addToFavorites}) => {

  const [favMovies, setFavMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    setLoading(true)
    const favsResponse = localStorage.getItem('favMovies')
    if(favsResponse !== null){
        setFavMovies(JSON.parse(favsResponse))
    } else{
        setFavMovies([])
    }
    setLoading(false)

    const checkFamilyCategory = () => {
    }
    checkFamilyCategory()
  }, [addToFavorites])

  return (
    <section className='mt-10'>
      <h1 className="font-bold text-stone-300 text-xl md:text-2xl flex items-center gap-2"><FaStar className="text-yellow-300 animate-pulse" /> My Favorites movies:</h1>

      <ul className="relative mt-4">

        <Carousel responsive={responsive}>
          { !loading && favMovies?.map( movie => (
            <MovieCard 
              key={movie.id}
              movie={movie}
              myMovies={myMovies}
              addToFavorites={addToFavorites}
            />
          ))} 
        </Carousel>

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

      { !loading && favMovies?.length === 0 && (
        <div className='flex items-center gap-2 text-sky-300'>
          <MdMovieFilter className='text-xl' />
          <p>Your list is empty. Add your favorite movies</p>
        </div>
      ) }
        
      </section>
  )
}

export default Favorites