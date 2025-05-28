import { Actor, Vector } from "excalibur";
import { Resources } from "./resources";

export class Background extends Actor {
    constructor(engine) {
        super({
            x: 640,
            y: 360,
            width: 1280,
            height: 720,
            z: -1
        })
        this.scale = new Vector(1.33, 1.33);
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Background.toSprite());
    }
}