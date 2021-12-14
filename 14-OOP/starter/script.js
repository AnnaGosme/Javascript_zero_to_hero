'use strict';

const Person = function (fullName, birthYear) {
  this.fullName = fullName;
  this.birthYear = birthYear;

  // NEVER put functions in constructor objects -> use prototypes and prototypal inheritance
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const arvo = new Person('Arvo', 2019);
console.log(arvo);

//  calling with NEW
// 1.New {} is created
// 2. function is called 'this' = {};
// 3. {} linked to prototype
// 4. function automatically returns {}

const anna = new Person('Anna', 1988);
const charles = new Person('Charles', 1985);
console.log(anna, charles);

console.log(arvo instanceof Person);

// Prototypes
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

arvo.calcAge();
anna.calcAge();
charles.calcAge();

console.log(arvo.__proto__);
console.log(arvo.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(arvo)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = 'Homo Sapiens';
console.log(arvo.species, anna);

console.log(arvo.hasOwnProperty('fullName')); // true
console.log(arvo.hasOwnProperty('species')); // false

console.log(arvo.__proto__);
console.log(arvo.__proto__.__proto__);
console.log(arvo.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 4, 4, 5, 6, 9, 8, 7]; // new Array is same as []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

// create new prototype methods for a dataset
Array.prototype.unique = function () {
  return [...new Set(this)]; // sets don't repeat if same values at diff indexes
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1);
console.dir(x => x + 1);

// ES6 class expression

const PersonCL = class {};

// ES6 class declaration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // instance methods will be added to the prototype property

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`hi ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1988);
console.log(jessica);
jessica.calcAge();
jessica.greet();
console.log(jessica.age);

//proof part of the prototype
// PersonCl.prototype.greet = function () {
//   console.log(`Hi ${this.fullName}`)
// }

const walter = new PersonCl('Walter White', 1965);

PersonCl.hey();

//Classes are not hoisted so can not be used before being declared
// Classes are first class citizens -> can be used and returned in functions
// Classes are executed in strict mode even if not activated.

// GETTERS AND SETTERS
const account = {
  owner: 'AArvo',
  movements: [200, 300, 400, 600],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);

account.latest = 50;
console.log(account.movements);

// STATIC METHODS

console.log(Array.from(document.querySelectorAll('h1')));

//not inherited because is not in protoytpe of Person
Person.hey = function () {
  console.log('Hi there');
};
Person.hey();

// Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

//weird way to create objects programatically
const steven = Object.create(PersonProto);
(steven.name = ' Steven'), (steven.birthYear = 2002);
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// INHERITANCE BETWEEEN CLASSES

const Student = function (fullName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  Person.call(this, fullName, birthYear)
  this.course = course;
};

//Linking prototypes
Student.prototype = Object.create(Person.prototype)

Student.prototype.introduce = function() {
  console.log(`Hi my name is ${this.fullName} and I study ${this.course}`)
}

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__)

console.log(mike instanceof Student)
console.log(mike instanceof Person)
console.log(mike instanceof Object)

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// INHERITENCE BETWEEN CLASSES ES6

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // always needs to happen first
    super(fullName, birthYear)
    this.course = course
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`)
  }

  calcAge() {
    console.log(`I'm ${2037 - this.birthYear} but I feel ${2037 - this.birthYear + 10} years old`)
  }
}

// const martha = new StudentCl('Martha Jones', 2012)
const martha = new StudentCl('Martha Jones', 2012, 'Computer Science')
martha.introduce();
martha.calcAge();


// Object.create

const steve = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course){
  PersonProto.init.call(this, firstName, birthYear)
  this.course = course;
}

StudentProto.introduce = function ()  {
  console.log(`My name is ${this.firstName} and I study ${this.course}`)
}

const jay = Object.create(StudentProto);
jay.init('Jay', 1975, 'Videography');
jay.introduce();
jay.calcAge();

// Another class example - data privacy & encapsulation

class Account {
  // public fields
  locale  = navigator.language;
  
  // private fields: available on the instance not the prototype
  #movements = [];
  #pin;
  

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    
    this.#pin = pin;
    // this._movements = []; //protected property
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account ${owner}`)
  }

  //Public Interface 

  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }
    // private methods doesn't work yet
  //#approveLoan() { // chrome sees this as a field not a method right now
  _approveLoan() {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`loan approved`)
    }
    return this;
  }

  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(40);
console.log(acc1.getMovements) //correct waay to access movements without modifying them
// acc1._movements.push(350) -> works but by convention shouldn't be done
//acc1.movements.push(-300)

//acc1.approveLoan(1000) -> should not be accessible -> need data encapasulation & data privacy
console.log(acc1)
//console.log(acc1.#movements) doesn't work 
// Encapsulation: Private class fields  and methods

// Public fields
// Private fields
// public methos
// Private methods
// and the static versions
Account.helper();

// CHAINING METHODS
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(4000);
