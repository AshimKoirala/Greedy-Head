import { startGame } from "./gamelogic.js";
export function handleStartButton(scene) {
  var startButton = scene.add.sprite(500, 350, "startButton").setInteractive();
  startButton.setScale(0.5);
  startButton.on("pointerdown", () => {
    gameStarted = true;
    startGame(scene);
  });
}
