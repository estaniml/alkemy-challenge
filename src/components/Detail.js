import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingHeader from './LoadingHeader'
import { AiFillHeart } from 'react-icons/ai'
import { MdWarning } from 'react-icons/md'

const Detail = ({myMovies}) => {

  const [movieDetail, setMovieDetail] = useState({})
  const [loading, setLoading] = useState(false)
  const [checkFav, setCheckFav] = useState(false)
  const [error, setError] = useState({
    status: false,
    msg: ''
  })

  const topPage = useRef(null) 
  let { id } = useParams();

  useEffect(() => {
    topPage.current.scrollIntoView()
  }, [])
  


  useEffect(() => {

    setLoading(true)
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=957cc4425bba8222d653064c4c47d9b9&language=en-US`

    axios.get(url)
      .then( res => {
        const movieData = res.data
        setMovieDetail(movieData)
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
        console.log('hola');
      })
  }, [id])

  const ratingMovie = () => {
    if( movieDetail?.vote_average >= 9){
      return <span className='bg-blue-500 text-center w-7 h-6 p-1 rounded-md text-xs'>{movieDetail?.vote_average?.toString().slice(0,3)}</span>
    } else if( movieDetail?.vote_average >= 7){
      return <span className='bg-green-500 text-center w-7 h-6 p-1 rounded-md text-xs text-stone-900 font-bold'>{movieDetail?.vote_average?.toString().slice(0,3)}</span>
    } else if( movieDetail?.vote_average >= 5){
      return <span className='bg-orange-500 text-center w-7 h-6 p-1 rounded-md text-xs'>{movieDetail?.vote_average?.toString().slice(0,3)}</span>
    } else {
      return <span className='bg-red-500 text-center w-7 h-6 p-1 rounded-md text-xs'>{movieDetail?.vote_average?.toString().slice(0,3)}</span>
    }
  }

  useEffect(() => {
    const movieFav = myMovies?.some( myMovie => myMovie.id === movieDetail?.id)
    setCheckFav(movieFav)  
    
  }, [myMovies, movieDetail])
  
  console.log(movieDetail);
  return (
    <div className='absolute lg:relative left-0 top-12 lg:-top-4' ref={topPage}>
      { !loading ? (
        <div className='w-full h-80 md:h-96 max-h-80 relative overflow-hidden'>
          { movieDetail?.backdrop_path ? (
            <img 
              src={`https://image.tmdb.org/t/p/w500/${movieDetail?.backdrop_path}`}
              alt={movieDetail?.title}
              className='w-screen h-full'
            />
          ) : (
            <p className='p-10 flex items-center gap-2'><MdWarning /> No image found</p>
          )}
          <span className='absolute w-full h-80 bg-gradient-to-t from-black via-black/50 to-black/0 bottom-0'></span>
        </div>
      ) : (
        <LoadingHeader />
      )}

      { movieDetail?.backdrop_path && (
        <img 
          src={`https://image.tmdb.org/t/p/w500/${movieDetail?.backdrop_path}`}
          alt={movieDetail?.title}
          className='w-screen h-72 absolute -top-60 md:-top-20 -z-40 blur-3xl'
        />
      )}

      { error.status && (
        <p className="mt-4 border border-stone-700 p-4 text-center rounded-lg text-red-500">{error.msg}</p>
      )}

      <div className='w-full bg-gradient-to-t from-black via-black/50 to-black/0 flex flex-col items-start md:items-end md:flex-row gap-4 px-4'>
        <p className='text-2xl md:text-4xl font-bold tracking-wide'>{movieDetail?.original_title}</p>
        <div className='w-full md:w-fit flex gap-4 items-center px-3 py-1 bg-stone-900/50 shadow-sm shadow-stone-900 rounded text-sm md:text-md'>

          { checkFav && (<AiFillHeart className='text-lg md:text-2xl text-red-500' />)}

          <p className='font-light flex items-center gap-1'>Rating: {ratingMovie()}  <small>( {movieDetail?.vote_count} )</small></p>
          
          <p className='font-light'>Duration: {movieDetail?.runtime}min</p>

          <p className='font-light'>Year: {movieDetail?.release_date?.slice(0,4)}</p>

          { movieDetail?.adult && (
            <p className='text-red-500 font-bold'>Adult</p>
          )}
        </div>
      </div>

      <ul className='mt-4 px-4 flex items-center gap-4 text-sm font-light text-stone-300'>
        #{movieDetail?.tagline}
        { movieDetail?.genres?.map( genre => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>

      <p className='mt-4 px-4 w-full md:w-4/5 flex items-center gap-4 text-md font-light text-stone-100'>
        {movieDetail?.overview}
      </p>

      <div className='mt-6 px-4 flex items-center gap-2'>
        <button className='bg-white text-black px-4 py-3 rounded-lg font-bold uppercase text-sm hover:opacity-90 shadow-xl shadow-stone-800 hover:shadow-stone-700 transition-all duration-300 ease-linear'>Watch</button>

        <a 
          target='_blank' 
          rel="noreferrer" 
          className='hover:underline-offset-4 hover:underline text-sm rounded-lg px-4 py-2 transition-all duration-300 ease-linear' 
          href={movieDetail?.homepage}
        >
          Visit homepage
        </a>
      </div>
    </div>
  )
}

export default Detail