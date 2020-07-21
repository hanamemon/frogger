/* global p5 */
const p = new p5(() => {});

let backgroundColor = 95;

let gameIsOver = false;
let width = 500;
let collided;
let height = 500;
let reset;
let img;
let loadImage;

let cars1;
let carsAmt;

let startPosY = 480;
let startPosX1 = 250;
let startPosX2 = 280;

//function preload() {
//img = loadImage(
//   "https://cdn.glitch.com/1254fbdc-e7a1-41a5-81bf-d0976890fddc%2Ffrog.png?v=1595017312610"
//);
//}

p.setup = function() {
  p.createCanvas(500, width);
  p.colorMode(p.HSB, 360, 100, 100);
  
  if (p.key === "r" || p.key === "R") {
    game.restart()
  }
 
  // LOOP - NEED TO TEST LATER
  cars1 = [];
  carsAmt = 5;

  for (let i = 0; i < carsAmt; i++) {
    cars1.push(new cars(50, 100, 50, 30, 5));
  }

  console.table(cars1);
  reset = game.restart()
};

p.draw = function() {
  p.background(backgroundColor);
  // drawGoal - stays
  drawGoal();
  game.displayScores();
 
  game.checkWin();
  // is being moved into class `cars`

  // characters woah!
  firstCharacter.drawChar();
  secondCharacter.drawChar();
  // cars that work
  for (let i = 0; i < carsAmt; i++) {
    cars1[i].drawCar();
    cars1[i].moveCars();
    //cars1[i].checkCollisions();
    cars1[i].checkHit();
  }
};
// stays still
function drawGoal() {
  p.fill(60, 80, 80);
  p.rect(0, 0, p.width, 50);
}

// ----------------- features BEGIN
class Features {
  constructor(score1, lives1, score2, lives2) {
    this.score1 = score1;
    this.lives1 = lives1;
    this.score2 = score2;
    this.lives2 = lives2;
    this.gameIsOver = false;
  }

  restart() {
    firstCharacter.y = startPosY;
    firstCharacter.x = startPosX1;
    secondCharacter.y = startPosY;
    secondCharacter.x = startPosX2;
    this.score1 = 0;
    this.score2 = 0;
    this.lives1 = 3;
    this.lives2 = 3;
    this.gameIsOver = false;
  }

  displayScores() {
    p.textSize(12);
    p.fill(0);
    // Display Livesw
    p.text(`Player 1 Lives: ${game.lives1}`, 10, 20);
    p.text(`Player 1 Score: ${game.score1}`, 10, 40);
    p.text(`Player 2 Lives: ${game.lives2}`, 400, 20);
    p.text(`Player 2 Score: ${game.score2}`, 400, 40);
    
    // Display game over message if the game is over
    if (game.lives1 == 0) {
      p.text("GAME OVER", 10, 60);
      gameIsOver = true;
    }
    
    if (game.lives2 == 0) { 
      p.text("GAME OVER", 400, 60);
      gameIsOver = true;
    }
    
    if (game.lives1 == 0 && game.lives2 == 0) {
     p.text("click r to restart game!", width / 2, 100)
    }
  }

  checkWin() {
    if (firstCharacter.y <= 50) {
      game.score1 += 1;
      firstCharacter.y = startPosY;
    }
    if (secondCharacter.y <= 50) {
      game.score2 += 1;
      secondCharacter.y = startPosY;
    }
  }
  


}
// ----------------- features END

// -------------------- crossy Characters BEGIN
class CrossyChar {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.hue = p.random(20, 100);
  }

  drawChar() {
    p.fill(this.hue, 50, 300);
    p.ellipse(this.x, this.y, this.width);
    // image(img, 200, 500);
  }
}
// -------------------- crossy Characters END

// -------------------- cars BEGIN
class cars {
  constructor(x, y, w, h, v) {
    this.x = x;
    this.y = p.random(0, 100);
    this.w = w;
    this.h = h;
    this.v = p.random(2, 5);
  }

  drawCar() {
    p.fill(60, 80, 80);
    p.rect(this.x, this.y, this.w, this.h);
  }

  moveCars() {
    this.x += this.v;

    if (this.x >= width) {
      this.x = -30;
      this.y = p.random(100, 400);
    }
  }

  checkHit() {
    let hit = p.collideRectCircle(
      this.x,
      this.y,
      this.w,
      this.h,
      firstCharacter.x,
      firstCharacter.y,
      firstCharacter.width
    );

    let hit2 = p.collideRectCircle(
      this.x,
      this.y,
      this.w,
      this.h,
      secondCharacter.x,
      secondCharacter.y,
      secondCharacter.width
    );

    if (hit) {
      game.lives1 -= 1;
      firstCharacter.x = startPosX1;
      firstCharacter.y = startPosY;
    }
    
     if (hit2) {
      game.lives2 -= 1;
      secondCharacter.x = startPosX2;
      secondCharacter.y = startPosY;
    }
  }
}
// -------------------- cars END
// -------------------- global variables of class BEGIN
let firstCharacter = new CrossyChar(startPosX1, startPosY, 20);
let secondCharacter = new CrossyChar(startPosX2, startPosY, 20);

let game = new Features(0, 3, 0, 3);

// ------------------- global variables of class ENDS
// ---------- OUR USER FUNCTIONS BEGIN
p.keyPressed = function() {
  if (game.lives1 == 0 && game.lives2 == 0) {
        return 
    }
  
  if (p.keyCode === p.UP_ARROW) {
    firstCharacter.y -= 20;
  } else if (p.keyCode === p.DOWN_ARROW) {
    firstCharacter.y += 20;
  } else if (p.keyCode === p.RIGHT_ARROW) {
    firstCharacter.x += 20;
  } else if (p.keyCode === p.LEFT_ARROW) {
    firstCharacter.x -= 20;
  }

  if (p.keyCode === 87) {
    // W
    secondCharacter.y -= 10;
  } else if (p.keyCode === 65) {
    // A
    secondCharacter.x -= 10;
  } else if (p.keyCode === 68) {
    // S
    secondCharacter.x += 10;
  } else if (p.keyCode === 83) {
    // D
    secondCharacter.y += 10;
  }
};



// ---------- OUR USER FUNCTIONS END
