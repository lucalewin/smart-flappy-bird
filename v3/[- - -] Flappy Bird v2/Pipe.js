function Pipe() {
    this.x = width;
    this.w = 64;
    this.speed = 1.75;
    this.space = 160;
    this.top = random(height - this.space * 2);
    this.bottom = height - (this.top + this.space);
    
    this.show = function() {
        fill(0, 128, 0);   
        rect(this.x, 0, this.w, this.top);
        rect(this.x, this.top + this.space, this.w, height);
    }
    
    this.update = function() {
        this.x -= this.speed;
    }
    
    this.offscreen = function() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }
    
}