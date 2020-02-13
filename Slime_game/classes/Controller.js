// declare variables
var windowWidth;
var windowHeight;
var camera;
var cameraControls;
var renderer;
var scene;

function init() {
    //Renderer/Camera stuff
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(windowWidth, windowHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 0.1, 10000);
    cameraControls = new THREE.OrbitControls( camera, renderer.domElement );

    //set listener for window resizing
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();
    });

    //Construct board object
    board = new Board(testLevelTileMap, testLevelHeightMap, null, null);

    // create scene object
    scene = new THREE.Scene;
    loadLevel(scene, board);

    camera.position.y = 10;
    camera.position.z = 10;

    // add to scene and renderer
    scene.add(camera); 
    camera.lookAt(board.board[0][0].position);

    //set listeners for keyboard presses
    document.addEventListener('keyup', doKeyUp, false);
    document.addEventListener('keydown', doKeyDown, false);
    renderer.render(scene, camera);

    render();
}

//loadLevel accepts a scene and board as parameters.
//It searches the board for all terrain, enemy, and player meshes and adds them to the scene.
function loadLevel(scene, board) {
    for(var i = 0; i < board.board.length; i++){
        for(var j = 0; j < board.board[0].length; j++){
            if(board.board[i][j].terrain != null){
                scene.add(board.board[i][j].terrain);
            }
        }
    }

    // create lighting and add to scene 
    var pointLight = new THREE.PointLight(0xaabbcc);
    pointLight.position.set(10, 16, 16);
    scene.add(pointLight);

    //Set up the skybox
    var skyboxGeometry = new THREE.CubeGeometry(100, 100, 100);
    var skyboxMaterial = new THREE.MeshBasicMaterial({  map: THREE.ImageUtils.loadTexture('./assets/Slimegamesky.jpg'), side: THREE.BackSide });
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    scene.add(skybox);
}

function render() {
    cameraControls.update();
    renderer.render(scene, camera);
    updateRender();
    requestAnimationFrame(render);
}

init();