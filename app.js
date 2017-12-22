/*

GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a die as many times as he whishes. Each result is added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his TOTAL score. After that, 
- it's the next player's turn
- The first player to reach 50 points on TOTAL score wins the game

NEW GAME RULES FOR V2
 1. a player loses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
    (Hint: always save the previous dice roll in a  separate variable)
 2. add an input field to the HTML where players can set the winning score, so that they can change the predefined
    score to what they want. (hint: you can read that value with the .value property in JS. hint: use google to 
    to solve)
 3. Add another die to the game. The player loses his current score if he rolls a one. 

*/


var scores, roundScore, activePlayer, newGame, winningScore;

initGame();

function initGame() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	newGame = 0;
	six_roll = 0;
	winningScore = 100;
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice2').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	//document.querySelector('.winning-score').innerHTML = 'FINAL SCORE';
};


function changePlayer() {
	document.querySelector('#current-' + activePlayer).textContent = '0';
	document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
	roundScore = 0;
	six_roll = 0;
};


document.querySelector('.btn-roll').addEventListener('click', function() {
	if(newGame === 0){
		// generate a random dice roll for die 1 and display result
		var roll = Math.floor(Math.random() * 6) + 1;
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + roll + '.png';

		// generate a random die roll for die 2 and display result
		var roll2 = Math.floor(Math.random() * 6) + 1;
		var dice2DOM = document.querySelector('.dice2');
		dice2DOM.style.display = 'block';
		dice2DOM.src = 'dice-' + roll2 + '.png';

		// update game status based on dice roll
		if(roll !== 1 && roll2 !== 1 && six_roll !== 2) {
			// track current score
			roundScore = roundScore + roll + roll2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			
			if(roll === 6 || roll2 === 6){
				six_roll++;
			}

			if(six_roll === 2){
				document.querySelector('#score-' + activePlayer).textContent = 0;
				changePlayer();
			}

		}else {
			changePlayer();
			document.querySelector('#current-' + activePlayer).textContent = 0;
		}
	}
});


// Track game status - tally round points and check for winner
document.querySelector('.btn-hold').addEventListener('click', function() {
	if(newGame === 0) {
		scores[activePlayer] += roundScore;
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector('.winning-score').value;

		// Undefined, 0, null, or "" are COERCED to false - all others to true
		if(input){
			winningScore = input;
		} else {
			winningScore = 100;
		}

		// check if player won the game
		if(scores[activePlayer] >= winningScore){
			document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
			document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			document.querySelector('.dice').style.display = 'none';
			newGame = 1;
		} else {
			changePlayer();
		}
	}
});


// Start a new game
document.querySelector('.btn-new').addEventListener('click', function() { 
	document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
	document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('winner');
	if(activePlayer === 0){
		document.querySelector('#name-' + activePlayer).textContent = 'Player 1';
	} else {
		document.querySelector('#name-' + activePlayer).textContent = 'Player 2';
	}
	initGame();
});