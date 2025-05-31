import { Actor, Animation, CollisionType, range, SpriteSheet, Vector } from "excalibur";
import { Resources } from "./resources";

export class Saw extends Actor {
    constructor(x, y) {
        super({
            x, y,
            radius: 20
        })
        this.scale = new Vector(2, 2);
    }

    onInitialize() {
        this.body.collisionType = CollisionType.Fixed;

        const sawAnimation = SpriteSheet.fromImageSource({
            image: Resources.SawOn,
            grid: { rows: 1, columns: 8, spriteWidth: 38, spriteHeight: 38 }
        })

        const animation = Animation.fromSpriteSheet(sawAnimation, range(0, 7), 80);
        this.graphics.add("animation", animation);
        this.graphics.use(animation);
    }
}