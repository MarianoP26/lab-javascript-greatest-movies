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
function moviesAverageOfDirector(array) {
  return (
    Math.round((array.reduce((total, next) => total + next.score,0) / array.length) * 100) / 100
  );
}

function dramaAverageScore(array) {
  return Math.round(array.filter((movie) => movie.genre.includes("Drama")).reduce((total, next) => total + next.score, 0) / array.length);
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

function orderAlphabetically2(array) {
  return array.sort((a,b) => a.title.localeCompare(b.title)).map((movies) => movies.title).slice(0, 20);
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
  const cloneMovieArray = JSON.parse(JSON.stringify(array));
  // 2nd -> Replace cloneMovieArray.duration from "#h #min" to "#" (minutes)
  return cloneMovieArray.map((movie) => {
    // Regex exp to remove letters from value
    movie.duration = movie.duration.replace(/\D+/gi, '');
    movie.duration = movie.duration.charAt(0) * 60 + Number(movie.duration.slice(1));
    // string.charAt to target the hours value & slice(1) to select the minutes value
    return movie;
  });
}

// LEVEL 3

// Exercise 8: Get the best film of a year
function bestFilmOfYear(array, year) {
  const cloneMovieArray = JSON.parse(JSON.stringify(array));
  // 2nd -> Create [] w/movies from the same year
  const sameYearMovies = cloneMovieArray.map((movie) => movie.year === year);
  // 3rd -> Create [] w/same year movies' scores
  const sameYearMoviesScores = sameYearMovies.map((movie) => movie.score);
  // 4th -> Find highest score in the previous [].
  const bestScore = sameYearMoviesScores.reduce((best, movie) =>
    movie.score > best ? movie.score : best
  );
  // 5th -> Find bestFilmOfYear
  return sameYearMovies.filter((movie) => movie.score === bestScore);
}

function scoresAverage(moviesArray) {
  let totalSum = 0;

  const scores = moviesArray.map((movie) => movie.score);
  for (let i = 0; i < scores.length; i++) {
    totalSum = scores[i] + totalSum;
  }
  const accruedMovieScore = totalSum / moviesArray.length;
  return accruedMovieScore.toFixed(2);
}

function bestFilmOfYear2(array) {
  
  if (array.length === 0) {
    return null;
  } else {
    const moviesByYear = orderByYear(array);
    // control variables
    let lastCheckedYear = 0;
    let biggestAverage = 0;
    let bestYear = 0;
    for (i = 0; i < moviesByYear.length; i++) {
      if (moviesByYear[i].year > lastCheckedYear) {
        // Filter by the year we are at
        const justThisYearMovies = moviesByYear.filter(value => {
          if (value.year === moviesByYear[i].year) {
            return true;
          } else {
            return false;
          }
        });
        // calculate average of the year and save rate and year
        if (scoresAverage(justThisYearMovies) > biggestAverage) {
          biggestAverage = scoresAverage(justThisYearMovies);
          bestYear = moviesByYear[i].year;
        }
        lastCheckedYear = moviesByYear[i].year;
      }
    }
    return `The best year was ${bestYear} with an average rate of ${biggestAverage}`;
  }
}

console.log(bestFilmOfYear2(movies));

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