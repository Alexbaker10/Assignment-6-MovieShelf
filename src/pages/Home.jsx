import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getPopularMovies } from '../services/movieService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setError(null);
      } catch (err) {
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);


  const moviesToDisplay = searchResults || movies;

  return (
    <main className="main-content">
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <div className="content-header">
            <h2>{searchResults ? 'Search Results' : 'Popular Movies'}</h2>
            <p>Discover and save your favorite films!</p>
          </div>

          <MovieGrid movies={moviesToDisplay} />
        </>
      )}
    </main>
  );
};

export default Home;