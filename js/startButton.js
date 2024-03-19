import { startGame } from "./gamelogic.js";
export function handleStartButton(scene) {
  var startButton = scene.add.sprite(500, 350, "startButton").setInteractive();
  startButton.setScale(0.5);
  startButton.on("pointerdown", () => {
    startButton.destroy(); // Remove the images/texts displayed
    scene.timerchallengeButton.destroy();
    scene.shopButton.destroy();
    scene.playerimg.destroy();
    scene.highscore.destroy();
    scene.Totalcoin.destroy();
    scene.gameStarted = true;
    if (typeof startGame === "function") {
      startGame(scene);
    }
  });
}
