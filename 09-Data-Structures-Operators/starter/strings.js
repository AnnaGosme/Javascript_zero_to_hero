const airline = 'TAP Air Portugal';
const plane = 'A320'

console.log(plane[0]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));

console.log(airline.slice(4)); //position that extraction will start - does not change underlying string because is primitive - to use must be stored in a variable
console.log(airline.slice(4, 7)); //end value is not included in the string

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2));
console.log(airline.slice(1, -1));


const checkMiddleSeat = function(seat){
    // B and E are middle seats
    const s = seat.slice(-1); //take last character of the string
    if (s === 'B' || s === 'E')
    console.log(' middle sit')
    else console.log('not middle seat');

}
checkMiddleSeat('11B')
checkMiddleSeat('23C')
checkMiddleSeat('3E')

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//Fix capitalisation in name

const passenger = "jOnAS"

const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);


//comparing emails

const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.Io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim(); //trimStart and trimEnd also exist
console.log(trimmedEmail);

//can be done all in one : 

const normalisedEmail = loginEmail.toLowerCase().trim();
console.log(normalisedEmail);
console.log(email === normalisedEmail);

//replacing

const priceGB = '288,97£'
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replaceAll(/door/g, 'gate')); //regex for global

//Booleans

let plane2 = 'A320neo';
console.log(plane2.includes('A320'));
console.log(plane2.includes('A321'));
plane3 = 'Airbus A320neo';
console.log(plane3.startsWith('Air'));

if (plane3.startsWith('Airbus') && plane3.endsWith('neo')) {
    console.log('part of the new airbus family');
} else {
    console.log('not part of the airbus family');
}

const checkBaggage = function(items) {
     const baggage = items.toLowerCase();
     if (baggage.includes('knife') || baggage.includes('gun')) {
         console.log('You are not allowed on board');
     } else {
         console.log('Welcome abord')
     }
} 

checkBaggage('laptop, food, pocket Knife');
checkBaggage('socks and camera');
checkBaggage('snacks and Gun');

console.log('a+very+nice+nice+string'.split('+'));
console.log('Arvo Pheonix'.split(' '));

const [firstName, lastName] = 'Arvo Pheonix'.split(' ');

const newName = ['Mr', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalisedName = function(name) {
    const names = name.split(' ');
    const namesUpper = [];

    for (const n of names) {
        // namesUpper.push(n[0].toUpperCase() + n.slice(1));
        namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    }
    console.log(namesUpper.join(' '));
}

capitalisedName('jessica ann smith davis');
capitalisedName('arvo pheonix gosme');


//Padding
const message = 'Go to gate 23';
console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log('Arvo'.padStart(25, '+').padEnd(35, '+'));

const maskCreditCard = function(number) {
    const str = number + ' ';
    const last = str.slice(-4);
    return last.padStart(str.length, '*');
}

console.log(maskCreditCard(768545676));
console.log(maskCreditCard(23453456631234432));
console.log(maskCreditCard('23453456631234432'));

//Repeat

const messageWeather = 'Bad weather, all departures delayed...';
console.log(messageWeather.repeat(5));

const planesInLine = function(n) {
    console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`)
}

console.log(planesInLine(5));
console.log(planesInLine(7));
console.log(planesInLine(9));
