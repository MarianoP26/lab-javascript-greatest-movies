// LEVEL 1

// Exercise 1: Get the array of all directors.
function getAllDirectors(array) {
  // array.map() method to iterate [] & create a new [] w/just the directors
  return array.map((movies) => movies.director);
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(array, director) {
  // array.filter() method to create new array w/just films of a certain director
  return array.filter((movies) => movies.director === director);
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
  // 1st -> spread operator to clone original array so it doesn´t mutate it if we change the new array
  const cloneMovieArray = [...array];
  // 2nd -> array.sort() method to classify movies titles from A to Z (aaa, aab, abb, abc, acb...)
  const moviesByAlphaOrder = cloneMovieArray.sort((movieA, movieB) =>
    // string.localeCompare() method returns a number indicating whether a reference string comes before, or after, or is the same as the given string in sort order.
    movieA.title.localeCompare(movieB.title)
  );
  // 3rd -> Create an array w/just the titles
  const moviesTitles = moviesByAlphaOrder.map((movies) => movies.title);
  // 4th -> array.slice() method to create a new array w/just the first 20 elements
  return moviesTitles.slice(0, 20);
}
// Exercise 5: Order by year, ascending
function orderByYear(array) {
  // 1st -> spread operator to clone original array so it doesn´t mutate it if we change the new array
  const cloneMovieArray = [...array];
  // 2nd -> concatenate 2 array.sort() methods -> 1st to classify movies by their titles from A to Z (aaa, aab, abb, abc, acb...) and the second sort to arrange them in ascending order by year
  return cloneMovieArray
    .sort((a, b) => {
      if (a.title < b.title) return -1;
    })
    .sort((a, b) => a.year - b.year); 
}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(array, genre) {
  // 1nd -> Filter() method to create [] w/just the movies that have "genre" key from [] of movies w/score
  const moviesByGenre = array.filter((movies) => {
    if (movies.genre.includes(genre) && movies.score != false) {
      return movies;
    }
  });
  // 2rd -> Map() method to create a new [] w/all the scores
  const moviesByGenreScores = moviesByGenre.map((movies) => movies.score);
  // 3th -> Find score average
  const initialValue = 0;
  // 3.1 -> Find total score of movies by genre (using same formula as in Ex_3)
  const totalScore = moviesByGenreScores.reduce((a, b) => a + b, initialValue);
  // parseFloat to convert avg (string) to a number
  return parseFloat(totalScore / moviesByGenreScores.length);
}

// LEVEL 2

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