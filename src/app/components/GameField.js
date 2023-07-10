"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import bulletSrc from "../../assets/images/bulletSrc.png";
import explosionSrc from "../../assets/images/explosionSrc.png";
import Image from "next/image";
import handleParticles from "../../utils/handleParticles";
import shootIcon from "../../assets/icons/shootIcon.png";
import playIcon from "../../assets/icons/playIcon.png";
import pauseIcon from "../../assets/icons/pauseIcon.png";
import checkCollision from "../../utils/collisionDetction";
import { LevelContext } from "../../context/LevelContext";
import { SoundContext } from "../../context/SoundContext";
import Link from "next/link";
import shootSound from "../../assets/sounds/shootFx.mp3";
import collisionSound from "../../assets/sounds/gruntFx.mp3";
import woriorOneGrunt from "../../assets/sounds/worior1grunt.mp3";
import woriorTwoGrunt from "../../assets/sounds/worior2grunt.mp3";
import playToggleSound from "../../assets/sounds/backSound.wav";
import clickSound from "../../assets/sounds/click.wav";

import useSound from "use-sound";

export default function page({
  levelNumber,
  scoreToPassLevel,
  unlock,
  challengeHint,
  levelBg,
  levelTarget,
  levelWorior,
  woriorSpriteFrame,
  woriorSpriteWidth,
  woriorSpriteHeight,
}) {
  //VARIABLES
  const BULLET_SPEED = 10;

  const collisionSpriteWidth = 200;
  const collisionSpriteHeight = 179;

  const spriteWidth = 100;
  const spriteHeight = 90;

  const bulletSpriteWidth = 40.44;
  const bulletSpriteHeight = 55.33;

  const spriteSizeH = 77.6;
  const spriteSizeW = 123.8;
  const targetsSpriteFrame = 17;

  const screenWidth = window.innerWidth >= 900 ? 900 : window.innerWidth;
  const screenHeight = 400;

  const canvasRef = useRef(null);
  const targetsRef = useRef(null);
  const woriorRef = useRef(null);
  const bulletRef = useRef(null);
  const explosionRef = useRef(null);

  //SOUNDS
  const [playShootingSound] = useSound(shootSound);
  const [playCollisionSound] = useSound(collisionSound);
  const [playWoriorOneGrunt] = useSound(woriorOneGrunt);
  const [playWoriorTwoGrunt] = useSound(woriorTwoGrunt);
  const [playGameToggleSound] = useSound(playToggleSound);
  const [playClickSound] = useSound(clickSound);

  //CANVAS CONTEXT
  const { level, unlockLevel } = useContext(LevelContext);
  const { sound } = useContext(SoundContext);
  const [ctx, setCtx] = useState("");

  //STATES
  const [spriteFrame, setSpriteFrame] = useState(0);
  const [woriorOneSpriteFrame, setworiorOneSpriteFrame] =
    useState(woriorSpriteFrame);
  const [woriorTwoSpriteFrame, setworiorTwoSpriteFrame] = useState(0);

  const [image, setImage] = useState("");
  const [woriorImage, setWoriorImage] = useState("");
  const [explosionImg, setExplosionImg] = useState("");
  const [bulletImg, setBulletImg] = useState("");
  const [bulletSpriteFrame, setBulletSpriteFrame] = useState(0);
  const [bulletPositionY, setBulletPostionY] = useState(320);
  const [bulletPositionX, setBulletPostionX] = useState(
    screenWidth / 2 - bulletSpriteWidth + 20
  );

  const [objX, setObjX] = useState(-spriteWidth);
  const [objY, setObjY] = useState(40);

  const [objX1, setObjX1] = useState(screenWidth + spriteWidth);
  const [objY1, setObjY1] = useState(75);

  const [objX2, setObjX2] = useState(-screenWidth);
  const [objY2, setObjY2] = useState(150);

  const [particlesArray, setParticlesArray] = useState([]);
  const [gameStatus, setGameStatus] = useState(false);
  const [startPlay, setStartPlay] = useState(false);
  const [shooting, setShooting] = useState(false);
  const [isCollied, setIsCollied] = useState(false);
  const [collisionInfo, setCollisionInfo] = useState({
    collisionX: undefined,
    collisionY: undefined,
  });
  const [collisionSpriteFrame, setCollisionSpriteFrame] = useState(0);
  const [levelScore, setlevelScore] = useState(0);

  //FUNCTIONS
  const animate = () => {
    if (ctx && startPlay) {
      ctx.clearRect(0, 0, screenWidth, 400);

      // targets animation
      ctx.drawImage(
        image,
        spriteFrame * spriteSizeW,
        0,
        spriteSizeW,
        spriteSizeH,
        objX,
        objY,
        spriteWidth + 20,
        spriteHeight
      );
      // worior 1 animation
      ctx.drawImage(
        woriorImage,
        woriorOneSpriteFrame * woriorSpriteWidth,
        0,
        woriorSpriteWidth,
        woriorSpriteHeight,
        objX1,
        objY1,
        spriteWidth,
        spriteHeight + 20
      );

      // worior 2 animation
      if (levelNumber === 3) {
        ctx.drawImage(
          woriorImage,
          woriorTwoSpriteFrame * woriorSpriteWidth,
          141,
          woriorSpriteWidth,
          woriorSpriteHeight,
          objX2,
          objY2,
          spriteWidth,
          spriteHeight + 20
        );
      }

      //particals-------------------------------------
      handleParticles(
        ctx,
        spriteWidth,
        spriteHeight,
        objX + spriteWidth / 2,
        objY + spriteHeight - 8,
        particlesArray
      );
      handleParticles(
        ctx,
        spriteWidth,
        spriteHeight,
        objX2 + spriteWidth / 2,
        objY2 + spriteHeight - 8,
        particlesArray
      );

      // collision animation
      if (isCollied) {
        ctx.drawImage(
          explosionImg,
          spriteWidth * collisionSpriteFrame,
          0,
          collisionSpriteWidth,
          collisionSpriteHeight,
          collisionInfo.collisionX + 15,
          collisionInfo.collisionY + 15,
          collisionSpriteWidth / 3,
          collisionSpriteHeight / 3
        );
      }

      // bullet animation
      ctx.drawImage(
        bulletImg,
        182 * bulletSpriteFrame,
        0,
        182,
        249,
        bulletPositionX,
        bulletPositionY,
        bulletSpriteWidth,
        bulletSpriteHeight
      );
    }
  };

  if (gameStatus && startPlay) {
    animate();
  }

  const startShooting = () => {
    if (gameStatus && !shooting) {
      setShooting(true);
      sound && playShootingSound();
    }
  };

  const handlePlay = () => {
    setGameStatus(!gameStatus);
    setStartPlay(!startPlay);
    sound && playGameToggleSound();
  };
  // useEffect (1) getting and settting the canvas and context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = screenWidth;
      canvas.height = screenHeight;
      setImage(targetsRef.current);
      setWoriorImage(woriorRef.current);
      setExplosionImg(explosionRef.current);
      const bulletImage = bulletRef.current;
      setCtx(canvas.getContext("2d"));
      setBulletImg(bulletImage);
    }
  }, [ctx, canvasRef, image]);

  //useEffect (2) controlling the bullet position
  useEffect(() => {
    let timeId;
    if (gameStatus && shooting) {
      if (bulletPositionY > -bulletSpriteHeight) {
        timeId = setInterval(() => {
          setBulletPostionY(
            (bulletPositionY) => bulletPositionY - BULLET_SPEED
          );
        }, 40);
      } else {
        setShooting(false);
        setBulletPostionY(320);
      }
    }

    return () => {
      clearInterval(timeId);
    };
  }, [gameStatus, shooting, bulletPositionY]);

  //useEffect (6) bullet animation
  useEffect(() => {
    let timeId;
    if (gameStatus && bulletSpriteFrame < 14) {
      timeId = setInterval(() => {
        setBulletSpriteFrame((PS) => PS + 1);
      }, 70);
    }

    if (bulletSpriteFrame >= 13) setBulletSpriteFrame(0);

    return () => {
      clearInterval(timeId);
    };
  }, [gameStatus, bulletSpriteFrame]);

  //useEffect 9 setting the X corrdination of the objX
  useEffect(() => {
    let timeId;

    if (gameStatus && objX <= screenWidth) {
      timeId = setInterval(() => {
        setObjX((objX) => objX + 5);
        if (levelNumber >= 2 && objX1 >= -woriorSpriteWidth) {
          setObjX1((objX1) => objX1 - 4);
        }
        if (levelNumber >= 3 && objX2 <= screenWidth) {
          setObjX2((objX2) => objX2 + 15);
        }
      }, 40);
    }

    // switching targets 1 frames
    if (spriteFrame >= targetsSpriteFrame) setSpriteFrame(0);
    setSpriteFrame((PS) => PS + 1);

    if (objX > screenWidth) setObjX(-spriteSizeW);

    //level 2 target frams
    if (levelNumber >= 2 && !(objX1 >= -woriorSpriteWidth)) {
      setObjX1(screenWidth + woriorSpriteWidth);
    }
    if (levelNumber >= 2 && woriorOneSpriteFrame <= 0) {
      setworiorOneSpriteFrame(woriorSpriteFrame);
    } else {
      setworiorOneSpriteFrame((prevFrame) => prevFrame - 1);
    }

    //level 3 target frams
    if (levelNumber >= 3 && objX2 > screenWidth) {
      setObjX2(-woriorSpriteWidth);
    }
    if (levelNumber >= 3 && woriorTwoSpriteFrame < woriorSpriteFrame) {
      setworiorTwoSpriteFrame((prevFrame) => prevFrame + 1);
    } else {
      setworiorTwoSpriteFrame(0);
    }

    return () => {
      clearInterval(timeId);
    };
  }, [gameStatus, startPlay, objX]);

  // useEffect (4) collision detection
  useEffect(() => {
    if (gameStatus && shooting) {
      if (
        checkCollision(
          objX,
          objY,
          spriteHeight,
          spriteWidth,
          bulletPositionX,
          bulletPositionY,
          bulletSpriteWidth,
          bulletSpriteHeight
        )
      ) {
        setShooting(false);
        setBulletPostionY(320);
        setObjX(-spriteWidth);
        setlevelScore((score) => score + 1);
        setIsCollied(true);
        setCollisionInfo({ collisionX: objX, collisionY: objY });
        sound && playCollisionSound();
      }
      if (
        levelNumber >= 2 &&
        checkCollision(
          objX1,
          objY1,
          spriteHeight,
          spriteWidth,
          bulletPositionX,
          bulletPositionY,
          bulletSpriteWidth,
          bulletSpriteHeight
        )
      ) {
        setShooting(false);
        setBulletPostionY(320);
        setObjX1(screenWidth + spriteWidth);
        setlevelScore((score) => score - 1);
        setIsCollied(true);
        setCollisionInfo({ collisionX: objX1, collisionY: objY1 });
        sound && playWoriorOneGrunt();
      }
      if (
        levelNumber >= 3 &&
        checkCollision(
          objX2,
          objY2,
          spriteHeight,
          spriteWidth,
          bulletPositionX,
          bulletPositionY,
          bulletSpriteWidth,
          bulletSpriteHeight
        )
      ) {
        setShooting(false);
        setBulletPostionY(320);
        setObjX2(-spriteWidth);
        setlevelScore((score) => score - 1);
        setIsCollied(true);
        setCollisionInfo({ collisionX: objX2, collisionY: objY2 });
        sound && playWoriorTwoGrunt();
      }
    }
  }, [
    gameStatus,
    shooting,
    bulletPositionY,
    levelScore,
    bulletPositionX,
    bulletSpriteWidth,
    objX,
    objY,
    spriteHeight,
    spriteWidth,
  ]);

  //useEffect (5) collision sprite frame switching
  useEffect(() => {
    let timeId;
    if (isCollied && collisionSpriteFrame < 4) {
      timeId = setInterval(() => {
        setCollisionSpriteFrame((PS) => PS + 1);
      }, 18);

      setTimeout(() => {
        setCollisionSpriteFrame(0);
        setIsCollied(false);
      }, 100);

      return () => {
        clearInterval(timeId);
      };
    }
  }, [
    isCollied,
    collisionSpriteFrame,
    bulletPositionX,
    bulletSpriteWidth,
    objX,
    objY,
    collisionInfo.collisionX,
    collisionInfo.collisionY,
    ctx,
    explosionImg,
    spriteWidth,
  ]);

  useEffect(() => {
    if (levelScore >= scoreToPassLevel) {
      unlockLevel(levelNumber);
    }
  }, [levelScore]);

  return (
    <div>
      <div className={styles.header}>
        <h2>challenge {levelNumber}</h2>
        <div className={styles.info}>
          <p>{challengeHint}</p>
          <h4>score: {levelScore}</h4>
        </div>
      </div>
      <div className={styles.main}>
        <Image
          className={styles.levelBg}
          src={levelBg}
          priority={true}
          alt="level background"
        />
        <canvas ref={canvasRef} className={styles.canvas}>
          {/* targets image */}
          <Image
            ref={targetsRef}
            src={levelTarget}
            loading="eager"
            alt=""
            style={{ display: "none" }}
          />
          {/* worior image */}
          <Image
            ref={woriorRef}
            src={levelWorior}
            loading="eager"
            alt=""
            style={{ display: "none" }}
          />
          {/* bullet image */}
          <Image
            ref={bulletRef}
            src={bulletSrc}
            alt=""
            loading="eager"
            style={{ display: "none" }}
          />
          {/* explosion image */}
          <Image
            ref={explosionRef}
            src={explosionSrc}
            alt=""
            loading="eager"
            style={{ display: "none" }}
          />
        </canvas>
      </div>
      <div className={styles.controls}>
        <div onClick={handlePlay} className={styles.play__pause}>
          {gameStatus ? (
            <div>
              <Image src={pauseIcon} loading="eager" alt="shoot btn" />
            </div>
          ) : (
            <div>
              <Image src={playIcon} loading="eager" alt="shoot btn" />
            </div>
          )}
        </div>
        <div onClick={startShooting} className={styles.shoot__btn}>
          <Image src={shootIcon} loading="eager" alt="shoot btn" />
        </div>
      </div>
      {level >= levelNumber && (
        <div className={styles.footer}>
          <div className={styles.unlocked__page}>
            <h3>{unlock}</h3>
            <span>section is unlocked 🔓</span>
          </div>
          <Link href={`/${unlock}`}>
            <button onClick={() => playClickSound()}>{unlock}</button>
          </Link>
        </div>
      )}
    </div>
  );
}
