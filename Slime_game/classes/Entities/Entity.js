import {GameEntity} from "../../libraries/yuka-master/src/yuka.js";
import {sleep, degToRad } from "../Global.js";

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
        //Max movement
        this.movementRange = 0;
        //Remaining movement for turn
        this.remainingMovement = 0;
        //Build mesh from provided geometry and material, can add to scene in rest of code
        //this.mesh = THREE.Mesh(model, texture);
        /*
        this.mesh = new THREE.Mesh(model,
                    new THREE.MeshBasicMaterial({ map: texture }));
        */
    }

    //Function moves player to a given position. Only call after validation.
    //TODO: Play animations to move along path rather than jumping to set location.
    moveEntity(x, y, z) {
        this.position[0] = x;
        this.position[1] = y;
        this.position[2] = z;
        this.model.position.set(x,y,z);
    }

    //Helper method to rotate the entity slowly over time (WIP)
    async rotateEntity(rotationGoal) {
        //calculate rotation and slowly rotate model
        let rotationTotal = Math.abs(degToRad(rotationGoal) - this.model.rotation.y);

        let rotationIncrement = rotationTotal / 10.0;
        for(let j = 0; j < 10 && this.model.rotation.y != degToRad(rotationGoal); j++) {
            if(rotationTotal > 3.1415926535) {
                this.model.rotation.y += rotationIncrement;
            }
            else {
                this.model.rotation.y += rotationIncrement;
            }
            await sleep(1);
        }
        this.model.rotation.y = degToRad(rotationGoal);
    }

    //A method to check an entity's AP and decrement it with each move or action the entity takes
    decrementAP() {
        if(this.remainingAP > 0) {
            this.remainingAP--;
            return this.remainingAP;
        }
        else {
            return null;
        }
    }

    //Resets entity's AP to default at start of turn
    resetAP() {
        this.remainingAP = this.ap;
    }

    //Checks movement and decrements with each step the entity takes
    decrementMovement() {
        if(this.remainingMovement > 0) {
            this.remainingMovement--;
            return this.remainingMovement;
        }
        else {
            return null;
        }
    }

    //Reset's entity's movments at start of turn
    resetMovement() {
        this.remainingMovement = this.movementRange;
    }
}

export {Entity};