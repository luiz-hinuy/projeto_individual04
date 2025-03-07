export default class Fase extends Phaser.Scene {
  constructor() {
    super("Fase");
  }

  preload() {

  }

  create() {

    this.dead = false // flag que indica estado de vida do player

    // Adiciona plano de fundo na fase
    this.add.image(700 / 2, 850 / 2, "bg").setScale(1.5);

    // Adiciona jogador
    this.player = this.physics.add
      .sprite(700 / 2, 850 / 2, "player_idle")
      .setScale(2);
    this.player.body.setSize(15, 31, true);
    // Adiciona animação do jogador
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player_idle", {
        start: 0,
        end: 3,
      }), // Animação de Idle
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player_run", {
        start: 0,
        end: 15,
      }), // Animação de corrida
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "hit",
      frames: this.anims.generateFrameNumbers("player_hit", {
        start: 0,
        end: 3,
      }), // Animação de hit
      frameRate: 10,
      repeat: 0, // Executa apenas uma vez
    });

    this.anims.create({
      key: "death",
      frames: this.anims.generateFrameNumbers("player_death", {
        start: 0,
        end: 3,
      }), // Animação de morte
      frameRate: 10,
      repeat: 0, // Executa apenas uma vez
    });

    this.physics.world.setBounds(0, 0, 650, 800);

    this.player.setCollideWorldBounds(true);
    this.player.anims.play("idle", true);

    // Adiciona plataformas
    this.platform = this.physics.add
      .staticImage(330, 650, "plataforma")
      .setScale(2);
    this.physics.add.collider(this.player, this.platform);
    this.platform.body.setSize(60, 10, true);

    this.platform2 = this.physics.add
      .staticImage(392, 650, "plataforma")
      .setScale(2);
    this.physics.add.collider(this.player, this.platform2);
    this.platform2.body.setSize(60, 10, true);

    this.platform3 = this.physics.add
      .staticImage(454, 650, "plataforma")
      .setScale(2);
    this.physics.add.collider(this.player, this.platform3);
    this.platform3.body.setSize(60, 10, true);

    this.platform4 = this.physics.add
      .staticImage(268, 650, "plataforma")
      .setScale(2);
    this.physics.add.collider(this.player, this.platform4);
    this.platform4.body.setSize(60, 10, true);

    this.platform5 = this.physics.add
      .staticImage(206, 650, "plataforma")
      .setScale(2);
    this.physics.add.collider(this.player, this.platform5);
    this.platform5.body.setSize(60, 10, true);

    this.platform6 = this.physics.add
      .staticImage(144, 650, "plataforma")
      .setScale(2);
    this.physics.add.collider(this.player, this.platform6);
    this.platform6.body.setSize(60, 10, true);

    this.platform7 = this.physics.add
      .staticImage(516, 650, "plataforma")
      .setScale(2);
    this.physics.add.collider(this.player, this.platform7);
    this.platform7.body.setSize(60, 10, true);

    // Cria comandos de teclado
    this.teclado = this.input.keyboard.createCursorKeys();

    // Cria grupo de flechas
    this.flechas = this.physics.add.group();

    // Cria grupo de corações na interface
    this.vidasUI = this.add.group();

    this.vidas = 3; // Inicializa número de vidas

    // Adiciona 3 corações no canto superior esquerdo
    for (let i = 0; i < this.vidas; i++) {
      this.vidasUI
        .create(30 + i * 40, 30, "coracao")
        .setScale(5)
        .setOrigin(0, 0);
    }

    // Cria evento que gera flechas a cada 1,5 segundos
    this.time.addEvent({
      delay: 350,
      callback: () => {
        let xAleatorio = Phaser.Math.Between(50, 600); // A flecha cai de uma coordenada X aleatória do topo da tela
        let flecha = this.flechas.create(xAleatorio, 0, "flecha");
        flecha.setScale(1.2);
        flecha.setVelocityY(200);
        flecha.body.setAllowGravity(false); 
      },
      loop: true,
    });

    // Detecta colisão entre o jogador e as flechas
    this.physics.add.overlap(this.player, this.flechas, (player, flecha) => {
      flecha.destroy(); // Remove a flecha que colidiu
      this.perderVida(); // Reduz uma vida do jogador
    });
  }

  update() {
    // Se o player estiver morto, impede o movimento
    if(this.dead == true){
        this.player.setVelocity(0, 0)
        return
    }


    // Movimento para a esquerda
    if (this.teclado.left.isDown) {
      this.player.setVelocityX(-150);
      this.player.anims.play("run", true);
      this.player.setFlip(true);
    }

    // Movimento para a direita
    else if (this.teclado.right.isDown) {
      this.player.setVelocityX(150);
      this.player.anims.play("run", true);
      this.player.setFlip(false);
    } else {
      this.player.setVelocityX(0);
    }
  }

  perderVida() {
    if (this.vidas > 0) {
        this.vidas -= 1; // Reduz uma vida
        this.vidasUI.getChildren()[this.vidas].destroy(); // Remove um coração da interface

        // Reproduz animação de hit se ainda houver vidas
        // this.player.setTint("hit", true);
        console.log(this.player)
        // Após a animação de hit, volta para idle se ainda tiver vidas
        this.player.once("animationcomplete", () => {
            if (this.vidas > 0) {
                this.player.anims.play("idle", true); // Volta para idle se ainda tiver vidas
            }
        });
    }

    // Executa animação de morte
    if (this.vidas == 0) {
        this.dead = true 
        this.player.anims.play("death", true); // Toca a animação de morte

        this.player.once("animationcomplete", () => {
            this.scene.start("Menu"); // Volta para a tela inicial após a animação acabar
        });
    }
  }
}
