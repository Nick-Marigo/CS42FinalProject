class GoldMine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, gold) {
    super(scene, x, y, gold)

    this.health = 150;
    this.dx = 35;
    this.dy = 35;
    this.goldProduced = gold;
    this.alive = true;

    this.setTexture('goldMine');
    this.setPosition(x, y);
    this.setDepth(3);

    scene.add.existing(this);
  }

  damage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.alive = false;
      this.setVisible(false);
    }

    return this.health;
  }

  collectGold() {
    return this.goldProduced;
  }
}