/* NOTE: things needed to be added and manage
  -total coin count and highscore needed to be updated
  -shop feature providing different heads
  -else part of function update() needs to be change for velocity to be stoped
    (the written code works but makes home button unable to be clicked)
*/
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
  this.load.image("player", "assets/images/default.png");
  this.load.image("coin", "assets/images/coin.png");
  this.load.image("startButton", "assets/images/start.png");
  this.load.image("timerchallengeButton", "assets/images/timerchallenge.png");
  this.load.image("shopButton", "assets/images/shop.png");
}

function create() {
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

  var startButton = this.add.sprite(500, 350, "startButton").setInteractive();
  var timerchallengeButton = this.add
    .sprite(500, 400, "timerchallengeButton")
    .setInteractive();
  var shopButton = this.add.sprite(500, 450, "shopButton").setInteractive();
  var playerimg = this.add.sprite(100, 600, "player");

  playerimg.setScale(0.2);
  startButton.setScale(0.5);
  timerchallengeButton.setScale(0.5);
  shopButton.setScale(0.5);
  highscore.setText("High Score: " + highscore);

  startButton.on("pointerdown", () => {
    startButton.destroy(); // Remove the images/texts displayed
    timerchallengeButton.destroy();
    shopButton.destroy();
    playerimg.destroy();
    highscore.destroy();
    Totalcoin.destroy();
    gameStarted = true;
    startgame();
  });
  // when timer challenged button is clicked
  timerchallengeButton.on("pointerdown", () => {
    startButton.destroy(); // Remove the images/texts displayed
    timerchallengeButton.destroy();
    shopButton.destroy();
    playerimg.destroy();
    highscore.destroy();
    Totalcoin.destroy();
    gameStarted = true;
    startTimerChallenge();
  });

  // when shop button is clicked
  shopButton.on("pointerdown", () => {
    startButton.destroy(); // Remove the images/texts displayed
    timerchallengeButton.destroy();
    shopButton.destroy();
    playerimg.destroy();
    highscore.destroy();
    Totalcoin.destroy();
    gameStarted = true;
    shop();
  });

  //-----------------Below is the Get started-------------------------------------------

  const startgame = () => {
    // player sprite
    player = this.physics.add.sprite(0, 650, "player");
    player.setScale(0.2);
    // player physics properties
    player.setCollideWorldBounds(true);

    // Create initial coin
    respawnCoin();

    // coin count
    Totalcoin = 0;

    // score text
    scoreText = this.add.text(16, 16, "Coin: " + Totalcoin, {
      fontSize: "32px",
      fill: "#FFFFFF",
    });
    // If player touches coin, score increases and coin reappear in another location
    this.physics.add.collider(player, coin, collectCoin, null, this);
  };

  //----------------Below is the TIMER challenge----------------------------------
  const startTimerChallenge = () => {
    // player sprite
    player = this.physics.add.sprite(0, 650, "player");
    player.setScale(0.2);
    // player physics properties
    player.setCollideWorldBounds(true);

    // Create initial coin
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

    // Start the game timer
    timer = this.time.addEvent({
      delay: gameDuration,
      callback: endGame,
      callbackScope: this,
    });

    // Display the timer text
    timerText = this.add.text(850, 16, "", {
      fontSize: "32px",
      fill: "#FFFFFF",
    });

    // Update the timer display every second
    this.time.addEvent({
      delay: 1000,
      callback: updateTimer,
      callbackScope: this,
      loop: true,
    });

    // If player touches coin, score increases and coin reappear in another location
    this.physics.add.collider(player, coin, collectCoin, null, this);
  };

  //respawn the coin
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

  //coin collection
  const collectCoin = () => {
    coin.disableBody(true, true);
    Totalcoin++;
    scoreText.setText("Coin: " + Totalcoin);
    respawnCoin(); // Respawn the coin

    this.physics.add.collider(player, coin, collectCoin, null, this);
  };

  const endGame = () => {
    console.log("Game Over");
    gameStarted = false;
    var gameOverText = this.add.text(350, 250, "Game Over", {
      fontSize: "64px",
      fill: "#FFFFFF",
    });

    var HomeText = this.add.text(450, 350, "Home", {
      fontSize: "32px",
      fill: "#FFFFFF",
      backgroundColor: "#808080",
      padding: {
        x: 10,
        y: 5,
      },
      fixedWidth: 100,
      fixedHeight: 40,
      align: "center",
    });
    HomeText.setInteractive();
    HomeText.on("pointerdown", () => {
      this.scene.restart(); // Restart the game
    });
  };
  //update the timer display
  const updateTimer = () => {
    var remainingTime = Math.max(0, endTime - this.time.now);
    var seconds = Math.ceil(remainingTime / 1000);
    timerText.setText("Time: " + seconds);
  };
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
