const movies = require('./data')

//The `movies` array from the file `src/data.js`.
// console.log('movies: ', movies);


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

// console.log(getAllDirectors(movies))

// // Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(data) {
  const newList = data.filter(el=>{
    return el.genre.includes("Drama") && el.director.includes('Steven Spielberg')
  })
  return newList.length
};

// console.log("how many movies",howManyMovies(movies))

// // Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(data) { 
  if (data.length>0){
  const average = data.reduce((acc, el)=>{ 
    if (el.score === undefined){return}
    return acc + el.score
  },0)/data.length;
  return average.toFixed(2)}
  else return 0
};

console.log("average all movies",scoresAverage(movies))

// // Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(data) {
  const dramaMovies = data.filter(el=> el.genre.includes('Drama'))
  if (dramaMovies.length>0){
  const average = dramaMovies.reduce((acc, el)=>{
    return acc + el.score
  },0)/dramaMovies.length;
  return average.toFixed(2)}
  else return 0;
};

// console.log("average drama movies",dramaMoviesScore(movies))

// // Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(data) {
   const sortedByYear = data.sort((prev, curr) => {
   if (prev.year>curr.year){return 1}
   if (prev.year<curr.year){return -1}
   if (prev.year === 0){return 0}
  });
  return sortedByYear
};

// console.log("sorted by year",orderByYear(movies))

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(data) {
  const first20 = [];
  const sortedByLetter = data.sort((prev, curr) => {
    if (prev.title>curr.title){return 1}
   if (prev.title<curr.title){return -1}
   if (prev.title === 0){return 0}
  });
   if (sortedByLetter.length>20){
   for (let i=0; i<20; i++){
     first20.push(sortedByLetter[i])
   }
   return first20}
    return sortedByLetter
};

console.log("sorted Alphabetic Order",orderAlphabetically(movies))

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(data) {
const minuteArray = [];
  data.forEach((el)=>{
   el.duration = el.duration.split("h");
   if (el.duration[1].includes("min")){
    el.duration = el.duration.join(" ").split("min").join(" ").split(" ");
    el.duration = el.duration[0]*60 + parseInt(el.duration[2])
   } else el.duration = el.duration[0]*60;
   minuteArray.push(el)
 }); 
 return minuteArray
};
// console.log("hours to minutes",turnHoursToMinutes(movies))

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(data) {
  const scores = [];
  const scoresByYear = {};
  const bestYear = [];
  //creates a new object with years and scores
  data.map((el)=>{
    if (el.year in scoresByYear){
      return scoresByYear[el.year].push(el.score)
    } else 
    return scoresByYear[el.year] = [el.score]
  });
  //calculates the averages of the scores
  for (const objEl in scoresByYear){
    scoresByYear[objEl] = scoresByYear[objEl].reduce((acc, score)=>{
   return acc+score
  },0)/scoresByYear[objEl].length;

   scores.push(scoresByYear[objEl])};
   //orders the years from smallest to bigger
   scores.sort((prev, actual)=>{
    return prev - actual
   });
   //find the right key(year) for the biggest value(score)
   const allEntries = Object.entries(scoresByYear);
   for(let i=0; i<allEntries.length; i++){
     if (allEntries[i][1] === scores[0]){
     bestYear.push(allEntries[i][0])}
   }
   return `The best year/s ${bestYear} with an average score of ${scores[0]}`
};
// console.log(bestYearAvg(movies))



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
