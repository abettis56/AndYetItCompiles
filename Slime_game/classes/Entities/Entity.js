import {GameEntity} from "../../libraries/yuka-master/src/yuka.js";
import {sleep, degToRad } from "../Global.js";
import {TWEEN} from "../../libraries/tween.js";

class Entity extends GameEntity {
    constructor(position, name){
        super();
        //Set position of entity
        this.position = position;
        //TODO: Enforce uniqueness of entity ID
        this.name = name;
        //Represents Action points (AP)
        this.ap = 0;
        //AP remaining for turn.
        this.remainingAP = 0;
        this.model = null;
        this.modelMultiplier = 1;
        this.animations = null;
        this.mixer = null;
    }

    //Function moves entity to a given position. Only call after validation.
    //If entity is the player, also move spike model.
    moveEntity(x, y, z) {
        if(this.name == "player") {
            let spikeTween = new TWEEN.Tween(this.spikeModel.position);
            spikeTween.to({ x: x, y: y, z: z }, 400);
            spikeTween.start();
            this.position[0] = x;
            this.position[1] = y;
            this.position[2] = z;
        }
        let tween = new TWEEN.Tween(this.model.position);
        tween.to({ x: x, y: y, z: z }, 400);
        tween.start();
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
    }

    //Helper method to rotate the entity slowly over time (WIP)
    async rotateEntity(destination) {
        let rotationGoal = 0;
        if(this.position[0] < destination.tile.position[0]) {
            rotationGoal = 90;
        }
        else if (this.position[0] > destination.tile.position[0]) {
            rotationGoal = 270;
        }
        else if (this.position[2] < destination.tile.position[2]) {
            rotationGoal = 0;
        }
        else if (this.position[2] > destination.tile.position[2]) {
            rotationGoal = 180;
        }
        
        //Set currentRotation and rotationGoal such that they are 360 degrees instead of 0
        let currentRotation = this.model.rotation.y;
        if(this.model.rotation.y == 0) {
            currentRotation = degToRad(360);
        }
        //calculate rotation and slowly rotate model
        let rotationTotal = degToRad(rotationGoal) - Math.abs(currentRotation);
        if(Math.abs(rotationTotal) > 3.1415926535) {
            rotationTotal *= -1;
            rotationTotal = 2*3.1415926535 - rotationTotal;
        }

        let rotationIncrement = rotationTotal / 10.0;
        for(let j = 0; j < 10 && this.model.rotation.y != degToRad(rotationGoal); j++) {
            if(Math.abs(rotationTotal) >= 3.1415926535) {
                this.model.rotation.y -= rotationIncrement;
                if(this.name == "player") {
                    this.spikeModel.rotation.y -= rotationIncrement;
                }
            }
            else {
                this.model.rotation.y += rotationIncrement;
                if(this.name == "player") {
                    this.spikeModel.rotation.y += rotationIncrement;
                }
            }
            await sleep(1);
        }
        this.model.rotation.y = degToRad(rotationGoal);
    }

    //A method to check an entity's AP and decrement it with each move or action the entity takes
    decrementAP() {
        if(this.remainingAP > 0) {
            let reportAP = this.remainingAP;
            this.remainingAP--;
            return reportAP;
        }
        else {
            return null;
        }
    }

    //Resets entity's AP to default at start of turn
    resetAP() {
        this.remainingAP = this.ap;
    }
}

export {Entity};