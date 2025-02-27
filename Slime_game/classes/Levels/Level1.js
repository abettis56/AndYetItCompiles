import {Level} from "../Level.js";
import { Milcap } from "../Entities/Enemies/Milcap.js";
import {Verm} from "../Entities/Enemies/Verm.js"
import {Player} from "../Entities/Player.js";
import {Cursor} from "../Entities/Cursor.js";

function buildLevel1() {
    let tileMap = [
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9], // 0
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 9, 9, 9, 9, 9],
        [9, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 9, 9, 9, 9, 9],//q1 4
        [9, 9, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 9, 9, 9, 9, 9],//q1 5
        [9, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 9],
        [9, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 9, 9],
        [9, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9],
        [9, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [9, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [9, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [9, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 8, 1, 1, 1],
        [9, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 8, 1, 1, 1],//q3 15
        [9, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 8, 1, 1, 1],//q3 16
        [9, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 8, 1, 1, 1],
        [9, 1, 0, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [9, 1, 0, 0, 0, 0, 0, 0, 0, 1, 9, 9, 9, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] // 20
    ];

    let heightMap = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],// 0
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0],//q1 4
        [0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0],//q1 5
        [0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
        [0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 2, 2, 3, 3, 1, 1, 1, 3, 1, 1, 1, 1, 3, 3, 3],
        [0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 3, 3],//q3 15
        [0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 3, 3],//q3 16
        [0, 2, 0, 2, 0, 0, 2, 0, 0, 2, 2, 2, 3, 3, 1, 1, 1, 3, 1, 1, 1, 1, 3, 3, 3],
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3],
        [0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3] // 20
    ];

    //Create Player
    let pPos = [8, 1, 4];
    let player = new Player(pPos, "player", 1);

    //Create Cursor
    let cPos = [8, 1.6, 4];
    let cursor = new Cursor(cPos, "cursor");


    let enemyPos = [14, 2, 13];
    let milcap1 = new Milcap(enemyPos, "milcap1", 3, 1);
    milcap1.path.add([14, 1, 9]);
    milcap1.path.add([13, 1, 9]);
    milcap1.path.add([13, 2, 13]);
    milcap1.path.add([14, 2, 13]);
    milcap1.path.loop = true;

    let enemies = [milcap1];
    
    enemyPos = [17,1,4];
    let verm1 = new Verm(enemyPos, "verm1", 1, 2);
    verm1.path.add([17, 1, 7]);
    verm1.path.add([15, 1, 7]);
    verm1.path.add([11, 2, 5]);
    verm1.path.add([17, 1, 4]);
    verm1.nestLocation = [4,1,17];
    verm1.path.loop = true;
    
    enemies.push(verm1);

    enemyPos = [5, 1, 11];
    let milcap2 = new Milcap(enemyPos, "milcap2", 2, 3);
    milcap2.path.add([6, 1, 18]);
    milcap2.path.add([2, 1, 18]);
    milcap2.path.add([1, 1, 13]);
    milcap2.path.add([5,1,11]);
    milcap2.path.loop = true;

    enemies.push(milcap2);
    let level1 = new Level(heightMap, tileMap, enemies, player, cursor);
    return level1;
}

export {buildLevel1};