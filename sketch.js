var flock;
var l;
var t = 0;


function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);


  flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 100; i++) {
    var b = new Boid(width/2,height/2);
    flock.addBoid(b);
  }
}

function draw() {
  background(0);
  flock.run();
}
