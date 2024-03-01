export default class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.spritesheet("player_run", "assets/player/player_run.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("player_jump", "assets/player/player_jump.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("player_idle", "assets/player/player_idle.png", { frameWidth: 32, frameHeight: 32 })
    this.load.image("bg", 'assets/bg.png')
    this.load.image("floor", 'assets/floor.png')
  }

  create() {
    this.add.text(100, 100, 'Press any key to start', { fontSize: '24px', fill: '#fff' });
    // Quando pressiona qlq tecla starta o game
    this.input.keyboard.once('keydown', this.startGame, this);
  }

  startGame() {
    console.log('Start Game');
    // Transiciona para level1
    this.scene.start("level1")
  }
}
