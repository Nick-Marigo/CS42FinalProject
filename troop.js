class Troop extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, trooptype, healthValue, damageValue, cost) {
    super(scene, x, y);

    this.trooptype = trooptype;
    this.healthValue = healthValue;
    this.damageValue = damageValue;
    this.cost = cost;

    this.setPosition(x, y);
    this.setVelocity(50);

    scene.add.existing(this);

    this.alive = true;

    this.hp = new HealthBar(scene, x, y, healthValue);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  getCost()
  {
    return this.cost;
  }

  checkRange(enemy) {
    let deltaX = this.x - enemy.x;
    let deltaY = this.y - enemy.y;
    let distance = Math.sqrt( Math.pow(deltaX, 2) + Math.pow(deltaY, 2) );

    return(distance < this.range);
    
  }
  
  damage(amount) 
  {  
    if (this.hp.decrease(amount)) {
      this.alive = false;

      this.play(this.color + 'Dead');

      //Something to delete the troop
    }
  }

  attack() {
    var target = ();

    if (target && this.alive) {
      this.play(this.color + 'Attack');

      var offset = (this.color === 'blue') ? 20 : -20;
      var targetX = (this.color === 'blue') ? target.x + 30 : target.x - 30;

      this.missile.setPosition(this.x + offset, this.y + 20).setVisible(true);

      this.scene.tweens.add({
        targets: this.missile,
        x: targetX,
        ease: 'Linear',
        duration: 500,
        onComplete: function(tween, targets) {
          targets[0].setVisible(false);
        }
      });

      target.damage(Phaser.Math.Between(2, 8));

      this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.fire, callbackScope: this });
    }
  }

}

class Infantry extends Troop {
  constructor(scene, x, y) 
  {
    super(scene, x, y, 'infantry', health, damage, cost);
  }

}