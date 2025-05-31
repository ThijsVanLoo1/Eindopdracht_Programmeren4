import { Actor, Color, Font, Label, Vector } from "excalibur";

export class UI extends Actor {

#label;
player1Object;

constructor(player1) {
    super();
    this.player1Object = player1;
}

    onInitialize(engine) {
        this.#label = new Label({
            text: `Strawberries: 0`,
            pos: new Vector(1100, 50),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Black
            })
        });

        this.addChild(this.#label);
    }

    updateScore() {
        this.#label.text = `Strawberries: ${this.player1Object.strawberries}`;
    }

    gameOver() {
        this.#label = new Label({
            text: `Game Over`,
            pos: new Vector(400, 300),
            font: new Font({
                size: 100,
                family: 'Open Sans',
                color: Color.Red
            })
        });

        this.addChild(this.#label);
    }
}