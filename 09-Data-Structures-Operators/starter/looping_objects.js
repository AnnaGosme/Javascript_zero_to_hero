'use strict';

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
    sat: {
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
    openingHours,

    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    }
}
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days `

for (const day of Object.keys(openingHours)) {
    openStr += `${day}, `;
}
console.log(openStr)

//Property values

const values = Object.values(openingHours);
console.log(values);

// Entries = names + values (index number and element)
const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, {open, close}] of entries) {
    console.log(`On ${day} we open at ${open} and close at ${close}`);
}

