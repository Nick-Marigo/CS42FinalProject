class Castle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y)

    this.health = 500;

    this.setTexture('castle');
    this.setPosition(x, y);
    this.setDepth(3);

    scene.add.existing(this);
  }

  damage(amount) {
    return this.health -= amount;
  }
  
}