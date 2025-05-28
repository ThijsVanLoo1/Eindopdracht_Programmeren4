import { Actor, CollisionType, Color } from "excalibur";

export class Ground extends Actor {
    constructor(xpos, ypos, width, height) {
        super({
            x: xpos,
            y: ypos,
            width: width,
            height: height,
            color: Color.Black,
            collisionType: CollisionType.Fixed
        })
    }

    onInitialize(engine) {
        this.body.friction = 0;
    }
}