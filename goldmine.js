/*class GoldMine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, dx, gold) {
    super(scene, x, y, dx, gold)
    
    this.health = 150;
    this.dx = dx;
    this.goldProduced = gold;

    this.setTexture('goldMine');
    this.setPosition(x, y);
    this.setDepth(3);

    scene.add.existing(this);
  }

  damage(amount) {
    return this.health -= amount;
  }

  collectGold() {
    return goldProduced;
  }
}*/