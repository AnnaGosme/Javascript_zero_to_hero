const orderSet = new Set([
    'Pasta', 
    'Pizza', 
    'Pizza', 
    'Risotto', 
    'Pasta', 
    'Pizza'
]);
console.log(orderSet)

// Set can hold mixed data types
// looks similar to an array - no key value paris, just values grouped together, and are iterable
//but diff because unique elements and order of elements is irrelevant

// strings are iterables :
console.log(new Set('Arvo'));

console.log(orderSet.size);
//will give how many unique elements there are (so does not count repitition)

console.log(orderSet.has('Pizza'));//true
console.log(orderSet.has('Bread'));//false

orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
orderSet.delete('Risotto');
// orderSet.clear();
console.log(orderSet);//adds one garlic bread

for (const order of orderSet) console.log(order);

// USE CASE
// to remove duplicate values of arrays

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']

//We want to know how many positions there are in the restaurant (an array without duplicates)
const staffUnique = [...new Set(staff)];
//  spread operator to take elements out of the iterable and square brackets to create an array
console.log(staffUnique);
console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size);

console.log(new Set ('aravophoenixgosme').size);
