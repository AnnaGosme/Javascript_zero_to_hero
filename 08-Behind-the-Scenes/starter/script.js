
'use strict';

function caclAge(birthYear,) {
    const  age = 2037 - birthYear;
    function printAge() {
        let output = `${firstName} you are ${age}, born in ${birthYear}`;
        // will print 'Charles'
        console.log(output)

        if(birthYear >=1981 && birthYear <= 1996)  {
            var millenial = true;
            const firstName = 'Arvo';
            const str = `Oh and you're a millenial ${firstName}`
            // will print 'Arvo'
            // var variables are not block-scoped
            console.log(str);

            function add(a, b) {
                return a + b;
            }
            output = 'NEW OUTPUT';
            // is a reassignment of the let output variable in printAge() - is not the same variable as : 
            const output = 'NEW OUTPUT'
            // which is a new variable created in an outerscope
    }
    // will be called correctly
    console.log(millenial)
    // will not work because is being called outside it's scope
    // console.log(add(a, 3));
    printAge();
    return age;
}
}

const firstName = 'Charles';
caclAge(1985)


//HOSITING AND TDZ with variables

// console.log(me);
// console.log(job);
// console.log(year);

var me = 'Anna';

// Temporal dead zone starts at the beginng of the scope to the point where it is defined
let job = 'developer';
const year  = 1991

// with functions

console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
// console.log(addArrow(2, 3));
console.log(addVar(2, 3));
//returns different error

function addDecl(a,b)
 {
     return a+ b;
 }

 const addExpr = function(a,b) {
     return a+ b;
 }

 const addArrow = (a, b) => {
    return a + b;
 }

var addVar = function(a, b)  {
    return a + b;
}


//Example

if(!numProducts) deleteShoppingCart();
//  at this stage numProducts is undefined- falsy value so the code will execute

var numProducts = 10;

function deleteShoppingCart()  {
    console.log("all products deleted");
}

var  x =  1;
let y = 2;
const z = 3;
// look at window in the console
console.log(x === window.x) 
// is x property of the object window ? 
