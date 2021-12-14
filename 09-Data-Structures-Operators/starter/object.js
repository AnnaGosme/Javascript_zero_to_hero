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
  
    order: function(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    orderDelivery: function({ starterIndex = 1, mainIndex = 0, time = '20:00', address = '1 rue de ridder'} ) {
        console.log(`Order recieved : ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${time} to ${address}`);
    }
};

restaurant.orderDelivery({
    time: '22:30',
    address: 'Via del sole, 21',
    mainIndex: 2,
    starterIndex: 2,
})
restaurant.orderDelivery({
    time: '22:30',
    address: 'Via del sole, 21',
    mainIndex: 2,
})
console.log(`Order recieved : ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered at ${time} to ${address}`);

// object destructuring in objects
// order doesn't matter

const {name, categories, openingHours} = restaurant;
console.log(name, categories, openingHours);

const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
console.log(restaurantName, hours, tags);

// set  default value  ""= []"
const { menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);

// mutate variables
let a = 111;
let b = 999;
const obj ={a: 23, b: 7, c: 14};
// wrap in parentheses
({a, b} = obj);
console.log(a, b);

// nested objects

const {fri} = openingHours;
console.log(fri);

const {
    fri: { open, close},
} = openingHours;
console.log(open, close);


