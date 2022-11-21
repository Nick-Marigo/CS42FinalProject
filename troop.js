class Troop extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, trooptype, frame, healthValue, damageValue, cost, range, speed) { //scene, pos x, pos y, string(texture), frame(null), Health, damage, cost, range, speed
    super(scene, x, y, trooptype, healthValue, damageValue, cost, speed);

    this.trooptype = trooptype;
    this.healthValue = healthValue;
    this.damageValue = damageValue;
    this.cost = cost;
    this.speed = speed;
    this.range = range;

    this.setTexture(this.trooptype);
    this.setPosition(x, y);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setVelocityX(this.speed);

    this.alive = true;

    this.hp = new HealthBar(scene, x, y, healthValue);

    this.maxCoolDown = 120;
    this.coolDown = 0;

  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  checkRange(enemy) {
    let deltaX = this.x - enemy.x;
    let deltaY = this.y - enemy.y;
    let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    return (distance < this.range);
  }

  damage(amount) {
    if (this.hp.decrease(amount)) {
      this.alive = false;

      //this.play(this.color + 'Dead');

      this.setVisible(false);
      this.disableBody();
      this.hp.deleteHealthBar();
    }
  }


  attack(enemy) {
    var target = (enemy);

    if (target && this.alive && this.coolDown === 0) {
      //this.play(this.color + 'Attack');

      //var offset = (this.color === 'blue') ? 20 : -20;
      //var targetX = (this.color === 'blue') ? target.x + 30 : target.x - 30;

      //this.missile.setPosition(this.x + offset, this.y + 20).setVisible(true);

      /*this.scene.tweens.add({
        targets: this.missile,
        x: targetX,
        ease: 'Linear',
        duration: 500,
        onComplete: function(tween, targets) {
          targets[0].setVisible(false);
        }
      });*/

      target.healthValue -= this.damageValue;
      target.damage(this.damageValue);
      this.coolDown = this.maxCoolDown;
    }

    if (this.coolDown > 0) {
      this.coolDown--;
    }
  }

  getDamage() {
    return this.damageValue;
  }
  
}

class Infantry extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'infantry', null, 100, 30, 50, 50, 200); //scene, pos x, pos y, string(texture), frame(null), Health, damage, cost, range, speed
  }
}

class enemy extends Troop {
  constructor(scene, x, y) {
    //super(scene, x, y, 'enemy', null, 100, 30, 50, 50, -50);
    super(scene, x, y, 'enemy', null, 100, 0, 0, 0, 0);
  }
}


/*
var Troops = {
  Infantry: [{
    health: 100,
    damage: 30,
    cost: 30,
  }],
  Archer: [{
    health: 75,
    damage: 40,
    cost: 50,
  }],
  Tank: [{
    health: 250,
    damage: 10,
    cost: 75
  }],
  Wizard: [{
    health: 50,
    damage: 80,
    cost: 100
  }],
  Calvary: [{
    health: 150,
    damage: 65,
    cost: 200
  }]
}*/

