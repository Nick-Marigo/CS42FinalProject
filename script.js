/*  Students: Please use this week's project for Week 17: Assignment 20: Final Build + Documentation. 
     You will need to replace the contents of this JavaScript file with your own work, 
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in Canvas to be graded. */

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
      debug: false
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
var arrowSpellButton, freezeSpellButton, healSpellButton, goldMineButton;
let goldCount;
let gold = 250;
let troopBarrierBottom, troopBarrierTop;
let boundryBottom, boundryTop;
let canplace = false;
let canplaceSpell = false;
let canplaceGoldMine = false;
let textCantPlace;
let textCantPlaceSpell;
let tracking_pointer = false;
const troopbuttons = [1, 2, 3, 4, 5];
let currentTroop = -1;
const spells = ['None', 'Arrow', 'Freeze'];
let currentSpell = spells[0];
let updateCount = 1;
let WinOrLose = false; //True equals win. False equals lose
let outlines = [];
let currentOutline = -1;

var Troops = [];
var enemyTroops = [];
var GoldMines = [];

var playerCastle;
let playerCastleHealth;
var enemyCastle;
let enemyCastleHealth;

let music;
let selectSound, placeSound, healSound, popOne, popTwo, popThree;

let goldMinePlacement;

let miniMap;

//********************************************************************************************************************
//GAMEPLAY SCENE
//********************************************************************************************************************

function gamePreload() {
  this.load.image('map', 'finalAssets/Map.png');
  this.load.image('castle', 'assets/Testing/testCastle.png');
  this.load.image('troopBoundry', 'finalAssets/troopboundries.png');
  this.load.image('buttonBackground', 'finalAssets/Buttons/ButtonBackGround.png');

  this.load.image('button1', 'finalAssets/Buttons/buttonInfantry.png');
  this.load.image('button2', 'finalAssets/Buttons/buttonArcher.png');
  this.load.image('button3', 'finalAssets/Buttons/buttonTank.png');
  this.load.image('button4', 'finalAssets/Buttons/buttonWizard.png');
  this.load.image('button5', 'finalAssets/Buttons/buttonCalvary.png');

  this.load.image('ButtonHeal', 'finalAssets/Buttons/healSpellButton.png');
  this.load.image('ButtonArrow', 'finalAssets/Buttons/arrowSpellButton.png');
  this.load.image('arrowOutline', 'assets/Testing/Spelloutline/arrowSpellOutline.png');
  this.load.image('ButtonFreeze', 'finalAssets/Buttons/freezeSpellButton.png');
  this.load.image('freezeOutline', 'assets/Testing/Spelloutline/freezeSpellOutline.png');

  this.load.image('buttonGoldMine', 'finalAssets/Buttons/goldMineButton.png');
  this.load.image('goldMine', 'assets/Testing/testTroops/goldMine.png');
  this.load.image('goldMineOutline', 'assets/Testing/Spelloutline/goldMineOutline.png');

  this.load.spritesheet('Infantry', 'finalAssets/Troops/Infantry.png', { frameWidth: 50, frameHeight: 100 });
  this.load.spritesheet('Archer', 'finalAssets/Troops/Archer.png', { frameWidth: 50, frameHeight: 84 });
  this.load.spritesheet('Tank', 'finalAssets/Troops/Tank.png', { frameWidth: 50, frameHeight: 100 });
  this.load.spritesheet('Wizard', 'finalAssets/Troops/Wizard.png', { frameWidth: 60, frameHeight: 90 });
  this.load.spritesheet('Calvary', 'finalAssets/Troops/Calvary.png', { frameWidth: 176, frameHeight: 150 });

  this.load.spritesheet('EnemyInfantry', 'finalAssets/Troops/EnemyInfantry.png', { frameWidth: 50, frameHeight: 100 });
  this.load.spritesheet('EnemyArcher', 'finalAssets/Troops/EnemyArcher.png', { frameWidth: 50, frameHeight: 84 });
  this.load.spritesheet('EnemyTank', 'finalAssets/Troops/EnemyTank.png', { frameWidth: 50, frameHeight: 100 });
  this.load.spritesheet('EnemyWizard', 'finalAssets/Troops/EnemyWizard.png', { frameWidth: 60, frameHeight: 90 });
  this.load.spritesheet('EnemyCalvary', 'finalAssets/Troops/EnemyCalvary.png', { frameWidth: 176, frameHeight: 150 });

  this.load.audio('gameplayMusic', 'Audio/Music/Showdown.mp3');
  this.load.audio('FreezeSound', 'Audio/SoundEffects/freeze2.ogg');
  this.load.audio('SelectSound', 'Audio/SoundEffects/Menu1A.wav');
  this.load.audio('PlaceSound', 'Audio/SoundEffects/Menu1B.wav');
  this.load.audio('HealSound', 'Audio/SoundEffects/heal.ogg');
  this.load.audio('ArrowSound', 'Audio/SoundEffects/ArchersShooting.ogg');
  this.load.audio('PopOne', 'Audio/SoundEffects/pop1.ogg');
  this.load.audio('PopTwo', 'Audio/SoundEffects/pop1.ogg');
  this.load.audio('PopThree', 'Audio/SoundEffects/pop1.ogg');

}

