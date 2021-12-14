'use strict';
// LECTURES
// Looping over arrays
// FOREACH => loops over without creating a new array
// MAP => creates a brand new array  - applies a callback function to each element and returns a new array
// FILTER => filters for elements in the original array which satisfies a condition - returns a new array with the elements that return true to the condition
// RE£DUCE => reduces all the array elements down to one single value.

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE => new array

console.log(arr.slice(2)); // returns new array
console.log(arr.slice(2, 4)); // length is end parameter - beginning parameter
console.log(arr.slice(-2)); //starts at the end of the array
console.log(arr.slice(1, -2)); //extracts everything minus the last two

console.log(arr.slice()); // creates new array
// exactly the same as spread operator to create new array
//use slice when chaining methods

//SPLICE => mutates array by taking out parts and leaves behind

// console.log(arr.splice(2));
console.log(arr.splice(-1)); // deletes last element
console.log(arr.splice(1, 2));
console.log(arr);

//Reverse => mutates the original array

const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

//Concat => does not mutate

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // same as this spread solution

//join
console.log(letters.join(' - ')); // joins into a string

// LOOPING USING FOREACH

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//doing it with a for in loop
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
    //Math.abs returns the absolute value of a number
  }
}
console.log('-------FOR EACH--------');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
    //Math.abs returns the absolute value of a number
  }
});

// access counter variable in for of loop
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
    //Math.abs returns the absolute value of a number
  }
}

console.log('-------FOR EACH--------');
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
    //Math.abs returns the absolute value of a number
  }
});

// you cannot break out of a forEach loop -> will always loop over entire array
//Map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//Set

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

const eurToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return mov * eurToUsd;
});

// same function in arrow form
const movementsArrow = movements.map(mov => mov * eurToUsd);
console.log(movementsArrow);

console.log(movements); // is unchanged
console.log(movementsUSD); // returns new array

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You deposited ${
      mov > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(mov)}`
);
console.log(movementsDescriptions);

// Map method
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];
const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

console.log(accounts);

// Filter
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// Reduce

console.log(movements);
//acc = accumulator
// const balance = movements.reduce(function(acc, cur, i, arr) {
//     console.log(`Iteration ${i}: acc ${acc}`)
//    return acc + cur
// }, 0); // inital value of accumulator
// console.log(balance);
const balance = movements.reduce((acc, cur) => acc + cur, 0); // inital value of accumulator
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Max value => reduce

const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

// CHAINING METHODS

const totalDepositsUSD = movements
  // .filter(mov => mov < 0)
  .filter(mov => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

// chain order needs the previous ones to return an array => PIPELINE
// use the third parameter arr to console.log to debug

// FIND => callback function that returns a boolean - first element satisfying the condition so not an array
// FILTER RETURNS NEW ARRAY  / FIND RETURNS ONE ELEMENT

const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// SOME AND EVERY
console.log(movements);
// -> includes seeks Equality
console.log(movements.includes(-130)); // true

//SOME checks for positive movements
// -> Condition
const anyDeposits = movements.some(mov => mov > 5000); // false
const anyDepositsTrue = movements.some(mov => mov > 0); // true
console.log(anyDeposits, anyDepositsTrue);

// // EVERY only returns true if all the elements match the condition set out
console.log(movements.every(mov => mov > 0)); // false

// Separate callback -> reuse the same callback in different functions
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// FLAT -> only goes one level deep -> runs one 1 level deep
const arrFlat = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
console.log(arrFlat.flat()); //turns into one array;

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8, 9];
console.log(arrDeep.flat(2)); // modify depth by specifying the depth

// FLAT MAP combines flat and map

// SORTING ARRAYS
const owners = ['Arvo', 'Charles', 'Octavian', 'Miri'];
console.log(owners.sort()); // sorts alphabetically -> mutates the original array
console.log(owners); // array is mutated

console.log(movements);
//console.log(movements.sort()); // doesn't give ordre croissant result because converts everything to strings [-130, -400, 1300, 200, 3000, 450, 70] -> first digit is in order
// return < 0 A  - B (keep order)
// return > 0 B - A (switch order)
// Ascending order ->
// movements.sort((a, b) => {
//   if (a > b)
//     return 1;
//   if (b > a)
//   return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending order ->
// movements.sort((a, b) => {
//   if (a > b)
//     return -1;
//   if (b > a)
//   return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);

// Creating and filling
const x = new Array(7);
console.log(x);

x.fill(1, 3, 5);
console.log(x);

const arrFill = [1, 2, 3, 4, 5, 6, 7];
console.log(arrFill.fill(23, 4, 6)); // mutates original array

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (cur, i) => i + 1);

// create and fill arrays

const arrayyay = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const a = new Array(7);
console.log(a);
//console.log(a.fill(1));
console.log(a.fill(1, 3, 5)); //specify the value, the start index the final index

arrayyay.fill(23, 2, 6);
console.log(arrayyay);

//Array.from
const b = Array.from({ length: 7 }, () => 1);
console.log(b);

const c = Array.from({ length: 7 }, (_, i) => i + 1); //gives values from 1 to 7 based on the index // _ is a throwaway parameter not used again
console.log(c);


