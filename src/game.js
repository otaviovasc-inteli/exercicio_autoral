import Level1 from './scenes/Level1.js'
import Preload from './scenes/Preload.js'

// Define escala do jogo
const larguraJogo = 1280;
const alturaJogo = 720;

const SHARED_CONFIG = {
  width: larguraJogo,
  height: alturaJogo
}

// Mapeia as scenes
const Scenes = [Preload, Level1];
// Cria o objeto de cena com a config basica das cenas
const createScenes = Scene => new Scene(SHARED_CONFIG);
const initScene = () => Scenes.map(createScenes)

// Cria a estrutura config que condensa as configuracoes do jogo.
const config = {
    type: Phaser.AUTO,
    width: larguraJogo,
    height: alturaJogo,
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 1200 },
          debug: false,
      }
    },
    scene: initScene()
};

const game = new Phaser.Game(config);
