import React from "react";
import GameField from "../components/GameField";
import levelTwoTargets from "../../assets/images/levelTwoTargets.png";
import levelTwoWorior from "../../assets/images/woriors.png";
import level2bg from "../../assets/images/level2bg.png";

export default function Page() {
  return (
    <GameField
      levelNumber={2}
      scoreToPassLevel={3}
      unlock={"projects"}
      challengeHint={
        "You need to hit the enemy 3 times. be carefull not to to kill the worior"
      }
      levelBg={level2bg}
      levelTarget={levelTwoTargets}
      levelWorior={levelTwoWorior}
      woriorSpriteFrame={14}
      woriorSpriteWidth={106.4}
      woriorSpriteHeight={141}
    />
  );
}
