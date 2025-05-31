import { Actor, Vector, Keys, CollisionType, SpriteSheet, range, Animation, Color, CompositeCollider, Shape } from "excalibur"
import { Resources } from "./resources"
import { Ground } from "./ground";
import { Gap } from "./gap";
import { Saw } from "./saw";
import { Platform } from "./platform";
import { Strawberry } from "./strawberry";

export class Player extends Actor {

    #jumpForce = 500;
    #acceleration = 1800;
    #maxSpeed = 2500;
    #run;
    #idle;
    #death;
    #isDead = false;
    #isGrounded = false;
    lives = 3;
    strawberries = 0;
    ui;

    constructor() {
        super({
            width: Resources.PlayerRun.width / 12,
            height: Resources.PlayerRun.height,
        })
    }

     onInitialize(engine) {
        let capsule = new CompositeCollider([
            Shape.Circle(10, new Vector(0, -5)),
            Shape.Box(20, 20),
            Shape.Circle(10, new Vector(0, 5)),
            ])
            this.body.collisionType = CollisionType.Active
            this.collider.set(capsule);
        this.engine = engine;
        //ANIMATIES//

        const runAnimation = SpriteSheet.fromImageSource({
            image: Resources.PlayerRun,
            grid: { rows: 1, columns: 12, spriteWidth: 32, spriteHeight: 32 }
        })

        this.#idle = runAnimation.sprites[0]; // geen animatie
        this.#run = Animation.fromSpriteSheet(runAnimation, range(0, 11), 80);
        this.graphics.add("run", this.#run);
        this.graphics.use(this.#idle);
        //          //

        //PLAYER PHYSICS SETTINGS//

        this.body.friction = 0;
        this.body.linearDamping = 0;
        this.body.bounciness = 0;
        this.body.sleepingAllowed = false;
        this.body.motionType = 1; // === dynamic
        //                      //

        this.pos = new Vector(300, 600);
        this.scale = new Vector(2.5, 2.5);

        this.events.on("collisionstart", (e) => this.#checkGrounded(e));;
        this.events.on("collisionend", (e) => this.#checkGrounded(e));

        this.events.on("collisionstart", (e) => this.#hit(e));
    }

    onPreUpdate(engine, delta) {
        if (this.#isDead) return; //Stop alle animaties wanneer dood

        this.acc = Vector.Zero;

        this.graphics.use(this.#idle);
        this.rotation = 0;
        this.angularVelocity = 0;
        // SPRONG-ANIMATIES
        if (this.vel.y < 0) {
            this.graphics.use(Resources.PlayerJump.toSprite());
        } else if (this.vel.y > 0) {
            this.graphics.use(Resources.PlayerFall.toSprite());
        }

        //BEWEGING//

        if(engine.input.keyboard.isHeld(Keys.A)) {
            this.graphics.use(this.#run); //run animatie start
            this.acc.x = -this.#acceleration; //start beweging
            if(this.vel.x < -this.#maxSpeed) {
                this.vel.x = -this.#maxSpeed; //max snelheid bereikt
            }
            this.graphics.flipHorizontal = true;
        }
        if(engine.input.keyboard.isHeld(Keys.D)) {
            this.graphics.use(this.#run);
            this.acc.x = this.#acceleration;
            if(this.vel.x > this.#maxSpeed) {
                this.vel.x = this.#maxSpeed;
            }
            this.graphics.flipHorizontal = false;
        }

        if(engine.input.keyboard.isHeld(Keys.Space)) {
            if(this.#isGrounded) {
                this.body.applyLinearImpulse(new Vector(0, -this.#jumpForce * delta));
                this.#isGrounded = false;
            }
        }

        this.vel = this.vel.scale(0.90); //velocity neemt langzaam af bij loslaten keys
        //      //
    }

    #checkGrounded(e) {
        if(e.other.owner instanceof Ground || e.other.owner instanceof Platform) {
            this.#isGrounded = true;
        } else {
            this.#isGrounded = false;
        }
    }

    #hit(e) {
        if(e.other.owner instanceof Gap || e.other.owner instanceof Saw && !this.#isDead) {
            this.#isDead = true;

            //DEATH ANIMATION
            const deathAnimation = SpriteSheet.fromImageSource({
                image: Resources.Disappearing,
                grid: { rows: 1, columns: 7, spriteWidth: 96, spriteHeight: 96 }
            })
            this.#death = Animation.fromSpriteSheet(deathAnimation, range(0, 6), 80);
            this.graphics.add("death", this.#death);
            this.graphics.use(this.#death);
            //

            this.lives--;
            //WAIT FOR FINISH ANIMATION
            setTimeout(() => {
                this.#isDead = false;
                this.#playerRespawn();
            }, 560);
        } else if(e.other.owner instanceof Strawberry) {
            this.strawberries++;
            this.engine.ui.updateScore()
            e.other.owner.kill();
        }
    }

    #playerRespawn() {
        if(this.lives > 0) {
            this.pos = new Vector(300, 600);
        } else {
            this.kill();
            this.engine.ui.gameOver();
        }
    }
}