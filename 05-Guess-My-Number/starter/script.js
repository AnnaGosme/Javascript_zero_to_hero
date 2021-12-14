'use strict';

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🎉 Correct number!'

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;


// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score =  20;
let highScore = 0;

let  displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}
    document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);
    // console.log(guess, typeof guess)

    if (!guess) {
        displayMessage('⛔️ No number guessed');
    

    } else if (guess === secretNumber) {
        displayMessage('🎉 Correct number!');

        document.querySelector('.number').textContent = secretNumber;

        document.querySelector('body').style.backgroundColor = '#60b347';
        
        document.querySelector('.number').style.width = '30rem';

        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }

    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? '📈 Too high' : '📉 Too low');
            score--;
            document.querySelector('.score').textContent = score;
            } else {
                displayMessage = ('💥 Game over');
                document.querySelector('.score'.textContent) = 0;
            }
    }
});


/*Coding challenge

Implement a game reset functiontionality so that the player can make a guess. Here's how:

1. select the  element with the 'again" class and attach a click event handler.
2. in the handler function, restore the initial values of the score and secretNumber variables.
3. restore the initial conditions the of the message, secretNumber, score and guess input field.
4. also restore the original background color (#222) and number width (15rem).

*/

const again = document.querySelector('.again').addEventListener('click', function(){
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    displayMessage('Start guessing ...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
});
