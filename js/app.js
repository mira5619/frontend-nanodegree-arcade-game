function randomNumber(range) {
    var number = Math.floor((Math.random() * range));
    return number;
}

// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = y;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //if bug goes off of canvas
    if (this.x > 500) {
      this.x = -100;
    };
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';
    //initial position for the player
    this.x = 202;
    this.y = 410;
    this.score = 0;
}

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 410;
}

Player.prototype.update = function(dt) {
   //reset player's position when he reach the water
    if (player.y <= 0){
        player.score += 10;
        player.reset();
    }
    //reset player score to 0, if it is negative
    if(player.score < 0) {
        player.score= 0;
    }
}

//collision
function checkCollisions () {
    allEnemies.forEach(function(enemy) {
        if(enemy.x < player.x + 50 &&
            enemy.x + 70 > player.x &&
            enemy.y < player.y + 50 &&
            enemy.y + 70 > player.y) {
                player.score--;
                player.reset();
            }
    });
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //adding text on the canvas
    ctx.rect(0, 50, 505, 30);
    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fill();
    ctx.font = "30px serif";
    ctx.fillStyle = "red";
    ctx.fillText("SCORE:" + " " + player.score, 175 , 75);
}

Player.prototype.handleInput = function(keyPressed) {
   if (keyPressed === 'up' && this.y > 0) {
        this.y -= 45;
    }
    else if (keyPressed === 'down' && this.y < 350){
        this.y += 45;
    }
    else if (keyPressed === 'left' && this.x > 0) {
        this.x -= 45;
    }
    else if (keyPressed === 'right' && this.x < 400) {
        this.x += 45;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemyPath = [60, 130, 190, 230];
for (var i = 0; i < 4; i++) {
var enemy = new Enemy(enemyPath[i],randomNumber(80));
allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});