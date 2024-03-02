var score = 0;
var record = 0;

var lastLoop;
var thisLoop;
var fps

var birdImage;
var angryBirdImage
var groundImage;
var bottomPipeImage;
var topPipeImage;

var currentPipe;

var pipes;
var obstacles;
var birds;
var bestBird;
const TOTAL_BIRDS = 10000;

//-------------------------------------------------------

function setup() {

    createCanvas(window.innerWidth - 15, 600);

    loadItems();

    birdImage = loadImage("images/bird.png");
    angryBirdImage = loadImage("images/angryBird.png");
    groundImage = loadImage("images/ground.png");
    bottomPipeImage = loadImage("images/pipe.png");
    topPipeImage = loadImage("images/upsidedownpipe.png");

    lastLoop = new Date();

    showGUI();

}

//-------------------------------------------------------

function draw() {
    background(39, 198, 216);

    if (!start_) {
        fill(124, 202, 53);
        rect(-1, height - 37, width + 1, height);
        return;
    }

    //------------------------------------------

    //add pipes and obstacles
    if (pipes[pipes.length -1].x < width / 1.25) {
        pipes.push(new Pipe(bottomPipeImage, topPipeImage));
        if (Math.random() * (1 - -1) + -1 < -0.25) {
            obstacles.push(new Obstacle(pipes[pipes.length -1].x + pipes[pipes.length -1].w + 150, height / 2, angryBirdImage));
        }
    }

    //------------------------------------------

    //show pipes and remove them if they are offscreen
    for (var index = pipes.length - 1; index >= 0; index--) {
        pipes[index].update();
        pipes[index].show();

        if (pipes[index].offscreen()) {
            pipes.splice(index, 1);
            // passed++;
        }
    }

    //------------------------------------------

    //display the ground
    fill(124, 202, 53);
    rect(-1, height - 37, width + 1, height);
    // image(groundImage, -1, height - 37, groundImage.width, height);

    //------------------------------------------

    //remove obstacles, if they hit a pipe
    for (let index = obstacles.length - 1; index >= 0; index--) {
        obstacles[index].update(pipes);
        obstacles[index].show();
        if (obstacles[index].offscreen()) {
            obstacles.splice(index, 1);
            continue;
        } else if (obstacles[index].hits(pipes)) {
            obstacles.splice(index, 1);
        }
    }

    //------------------------------------------

    // bird hits a pipe or an obstacle
    //update and show the birds
    for (let index = birds.length - 1; index >= 0; index--) {
        //remove bird, if it hits a pipe or an obstacle
        if (birds[index].hits(pipes[0]) || (obstacles.length > 0 && birds[index].hitsObstacle(obstacles[0]))) {
            birds.splice(index, 1);
            if (birds.length == 1) {
                bestBird = birds[0];
            } else if (birds.length == 0) {
                if (!automated) {
                    start_ = false;
                    showGUI();
                } else {
                    restart();
                }
                return;
            }
            continue;
        } 
        if (automated) {
            birds[index].think(pipes, obstacles);
        }
        birds[index].update();
        // birds[index].show();
    }
    
    if (showLines_) {
        birds[0].showLines(pipes, obstacles[0]);
    }
    if (birds[0].hasPassed(pipes)) {
        score++;
    } 

    //------------------------------------------

    // FPS counter
    thisLoop = new Date();
    fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;

    //------------------------------------------

    // display all infos
    textSize(50);
    fill(0);
    text(score, width / 2, height / 3);
    textSize(11);
    text('Record: ' + record, 2.5, 10);
    text('FPS: ' + Math.floor(fps), 2.5, 25);
    text('Birds: ' + birds.length, 2.5, 40);

    birds[0].show();
}
