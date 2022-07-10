import React from "react";

const MovieCard = ({movie, selectMovie}) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
    // console.log(movie);
    return(
        <div className="movie-container" onClick={() => selectMovie(movie)}>
            {movie.poster_path  
            ?    <img className="movie-cover" src={IMAGE_PATH + movie.poster_path} alt={movie.title}/>
            :    <div className="movie-placeholder">No Image Found</div>
            }
            <h2 className="movie-title">{movie.title}</h2>
            <p className="movie-vote" title={'All votes: ' + movie.vote_count}>{movie.vote_average}</p>
        </div>
    )
}

export { MovieCard };
// export default MovieCard;