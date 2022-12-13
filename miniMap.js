class MiniMap {
  constructor(scene, x, y) {

    this.map = new Phaser.GameObjects.Graphics(scene);

    this.x = x;
    this.y = y;

    this.map.setScrollFactor(0, 0);
    this.draw();

    scene.add.existing(this.map);

  }

  draw() {
    this.map.clear();

    this.map.fillStyle(0x000000);
    let test = this.map.fillRect(this.x, this.y, 400, 100);
    test.alpha = .8;

  }

}







class miniMapTroops {
  constructor(scene, x, y, isEnemy) {

    this.troop = new Phaser.GameObjects.Graphics(scene);

    this.x = x;
    this.y = (y - 200) / 5;
    this.isEnemy = isEnemy;

    this.troop.setScrollFactor(0, 0);

    this.addTroop(this.isEnemy);

    scene.add.existing(this.troop);
  }

  addTroop(isEnemy) {
    this.troop.clear();

    if (isEnemy) {
      this.troop.fillStyle(0xff0000);
      this.troop.fillRect(this.x - 3300, this.y, 10, 10);
    } else {
      this.troop.fillStyle(0x00ff00);
      this.troop.fillRect(this.x + 400, this.y, 10, 10);
    }

  }

  updateTroop(updateX, isEnemy) {

    this.troop.clear();

    if (isEnemy) {
      updateX = (updateX / 10) + 400;
      this.troop.fillStyle(0xff0000);
      this.troop.fillRect(updateX - 10, this.y, 10, 10);
    } else {
      updateX = (updateX / 10) + 400;
      this.troop.fillStyle(0x00ff00);
      this.troop.fillRect(updateX, this.y, 10, 10);
    }

  }

  deleteTroop() {
    this.troop.clear();
  }

}