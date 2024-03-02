
function Obstacle(x_, y_, img_) {

    this.x = x_;
    this.y = y_;
    this.size = 32;

    this.img = img_;
    
    this.speed = 2;
    this.gravity = 0.675;
    this.velocity = 0;
    this.lift = -15;

    this.sleep = 3;

    this.show = function() {
        image(this.img, this.x - 20, this.y - 20, this.size + 10, this.size);
    }
    
    //-------------------------------------------------------

    this.update = function(pipes) {
        this.x -= this.speed;
        this.velocity += this.gravity;
        this.velocity *= 0.95;
        this.y += this.velocity;
        if (this.y > height - (this.size + this.size / 2)) {
            this.y = height - (this.size + this.size / 2);
            this.velocity = 0;
        } else if (this.y <= 0) {
            this.y = 0;
            this.velocity = 0;
        }
        // + + + + + + + + + + + + + +
        if (this.sleep-- !== 0) {
			return;
		}
        var pipe = this.getNextPipe(pipes);
		if (this.y > (pipe.top + pipe.space - (pipe.space / 4))) {
			this.velocity += this.lift;
		}
		this.sleep = 3;	
    }

    //-------------------------------------------------------

    this.hits = function(pipes) {
        var pipe = this.getNextPipe(pipes);
        if (this.y < pipe.top || this.y > pipe.bottom) {
            if (this.x >= pipe.x && this.x < pipe.x +  pipe.w) {
                return true;
            }
        }
        return false;
    }

    //-------------------------------------------------------

    this.offscreen = function() {
        if (this.x + this.size < 0) {
            return true;
        } else {
            return false;
        }
    }

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

}