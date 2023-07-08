import React from "react";
import GameField from "../components/GameField";
import levelTwoTargets from "../../assets/images/levelTwoTargets.png";
import level3bg from "../../assets/images/level3bg.png";

export default function page() {
  return (
    <GameField
      levelNumber={3}
      scoreToPassLevel={5}
      unlock={"contact"}
      levelBg={level3bg}
      levelTarget={levelTwoTargets}
    />
  );
}
