import React from "react";
import GameField from "../components/GameField";
import levelTwoTargets from "../../assets/images/levelTwoTargets.png";
import level2bg from "../../assets/images/level2bg.png";

export default function page() {
  return (
    <GameField
      levelNumber={2}
      scoreToPassLevel={2}
      unlock={"projects"}
      levelBg={level2bg}
      levelTarget={levelTwoTargets}
    />
  );
}
