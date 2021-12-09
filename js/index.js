// Game Constants & Variables :

let inputDirection = { x: 0, y: 0 };
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");

let score = 0;
let speed = 8;

let lastPaintTime = 0;

let snakeArr = [
  // ---->> snakeArr is our snake.

  { x: 13, y: 15 }, // -->> This is snake's head.
];

food = { x: 6, y: 8 };

// Game Functions :

function main(currentTime) {
  window.requestAnimationFrame(main); // This is better than using setInterval().
  // console.log(currentTime)

  if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
    // --->> To control FPS
    return; // -->> no need to render till the if condition gets false.
  } // no need of 'else' as we used 'return'.

  lastPaintTime = currentTime;
  gameEngine();
}

function collide(snake) {
  // If snake bump into itself :

  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  //If snake bump to the wall :

  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gameEngine() {
  // Part 1 : Updating the snake array & food.

  if (collide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDirection = { x: 0, y: 0 };

    alert("Oops !! Game Over. Press any key to play again.");
    snakeArr = [{ x: 13, y: 15 }]; //-->> Initial position.
    musicSound.pause();
    score = 0;
  }

  // If you have eaten the food, increment the score and regenerate the food.

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscore) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore : " + hiscoreval;
    }
    scoreBox.innerHTML = "Score : " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection.x,
      y: snakeArr[0].y + inputDirection.y,
    });

    let a = 2;
    let b = 16;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake :

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }; // --->> destructured to create a new object.
  }

  snakeArr[0].x += inputDirection.x;
  snakeArr[0].y += inputDirection.y;

  // Part 2 : Render/Display the snake and food.

  board.innerHTML = ""; //--->> Empty our board
  snakeArr.forEach((element, index) => {
    snakeElement = document.createElement("div"); //-->> Create a new element.
    snakeElement.style.gridRowStart = element.y; // -->> 'y' is our row in javascript.
    snakeElement.style.gridColumnStart = element.x; // -->>'x' is our column in Javascript.

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement); // 'append' means to add (something) to the end of a written document.
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Main Logic starts here :
// musicSound.play();

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore : " + hiscore;
}

window.requestAnimationFrame(main); // -->> "main" is a function.
window.addEventListener("keydown", (element) => {
  inputDirection = { x: 0, y: 1 }; // -->> Start the game.
  musicSound.play();
  moveSound.play();

  switch (element.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDirection.x = 0;
      inputDirection.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDirection.x = 0;
      inputDirection.y = 1;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDirection.x = 1;
      inputDirection.y = 0;

      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDirection.x = -1;
      inputDirection.y = 0;
      break;

    default:
      break;
  }
});
