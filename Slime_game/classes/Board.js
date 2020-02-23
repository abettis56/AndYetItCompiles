class Board {
    constructor(tileMap, heightMap, player, enemies, cursor){
        this.tileMap = tileMap;
        this.heightMap = heightMap;
        this.player = player;
        this.enemies = enemies;
        this.cursor = cursor;

        this.board = [];
        for(var i = 0; i < tileMap.length; i++){
            this.board[i] = []
            for(var j = 0; j < tileMap[0].length; j++){
                this.board[i][j] = new Tile([i, heightMap[i][j] / 2, j], heightMap[i][j], tileMap[i][j]);
            }
        }
    }
}

class Tile {
    constructor(position, height, type){

        this.position = position;
        this.height = height;
        this.hCost = 999;
        this.gCost = 999;

        var grass = new THREE.TextureLoader().load( './assets/grass.jpg' );
        var water = new THREE.TextureLoader().load( './assets/water.jpg' );
        var rocks = new THREE.TextureLoader().load( './assets/mountain.jpg' );
        var cave = new THREE.TextureLoader().load( './assets/cave.jpg' );

        
        switch(type){
            case 0://grass

                this.terrain = new THREE.Mesh(new THREE.CylinderGeometry(.71, .71, height, 4, (height+1), false, (Math.PI/4)),
                               new THREE.MeshBasicMaterial({ map: grass}));
                break;
            case 1://rocky
                this.terrain = new THREE.Mesh(new THREE.CylinderGeometry(.71, .71, height, 4, (height+1), false, (Math.PI/4)),

                               new THREE.MeshBasicMaterial({ map: rocks}));            
                break;
            /*case 2://water
                this.terrain = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, height, 4, height),
                               new THREE.MeshBasicMaterial({ map: water }));;
                break;*/
            case 3://gap
                this.terrain = new THREE.Mesh(new THREE.BoxGeometry(1, .1, 1),
                               new THREE.MeshBasicMaterial({ color: 0x000000}));
                break;


            case 4://cave

                this.terrain = new THREE.Mesh(new THREE.CylinderGeometry(0.71, 0.71, height, 4, (height+1), false, (Math.PI/4)),

                               new THREE.MeshBasicMaterial({ map: cave}));            
                break;
            case 8://exit
            this.terrain = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1),
                               new THREE.MeshBasicMaterial({ color: 0xFADADD}));
                break;


            default:
                this.terrain = null;
                break;
        }
        if(this.terrain != null){
            this.terrain.position.x = this.position[0];
            this.terrain.position.y = this.position[1];
            this.terrain.position.z = this.position[2];
        }
    }   

    getFCost() {
        return this.hCost + this.gCost;
    }
}

export {Board, Tile};