import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { UI } from './ui.js'
import { Ground } from './ground.js'
import { Gap } from './gap.js'

export class Game extends Engine {

    ui;

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic
            }
         })
         this.physics.gravity = new Vector(0, 2000);
         this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

        const player = new Player();
        this.add(player);

        const ground = new Ground(350, 720, 700, 100);
        this.add(ground);
        const ground2 = new Ground(1100, 720, 400, 100);
        this.add(ground2);

        const gap = new Gap(200, 10, 800, 770);
        this.add(gap);

        this.ui = new UI(player);
        this.add(this.ui);
    }
}

new Game()