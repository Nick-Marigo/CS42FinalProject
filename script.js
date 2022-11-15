/*  Students: Please use this week's project for Week 13: Assignment 16: Prototype. 
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
  scene: [gamePlayScene],
  //parent: "tron"
};

let game = new Phaser.Game(config);

let cursors;
let mycamera;
let infantry;
let infantryCost = 50;
var button1, button2, button3, button4, button5;
let goldCount;
let gold = 100;
let troopBarrierBottom = 700, troopBarrierTop = 200;
let boundryBottom, boundryTop;
let canplace = false;
let textCantPlace;
let tracking_pointer = false;
const troopbuttons = [1, 2, 3, 4, 5];
let currentTroop = 0;
let updateCount = 1;

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
}


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
  //this.cameras.main.startFollow(this.player);
  //this.cameras.main.setBounds(0,0, 6000, 1000);


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

  if (updateCount % 720 === 0) {
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
  //console.log(mycamera.x);
  //console.log(canplace);

  //button.once('pointerdown', selectTroop, this);

  console.log('Update: ', canplace, currentTroop, gold);
  //console.log(game.input.mousePointer.y);

  if (canplace && gold >= infantryCost) {
    if (game.input.mousePointer.y > troopBarrierTop && game.input.mousePointer.y < troopBarrierBottom) {
      textCantPlace.setVisible(false);
      boundryBottom.setVisible(false);
      boundryTop.setVisible(false);
      //console.log('click');
      //this.input.once('pointerdown', spawnTroop, this);
    } else {
      textCantPlace.setVisible(true);
      boundryBottom.setVisible(true);
      boundryTop.setVisible(true);
    }
  }

  //console.log(tracking_pointer)
  /*if(game.input.mousePointer.y > 200 && game.input.mousePointer.y < 800) {
    tracking_pointer = true;
  } else {
    tracking_pointer = false;
  }*/

}

function selectTroop(pointer) {


  canplace = true;
  //gold -= infantryCost;
  console.log('selectTroop: ', canplace);
  currentTroop = this.param1;


  //let temp = this.add.image(pointer.x, pointer.y, 'troop');

  /*if (pointer.isUp) {
    temp.x = pointer.x;
    temp.y = pointer.y;
  }*/

  /*console.log(pointer.y);
  if(pointer.y > troopBarrierTop && pointer.y < troopBarrierBottom) {
    //this.input.on('pointerdown', spawnTroop, this);
    troop = this.physics.add.sprite(0, pointer.y, 'troop');
    troop.setVelocityX(50);
  }*/

  //this.input.on('pointerdown', spawnTroop, this);

}

function spawnTroop(pointer) {

  if (pointer.position.y < troopBarrierTop || pointer.position.y > troopBarrierBottom) {
    return;
  }

  if(currentTroop <= 0) {
    return;
  }
   gold -= 50;
  console.log(pointer);

  if (currentTroop === 1) {
    this.physics.add.sprite(0, pointer.y, 'infantry').setVelocityX(50);
    //mytroops.push(new Infantry(this, 0, pointer.y));
  }

  if (currentTroop === 2) {
    this.physics.add.sprite(0, pointer.y, 'archer').setVelocityX(50);
  }

  if (currentTroop === 3) {
    this.physics.add.sprite(0, pointer.y, 'tank').setVelocityX(50);
  }

  if (currentTroop === 4) {
    this.physics.add.sprite(0, pointer.y, 'wizard').setVelocityX(50);
  }

  if (currentTroop === 5) {
    this.physics.add.sprite(0, pointer.y, 'calvary').setVelocityX(50);
  }

  currentTroop = -1;
  canplace = false;
  console.log('calling spawntroop', 'spawnTroop: ', canplace);
    

}

