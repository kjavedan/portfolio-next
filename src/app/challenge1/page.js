import React from "react";
import GameField from "../components/GameField";
import levelOneTargets from "../../assets/images/levelOneTargets.png";
import level1Bg from "../../assets/images/level1bg.png";

export default function page() {
  return (
    <GameField
      levelNumber={1}
      scoreToPassLevel={1}
      unlock={"about"}
      levelBg={level1Bg}
      levelTarget={levelOneTargets}
    />
  );
}
