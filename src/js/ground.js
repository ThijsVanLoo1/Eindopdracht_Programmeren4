import { Actor, CollisionType, Color } from "excalibur";
import { Player } from "./player";

export class Ground extends Actor {
    constructor(x, y, width, height) {
        super({
            x, y, width, height,
            color: Color.Black,
            collisionType: CollisionType.Fixed
        })
    }

    onInitialize(engine) {
    this.body.friction = 0;
    }
}