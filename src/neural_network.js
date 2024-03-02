
function NeuralNetwork(inputLayer, hiddenLayer, outputLayer) {
    this.inputLayerSize = inputLayer;
    this.hiddenLayerSize = hiddenLayer;
    this.outputLayerSize = outputLayer;

    this.NETWORK_LAYER_SIZES = [this.inputLayerSize, this.hiddenLayerSize, this.outputLayerSize];

    this.NETWORK_SIZE = this.NETWORK_LAYER_SIZES.length;

    this.weights = [this.NETWORK_SIZE];
    this.bias = [this.NETWORK_SIZE];
    this.output = [this.NETWORK_SIZE];

    this.errorSignal = [this.NETWORK_SIZE];
    this.outputDerivative = [this.NETWORK_SIZE];

    for (let i = 1; i < this.NETWORK_SIZE; i++) {
        this.weights[i] = [this.NETWORK_LAYER_SIZES[i]];
        for (let j = 0; j < this.NETWORK_LAYER_SIZES[i]; j++) {
            this.weights[i][j] = [];
            for (let k = 0; k < this.NETWORK_LAYER_SIZES[i-1]; k++) {
                this.weights[i][j][k] = Math.random() * 2 - 1;         
            }
        }
    }

    for (let i = 0; i < this.NETWORK_SIZE; i++) {
        this.bias[i] = [this.NETWORK_LAYER_SIZES[i]];
        for (let j = 0; j < this.NETWORK_LAYER_SIZES[i]; j++) {
            this.bias[i][j] = Math.random() * 2 - 1; 
        }
    }

    for (let i = 0; i < this.NETWORK_SIZE; i++) {
        this.output[i] = [this.NETWORK_LAYER_SIZES[i]];
        this.errorSignal[i] = [this.NETWORK_LAYER_SIZES[i]];
        this.outputDerivative[i] = [this.NETWORK_LAYER_SIZES[i]];
    }

    this.calculateOutput = function(input) {
        if(input.length != this.inputLayerSize) {
            return null;
        }
        this.output[0] = input;
        for(let layer = 1; layer < this.NETWORK_SIZE; layer++) {
            for(let neuron = 0; neuron < this.NETWORK_LAYER_SIZES[layer]; neuron++) {
                var sum = this.bias[layer][neuron];
                for(let prevNeuron = 0; prevNeuron < this.NETWORK_LAYER_SIZES[layer-1]; prevNeuron++) {
                    sum += this.output[layer-1][prevNeuron] * this.weights[layer][neuron][prevNeuron];
                }
                this.output[layer][neuron] = this.sigmoid(sum);
                this.outputDerivative[layer][neuron] = this.output[layer][neuron] * (1 - this.output[layer][neuron]);
            }
        }
        return this.output[this.NETWORK_SIZE-1];
    }

    this.sigmoid = function(x) {
        return 1 / (1 + Math.exp(-x));
    }
    
    //------------------------------------------------------------------------------------------------------

    this.train = function(input, target, eta) {
        if(input.length != this.inputLayerSize || target.length != this.outputLayerSize) {
            return;
        }
        this.calculateOutput(input);
        this.backpropError(target);
        this.updateWeights(eta);
    }

    this.backpropError = function(target) {
        for(let neuron = 0; neuron < this.NETWORK_LAYER_SIZES[this.NETWORK_SIZE - 1]; neuron++) {
            this.errorSignal[this.NETWORK_SIZE - 1][neuron] = (this.output[this.NETWORK_SIZE - 1][neuron] - target[neuron]) * this.outputDerivative[this.NETWORK_SIZE - 1][neuron];
        }
        for(let layer = this.NETWORK_SIZE - 2; layer > 0; layer--) {
            for(let neuron = 0; neuron < this.NETWORK_LAYER_SIZES[layer]; neuron++){
                var sum = 0;
                for(let nextNeuron = 0; nextNeuron < this.NETWORK_LAYER_SIZES[layer + 1]; nextNeuron++) {
                    sum += this.weights[layer + 1][nextNeuron][neuron] * this.errorSignal[layer + 1][nextNeuron];
                }
                this.errorSignal[layer][neuron] = sum * this.outputDerivative[layer][neuron];
            }
        }
    }

    this.updateWeights = function(eta) {
        for(let layer = 1; layer < this.NETWORK_SIZE; layer++) {
            for(let neuron = 0; neuron < this.NETWORK_LAYER_SIZES[layer]; neuron++) {
                var delta = -eta * this.errorSignal[layer][neuron];
                this.bias[layer][neuron] += delta;
                for(let prevNeuron = 0; prevNeuron < this.NETWORK_LAYER_SIZES[layer - 1]; prevNeuron++) {
                    this.weights[layer][neuron][prevNeuron] += delta * this.output[layer - 1][prevNeuron];
                }
            }
        }
    }

    this.mutate = function(factor) {
        for(let layer = 1; layer < this.NETWORK_SIZE; layer++) {
            for(let neuron = 0; neuron < this.NETWORK_LAYER_SIZES[layer]; neuron++) {
                if (Math.random() * 10 < factor) {
                    this.bias[layer][neuron] += Math.random() * 0.3 - 0.15; // TODO
                }
                for(let prevNeuron = 0; prevNeuron < this.NETWORK_LAYER_SIZES[layer - 1]; prevNeuron++) {
                    if (Math.random() * 10 < factor) {
                        this.weights[layer][neuron][prevNeuron] += Math.random() * 0.5 - 0.25; // TODO
                    }
                }
            }
        }
    }

    this.export = function() {
        // console.log(JSON.stringify(this));
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this)));
        element.setAttribute('download', "test.json");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
}
