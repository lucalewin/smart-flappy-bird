var utils;

var NETWORK_LAYER_SIZES;

var NETWORK_SIZE;
var INPUT_SIZE;
var OUTPUT_SIZE;

var output;
var weights;
var bias;

//------------------------------------------------------------------------------------------------------------------------------

function NeuralNetwork(layer) {
    utils = new Utils();
    
    NETWORK_LAYER_SIZES = layer;
    
    NETWORK_SIZE = layer.length;
    INPUT_SIZE = layer[0];
    OUTPUT_SIZE = layer[NETWORK_SIZE-1];
    
    output = [NETWORK_SIZE];
    weights = [NETWORK_SIZE];
    bias = [NETWORK_SIZE];
    //------------------------------------------------------------------------------------------------------------------------------
    for (var i = 0; i < NETWORK_SIZE; i++) {
        output[i] = [NETWORK_LAYER_SIZES[i]];
        bias[i] = utils.createRandomArray(NETWORK_LAYER_SIZES[i], -0.5, 0.7);
        if(i > 0) {
            console.log("WEIGHTS");
            weights[i] = utils.createDoubleRandomArray(NETWORK_LAYER_SIZES[i], NETWORK_LAYER_SIZES[i-1], -1, 1);
        } 
    }
    console.log("Output:Bias", output, bias);
    //------------------------------------------------------------------------------------------------------------------------------
    this.calculate = function(input) {
        if(input.length != INPUT_SIZE) {
            return null;
        }
        output[0] = input;
        for(var layer = 1; layer < NETWORK_SIZE; layer ++) {
            for(var neuron = 0; neuron < NETWORK_LAYER_SIZES[layer]; neuron ++) {
                var sum = bias[layer][neuron];
                for(var prevNeuron = 0; prevNeuron < NETWORK_LAYER_SIZES[layer-1]; prevNeuron ++) {
                    sum += output[layer-1][prevNeuron] * weights[layer][neuron][prevNeuron];
                }
                output[layer][neuron] = this.sigmoid(sum);
            }
        }
        return output[NETWORK_SIZE-1];
    }
    //------------------------------------------------------------------------------------------------------------------------------
    
    this.sigmoid = function(x) {
        return 1 / 1 + Math.exp(-x);
    }

    //------------------------------------------------------------------------------------------------------------------------------
    this.updateWeights = function() {
        for(var layer = 1; layer < NETWORK_SIZE; layer++) {
            for(var neuron = 0; neuron < NETWORK_LAYER_SIZES[layer]; neuron++) {

                var delta = utils.randomValue(-.075, .075);
                //bias[layer][neuron] += delta;

                for(var prevNeuron = 0; prevNeuron < NETWORK_LAYER_SIZES[layer - 1]; prevNeuron++) {
                    weights[layer][neuron][prevNeuron] += delta * output[layer - 1][prevNeuron];
                }
            }
        }
    }
    //------------------------------------------------------------------------------------------------------------------------------
}


