let winTimes = 0;

//Define the Enemy Object
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = "images/enemy-bug.png";
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    this.x = this.x + this.speed * dt;
    let pointsLength = 50; //Each movement is 50 points long.

    //Once the enemy position is wider than the x-axis of the provided canvas, reset its position to 0 on the x-axis
    if (this.x > 505) {
      this.x = 0;
      // Generating different speeds randomly for enemy.
      this.speed = pointsLength * Math.round(Math.random() * 5 + 5);
    }

    let minX = this.x - pointsLength; //Captures the closest position to the start of the x-axis
    let maxX = this.x + pointsLength; //Captures the farest position from the start of the x-axis
    let minY = this.y - pointsLength; //Captures the closest position to the start of the y-axis
    let maxY = this.y + pointsLength; //Captures the farest position from the start of the y-axis

    /*Checks collision status if the player updated position returns false for either the pos on x or the y axis
      (the x and y coords of player met with that of enemy)*/
    if (
      player.update(player.x, minX, maxX) &&
      player.update(player.y, minY, maxY)
    ) {
      //Put the player back to the very starting position
      player.reset();
    };
  };
  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

//Create the Player Object
class Player {
  constructor() {
    // Player initial starting coords
    this.x = 200; //exact middle of x-axis on the provided canvas
    this.y = 400; //exact end of the y-axis on the provided canvas
    this.sprite = "images/char-horn-girl.png";
  }
  // Update the player position, required method for game, checking if the enemy and player are coliding
  update(coord, min, max) {
    return coord > min && coord < max; //must return true to update player pos otherwise the player position resets (collision effect)
  }
  // Draw the player on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //Resets player to the initial x and y coords.
  reset() {
    this.x = 200;
    this.y = 400;
  }
  handleInput(pressedKey) {
    //Two variables to hold winning count and present it in the doc
    const winTimesEl = document.getElementById("winTimesLog");

    const spaceX = 50; //The points the player can move horizontally
    const spaceY = 50; //The points the player can move vertically
    //Ensuring the player does not not get out of the boundaries on the very far left side
    if (pressedKey === "left" && this.x !== 0) {
      this.x -= spaceX; //The player remains on the 0 coord of the x-axis
    }

    //Ensuring the player does not get out of the boundaries on the very far right side
    else if (pressedKey === "right" && this.x !== 400) {
      this.x += spaceX; //The player remains on the 400 coord of the x-axis
    }

    //Ensuring the player resets position once he reaches the 0 coord of the y-axis
    else if (pressedKey === "up") {
      if (this.y === 50) {
        player.reset();
        winTimes++;
        winTimesEl.innerHTML = "<p>You passed " + winTimes + " times</p>";
      } else {
        this.y -= spaceY; //The player keeps moving up normally
      }
    }
    //Ensuring the player doesn't go below the canvas boundaries
    else if (pressedKey === "down" && this.y !== 400) {
      this.y += spaceY; //The player remains on the 400 coord of the y-axis
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
let palpatine = new Enemy(-60, 60 + 85 * 0, Math.floor(Math.random() * 5 + 1) * 75);
let vader = new Enemy(-60, 60 + 85 * 1, Math.floor(Math.random() * 9 + 2) * 79);
let kylo = new Enemy(-60, 60 + 85 * 2, Math.floor(Math.random() * 6 + 3) * 63);

allEnemies.push(palpatine, vader, kylo); //I am obviously a star wars big fan \("_s")/

// Place the player object in a variable called player
let player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  const allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});