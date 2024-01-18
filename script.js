'use strict';

const playe0El = document.querySelector('.player--0');
const playe1El = document.querySelector('.player--1');

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const diceEl = document.querySelector('.dice');

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playe0El.classList.toggle('player--active');
  playe1El.classList.toggle('player--active');
};

let scores, currentScore, activePlayer, playing;

const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  playe0El.classList.remove('player--winner');
  playe1El.classList.remove('player--winner');
  playe0El.classList.add('player--active');
  playe1El.classList.remove('player--active');
};

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
