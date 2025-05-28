import { Actor, CollisionType, Color } from "excalibur";
import { Player } from "./player";

export class Gap extends Actor {
    constructor(x, y, width, height) {
        super({
            x, y, width, height,
            color: Color.Red
        });
    }

    onInitialize(engine) {
        this.body.collisionType = CollisionType.Fixed;
    }
}