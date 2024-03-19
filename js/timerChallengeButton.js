import { startTimerChallenge } from "./gamelogic.js";
export function handleTimerChallengeButton(scene) {
  var timerchallengeButton = scene.add
    .sprite(500, 400, "timerchallengeButton")
    .setInteractive();
  timerchallengeButton.setScale(0.5);
  timerchallengeButton.on("pointerdown", () => {
    timerchallengeButton.destroy(); // Remove the images/texts displayed
    scene.startButton.destroy();
    scene.shopButton.destroy();
    scene.playerimg.destroy();
    scene.highscore.destroy();
    scene.Totalcoin.destroy();
    scene.gameStarted = true;
    // Call startTimerChallenge function if defined
    if (typeof startTimerChallenge === "function") {
      startTimerChallenge(scene);
    }
  });
}
