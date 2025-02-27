import {movementOverlayHelper, wipeOverlay} from "./Pathing.js";

class Board {
    constructor(tileMap, heightMap, player, enemies, cursor){
        this.cursor = cursor;
        this.player = player;
        this.enemies = enemies;
        this.selected = null;

        //Added these for LevelManager
        this.tileMap = tileMap;
        this.heightMap = heightMap;
        this.textures = [];
    }

    buildBoard(resourceTracker) {
        this.tileArray = [];
        this.overlayMap = [];
        for(let i = 0; i < this.tileMap.length; i++){
            this.tileArray[i] = [];
            this.overlayMap[i] = [];
            for(let j = 0; j < this.tileMap[0].length; j++){
                this.tileArray[i][j] = new Tile(resourceTracker, [i, this.heightMap[i][j] / 2 + 0.5, j], 
                    this.heightMap[i][j], this.tileMap[i][j], this.textures);
                this.overlayMap[i][j] = new Overlay([i, this.heightMap[i][j] + 1.1, j]);
            }
        }
        //Loop through enemies list, get each enemy's position, and place them in the corresponding
        //tileArray coordinates' occupant field.
        for(let i = 0; i < this.enemies.length; i++) {
            let x = this.enemies[i].position[0];
            let y = this.enemies[i].position[2];
            this.tileArray[x][y].occupant = this.enemies[i];
        }
        //Set player's position on the board
        this.tileArray[this.player.position[0]][this.player.position[2]].occupant = this.player;
    }
    
    //Select, then expand overlay
    select(tile){
            this.selected = tile;
            console.log("SELECTED: " + this.selected.occupant.name);
            movementOverlayHelper(this, tile.occupant);
    }
    //if selecting the same entity a second time, deselect and wipe overlay
    deselect() {
        this.selected = null;
        wipeOverlay(this);
    }

    //returns true if tile exists at these coordinates
    tileCheck(x, z) {
        //Ensure tile is within array, first.
        if(x >= 0 && x < this.tileMap.length && z >= 0 && z < this.tileMap[0].length) {
            //Ensure tile isn't a void space
            switch(this.tileMap[x][z]) {
                case 0:
                case 1:
                case 3:
                case 4:
                case 8:
                    return true;
                default:
            }
        }
        return false;
    }
}

class Tile {
    constructor(resourceTracker, position, height, type, textures){

        this.position = position;
        this.height = height;
        this.type = type;
        this.highlighted = false;
        this.occupant = null;
        /*
        let grass = new THREE.TextureLoader().load( './assets/grass64.jpg' );
        let water = new THREE.TextureLoader().load( './assets/water.jpg' );
        let rocks = new THREE.TextureLoader().load( './assets/mountain.jpg' );
        let cave = new THREE.TextureLoader().load( './assets/cave64.jpg' );
        */
        switch(type){
            case 0://grass
                this.terrain = resourceTracker.track(new THREE.Mesh(
                    new THREE.CylinderBufferGeometry(.71, .71, height+1, 4, (height+1), false, (Math.PI/4)),
                    new THREE.MeshBasicMaterial({ map: textures[0]}))
                );
                break;
            case 1://rock
                this.terrain = resourceTracker.track(new THREE.Mesh(
                    new THREE.CylinderBufferGeometry(.71, .71, height+1, 4, (height+1), false, (Math.PI/4)),
                    new THREE.MeshBasicMaterial({ map: textures[2]}))
                );
                break;
            /*case 2://water
                this.terrain = new THREE.Mesh(new THREE.CylinderBufferGeometry(1, 1, height, 4, height),
                               new THREE.MeshBasicMaterial({ map: water }));;
                break;*/
            case 3://gap
                this.terrain = resourceTracker.track(new THREE.Mesh(
                    new THREE.BoxBufferGeometry(1, .1, 1),
                    new THREE.MeshBasicMaterial({ color: 0x000000})
                ));
                break;
            case 4://cave
                this.terrain = resourceTracker.track(new THREE.Mesh(
                    new THREE.CylinderBufferGeometry(.71, .71, height+1, 4, (height+1), false, (Math.PI/4)),
                    new THREE.MeshBasicMaterial({ map: textures[3]}))
                );
                break;
            case 8://exit
                this.terrain = resourceTracker.track(new THREE.Mesh(
                    new THREE.BoxBufferGeometry(1, 1, 1),
                    new THREE.MeshLambertMaterial({ color: 0xFADADD, emissive: 0XFF69B4})
                ));
                break;
            default:
                this.terrain = null;
                break;
        }
        if(this.terrain != null){
            //Set position
            this.terrain.position.x = this.position[0];
            this.terrain.position.y = this.position[1];
            this.terrain.position.z = this.position[2];
        }
    }   
}

class Overlay {
    constructor(pos){
        this.pos = pos;
        this.overlay = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(0.9,0.9),
            new THREE.MeshBasicMaterial( {color: 0x0047AB, transparent: true, opacity: 0.5, visible: false} )
        );
        this.overlay.rotateX(-Math.PI / 2);      
        this.overlay.position.x = this.pos[0];
        this.overlay.position.y = this.pos[1];
        this.overlay.position.z = this.pos[2];
    }
}

export {Board, Tile};