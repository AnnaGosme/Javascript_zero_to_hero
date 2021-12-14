'use strict'

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
console.log('---OR---');

// use any data type, return any data type, short-circuiting
// will return the first truthy value
console.log(3 || 'Arvo');
console.log('' || 'Arvo');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// restaurant.numGuests = 23;

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10;
console.log(guests2);

// will not work when number of guests is 0 because 0 is a falsy value;

console.log('---AND---');
// works the opposite of || - returns the first falsy value
console.log(0 && 'Arvo');
console.log(7 && 'Arvo');

console.log('Hello' && 23 && null && 'Arvo');
//returns null because is first falsy value


if (restaurant.orderPizza) {
    restaurant.orderPizza('mushrooms', 'spinach');
}
// && can avoid an if statement

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
// will first check if orderPizzaa exists, if yes then calls the method


