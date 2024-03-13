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

function preload() {
  this.load.image("player", "assets/images/default.png");
  this.load.image("coin", "assets/images/coin.png");
  this.load.image("startButton", "assets/images/start.png");
}

function create() {
  // Create start button
  var startButton = this.add.sprite(500, 350, "startButton").setInteractive();
  startButton.setScale(0.5);

  startButton.setInteractive();

  // Start game when start button is clicked
  startButton.on("pointerdown", () => {
    startButton.destroy(); // Remove start button
    gameStarted = true;
    startGame();
  });

  // Function to initialize game
  const startGame = () => {
    // player sprite
    player = this.physics.add.sprite(0, 650, "player");
    player.setScale(0.2);
    // to not cross the screen
    player.setCollideWorldBounds(true);

    // initial coin
    respawnCoin();

    // coin count
    Totalcoin = 0;

    // score text
    scoreText = this.add.text(16, 16, "Coin: " + Totalcoin, {
      fontSize: "32px",
      fill: "#FFFFFF",
    });

    // Set the end time for the game
    endTime = this.time.now + gameDuration;

    // game timer
    timer = this.time.addEvent({
      delay: gameDuration,
      callback: endGame,
      callbackScope: this,
    });

    // If player touches coin, score increases and coin reappear in another location
    this.physics.add.collider(player, coin, collectCoin, null, this);
  };

  //to respawn the coin
  const respawnCoin = () => {
    if (coin) {
      coin.destroy(); // Destroy previous coin
    }
    coin = this.physics.add.sprite(
      Phaser.Math.Between(0, 1000),
      Phaser.Math.Between(0, 700),
      "coin"
    );
    coin.setScale(0.1);
  };

  // collect coin
  const collectCoin = () => {
    coin.disableBody(true, true);
    Totalcoin++;
    scoreText.setText("Coin: " + Totalcoin);
    respawnCoin(); // Respawn the coin

    this.physics.add.collider(player, coin, collectCoin, null, this);
    //to be able t collect more coin
  };
}

function update() {
  if (gameStarted) {
    // Player movement
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
  }
}