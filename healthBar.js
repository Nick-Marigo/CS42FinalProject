class HealthBar {

  constructor(scene, x, y, health) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.x = x - 41;
    this.y = y;
    this.value = health;
    this.maxValue = health
    this.p = 76 / this.maxValue;

    this.draw();

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

  draw() {
    this.bar.clear();

    //  BG
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, 80, 16);

    //  Health
    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(this.x + 2, this.y + 2, 76, 12);

    if (this.value < 30) {
      this.bar.fillStyle(0xff0000);
    }
    else {
      this.bar.fillStyle(0x00ff00);
    }

    var d = Math.floor(this.p * this.value);

    this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
  }

  deleteHealthBar() {
    this.bar.clear();
  }

  healthFollowTroop(troopX) {
    this.x = troopX - 41;
    this.draw();
  }

}