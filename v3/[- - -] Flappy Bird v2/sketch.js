var TOTAL_BIRDS;
var pipes;
var ground;
var birds;
var bestBird = undefined;

function setup() {
    
    createCanvas(500, 600);
    TOTAL_BIRDS = 50;
    pipes = [];
   
    ground = new Ground();
    birds = [TOTAL_BIRDS];

    mutate();

}

function draw() {
    background(39, 198, 216);
    if (frameCount % 160 == 0) {
        pipes.push(new Pipe());
    }
    //------------------------------------
    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();
        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
        if (birds.length == 1) {
            bestBird = birds[0];
        } else if (birds.length == 0) {
            restart();
            return;
        }
        for (let index = 0; index < birds.length; index++) {
            if (birds[index].y < pipes[i].top || birds[index].y > pipes[i].bottom) {
                if (birds[index].x > pipes[i].x && birds[index].x < pipes[i].x + pipes[i].w) {
                    birds.splice(index, 1);
                }
            }
        }
    }
    ground.show();
    
    
    //------------------------------------
    for (var bird of birds) {
        if (pipes.length >= 1) {
            bird.think(pipes);
            bird.update(); 
        }
        bird.show();
    }
    if (birds.length != 0) {
        //birds[0].show();
    }
}

function mutate() {
    birds = [];
    if (bestBird == undefined) {
        for (var i = 0; i < TOTAL_BIRDS; i++) {
            birds[i] = new Bird();
        }
        var bird = birds[TOTAL_BIRDS-1];
        for (let index = 0; index < TOTAL_BIRDS; index++) {
            birds[index] = bird;
            birds[index].network.updateWeights;
        }
        return;
    } else {
        bestBird.y = height / 2;
        birds.push(bestBird);
        for (var index = 1; index < TOTAL_BIRDS; index++) {
            birds.push(bestBird);
            birds[index].mutate();
        }
        console.log("MUTATE");
    }
}

/*
function keyPressed() {
    if (key == ' ') {
        bird.moveUp();
    }
}
*/
function restart() {
    setup();
}
