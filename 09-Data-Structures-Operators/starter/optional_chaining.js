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
    [sat]: {
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

// console.log(restaurant.openingHours.mon.open);
//does not exist restaurant.openingHours.mon = returns undefined
//restaurant.openingHours.mon.open = type error

if (restaurant.openingHours.fri)
console.log (restaurant.openingHours.fri.open)
//exists will return 11

if (restaurant.openingHours.mon)
console.log (restaurant.openingHours.mon.open)
//doesn't exist returns nothing

if (restaurant.openingHours.mon && restaurant.openingHours.mon.open) console.log (restaurant.openingHours.mon.open)
//gets very long

//solution is optional chaining
console.log(restaurant.openingHours.mon?.open)

// without optional chaining returns an error
// console.log(restaurant.openingHours.mon?.open)

console.log(restaurant.openingHours?.mon?.open)


const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    console.log(`On ${day}, we open at ${open}`);
}

//Methods

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist'); //will return method does not exist

//Arrays

const users = [
    {name: 'Arvo', email: 'arvo@bobun.io'}
]
console.log(users[0]?.name ?? 'User array is empty');



