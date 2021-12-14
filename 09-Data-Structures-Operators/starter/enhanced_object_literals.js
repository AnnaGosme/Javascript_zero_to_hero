'use strict';
//compute property names
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const openingHours = {
    [weekdays[3]]: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    [`day-${2 + 4}`]: {
      open: 0, // Open 24 hours
      close: 24,
    },
}

const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],
    // ES6 enhanced object literals
    openingHours,

    //methods
    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    }

}
