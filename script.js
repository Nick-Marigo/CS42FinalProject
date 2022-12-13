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
var button1, button2, button3, button4, button5, cancelButton;
let cancelText;
var arrowSpellButton, freezeSpellButton, healSpellButton, goldMineButton;
let goldCount;
let gold = 250;
let troopBarrierBottom, troopBarrierTop;
let troopYDif;
let spellYDif;
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
let arrowsFalling;
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
let selectSound, placeSound, healSound, popOne, popTwo, popThree, meleeAttack;

let goldMinePlacement;

let miniMap;

//********************************************************************************************************************
//GAMEPLAY SCENE
//********************************************************************************************************************

function gamePreload() {
  this.load.image('map', 'finalAssets/Map.png');
  this.load.image('castle', 'finalAssets/Castle.png');
  this.load.image('castleShadow', 'finalAssets/CastleShadow.png');
  this.load.image('troopBoundry', 'finalAssets/troopboundries.png');
  this.load.image('buttonBackground', 'finalAssets/Buttons/ButtonBackGround.png');

  this.load.image('buttonGoldMine', 'finalAssets/Buttons/goldMineButton.png');
  this.load.image('button1', 'finalAssets/Buttons/buttonInfantry.png');
  this.load.image('button2', 'finalAssets/Buttons/buttonArcher.png');
  this.load.image('button3', 'finalAssets/Buttons/buttonTank.png');
  this.load.image('button4', 'finalAssets/Buttons/buttonWizard.png');
  this.load.image('button5', 'finalAssets/Buttons/buttonCalvary.png');
  this.load.image('ButtonHeal', 'finalAssets/Buttons/healSpellButton.png');
  this.load.image('ButtonArrow', 'finalAssets/Buttons/arrowSpellButton.png');
  this.load.image('ButtonFreeze', 'finalAssets/Buttons/freezeSpellButton.png');
  this.load.image('cancelButton', 'finalAssets/Buttons/CancelButton.png');

  this.load.image('arrowOutline', 'finalAssets/OutlinePlacements/arrowSpellOutline.png');
  this.load.image('arrowsFalling', 'finalAssets/ArrowsFalling.png');
  this.load.image('freezeOutline', 'finalAssets/OutlinePlacements/freezeSpellOutline.png');
  this.load.image('goldMineOutline', 'finalAssets/OutlinePlacements/goldMineOutline.png');
  this.load.spritesheet('goldMine', 'finalAssets/GoldMine.png', { frameWidth: 75, frameHeight: 75 });

  this.load.spritesheet('Infantry', 'finalAssets/Troops/Infantry.png', { frameWidth: 50, frameHeight: 100 });
  this.load.spritesheet('Archer', 'finalAssets/Troops/Archer.png', { frameWidth: 50, frameHeight: 84 });
  this.load.image('ArcherProjectile', 'finalAssets/Troops/ArcherProjectile.png');
  this.load.spritesheet('Tank', 'finalAssets/Troops/Tank.png', { frameWidth: 50, frameHeight: 100 });
  this.load.spritesheet('Wizard', 'finalAssets/Troops/Wizard.png', { frameWidth: 60, frameHeight: 90 });
  this.load.image('WizardProjectile', 'finalAssets/Troops/WizardProjectile.png');
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
  this.load.audio('meleeAttack', 'Audio/SoundEffects/swordsound.wav');
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
  meleeAttack = this.sound.add('meleeAttack');

  this.add.image(2000, 450, 'map');
  this.add.image(600, 840, 'buttonBackground').setScrollFactor(0, 0);

  playerCastle = new Castle(this, 100, 400, 75, 0, 0, false);
  this.add.image(100, 400, 'castleShadow').alpha = .5;
  enemyCastle = new Castle(this, 3900, 400, -75, 800, 0, true);
  this.add.image(3900, 400, 'castleShadow').setFlipX(true).alpha = .5;

  miniMap = new MiniMap(this, 400, 0);

  this.anims.create({
    key: 'GoldMineAnims',
    frames: this.anims.generateFrameNumbers('goldMine', { start: 0, end: 2 }),
    frameRate: 8,
    repeat: -1
  });

  GoldMines.push(new GoldMine(this, 437, 637, 15));
  GoldMines.push(new GoldMine(this, 637, 337, 30));
  GoldMines.push(new GoldMine(this, 837, 450, 45));

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

  let outlineImage = ['Infantry', 'Archer', 'Tank', 'Wizard', 'Calvary', 'arrowOutline', 'freezeOutline', 'goldMine'];
  for (let count = 0; count < outlineImage.length; count++) {
    outlines.push(this.add.image(500, 400, outlineImage[count]));
    outlines[count].setDepth(4).setScrollFactor(0, 0).setVisible(false).setScale(1.2);
    if (count > 4 && count < 7) {
      outlines[count].alpha = .5;
    }
  }

  goldMineButton = this.add.image(275, 840, 'buttonGoldMine').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(258, 870, 250, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);

  button1 = this.add.image(365, 840, 'button1').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(353, 870, 50, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);

  button2 = this.add.image(465, 840, 'button2').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(453, 870, 50, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);

  button3 = this.add.image(565, 840, 'button3').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(553, 870, 75, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);

  button4 = this.add.image(665, 840, 'button4').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(653, 870, 75, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);

  button5 = this.add.image(765, 840, 'button5').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(748, 870, 200, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);

  healSpellButton = this.add.image(865, 840, 'ButtonHeal').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(848, 870, 300, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);

  arrowSpellButton = this.add.image(965, 840, 'ButtonArrow').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(948, 870, 150, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);

  freezeSpellButton = this.add.image(1065, 840, 'ButtonFreeze').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(1048, 870, 150, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);

  cancelButton = this.add.image(1150, 840, 'cancelButton').setInteractive().setScrollFactor(0, 0).setVisible(false);
  cancelText = this.add.text(1120, 870, 'Cancel', { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0).setVisible(false);


  mycamera = this.cameras.main;
  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.setBounds(0, 0, 4000, 900);

  textCantPlace = this.add.text(mycamera.x + 350, mycamera.y + 450, 'Can not place troop there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlace.setVisible(false).setScrollFactor(0, 0).setDepth(3);

  textCantPlaceSpell = this.add.text(mycamera.x + 350, mycamera.y + 450, 'Can not place Spell there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlaceSpell.setVisible(false).setScrollFactor(0, 0).setDepth(3);

  button1.on('pointerdown', selectTroop, { param1: troopbuttons[0], param2: 50, param3: 0, param4: 50 });

  button2.on('pointerdown', selectTroop, { param1: troopbuttons[1], param2: 50, param3: 1, param4: 42 });

  button3.on('pointerdown', selectTroop, { param1: troopbuttons[2], param2: 75, param3: 2, param4: 50 });

  button4.on('pointerdown', selectTroop, { param1: troopbuttons[3], param2: 100, param3: 3, param4: 45 });

  button5.on('pointerdown', selectTroop, { param1: troopbuttons[4], param2: 200, param3: 4, param4: 75 });

  goldMineButton.on('pointerdown', selectGoldMine, { param2: 250, param3: 7 });

  healSpellButton.on('pointerdown', healCastle, this);

  arrowSpellButton.on('pointerdown', selectSpell, { param1: spells[1], param2: 150, param3: 5, param4: 50 });

  freezeSpellButton.on('pointerdown', selectSpell, { param1: spells[2], param2: 150, param3: 6, param4: 100 });

  cancelButton.on('pointerdown', cancelPlacement, this);

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
      enemyTroops.push(new EnemyInfantry(this, 4000, Phaser.Math.Between(250, 650)));
    }
    if (temp === 2) {
      enemyTroops.push(new EnemyArcher(this, 4000, Phaser.Math.Between(242, 658)));
    }
    if (temp === 3) {
      enemyTroops.push(new EnemyTank(this, 4000, Phaser.Math.Between(250, 650)));
    }
    if (temp === 4) {
      enemyTroops.push(new EnemyWizard(this, 4000, Phaser.Math.Between(245, 655)));
    }
    if (temp === 5) {
      enemyTroops.push(new EnemyCalvary(this, 4000, Phaser.Math.Between(275, 625)));
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

  if (canplace) {

    cancelButton.setVisible(true);
    cancelText.setVisible(true);

    if (game.input.mousePointer.y > troopBarrierTop && game.input.mousePointer.y < troopBarrierBottom - troopYDif) {
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

    cancelButton.setVisible(true);
    cancelText.setVisible(true);

    if (game.input.mousePointer.y > troopBarrierTop && game.input.mousePointer.y < troopBarrierBottom - spellYDif) {
      textCantPlaceSpell.setVisible(false);
      boundryBottom.setVisible(false);
      boundryTop.setVisible(false);
    } else {
      textCantPlaceSpell.setVisible(true);
      boundryBottom.setVisible(true);
      boundryTop.setVisible(true);
    }
  }

  if (canplaceGoldMine) {
    cancelButton.setVisible(true);
    cancelText.setVisible(true);
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

    if (spec.checkCastleRange(enemyCastle)) {
      spec.setVelocity(0);
      spec.attack(enemyCastle);
      foundMatch = true;
    }

    if (!foundMatch) {
      spec.setVelocityX(spec.speed);
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

function cancelPlacement() {

  placeSound.play({ volume: .1 });

  outlines[currentOutline].setVisible(false);
  currentOutline = -1;

  currentTroop = -1;
  canplace = false;
  troopYDif = -1;

  currentSpell = spells[0];
  spellYDif = -1;
  canplaceSpell = false;

  canplaceGoldMine = false;
  goldMinePlacementOne.setVisible(false);
  goldMinePlacementTwo.setVisible(false);
  goldMinePlacementThree.setVisible(false);

  textCantPlace.setVisible(false);
  textCantPlaceSpell.setVisible(false);
  boundryBottom.setVisible(false);
  boundryTop.setVisible(false);

  cancelButton.setVisible(false);
  cancelText.setVisible(false);

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
  troopYDif = this.param4 * 1.2;
  textCantPlaceSpell.setVisible(false);

}

function spawnTroop(pointer) {

  if (!canplace) {
    return;
  }

  if (pointer.position.y < troopBarrierTop || pointer.position.y > troopBarrierBottom - troopYDif) {
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
  troopYDif = -1;
  canplace = false;

}

function healCastle() {

  if (gold < 300) {
    return;
  }

  if (playerCastle.getHealth() >= 500) {
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
  spellYDif = this.param4 * 1.2;
  textCantPlace.setVisible(false);

}


function placeSpell(pointer) {

  if (!canplaceSpell) {
    return;
  }

  if (pointer.position.y < troopBarrierTop || pointer.position.y > troopBarrierBottom - spellYDif) {
    return;
  }

  if (currentSpell === 'None') {
    return;
  }


  //************************************************************************
  // ARROW SPELL
  //************************************************************************
  if (currentSpell === 'Arrow') {

    boxL = this.input.activePointer.positionToCamera(mycamera).x - 200;
    boxR = this.input.activePointer.positionToCamera(mycamera).x + 200;
    boxT = pointer.position.y - 50;
    boxB = pointer.position.y + 50;

    Troops.forEach((spec) => {
      if (!spec.alive) {
        return;
      }

      if (boxL < spec.x && spec.x < boxR && boxT < spec.y + spec.dy && spec.y - spec.dy < boxB) {
        spec.arrowDrop();
      }

    });

    enemyTroops.forEach((spec) => {
      if (!spec.alive) {
        return;
      }

      if (boxL < spec.x && spec.x < boxR && boxT < spec.y + spec.dy && spec.y - spec.dy < boxB) {
        spec.arrowDrop();
      }

    });

    let temp2 = this.add.image(this.input.activePointer.positionToCamera(mycamera).x, pointer.position.y - 300, 'arrowsFalling');
    this.tweens.add({
      targets: temp2,
      y: pointer.position.y,
      ease: 'Linear',
      duration: 500,
    });

    setTimeout(() => {
      this.tweens.add({
        targets: temp2,
        duration: 3000,
        alpha: '-=1'
      });
    }, 1000);


    gold -= 150;
    let temp = this.sound.add('ArrowSound');
    temp.play({ volume: 0.5, loop: false });

  }

  //************************************************************************
  // FREEZE SPELL
  //************************************************************************
  if (currentSpell === 'Freeze') {

    boxL = this.input.activePointer.positionToCamera(mycamera).x - 100;
    boxR = this.input.activePointer.positionToCamera(mycamera).x + 100;
    boxT = pointer.y - 100;
    boxB = pointer.y + 100;

    Troops.forEach((spec) => {
      if (!spec.alive) {
        return;
      }

      if (boxL < spec.x && spec.x < boxR && boxT < spec.y + spec.dy && spec.y - spec.dy < boxB) {
        spec.freeze = true;
      }
    });

    enemyTroops.forEach((spec) => {
      if (!spec.alive) {
        return;
      }

      if (boxL < spec.x && spec.x < boxR && boxT < spec.y + spec.dy && spec.y - spec.dy < boxB) {
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
  spellYDif = -1;
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
    if (GoldMines[0].alive) {
      return;
    }
    GoldMines[0].alive = true;
    GoldMines[0].setVisible(true);
  }

  //GOLD MINE SECOND LOCATION
  if (pointer.position.x > 600 && pointer.position.x < 675 && pointer.position.y > 300 && pointer.position.y < 375) {
    if (GoldMines[1].alive) {
      return;
    }
    GoldMines[1].alive = true;
    GoldMines[1].setVisible(true);
  }

  //GOLD MINE THIRD LOCATION
  if (pointer.position.x > 800 && pointer.position.x < 875 && pointer.position.y > 413 && pointer.position.y < 488) {
    if (GoldMines[2].alive) {
      return;
    }
    GoldMines[2].alive = true;
    GoldMines[2].setVisible(true);
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
