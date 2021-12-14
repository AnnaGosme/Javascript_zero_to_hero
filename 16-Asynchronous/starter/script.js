'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__country">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${Object.values(
        data.languages[0]
      )}</p>
     <p class="country__row"><span>💰</span>${
       Object.values(data.currencies)[0].name
     }</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

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

const getCountryData = function (country) {
  console.log(country)
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders;
      


      if (!neighbour) throw new Error('No neighbour found!')

      //Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour[0]}`,
        'Country not found'
      );
    })

    .then(data =>{
      console.log(neighbour)
     renderCountry(data[0], 'neighbour')
    })
    .catch(err => {
      console.error(`something went wrong: ${err.message}`);
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// getCountryData('fefefe');
getCountryData('portugal');
btn.addEventListener('click', function () {
});
