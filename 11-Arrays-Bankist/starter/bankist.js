'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  // sort ? -> is sort true / slice to create a copy because we are in the middle of the chain (can't use the spread)
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // for Each
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
            <div class="movements__value">${mov}€</div>
      </div>
      `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

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

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//EVENT HANDLERS

// Log in feature
let currentAccount;
const updateUI = function (acc) {
  //Display movements
  displayMovements(currentAccount.movements);

  //Display balance
  calcDisplayBalance(currentAccount);

  //Display summary
  calcDisplaySummary(currentAccount);
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

//Transfer money
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
    //Transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

// Request loan -> only grants loan if there is at least one deposit with at least one 10% of the requested loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    //update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
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
    //Delete account
    accounts.splice(index, 1);
    //Hide interface
    containerApp.style.opacity = 0;
  }
  inputTransferAmount.value = inputTransferTo.value = '';
  console.log();
});
// IndexOf we can search for a value and return it
// Index we can search and then manipulate the value

// FLAT

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

//FLATMAP

const overallBalance2 = accounts
  .flatMap(acc => acc.movements) // only goes one level deep
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log('movmentsUI', movementsUI);
});

// PRACTICE
// TOTAL SUM
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// FIND MOVS GREATER THAN 1000
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000).length;

console.log(numDeposits1000);

//same thing using reduce
const numDeposits1000Reduce = accounts
.flatMap(acc => acc.movements)
.reduce((count, cur) => cur >= 1000 ? count + 1 : count, 0);

console.log(accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000));
console.log(numDeposits1000Reduce);

// why ++ doesn't wor here => because we returning the previous value
let a = 10;
console.log("a ", a++)
console.log("a", a)
// we need to write use th prefix operator
let b = 10;
console.log("b ", ++b)

// create object which is sum of deposits and withdrawals
const {deposits, withdrawals} = accounts
.flatMap(acc => acc.movements)
.reduce((sums, cur) => {
  // cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
  sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; 
  return sums; 
}, {deposits: 0, withdrawals: 0})
console.log(deposits, withdrawals);

// CONVERT STRING TO TITLE CASE
// This is a nice title -> This Is a Nice Title

const convertTitleCase = function(title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
  .toLowerCase()
  .split(" ")
  .map(word => exceptions.includes(word) ?  word : word[0].toUpperCase() + word.slice(1))
  .join(" ");
  return capitalize(titleCase);


}
console.log(convertTitleCase("This is a nice title"));
console.log(convertTitleCase("This is a LONG title but not too long"));
console.log(convertTitleCase("and here is another title with an EXAMPLE"));
