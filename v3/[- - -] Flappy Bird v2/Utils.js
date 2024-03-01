
function Utils() {

    this.createArray = function(size, init_value){
        if(size < 1) return null;
        var output = [size];
        for(var i = 0; i < size; i++) {
            output[i] = init_value;
        }
        return output;
    }

    this.createRandomArray = function(size, lower_bound, upper_bound){
        if(size < 1) {
            return null;
        }
        var output = [];
        for(var i = 0; i < size; i++) {
            output[i] = this.randomValue(lower_bound, upper_bound);
        }
        return output;
    }   

    this.createDoubleRandomArray = function(sizeX, sizeY, lower_bound, upper_bound) {
        if(sizeX < 1 || sizeY < 1) {
            return null;
        }
        var ar = [sizeX];
        for (var i = 0; i < sizeX; i++) {
            ar[i] = [sizeY];
        }
        for(var i = 0; i < sizeX; i++) {
            ar[i] = this.createRandomArray(sizeY, lower_bound, upper_bound);
        }
        return ar;
    }

    this.randomValue = function(lower_bound, upper_bound){
        return Math.random() * (upper_bound - lower_bound) + lower_bound;
    }
    
}