function gameCreate() {

  updateCount = 1;
  gold = 5000;

  troopBarrierBottom = 700;
  troopBarrierTop = 200;

  music = this.sound.add('gameplayMusic');
  music.play({ volume: 0.1, loop: true });

  placeSound = this.sound.add('PlaceSound');
  selectSound = this.sound.add('SelectSound');
  healSound = this.sound.add('HealSound');
  popOne = this.sound.add('PopOne');
  popTwo = this.sound.add('PopTwo');
  popThree = this.sound.add('PopThree');

  this.add.image(2000, 450, 'map');
  this.add.image(600, 840, 'buttonBackground').setScrollFactor(0, 0);

  playerCastle = new Castle(this, 75, 450, 75, 0, 0);
  enemyCastle = new Castle(this, 3925, 450, -75, 800, 0);

  miniMap = new MiniMap(this, 400, 0);

  /*playerCastleHealth = this.add.text(10, 16, 'Castle Health: ' + playerCastle.health, { fontFamily: 'Domine', fontSize: '40px', color: '#0000FF', stroke: '#000000', strokeThickness: 5 });
  playerCastleHealth.setScrollFactor(0, 0);

  enemyCastleHealth = this.add.text(690, 16, 'Enemy Castle Health: ' + enemyCastle.health, { fontFamily: 'Domine', fontSize: '40px', color: '#FF0000', stroke: '#000000', strokeThickness: 5 });
  enemyCastleHealth.setScrollFactor(0, 0);*/

  this.physics.world.setBounds(0, 0, 4000, 900);

  goldCount = this.add.text(20, 820, 'Gold: ' + gold, { fontFamily: 'Domine', fontSize: '30px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 });
  goldCount.setScrollFactor(0, 0);

  boundryBottom = this.add.image(3000, troopBarrierBottom, 'troopBoundry').setVisible(false);
  boundryTop = this.add.image(3000, troopBarrierTop, 'troopBoundry').setVisible(false);

  let troopSheet = ['Infantry', 'Archer', 'Tank', 'Wizard', 'Calvary', 'EnemyInfantry', 'EnemyArcher', 'EnemyTank', 'EnemyWizard', 'EnemyCalvary'];

  for (let count = 0; count < troopSheet.length; count++) {

    this.anims.create({
      key: troopSheet[count] + 'walk',
      frames: this.anims.generateFrameNumbers(troopSheet[count], { start: 0, end: 4 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: troopSheet[count] + 'attack',
      frames: this.anims.generateFrameNumbers(troopSheet[count], { start: 5, end: 6 }),
      frameRate: 2,
      repeat: 1
    });

    this.anims.create({
      key: troopSheet[count] + 'death',
      frames: this.anims.generateFrameNumbers(troopSheet[count], { start: 7, end: 7 }),
      frameRate: 1,
      repeat: 2
    });

  }

  /*enemyTroops.push(new EnemyCalvary(this, 1000, 600));
  enemyTroops.push(new EnemyArcher(this, 1000, 450));
  enemyTroops.push(new EnemyInfantry(this, 1000, 300));
  enemyTroops.push(new EnemyWizard(this, 900, 450));
  enemyTroops.push(new EnemyTank(this, 1100, 450));*/

  let outlineImage = ['Infantry', 'Archer', 'Tank', 'Wizard', 'Calvary', 'arrowOutline', 'freezeOutline', 'goldMine'];
  for (let count = 0; count < outlineImage.length; count++) {
    outlines.push(this.add.image(500, 400, outlineImage[count]));
    outlines[count].setDepth(4).setScrollFactor(0, 0).setVisible(false).setScale(1.2);
    if (count > 4 && count < 7) {
      outlines[count].alpha = .5;
    }
  }

  goldMineButton = this.add.image(275, 840, 'buttonGoldMine').setInteractive().setScrollFactor(0, 0).setScale(.15);

  button1 = this.add.image(375, 840, 'button1').setInteractive().setScrollFactor(0, 0).setScale(.15);

  button2 = this.add.image(475, 840, 'button2').setInteractive().setScrollFactor(0, 0).setScale(.15);

  button3 = this.add.image(575, 840, 'button3').setInteractive().setScrollFactor(0, 0).setScale(.15);

  button4 = this.add.image(675, 840, 'button4').setInteractive().setScrollFactor(0, 0).setScale(.15);

  button5 = this.add.image(775, 840, 'button5').setInteractive().setScrollFactor(0, 0).setScale(.15);

  healSpellButton = this.add.image(875, 840, 'ButtonHeal').setInteractive().setScrollFactor(0, 0).setScale(.15);

  arrowSpellButton = this.add.image(975, 840, 'ButtonArrow').setInteractive().setScrollFactor(0, 0).setScale(.15);

  freezeSpellButton = this.add.image(1075, 840, 'ButtonFreeze').setInteractive().setScrollFactor(0, 0).setScale(.15);


  mycamera = this.cameras.main;
  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.setBounds(0, 0, 4000, 900);

  textCantPlace = this.add.text(mycamera.x + 350, mycamera.y + 450, 'Can not place troop there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlace.setVisible(false).setScrollFactor(0, 0).setDepth(3);

  textCantPlaceSpell = this.add.text(mycamera.x + 350, mycamera.y + 450, 'Can not place Spell there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlaceSpell.setVisible(false).setScrollFactor(0, 0).setDepth(3);

  button1.on('pointerdown', selectTroop, { param1: troopbuttons[0], param2: 50, param3: 0 });

  button2.on('pointerdown', selectTroop, { param1: troopbuttons[1], param2: 50, param3: 1 });

  button3.on('pointerdown', selectTroop, { param1: troopbuttons[2], param2: 75, param3: 2 });

  button4.on('pointerdown', selectTroop, { param1: troopbuttons[3], param2: 100, param3: 3 });

  button5.on('pointerdown', selectTroop, { param1: troopbuttons[4], param2: 200, param3: 4 });

  goldMineButton.on('pointerdown', selectGoldMine, { param2: 250, param3: 7 });

  healSpellButton.on('pointerdown', healCastle, this);

  arrowSpellButton.on('pointerdown', selectSpell, { param1: spells[1], param2: 150, param3: 5 });

  freezeSpellButton.on('pointerdown', selectSpell, { param1: spells[2], param2: 150, param3: 6 });

  this.input.on('pointerup', spawnTroop, this);
  this.input.on('pointerup', placeSpell, this);
  this.input.on('pointerup', placeGoldMine, this);

  goldMinePlacementOne = this.add.image(437, 637, 'goldMineOutline').setVisible(false);
  goldMinePlacementOne.alpha = 0.8;

  goldMinePlacementTwo = this.add.image(637, 337, 'goldMineOutline').setVisible(false);
  goldMinePlacementTwo.alpha = 0.8;

  goldMinePlacementThree = this.add.image(837, 437, 'goldMineOutline').setVisible(false);
  goldMinePlacementThree.alpha = 0.8;

}

function gameUpdate() {

  updateCount++;
  trackMouse();

  if (updateCount % 300 === 0) {

    GoldMines.forEach((spec) => {
      if (!spec.alive) {
        return;
      }
      gold += spec.collectGold();
    });

    gold += 30;
    goldCount.setText('Gold: ' + gold);

  }

  if (updateCount % 600 === 0) {
    let temp = Phaser.Math.Between(1, 5);
    if (temp === 1) {
      enemyTroops.push(new EnemyInfantry(this, 4000, Phaser.Math.Between(200, 700)));
    }
    if (temp === 2) {
      enemyTroops.push(new EnemyArcher(this, 4000, Phaser.Math.Between(200, 700)));
    }
    if (temp === 3) {
      enemyTroops.push(new EnemyTank(this, 4000, Phaser.Math.Between(200, 700)));
    }
    if (temp === 4) {
      enemyTroops.push(new EnemyWizard(this, 4000, Phaser.Math.Between(200, 700)));
    }
    if (temp === 5) {
      enemyTroops.push(new EnemyCalvary(this, 4000, Phaser.Math.Between(200, 700)));
    }

    updateCount = 1;
  }

  if (cursors.left.isDown) {
    mycamera.scrollX -= 25;
  }

  if (cursors.right.isDown) {
    mycamera.scrollX += 25;
  }

  if (playerCastle.value <= 0) {
    WinOrLose = false;
    music.pause();
    this.scene.start('WinOrLoseScene');
  }

  if (enemyCastle.value <= 0) {
    WinOrLose = true;
    music.pause();
    this.scene.start('WinOrLoseScene');
  }

  goldCount.setText('Gold: ' + gold);
  //playerCastleHealth.setText('Castle Health: ' + playerCastle.health);
  //enemyCastleHealth.setText('Enemy Castle Health: ' + enemyCastle.health);

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

  if (canplaceSpell) {
    if (game.input.mousePointer.y > troopBarrierTop && game.input.mousePointer.y < troopBarrierBottom) {
      textCantPlaceSpell.setVisible(false);
      boundryBottom.setVisible(false);
      boundryTop.setVisible(false);
    } else {
      textCantPlaceSpell.setVisible(true);
      boundryBottom.setVisible(true);
      boundryTop.setVisible(true);
    }
  }

  Troops.forEach((spec) => {

    if (!spec.alive) {
      return;
    }

    spec.followTroop();

    if (spec.freeze) {
      spec.freezeTroop();
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

    if (spec.checkCastleRange(enemyCastle)) {
      spec.setVelocity(0);
      spec.attack(enemyCastle);
    }

  });

  enemyTroops.forEach((spec) => {

    if (!spec.alive) {
      return;
    }

    spec.followTroop();

    if (spec.freeze) {
      spec.freezeTroop();
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

    if (spec.checkCastleRange(playerCastle)) {
      foundMatch = true;
      spec.setVelocity(0);
      spec.attack(playerCastle);
    }

    for (let count = 0; count < GoldMines.length; count++) {
      if (spec.checkGoldmineRange(GoldMines[count]) && GoldMines[count].alive) {
        spec.setVelocity(0);
        spec.attack(GoldMines[count]);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      spec.setVelocityX(spec.speed);
    }


  });

}

function trackMouse() {
  if (currentOutline < 0) {
    return;
  }

  outlines[currentOutline].setVisible(true);
  outlines[currentOutline].setPosition(game.input.mousePointer.x, game.input.mousePointer.y);

}

function selectTroop() {

  if (gold - this.param2 < 0) {
    return;
  }

  if (currentOutline != -1) {
    outlines[currentOutline].setVisible(false);
  }

  selectSound.play({ volume: .1 });
  canplace = true;
  canplaceSpell = false;
  currentTroop = this.param1;
  currentOutline = this.param3;

}

function spawnTroop(pointer) {

  if (!canplace) {
    return;
  }

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
    Troops.push(new Archer(this, 0, pointer.y));
    gold -= Troops[Troops.length - 1].cost;
  }

  if (currentTroop === 3) {
    Troops.push(new Tank(this, 0, pointer.y));
    gold -= Troops[Troops.length - 1].cost;
  }

  if (currentTroop === 4) {
    Troops.push(new Wizard(this, 0, pointer.y));
    gold -= Troops[Troops.length - 1].cost;
  }

  if (currentTroop === 5) {
    Troops.push(new Calvary(this, 0, pointer.y));
    gold -= Troops[Troops.length - 1].cost;
  }

  placeSound.play({ volume: .1 });
  currentTroop = -1;
  outlines[currentOutline].setVisible(false);
  currentOutline = -1;
  canplace = false;

}

function healCastle() {

  if (gold < 300) {
    return;
  }

  if (playerCastle.health >= 500) {
    return;
  }

  healSound.play({ volume: .2 });
  gold -= 300;
  playerCastle.heal();

}

function selectSpell() {
  if (gold - this.param2 < 0) {
    return;
  }

  if (currentOutline != -1) {
    outlines[currentOutline].setVisible(false);
  }

  selectSound.play({ volume: .1 });
  canplaceSpell = true;
  canplace = false;
  currentSpell = this.param1;
  currentOutline = this.param3;
}


function placeSpell(pointer) {

  if (!canplaceSpell) {
    return;
  }

  if (pointer.position.y < troopBarrierTop || pointer.position.y > troopBarrierBottom) {
    return;
  }

  if (currentSpell === 'None') {
    return;
  }


  //************************************************************************
  // ARROW SPELL
  //************************************************************************
  if (currentSpell === 'Arrow') {
    boxL = pointer.position.x - 200;
    boxR = pointer.position.x + 200;
    boxT = pointer.position.y - 50;
    boxB = pointer.position.y + 50;

    Troops.forEach((spec) => {
      if (!spec.alive) {
        return;
      }

      if (boxL < spec.x && spec.x < boxR && boxT < spec.y && spec.y < boxB) {
        spec.arrowDrop();
      }

    });

    enemyTroops.forEach((spec) => {
      if (!spec.alive) {
        return;
      }

      if (boxL < spec.x && spec.x < boxR && boxT < spec.y && spec.y < boxB) {
        spec.arrowDrop();
      }

    });

    gold -= 150;
    let temp = this.sound.add('ArrowSound');
    temp.play({ volume: 0.5, loop: false });

  }

  //************************************************************************
  // FREEZE SPELL
  //************************************************************************
  if (currentSpell === 'Freeze') {
    boxL = pointer.x - 100;
    boxR = pointer.x + 100;
    boxT = pointer.y - 100;
    boxB = pointer.y + 100;

    Troops.forEach((spec) => {
      if (!spec.alive) {
        return;
      }

      if (boxL < spec.x && spec.x < boxR && boxT < spec.y && spec.y < boxB) {
        spec.freeze = true;
      }
    });

    enemyTroops.forEach((spec) => {
      if (!spec.alive) {
        return;
      }

      if (boxL < spec.x && spec.x < boxR && boxT < spec.y && spec.y < boxB) {
        spec.freeze = true;
      }

    });

    gold -= 150;

    let temp = this.sound.add('FreezeSound');
    temp.play({ volume: 0.1, loop: false });

  }

  placeSound.play({ volume: .1 });
  currentSpell = spells[0];
  outlines[currentOutline].setVisible(false);
  currentOutline = -1;
  canplaceSpell = false;

}

function selectGoldMine() {
  if (gold < this.param1) {
    return;
  }

  if (currentOutline != -1) {
    outlines[currentOutline].setVisible(false);
  }

  goldMinePlacementOne.setVisible(true);
  goldMinePlacementTwo.setVisible(true);
  goldMinePlacementThree.setVisible(true);
  selectSound.play({ volume: .1 });
  canplaceGoldMine = true;
  currentOutline = this.param3;

}

function placeGoldMine(pointer) {

  let mine1 = true, mine2 = true, mine3 = true;

  if (!canplaceGoldMine) {
    return;
  }

  if (pointer.position.x < 400 || pointer.position.x > 475 || pointer.position.y < 600 || pointer.position.y > 675) {
    mine1 = false;
  }

  if (pointer.position.x < 600 || pointer.position.x > 675 || pointer.position.y < 300 || pointer.position.y > 375) {
    mine2 = false;
  }

  if (pointer.position.x < 800 || pointer.position.x > 875 || pointer.position.y < 413 || pointer.position.y > 488) {
    mine3 = false;
  }

  if (!mine1 && !mine2 && !mine3) {
    return;
  }

  //GOLD MINE FIRST LOCATION
  if (pointer.position.x > 400 && pointer.position.x < 475 && pointer.position.y > 600 && pointer.position.y < 675) {
    GoldMines[0] = new GoldMine(this, 437, 637, 15);
    //GoldMines.push(new GoldMine(this, 437, 637, 15));
  }

  //GOLD MINE SECOND LOCATION
  if (pointer.position.x > 600 && pointer.position.x < 675 && pointer.position.y > 300 && pointer.position.y < 375) {
    GoldMines.push(new GoldMine(this, 637, 337, 30))
  }

  //GOLD MINE THIRD LOCATION
  if (pointer.position.x > 800 && pointer.position.x < 875 && pointer.position.y > 413 && pointer.position.y < 488) {
    GoldMines.push(new GoldMine(this, 837, 450, 45));
  }


  gold -= 250;
  outlines[currentOutline].setVisible(false);
  currentOutline = -1;
  goldMinePlacementOne.setVisible(false);
  goldMinePlacementTwo.setVisible(false);
  goldMinePlacementThree.setVisible(false);
  canplaceGoldMine = false;
  placeSound.play({ volume: .1 });
}


//********************************************************************************************************************
//WINNING OR LOSING SCENE
//********************************************************************************************************************

function WinOrLosePreload() {
  this.load.image('winbackground', 'assets/Testing/winscene.png');
  this.load.image('losebackground', 'assets/Testing/losescene.png');
  if (WinOrLose) {
    this.load.audio('winMusicOne', 'Audio/Music/Victory.mp3');
    this.load.audio('winMusicTwo', 'Audio/Music/Won.wav');
  } else {
    this.load.audio('loseMusic', 'Audio/Music/sadending.ogg');
  }
}

function WinOrLoseCreate() {

  //CLEARING ARRAYS OF TROOPS
  Troops = [];
  enemyTroops = [];
  titletroops = [];
  titlenemies = [];
  outlines = [];


  if (WinOrLose) {
    this.add.image(600, 450, 'winbackground');
    this.add.text(600, 250, 'You Won!', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' }).setOrigin(0.5).setScrollFactor(0, 0).setDepth(5);
    music = this.sound.add('winMusicOne');
    music.play({ volume: .2, loop: true });
    let temp = this.sound.add('winMusicTwo');
    temp.play({ volume: 0.2 });
  } else {
    this.add.image(600, 450, 'losebackground');
    this.add.text(600, 250, 'You Lost!', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' }).setOrigin(0.5).setScrollFactor(0, 0).setDepth(5);
    let textTryAgain = this.add.text(600, 350, 'Try Again', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' });
    textTryAgain.setInteractive({ userHandCursor: true }).setOrigin(0.5).setScrollFactor(0, 0).setDepth(5);
    textTryAgain.on('pointerdown', currentLevelTrans, this);
    music = this.sound.add('loseMusic');
    music.play({ volume: 0.4, loop: true });
  }

  let textTitle = this.add.text(600, 650, 'Return to Title', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' })
  textTitle.setOrigin(0.5).setInteractive({ useHandCursor: true }).setDepth(5);
  textTitle.on('pointerdown', toTitleTrans, this);

}

function WinOrLoseUpdate() {

}

function currentLevelTrans() {
  music.pause();
  this.scene.start('gamePlayScene');
}

function toTitleTrans() {
  music.pause();
  this.scene.start('titleScene');
}
