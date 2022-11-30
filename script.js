/*  Students: Please use this week's project for Week 15: Assignment 18: Alpha. 
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
var arrowSpellButton, freezeSpellButton, healSpellButton;
let goldCount;
let gold = 250;
let troopBarrierBottom, troopBarrierTop;
let boundryBottom, boundryTop;
let canplace = false;
let canplaceSpell = false;
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

var playerCastle;
let playerCastleHealth;
var enemyCastle;
let enemyCastleHealth;

let music;
let selectSound, placeSound, healSound;

//********************************************************************************************************************
//GAMEPLAY SCENE
//********************************************************************************************************************

function gamePreload() {
  this.load.image('map', 'assets/Testing/testmap.png');
  this.load.image('castle', 'assets/Testing/testCastle.png');
  this.load.image('troopBoundry', 'assets/Testing/troopboundries.png');

  this.load.image('button1', 'assets/Testing/testButtons/buttonInfantry.png');
  this.load.image('button2', 'assets/Testing/testButtons/buttonArcher.png');
  this.load.image('button3', 'assets/Testing/testButtons/buttonTank.png');
  this.load.image('button4', 'assets/Testing/testButtons/buttonWizard.png');
  this.load.image('button5', 'assets/Testing/testButtons/buttonCalvary.png');

  this.load.image('ButtonHeal', 'assets/Testing/testButtons/healSpellButton.png');
  this.load.image('ButtonArrow', 'assets/Testing/testButtons/arrowSpellButton.png');
  this.load.image('arrowOutline', 'assets/Testing/Spelloutline/arrowSpellOutline.png');
  this.load.image('ButtonFreeze', 'assets/Testing/testButtons/freezeSpellButton.png');
  this.load.image('freezeOutline', 'assets/Testing/Spelloutline/freezeSpellOutline.png');

  this.load.image('infantry', 'assets/Testing/testTroops/testTroopInfantry.png');
  this.load.image('archer', 'assets/Testing/testTroops/testTroopArcher.png');
  this.load.image('tank', 'assets/Testing/testTroops/testTroopTank.png');
  this.load.image('wizard', 'assets/Testing/testTroops/testTroopWizard.png');
  this.load.image('calvary', 'assets/Testing/testTroops/testTroopCalvary.png');

  this.load.image('enemy', 'assets/Testing/testTroops/testenemy.png');

  this.load.audio('gameplayMusic', 'Audio/Music/Showdown.mp3');
  this.load.audio('FreezeSound', 'Audio/SoundEffects/freeze2.ogg');
  this.load.audio('SelectSound', 'Audio/SoundEffects/Menu1A.wav');
  this.load.audio('PlaceSound', 'Audio/SoundEffects/Menu1B.wav');
  this.load.audio('HealSound', 'Audio/SoundEffects/heal.ogg');
  this.load.audio('ArrowSound', 'Audio/SoundEffects/ArchersShooting.ogg');

}

function gameCreate() {

  updateCount = 1;
  gold = 2500;

  troopBarrierBottom = 700;
  troopBarrierTop = 200;

  music = this.sound.add('gameplayMusic');
  music.play({volume: 0.1, loop: true});

  placeSound = this.sound.add('PlaceSound');
  selectSound = this.sound.add('SelectSound');
  healSound = this.sound.add('HealSound');

  this.add.image(3000, 500, 'map');

  playerCastle = new Castle(this, 75, 450, 75);
  enemyCastle = new Castle(this, 3925, 450, -75);

  playerCastleHealth = this.add.text(10, 16, 'Castle Health: ' + playerCastle.health, { fontFamily: 'Domine', fontSize: '40px', color: '#0000FF', stroke: '#000000', strokeThickness: 5 });
  playerCastleHealth.setScrollFactor(0, 0);

  enemyCastleHealth = this.add.text(690, 16, 'Enemy Castle Health: ' + enemyCastle.health, { fontFamily: 'Domine', fontSize: '40px', color: '#FF0000', stroke: '#000000', strokeThickness: 5 });
  enemyCastleHealth.setScrollFactor(0, 0);

  this.physics.world.setBounds(0, 0, 4000, 900);

  goldCount = this.add.text(20, 830, 'Gold: ' + gold, { fontFamily: 'Domine', fontSize: '30px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 });
  goldCount.setScrollFactor(0, 0);

  boundryBottom = this.add.image(3000, troopBarrierBottom, 'troopBoundry').setVisible(false);
  boundryTop = this.add.image(3000, troopBarrierTop, 'troopBoundry').setVisible(false);

  enemyTroops.push(new EnemyInfantry(this, 1000, 600));
  enemyTroops.push(new EnemyInfantry(this, 1000, 450));
  enemyTroops.push(new EnemyInfantry(this, 1000, 300));
  enemyTroops.push(new EnemyInfantry(this, 900, 450));
  enemyTroops.push(new EnemyInfantry(this, 1100, 450));

  let outlineImage = ['infantry', 'archer', 'tank', 'wizard', 'calvary', 'arrowOutline', 'freezeOutline'];
  for (let count = 0; count < 7; count++) {
    outlines.push(this.add.image(500, 400, outlineImage[count]));
    outlines[count].setDepth(4).setScrollFactor(0, 0).setVisible(false);
    if (count > 4) {
      outlines[count].alpha = .5;
    }
  }

  button1 = this.add.image(200, 850, 'button1').setInteractive().setScrollFactor(0, 0);

  button2 = this.add.image(300, 850, 'button2').setInteractive().setScrollFactor(0, 0);

  button3 = this.add.image(400, 850, 'button3').setInteractive().setScrollFactor(0, 0);

  button4 = this.add.image(500, 850, 'button4').setInteractive().setScrollFactor(0, 0);

  button5 = this.add.image(600, 850, 'button5').setInteractive().setScrollFactor(0, 0);

  healSpellButton = this.add.image(700, 850, 'ButtonHeal').setInteractive().setScrollFactor(0, 0);

  arrowSpellButton = this.add.image(800, 850, 'ButtonArrow').setInteractive().setScrollFactor(0, 0);

  freezeSpellButton = this.add.image(900, 850, 'ButtonFreeze').setInteractive().setScrollFactor(0, 0);


  mycamera = this.cameras.main;
  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.setBounds(0, 0, 6000, 1000);

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

  healSpellButton.on('pointerdown', healCastle, this);

  arrowSpellButton.on('pointerdown', selectSpell, { param1: spells[1], param2: 150, param3: 5 });

  freezeSpellButton.on('pointerdown', selectSpell, { param1: spells[2], param2: 150, param3: 6 });

  this.input.on('pointerup', spawnTroop, this);
  this.input.on('pointerup', placeSpell, this);

}

function gameUpdate() {

  updateCount++;
  trackMouse();

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
    music.pause();
    this.scene.start('WinOrLoseScene');
  }

  if (enemyCastle.health <= 0) {
    WinOrLose = true;
    music.pause();
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

    if (!foundMatch) {
      spec.setVelocityX(spec.speed);
    }

    if (spec.checkCastleRange(playerCastle)) {
      spec.setVelocity(0);
      spec.attack(playerCastle);
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

  selectSound.play({volume: .1});
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

  placeSound.play({volume: .1});
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

  healSound.play({volume: .2});
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

  selectSound.play({volume: .1});
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
    boxL = pointer.x - 200;
    boxR = pointer.x + 200;
    boxT = pointer.y - 50;
    boxB = pointer.y + 50;

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
    temp.play({volume: 0.5, loop: false});

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
    temp.play({volume: 0.1, loop: false});

  }

  placeSound.play({volume: .1});
  currentSpell = spells[0];
  outlines[currentOutline].setVisible(false);
  currentOutline = -1;
  canplaceSpell = false;

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
  outlines = [];


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
