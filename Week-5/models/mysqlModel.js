import mysql from 'mysql2/promise';

const config = {
  host: 'localhost',
  port: 3306,
  user: 'mysqlAdmin',
  password: '',
  database: 'moviesdb',
};

const connection = await mysql.createConnection(config);

export class mysqlMovieModel {
  static async getAll({ genre }) {
    const [movies] = await connection.query(
      'SELECT *, BIN_TO_UUID(id) id FROM movies;'
    );
    return movies;
  }

  static async getById({ id }) {
    const [movie] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movies WHERE id = UUID_TO_BIN(?);`,
      [id]
    );
    if (movie.length === 0) return null;
    return movie[0];
  }

  static async getBySearch({ criteria }) {
    const [movies] = await connection.query('SELECT * FROM movies;');
    switch (criteria) {
      case 'title':
        return movies.map((movie) => movie.title);
      case 'year':
        return movies.map((movie) => movie.year);
      case 'director':
        return movies.map((movie) => movie.director);
      case 'duration':
        return movies.map((movie) => movie.duration);
      case 'poster':
        return movies.map((movie) => movie.poster);
      case 'genre':
        const [genres] = await connection.query('SELECT name FROM genres;');
        return genres.map((genre) => genre.name);
      case 'rate':
        return movies.map((movie) => movie.rate);
      default:
        return movies;
    }
  }

  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      director,
      duration,
      poster,
      rate,
    } = input;
    const [uuidResult] = await connection.query('SELECT UUID() uuid;');
    const [{ uuid }] = uuidResult;
    try {
      await connection.query(
        'INSERT INTO movies(id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);',
        [uuid, title, year, director, duration, poster, rate]
      );
    } catch (error) {
      throw new Error('Error creating movie');
    }
    const [newMovie] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movies WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    );
    return newMovie[0];
  }

  static async delete({ id }) {
    await connection.query('DELETE FROM movies WHERE id = UUID_TO_BIN(?);', [
      id,
    ]);
  }

  static async update({ id, input }) {
    const [movie] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movies WHERE id = UUID_TO_BIN(?);`,
      [id]
    );
    if (movie.length === 0) return null;
    const movieToUpdate = {
      ...movie[0],
      ...input,
    };
    const { title, year, director, duration, poster, rate } = movieToUpdate;
    try {
      await connection.query(
        `UPDATE movies
          SET
            title = ?,
            year = ?,
            director = ?,
            duration = ?,
            poster = ?,
            rate = ?
          WHERE id = UUID_TO_BIN(?);`,
        [title, year, director, duration, poster, rate, id]
      );
    } catch (error) {
      throw new Error('Error updating movie');
    }
    const [updatedMovie] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movies WHERE id = UUID_TO_BIN(?);`,
      [id]
    );
    return updatedMovie[0];
  }
}
