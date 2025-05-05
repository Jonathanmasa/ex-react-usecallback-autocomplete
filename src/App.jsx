import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (query === '') {
      setSuggestions([])
      return
    }

    fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`)
      .then(res => res.json())
      .then(data => {
        setSuggestions(data)
      })
      .catch(err => {
        console.error('Errore nella chiamata API:', err)
        setSuggestions([])
      })
  }, [query])

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Cerca un prodotto..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App

