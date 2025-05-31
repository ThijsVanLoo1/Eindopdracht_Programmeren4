import { Saw } from "./saw";

export class MovingSaw extends Saw {
    moveDirection = 1;
    #moveHorizontal = false;
    #moveVertical = false;
    #speed = 200;
    #minY;
    #maxY;
    #minX;
    #maxX;

    constructor(x, y, direction) {
        super(x, y)
        this.#minY = y - 90;
        this.#maxY = y + 90;
        this.#minX = x - 90;
        this.#maxX = x + 90;
        if(direction === 1) {
            this.#moveHorizontal = true;
        } else if(direction === -1) {
            this.#moveVertical = true;
        }
    }

    onPreUpdate(engine, delta) {
        if(this.#moveVertical) {
            this.pos.y += this.moveDirection * this.#speed * (delta / 1000);

            if (this.pos.y > this.#maxY) {
                this.pos.y = this.#maxY;
                this.moveDirection = -1;
            }
            if (this.pos.y < this.#minY) {
                this.pos.y = this.#minY;
                this.moveDirection = 1;
            }
        } else if(this.#moveHorizontal) {
            this.pos.x += this.moveDirection * this.#speed * (delta / 1000);

            if (this.pos.x > this.#maxX) {
                this.pos.x = this.#maxX;
                this.moveDirection = -1;
            }
            if (this.pos.x < this.#minX) {
                this.pos.x = this.#minX;
                this.moveDirection = 1;
            }
        }
    }
}