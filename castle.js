class Castle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, dx) {
    super(scene, x, y, dx)

    this.health = 500;
    this.dx = dx;

    this.setTexture('castle');
    this.setPosition(x, y);
    this.setDepth(3);

    scene.add.existing(this);
  }

  damage(amount) {
    return this.health -= amount;
  }

  heal() {

    if(this.health + 125 > 500) {
      return this.health = 500;
    } else {
      return this.health += 125;
    }
    
  }

}