/*  Students: Please use this week's project for Week 14: Assignment 17: Rough Draft. 
     You will need to replace the contents of this JavaScript file with your own work, 
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in Canvas to be graded. */
let titleScene = {
  key: 'titleScene',
  active: true,
  preload: titlePreload,
  create: titleCreate,
  update: titleUpdate
};

/*let levelSelection = {
  key: 'levelSelection',
  active: false,
  preload: levelPreload,
  create: levelCreate,
  update: levelUpdate
}*/

let gamePlayScene = {
  key: "gamePlayScene",
  active: false,
  preload: gamePreload,
  create: gameCreate,
  update: gameUpdate
};

let WinOrLoseScene = {
  key: "WinOrLoseScene",
  active: false,
  preload: WinOrLosePreload,
  create: WinOrLoseCreate,
  update: WinOrLoseUpdate
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
  scene: [titleScene, tutorial, gamePlayScene, WinOrLoseScene]
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
let currentTroop = -1;
let updateCount = 1;
let WinOrLose = false; //True equals win. False equals lose

var Troops = [];
var enemyTroops = [];

var playerCastle;
let playerCastleHealth;
var enemyCastle;
let enemyCastleHealth;


//********************************************************************************************************************
//TITLE SCENE
//********************************************************************************************************************

function titlePreload() {

  this.load.image('map', 'assets/Testing/testmap.png');
  this.load.image('infantry', 'assets/Testing/testTroops/testTroopInfantry.png');
  this.load.image('enemy', 'assets/Testing/testTroops/testenemy.png');
  this.load.image('textBackground', 'assets/Testing/Title/textBackground.png');

}

function titleCreate() {

  this.add.image(0, 500, 'map').setDepth(1);
  this.add.image(600, 450, 'textBackground').setDepth(3).setScrollFactor(0, 0);

  var title = this.add.text(600, 250, 'For Warriors Peace', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' });
  title.setOrigin(0.5).setScrollFactor(0, 0).setDepth(5);

  var startText = this.add.text(600, 450, 'Start Game!', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' });
  startText.setOrigin(0.5).setInteractive({ useHandCursor: true }).setScrollFactor(0, 0).setDepth(5);
  startText.on('pointerdown', titleTrans, this);

  var tutorial = this.add.text(600, 715, 'How to Play', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' });
  tutorial.setInteractive({ useHandCursor: true }).setScrollFactor(0, 0).setDepth(5).setOrigin(0.5);
  tutorial.on('pointerdown', function() {this.scene.start('tutorialScene')}, this);

  mycamera = this.cameras.main;

  updateCount = 1;

}

let titletroops = [];
let titlenemies = [];
let cameraCount = 1;

function titleUpdate() {

  cameraCount++;
  if (cameraCount < 300) {
    mycamera.scrollX += 1;
  } else {
    mycamera.scrollX -= 1;
    if (cameraCount > 600) {
      cameraCount = 1;
    }
  }

  updateCount++;
  if (updateCount % 300 === 0) {
    titletroops.push(new Infantry(this, -325, Phaser.Math.Between(25, 875)));
    titlenemies.push(new enemy(this, 1525, Phaser.Math.Between(25, 875)));
    updateCount = 1;
  }

  titletroops.forEach((spec) => {

    if (!spec.alive) {
      return;
    }

    let foundMatch = false;
    for (let count = 0; count < titlenemies.length; count++) {
      if (spec.checkRange(titlenemies[count]) && titlenemies[count].alive) {
        spec.setVelocityX(0);
        spec.attack(titlenemies[count]);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      spec.setVelocityX(spec.speed);
    }

  });

  titlenemies.forEach((spec) => {

    if (!spec.alive) {
      return;
    }

    let foundMatch = false;
    for (let count = 0; count < titletroops.length; count++) {
      if (spec.checkRange(titletroops[count]) && titletroops[count].alive) {
        spec.setVelocityX(0);
        spec.attack(titletroops[count]);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      spec.setVelocityX(spec.speed);
    }

  });

}

function titleTrans() {
  this.scene.start('gamePlayScene');
}

//********************************************************************************************************************
//GAMEPLAY SCENE
//********************************************************************************************************************

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

  updateCount = 1;

  this.add.image(3000, 500, 'map');

  playerCastle = new Castle(this, 75, 450);
  enemyCastle = new Castle(this, 5925, 450);

  playerCastleHealth = this.add.text(10, 16, 'Castle Health: ' + playerCastle.health, { fontFamily: 'Domine', fontSize: '40px', color: '#0000FF', stroke: '#000000', strokeThickness: 5 });
  playerCastleHealth.setScrollFactor(0, 0);

  enemyCastleHealth = this.add.text(690, 16, 'Enemy Castle Health: ' + playerCastle.health, { fontFamily: 'Domine', fontSize: '40px', color: '#FF0000', stroke: '#000000', strokeThickness: 5 });
  enemyCastleHealth.setScrollFactor(0, 0);

  this.physics.world.setBounds(0, 0, 6000, 1000);

  goldCount = this.add.text(20, 830, 'Gold: ' + gold, { fontFamily: 'Domine', fontSize: '30px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 });
  goldCount.setScrollFactor(0, 0);

  boundryBottom = this.add.image(3000, troopBarrierBottom, 'troopBoundry');
  boundryTop = this.add.image(3000, troopBarrierTop, 'troopBoundry');
  boundryBottom.setVisible(false);
  boundryTop.setVisible(false);

  enemyTroops.push(new enemy(this, 800, 500));
  enemyTroops.push(new enemy(this, 900, 500));
  enemyTroops.push(new enemy(this, 1000, 500));

  button1 = this.add.image(200, 850, 'button1');
  button1.setInteractive();
  button1.setScrollFactor(0, 0);

  button2 = this.add.image(300, 850, 'button2');
  button2.setInteractive();
  button2.setScrollFactor(0, 0);

  button3 = this.add.image(400, 850, 'button3');
  button3.setInteractive();
  button3.setScrollFactor(0, 0);

  button4 = this.add.image(500, 850, 'button4');
  button4.setInteractive();
  button4.setScrollFactor(0, 0);

  button5 = this.add.image(600, 850, 'button5');
  button5.setInteractive();
  button5.setScrollFactor(0, 0);

  mycamera = this.cameras.main;
  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.setBounds(0, 0, 6000, 1000);

  textCantPlace = this.add.text(mycamera.x + 350, mycamera.y + 450, 'Can not place troop there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlace.setVisible(false);
  textCantPlace.setScrollFactor(0, 0);

  button1.on('pointerdown', selectTroop, { param1: troopbuttons[0], param2: 50 });

  button2.on('pointerdown', selectTroop, { param1: troopbuttons[1], param2: 50 });

  button3.on('pointerdown', selectTroop, { param1: troopbuttons[2], param2: 75 });

  button4.on('pointerdown', selectTroop, { param1: troopbuttons[3], param2: 100 });

  button5.on('pointerdown', selectTroop, { param1: troopbuttons[4], param2: 200 });

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
    mycamera.scrollX -= 25;
  }

  if (cursors.right.isDown) {
    mycamera.scrollX += 25;
  }

  if (playerCastle.health <= 0) {
    WinOrLose = false;
    this.scene.start('WinOrLoseScene');
  }

  if (enemyCastle.health <= 0) {
    WinOrLose = true;
    this.scene.start('WinOrLoseScene');
  }

  goldCount.setText('Gold: ' + gold);
  playerCastleHealth.setText('Castle Health: ' + playerCastle.health);
  enemyCastleHealth.setText('Enemy Castle Health: ' + enemyCastle.health);

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

    if (spec.checkRange(enemyCastle)) {
      spec.setVelocity(0);
      spec.attack(enemyCastle);
    }

  });

  enemyTroops.forEach((spec) => {

    if (!spec.alive) {
      return;
    }

    let foundMatch = false;
    for (let count = 0; count < Troops.length; count++) {
      if (spec.checkRange(Troops[count]) && Troops[count].alive) {
        spec.setVelocityX(0);
        spec.attack(Troops[count]);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      spec.setVelocityX(spec.speed);
    }

    if (spec.checkRange(playerCastle)) {
      spec.setVelocity(0);
      spec.attack(playerCastle);
    }

  });

}

function selectTroop() {

  if (gold - this.param2 < 0) {
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

//********************************************************************************************************************
//WINNING OR LOSING SCENE
//********************************************************************************************************************

function WinOrLosePreload() {
  this.load.image('winbackground', 'assets/Testing/winscene.png');
  this.load.image('losebackground', 'assets/Testing/losescene.png');
}

function WinOrLoseCreate() {

  //CLEARING ARRAYS OF TROOPS
  Troops = [];
  enemyTroops = [];
  titletroops = [];
  titlenemies = [];


  if (WinOrLose) {
    this.add.image(600, 450, 'winbackground');
    this.add.text(600, 250, 'You Won!', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' }).setOrigin(0.5).setScrollFactor(0, 0).setDepth(5);
  } else {
    this.add.image(600, 450, 'losebackground');
    this.add.text(600, 250, 'You Lost!', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' }).setOrigin(0.5).setScrollFactor(0, 0).setDepth(5);
    let textTryAgain = this.add.text(600, 350, 'Try Again', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' });
    textTryAgain.setInteractive({ userHandCursor: true }).setOrigin(0.5).setScrollFactor(0, 0).setDepth(5);
    textTryAgain.on('pointerdown', currentLevelTrans, this);
  }

  let textLS = this.add.text(600, 550, 'Return to Level Selection', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' });
  textLS.setInteractive({ useHandCursor: true }).setOrigin(0.5).setDepth(5);
  //startText.on('pointerdown', levelTrans, this);

  let textTitle = this.add.text(600, 650, 'Return to Title', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' })
  textTitle.setOrigin(0.5).setInteractive({ useHandCursor: true }).setDepth(5);
  textTitle.on('pointerdown', toTitleTrans, this);

}

function WinOrLoseUpdate() {

}

function currentLevelTrans() {
  this.scene.start('gamePlayScene');
}

//function levelTrans() {
//this.scene.start('level')
//}

function toTitleTrans() {
  this.scene.start('titleScene');
}
