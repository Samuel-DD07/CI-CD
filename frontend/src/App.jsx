import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${apiUrl}/`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error)
  }, [apiUrl])

  return (
    <div className="App">
      <h1>Simple React + FastAPI</h1>
      {data ? (
        <p>Backend says: {data.message}</p>
      ) : (
        <p>Loading from backend...</p>
      )}
    </div>
  )
}

export default App
