//Julia and Kate are doing a study on dogs. Each of them asked 5 dog owners aabout theur dog's age, and stored the data into an array (one array each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and is a puppy if it is less than 3 years old.
// Create a function 'checkDogs' which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate') and does the following:
//1. Julia found that the owners of the first and last two dogs actually have cats not dogs => create a shallow copy of Julia's array and remove the cats from that copied array (it's bad practice to mutate function parameters)
//2. Create an array with both Julia's corrected array and Kate's data.
//3. For each remaining dog console.log whether it is an adult ('Dog number 1 is an adult, and is 5 years old') or a puppy ('Dog number 2 is still a puppy').
//4. Run the function for both test datasets:

// Test Data 1:
const julia = [3, 5, 2, 12, 71];
const kate = [4, 1, 15, 8, 3];

// Test Data 2:
//Julia: [9, 16, 6, 8, 3]
//Kate:  [10, 5, 6, 1, 4]

const checkDogs = function (dogsJulia, dogsKate) {
  //   const newDogsJulia = dogsJulia.slice(1, -1);
  const newDogsJulia = dogsJulia.slice();
  newDogsJulia.splice(0, 1);
  newDogsJulia.splice(-2);

  //   const allDogs = [...newDogsJulia, ...dogsKate];
  const allDogs = newDogsJulia.concat(dogsKate);
  console.log(allDogs);

  allDogs.forEach(function (dog, index) {
    dog >= 3
      ? console.log(
          `Dog number ${index + 1} is an adult, and is ${dog} years old`
        )
      : console.log(`Dog number ${index + 1} is still a puppy`);
  });
};

checkDogs(julia, kate);

// Challenge 2

// Julia and Kate want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Create a function 'calcAverageHumanAge' which accepts an array of dog's ages ('ages') and does the following things in order:

// 1. Calculate the dogs' ages in human years using the following formula :
//if the dog is <= 2 years old, humanAge = 2 * dogAge
//if the dog is > 2 years old, humanAge = 16 + dogAge * 4

//2. Exclude all dogs that are less than 18 human years old (keeping dogs that are at least 18 years old).

//3. Calculate the average human age of all adult dogs.

//4. Run the function for both test datasets

const avg1 = [5, 2, 4, 1, 15, 8, 3];
const avg2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function(ages) {
//   let humanAge = 0
//   let newDogs = [];
//   for (const age in ages) {
//     if (age <= 2) {
//       humanAge = 2 * age;
//     } else if (age > 2) {
//         humanAge = 16 + age * 4;
//     };
//     if (humanAge => 18) {
//       newDogs.push(humanAge);
//       console.log(humanAge);
//       console.log(newDogs);
//     };
//     const averageHumanAge = newDogs.reduce((acc, age) => {
//        let average = (acc + age) / age.length;
//        return average
//     }, 0);
// };
// }

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  const adults = humanAges.filter(age => age >= 18);
  console.log(adults);

  //   const average = adults.reduce((acc, age)=> acc + age, 0)
  //  / adults.length;
  const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

  return average;
};

console.log(calcAverageHumanAge(avg1));
console.log(calcAverageHumanAge(avg2));

//Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function using chaining.

const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge2(avg1));
console.log(calcAverageHumanAge2(avg2));

//CHALLENGE 4
console.log('Challenge 4');
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

/*Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).*/
/*Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)*/

dogs.forEach(dog => dog.recFood = Math.trunc(dog.weight ** 0.75 * 28));

console.log(dogs);

/*Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓*/
//1. Find Sarah's dog

const dogSarah = dogs.find(dog => dog.owners.includes("Sarah")); //includes returns boolean and find returns first value
console.log("Sarah's dog: ", dogSarah);
console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? "much" : "little"}`);


//Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

// const ownersEatTooMuch = [];
// const ownersEatTooLittle = [];

// dogs.filter(dog => dog.curFood > dog.recFood ? ownersEatTooMuch.push(dog) : ownersEatTooLittle.push(dog));
// console.log("too little: ", ownersEatTooLittle)
// console.log( "too much", ownersEatTooMuch)

const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood).flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood).flatMap(dog => dog.owners);
console.log(ownersEatTooLittle)

//Log a string to the console for each array created in 3.,like this: "Matilda and Sarah and John's dogs eat too much!" and "Alice and Bob and Michael's dogs eat too little!"

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`)
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`)

// Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
console.log(dogs.some(dog => dog.curFood === dog.recFood));


// Log to the console whether there is any dog eating an okay amount of food (just true or false) (10% above and 10% below the recommended portion => current > (recommended * 0.90) && current < (recommended * 1.10))

const dogOkFood = dog => dog.curFood > dog.recFood * 0.90 && dog.curFood < dog.recFood * 1.10;
console.log(dogs.some(dogOkFood));

//Create an array containing the dogs that are eating an okay amount of food(try to reuse the condition used in 6.)

console.log(dogs.filter(dogOkFood));

// Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)

const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
