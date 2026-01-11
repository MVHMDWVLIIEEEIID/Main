let div1 = document.getElementById('69');
let div2 = document.getElementById('playerInteraction');
let div3 = document.getElementById('cpuInteraction');
let div4 = document.getElementById('score');
let div5 = document.getElementById('history');
let cpuScore = 0;
let playerScore = 0;
let gHistory = [];

function startGame() {

  div1.innerHTML = `
      <button onclick="play(this)">Paper</button>
      <button onclick="play(this)">Rock</button>
      <button onclick="play(this)">Scissors</button>
      `;
  updateCInteractions(0);
  updatePInteractions(0);
  updateHistory('','','');
  updateScore();
}

function play(element) {
  let computerChoice = pickComputerMove();
  let userChoice = element.innerHTML;

  updatePInteractions(userChoice);
  updateCInteractions(computerChoice);

  if (userChoice === computerChoice) {
    updateScore();
    updateHistory(userChoice, computerChoice, 'tie');
  } else if (
    (userChoice === 'Paper' && computerChoice === 'Rock') ||
    (userChoice === 'Rock' && computerChoice === 'Scissors') ||
    (userChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    playerScore++;
    updateScore();
    updateHistory(userChoice, computerChoice, 'win');
  } else {
    cpuScore++;
    updateScore();
    updateHistory(userChoice, computerChoice, 'lose');
  }
}

function updateScore() {
  if (playerScore > cpuScore) {
    div4.innerHTML = `<p>${playerScore}</p>-<p class="lose">${cpuScore}</p>`
  } else if (playerScore < cpuScore) {
    div4.innerHTML = `<p class="lose">${playerScore}</p>-<p>${cpuScore}</p>`
  } else {
    div4.innerHTML = `<p class="lose">${playerScore}</p>-<p class="lose">${cpuScore}</p>`
  }
}

function updatePInteractions(element) {
  if (element === 0) {
    div2.innerHTML = '';
  } else {
    div2.innerHTML = `<img src="assets/${element}.png">`;
  }
}

function updateCInteractions(element) {
  if (element === 0) {
    div3.innerHTML = '';
  } else {
    div3.innerHTML = `<img src="assets/cpu-${element}.png">`;
  }
}

function updateHistory(x, y, z) {
  let historic = '';
  gHistory.unshift([x, y, z]);
  gHistory.forEach((game) => {
    let userChoice = game[0];
    let cpuChoice = game[1];
    let outcome = game[2];
    let userClass = '';
    let cpuClass = '';

    if (outcome === 'win') {
      cpuClass = 'lose';
    } else if (outcome === 'lose') {
      userClass = 'lose';
    } else if (outcome === 'tie') {
      userClass = 'lose';
      cpuClass = 'lose';
    }
    if (gHistory.length > 3) {
      gHistory.pop();
    }
    historic += `
      <div class="row">
        <p class="${userClass}">${userChoice}</p>-<p class="${cpuClass}">${cpuChoice}</p>
      </div>
      `;
  });
  div5.innerHTML = historic;
}

function pickComputerMove() {
  let computerChoice = '';
  var randomN = Math.random();

  if ((randomN >= 0 && randomN < 1 / 6) || (randomN >= 3 / 6 && randomN < 4 / 6)) { computerChoice = 'Paper'; }
  else if ((randomN >= 1 / 6 && randomN < 2 / 6) || (randomN >= 4 / 6 && randomN < 5 / 6)) { computerChoice = 'Rock'; }
  else if ((randomN >= 2 / 6 && randomN < 1 / 2) || (randomN >= 5 / 6 && randomN <= 1)) { computerChoice = 'Scissors'; }

  return computerChoice;
}