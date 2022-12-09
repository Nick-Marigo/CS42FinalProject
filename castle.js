class Castle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, dx, healthBarX, healthBarY) {
    super(scene, x, y, dx)
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.value = 500;
    this.dx = dx;
    this.healthBarX = healthBarX;
    this.healthBarY = healthBarY;
    this.p = 390 / 500;

    this.setTexture('castle');
    this.setPosition(x, y);
    this.setDepth(3);
    this.bar.setScrollFactor(0, 0);

    this.draw();

    scene.add.existing(this);
    scene.add.existing(this.bar);
  }

  decrease(amount) {
    this.value -= amount;

    if (this.value < 0) {
      this.value = 0;
    }

    this.draw();

    return (this.value === 0);
  }

  damage(amount) {
    let newAmount = amount / 10;
    this.decrease(newAmount);
    return this.value -= newAmount;
  }

  heal() {

    if (this.value + 125 > 500) {
      return this.value = 500;
    } else {
      return this.value += 125;
    }

  }

  draw() {
    this.bar.clear();

    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.healthBarX, this.healthBarY, 400, 40);

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.healthBarX + 5, this.healthBarY + 5, 390, 30);

    if (this.value < 120) {
      this.bar.fillStyle(0xff0000);
    }
    else {
      this.bar.fillStyle(0x00ff00);
    }

    var d = Math.floor(this.p * this.value);

    this.bar.fillRect(this.healthBarX + 5, this.healthBarY + 5, d, 30);
  
  }

}