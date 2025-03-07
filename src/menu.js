// Classe de cena a ser exportada 
 export default class Menu extends Phaser.Scene{
    constructor(){
        // Configura a chave da classe
        super('Menu');
    }

    preload(){
        // Carrega assets
        this.load.image('bg', './assets/background1.png');
        this.load.image('plataforma', './assets/plataforma_grama.png');
        this.load.image('botao', './assets/botao_start.png');
        this.load.image('moeda', './assets/moeda.png');
        this.load.image('coracao', './assets/coracao.png');
        this.load.image('flecha', './assets/flecha.png')
        // Spritesheets de corrida, idle, hit, e morte
        this.load.spritesheet('player_idle', './assets/knight_idle.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('player_run', './assets/knight_run.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('player_hit', './assets/knight_hit.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('player_death', './assets/knigt_death.png', { frameWidth: 32, frameHeight: 32 });

    }

    create(){
        // Adiciona imagem de fundo do menu
        this.bg = this.add.image(this.scale.width/2, this.scale.height/2, 'bg').setScale(1.5);
        // Adiciona imagem do botão de start
        const botao = this.add.image(this.scale.width/2, this.scale.height/2, 'botao').setInteractive({cursor: "pointer"}).setScale(2);

        // Quando o botão de start é clicado, direciona para a cena jogável
        botao.on("pointerdown", () => {
            this.scene.start('Fase');
            this.scene.stop('Menu');
        });

        // Lista de nomes para agradecimento
        const nomes = ["Kizzy", "Guilherme", "Egon", "Serginho", "Ana", "Henrique", "Bruna"];

        // Itera na lista de nomes
        let yPos = 50; // Posição inicial na tela para o texto
        for (let i = 0; i < nomes.length; i++) {
            this.add.text(this.scale.width / 2, yPos, `Obrigado, ${nomes[i]}!`, {
                font: '24px Arial',
                fill: '#ffffff',
                align: 'center'
            }).setOrigin(0.5);

            yPos += 30;
        };
    }
};

