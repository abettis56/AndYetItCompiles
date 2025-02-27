/**
 * Modified from Pathfinding.js https://github.com/qiao/PathFinding.js/
 * A node in grid.
 * This class holds some basic information about a node and custom
 * attributes may be added, depending on the algorithms' needs.
 * @constructor
 * @param {number} x - The x coordinate of the node on the grid.
 * @param {number} y - The y coordinate of the node on the grid.
 * @param {boolean} [walkable] - Whether this node is walkable.
 */
class Vertex {
    constructor(tile) {
        /**
         * The x coordinate of the node on the grid.
         * @type number
         */
        this.x = tile.position[0];
        /**
         * The y coordinate of the node on the grid.
         * @type number
         */
        this.y = tile.position[2];
        this.tile = tile;
    }
}

export {Vertex};
