let tutorial = {
  key: 'tutorialScene',
  active: false,
  preload: tutorialPreload,
  create: tutorialCreate,
  update: tutorialUpdate
}

let blackscreen;
let spawnEnemies = true;
let textOne, textTwo, textThree, textFour, textFive, textSix, textSeven, textEight, textEightOne, textEightTwo, textNine, textTen, textEleven, textElevenOne, textElevenTwo, textTwelve, textThirteen, textFourteen, textFifteen, textSixteen, textSeventeen, textEightteen;
let one = true, two = false, three = false, four = false, five = false, six = false, seven = false, eight = false, nine = false, ten = false, eleven = false, twelve = false, thirteen = false, fourteen = false, fifteen = false, sixteen = false, seventeen = false, eightteen = false;
let imageTroop1, imageTroop2, imageTroop3, imageTroop4, imageTroop5, imageSpell1, imageSpell2, imageSpell3;
let enemiesDead = 0;
let textCanPlaceHere, textCanPlaceSpellHere;
let textCantPlaceTwo, textCantPlaceSpellTwo;
var tween;
var tutorialArrows = {
  arrows: [
    { x: 300, y: 840, flip: true, rotateUp: false, rotateDown: false, dx: '-=80', dy: '+=0' }, //1
    { x: 440, y: 840, flip: true, rotateUp: false, rotateDown: false, dx: '-=80', dy: '+=0' }, //2
    { x: 250, y: 637, flip: false, rotateUp: false, rotateDown: false, dx: '+=80', dy: '+=0' }, //3
    { x: 450, y: 337, flip: false, rotateUp: false, rotateDown: false, dx: '+=80', dy: '+=0' }, //4
    { x: 650, y: 437, flip: false, rotateUp: false, rotateDown: false, dx: '+=80', dy: '+=0' }, //5
    { x: 200, y: 840, flip: false, rotateUp: false, rotateDown: false, dx: '+=80', dy: '+=0' }, //6
    { x: 930, y: 840, flip: true, rotateUp: false, rotateDown: false, dx: '-=80', dy: '+=0' }, //7
    { x: 200, y: 100, flip: true, rotateUp: true, rotateDown: false, dx: '-=0', dy: '+=25' }, //8
    { x: 1000, y: 100, flip: true, rotateUp: true, rotateDown: false, dx: '-=0', dy: '+=25' }, //9
    { x: 200, y: 800, flip: true, rotateUp: false, rotateDown: true, dx: '-=0', dy: '-=25' }, //10
    { x: 1000, y: 800, flip: true, rotateUp: false, rotateDown: true, dx: '-=0', dy: '-=25' }, //11
    { x: 700, y: 840, flip: false, rotateUp: false, rotateDown: false, dx: '+=80', dy: '+=0' }, //12
    { x: 960, y: 840, flip: false, rotateUp: false, rotateDown: false, dx: '+=80', dy: '+=0' }, //13
    { x: 200, y: 100, flip: true, rotateUp: false, rotateDown: true, dx: '-=0', dy: '+=25' }, //14
    { x: 1000, y: 100, flip: true, rotateUp: false, rotateDown: true, dx: '-=0', dy: '+=25' }, //15
    { x: 300, y: 300, flip: true, rotateUp: false, rotateDown: false, dx: '-=80', dy: '+=0' }, //16
    { x: 300, y: 600, flip: true, rotateUp: false, rotateDown: false, dx: '-=80', dy: '+=0' }, //17
    { x: 150, y: 200, flip: true, rotateUp: false, rotateDown: false, dx: '-=80', dy: '+=0' }, //18
    { x: 150, y: 700, flip: true, rotateUp: false, rotateDown: false, dx: '-=80', dy: '+=0' }, //19
    { x: 1050, y: 200, flip: false, rotateUp: false, rotateDown: false, dx: '+=80', dy: '+=0' }, //20
    { x: 1050, y: 700, flip: false, rotateUp: false, rotateDown: false, dx: '+=80', dy: '+=0' }, //21
    { x: 600, y: 250, flip: false, rotateUp: true, rotateDown: false, dx: '+=0', dy: '-=50' } //22
  ]
}

