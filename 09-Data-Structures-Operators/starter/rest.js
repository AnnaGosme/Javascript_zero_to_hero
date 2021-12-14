'use strict';

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    openingHours: {
            thu: {
              open: 12,
              close: 22,
            },
            fri: {
              open: 11,
              close: 23,
            },
            sat: {
              open: 0, // Open 24 hours
              close: 24,
            },
          },

          orderPizza: function(mainIngredient, ...otherIngredients)  {
              console.log(mainIngredient);
              console.log(otherIngredients);
          }
}


//1) DESTRUCTURING
// SPREAD because the array is on the right side of the =
const arr = [1, 2, ...[3, 4]]

// REST because on the left side, coupled with destructring
// REST collects elements unused in the destructuring assignment and creates a new array
const [a, b, ...others] = [1, 2, 3, 4, 5]
console.log(a, b, others);

//REST must be the last in the destructed 
const [pizza, , risotto, ...otherFood]  = [...restaurant.mainMenu, ...restaurant.starterMenu]
console.log(pizza, risotto, otherFood);

//objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//2) FUNCTIONS => REST parameters
const add = function(...numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) sum += numbers[i];
    console.log(numbers);
    console.log(sum);
}
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

// spread operator to add the array 
const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
