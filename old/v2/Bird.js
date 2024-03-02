function Bird() {
    this.x = width / 2.5;
    this.y = height / 2;
    this.gravity = 0.6;
    this.lift = -18;
    this.velocity = 0;
    this.w = 32;
    this.h = 32;
    var layer = [4,4,1];
    this.network = new NeuralNetwork(layer);
    
    this.show = function() {
        fill(255, 10);
        ellipse(this.x, this.y, this.w, this.h);
    }
     
    this.update = function() {
        this.velocity += this.gravity;
        this.velocity *= 0.95;
        this.y += this.velocity;
        
        if (this.y > height - 37) {
            this.y = height - 37;
            this.velocity = 0;
        }    
        
        if (this.y <= 0) {
            this.y = 0;
            this.velocity = 0;
        }

    }
    
    this.moveUp = function() {
        this.velocity += this.lift;
    }
    
    this.think = function(pipes) {
        var inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = pipes[0] == undefined ? height / 2 - this.h / 2  : pipes[0].top / height;
        inputs[2] = pipes[0] == undefined ? height / 2 + this.h / 2 : pipes[0].bottom / height;
        inputs[3] = pipes[0] == undefined ? width - 60: pipes[0].x / width;
        
        var outputs = this.network.calculate(inputs);

        if (outputs[0] > 0.5) {
            this.moveUp();
        }
    }

    this.mutate = function() {
        this.network.updateWeights();
    }

}
