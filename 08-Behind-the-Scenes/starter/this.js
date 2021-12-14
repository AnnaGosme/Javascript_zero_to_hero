'use strict';

console.log(this);

const calcAge = function(birthYear) {
    console.log(2037-birthYear);
    console.log(this);
}
calcAge(1988);


// arrow function does not get its own this so this refers to the parent scopee - here it is window
const calcAgeArrow = birthYear  => {
    console.log(2037-birthYear);
    console.log(this);
}
calcAgeArrow(1988);


const jonas = {
    year: 1991,
    calcAge: function() {
        console.log(this);
        // console.log(2037 - this.year);
    }
}
jonas.calcAge()

const matilda ={
    year: 2017,
}

matilda.calcAge = jonas.calcAge;
matilda.calcAge();


const f = jonas.calcAge;
f();

const arvo = {
    year: 1988,
    calcAge: function() {
        console.log(this);
        console.log(2037 - this.year);

        // add the variable self (or that) to use as this.
        // const self = this;
        // const isMillenial = function() {
        //     console.log(self)
        //     console.log(self.year >= 1981 && self.year <= 1996)
        // }
        // add the variable self (or that) to use as this.

        const isMillenial = () => {
            console.log(this)
            console.log(this.year >= 1981 && this.year <= 1996)
        }
        isMillenial();
    },
    greet: () => {
        console.log(this)
        console.log(`Hey ${this.firstName}`)
    // an arrow function does not get its own keyword
    }
};
arvo.greet();
console.log(this.firstName);
arvo.calcAge()


// Argument keyword only works in regular functions

const addExpr = function (a, b) {
    console.log(arguments);
    return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow = (a, b) => {
    console.log(arguments)
    return a + b;
};
addArrow(2, 5, 8)