var trackArrows = [];

function tutorialPreload() {
  this.load.image('map', 'finalAssets/Misc/Map.png');
  this.load.image('castle', 'finalAssets/Misc/Castle.png');
  this.load.image('castleShadow', 'finalAssets/Misc/CastleShadow.png');
  this.load.image('troopBoundry', 'finalAssets/Misc/troopboundries.png');
  this.load.image('buttonBackground', 'finalAssets/Buttons/ButtonBackGround.png');
  this.load.image('black', 'finalAssets/Misc/blackscreen.png');
  this.load.image('arrow', 'finalAssets/Misc/arrow.png');

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
  this.load.image('arrowsFalling', 'finalAssets/Misc/ArrowsFalling.png');
  this.load.image('freezeOutline', 'finalAssets/OutlinePlacements/freezeSpellOutline.png');
  this.load.image('goldMineOutline', 'finalAssets/OutlinePlacements/goldMineOutline.png');
  this.load.spritesheet('goldMine', 'finalAssets/Misc/GoldMine.png', { frameWidth: 75, frameHeight: 75 });

  this.load.image('crossed', 'finalAssets/Misc/buttonCrossed.png');

  this.load.audio('SelectSound', 'Audio/SoundEffects/Menu1A.wav');
  this.load.audio('PlaceSound', 'Audio/SoundEffects/Menu1B.wav');
  this.load.audio('HealSound', 'Audio/SoundEffects/heal.ogg');
  this.load.audio('ArrowSound', 'Audio/SoundEffects/ArchersShooting.ogg');
  this.load.audio('FreezeSound', 'Audio/SoundEffects/freeze2.ogg');

}

