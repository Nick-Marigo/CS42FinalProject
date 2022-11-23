let tutorial = {
  key: 'tutorialScene',
  active: false,
  preload: tutorialPreload,
  create: tutorialCreate,
  update: tutorialUpdate
}

let tutorialTroops = [];
let tutorialEnemies = [];
let textOne, textTwo, textThree, textFour, textFive, textSix, textSeven;
let one = true, two = false, three = false, four = false, five = false, six = false, seven = false;
let arrow3, arrow4;

function tutorialPreload() {
  this.load.image('map', 'assets/Testing/testmap.png');
  this.load.image('castle', 'assets/Testing/testCastle.png');
  this.load.image('black', 'assets/Testing/blackscreen.png');
  this.load.image('arrow', 'assets/arrow.png');

  this.load.image('button1', 'assets/Testing/testButtons/buttonInfantry.png');
  this.load.image('button2', 'assets/Testing/testButtons/buttonArcher.png');
  this.load.image('button3', 'assets/Testing/testButtons/buttonTank.png');
  this.load.image('button4', 'assets/Testing/testButtons/buttonWizard.png');
  this.load.image('button5', 'assets/Testing/testButtons/buttonCalvary.png');

  this.load.image('troopBoundry', 'assets/Testing/troopboundries.png');
  this.load.image('enemy', 'assets/Testing/testTroops/testenemy.png');
  this.load.image('crossed', 'assets/Testing/testButtons/buttonCrossed.png');
}

function tutorialCreate() {
  this.add.image(3000, 500, 'map');

  playerCastle = new Castle(this, 75, 450);
  enemyCastle = new Castle(this, 5925, 450);

  playerCastleHealth = this.add.text(10, 16, 'Castle Health: ' + playerCastle.health, { fontFamily: 'Domine', fontSize: '40px', color: '#0000FF', stroke: '#000000', strokeThickness: 5 });
  playerCastleHealth.setScrollFactor(0, 0);

  enemyCastleHealth = this.add.text(690, 16, 'Enemy Castle Health: ' + playerCastle.health, { fontFamily: 'Domine', fontSize: '40px', color: '#FF0000', stroke: '#000000', strokeThickness: 5 });
  enemyCastleHealth.setScrollFactor(0, 0);

  goldCount = this.add.text(20, 830, 'Gold: ' + gold, { fontFamily: 'Domine', fontSize: '30px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 });
  goldCount.setScrollFactor(0, 0);

  textCantPlace = this.add.text(mycamera.x + 350, mycamera.y + 450, 'Can not place troop there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlace.setVisible(false);
  textCantPlace.setScrollFactor(0, 0);

  boundryBottom = this.add.image(3000, troopBarrierBottom, 'troopBoundry');
  boundryTop = this.add.image(3000, troopBarrierTop, 'troopBoundry');
  boundryBottom.setVisible(false);
  boundryTop.setVisible(false);

  button1 = this.add.image(200, 850, 'button1');
  button1.setInteractive();
  button1.setScrollFactor(0, 0);
  button1.on('pointerdown', selectTroop, { param1: troopbuttons[0], param2: 50 });

  button2 = this.add.image(300, 850, 'button2').setScrollFactor(0, 0);
  this.add.image(300, 850, 'crossed').setScrollFactor(0, 0).setDepth(2);
  button3 = this.add.image(400, 850, 'button3').setScrollFactor(0, 0);
  this.add.image(400, 850, 'crossed').setScrollFactor(0, 0).setDepth(2);
  button4 = this.add.image(500, 850, 'button4').setScrollFactor(0, 0);
  this.add.image(500, 850, 'crossed').setScrollFactor(0, 0).setDepth(2);
  button5 = this.add.image(600, 850, 'button5').setScrollFactor(0, 0);
  this.add.image(600, 850, 'crossed').setScrollFactor(0, 0).setDepth(2);

  this.input.on('pointerup', spawnTroop, this);

  mycamera = this.cameras.main;
  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.setBounds(0, 0, 6000, 1000);

  let temp = this.add.image(600, 450, 'black').setDepth(10);
  temp.alpha = 0.65;

  let continueText = this.add.text(600, 550, 'Click to continue', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 })
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

  textSeven = this.add.text(600, 450, 'Use Left and Right Arrows to move the screen.', { fontFamily: 'Domine', fontSize: '48px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textSeven.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  arrow3 = this.add.image(300, 850, 'arrow').setScale(.4).setDepth(11).setVisible(false);
  arrow3.flipX = true;

  arrow4 = this.add.image(800, 850, 'arrow').setScale(.4).setDepth(11).setVisible(false);
  arrow4.flipX = true;

  /*this.tweens.add({
    targets: arrow,
    duration: 2000,
    repeat: -1,
    yoyo: true,
    X: '-=100'
  });*/

}

function tutorialUpdate() {

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

  console.log(one, two, three);
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
    boundryBottom.setVisible(true).setDepth(11);
    boundryTop.setVisible(true).setDepth(11);
  } else if (six) {
    textSix.setVisible(true);
    playerCastleHealth.setDepth(11);
    enemyCastleHealth.setDepth(11);
  } else if (seven) {
    textSeven.setVisible(true);
  }

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

  tutorialTroops.push(new Infantry(this, 0, pointer.y));
  gold -= Troops[Troops.length - 1].cost;

  currentTroop = -1;
  canplace = false;

}

function moveOn() {
  if (one) {
    one = false;
    two = true;
    textOne.setVisible(false);
  } else if (two) {
    updateCount = 1;
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
    boundryBottom.setVisible(false).setDepth(2);
    boundryTop.setVisible(false).setDepth(2);
    textFive.setVisible(false);
  } else if (six) {
    six = false;
    seven = true;
    playerCastleHealth.setDepth(1);
    enemyCastleHealth.setDepth(1);
    textSix.setVisible(false);
  } else if (seven) {
    seven = false;
    //eight = true;
    textSeven.setVisible(false);
  }
}