//map values to keys of any type

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));


rest
.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
.set('open', 11)
.set('closed', 23)
.set(true, 'We are open')
.set(false, 'We are closed')

console.log(rest.get('name'))
console.log(rest.get(true));


const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories'));
rest.delete(2);
const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
//rest.clear();
console.log(rest.size);

console.log(rest.get(arr));


//Iteration

const question = new Map([
    ['question', 'What is the best programming language in the world?'], 
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct'],
    [false, 'Try again']
]);

    console.log(question);

//returns same structure (array of arrays) as Object.entries => easy to convert objecct to map
const openingHours = {
    thurs: {
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
//convert object to map
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//iteration

for (const [key, value] of question) {
    if (typeof key === 'number') console.log(`Answer ${key}: ${value}`)
}
const answer = Number(3);
console.log(answer);

console.log(question.get(question.get('correct') === answer));


//convert map to array

console.log([...question]);
console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);
