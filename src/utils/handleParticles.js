// particle blueprint
class Particle {
  // setup the properties of each particle
  constructor(ctx, spriteWidth, spriteHeight, destinationX, destinationY) {
    this.ctx = ctx;
    this.x = destinationX;
    this.y = destinationY;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 3 - 1;
    this.speedY = Math.random() * 2 - 0;
    this.color = "rgba(217, 217, 217, 0.5)";
  }
  // update particles time by time
  update() {
    this.x -= this.speedX;
    this.y -= this.speedY;
  }
  // draw the design of particles
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

//handle the particles
export default function handleParticles(
  ctx,
  spriteWidth,
  spriteHeight,
  destinationX,
  destinationY,
  particlesArray
) {
  // making loop for creating more than one particles
  particlesArray.unshift(
    new Particle(ctx, spriteWidth, spriteHeight, destinationX, destinationY)
  );
  for (const element of particlesArray) {
    element.update();
    element.draw();
  }

  if (particlesArray.length > 15) {
    for (let i = 0; i < 12; i++) {
      particlesArray.pop(particlesArray[i]);
    }
  }
}
