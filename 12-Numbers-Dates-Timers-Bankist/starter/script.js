'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2021-10-28T21:31:17.178Z',
    '2021-10-28T07:42:02.383Z',
    '2021-10-29T09:15:04.904Z',
    '2021-10-30T10:17:24.185Z',
    '2021-10-31T14:11:59.604Z',
    '2021-11-01T17:01:17.194Z',
    '2021-11-02T23:36:17.929Z',
    '2021-11-03T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2021-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0); // to have a 0 when only one digit
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.loccale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    // in each call, print the remaining time
    
    // when 0 seconds, log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    //Decrease by 1 sec
    time--;
  };
  //set timer to 5 minutes
  let time = 600;
  // call timer every second
  tick()
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

// const day = `${now.getDate()}`.padStart(2, 0); // to have a 0 when only one digit
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);
//labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long', // long gives the word 2 digit gives with 0
      year: 'numeric', //2-digit,
      //weekday: 'long', // short, narrow
    };

    //const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    //Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan Date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);

  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

console.log(23 === 23.0);
console.log(0.1 + 0.2); // returns 0.30000000000000004
// base 10 - from 0 to 9 -> 1/10 = 0.1 3/10 = 3.333333
// binary base = 0 - 1 only
// JS is not for precise financial or scientific calculations

console.log(Number('23')); // is the same as :
console.log(+'23');

//Parsing a string to a number
console.log(Number.parseInt('30px'));
// must begin with a number =>
console.log(Number.parseInt('e23', 10)); // returns not a number

console.log(Number.parseFloat('2.5rem'));

// NaN
// check if value is NaN
console.log(Number.isNaN(20)); // returns false
console.log(Number.isNaN('20')); // returns false
console.log(Number.isNaN(+'20px')); // returns true
console.log(Number.isNaN(23 / 0)); // returns false
// => these are not the best way to check if the data-type is a number

// check if value IS a number
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20px')); // false
console.log(Number.isFinite(23 / 0)); // false

// check if number is int
console.log(Number.isInteger(20)); //true
console.log(Number.isInteger('20')); // false
console.log(Number.isInteger(+'20px')); // false
console.log(Number.isInteger(23 / 0)); // false

// MATH
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); // other way of calculating square root
console.log(8 ** 1 / 3); // only way to calculate cubic root

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2)); // does do type coercion so works
console.log(Math.max(5, 18, '23px', 11, 2)); // does not parseInt so return NaN

console.log(Math.min(5, 18, 23, 11, 2));

console.log(Math.PI * Number.parseFloat('10px') ** 2); // calculate area of circle of radius 10px

console.log(Math.random()); // returns random numbers
console.log(Math.trunc(Math.random() * 10) + 1); // returns int of between 0 and 10

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1); // generic formula for generating random numbers within a min-max
console.log(randomInt(10, 20));

// Rounding integers

console.log(Math.trunc(23.3)); // removes any decimal part
console.log(Math.round(23.3)); // rounds to closest int
console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24
console.log(Math.floor('23.3')); // 23
console.log(Math.floor(23.9)); // 23
// type coercion works
// trunc doesn't work well with negative numbers -> prefer floor

console.log((2.7).toFixed(0)); // returns a string
console.log((2.7).toFixed(3)); // returns a string
console.log((2.345).toFixed(2)); // returns a string
console.log(+(2.345).toFixed(2)); // returns a string

// REMAINDER operator

console.log(5 % 2); // 1
console.log(5 / 2); // 2.5
console.log(8 % 3); // 2
console.log(8 / 3); // 2.6666666666666665

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});

//working with bigInt
//biggest number javascript can safely represent =
console.log(2 ** 53 - 1); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); //9007199254740991

// ES2020 introduced BigInt to store large ints
console.log(45454184864564561891414811914646156n);
console.log(BigInt(45454184864564561891414811914646156));

//operations
console.log(100000n + 100000n);
console.log(2121545645121315465121255648684561212n + 15154164564n);
// cannot mix BigInt and other types
const huge = 454517864156145146454546544n;
const num = 23;

console.log(huge * BigInt(num));

// exceptions
console.log(20n > 15);
console.log(20n === 20); /// does not do type coercion

// Math operations don't work
///////////////////////////////////
// DATES
// create a date
const rightNow = new Date();
console.log(rightNow);

console.log(new Date('Wed Nov 03 2021 16:45:17'));
console.log(new Date('December 24, 2021'));
console.log(new Date(account1.movementsDates[0]));

// month in js is zero based
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31, 15, 23, 5)); // nov only has 30 days so jumps to dec 1

console.log(new Date(0)); // unix time
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after the date of zero 3 days, 24 hours 60 min 60 sec x 1000 to conver to milliseconds

// working with dates
const future = new Date(2037, 10, 19, 15, 23);

console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); //time between today and a given date in milliseconds -> 2142253380000
console.log(new Date(2142253380000));
console.log(Date.now());
console.log(new Date(1636020417606)); // today Thursday Nov 04

//set new year to future :
future.setFullYear(2040);
console.log(future);

console.log(Number(future)); // returns timestamp 2236947780000

const day1 = new Date(2037, 3, 14);
const day2 = new Date(2037, 3, 24);
const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
console.log(calcDaysPassed(day1, day2));

// FORMATTING NUMBERS

const number = 3884764.23;

const options = {
  style: 'currency', //then unit will be ignored
  unit: 'celsius',
  currency: 'EUR', //not defined by locale so has to be manually defined
  useGrouping: true,
};

console.log('US: ', new Intl.NumberFormat('en-US', options).format(number));
console.log(
  'Germany: ',
  new Intl.NumberFormat('de-DE', options).format(number)
);
console.log(
  'France:  ',
  new Intl.NumberFormat('fr-FR', options).format(number)
);
console.log('Syria  ', new Intl.NumberFormat('ar-SY', options).format(number));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(number)
);

const ingredients = ['olives', 'truffles', 'buffala'];
const pizzaTimer = setTimeout(
  (...ing) => console.log(`Here is your pizza 🍕 with ${ing}`),
  3000,
  ...ingredients
);
console.log('waiting');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

setInterval(function () {
  const nowish = new Date();
  //console.log(nowish)
}, 1000);
