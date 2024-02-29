export default class Level1 extends Phaser.Scene {
  constructor() {
    super("level1");
  }

  create () {
    // cria um grupo de objetos com fisica
    const floorGroup = this.physics.add.staticGroup();

    // Cria grupo das plataformas que se movem
    this.platformGroup = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    // Propriedades da plataforma
    this.spawnX = 1280;
    this.platformSpeed = -150;

    // Intervalo que a plataforma vai spawnar
    this.spawnTimer = this.time.addEvent({
      delay: 2000,
      callback: this.spawnPlatform,
      callbackScope: this,
      loop: true,
    });

    // Adiociona imagem do background
    this.add.image(0, -200, "bg").setScale(1.12).setOrigin(0, 0);
    // Cria o player
    this.player = this.physics.add.sprite(100, 400, 'player_idle').setScale(3)

    // Chao
    for(var i = 0; i < 30; i++)
    {
      // cria o floor e adiciona ao grupo
      floorGroup.create(50 * i, 700, "floor");
    }

    // Cria animacoes
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player_run', { start: 0, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'jump',
      frames: [{ key: 'player_jump', frame: 0 }],
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 10 }),
      frameRate: 5,
      repeat: -1
    });

    // Adiciona colisao do player ao floorGroup
    this.physics.add.collider(this.player, floorGroup);
    // Chama funcao stickyPlatform quando colidir com o grupo das plataformas q se movimentam
    this.physics.add.collider(this.player, this.platformGroup, this.stickyPlatform, null, this);

    // inicia cursores
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update () {
    // Velocidade da plataforma
    this.platformGroup.setVelocityX(this.platformSpeed);
    // Randomiza o Y spawn da plataforma
    this.spawnY = Phaser.Math.RND.between(350, 650);

    // Garante que as plataformas serao destruidas assim nao sobrecarregando o game com entidades infinitas
    this.platformGroup.getChildren().forEach((platform) => {
      if (platform.x < -20) {
        platform.destroy();
      }
    });

    // Movimenta o player com as setas do teclado e toca animacoes
    if (this.cursors.left.isDown) {
      this.player.setFlip(true, false);
      this.player.play('run', true)
      this.player.setVelocityX(-400);
    } else if (this.cursors.right.isDown) {
      this.player.setFlip(false, false);
      this.player.play('run', true)
      this.player.setVelocityX(400);
    } else {
      this.player.play('idle', true)
      this.player.setVelocityX(0);
    }

    // Logica do pulo
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.play('jump', true)
      this.player.setVelocityY(-800);
    }
  }
  spawnPlatform() {
    // Spawna plataforma na localizacao spawnXY
    const platform = this.platformGroup.create(this.spawnX, this.spawnY, "floor");
  }
  // Seta a velocidade do player a mesma da plataforma para causar efeito de "grudento"
  stickyPlatform () {
    this.player.setVelocityX(this.platformSpeed * 1)
  }
}
