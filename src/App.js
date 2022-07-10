import { useEffect, useState } from 'react';
// import axios from 'axios';
import './App.css';
import { MovieList } from './components/movie-list';
import { Header } from './components/header';
import YouTube from 'react-youtube';
import { getByName, getWithVideos, pageTypeMap } from './api';

function App() {
  // const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [playTrailer, setPlayTrailer] = useState(false);
  const [availableTrailer, setAvailableTrailer] = useState(true);
  const [page, setPage] = useState(1);
  const [pageType, setPageType] = useState(Object.keys(pageTypeMap)[0]);
  const [isLoadMoreAvailable, setIsLoadMoreAvailable] = useState(true);
  // const fetchMovies = async (searchKey) => {
  //   // console.log(`${process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY}`);
  //   // const data = await fetch(`${API_URL}/discover/movie?api_key=${process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY}`);
  //   // console.log(data);
  //   // const res = await data.json();
  //   // console.log(res);
  //   const type = searchKey ? "/search/movie" : "/discover/movie";
  //   const { data: { results} } = await axios.get(`${API_URL + type}`, {
  //     params: {
  //       api_key: process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY,
  //       query: searchKey
  //     }
  //   });
  //   setSelectedMovie(results[0]);
  //   // console.log(data);
  //   // console.log("Results: ", results);
  //   selectMovie(results[0]);
  //   setMovies(results);
  // }

  // const fetchMovie = async (id) => {
  //   const { data } = await axios.get(`${API_URL}/movie/${id}`, {
  //     params: {
  //       api_key: process.env.REACT_APP_TRAILER_MOVIES_WATCH_API_KEY,
  //       append_to_response: 'videos'
  //     }
  //   })
  //   return data;
  // }

  const selectMovie = async (movie) => {
    setPlayTrailer(false);
    const data = await getWithVideos(movie.id);
    setSelectedMovie(data);
    checkAvailableTrailer(data);
    // console.log(data);
  }

  const checkAvailableTrailer = (movie) => {
    const isAvailable = Boolean(movie.videos.results.length);
    setAvailableTrailer(isAvailable);
    // console.log(movie.videos.results ? 'have video' : 'no video');
    // console.log(movie.videos.results.length ? 'have video' : 'no video');
  }

  useEffect(() => {
    // fetchMovies();
    async function callAPI() {
      const {results} = await pageTypeMap[pageType](); // getPopular();
      selectMovie(results[0]);
      // console.log(results);
      setMovies(results);
      setPage(1);
    }
    callAPI();
  }, [pageType]);

  useEffect(() => {
    async function callAPI() {
      const {results, totalPages} = await pageTypeMap[pageType](page);
      // setIsLoadMoreAvailable(totalPages <= page);
      // setIsLoadMoreAvailable(totalPages => page);
      // console.log(totalPages <= page);
      // console.log(totalPages => page);
      // console.log(totalPages > page);
      // console.log("Total Pages: ", totalPages);
      // console.log("Pages: ", page);
      setIsLoadMoreAvailable(totalPages > page);
      selectMovie(results[0]);
      // console.log(results);
      setMovies([...movies, ...results]);
    }
    callAPI();
  }, [page]);

  // const renderMovies = () => {
  //   return movies.map(movie => {
  //     return (
  //       // <>
  //       //   <h2>{movie.title}</h2>
  //       //   <p>{movie.vote_average}</p>
  //       // </>
  //       <MovieCard
  //         key={movie.id}
  //         movie={movie}
  //         // selectMovie={setSelectedMovie}
  //         selectMovie={selectMovie}
  //       />
  //     )
  //   })
  // }

  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(video => video.name === `Official Trailer`);
    const key = trailer ? trailer.key : selectedMovie.videos.results[0].key;

    return (
      <YouTube
        videoId={key}
        className="youtube-container"
        opts={{
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            // controls: 0,
          }
        }}
      />
    )
  }

  const searchMovies = async (e) => {
    e.preventDefault();
    // fetchMovies(searchKey);
    const results = await getByName(searchKey);
    setMovies(results)
    selectMovie(results[0]);
  }

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        setSearchKey={setSearchKey}
      />
      {/* <header className='header'>
        <h1>Trailer Movies Watch</h1>
        <form onSubmit={searchMovies}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)}/>
          <button type='submit'>Search</button>
        </form>
      </header> */}
      {/* <button type='button' className='page-type-current'>Popular</button>
      <button type='button'>Rated</button>
      <button type='button'>Upcoming</button> */}
      {Object.keys(pageTypeMap).map(item => {
        return <button className={item === pageType && 'page-type-current'} type='button' onClick={() => setPageType(item)}>{item}</button>
      })}
      <div className="hero" style={{backgroundImage: `url(${IMAGE_PATH + selectedMovie.backdrop_path})`}}>
        <div className='content'>
          {/* <YouTube
            // videoId='dQw4w9WgXcQ' // never gonna give you up
          /> */}
          {selectedMovie.videos && playTrailer && renderTrailer()}
          {
            availableTrailer &&
            <button className='button' onClick={() => setPlayTrailer(true)}>Play Trailer</button>
          }
          <h2 className='title'>{selectedMovie.title}</h2>
          <p className='overview'>{selectedMovie.overview}</p>
        </div>
      </div>
      <MovieList
        movies={movies}
        selectMovie={selectMovie}
        onLoadMore={() => setPage(page + 1)}
        isLoadMoreAvailable={isLoadMoreAvailable}
      />
      {/* <div className='container'>
        {renderMovies()}
        { isLoadMoreAvailable && <button type='button' className='btn-load-more' onClick={() => setPage(page + 1)}>lOAD MORE</button> }
      </div> */}
    </div>
  );
}

export default App;
