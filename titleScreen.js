let titleScene = {
  key: 'titleScene',
  active: true,
  preload: titlePreload,
  create: titleCreate,
  update: titleUpdate
};

//********************************************************************************************************************
//TITLE SCENE
//********************************************************************************************************************

let menuBackground;

var title, startText, levelSelectionText, tutorialText;

let clicktostart;
let textBlinking = true;

let showingMenu = false;
let clicks = 0;

function titlePreload() {

  this.load.image('map', 'finalAssets/Misc/Map.png');

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

  this.load.image('textBackground', 'finalAssets/Misc/textBackground.png');

  this.load.audio('backgroundMusic', 'Audio/Music/LastManStanding.mp3');
  this.load.audio('PopOne', 'Audio/SoundEffects/pop1.ogg');
  this.load.audio('PopTwo', 'Audio/SoundEffects/pop1.ogg');
  this.load.audio('PopThree', 'Audio/SoundEffects/pop1.ogg');
  this.load.audio('meleeAttack', 'Audio/SoundEffects/swordsound.wav');

}

function titleCreate() {

  popOne = this.sound.add('PopOne');
  popTwo = this.sound.add('PopTwo');
  popThree = this.sound.add('PopThree');
  meleeAttack = this.sound.add('meleeAttack');

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
      frameRate: 1,
      repeat: 1
    });

    this.anims.create({
      key: troopSheet[count] + 'death',
      frames: this.anims.generateFrameNumbers(troopSheet[count], { start: 7, end: 7 }),
      frameRate: 1,
      repeat: 2
    });

  }

  this.add.image(0, 450, 'map').setDepth(1);
  menuBackground = this.add.image(600, 450, 'textBackground').setDepth(3).setScrollFactor(0, 0).setDepth(0);

  music = this.sound.add('backgroundMusic');
  music.play({ volume: .2, loop: true });

  title = this.add.text(600, 250, 'For Warriors Peace', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' });
  title.setOrigin(0.5).setScrollFactor(0, 0).setDepth(5).setVisible(false);

  startText = this.add.text(600, 450, 'Start Game!', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' });
  startText.setOrigin(0.5).setInteractive({ useHandCursor: true }).setScrollFactor(0, 0).setDepth(5).setVisible(false);
  startText.on('pointerdown', titleTrans, this);

  levelSelectionText = this.add.text(600, 500, 'Levels', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' });
  levelSelectionText.setInteractive({ useHandCursor: true }).setScrollFactor(0, 0).setDepth(5).setOrigin(0.5).setVisible(false);
  levelSelectionText.on('pointerdown', function() { this.scene.start('levelSelection') }, this);

  tutorialText = this.add.text(600, 715, 'How to Play', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' });
  tutorialText.setInteractive({ useHandCursor: true }).setScrollFactor(0, 0).setDepth(5).setOrigin(0.5).setVisible(false);
  tutorialText.on('pointerdown', function() { titletroops = []; titlenemies = []; this.scene.start('tutorialScene'); }, this);

  clicktostart = this.add.text(600, 750, 'Click to Start!', { fontFamily: 'Domine', fontSize: '48px', color: '#153CD4' });
  clicktostart.setScrollFactor(0, 0).setDepth(3).setOrigin(0.5);

  this.input.on('pointerdown', showMenu, this);

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
    let temp = Phaser.Math.Between(1, 5);

    if (temp === 1) {
      titletroops.push(new Infantry(this, -325, Phaser.Math.Between(250, 650)));
      titlenemies.push(new EnemyInfantry(this, 1525, Phaser.Math.Between(250, 650)));
    }

    if (temp === 2) {
      titletroops.push(new Archer(this, -325, Phaser.Math.Between(250, 650)));
      titlenemies.push(new EnemyArcher(this, 1525, Phaser.Math.Between(250, 650)));
    }

    if (temp === 3) {
      titletroops.push(new Tank(this, -325, Phaser.Math.Between(250, 650)));
      titlenemies.push(new EnemyTank(this, 1525, Phaser.Math.Between(250, 650)));
    }

    if (temp === 4) {
      titletroops.push(new Wizard(this, -325, Phaser.Math.Between(250, 650)));
      titlenemies.push(new EnemyWizard(this, 1525, Phaser.Math.Between(250, 650)));
    }

    if (temp === 5) {
      titletroops.push(new Calvary(this, -325, Phaser.Math.Between(250, 650)));
      titlenemies.push(new EnemyCalvary(this, 1525, Phaser.Math.Between(250, 650)));
    }

    updateCount = 1;
  }

  if (!showingMenu) {
    if (updateCount % 30 === 0) {
      if (textBlinking) {
        clicktostart.setVisible(false);
        textBlinking = false;
      } else {
        textBlinking = true;
        clicktostart.setVisible(true);
      }
    }
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
  music.pause();
  titletroops = [];
  titlenemies = [];
  this.scene.start('gamePlayScene');

}

function showMenu() {

  if (clicks >= 1) {
    showingMenu = true;
    clicktostart.setVisible(false);
    menuBackground.setDepth(3);
    title.setVisible(true).setDepth(4);
    startText.setVisible(true).setDepth(4);
    tutorialText.setVisible(true).setDepth(4);
  } else {
    clicks++;
  }
}