'use strict';

let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
    name: 'Anna',
    age: 33,
};

const friend = me;
friend.age = 27;
console.log('Friend:', friend)
console.log('Me:',  me)

// PRIMITIVES (primitive types)
// number
// String
// Boolean
// undefined
// null
// Symbol
// BigInt

// OBJECTS (reference types)
// Object literal
// Arrays
// Functions
// Many more


// primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName= 'Davis';
console.log(lastName, oldLastName)

const  jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
};

// reference types
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log('Before:', jessica);
console.log('After:', marriedJessica);


// copying  objects

const  jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alice', 'Bobby']
};

// Object.assign creates a shallow property - first level only
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

//will modify the original object
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log(jessica2, jessicaCopy);

// to make a deep clone use external library such a lodash
