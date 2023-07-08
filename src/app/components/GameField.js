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
import Link from "next/link";

export default function page({
  levelNumber,
  scoreToPassLevel,
  unlock,
  levelBg,
  levelTarget,
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
  const bulletRef = useRef(null);
  const explosionRef = useRef(null);

  //CANVAS CONTEXT
  const { level, unlockLevel } = useContext(LevelContext);
  const [ctx, setCtx] = useState("");

  //STATES
  const [spriteFrame, setSpriteFrame] = useState(0);
  const [image, setImage] = useState("");
  const [explosionImg, setExplosionImg] = useState("");
  const [bulletImg, setBulletImg] = useState("");
  const [bulletSpriteFrame, setBulletSpriteFrame] = useState(0);
  const [bulletPositionY, setBulletPostionY] = useState(320);
  const [bulletPositionX, setBulletPostionX] = useState(
    screenWidth / 2 - bulletSpriteWidth + 20
  );
  const [objX, setObjX] = useState(-spriteWidth);
  const [objY, setObjY] = useState(50);
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
  const [endsLevel, setEndsLevel] = useState(false);

  // console.log(bulletPositionY);
  // console.log(objX);
  // console.log(spriteFrame);
  // console.log(spriteSizeW);
  // console.log(spriteSizeH);
  // console.log(spriteWidth);
  // console.log(spriteHeight);
  // if (canvasRef.current) {
  //   console.log(canvasRef.current);
  // }
  // console.log(canvasRef.current);

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
        spriteWidth,
        spriteHeight
      );

      //particals-------------------------------------
      handleParticles(
        ctx,
        spriteWidth,
        spriteHeight,
        objX + (spriteWidth / 2 - 10),
        objY + spriteHeight - 8,
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
    }
  };

  const handlePlay = () => {
    setGameStatus(!gameStatus);
    setStartPlay(!startPlay);
  };
  // useEffect (1) getting and settting the canvas and context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = screenWidth;
      canvas.height = screenHeight;
      setImage(targetsRef.current);
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
      }, 40);
    }

    // switching targets frames
    if (spriteFrame >= targetsSpriteFrame) setSpriteFrame(0);
    setSpriteFrame((PS) => PS + 1);

    if (objX > screenWidth) setObjX(-spriteSizeW);
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
        // gameSound && playCollisionFx();
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
        <h2>challenge 1</h2>
        <div className={styles.info}>
          <p>You need to score {scoreToPassLevel} in order to pass the level</p>
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
            <button>{unlock}</button>
          </Link>
        </div>
      )}
    </div>
  );
}
