export function startGame(scene) {
  // player sprite
  scene.player = scene.physics.add.sprite(0, 650, "player");
  scene.player.setScale(0.2);
  // player physics properties
  scene.player.setCollideWorldBounds(true);

  // Create initial coin
  respawnCoin(scene);

  // coin count
  scene.Totalcoin = 0;

  // score text
  scene.scoreText = scene.add.text(16, 16, "Coin: " + scene.Totalcoin, {
    fontSize: "32px",
    fill: "#FFFFFF",
  });

  // If player touches coin, score increases and coin reappear in another location
  scene.physics.add.collider(
    scene.player,
    scene.coin,
    () => collectCoin(scene),
    null,
    scene
  );
}

export function startTimerChallenge(scene) {
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
  console.log("Timer challenge started!");
}
