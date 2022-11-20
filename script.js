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

class Castle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, health)

    this.health = health;
    
  }

  damage(amount) {
    this.health -= amount;
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
  height: 900,
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

var Troops = [];
var enemyTroops = [];

function gamePreload() {
  this.load.image('map', 'assets/Testing/testmap.png');

  this.load.image('castle', 'assets/Testing/testCastle.png');

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
  let castle = this.add.image(75, 450, 'castle');
  castle.setDepth(3);

  this.physics.world.setBounds(0, 0, 6000, 1000);

  goldCount = this.add.text(10, 16, 'Gold: ' + gold, { fontFamily: 'Domine', fontSize: '40px', color: '#A316C7', stroke: '#000000', strokeThickness: 5 });
  goldCount.setScrollFactor(0, 0);

  boundryBottom = this.add.image(3000, troopBarrierBottom, 'troopBoundry');
  boundryTop = this.add.image(3000, troopBarrierTop, 'troopBoundry');
  boundryBottom.setVisible(false);
  boundryTop.setVisible(false);

  enemyTroops.push(new enemy(this, 800, 500));
  enemyTroops.push(new enemy(this, 900, 500));
  enemyTroops.push(new enemy(this, 1000, 500));

  button1 = this.add.image(100, 850, 'button1');
  button1.setInteractive();
  button1.setScrollFactor(0, 0);

  button2 = this.add.image(200, 850, 'button2');
  button2.setInteractive();
  button2.setScrollFactor(0, 0);

  button3 = this.add.image(300, 850, 'button3');
  button3.setInteractive();
  button3.setScrollFactor(0, 0);

  button4 = this.add.image(400, 850, 'button4');
  button4.setInteractive();
  button4.setScrollFactor(0, 0);

  button5 = this.add.image(500, 850, 'button5');
  button5.setInteractive();
  button5.setScrollFactor(0, 0);

  mycamera = this.cameras.main;
  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.setBounds(0, 0, 6000, 1000);


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

  if (cursors.left.isDown) {
    mycamera.scrollX -= 5;
  }

  if (cursors.right.isDown) {
    mycamera.scrollX += 5;
  }

  goldCount.setText('Gold: ' + gold);

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

  Troops.forEach((spec) => {

    if (!spec.alive) {
      return;
    }

    let foundMatch = false;
    for (let count = 0; count < enemyTroops.length; count++) {
      if (spec.checkRange(enemyTroops[count]) && enemyTroops[count].alive) {
        spec.setVelocityX(0);
        spec.attack(enemyTroops[count]);
        foundMatch = true;
        break;
      }
    }
    
    if (!foundMatch) {
      spec.setVelocityX(spec.speed);
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
    Troops.push(new Infantry(this, 0, pointer.y));
    gold -= Troops[Troops.length - 1].cost;
  }

  if (currentTroop === 2) {
    this.physics.add.sprite(0, pointer.y, 'archer').setVelocityX(50);
    //gold -= Troops[Troops.length - 1].cost;
  }

  if (currentTroop === 3) {
    this.physics.add.sprite(0, pointer.y, 'tank').setVelocityX(50);
    //gold -= Troops[Troops.length - 1].cost;
  }

  if (currentTroop === 4) {
    this.physics.add.sprite(0, pointer.y, 'wizard').setVelocityX(50);
    //gold -= Troops[Troops.length - 1].cost;
  }

  if (currentTroop === 5) {
    this.physics.add.sprite(0, pointer.y, 'calvary').setVelocityX(50);
    //gold -= Troops[Troops.length - 1].cost;
  }

  currentTroop = -1;
  canplace = false;

}