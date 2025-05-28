import { Actor, Color } from "excalibur";
import { Player } from "./player";

export class Gap extends Actor {
    constructor(width, height, x, y) {
        super({
            width, height, x, y,
            color: Color.Red
        });
    }
}