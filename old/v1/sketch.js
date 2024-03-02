var bird;
var pipes;
var passed = 0;
var record = 0;

//-------------------------------------------------------

function setup() {

    createCanvas(500, 600);

    pipes = [];
	
    pipes.push(new Pipe());
	
	bird = new Bird();
	
	if (passed > record) {
		record = passed;
	}
	passed = 0;
}

//-------------------------------------------------------

function draw() {

    background(39, 198, 216);

    //------------------------------------------
	
    if (pipes[pipes.length -1].x < width / 2) {
        pipes.push(new Pipe());
    }

    //------------------------------------------
	
    for (var index = pipes.length - 1; index >= 0; index--) {
        pipes[index].update();
        pipes[index].show();

        if (pipes[index].offscreen()) {
            pipes.splice(index, 1);
			passed++;
        }
    }
    
    //------------------------------------------

    fill(124, 202, 53);
    rect(-1, height - 32, width + 1, height);

    //------------------------------------------
	
	if (bird.hits(pipes[0])) {
		setup();
	}
    bird.update();
	bird.think(pipes);
    bird.show();
	
	textSize(25);
    text('Passed: ' + passed, 10, 20);
    text('Record: ' + record, 10, 40);
	
}

//-------------------------------------------------------

function keyPressed() {
    if (key == ' ') {
        bird.up();
    }
}

function mousePressed() {
    bird.up();
}