function tutorialCreate() {

  gold = 250;
  updateCount = 1;

  troopBarrierBottom = 700;
  troopBarrierTop = 200;

  placeSound = this.sound.add('PlaceSound');
  selectSound = this.sound.add('SelectSound');
  healSound = this.sound.add('HealSound');

  this.add.image(2000, 450, 'map');
  this.add.image(600, 840, 'buttonBackground').setScrollFactor(0, 0);

  blackscreen = this.add.image(3000, 450, 'black').setDepth(10);
  blackscreen.alpha = 0.65;

  tutorialPlayerCastle = new Castle(this, 100, 400, 75, 0, 0, false);
  this.add.image(100, 400, 'castleShadow').alpha = .5;
  tutorialEnemyCastle = new Castle(this, 3900, 400, -75, 800, 0, true);
  this.add.image(3900, 400, 'castleShadow').setFlipX(true).alpha = .5;

  miniMap = new MiniMap(this, 400, 0);

  outlines = [];
  let outlineImage = ['Infantry', 'Archer', 'Tank', 'Wizard', 'Calvary', 'arrowOutline', 'freezeOutline', 'goldMine'];
  for (let count = 0; count < outlineImage.length; count++) {
    outlines.push(this.add.image(500, 400, outlineImage[count]));
    outlines[count].setDepth(4).setScrollFactor(0, 0).setVisible(false).setScale(1.2);
    if (count > 4 && count < 7) {
      outlines[count].alpha = .5;
    }
  }

  this.anims.create({
    key: 'GoldMineAnims',
    frames: this.anims.generateFrameNumbers('goldMine', { start: 0, end: 2 }),
    frameRate: 8,
    repeat: -1
  });

  GoldMines.push(new GoldMine(this, 437, 637, 15));
  GoldMines.push(new GoldMine(this, 637, 337, 30));
  GoldMines.push(new GoldMine(this, 837, 450, 45));

  goldMinePlacementOne = this.add.image(437, 637, 'goldMineOutline').setVisible(false).setDepth(11);
  goldMinePlacementOne.alpha = 0.8;

  goldMinePlacementTwo = this.add.image(637, 337, 'goldMineOutline').setVisible(false).setDepth(11);
  goldMinePlacementTwo.alpha = 0.8;

  goldMinePlacementThree = this.add.image(837, 437, 'goldMineOutline').setVisible(false).setDepth(11);
  goldMinePlacementThree.alpha = 0.8;

  goldMineButton = this.add.image(275, 840, 'buttonGoldMine').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(258, 870, 250, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);
  this.add.image(275, 840, 'crossed').setScrollFactor(0, 0).setDepth(2).setScale(1.2);

  button1 = this.add.image(365, 840, 'button1').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(353, 870, 50, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);
  this.add.image(365, 840, 'crossed').setScrollFactor(0, 0).setDepth(2).setScale(1.2).setVisible(true);

  button2 = this.add.image(465, 840, 'button2').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(453, 870, 50, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);
  this.add.image(465, 840, 'crossed').setScrollFactor(0, 0).setDepth(2).setScale(1.2);

  button3 = this.add.image(565, 840, 'button3').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(553, 870, 75, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);
  this.add.image(565, 840, 'crossed').setScrollFactor(0, 0).setDepth(2).setScale(1.2);

  button4 = this.add.image(665, 840, 'button4').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(653, 870, 75, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);
  this.add.image(665, 840, 'crossed').setScrollFactor(0, 0).setDepth(2).setScale(1.2);

  button5 = this.add.image(765, 840, 'button5').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(748, 870, 200, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);
  this.add.image(765, 840, 'crossed').setScrollFactor(0, 0).setDepth(2).setScale(1.2);

  healSpellButton = this.add.image(865, 840, 'ButtonHeal').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(848, 870, 300, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);
  this.add.image(865, 840, 'crossed').setScrollFactor(0, 0).setDepth(2).setScale(1.2);

  arrowSpellButton = this.add.image(965, 840, 'ButtonArrow').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(948, 870, 150, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);
  this.add.image(965, 840, 'crossed').setScrollFactor(0, 0).setDepth(2).setScale(1.2);

  freezeSpellButton = this.add.image(1065, 840, 'ButtonFreeze').setInteractive().setScrollFactor(0, 0).setScale(.15);
  this.add.text(1048, 870, 150, { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0);
  this.add.image(1065, 840, 'crossed').setScrollFactor(0, 0).setDepth(2).setScale(1.2);

  cancelButton = this.add.image(1150, 840, 'cancelButton').setInteractive().setScrollFactor(0, 0).setVisible(false).setDepth(11);
  cancelText = this.add.text(1120, 870, 'Cancel', { fontFamily: 'Domine', fontSize: '16px', color: '#FFD700', stroke: '#000000', strokeThickness: 5 }).setScrollFactor(0, 0).setVisible(false).setDepth(11);


  cancelButton.on('pointerdown', cancelPlacement, this);
  this.input.on('pointerup', spawnTroop, this);
  this.input.on('pointerup', placeSpell, this);
  this.input.on('pointerup', placeGoldMine, this);

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

  textCantPlaceTwo = this.add.text(mycamera.x + 350, mycamera.y + 775, 'Can not place troop there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlaceTwo.setVisible(false);
  textCantPlaceTwo.setScrollFactor(0, 0);

  textCanPlaceSpellHere = this.add.text(mycamera.x + 400, mycamera.y + 450, 'Can place spells here!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#00FF00', stroke: '#000000', strokeThickness: 5 });
  textCanPlaceSpellHere.setVisible(false);
  textCanPlaceSpellHere.setScrollFactor(0, 0);

  textCantPlaceSpell = this.add.text(mycamera.x + 400, mycamera.y + 125, 'Can not place Spell there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlaceSpell.setVisible(false).setScrollFactor(0, 0).setDepth(3);

  textCantPlaceSpellTwo = this.add.text(mycamera.x + 350, mycamera.y + 775, 'Can not place Spell there!',
    { fontFamily: 'Domine', fontSize: '40px', color: '#FC2605', stroke: '#000000', strokeThickness: 5 });
  textCantPlaceSpellTwo.setVisible(false).setScrollFactor(0, 0).setDepth(3);

  boundryBottom = this.add.image(3000, troopBarrierBottom, 'troopBoundry');
  boundryTop = this.add.image(3000, troopBarrierTop, 'troopBoundry');
  boundryBottom.setVisible(false);
  boundryTop.setVisible(false);

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

  textFour = this.add.text(10, 770, 'This is GoldMine. You have three places to set goldmines to earn more gold.', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textFour.setScrollFactor(0, 0).setDepth(11).setVisible(false);

  var content5 = ['These are the spots where you can place goldmines.', 'Farther from your castle earns you more gold.']
  textFive = this.add.text(600, 200, content5, { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textFive.setScrollFactor(0, 0).setOrigin(0.5).setDepth(11).setVisible(false);

  textSix = this.add.text(600, 770, 'This is your troop selection. You will click on a troop to select it.', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textSix.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  var content7 = ['                                            This is troop boundries.', 'You can choose the y-axis for the troop as long as its in the boundries.']
  textSeven = this.add.text(600, 350, content7, { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textSeven.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  var content8 = ['Infantry:\n Health: 100\n Damage: 30\n Cost: 50\n Range: 10 \n Speed: 35\n\n\n', 'Archer:\n Health: 75\n Damage: 40\n Cost: 50\n Range: 150 \n Speed: 40\n\n\n'];
  imageTroop1 = this.add.image(100, 130, 'Infantry').setScale(2).setDepth(11).setVisible(false);
  imageTroop2 = this.add.image(100, 500, 'Archer').setScale(2).setDepth(11).setVisible(false);
  textEight = this.add.text(220, 20, content8, { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textEight.setScrollFactor(0, 0).setDepth(11).setVisible(false);
  var content81 = ['Tank:\n Health: 250\n Damage: 10\n Cost: 75\n Range: 25 \n Speed: 30\n\n\n', 'Wizard:\n Health: 50\n Damage: 60\n Cost: 75\n Range: 100 \n Speed: 30\n\n\n'];
  imageTroop3 = this.add.image(500, 130, 'Tank').setScale(2).setDepth(11).setVisible(false);
  imageTroop4 = this.add.image(500, 500, 'Wizard').setScale(2).setDepth(11).setVisible(false);
  textEightOne = this.add.text(600, 20, content81, { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textEightOne.setScrollFactor(0, 0).setDepth(11).setVisible(false);
  var content82 = ['Calvary:\n Health: 250\n Damage: 65\n Cost: 200\n Range: 25 \n Speed: 45\n\n\n'];
  imageTroop5 = this.add.image(900, 130, 'Calvary').setScale(1.3).setDepth(11).setVisible(false);
  textEightTwo = this.add.text(1000, 20, content82, { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textEightTwo.setScrollFactor(0, 0).setDepth(11).setVisible(false);

  textNine = this.add.text(600, 770, 'This is your spell selection. You will click on a spell to select it.', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textNine.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  var content10 = ['                                            This is spell boundries.', 'You can choose the x and y-axis for the spell as long as its in the boundries.']
  textTen = this.add.text(600, 350, content10, { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textTen.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  imageSpell1 = this.add.image(150, 190, 'ButtonHeal').setInteractive().setScrollFactor(0, 0).setScale(.15).setVisible(false).setDepth(11);
  textEleven = this.add.text(200, 150, 'Heal Spell: This spell cost 300 gold and heals your castle\nhealth by 20%.', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textEleven.setScrollFactor(0, 0).setDepth(11).setVisible(false);
  imageSpell2 = this.add.image(150, 390, 'ButtonArrow').setInteractive().setScrollFactor(0, 0).setScale(.15).setVisible(false).setDepth(11);
  textElevenOne = this.add.text(200, 350, 'Arrow Spell: This spell cost 150 gold and rains arrows on troops.\n It damages all troops in the spell range by 50 health points.', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textElevenOne.setScrollFactor(0, 0).setDepth(11).setVisible(false);
  imageSpell3 = this.add.image(150, 590, 'ButtonHeal').setInteractive().setScrollFactor(0, 0).setScale(.15).setVisible(false).setDepth(11);
  textElevenTwo = this.add.text(200, 550, 'Freeze Spell: This spell cost 150 gold and freezes troops.\n All troops in the spell range stop moving for five seconds', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textElevenTwo.setScrollFactor(0, 0).setDepth(11).setVisible(false);

  textTwelve = this.add.text(600, 650, 'This is the cancel button. If you selected a goldmine, troop, or spell that\n you do not want to place click this.', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textTwelve.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  textThirteen = this.add.text(600, 200, 'This is your castles health and your enemies castles health.', { fontFamily: 'Domine', fontSize: '40px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textThirteen.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  var content14 = ['              This is your castle.',
    'If your castles health gets to 0 you lose.',
    '            Protect it at all cost!'];
  textFourteen = this.add.text(650, 400, content14, { fontFamily: 'Domine', fontSize: '48px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textFourteen.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  var content15 = ['Use Left and Right Arrows to move the screen.',
    '                                      (Try it)'];
  textFifteen = this.add.text(600, 450, content15, { fontFamily: 'Domine', fontSize: '48px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textFifteen.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  textSixteen = this.add.text(600, 450, 'This is the minimap where you can see all troops and enemy troops at all times.', { fontFamily: 'Domine', fontSize: '30px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textSixteen.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  textSeventeen = this.add.text(600, 150, 'Now select the Infantry troop and kill the enemies.', { fontFamily: 'Domine', fontSize: '48px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textSeventeen.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  textEightteen = this.add.text(600, 450, 'Congrats! You finished the tutorial!', { fontFamily: 'Domine', fontSize: '48px', color: '#05F3FC', stroke: '#000000', strokeThickness: 5 });
  textEightteen.setScrollFactor(0, 0).setDepth(11).setVisible(false).setOrigin(0.5);

  tutorialArrows.arrows.forEach((spec) => {
    let tmp = this.add.image(spec.x, spec.y, 'arrow').setScale(.4).setDepth(11).setVisible(false);

    if (spec.flip) {
      tmp.flipX = true;
    }

    if (spec.rotateUp) {
      tmp.angle = -90;
    }

    if (spec.rotateDown) {
      tmp.angle = 90;
    }

    this.tweens.add({
      targets: tmp,
      duration: 2000,
      repeat: -1,
      yoyo: true,
      x: spec.dx,
      y: spec.dy
    });

    trackArrows.push(tmp);

  });


}

function tutorialUpdate() {

  updateCount++;
  trackMouse();

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
    trackArrows[0].setVisible(true);
    textThree.setVisible(true);
  } else if (four) {
    textFour.setVisible(true);
    trackArrows[1].setVisible(true);
    goldMineButton.setDepth(11);
  } else if (five) {
    textFive.setVisible(true);
    trackArrows[2].setVisible(true);
    trackArrows[3].setVisible(true);
    trackArrows[4].setVisible(true);
    goldMinePlacementOne.setVisible(true);
    goldMinePlacementTwo.setVisible(true);
    goldMinePlacementThree.setVisible(true);
  } else if (six) {
    button1.setDepth(11);
    button2.setDepth(11);
    button3.setDepth(11);
    button4.setDepth(11);
    button5.setDepth(11);
    textSix.setVisible(true);
    trackArrows[5].setVisible(true);
    trackArrows[6].setVisible(true);
  } else if (seven) {
    textSeven.setVisible(true);
    trackArrows[7].setVisible(true);
    trackArrows[8].setVisible(true);
    trackArrows[9].setVisible(true);
    trackArrows[10].setVisible(true);
    textCantPlace.setVisible(true).setDepth(11);
    textCantPlaceTwo.setVisible(true).setDepth(11);
    textCanPlaceHere.setVisible(true).setDepth(11);
    boundryBottom.setVisible(true).setDepth(11);
    boundryTop.setVisible(true).setDepth(11);
  } else if (eight) {
    textEight.setVisible(true);
    imageTroop1.setVisible(true);
    imageTroop2.setVisible(true);
    textEightOne.setVisible(true);
    imageTroop3.setVisible(true);
    imageTroop4.setVisible(true);
    textEightTwo.setVisible(true);
    imageTroop5.setVisible(true);
  } else if (nine) {
    textNine.setVisible(true);
    trackArrows[11].setVisible(true);
    healSpellButton.setDepth(11);
    arrowSpellButton.setDepth(11);
    freezeSpellButton.setDepth(11);
  } else if (ten) {
    textTen.setVisible(true);
    trackArrows[7].setVisible(true);
    trackArrows[8].setVisible(true);
    trackArrows[9].setVisible(true);
    trackArrows[10].setVisible(true);
    textCantPlaceSpell.setVisible(true).setDepth(11);
    textCantPlaceSpellTwo.setVisible(true).setDepth(11);
    textCanPlaceSpellHere.setVisible(true).setDepth(11);
    boundryBottom.setVisible(true).setDepth(11);
    boundryTop.setVisible(true).setDepth(11);
  } else if (eleven) {
    textEleven.setVisible(true);
    imageSpell1.setVisible(true);
    textElevenOne.setVisible(true);
    imageSpell2.setVisible(true);
    textElevenTwo.setVisible(true);
    imageSpell3.setVisible(true);
  } else if (twelve) {
    textTwelve.setVisible(true);
    trackArrows[12].setVisible(true);
    cancelButton.setVisible(true);
    cancelText.setVisible(true);
  } else if (thirteen) {
    textThirteen.setVisible(true);
    trackArrows[13].setVisible(true);
    trackArrows[14].setVisible(true);
    tutorialPlayerCastle.bar.setDepth(11);
    tutorialEnemyCastle.bar.setDepth(11);
  } else if (fourteen) {
    tutorialPlayerCastle.setDepth(11);
    tutorialEnemyCastle.setDepth(11);
    textFourteen.setVisible(true);
    trackArrows[15].setVisible(true);
    trackArrows[16].setVisible(true);
  } else if (fifteen) {
    textFifteen.setVisible(true);
    trackArrows[17].setVisible(true);
    trackArrows[18].setVisible(true);
    trackArrows[19].setVisible(true);
    trackArrows[20].setVisible(true);
  } else if (sixteen) {
    textSixteen.setVisible(true);
    miniMap.map.setDepth(11);
    trackArrows[21].setVisible(true);
  } else if (seventeen) {
    button1.setDepth(11);
    textSeventeen.setVisible(true);
    if (spawnEnemies) {
      enemyTroops.push(new EnemyInfantry(this, 1000, 600).setDepth(1));
      enemyTroops.push(new EnemyInfantry(this, 1000, 450).setDepth(1));
      enemyTroops.push(new EnemyInfantry(this, 1000, 300).setDepth(1));
      spawnEnemies = false;
    }
  } else if (eightteen) {
    textSeventeen.setVisible(false);
    blackscreen.setVisible(true);
    textEightteen.setVisible(true);
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

    if (spec.checkCastleRange(tutorialEnemyCastle)) {
      spec.setVelocity(0);
      spec.attack(tutorialEnemyCastle);
      foundMatch = true;
    }

    if (!foundMatch) {
      spec.setVelocityX(spec.speed);
    }

  });

  enemyTroops.forEach((spec) => {

    if (!spec.alive && spec.alive != null) {
      enemiesDead++;
      if (enemiesDead === 3) {
        seventeen = false;
        eightteen = true;
        enemiesDead = null;
      }
      return;
    }

    enemiesDead = 0;

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

    if (spec.checkCastleRange(tutorialPlayerCastle)) {
      spec.setVelocity(0);
      spec.attack(tutorialPlayerCastle);
      foundMatch = true;
    }

    if (!foundMatch) {
      spec.setVelocityX(spec.speed);
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
    trackArrows[0].setVisible(false);
  } else if (four) {
    four = false;
    five = true;
    textFour.setVisible(false);
    trackArrows[1].setVisible(false);
    goldMineButton.setDepth(1);
  } else if (five) {
    five = false;
    six = true;
    textFive.setVisible(false);
    trackArrows[2].setVisible(false);
    trackArrows[3].setVisible(false);
    trackArrows[4].setVisible(false);
    goldMinePlacementOne.setVisible(false);
    goldMinePlacementTwo.setVisible(false);
    goldMinePlacementThree.setVisible(false);
  } else if (six) {
    six = false;
    seven = true;
    button1.setDepth(1);
    button2.setDepth(1);
    button3.setDepth(1);
    button4.setDepth(1);
    button5.setDepth(1);
    textSix.setVisible(false);
    trackArrows[5].setVisible(false);
    trackArrows[6].setVisible(false);
  } else if (seven) {
    seven = false;
    eight = true;
    textCantPlace.setVisible(false).setDepth(2);
    textCantPlaceTwo.setVisible(false);
    textCanPlaceHere.setVisible(false);
    boundryBottom.setVisible(false).setDepth(2);
    boundryTop.setVisible(false).setDepth(2);
    textSeven.setVisible(false);
    trackArrows[7].setVisible(false);
    trackArrows[8].setVisible(false);
    trackArrows[9].setVisible(false);
    trackArrows[10].setVisible(false);
  } else if (eight) {
    eight = false;
    nine = true;
    textEight.setVisible(false)
    imageTroop1.setVisible(false);
    imageTroop2.setVisible(false);
    textEightOne.setVisible(false);
    imageTroop3.setVisible(false);
    imageTroop4.setVisible(false);
    textEightTwo.setVisible(false);
    imageTroop5.setVisible(false);
  } else if (nine) {
    nine = false;
    ten = true;
    textNine.setVisible(false);
    trackArrows[11].setVisible(false);
    healSpellButton.setDepth(1);
    arrowSpellButton.setDepth(1);
    freezeSpellButton.setDepth(1);
  } else if (ten) {
    ten = false;
    eleven = true;
    textTen.setVisible(false);
    trackArrows[7].setVisible(false);
    trackArrows[8].setVisible(false);
    trackArrows[9].setVisible(false);
    trackArrows[10].setVisible(false);
    textCantPlaceSpell.setVisible(false)
    textCantPlaceSpellTwo.setVisible(false)
    textCanPlaceSpellHere.setVisible(false)
    boundryBottom.setVisible(false).setDepth(2);
    boundryTop.setVisible(false).setDepth(2);
  } else if (eleven) {
    eleven = false;
    twelve = true;
    textEleven.setVisible(false);
    imageSpell1.setVisible(false);
    textElevenOne.setVisible(false);
    imageSpell2.setVisible(false);
    textElevenTwo.setVisible(false);
    imageSpell3.setVisible(false);
  } else if (twelve) {
    twelve = false;
    thirteen = true;
    textTwelve.setVisible(false);
    trackArrows[12].setVisible(false);
    cancelButton.setVisible(false);
    cancelText.setVisible(false);
  } else if (thirteen) {
    thirteen = false;
    fourteen = true;
    tutorialPlayerCastle.bar.setDepth(3);
    tutorialEnemyCastle.bar.setDepth(3);
    textThirteen.setVisible(false);
    trackArrows[13].setVisible(false);
    trackArrows[14].setVisible(false);
  } else if (fourteen) {
    fourteen = false;
    fifteen = true;
    tutorialPlayerCastle.setDepth(3);
    tutorialEnemyCastle.setDepth(3);
    textFourteen.setVisible(false);
    trackArrows[15].setVisible(false);
    trackArrows[16].setVisible(false);
  } else if (fifteen) {
    fifteen = false;
    sixteen = true;
    textFifteen.setVisible(false);
    trackArrows[17].setVisible(false);
    trackArrows[18].setVisible(false);
    trackArrows[19].setVisible(false);
    trackArrows[20].setVisible(false);
  } else if (sixteen) {
    sixteen = false;
    seventeen = true;
    textSixteen.setVisible(false);
    miniMap.map.setDepth(0);
    trackArrows[21].setVisible(false);
    blackscreen.setVisible(false);
  } else if (seventeen) {
    seventeen = false;
    textSeventeen.setVisible(false);
  } else if (eightteen) {
    Troops = [];
    enemyTroops = [];
    GoldMines = [];
    spawnEnemies = true;
    eightteen = false;
    one = true;
    this.scene.start('titleScene');
  }
}