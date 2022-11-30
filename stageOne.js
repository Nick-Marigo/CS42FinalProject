/*let stageOne = {
  key: "stageOne",
  active: false,
  preload: stageOnePreload,
  create: stageOneCreate,
  update: stageOneUpdate
};

var currentText = [
  "Sir someone’s army is coming full force at our castle.",
  "Who would have an army this big to attack us?",
  "No matter. We will crush them right here right now.",
  "Sir the archers are ready."
];


function stageOnePreload() {
  this.load.image('map', 'assets/Testing/testmap.png');
  this.load.image('castle', 'assets/Testing/testCastle.png');
  this.load.image('troopBoundry', 'assets/Testing/troopboundries.png');

  this.load.image('button1', 'assets/Testing/testButtons/buttonInfantry.png');
  this.load.image('button2', 'assets/Testing/testButtons/buttonArcher.png');

  this.load.image('ButtonArrow', 'assets/Testing/testButtons/arrowSpellButton.png');
  this.load.image('arrowOutline', 'assets/Testing/Spelloutline/arrowSpellOutline.png');

  this.load.image('infantry', 'assets/Testing/testTroops/testTroopInfantry.png');
  this.load.image('archer', 'assets/Testing/testTroops/testTroopArcher.png');
}

function stageOneCreate() {
  updateCount = 1;
  gold = 500;

  troopBarrierBottom = 700;
  troopBarrierTop = 200;

  this.add.image(3000, 500, 'map');

  mycamera = this.cameras.main;
  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.setBounds(0, 0, 4000, 900);

  playerCastle = new Castle(this, 75, 450, 75);
  enemyCastle = new Castle(this, 3925, 450, -75);

  playerCastleHealth = this.add.text(10, 16, 'Castle Health: ' + playerCastle.health, { fontFamily: 'Domine', fontSize: '40px', color: '#0000FF', stroke: '#000000', strokeThickness: 5 });
  playerCastleHealth.setScrollFactor(0, 0);

  enemyCastleHealth = this.add.text(690, 16, 'Enemy Castle Health: ' + enemyCastle.health, { fontFamily: 'Domine', fontSize: '40px', color: '#FF0000', stroke: '#000000', strokeThickness: 5 });
  enemyCastleHealth.setScrollFactor(0, 0);

  goldCount = this.add.text(20, 830, 'Gold: ' + gold, { fontFamily: 'Domine', fontSize: '30px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 });
  goldCount.setScrollFactor(0, 0);

  boundryBottom = this.add.image(3000, troopBarrierBottom, 'troopBoundry').setVisible(false);
  boundryTop = this.add.image(3000, troopBarrierTop, 'troopBoundry').setVisible(false);

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

  arrowSpellButton = this.add.image(800, 850, 'ButtonArrow').setInteractive().setScrollFactor(0, 0);

  button1.on('pointerdown', selectTroop, { param1: troopbuttons[0], param2: 50, param3: 0 });
  button2.on('pointerdown', selectTroop, { param1: troopbuttons[1], param2: 50, param3: 1 });
  arrowSpellButton.on('pointerdown', selectSpell, { param1: spells[1], param2: 150, param3: 5 });

  this.input.on('pointerup', spawnTroop, this);
  this.input.on('pointerup', placeSpell, this);

  textCantPlace = this.add.text(mycamera.x + 350, mycamera.y + 450, 'Can not place troop there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlace.setVisible(false).setScrollFactor(0, 0).setDepth(3);

  textCantPlaceSpell = this.add.text(mycamera.x + 350, mycamera.y + 450, 'Can not place Spell there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlaceSpell.setVisible(false).setScrollFactor(0, 0).setDepth(3);

}

function stageOneUpdate() {
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
}*/