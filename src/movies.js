const movies = require('./data')

//The `movies` array from the file `src/data.js`.
console.log('movies: ', movies);


// // Iteration 1: All directors? - Get the array of all directors.
// // _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// // How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(data) {
  const cleanList = [];
  const newList = data.map((movies)=>{
    return movies.director
  });
  newList.forEach(director => {
    if (cleanList.includes(director)){
    return;
    } else cleanList.push(director);
  })
  return cleanList
};

console.log(getAllDirectors(movies))

// // Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(data) {
  const newList = data.filter(el=>{
    return el.genre.includes("Drama") && el.director.includes('Steven Spielberg')
  })
  return newList.length
};

console.log("how many movies",howManyMovies(movies))

// // Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(data) {
  const average = data.reduce((acc, el)=>{
    return acc + el.score
  },0)/data.length;
  return parseFloat(average).toFixed(2);
};

console.log("average all movies",scoresAverage(movies))

// // Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(data) {
  const dramaMovies = data.filter(el=> el.genre.includes('Drama'))
  const average = dramaMovies.reduce((acc, el)=>{
    return acc + el.score
  },0)/dramaMovies.length;
  return [parseFloat(average).toFixed(2),dramaMovies.length] ;
};

console.log("average drama movies",dramaMoviesScore(movies))

// // Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(data) {
   const sortedByYear = data.sort((prev, curr) => {
   return prev.year - curr.year
  });
  return sortedByYear
};

console.log("sorted by year",orderByYear(movies))

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(data) {
  const first20 = [];
  const sortedByLetter = data.sort((prev, curr) => {
    if (prev.title < curr.title) {
      return -1;
  }
  if (prev.title > curr.title) {
      return 1;
  }
  return 0;
   });
   for (let i=0; i<20; i++){
     first20.push(sortedByLetter[i])
   }
   return first20
};

console.log("sorted Alphabetic Order",orderAlphabetically(movies))

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(data) {
data.forEach((el)=>{
   el.duration = el.duration.split("h").join(" ").split("min").join(" ").split(" ");
   el.duration = el.duration[0]*60 + parseInt(el.duration[2]) + "min"
 }); 
 return data
};
console.log("hours to minutes",turnHoursToMinutes(movies))

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(data) {
  const scores = [];
  const scoresByYear = {};
  const bestYear = [];
  data.map((el)=>{
    if (el.year in scoresByYear){
      return scoresByYear[el.year].push(el.score)
    } else 
    return scoresByYear[el.year] = [el.score]
  });
  for (const objEl in scoresByYear){
    scoresByYear[objEl] = scoresByYear[objEl].reduce((acc, score)=>{
   return acc+score
  },0)/scoresByYear[objEl].length;
   scores.push(scoresByYear[objEl])};
   scores.sort((prev, actual)=>{
    return prev - actual
   });
   const allEntries = Object.entries(scoresByYear);
   for(let i=0; i<allEntries.length; i++){
     if (allEntries[i][1] === scores[0]){
     bestYear.push(allEntries[i][0])}
   }
   return `${bestYear} year have the best average score for the movies that were released on that year`
};
console.log(bestYearAvg(movies))



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
