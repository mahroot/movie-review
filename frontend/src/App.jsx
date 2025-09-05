import React, { useEffect, useState } from 'react'
import { fetchMovies, addMovie } from './api.js'

export default function App() {
  const [movies, setMovies] = useState([])
  const [title, setTitle] = useState('')
  const [rating, setRating] = useState('')
  const [review, setReview] = useState('')
  const [posterUrl, setPosterUrl] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const load = async () => {
    try {
      const data = await fetchMovies()
      setMovies(data)
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    }
  }

  useEffect(() => { load() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })
    try {
      await addMovie({ title, rating, review, posterUrl })
      setTitle(''); setRating(''); setReview(''); setPosterUrl('')
      setMessage({ type: 'success', text: 'Movie added!' })
      load()
    } catch (e) {
      setMessage({ type: 'error', text: e.message })
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🎬 Movie Review App</h1>
        <p className="subtitle">Add a movie and see the list update instantly. Built for DevOps practice (Part 1: Docker local).</p>

        <div className="row">
          <form className="form" onSubmit={onSubmit}>
            <div>
              <label>Title</label>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Inception" required />
            </div>
            <div>
              <label>Rating (0–10)</label>
              <input value={rating} onChange={e => setRating(e.target.value)} placeholder="8.5" />
            </div>
            <div>
              <label>Review</label>
              <textarea rows="3" value={review} onChange={e => setReview(e.target.value)} placeholder="Short review..." />
            </div>
            <div>
              <label>Poster URL (optional)</label>
              <input value={posterUrl} onChange={e => setPosterUrl(e.target.value)} placeholder="https://..." />
            </div>
            <button type="submit">Add Movie</button>
            <div className="footer">
              {message.text && <span className={message.type === 'error' ? 'error' : 'success'}>{message.text}</span>}
            </div>
          </form>

          <div>
            <h3>Current Movies</h3>
            <div className="movies">
              {movies.map(m => (
                <div className="movie" key={m._id}>
                  {m.posterUrl ? <img src={m.posterUrl} width="54" height="80" style={{objectFit:'cover', borderRadius:8}}/> : null}
                  <div>
                    <h4>{m.title}</h4>
                    <small>Rating: {m.rating ?? 0} / 10</small>
                    {m.review ? <div><small>– {m.review}</small></div> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
