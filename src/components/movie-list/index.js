import { MovieCard } from "../movie-card"

export function MovieList({movies, selectMovie, onLoadMore, isLoadMoreAvailable}) {
    const renderMovies = () => {
        return movies.map(movie => {
          return (
            // <>
            //   <h2>{movie.title}</h2>
            //   <p>{movie.vote_average}</p>
            // </>
            <MovieCard
              key={movie.id}
              movie={movie}
              // selectMovie={setSelectedMovie}
              selectMovie={selectMovie}
            />
          )
        })
      }
    return (<div className='container'>
    {renderMovies()}
    { isLoadMoreAvailable && <button type='button' className='btn-load-more' onClick={onLoadMore}>lOAD MORE</button> }
  </div>)
}