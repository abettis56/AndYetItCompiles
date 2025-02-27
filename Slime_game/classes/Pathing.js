import {AStarFinder} from "../libraries/AStar/AStarFinder.js";
import {Enemy} from "./Entities/Enemy.js";
import {currentLevel} from "./Global.js";

function aStar(startX, startY, endX, endY, board, entity) {
    let finder = new AStarFinder();
    //Get path
    let foundPath = finder.findPath(startX, startY, endX, endY, board, entity);
    if(foundPath.length == 0){
        console.log("No path exists!");
    }
    else {
        //Truncate foundPath to be only a length equal to remainingAP
        return foundPath;
    }
}

//Checks neighboring tiles for traversability. To be used by both Flood Fill and A*
function checkNeighbor(entity, sourceTile, destinationTile, isOccupied, endX, endZ){
    let maxHeight = entity.jumpHeight;
    let heightDifference = Math.abs(sourceTile.height - destinationTile.height);
    //This variable needs to be gotten from the entity later, but for now we can just
    //use the basic traversability (No water/void/gap spaces)
    let traversableTerrain = [0, 1, 4, 8];
    
    //Make sure destinationTile exists
    if(destinationTile == null){
        return false;
    }
    //Make sure the destination tile is within the remaining AP
    //(this is taken care of in flood fill, but not in A*)
    //Enemy doesn't do this, because enemy needs to have a destination beyond movement range in mind
    if(!(entity instanceof Enemy)){
        let xDistance = Math.abs(destinationTile.position[0] - entity.position[0]);
        let zDistance = Math.abs(destinationTile.position[2] - entity.position[2]);
        if(xDistance + zDistance > entity.remainingAP){
            return false;
        }
    }
    //Make sure maxHeight exceeds the height difference between the tiles
    if(maxHeight < heightDifference){
        return false;
    }
    //Make sure the destination tile is on the list of traversable terrains
    if(!traversableTerrain.includes(destinationTile.type)){
        return false;
    }
    //Make sure the destination tile isn't occupied
    //(Special condition: if this is currently checking the end destination,
    //and isOccupied is set to true, don't worry about this.)
    if(!isOccupied || (destinationTile.position[0] != endX || destinationTile.position[2] != endZ)) {
        if(destinationTile.occupant != null){
            return false;
        }
    }
    return true;
}

//FLOOD FILL IMPLEMENTATION
function hover(level){//initiates methods when cursor hovers over entities/tiles
    let cPos = level.cursor.position;
    let type = level.board.tileMap[cPos[0]][cPos[2]];
    let height = level.board.heightMap[cPos[0]][cPos[2]];
}

//Calls checkneighbor if destination tile exists
function neighborConfirm(entity, board, sourceX, sourceY, destX, destY, isOccupied, endX, endY) {
    if(board.tileCheck(destX, destY)) {
        let sourceTile = board.tileArray[sourceX][sourceY];
        let destTile = board.tileArray[destX][destY];
        return checkNeighbor(entity, sourceTile, destTile, isOccupied, endX, endY);
    }
    else {
        return false;
    }
}

function movementOverlay(x, z, range, board, entity){//uses the flood fill algorithm to create overlay of all possible spaces to move
    if(range>=0 && x >= 0 && x < board.overlayMap.length && z >=0 && z < board.overlayMap[x].length){
        //Do not render a normal overlay tile that has an entity in it
        if(board.tileArray[x][z].occupant == null){
            board.overlayMap[x][z].overlay.material.visible = true;
            board.tileArray[x][z].highlighted = true;
        }
        //...unless that entity is an absorbable enemy, then highlight in red
        //recursive call for surrounding spaces
        if(neighborConfirm(entity, board, x, z, x+1, z, false)){
            movementOverlay(x+1, z, range-1, board, entity);
        }
        if(neighborConfirm(entity, board, x, z, x, z+1, false)){
            movementOverlay(x, z+1, range-1, board, entity);
        }
        if(neighborConfirm(entity, board, x, z, x-1, z, false)){
            movementOverlay(x-1, z, range-1, board, entity);
        }
        if(neighborConfirm(entity, board, x, z, x, z-1, false)){
            movementOverlay(x, z-1, range-1, board, entity);
        }
    }
}

function movementOverlayHelper(board, entity){
    let entityPos = entity.position;//for player only
    //This if/else statement is meant to allow the overlay to work on entities that have no AP
    //at the moment. It otherwise shows the player's remaining movement.
    let range = 0;
    if(entity.remainingAP == 0) {
        range = entity.ap;
    }
    else {
        range = entity.remainingAP;
    }
    movementOverlay(entityPos[0], entityPos[2], range, board, entity);
    
    //Highlight enemies in range (player only)
    if(entity.name == "player") {
        let enemies = currentLevel.enemies;
        for(let i = 0; i < enemies.length; i++) {
            let x = enemies[i].position[0];
            let z = enemies[i].position[2];
            let xDistance = Math.abs(x - entityPos[0]);
            let zDistance = Math.abs(z - entityPos[2]);
            if(xDistance + zDistance <= range && enemies[i].absorbCheck()) {
                let overlay = board.overlayMap[enemies[i].position[0]][enemies[i].position[2]].overlay;
                overlay.material.color.setHex(0xAB4700);
                overlay.material.visible = true;
                board.tileArray[x][z].highlighted = true;
            }
        }
    }
}

function typeList(type){//Returns the terrain name for logging to console
    switch(type){
        
        case 0:
            return "Grass";
        case 1:
            return "Rocky";
        case 2:
            return "Water";
        case 3:
            return "Gap";
        case 4:
            return "Cave";
        case 8:
            return "Exit";
        case 9://may change as board gen changes
            return "Void";
    }
}

//returns what occupies the tile
function occupied(board){
    var occupant = board.tileArray[board.cursor.position[0]][board.cursor.position[2]].occupant;
    if(occupant != null){
        return occupant.name;
    }
    else {
        return "None";
    }
}

//this will reset overlay visibility to false when player not occupying space
function wipeOverlay(board){
    for(let r = 0; r < board.tileArray.length; r++){
        for(let c = 0; c < board.tileArray[r].length; c++){
            board.overlayMap[r][c].overlay.material.visible = false;
            board.overlayMap[r][c].overlay.material.color.setHex(0x0047AB);
            board.tileArray[r][c].highlighted = false;
        }
    }
}

export {hover, checkNeighbor, neighborConfirm, aStar, wipeOverlay, movementOverlayHelper, occupied};