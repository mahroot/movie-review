const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchMovies() {
  const res = await fetch(`${API_URL}/api/movies`);
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}

export async function addMovie(data) {
  const res = await fetch(`${API_URL}/api/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || 'Failed to add movie');
  }
  return res.json();
}
