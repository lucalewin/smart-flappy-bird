
function Bird() {

    this.x = 60;
    this.y = height / 2;
    this.size = 32;

    this.gravity = 0.675;
    this.velocity = 0;
    this.lift = -15;
	
	this.sleep = 3;
	
    //-------------------------------------------------------

    this.show = function() {
        fill(255);
        ellipse(this.x, this.y, this.size, this.size);
    }

    //-------------------------------------------------------

    this.update = function() {
        this.velocity += this.gravity;
        this.velocity *= 0.95;
        this.y += this.velocity;
        
        if (this.y > height - 48) {
            this.y = height - 48;
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
            if (this.x >= pipe.x && this.x <= pipe.x + pipe.w) {
                return true;
            }
        }
        return false;
    }

    //-------------------------------------------------------

    this.think = function(pipes) {

        if (this.sleep-- !== 0) {
			return;
		}
		var pipe = pipes[0];
		
		if (pipe.x + pipe.w + 20 < this.x) {
			pipe = pipes[1];
		}
		
		if (this.y > (pipe.top + pipe.space - (pipe.space / 4))) {
			this.up();
		}
		this.sleep = 3;	
    }

    //-------------------------------------------------------

}
