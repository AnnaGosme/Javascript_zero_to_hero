// exporting module
console.log('exporting module');

// blocking code
// console.log('start fetching users')
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('finished fetching users')

// all top level variables are in the mpocule scope -> private to the module
const shippingCost = 10;
export const cart = [];

// Named exports
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;


export { totalPrice, totalQuantity as tq };

//default exports
export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to cart`);
  };
