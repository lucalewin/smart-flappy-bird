var groundImage;

function Ground() {
    
    groundImage = loadImage("images/ground.png");
    this.h = height - 40;
    
    this.hits = function(bird) {
        if (bird.y + bird.h >= this.h) {
            return true;
        }
        return false;
    }
    
    this.show = function() {
        fill(124, 202, 53);
        rect(-1, this.h, width + 1, height);
    }
    
}