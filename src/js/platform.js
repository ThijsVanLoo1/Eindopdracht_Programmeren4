import { Actor, CollisionType, Color } from "excalibur";
import { Player } from "./player";

export class Platform extends Actor {
    constructor(x, y, width, height) {
        super({
            x, y, width, height,
            color: Color.Brown,
            collisionType: CollisionType.Fixed
        })
    }

    onInitialize(engine) {
        super.onInitialize(engine)
        this.events.on('precollision', (e) => this.moveThrough(e));   
    }

    moveThrough(e) {
        const actor = e.other.owner;
        const playerBottom = actor.pos.y + actor.height / 2;
        const platformTop = this.pos.y - this.height / 2;
        
        if(actor instanceof Player) {
            if (actor.vel.y <= 0) {
                e.contact.cancel();
            }
        }
    }
}