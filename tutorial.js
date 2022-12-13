let tutorial = {
  key: 'tutorialScene',
  active: false,
  preload: tutorialPreload,
  create: tutorialCreate,
  update: tutorialUpdate
}

let blackscreen;
let tutorialTroops = [];
let tutorialEnemies = [];
let spawnEnemies = true;
let textOne, textTwo, textThree, textFour, textFive, textSix, textSeven, textEight, textNine, textTen;
let one = true, two = false, three = false, four = false, five = false, six = false, seven = false, eight = false, nine = false, ten = false;
let arrow3, arrow4;
let enemiesDead = 0;
let textCanPlaceHere;
let textCantPlaceTwo;
var tween;

function tutorialPreload() {
  this.load.image('map', 'finalAssets/Map.png');
  this.load.image('castle', 'finalAssets/Castle.png');
  this.load.image('castleShadow', 'finalAssets/CastleShadow.png');
  this.load.image('troopBoundry', 'finalAssets/troopboundries.png');
  this.load.image('buttonBackground', 'finalAssets/Buttons/ButtonBackGround.png');
  this.load.image('black', 'assets/Testing/blackscreen.png');
  this.load.image('arrow', 'assets/arrow.png');

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

  this.load.image('crossed', 'assets/Testing/testButtons/buttonCrossed.png');
}

