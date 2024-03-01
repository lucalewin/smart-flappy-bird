
function Bird(pipes) {

    this.x = 60;
    this.y = height / 2;
    this.size = 32;

    this.gravity = 0.675;
    this.velocity = 0;
    this.lift = -12.5;
    this.network = new NeuralNetwork(5, 3, 2);
    
    this.img = loadImage("images/bird.png");

    this.currentPipe = pipes[0];

    this.previousY = 0;

    //-------------------------------------------------------

    this.show = function() {
        fill(255);
        // ellipse(this.x, this.y, this.size, this.size);
        translate(this.x, this.y);
        rotate(radians((this.y - this.previousY) * 2));
        image(this.img, -20, -15.5, this.size + 10, this.size);
        translate(0, 0);
        rotate(radians(0 - ((this.y - this.previousY) * 2)));
        this.previousY = this.y;
        
    }

    //-------------------------------------------------------

    this.update = function() {
        this.velocity += this.gravity;
        this.velocity *= 0.95;
        this.y += this.velocity;
        
        if (this.y > height - (this.size + this.size / 2)) {
            this.y = height - (this.size + this.size / 2);
            this.velocity = 0;
        }    
        
        if (this.y <= 0) {
            this.y = 0;
            this.velocity = 0;
        }
    }

    //-------------------------------------------------------
    
    this.up = function() {
        this.velocity += this.lift;
    }

    //-------------------------------------------------------

    this.hits = function(pipe) {
        if (this.y < pipe.top || this.y > pipe.bottom) {
            if (this.x >= pipe.x && this.x < pipe.x +  pipe.w) {
                return true;
            }
        }
        return false;
    }

    this.hitsObstacle = function(obstacle) {
        if (this.x >= obstacle.x && this.x <= obstacle.x + obstacle.size / 2) {
            if (this.y >= obstacle.y && this.y <= obstacle.y + obstacle.size / 2) {
                console.log("HIT");
                return true;
            }
        }
        return false;
    }

    //-------------------------------------------------------

    this.think = function(pipes, obstacles) {

        var pipe = pipes[0];
        
		
		if ((pipe.x + pipe.w + 30) < this.x) {
			pipe = pipes[1];
        }
        var obstacle = undefined;
        if (obstacles.length > 0) {
            obstacle = obstacles[0];
            if ((obstacle.x + obstacle.size + 5) < this.x) {
                obstacle = obstacles[1];
            }
        }

        var inputs;

        if (obstacle == undefined) {
            inputs = [
                this.y / height,
                pipe.top / height,
                pipe.bottom / height,
                (pipe.x - this.x) / width,
                0,
            ];
        } else {
            inputs = [
                this.y / height,
                pipe.top / height,
                pipe.bottom / height,
                (pipe.x - this.x) / width,
                obstacle.y / height,
            ];
        }

        var output = this.network.calculateOutput(inputs);

        if (output[0] > output[1]) {
            this.up();
        }

    }

    //-------------------------------------------------------

    this.mutate = function() {
        this.network.mutate(0.1);
    }

    //-------------------------------------------------------

    this.hasPassed = function(pipes) {
        if (this.x > this.currentPipe.x + this.currentPipe.w) {
            this.currentPipe = pipes[1];
            return true;
        }
        return false;
    }

    //-------------------------------------------------------

    this.getNextPipe = function(pipes) {
        var pipe = pipes[pipes.length - 1];
        for (let index = 0; index < pipes.length; index++) {
            if (pipes[index].x >= this.x || pipes[index].x + pipes[index].w > this.x) {
                pipe = pipes[index];
                break;
            }
        }
        return pipe;
    }

    this.showLines = function(pipes, obstacle) {
        this.pipe = this.getNextPipe(pipes);

        fill(0);
        line(this.x, 0, this.x, this.y);
        line(this.pipe.x - 20, 0, this.pipe.x - 20, this.pipe.top);
        line(this.pipe.x - 10, 0, this.pipe.x - 10, this.pipe.bottom);
        line(this.x, this.y - 5, this.pipe.x, this.y - 5);
        if (obstacle !== undefined) {
            line(this.x, this.y + 5, obstacle.x, this.y + 5);
        }
    }

}
