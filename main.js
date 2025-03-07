// Importa classes 
import { Menu } from "./scenes/menu.js";
import { Fase } from "./scenes/fase.js";

// Define área da tela do jogo
const larguraJogo = 700
const alturaJogo = 850

// Configurações das cenas
const config = {
    type: Phaser.AUTO,
    width: larguraJogo,
    height: alturaJogo,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },

    scene: [Menu, Fase] // Adicione as cenas ao jogo
};

// Intancia o jogo
export default new Phaser.Game(config);
