class Pipe {
    constructor(bottomImage_, topImage_) {
        this.x = width;
        this.w = 64;
        this.space = 175;
        this.bottom = random(height - 2 * this.space) + this.space;
        this.top = this.bottom - this.space;
        this.bottomImage = bottomImage_;
        this.topImage = topImage_;
        this.speed = 3; // 1.95
    }

    show() {
        image(this.bottomImage, this.x, this.bottom, this.w, this.bottomImage.size);
        image(this.topImage, this.x, this.top - this.topImage.size, this.w, this.top);
        rect(this.x, -100, this.w, this.top);
    }

    update() {
        this.x -= this.speed;
    }

    offscreen() {
        return this.x < -this.w;
    }
}


// function Pipe(bottomImage_, topImage_) {

//     this.x = width;
//     this.w = 64;

//     this.space = 175;
//     this.bottom = random(height - 2 * this.space) + this.space;
//     this.top = this.bottom - this.space;
    
//     this.bottomImage = bottomImage_;
//     this.topImage = topImage_;

//     this.speed = 3//1.95;

//     //-------------------------------------------------------

//     this.show = function() {
//         image(this.bottomImage, this.x, this.bottom, this.w, this.bottomImage.size);
//         image(this.topImage, this.x, this.top - this.topImage.size, this.w, this.top);
//         rect(this.x, -100, this.w, this.top);
//     }

//     this.update = function() {
//         this.x -= this.speed;
//     }

//     this.offscreen = function() {
//         if (this.x < -this.w) {
//             return true;
//         } else {
//             return false;
//         }
//     }

// }