function tutorialCreate() {

  gold = 250;
  updateCount = 1;

  troopBarrierBottom = 700;
  troopBarrierTop = 200;

  this.add.image(2000, 450, 'map');
  this.add.image(600, 840, 'buttonBackground').setScrollFactor(0, 0);

  blackscreen = this.add.image(3000, 450, 'black').setDepth(10);
  blackscreen.alpha = 0.65;

  tutorialPlayerCastle = new Castle(this, 100, 400, 75, 0, 0, false);
  this.add.image(100, 400, 'castleShadow').alpha = .5;
  tutorialEnemyCastle = new Castle(this, 3900, 400, -75, 800, 0, true);
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

  goldCount = this.add.text(20, 820, 'Gold: ' + gold, { fontFamily: 'Domine', fontSize: '30px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 });
  goldCount.setScrollFactor(0, 0);

  textCantPlace = this.add.text(mycamera.x + 350, mycamera.y + 125, 'Can not place troops here!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlace.setVisible(false);
  textCantPlace.setScrollFactor(0, 0);

  textCanPlaceHere = this.add.text(mycamera.x + 400, mycamera.y + 450, 'Can place troops here!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#00FF00', stroke: '#000000', strokeThickness: 5 });
  textCanPlaceHere.setVisible(false);
  textCanPlaceHere.setScrollFactor(0, 0);


  textCantPlaceTwo = this.add.text(mycamera.x + 350, mycamera.y + 775, 'Can not place troops here!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlaceTwo.setVisible(false);
  textCantPlaceTwo.setScrollFactor(0, 0);

  boundryBottom = this.add.image(3000, troopBarrierBottom, 'troopBoundry');
  boundryTop = this.add.image(3000, troopBarrierTop, 'troopBoundry');
  boundryBottom.setVisible(false);
  boundryTop.setVisible(false);

  button1.on('pointerdown', tutorialSelectTroop, { param1: troopbuttons[0], param2: 50 });

  //button2 = this.add.image(300, 850, 'button2').setScrollFactor(0, 0);
  this.add.image(300, 850, 'crossed').setScrollFactor(0, 0).setDepth(2);
  //button3 = this.add.image(400, 850, 'button3').setScrollFactor(0, 0);
  this.add.image(400, 850, 'crossed').setScrollFactor(0, 0).setDepth(2);
  //button4 = this.add.image(500, 850, 'button4').setScrollFactor(0, 0);
  this.add.image(500, 850, 'crossed').setScrollFactor(0, 0).setDepth(2);
  //button5 = this.add.image(600, 850, 'button5').setScrollFactor(0, 0);
  this.add.image(600, 850, 'crossed').setScrollFactor(0, 0).setDepth(2);

  this.input.on('pointerup', tutorialSpawnTroop, this);

  mycamera = this.cameras.main;
  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.setBounds(0, 0, 4000, 900);

  let continueText = this.add.text(600, 730, 'Click here to continue', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 })
  continueText.setScrollFactor(0, 0).setOrigin(0.5).setDepth(11).setInteractive();
  continueText.on('pointerdown', moveOn, this);

  textOne = this.add.text(600, 450, 'Welcome to the tutorial!', { fontFamily: 'Domine', fontSize: '60px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textOne.setScrollFactor(0, 0).setOrigin(0.5).setDepth(11).setVisible(false);

  textTwo = this.add.text(600, 450, 'This is a walk through on how to play this game.', { fontFamily: 'Domine', fontSize: '40px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textTwo.setScrollFactor(0, 0).setOrigin(0.5).setDepth(11).setVisible(false);

  textThree = this.add.text(10, 770, 'This is Gold. Gold is your currency and you get 30 every 5 seconds.', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textThree.setScrollFactor(0, 0).setDepth(11).setVisible(false);

  textFour = this.add.text(600, 770, 'This is your troop selection. You will click on a troop to select it.', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textFour.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  var content = ['                                            This is troop boundries.', 'You can choose the y-axis for the troop as long as its in the boundries.']
  textFive = this.add.text(600, 350, content, { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textFive.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  textSix = this.add.text(600, 200, 'This is your castles health and your enemies castles health.', { fontFamily: 'Domine', fontSize: '40px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textSix.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  var content2 = ['              This is your castle.',
    'If your castles health gets to 0 you lose.',
    '            Protect it at all cost!'];
  textSeven = this.add.text(650, 400, content2, { fontFamily: 'Domine', fontSize: '48px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textSeven.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  var content3 = ['Use Left and Right Arrows to move the screen.',
    '                                      (Try it)'];
  textEight = this.add.text(600, 450, content3, { fontFamily: 'Domine', fontSize: '48px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textEight.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  textNine = this.add.text(600, 150, 'Now select the yellow troop and kill the enemies.', { fontFamily: 'Domine', fontSize: '48px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textNine.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  textTen = this.add.text(600, 450, 'Congrats! You finished the tutorial!', { fontFamily: 'Domine', fontSize: '48px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textTen.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  arrow3 = this.add.image(300, 850, 'arrow').setScale(.4).setDepth(11).setVisible(false);
  arrow3.flipX = true;

  arrow4 = this.add.image(800, 850, 'arrow').setScale(.4).setDepth(11).setVisible(false);
  arrow4.flipX = true;

  this.tweens.add({
    targets: arrow3,
    duration: 2000,
    repeat: -1,
    yoyo: true,
    x: '-=80'
  });


}

function tutorialUpdate() {

  updateCount++;

  if (updateCount % 300 === 0) {
    gold += 30;
    updateCount = 1;
  }

  goldCount.setText('Gold: ' + gold);

  if (cursors.left.isDown) {
    mycamera.scrollX -= 25;
  }

  if (cursors.right.isDown) {
    mycamera.scrollX += 25;
  }

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

  if (one) {
    textOne.setVisible(true);
  } else if (two) {
    textTwo.setVisible(true);
  } else if (three) {
    arrow3.setVisible(true);
    textThree.setVisible(true);
  } else if (four) {
    arrow3.setVisible(false);
    arrow4.setVisible(true);
    button1.setDepth(11);
    button2.setDepth(11);
    button3.setDepth(11);
    button4.setDepth(11);
    button5.setDepth(11);
    textFour.setVisible(true);
  } else if (five) {
    arrow4.setVisible(false);
    textFive.setVisible(true);
    textCantPlace.setVisible(true).setDepth(11);
    textCantPlaceTwo.setVisible(true).setDepth(11);
    textCanPlaceHere.setVisible(true).setDepth(11);
    boundryBottom.setVisible(true).setDepth(11);
    boundryTop.setVisible(true).setDepth(11);
  } else if (six) {
    textSix.setVisible(true);
    tutorialPlayerCastle.bar.setDepth(11);
    tutorialEnemyCastle.bar.setDepth(11);
  } else if (seven) {
    tutorialPlayerCastle.setDepth(11);
    tutorialEnemyCastle.setDepth(11);
    textSeven.setVisible(true);
  } else if (eight) {
    textEight.setVisible(true);
  } else if (nine) {
    textNine.setVisible(true);
    if (spawnEnemies) {
      tutorialEnemies.push(new EnemyInfantry(this, 1000, 600).setDepth(1));
      tutorialEnemies.push(new EnemyInfantry(this, 1000, 450).setDepth(1));
      tutorialEnemies.push(new EnemyInfantry(this, 1000, 300).setDepth(1));
      spawnEnemies = false;
    }
  } else if (ten) {
    textNine.setVisible(false);
    blackscreen.setVisible(true);
    textTen.setVisible(true);
  }

  tutorialTroops.forEach((spec) => {

    if (!spec.alive) {
      return;
    }

    let foundMatch = false;
    for (let count = 0; count < tutorialEnemies.length; count++) {
      if (spec.checkRange(tutorialEnemies[count]) && tutorialEnemies[count].alive) {
        spec.setVelocityX(0);
        spec.attack(tutorialEnemies[count]);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      spec.setVelocityX(spec.speed);
    }

    if (spec.checkCastleRange(tutorialEnemyCastle)) {
      spec.setVelocity(0);
      spec.attack(tutorialEnemyCastle);
    }

  });

  tutorialEnemies.forEach((spec) => {

    if (!spec.alive && spec.alive != null) {
      enemiesDead++;
      if (enemiesDead === 3) {
        nine = false;
        ten = true;
        enemiesDead = null;
      }
      return;
    }

    enemiesDead = 0;


    let foundMatch = false;
    for (let count = 0; count < tutorialTroops.length; count++) {
      if (spec.checkRange(tutorialTroops[count]) && tutorialTroops[count].alive) {
        spec.setVelocityX(0);
        spec.attack(tutorialTroops[count]);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      spec.setVelocityX(spec.speed);
    }

    if (spec.checkCastleRange(tutorialPlayerCastle)) {
      spec.setVelocity(0);
      spec.attack(tutorialPlayerCastle);
    }

  });

}

function tutorialSelectTroop() {

  if (gold - this.param2 < 0) {
    return;
  }

  canplace = true;
  currentTroop = this.param1;

}

function tutorialSpawnTroop(pointer) {

  if (pointer.position.y < troopBarrierTop || pointer.position.y > troopBarrierBottom) {
    return;
  }

  if (currentTroop <= 0) {
    return;
  }

  if (currentTroop === 1) {
    tutorialTroops.push(new Infantry(this, 0, pointer.y).setDepth(1));
    gold -= tutorialTroops[tutorialTroops.length - 1].cost;
  }

  currentTroop = -1;
  canplace = false;

}

function moveOn() {
  if (one) {
    one = false;
    two = true;
    textOne.setVisible(false);
  } else if (two) {
    two = false;
    three = true;
    goldCount.setDepth(11);
    textTwo.setVisible(false);
  } else if (three) {
    four = true;
    three = false;
    goldCount.setDepth(1);
    textThree.setVisible(false);
  } else if (four) {
    four = false;
    five = true;
    button1.setDepth(1);
    button2.setDepth(1);
    button3.setDepth(1);
    button4.setDepth(1);
    button5.setDepth(1);
    textFour.setVisible(false);
  } else if (five) {
    five = false;
    six = true;
    textCantPlace.setVisible(false).setDepth(2);
    textCantPlaceTwo.setVisible(false);
    textCanPlaceHere.setVisible(false);
    boundryBottom.setVisible(false).setDepth(2);
    boundryTop.setVisible(false).setDepth(2);
    textFive.setVisible(false);
  } else if (six) {
    six = false;
    seven = true;
    tutorialPlayerCastle.bar.setDepth(2);
    tutorialEnemyCastle.bar.setDepth(2);
    textSix.setVisible(false);
  } else if (seven) {
    seven = false;
    eight = true;
    tutorialPlayerCastle.setDepth(2);
    tutorialEnemyCastle.setDepth(2);
    textSeven.setVisible(false);
  } else if (eight) {
    eight = false;
    nine = true;
    textEight.setVisible(false);
    blackscreen.setVisible(false);
  } else if (nine) {
    nine = false;
    textEight.setVisible(false);
  } else if (ten) {
    tutorialTroops = [];
    tutorialEnemies = [];
    GoldMines = [];
    spawnEnemies = true;
    ten = false;
    one = true;
    this.scene.start('titleScene');
  }
}