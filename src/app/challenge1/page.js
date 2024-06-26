import React from "react";
import GameField from "../components/GameField";
import levelOneTargets from "../../assets/images/levelOneTargets.png";
import level1Bg from "../../assets/images/level1Bg.png";

export default function Page() {
  return (
    <GameField
      levelNumber={1}
      scoreToPassLevel={2}
      challengeHint={"You need to hit the enemy 2 time to unlock about me."}
      unlock={"about"}
      levelBg={level1Bg}
      levelTarget={levelOneTargets}
    />
  );
}
