import { Actor, Vector, Keys, CollisionType, SpriteSheet, range, Animation, Color } from "excalibur"
import { Resources } from "./resources"
import { Ground } from "./ground";
import { Gap } from "./gap";

export class Player extends Actor {

    jumpForce = 800;
    acceleration = 1200;
    maxSpeed = 2000;
    run;
    idle;
    isGrounded = false;
    lives = 3;
    ui;

    constructor() {
        super({
            width: Resources.PlayerRun.width / 12,
            height: Resources.PlayerRun.height,
        })
    }

     onInitialize(engine) {
        this.engine = engine;
        //ANIMATIES//

        const runAnimation = SpriteSheet.fromImageSource({
            image: Resources.PlayerRun,
            grid: { rows: 1, columns: 12, spriteWidth: 32, spriteHeight: 32 }
        })

        this.idle = runAnimation.sprites[0]; // geen animatie
        this.run = Animation.fromSpriteSheet(runAnimation, range(1, 11), 80);
        this.graphics.add("run", this.run);
        this.graphics.use(this.idle);
        //          //

        //PLAYER PHYSICS SETTINGS//

        this.body.collisionType = CollisionType.Active;
        this.body.friction = 0;
        this.body.linearDamping = 0;
        this.body.sleepingAllowed = false;
        this.body.motionType = 1;
        //                      //

        this.pos = new Vector(320, 600);
        this.scale = new Vector(2.5, 2.5);

        this.events.on("collisionstart", (e) => this.checkGrounded(e));
        this.events.on("collisionend", (e) => this.checkGrounded(e));

        this.events.on("collisionstart", (e) => this.checkGap(e));
    }

    onPreUpdate(engine) {
        this.acc = Vector.Zero;

        this.graphics.use(this.idle);
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
            this.graphics.use(this.run); //run animatie start
            this.acc.x = -this.acceleration; //start beweging
            if(this.vel.x < -this.maxSpeed) {
                this.vel.x = -this.maxSpeed; //max snelheid bereikt
            }
            this.graphics.flipHorizontal = true;
        }
        if(engine.input.keyboard.isHeld(Keys.D)) {
            this.graphics.use(this.run);
            this.acc.x = this.acceleration;
            if(this.vel.x > this.maxSpeed) {
                this.vel.x = this.maxSpeed;
            }
            this.graphics.flipHorizontal = false;
        }

        if(engine.input.keyboard.isHeld(Keys.Space)) {
            if(this.isGrounded) {
                this.vel.y = -this.jumpForce;
                this.isGrounded = false;
            }
        }

        this.vel = this.vel.scale(0.95); //velocity neemt langzaam af bij loslaten keys
        //      //
    }

    checkGrounded(e) {
        if(e.other.owner instanceof Ground) {
            this.isGrounded = true;
        } else {
            this.isGrounded = false;
        }
    }

    checkGap(e) {
        if(e.other.owner instanceof Gap) {
            //Death animation//
            this.lives--;
            this.engine.ui.updateLives();
            this.playerRespawn();
        }
    }

    playerRespawn() {
        if(this.lives > 0) {
            this.pos = new Vector(300, 500);
        } else {
            this.kill();
        }
    }
}