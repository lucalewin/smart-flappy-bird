
function Pipe() {

    this.x = width;
    this.w = 64;

    this.space = 180;
    this.bottom = random(height - 2 * this.space) + this.space;
    this.top = this.bottom - this.space;

    this.speed = 1.95;

    //-------------------------------------------------------

    this.show = function() {
        fill(0, 128, 0);   
        rect(this.x, 0, this.w, this.top);
        rect(this.x, this.bottom, this.w, height);
    }
    
    //-------------------------------------------------------

    this.update = function() {
        this.x -= this.speed;
    }

    //-------------------------------------------------------

    this.offscreen = function() {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }

}
