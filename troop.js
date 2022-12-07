class Troop extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, trooptype, frame, dx, dy, healthValue, damageValue, cost, range, speed, healthBarDif) {
    //scene, pos x, pos y, string(texture), frame(null), Health, damage, cost, range, speed
    super(scene, x, y, trooptype, healthValue, damageValue, cost, speed, healthBarDif);

    this.trooptype = trooptype;
    this.healthValue = healthValue;
    this.damageValue = damageValue;
    this.cost = cost;
    this.speed = speed;
    this.range = range;
    this.dx = dx;
    this.dy = dy;
    this.freeze = false;
    this.healthBarDif = healthBarDif;

    this.setTexture(this.trooptype);
    this.setScale(1.2);
    this.setPosition(x, y);
    this.setDepth(2);

    this.play(this.trooptype + 'walk');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setVelocityX(this.speed);

    this.alive = true;

    this.hp = new HealthBar(scene, x, (y - healthBarDif), healthValue);

    this.maxCoolDown = 120;
    this.coolDown = 0;

    this.freezeMaxCoolDown = 300;
    this.freezeCoolDown = this.freezeMaxCoolDown;

  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  checkRange(enemy) {
    let deltaX = false;
    let deltaY = false;

    if (this.speed > 0) {
      deltaX = (Math.abs((this.x + this.dx) - (enemy.x - (enemy.dx))) < this.range);
    } else if (this.speed < 0) {
      deltaX = (Math.abs((this.x - (this.dx) - (enemy.x + enemy.dx)) < this.range));
    }

    if (this.y == enemy.y) {
      deltaY = true;
    } else if (this.y > enemy.y) {
      deltaY = (this.y - this.dy) < (enemy.y + enemy.dy);
    } else if (this.y < enemy.y) {
      deltaY = (this.y + this.dy) > (enemy.y - enemy.dy);
    }

    if (deltaX && deltaY) {
      return true;
    } else {
      return false;
    }
  }

  checkCastleRange(castle) {

    if (this.speed > 0) {
      return (Math.abs((this.x + this.dx) - (castle.x + castle.dx)) < this.range)
    } else if (this.speed < 0) {
      return (Math.abs((this.x - (this.dx) - (castle.x + castle.dx)) < this.range));
    }
  }

  checkGoldmineRange(goldmine) {
    let deltaX = false;
    let deltaY = false;

    deltaX = (Math.abs((this.x - (this.dx) - (goldmine.x + goldmine.dx)) < this.range));

    if (this.y == goldmine.y) {
      deltaY = true;
    } else if (this.y > goldmine.y) {
      deltaY = (this.y - this.dy) < (goldmine.y + goldmine.dy);
    } else if (this.y < goldmine.y) {
      deltaY = (this.y + this.dy) > (goldmine.y - goldmine.dy);
    }

    if (deltaX && deltaY) {
      return true;
    } else {
      return false;
    }

  }

  damage(amount) {
    if (this.hp.decrease(amount)) {
      this.alive = false;

      this.play(this.trooptype + 'death');

      let sound = Phaser.Math.Between(1, 3);
  
      if(sound === 1) {
        popOne.play();
      }

      if(sound === 2) {
        popTwo.play();
      }

      if(sound === 3) {
        popThree.play();
      }
      
      setTimeout(() => {
        this.setVisible(false);
      }, 500);

      this.disableBody();
      this.hp.deleteHealthBar();
    }
  }


  attack(enemy) {
    var target = (enemy);

    if (target && this.alive && this.coolDown === 0) {
      //this.play(this.color + 'Attack');

      this.play(this.trooptype + 'attack');

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

    if (!target.alive) {
      this.play(this.trooptype + 'walk');
    }

    if (this.coolDown > 0) {
      this.coolDown--;
    }
  }

  freezeTroop() {
    //console.log('Calling freezeTroop');
    if (this.freezeCoolDown === 0) {
      //console.log('if true');
      this.setVelocityX(this.speed);
      this.freeze = false;
      this.freezeCoolDown = this.freezeMaxCoolDown;
    } else {
      //console.log('else');
      this.setVelocityX(0);
    }

    if (this.freezeCoolDown > 0) {
      this.freezeCoolDown--;
    }

  }

  arrowDrop() {
    this.healthValue -= 50;
    this.damage(50);
  }

  followTroop() {
    this.hp.healthFollowTroop(this.x);
  }

}

class Infantry extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'Infantry', null, 25, 40, 100, 30, 50, 10, 35, 75);
    //scene, pos x, pos y, string(texture), frame(null), 
    //Different X, difference y, Health, damage, cost, range, speed, healthBarDifference
  }
}

class Archer extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'Archer', null, 25, 40, 75, 40, 50, 150, 40, 75);
  }
}

class Tank extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'Tank', null, 25, 40, 250, 10, 75, 25, 30, 75);
  }
}

class Wizard extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'Wizard', null, 25, 40, 50, 60, 75, 100, 30, 75);
  }
}

class Calvary extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'Calvary', null, 75, 60, 150, 65, 200, 25, 45, 110);
  }
}

class EnemyInfantry extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'EnemyInfantry', null, 25, 40, 100, 30, 50, 10, -30, 75);
  }
}

class EnemyArcher extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'EnemyArcher', null, 25, 40, 75, 40, 50, 150, -40, 75);
  }
}

class EnemyTank extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'EnemyTank', null, 25, 40, 250, 10, 75, 25, -30, 75);
  }
}

class EnemyWizard extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'EnemyWizard', null, 25, 40, 50, 60, 75, 100, -30, 75);
  }
}

class EnemyCalvary extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'EnemyCalvary', null, 75, 60, 150, 65, 200, 25, -45, 110);
  }
}