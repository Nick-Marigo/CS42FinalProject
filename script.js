/*  Students: Please use this week's project for Week 14: Assignment 17: Rough Draft. 
     You will need to replace the contents of this JavaScript file with your own work, 
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in Canvas to be graded. */
/*let titleScene = {
key: 'titleScene',
active: true,
preload: titlePreload,
create: titleCreate,
update: titleUpdate
};*/
class HealthBar {

  constructor(scene, x, y, health) {
    this.bar = new Phaser.GameObjects.Graphics(scene);

    this.x = x;
    this.y = y;
    this.value = health;
    this.p = 76 / 100;

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

}

class Troop extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, trooptype, test, healthValue, damageValue, cost, range, speed) { //scene, pos x, pos y, string(texture), frame(null), Health, damage, cost, range, speed
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

    if (target && this.alive) {
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

      this.timer = this.scene.time.addEvent({ delay: Phaser.Math.Between(1000, 3000), callback: this.attack, callbackScope: this });
    }
  }
}

class Infantry extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'infantry', null, 100, 30, 50, 50, 50); //scene, pos x, pos y, string(texture), frame(null), Health, damage, cost, range, speed
  }
}

//import {Troop, Infantry} from 'troops.js';

class enemy extends Troop {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy', null, 100, 0, 0, 0, 0);
  }
}

let gamePlayScene = {
  key: "gamePlayScene",
  active: false,
  preload: gamePreload,
  create: gameCreate,
  update: gameUpdate
};

let config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 1000,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  fps: { forceSetTimeOut: true, target: 60 },
  scene: [gamePlayScene],
  //parent: "tron"
};

let game = new Phaser.Game(config);

let cursors;
let mycamera;
var button1, button2, button3, button4, button5;
let goldCount;
let gold = 250;
let troopBarrierBottom = 700, troopBarrierTop = 200;
let boundryBottom, boundryTop;
let canplace = false;
let textCantPlace;
let tracking_pointer = false;
const troopbuttons = [1, 2, 3, 4, 5];
let currentTroop = 0;
let updateCount = 1;

var enemyTroops = [];

var Troops = [];

function gamePreload() {
  this.load.image('map', 'assets/Testing/testmap.png');

  this.load.image('button1', 'assets/Testing/testButtons/buttonInfantry.png');
  this.load.image('button2', 'assets/Testing/testButtons/buttonArcher.png');
  this.load.image('button3', 'assets/Testing/testButtons/buttonTank.png');
  this.load.image('button4', 'assets/Testing/testButtons/buttonWizard.png');
  this.load.image('button5', 'assets/Testing/testButtons/buttonCalvary.png');

  this.load.image('troopBoundry', 'assets/Testing/troopboundries.png');

  this.load.image('infantry', 'assets/Testing/testTroops/testTroopInfantry.png');
  this.load.image('archer', 'assets/Testing/testTroops/testTroopArcher.png');
  this.load.image('tank', 'assets/Testing/testTroops/testTroopTank.png');
  this.load.image('wizard', 'assets/Testing/testTroops/testTroopWizard.png');
  this.load.image('calvary', 'assets/Testing/testTroops/testTroopCalvary.png');

  this.load.image('enemy', 'assets/Testing/testTroops/testenemy.png');

}

