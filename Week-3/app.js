const express = require('express');
const cors = require('cors');
const crypto = require('node:crypto');
const {
  validateMovie,
  validatePartialMovie,
} = require('./schemas/movieSchema');

const movies = require('./movies.json');

const app = express();
app.use(express.json()); //Middleware para capturar el body
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:1234',
        'http://127.0.0.1:5500',
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
  })
);
app.disable('x-powered-by');

/*const ACCEPTED_ORIGINS = [
  'http://127.0.0.1:5500',
  'http://localhost:3000',
  'http://localhost:8080',
];*/

app.get('/', (req, res) => {
  res.json({ message: 'pagina de inicio' });
});

/*app.get('/movies', (req, res) => {
  
});*/

app.get('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: 'Movie not found' });
});

app.get('/movies', (req, res) => {
  /*const origin = req.header('origin');
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }*/
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.includes(genre)
    );
    if (Object.keys(filteredMovies).length > 0) return res.json(filteredMovies);
    return res.json({ message: 'Not movies with that gender' });
  }
  res.json(movies);
});

app.post('/movies', (req, res) => {
  /*const { title, genre, year, director, duration, rate, poster } = req.body;
  const newMovie = {
    id: crypto.randomUUID(),
    title,
    genre,
    year,
    director,
    duration,
    rate,
    poster,
  };*/
  const result = validateMovie(req.body);
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.delete('/movies/:id', (req, res) => {
  /*const origin = req.header('origin');
  console.log(origin);
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }*/
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  movies.splice(movieIndex, 1);
  return res.json({ message: 'Movie deleted' });
});

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const result = validatePartialMovie(req.body);
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data,
  };
  movies[movieIndex] = updatedMovie;
  return res.json(updatedMovie);
});

/*app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin');
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
  }
  res.sendStatus(200);
});*/

app.use((req, res) => {
  res.json('<h1>Para donde va</h1>');
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
