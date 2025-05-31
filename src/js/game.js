import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, Color, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Player } from './player.js'
import { UI } from './ui.js'
import { Ground } from './ground.js'
import { Gap } from './gap.js'
import { Platform } from './platform.js'
import { Saw } from './saw.js'
import { Strawberry } from './strawberry.js'
import { Background } from './background.js'
import { MovingSaw } from './movingSaw.js'

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
         this.physics.gravity = new Vector(0, 2500);
         this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        const background = new Background();
        this.add(background);

        const player = new Player();
        this.add(player);

        const ground = new Ground(350, 720, 700, 100);
        this.add(ground);
        const ground2 = new Ground(1100, 720, 400, 100);
        this.add(ground2);
        const ground3 = new Ground(575, 400, 700, 50);
        this.add(ground3);
        const wall = new Ground(0, 320, 50, 700);
        this.add(wall);
        const wall2 = new Ground(900, 600, 50, 350);
        this.add(wall2);
        const wall3 = new Ground(275, 300, 100, 200);
        this.add(wall3);
        const wall4 = new Ground(1280, 400, 100, 400);
        this.add(wall4);

        const platform = new Platform(65, 575, 75, 10);
        this.add(platform);
        const platform2 = new Platform(175, 475, 75, 10);
        this.add(platform2);
        const platform3 = new Platform(65, 375, 75, 10);
        this.add(platform3);
        const platform4 = new Platform(175, 275, 75, 10);
        this.add(platform4);
        const platform5 = new Platform(1000, 300, 75, 10);
        this.add(platform5);
        const platform6 = new Platform(1150, 225, 75, 10);
        this.add(platform6);

        const gap = new Gap(800, 730, 200, 10);
        this.add(gap);

        this.ui = new UI(player);
        this.add(this.ui);

        const sawBlade = new Saw(320, 200);
        this.add(sawBlade);
        const sawBlade2 = new Saw(550, 650);
        this.add(sawBlade2);
        //ROW OF SAWBLADES
        for(let i = 70; i <= 350; i+=70) {
            let saw = new Saw(900 + i, 650);
            this.add(saw);
        }

        const movingSawBlade2 = new MovingSaw(25, 550, -1);
        this.add(movingSawBlade2);
        const movingSawBlade3 = new MovingSaw(225, 345, -1);
        this.add(movingSawBlade3);
        const movingSawBlade4 = new MovingSaw(800, 380, 1);
        this.add(movingSawBlade4);

        const strawberry = new Strawberry(800, 500);
        this.add(strawberry);
        const strawberry2 = new Strawberry(75, 150);
        this.add(strawberry2);
        const strawberry3 = new Strawberry(850, 100);
        this.add(strawberry3);

        const flag = new Actor();
        flag.scale = new Vector(0.05, 0.05);
        flag.graphics.use(Resources.Flag.toSprite());
        flag.graphics.flipHorizontal = true;
        flag.pos = new Vector(1220, 170);
        this.add(flag);

        //TEKEN LEVENS
        this.currentScene.onPostDraw = (ctx) => {
            for(let i = 1; i <= player.lives; i++) {
        ctx.drawImage(
        Resources.Heart.image,   //FF GEHEUGENSTEUNTJE:
        390, 430, 450, 370,      // bron-x, bron-y, bron-breedte, bron-hoogte
        i * 50, 50, 48, 48        // pos-x, pos-y, image-breedte, image-hoogte
        );      
        } 
    };
    }
}

new Game()