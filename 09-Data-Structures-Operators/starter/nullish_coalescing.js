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
 
restaurant.numGuests = 0;

const guests = restaurant.numGuests || 10;
console.log(guests);

//works with nullish values = null, undefined (not 0 not ' ' = treated as not falsy values)
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);
