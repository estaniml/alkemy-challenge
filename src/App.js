import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login';
import Header from './components/Header';
import List from './components/List';
import './index.css'
import Footer from './components/Footer';
import Detail from './components/Detail';
import SearchResults from './components/SearchResults';
import { useEffect, useState } from 'react';
import Favorites from './components/Favorites';

function App() {

  const [myMovies, setMyMovies] = useState([])

  const navigate =  useNavigate()
  
  useEffect(() => {

    const favMovies = localStorage.getItem('favMovies')
   
    if(favMovies === null ){
      setMyMovies([])
    } else {
      setMyMovies(JSON.parse(favMovies))
    }
  
  }, [])
  

  const addToFavorites = (id, img) => {

    const token = sessionStorage.getItem('token')
    const favMovies = localStorage.getItem('favMovies')
    let favs;

    if(!token){
      navigate('/login')
      return
    }
      
    if(favMovies === null ){
      favs = []
    } else {
      favs = JSON.parse(favMovies)
    }

    const data = {
      id: id,
      poster_path: img 
    }

    let movieIsInList = favs.find( favMovie => {
      return favMovie.id === data.id
    })

    if(!movieIsInList) {

      favs.push(data)
      localStorage.setItem('favMovies', JSON.stringify(favs))
      setMyMovies(favs)
    } else {

      let moviesLeft = favs.filter( favMovie => {
        return favMovie.id !== data.id
      })
      localStorage.setItem('favMovies', JSON.stringify(moviesLeft))
      setMyMovies(moviesLeft)

    }
  }
  
  return (
    <div>
      <Header 
        myMovies={myMovies}
      />

      <main className='w-full md:w-4/5 px-4 md:px-0 md:mx-auto mt-20 min-h-screen'>
        <Routes>
          <Route 
            path='/' 
            element={<List 
              addToFavorites={addToFavorites}
              myMovies={myMovies}
            /> } 
          />

          <Route 
            path='/login' 
            element={<Login/> } 
          />

          <Route 
            path='/list' 
            element={<List 
              addToFavorites={addToFavorites}
              myMovies={myMovies}
            /> } 
          />

          <Route 
            path='/favorites' 
            element={<Favorites 
              addToFavorites={addToFavorites}
              myMovies={myMovies}
            /> } 
          />

          <Route 
            path='/detail/:id' 
            element={<Detail
              myMovies={myMovies}  
            /> } 
          />

          <Route 
            path='/search/:id' 
            element={<SearchResults 
              addToFavorites={addToFavorites}
              myMovies={myMovies}
            /> } 
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
