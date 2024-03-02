var btnRestart;
var btnReset;
var btnAutomate;
var btnStop;
var btnShowLines;

var txtScore;
var txtRecord;

var score = 0;
var record = 0;

var start_ = false;
var automated = false;
var showLines_ = false;

var bestBird = undefined;

// ##############################################

function loadItems() {

    var flexbox = createDiv(" ");
    flexbox.elt.classList.add("flexbox");

    btnRestart = createButton("Restart");
    btnRestart.class("restart");
    btnReset = createButton("Reset");
    btnReset.class("reset");
    btnAutomate = createButton("Automate");
    btnAutomate.class("automate");
    btnStop = createButton("Stop Automation");
    btnStop.class("stop");
    btnShowLines = createButton("Show Lines");
    btnShowLines.class("lines");
    
    txtScore = createDiv("Score: " + score);
    txtScore.position(-100, -100);
    txtScore.class("score");
    txtRecord= createDiv("Record: " + record);
    txtRecord.position(-100, -100);
    txtRecord.class("record");

    btnRestart.mousePressed(restart);
    btnReset.mousePressed(reset);
    btnAutomate.mousePressed(automate);
    btnStop.mousePressed(stop);
    btnShowLines.mousePressed(showLines);

    flexbox.elt.append(btnRestart.elt);
    flexbox.elt.append(btnReset.elt);
    flexbox.elt.append(btnAutomate.elt);
    flexbox.elt.append(txtScore.elt);
    flexbox.elt.append(txtRecord.elt);

    start_ = false;

}

// ##############################################

function showGUI() {

    if (score > record) {
        record = score;
    }

    btnRestart.position(width / 2 - btnRestart.width * 2, height / 2 - 50);
    btnReset.position(width / 2 + btnReset.width, height / 2 - 50);
    btnAutomate.position(width / 2 - btnAutomate.width , height / 2);
    btnShowLines.position(7.5, height + 15);

    btnStop.position(-100, -100);

    txtScore.html("Score: " + score);
    txtRecord.html("Record: " + record);

    txtScore.position(width / 2 - 45, height / 2 - 115);
    txtRecord.position(width / 2 - 52.5, height / 2 - 85);
}

// ----------------------------------------------

function disposeGUI() {
    txtScore.position(-100, -100);
    txtRecord.position(-100, -100);

    btnRestart.position(-100, -100);
    btnReset.position(-100, -100);
    btnAutomate.position(-100, -100);
}

// ##############################################

function restart() {
    pipes = [];
    obstacles = [];
    birds = [];

    if (score > record) {
        record = score;
    }
    score = 0;

    pipes.push(new Pipe(bottomPipeImage, topPipeImage));
    obstacles.push(new Obstacle(pipes[pipes.length -1].x + pipes[pipes.length -1].w + 150, height / 2, angryBirdImage));

    if (automated) {
        if (bestBird == undefined) {
            for (let index = 0; index < TOTAL_BIRDS; index++) {
                birds.push(new Bird(pipes));
            }
        } else {
            birds.push(bestBird);
            for (let i = 1; i < TOTAL_BIRDS; i++) {
                birds.push(bestBird);
                birds[i].mutate();
            }
            for (let i = TOTAL_BIRDS * 0.75; i < TOTAL_BIRDS; i++) {
                birds.push(new Bird(pipes));
            }
        }
    } else {
        birds.push(new Bird(pipes));
        birds[0].lift = -20;
    }
    disposeGUI();
    start_ = true;

}

// ##############################################

function reset() {
    start_ = false;
    bestBird = undefined;
    score = 0;
    record = 0;
    showGUI();
}

// ##############################################

function automate() {
    automated = true;
    btnStop.position(btnShowLines.width + btnShowLines.x + 40, height + 15);
    restart();
}

// ##############################################

function stop() {
    btnStop.position(-100, -100);
    automated = false;
    reset();
}

// ##############################################

function showLines() {
    showLines_ = !showLines_;
}

// ##############################################

function keyPressed() {
    if (key == ' ' && !automated && birds.length > 0) {
        birds[0].up();
    }
}
