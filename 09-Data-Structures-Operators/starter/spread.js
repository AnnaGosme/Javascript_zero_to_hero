'use strict';

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0],  arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);
console.log(...newArr);
console.log(1, 2, 7, 8, 9);

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
        orderPasta(ing1, ing2, ing3) {
            console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
        }
}
// spread operator creates new array
const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log(newMenu);

const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

const wholeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(wholeMenu);

//spread operators work on all iterables (arrays, strings, maps, sets, but NOT OBJECTS)

const str = 'Jonas';
const letters = [...str, ' ', 'S. '];
console.log(letters);
console.log(...str);

// const ingredients = [
//     prompt("Let's make pasta! Ingredient 1?"), 
//     prompt('Ingredient 2?'),
//     prompt('Ingredient 3?')
// ]
// console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients);

//using spread operator on objects
const newRestaurant = { foundedIn: 1998, ... restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = {...restaurant};
restaurantCopy.name  = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
