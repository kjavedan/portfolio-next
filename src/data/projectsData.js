import blindboxImg from "../assets/images/blindBoxImg.png";
import targetImg from "../assets/images/targetImg.png";
import treasureImg from "../assets/images/treasureImg.png";
import rin from "../assets/images/rin.png";
import other from "../assets/images/other.png";

export default [
  {
    name: "blindbox",
    description:
      "I’t simply an app where you can draw to get certain item in a box",
    usedTech: "React, MUI, Router, Context",
    img: blindboxImg,
  },
  {
    name: "arcade",
    description:
      "You have to shoot certain number of targets in a specific time",
    usedTech: "React, Styled-components, Context, Canvas",
    img: targetImg,
  },
  {
    name: "pirate",
    description:
      "You can set a trap so other player can fall in it and lose their money",
    usedTech: "React, Sass-module, Context",
    img: treasureImg,
  },
  {
    name: "bomei play",
    description:
      "It’s where all of the above applications connect to each other",
    usedTech: "React, Three.js, MUI, Router, Context",
    img: rin,
  },
  {
    name: "other...",
    description: "couple more",
    usedTech: "HTML, css, javascript, sass, react, styled-components",
    img: other,
  },
];
