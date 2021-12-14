'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function renderCountry(data, className = '') {
  const html = `
  <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${Number(
            data.population / 1000000
          ).toFixed()}M people</p>
          <p class="country__row"><span>🗣️</span>${
            Object.values(data.languages)[0]
          }</p>
          <p class="country__row"><span>💰</span>${
            Object.values(data.currencies)[0].name
          }</p>
      </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

///////////////////////////////////////

// // function getCountry(country) {
// //   const request = nw XMLHttpRequest();
// //   request.open('GET', `https://restcountries.com/v2/name/${country}`);
// //   request.send();

// //   request.addEventListener('load', function () {
// //     const country = JSON.parse(this.responseText)[0];
// //     console.log(country);

// //     const currency_key = Object.keys(country.currencies)[0];
// //     const currency = country.currencies[currency_key].name;

// //     const language_key = Object.keys(country.languages)[0];
// //     const language = country.languages[language_key];

// //     const population = +(country.population / 1000000).toFixed(1);

// //     const html = `<article class="country">
// //     <img class="country__img" src="${country.flags[0]}" />
// //     <div class="country__country">
// //       <h3 class="country__name">${country.name.common}</h3>
// //       <h4 class="country__region">${country.region}</h4>
// //       <p class="country__row"><span>👫</span>${population}</p>
// //       <p class="country__row"><span>🗣️</span>${language}</p>
// //       <p class="country__row"><span>💰</span>${currency}</p>
// //     </div>
// //   </article>`;
// //     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
// //   });
// // }

// // getCountry('france');
// // getCountry('australia');
// // getCountry('greece');
// // getCountry('canada');

// const getCountryAndNeighbour = function (country) {
//   // AJAX  call country 1

//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //render country 1
//     renderCountry(data);

//     //get neighbour country
//     const neighbour = data.borders;

//     if (!neighbour) return;

//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('portugal');
//getCountryAndNeighbour('australia');
// getCounryAndNeighbour('greece');
// getCountryAndNeighbour('canada');

//CALLBACK HELL
// setTimeout(() => {
//   console.log('1 sec');
//   setTimeout(() => {
//     console.log('2 sec');
//     setTimeout(() => {
//       console.log('3 sec');
//       setTimeout(() => {
//         console.log('4 sec');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// New fetch
//const request = fetch(`https://restcountries.com/v2/name/france`);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response)

//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders;
//       // const neighbour = 'dferefe'

//       if (!neighbour) return;

//       //Country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour[0]}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`something went wrong: ${err.message}`);
//       renderError(`Something went wrong: ${err.message}`)
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// // getCountryData('fefefe');
// btn.addEventListener('click', function () {
//   getCountryData('france');
// });

// const getCountryData = function (country) {
//   getJSON(
//     `https://restcountries.com/v3.1/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders;

//       if (!neighbour) throw new Error('No neighbour found!');

//       //Country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour[0]}`,
//         'Country not found'
//       );
//     })

//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       renderError(`Something went wrong: ${err.message}`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// // getCountryData('fefefe');
// getCountryData('australia');
// btn.addEventListener('click', function () {});

// CHALLENGE 1

// In this challenge you will build a function 'whereAmI' which renders a country only based on GPS coordinates. For that, you will use a second API to geocode coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
// Your tasks:

// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') and a longitude value ('lng') (these are GPS coordinates, examples are in test data below).

// 2. Do “reverse geoc oding” of the provided coordinates. Reverse geo coding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do not use the 'getJSON' function we created, that is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast,you will get this error with code 403. This is an error with the request. Remember, fetch() does not reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message

// const getData = function (url) {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${response.status}`);
//     return response.json();
//   });
// };

// const whereAmI = function (lat, lng) {
//   getData(`https://geocode.xyz/${lat},${lng}?geoit=json`).then(data => {
//     const city = data.city;
//     const country = data.country;
//     console.log(`You are in ${city}, ${country}`);
//     (getData(`https://restcountries.com/v3.1/name/${country}`))
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//             renderError(`Something went wrong: ${err.message}`);
//           })
  
// })}

// PART 2
// 6. Now it's time to use the received  data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.

// 7. Render the country and catch any errors,just like we have done in the last lecture (you can even copy this code, no need to type the same code)

// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude) § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK 😀

//whereAmI(52.508, 13.381);

console.log('Test start'); //1
setTimeout(() => console.log('0 sec timer'), 0); // 4
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // 3
console.log('test end') //2
// all code before a callback code will be called first
// 3 & 4 are resolved at the same time: resolved promise goes on the microtasks queue so has priority over the callback queue of the setTimeOut => if the microtask takes a long time, the setTimeOut will take longer than 0 sec to resolve

Promise.resolve('resolved promise 2').then(res => {
  for (let i = 0; i < 900; i++) {
  console.log(res) // => do not use JS for highly precise timers
  }
})
console.log('test end')
