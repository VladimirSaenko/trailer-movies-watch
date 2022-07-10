export function Header({searchMovies, setSearchKey}) {
    return (
    <header className='header'>
        <h1>Trailer Movies Watch</h1>
        <form onSubmit={searchMovies}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)}/>
          <button type='submit'>Search</button>
        </form>
    </header>
    )
}