function gameCreate() {

  this.add.image(3000, 500, 'map');

  this.physics.world.setBounds(0, 0, 6000, 1000);

  goldCount = this.add.text(10, 16, 'Gold: ' + gold, { fontFamily: 'Domine', fontSize: '40px', color: '#A316C7', stroke: '#000000', strokeThickness: 5 });
  goldCount.setScrollFactor(0, 0);

  boundryBottom = this.add.image(3000, troopBarrierBottom, 'troopBoundry');
  boundryTop = this.add.image(3000, troopBarrierTop, 'troopBoundry');
  boundryBottom.setVisible(false);
  boundryTop.setVisible(false);

  //testEnemy = new enemy(this, 800, 500);
  //console.log(testEnemy);
  enemyTroops.push(new enemy(this, 800, 500));
  enemyTroops.push(new enemy(this, 900, 500));
  enemyTroops.push(new enemy(this, 1000, 500));

  button1 = this.add.image(100, 850, 'button1');
  button1.setInteractive();

  button2 = this.add.image(200, 850, 'button2');
  button2.setInteractive();

  button3 = this.add.image(300, 850, 'button3');
  button3.setInteractive();

  button4 = this.add.image(400, 850, 'button4');
  button4.setInteractive();

  button5 = this.add.image(500, 850, 'button5');
  button5.setInteractive();

  mycamera = this.cameras.main;
  cursors = this.input.keyboard.createCursorKeys();
  //this.cameras.main.setBounds(0, 0, 6000, 1000);


  textCantPlace = this.add.text(mycamera.x + 350, mycamera.y + 450, 'Can not place troop there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlace.setVisible(false);
  textCantPlace.setScrollFactor(0, 0);

  button1.on('pointerdown', selectTroop, { param1: troopbuttons[0] });

  button2.on('pointerdown', selectTroop, { param1: troopbuttons[1] });

  button3.on('pointerdown', selectTroop, { param1: troopbuttons[2] });

  button4.on('pointerdown', selectTroop, { param1: troopbuttons[3] });

  button5.on('pointerdown', selectTroop, { param1: troopbuttons[4] });

  this.input.on('pointerup', spawnTroop, this);

}

function gameUpdate() {

  updateCount++;

  if (updateCount % 300 === 0) {
    gold += 30;
    goldCount.setText('Gold: ' + gold);
    updateCount = 1;
  }

  if (cursors.right.isDown) {
    if (mycamera.x != -4080) {
      mycamera.x -= 5;
    }
  }

  if (cursors.left.isDown) {
    if (mycamera.x != 0) {
      mycamera.x += 5;
    }
  }

  goldCount.setText('Gold: ' + gold);

  //console.log('Update: ', canplace, currentTroop, gold);


  if (canplace) {
    if (game.input.mousePointer.y > troopBarrierTop && game.input.mousePointer.y < troopBarrierBottom) {
      textCantPlace.setVisible(false);
      boundryBottom.setVisible(false);
      boundryTop.setVisible(false);
    } else {
      textCantPlace.setVisible(true);
      boundryBottom.setVisible(true);
      boundryTop.setVisible(true);
    }
  }

  //console.log('Test enemy length', enemyTroops.length);

  Troops.forEach((spec) => {
    for(let count = 0; count < enemyTroops.length; count++) {
      
      if (spec.checkRange(enemyTroops[count]) && enemyTroops[count].alive) {
        spec.setVelocityX(0);
        spec.attack(enemyTroops[count]);
        //console.log('Troop Health', spec.healthValue, 'Enemy Health',       enemyTroops[count].healthValue, 'Enemy Alive:', enemyTroops[count].alive);
      } else {
        spec.setVelocityX(spec.speed);
      }
      
    }
  })



}

function selectTroop() {

  if (gold - 50 < 0) {
    return;
  }

  canplace = true;
  currentTroop = this.param1;

}

function spawnTroop(pointer) {

  if (pointer.position.y < troopBarrierTop || pointer.position.y > troopBarrierBottom) {
    return;
  }

  if (currentTroop <= 0) {
    return;
  }

  if (currentTroop === 1) {
    //this.physics.add.sprite(0, pointer.y, 'infantry').setVelocityX(50);
    Troops.push(new Infantry(this, 0, pointer.y));
    gold -= Troops[Troops.length - 1].cost;
  }

  if (currentTroop === 2) {
    this.physics.add.sprite(0, pointer.y, 'archer').setVelocityX(50);
    gold -= Troops[Troops.length - 1].cost;
  }

  if (currentTroop === 3) {
    this.physics.add.sprite(0, pointer.y, 'tank').setVelocityX(50);
    gold -= Troops[Troops.length - 1].cost;
  }

  if (currentTroop === 4) {
    this.physics.add.sprite(0, pointer.y, 'wizard').setVelocityX(50);
    gold -= Troops[Troops.length - 1].cost;
  }

  if (currentTroop === 5) {
    this.physics.add.sprite(0, pointer.y, 'calvary').setVelocityX(50);
    gold -= Troops[Troops.length - 1].cost;
  }

  currentTroop = -1;
  canplace = false;

}