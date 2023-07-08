const checkCollision = (
  objX,
  objY,
  spriteHeight,
  spriteWidth,
  bulletPositionX,
  bulletPositionY,
  bulletSpriteWidth,
  bulletSpriteHeight
) => {
  return !!(
    objX + spriteWidth >= bulletPositionX + 50 &&
    objX <= bulletPositionX - 50 + bulletSpriteWidth &&
    objY + spriteHeight >= bulletPositionY &&
    objY + 20 <= bulletPositionY + bulletSpriteHeight - 40
  );
};

export default checkCollision;
