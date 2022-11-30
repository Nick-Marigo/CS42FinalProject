/*let levelSelection = {
  key: 'levelSelection',
  active: false,
  preload: levelPreload,
  create: levelCreate,
  update: levelUpdate
}

function levelPreload() {
  this.load.image('background', 'assets/LevelSelect/background.png');
  this.load.image('buttonLevels', 'assets/LevelSelect/buttons.png');
}

function levelCreate() {
  this.add.image(0, 0, 'background').setOrigin(0, 0);
  let levelOne = this.add.image(100, 100, 'buttonLevels').setInteractive();
  levelOne.on('pointerdown', loadLevel, {param1: 1});
  
}

function levelUpdate() {
  
}

function loadLevel() {
  //if(this.param1 === 1) {
    this.scene.start('stageOne');
  //}
}*/