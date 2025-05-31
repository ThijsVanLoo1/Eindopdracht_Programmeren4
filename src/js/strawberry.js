import { Actor, Animation, CollisionType, range, SpriteSheet, Vector } from "excalibur";
import { Resources } from "./resources";
import { Player } from "./player";

export class Strawberry extends Actor {
    constructor(x, y) {
        super({
            x, y,
            width: 20,
            height: 20
        })
        this.scale = new Vector(2, 2);
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Passive;

        const strawberryAnimation = SpriteSheet.fromImageSource({
            image: Resources.Strawberry,
            grid: { rows: 1, columns: 17, spriteWidth: 32, spriteHeight: 32 }
        })

        const animation = Animation.fromSpriteSheet(strawberryAnimation, range(0, 16), 20);
        this.graphics.add("animation", animation);
        this.graphics.use(animation);
    }
}