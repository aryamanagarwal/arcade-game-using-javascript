// Enemies our player must avoid
var possibleY = [55, 140, 225];
var score = 0;
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * 350 * Math.random();

    //for collision
    if (((player.x - this.x <= 50) && (player.x - this.x >= -50)) && (player.y === this.y)) {
        player.y = 395;
        if (score > 0) score -= 1;
        alert("The bug ate you up !! score = " + score);

    }
    //for resetting position of enemy to 0
    if (this.x > 505) {
        this.x = 0;
        this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 400;
    this.y = 395;
};

Player.prototype.update = function(dt) {
    if ((this.x > 400) || (this.x < 0)) {
        this.x = 0;

    }
    if (this.y > 395) {
        this.y = 395;
    }
    if (this.y < 0) {
        score += 1;
        alert("congrats !! score = " + score);
        this.y = 395;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(inp) {
    if (inp === "left") {
        this.x = this.x - 100;
    } else if (inp === "up") {
        this.y -= 85;
    } else if (inp === "down") {
        this.y += 85;
    } else if (inp === "right") {
        this.x += 100;
    }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
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
