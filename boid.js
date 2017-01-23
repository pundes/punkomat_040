function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3;
  this.maxforce = 0.05;
  this.valx;
  this.val;
  var min = 50;
  var max = 150;
  this.val = Math.round(Math.random() * (max - min)) + min;


  this.run = function(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }

  this.flock = function(boids) {
    var sep = this.separate(boids);
    var coh = this.cohesion(boids);
    sep.mult(10);
    coh.mult(5);
    this.applyForce(sep);
    this.applyForce(coh);
  };

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.seek = function(target) {
    var desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxspeed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  };

  this.render = function() {
    push();
    translate(this.position.x, this.position.y);
    noStroke();
    fill('rgba(255, 255, 255, 0.2)');
    stroke(255);
    strokeWeight(0.3);

    for(var i = 0; i < 10; i++) {
        this.valx = random(0, this.val);
        line(0, this.valx, this.val, this.valx);
    }
    pop();
  };

  this.borders = function() {
    if (this.position.x < -this.valx) this.position.x = width/2;
    if (this.position.y < -this.valx) this.position.y = height/2;
    if (this.position.x > width + this.valx) this.position.x = width/2;
    if (this.position.y > height + this.valx) this.position.y = height/2;
  }

  this.separate = function(boids) {
    var desiredseparation = 40.0;
    var steer = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < desiredseparation)) {
        var diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }
    if (count > 0) {
      steer.div(count);
    }

    if (steer.mag() > 0) {
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  this.cohesion = function(boids) {
    var neighbordist = 80;
    var sum = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.position, boids[i].position);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].position);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); 
    } else {
      return createVector(0, 0);
    }
  }
}
