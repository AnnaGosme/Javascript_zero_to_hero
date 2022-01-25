// importing module
// imported statements are hoisted to the top
// import {
//   addToCart,
//   totalPrice as price,
//   tq,
// } from './shoppingCart.js';

console.log('importing module');

// addToCart('bread', 5);
// console.log(price, tq);

// //create namespace for all values of the module
// import * as ShoppingCart from './shoppingCart.js'

// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

//import defaults
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 3);

// console.log(cart);

//imports are not a copy they are a live extension, a pointer§t

// we can now use top level await in modules
//// async function(x) ->no longer necessary
// console.log('start fetching')
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// //blocks execution of entire module
// console.log('after fetch')

// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await res.json();
//   console.log(data);

//   return { title: data.at(-1).title, text: data.at(-1).body };
// };
// const lastPost = getLastPost();
// console.log(lastPost);

// //not very clean
// // lastPost.then(last => console.log(last));

// const lastPost2 = await getLastPost();
// console.log(lastPost2)

// MODULE PATTERN -> encapsulate functionality to have private data and to expose a public API by using a function
// immediately invoked function expression => iifi + can only be called once

// const ShoppingCart2 = (function () {
//   const cart = [];
//   const shippingcost = 10;
//   const totalPrice = 237;
//   const totalQuantity = 23;

//   const addToCart = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} was added to cart`);
//   };

//   const orderStock = function (product, quantity) {
//     cart.push({ product, quantity });
//     console.log(`${quantity} ${product} ordered from supplier`);
//   };

//   return {
//     addToCart,
//     cart,
//     totalPrice,
//     totalQuantity,
//   };
// })();

// ShoppingCart2.addToCart('apples', 4)
// ShoppingCart2.addToCart('pizza', 1)
// console.log(ShoppingCart2);
// console.log(ShoppingCart2.shippingCost) // undefined

//COMMON JS MODULES NODEJS

// export.addToCart = function (product, quantity) {
//         cart.push({ product, quantity });
//         console.log(`${quantity} ${product} was added to cart`);
//       };

// IMPORT
// const addToCart = require('./shoppingCart.js')

//// INTRODUCTION TO NPM
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash';


const state = {
    cart: [
        {product: 'bread', quantity: 5},
        {product: 'pizza', quantity: 2},
    ],
    user: { loggedIn: true},
};

const stateClone = Object.assign({}, state);
console.log(stateClone);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

//if module is changed, trigger rebuild with modified module injected into browser without reloading entire page (maintaining state)
if(module.hot) {
    module.hot.accept()
}

// Babel
 class Person {
     greeting = 'hey';
     constructor(name) {
         this.name = name;
         console.log(`${this.greeting}, ${this.name}`)
     }
 }

 const arvo = new Person('Arvo')

 console.log('Arvo' || null);

 console.log(cart.find(el => el.quantity >= 2));
 Promise.resolve('Test').then(x => console.log(x))

 import 'core-js/stable'
 //polyfilling async functions
 import 'regenerator-runtime/runtime'
