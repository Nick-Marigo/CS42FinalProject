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

  this.load.image('map', 'assets/Testing/testmap.png');
  this.load.image('infantry', 'assets/Testing/testTroops/testTroopInfantry.png');
  this.load.image('archer', 'assets/Testing/testTroops/testTroopArcher.png');
  this.load.image('tank', 'assets/Testing/testTroops/testTroopTank.png');
  this.load.image('wizard', 'assets/Testing/testTroops/testTroopWizard.png');
  this.load.image('calvary', 'assets/Testing/testTroops/testTroopCalvary.png');
  this.load.image('textBackground', 'assets/Testing/Title/textBackground.png');

  this.load.audio('backgroundMusic', 'Audio/Music/LastManStanding.mp3');

}

function titleCreate() {

  this.add.image(0, 500, 'map').setDepth(1);
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
  tutorialText.on('pointerdown', function() { this.scene.start('tutorialScene') }, this);

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
      titletroops.push(new Infantry(this, -325, Phaser.Math.Between(25, 875)));
      titlenemies.push(new EnemyInfantry(this, 1525, Phaser.Math.Between(25, 875)));
    }

    if (temp === 2) {
      titletroops.push(new Archer(this, -325, Phaser.Math.Between(25, 875)));
      titlenemies.push(new EnemyArcher(this, 1525, Phaser.Math.Between(25, 875)));
    }

    if (temp === 3) {
      titletroops.push(new Tank(this, -325, Phaser.Math.Between(25, 875)));
      titlenemies.push(new EnemyTank(this, 1525, Phaser.Math.Between(25, 875)));
    }

    if (temp === 4) {
      titletroops.push(new Wizard(this, -325, Phaser.Math.Between(25, 875)));
      titlenemies.push(new EnemyWizard(this, 1525, Phaser.Math.Between(25, 875)));
    }

    if (temp === 5) {
      titletroops.push(new Calvary(this, -325, Phaser.Math.Between(25, 875)));
      titlenemies.push(new EnemyCalvary(this, 1525, Phaser.Math.Between(25, 875)));
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
  this.scene.start('gamePlayScene');
  //this.scene.start('stageOne');
}

function showMenu() {

  if (clicks >= 1) {
    showingMenu = true;
    clicktostart.setVisible(false);
    menuBackground.setDepth(3);
    title.setVisible(true).setDepth(4);
    startText.setVisible(true).setDepth(4);
    levelSelectionText.setVisible(true).setDepth(4);
    tutorialText.setVisible(true).setDepth(4);
  } else {
    clicks++;
  }
}