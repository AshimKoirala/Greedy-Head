export function startGame(scene) {
  // Initialize variables
  let player;
  let coin;
  let Totalcoin = 0;
  let scoreText;

  // Create player sprite
  player = scene.physics.add.sprite(0, 650, "player");
  player.setScale(0.2);
  player.setCollideWorldBounds(true); // Player physics properties

  // Create initial coin
  respawnCoin();

  // Display coin count text
  scoreText = scene.add.text(16, 16, "Coin: " + Totalcoin, {
    fontSize: "32px",
    fill: "#FFFFFF",
  });

  // If player touches coin, collect it
  scene.physics.add.collider(player, coin, collectCoin, null, scene);

  // Respawn the coin function
  function respawnCoin() {
    if (coin) {
      coin.destroy(); // Destroy previous coin
    }
    coin = scene.physics.add.sprite(
      Phaser.Math.Between(0, 1000),
      Phaser.Math.Between(0, 700),
      "coin"
    );
    coin.setScale(0.1);
  }

  // Collect coin function
  function collectCoin() {
    coin.disableBody(true, true);
    Totalcoin++;
    scoreText.setText("Coin: " + Totalcoin);
    respawnCoin(); // Respawn the coin
  }
}

function respawnCoin(scene) {
  if (scene.coin) {
    scene.coin.destroy(); // Destroy previous coin
  }
  scene.coin = scene.physics.add.sprite(
    Phaser.Math.Between(0, 1000),
    Phaser.Math.Between(0, 700),
    "coin"
  );
  scene.coin.setScale(0.1);
}

function collectCoin(scene) {
  scene.coin.disableBody(true, true);
  scene.Totalcoin++;
  scene.scoreText.setText("Coin: " + scene.Totalcoin);
  respawnCoin(scene); // Respawn the coin
}

export function startTimerChallenge(scene) {
  let player;
  let coin;
  let Totalcoin = 0;
  let scoreText;
  let timer;
  let endTime;
  let timerText;
  let gameStarted = true;
  const gameDuration = 15000;

  // Respawn the coin
  const respawnCoin = () => {
    if (coin) {
      coin.destroy(); // Destroy previous coin
    }
    coin = scene.physics.add.sprite(
      Phaser.Math.Between(0, 1000),
      Phaser.Math.Between(0, 700),
      "coin"
    );
    coin.setScale(0.1);
  };

  // Coin collection
  const collectCoin = () => {
    coin.disableBody(true, true);
    Totalcoin++;
    scoreText.setText("Coin: " + Totalcoin);
    respawnCoin(); // Respawn the coin

    scene.physics.add.collider(player, coin, collectCoin, null, scene);
  };

  const endGame = () => {
    console.log("Game Over");
    gameStarted = false;
    var gameOverText = scene.add.text(350, 250, "Game Over", {
      fontSize: "64px",
      fill: "#FFFFFF",
    });

    var HomeText = scene.add.text(450, 350, "Home", {
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
      scene.scene.restart(); // Restart the game
    });
  };

  // Update the timer display
  const updateTimer = () => {
    var remainingTime = Math.max(0, endTime - scene.time.now);
    var seconds = Math.ceil(remainingTime / 1000);
    timerText.setText("Time: " + seconds);
  };

  // Player sprite
  player = scene.physics.add.sprite(0, 650, "player");
  player.setScale(0.2);
  // Player physics properties
  player.setCollideWorldBounds(true);

  // Create initial coin
  respawnCoin();

  // Coin count
  Totalcoin = 0;

  // Score text
  scoreText = scene.add.text(16, 16, "Coin: " + Totalcoin, {
    fontSize: "32px",
    fill: "#FFFFFF",
  });

  // Set the end time for the game
  endTime = scene.time.now + gameDuration;

  // Start the game timer
  timer = scene.time.addEvent({
    delay: gameDuration,
    callback: endGame,
    callbackScope: scene,
  });

  // Display the timer text
  timerText = scene.add.text(850, 16, "", {
    fontSize: "32px",
    fill: "#FFFFFF",
  });

  // Update the timer display every second
  scene.time.addEvent({
    delay: 1000,
    callback: updateTimer,
    callbackScope: scene,
    loop: true,
  });

  // If player touches coin, score increases and coin reappear in another location
  scene.physics.add.collider(player, coin, collectCoin, null, scene);

  console.log("Timer challenge started!");
}
