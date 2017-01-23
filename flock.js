function Flock() {
    this.boids = [];

  this.run = function() {
    for (var i = 0; i < this.boids.length; i++) {
      this.boids[i].run(this.boids);  
    }
  }

  this.addBoid = function(b) {
    this.boids.push(b);
  }
}
