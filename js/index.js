import { handleStartButton } from "./startButton.js";
import { handleTimerChallengeButton } from "./timerChallengeButton.js";

var config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 700,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var player;
var coin;
var gameStarted = false;
var timer;
var gameDuration = 15000;
var endTime;
var timerText;

function preload() {
  // Load images
  this.load.image("player", "assets/images/default.png");
  this.load.image("coin", "assets/images/coin.png");
  this.load.image("startButton", "assets/images/start.png");
  this.load.image("timerchallengeButton", "assets/images/timerchallenge.png");
  this.load.image("shopButton", "assets/images/shop.png");
}

function create() {
  // Implementation of create function
  var highscore = 0;
  var Totalcoin = 0;
  highscore = this.add.text(300, 250, "High Score: " + highscore, {
    fontSize: "30px",
    fill: "#FFFFFF",
  });
  Totalcoin = this.add.text(805, 60, "Total Coin: " + Totalcoin, {
    fontSize: "20px",
    fill: "#FFFFFF",
  });

  handleStartButton(this);
  handleTimerChallengeButton(this);
}

function update() {
  // Player movement
  if (gameStarted) {
    var cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
      player.setVelocityX(200);
    } else if (cursors.up.isDown) {
      player.setVelocityY(-200);
    } else if (cursors.down.isDown) {
      player.setVelocityY(200);
    } else {
      player.setVelocityX(0);
      player.setVelocityY(0);
    }
  } else {
    // If soon as timer hits 0 player stuck at that exact position
    // if (this.time.now > endTime) {
    //    player.setVelocityX(0);
    //    player.setVelocityY(0);
    //  }
  }
}
export { preload, create, update };
