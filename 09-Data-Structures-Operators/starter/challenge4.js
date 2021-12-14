// Write a program that receives a list of variable names written in snake_case and convert them to camelCase.

// The input will come from a textarea inserted into the DOM (see code below) and conversion wil happen when the button is pressed.

// THIS TEST DATA (pasted to textarea)
// snake_case  
//     first_name
// Some_Variable
//     calculate_AGE
// delayed_departure

// SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
// snakeCase ✅
// firstName ✅✅
// someVariable ✅✅✅
// calculateAge ✅✅✅✅
// delayedDeparture ✅✅✅✅✅

// HINT 1: Remember which character defines a new line in the textarea
// HINT 2: The solution only needs to work for a variable of two words a_b
// HINT 3: don't worry about the ✅ to start. 


document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));



document.querySelector('button').addEventListener('click', function() {
    const text = document.querySelector('textarea').value;
    const rows = text.split('\n');
    console.log(rows);

    for (const [i, row] of rows.entries()) {
        const [first, second] = row.toLowerCase().trim().split('_');
        const output = `${first}${second.replace(second[0], second[0].toUpperCase())}`;
        console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`) //empty space
    }
});
