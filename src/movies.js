const movies = require('./data.js')

// Exercise 1: Get the array of all directors.
function getAllDirectors(array) {
  // array.map() method to iterate [] & create a new [] w/just the directors
  return array.map((movies) => movies.director);
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(array, director) {
  // array.filter() method to create new array w/just films of a certain director
  return array.filter((movies) => movies.director === director && movies.genre.includes("Drama")) ;
}

// Exercise 3: Calculate the average of the films of a given director.
function moviesAverageOfDirector(array, director) {
  const initialValue = 0;
  // 1st -> array films of a certain director
  const certainDirectorFilms = array.filter(
    (movies) => movies.director === director
  );
  // 2nd -> array.reduce() method to reduce down [] to just one total score & math.round() to return total of a director´s movies score w/only 2 decimals,
  return (
    Math.round(
      (certainDirectorFilms.reduce(
        (total, next) => total + next.score,
        initialValue
      ) /
        certainDirectorFilms.length) *
        100
    ) / 100
  );
}

// Exercise 4:  Alphabetic order by title
function orderAlphabetically(array) {
  const cloneMovieArray = [...array];
  const moviesByAlphaOrder = cloneMovieArray.sort((movieA, movieB) =>
    movieA.title.localeCompare(movieB.title)
  );
  const moviesTitles = moviesByAlphaOrder.map((movies) => movies.title);
  return moviesTitles.slice(0, 20);
}
// Exercise 5: Order by year, ascending
function orderByYear(array) {
  const cloneMovieArray = [...array];
  return cloneMovieArray
    .sort((a, b) => {
      if (a.title < b.title) return -1;
    })
    .sort((a, b) => a.year - b.year); 
}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(array, genre) {
  const moviesByGenre = array.filter((movies) => {
    if (movies.genre.includes(genre) && movies.score != false) {
      return movies;
    }
  });
  const moviesByGenreScores = moviesByGenre.map((movies) => movies.score);
  const initialValue = 0;
  const totalScore = moviesByGenreScores.reduce((a, b) => a + b, initialValue);
  return parseFloat(totalScore / moviesByGenreScores.length);
}

// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes(array) {
  /* 1st -> Deep cloning original array so that "duration" sub values are disconnected from original array. First, I
  stringify [] and parse it right after.This method allows deep cloning w/out knowing its structure */
  const cloneMovieArray = JSON.parse(JSON.stringify(array));
  // 2nd -> Replace cloneMovieArray.duration from "#h #min" to "#" (minutes)
  return cloneMovieArray.map((movie) => {
    // Regex exp to remove letters from value
    movie.duration = movie.duration.replace(/\D+/gi, '');
    movie.duration =
      // string.charAt to target the hours value & slice(1) to select the minutes value
      movie.duration.charAt(0) * 60 + Number(movie.duration.slice(1));

    return movie;
  });
}

// LEVEL 3

// Exercise 8: Get the best film of a year
function bestFilmOfYear(array, year) {
  // 1st -> Deep cloning [] so that original is not update & the sub values are disconnected from original []
  const cloneMovieArray = JSON.parse(JSON.stringify(array));
  // 2nd -> Create [] w/movies from the same year
  const sameYearMovies = cloneMovieArray.filter((movie) => movie.year === year);
  // 3rd -> Create [] w/same year movies' scores
  const sameYearMoviesScores = sameYearMovies.map((movie) => movie.score);
  // 4th -> Find highest score in the previous [].
  const bestScore = sameYearMoviesScores.reduce((best, movie) =>
    movie.score > best ? movie.score : best
  );
  // 5th -> Find bestFilmOfYear
  return sameYearMovies.filter((movie) => movie.score === bestScore);
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear
  };
}