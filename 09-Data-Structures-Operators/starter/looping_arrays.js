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
}

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// loop over entire array and gives access to all elements of the array
// for (const item of menu) console.log(item);

//Slow way
// for (const item of menu.entries()) {
//     console.log(`${item[0] + 1} : ${item[1]}`);
// }

// Smart impressive way
for (const [i, el] of menu.entries()) {
    console.log(`${i + 1}: ${el}`)
}


// console.log([...menu.entries()])
//creates new array for each item, with its position
