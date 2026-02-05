import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { searchMovies } from './services/movieService';
import './css/App.css';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    try {
      const results = await searchMovies(query);
      setSearchResults(results);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={<Home searchResults={searchResults} />} 
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;