import { State } from "../../../libraries/yuka-master/src/yuka.js";

//these constants can be used for animations and others
const PATROL = 'PATROL';
const PURSUE = 'PURSUE';
const ATTACK = 'ATTACK';
const FLEE = 'FLEE';

class PatrolState extends State{

    enter(enemy) {
        console.log("Now patrolling!");
        //can be used to play an animation of some sort
    }

    execute(enemy){
        if(enemy.seesPlayer()) {
            enemy.stateMachine.changeTo(PURSUE);
        }
        enemy.moveEPath();
    }

    exit(enemy){
        //some sort of alert to the player?
       
    }

}

class PursueState extends State{

    enter(enemy) {
        console.log("Now chasing player!");
        enemy.moveToPlayer();
    }

    execute(enemy){
        if(!enemy.seesPlayer()) {
            enemy.stateMachine.changeTo(PATROL);
        }
        enemy.moveToPlayer();

        if(enemy.withinARange()) {
            enemy.moveToPlayer();
            enemy.stateMachine.changeTo(ATTACK);
        }
        
    }

    exit(enemy){

    }

}

class AttackState extends State{

    enter(enemy) {
        //attack animation
        console.log("FIRST ATTACK");
        enemy.attack(enemy.attackPower);
    }
    
    execute(enemy) {
        enemy.moveToPlayer();
        console.log("Within AR: ", enemy.withinARange());
        if(enemy.withinARange() == false){
            enemy.stateMachine.changeTo(PURSUE);
        }
        else{
            //attack animation
            enemy.attack(enemy.attackPower);
        }
    }

    exit(enemy) {
        
    }
}

class FleeState extends State{

    enter(enemy) {

    }

    execute(enemy) {

    }

    exit(enemy) { 

    }
}

export {PatrolState, PursueState, AttackState}; 