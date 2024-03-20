import { startTimerChallenge } from "./gamelogic.js";
export function handleTimerChallengeButton(scene) {
  var timerchallengeButton = scene.add
    .sprite(500, 400, "timerchallengeButton")
    .setInteractive();
  timerchallengeButton.setScale(0.5);
  timerchallengeButton.on("pointerdown", () => {
    gameStarted = true;
    startTimerChallenge(scene);
  });
}
