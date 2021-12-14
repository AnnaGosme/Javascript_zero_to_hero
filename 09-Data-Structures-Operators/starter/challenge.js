'use strict';
const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
        [
            'Neuer',
            'Pavard',
            'Martinez',
            'Alaba',
            'Davies',
            'Kimmich',
            'Goretzka',
            'Coman',
            'Muller',
            'Gnarby',
            'Lewandowski'
        ],
        [
            'Burki',
            'Schulz',
            'Hummels',
            'Akanji',
            'Hakimi',
            'Weigl',
            'Witsel',
            'Hazard',
            'Brandt',
            'Sancho',
            'Gotze'
        ]
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th 2037',
    odds: {
        team1: 1.33,
        x: 3.25,
        team2: 6.5
    }
}

//Challenge 1

//1- Create a player array for each team (variables 'players1' and 'players2')
const [players1, players2] = game.players;
console.log(players1, players2);

//2. The first player in any player array is the goalkeeper and the others are field players. For Bayeren Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players. 

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3. Create an array 'allPlayers' containing all players of both teams (22 players).

const allPlayers = [...players1, ...players2]
console.log(allPlayers);

// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('playersFinal') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'.

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//5. Based on the "game.odds" object, create one variable for each odd (called 'team1', 'draw' and 'team2').

// const [team1, draw, team2] = [game.odds.team1, game.odds.x, game.odds.team2]


const {odds: {team1, x: draw, team2}} = game;
console.log(team1, draw, team2);

//6.  Write a function ('printGoals') that receives an arbitrary number of player names (not an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in).
 // First use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then call the function again with the players from "game.scored"

    const printGoals = (...playerNames) => {
        const numGoals = [...playerNames].length;
        console.log(`these players : ${playerNames}, scored these goals : ${numGoals} `)
    }
    printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
    printGoals(...game.scored)

//7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, without using an if/else statement or the ternary operator. 

team1 < team2 && console.log('Team1 more likely to win');
team2 < team1 && console.log('Team2 will win');

//Challenge 2

//1. Loop over the game.scored array and print each player name to the console, along with the goal number (Goal 1: Lewandowski).

for (const [i, player] of game.scored.entries()){ console.log(`Goal: ${i + 1}: ${player}`)};

//2. Use a loop to calculate the average odd and log it to the console.

const odds = Object.values(game.odds)
let average = 0;
for (const odd of odds) 
average += odd;
average /= odds.length;
console.log(`The average is ${average}`);

//3. Print the 3 odds to the console in a nice formatted way:

// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5

//Get the team names directly from the game object, only hardcode "draw". Hint: the odds and game objects have the same property names

for (const [team, odd] of Object.entries(game.odds)){
    const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
    console.log(`Odd of ${teamStr} ${odd}`);
}

//4. Bonus: create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value : 
// {
//     Gnarby: 1,
//     Hummels: 1,
//     Lewandowski: 2

// }

const gameEvents = new Map([
    [17, 'Goal'],
    [36, 'Substitution'],
    [47, 'Goal'],
    [61, 'Substitution'],
    [64, 'Yellow card'],
    [69, 'Red card'],
    [70, 'Substitution'],
    [72, 'Substitution'],
    [76, 'Goal'],
    [80, 'Goal'],
    [92, 'Yellow card']
]);


// 1. Create an  array 'events' of the different game events that happened (no duplicates of the events)

let events = [...new Set(gameEvents.values())]
console.log(events);


//2. After the game has finished, it was found that the yellow card from minute 64 was unfair. Remove this event from the game events log. 

gameEvents.delete(64);
console.log(gameEvents);


//3. Print the following string to the console: "An event happened on average every 9 minutes." 

const time = [...gameEvents.keys()].pop()
console.log(time);
console.log(`An event happened on average every ${time / gameEvents.size} minutes:`)

// 4. Loop over the events and log them to the console marking whether it's in the first half or the second half of the game (after 45 minutes) : "[FIRST HALF] 17: GOAL"

for (const [min, event] of gameEvents) {
    const half = min <= 45 ? 'first' : 'second';
    console.log(`[${half} half] ${min}: ${event}`)
};



