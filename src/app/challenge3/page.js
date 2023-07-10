import React from "react";
import GameField from "../components/GameField";
import levelTwoTargets from "../../assets/images/levelTwoTargets.png";
import levelThreeWorior from "../../assets/images/woriors.png";
import level3bg from "../../assets/images/level3bg.png";

export default function page() {
  return (
    <GameField
      levelNumber={3}
      scoreToPassLevel={3}
      challengeHint={
        "You need to hit the enemy 3 times. be carefull not to to kill the woriors"
      }
      unlock={"contact"}
      levelBg={level3bg}
      levelTarget={levelTwoTargets}
      levelWorior={levelThreeWorior}
      woriorSpriteFrame={14}
      woriorSpriteWidth={106.4}
      woriorSpriteHeight={141}
    />
  );
}
