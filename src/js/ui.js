import { Actor, Color, Font, Label, Vector } from "excalibur";

export class UI extends Actor {

label;
player1Object;

constructor(player1) {
    super();
    this.player1Object = player1;
}

    onInitialize(engine) {
        this.label = new Label({
            text: `Lives: 3`,
            pos: new Vector(100, 50),
            font: new Font({
                size: 20,
                family: 'Open Sans',
                color: Color.Black
            })
        });

        this.addChild(this.label);
    }

    updateLives() {
        this.label.text = `Lives: ${this.player1Object.lives}`;
    }
}