// The `movies` array from the file `src/data.js`.
console.log('movies: ', movies);


// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(movies) {
// Iteration 1: we map through the movies array and create a NEW array (directorsListRaw) to hold the names of all movie directors
const directorsListRaw = movies.map((movie) => movie.director);

// Bonus - to clean up the duplicate names of the directorsListRaw array, we filter the list to remove the duplicate ones
const directorsListCleaned = directorsListRaw.filter(
  (director, index) => directorsListRaw.indexOf(director) === index
);
return directorsListCleaned;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  // 1st we filter the original array to create a new one "filteredMovies". To filter it we define the 2 conditions we need to "check"
  const filteredMovies = movies.filter((movie) => {
    return (
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    );
  });

  // 2nd as the ask us for the NUMBER of drama movies, we can check the length of our new filteredMovies array
  return filteredMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  if (movies.length === 0) return 0;
  // Current value here represents each movie we are iterating through. That's why we can access to the its score
  const totalScore = movies.reduce((accumulator, currentValue) => {
    if (currentValue.score) {
      return accumulator + currentValue.score;
    } else {
      return accumulator;
    }
  }, 0);

  // Heads up! the method *toFixed* returns a STRING NOT a NUMBER
  const averagScoreString = (totalScore / movies.length).toFixed(2); // Option: already convert the string to  number with Number((totalScore / movies.length).toFixed(2))

  return Number(averagScoreString);
}

/// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  // One option is to first create a new array where we store the FILTERED movies by it's gender: DRAMA. Then we can call the scoresAverage function and pass it the array
  const dramaMoviesArray = movies.filter((movie) =>
    movie.genre.includes("Drama")
  );

  if (dramaMoviesArray.length === 0) return 0;

  const avgDramaMoviesScore = scoresAverage(dramaMoviesArray);

  return avgDramaMoviesScore;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  // 1st make a copy of the Array as the SORT method MODIFIES the original array
  const moviesArrCopy = movies.map((movie) => movie);

  moviesArrCopy.sort((a, b) => {
    if (a.year > b.year) return a.year - b.year;
    if (a.year < b.year) return a.year - b.year;
    else return a.title.localeCompare(b.title);
  });

  return moviesArrCopy;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  return (
    movies
      .map((movie) => movie.title)
      // .sort((titleA, titleB) => {
      //   if(titleA > titleB) return 1;
      //   else if(titleA < titleB) return -1;
      //   return 0;
      // })
      .sort() // As we are comparing STRINGS the default sort method will automatically compare them by their Alphabetic Order
      .slice(0, 20)
  );
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
// Let's imagine we want to turn "2h" to minutes
function convertHours(hourString) {
  // ["2", ""]
  let calculateHour = hourString.split("h");
  return calculateHour[0] * 60;
  // "2" * 60
  // 120
}

// "33min"
function convertMinutes(minuteString) {
  // ["33", ""]
  let calculateMinutes = minuteString.split("min");
  return Number(calculateMinutes[0]);
  // return +(calculateMinutes[0]); // this is alternative fancier way
  // 33
}

function convertDuration(duration) {
  let timePieces = duration.split(" ");
  // ["2h", "33min"]
  // ["2h"]
  // ["33min"]

  let minutes = timePieces.reduce((sum, onePiece) => {
    if (onePiece.includes("h")) {
      return sum + convertHours(onePiece);
    }
    return sum + convertMinutes(onePiece);
  }, 0);

  return minutes;
}

function turnHoursToMinutes(movies) {
  let newCentArray = movies.map((movie) => {
    let newMovie = {};
    newMovie.title = movie.title;
    newMovie.year = movie.year;
    newMovie.director = movie.director;
    newMovie.duration = convertDuration(movie.duration);
    newMovie.genre = movie.genre;
    newMovie.rate = movie.rate;

    return newMovie;
  });

  return newCentArray;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  if (!movies.length) return null;

  let masterObject = {};

  movies.forEach((movie) => {
    if (!masterObject[movie.year]) {
      masterObject[movie.year] = [movie];
    } else {
      masterObject[movie.year].push(movie);
    }
  });

  let highest = 0;
  let theActualYear;
  for (let theYear in masterObject) {
    if (scoresAverage(masterObject[theYear]) > highest) {
      highest = scoresAverage(masterObject[theYear]);
      theActualYear = theYear;
    }
  }
  return `The best year was ${theActualYear} with an average score of ${highest}`;
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
