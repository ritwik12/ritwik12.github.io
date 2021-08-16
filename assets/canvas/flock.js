function setup() {
    createCanvas(windowWidth, windowHeight),
    flock = new Flock;
    for (var i = 0; 50 > i; i++) {
        var o = new Boid(0,0);
        flock.addBoid(o)
    }
    birdImage = loadImage("assets/canvas/bird.png"),
    bg = loadImage('assets/img/background_canvas.png'),
    song = loadSound("assets/canvas/birds.mp3", loaded)
}
function loaded() {
    song.play(),
    loop()
}
function draw() {
    background(bg),
    flock.run(),
    flock.boids.length > 150 && flock.removeBoid()
}
function mouseDragged() {
    flock.addBoid(new Boid(mouseX,mouseY))
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
function Flock() {
    this.boids = []
}
function Boid(i, o) {
    this.acceleration = createVector(0, 0),
    this.velocity = createVector(random(-1, 1), random(-1, 1)),
    this.position = createVector(i, o),
    this.r = 3,
    this.maxspeed = 3,
    this.maxforce = .05
}
console.log("Twitter birds flocking inspired by  Craig Reynolds' boid simulations.");
var flock, text, birdImage;
Flock.prototype.run = function() {
    for (var i = 0; i < this.boids.length; i++)
        this.boids[i].run(this.boids)
}
,
Flock.prototype.addBoid = function(i) {
    this.boids.push(i)
}
,
Flock.prototype.removeBoid = function(i) {
    this.boids.shift(),
    this.boids.length--
}
,
Boid.prototype.run = function(i) {
    this.flock(i),
    this.update(),
    this.borders(),
    this.render()
}
,
Boid.prototype.applyForce = function(i) {
    this.acceleration.add(i)
}
,
Boid.prototype.flock = function(i) {
    var o = this.separate(i)
      , t = this.align(i)
      , e = this.cohesion(i);
    o.mult(1.5),
    t.mult(1),
    e.mult(1),
    this.applyForce(o),
    this.applyForce(t),
    this.applyForce(e)
}
,
Boid.prototype.update = function() {
    this.velocity.add(this.acceleration),
    this.velocity.limit(this.maxspeed),
    this.position.add(this.velocity),
    this.acceleration.mult(0)
}
,
Boid.prototype.seek = function(i) {
    var o = p5.Vector.sub(i, this.position);
    o.normalize(),
    o.mult(this.maxspeed);
    var t = p5.Vector.sub(o, this.velocity);
    return t.limit(this.maxforce),
    t
}
,
Boid.prototype.render = function() {
    var i = this.velocity.heading() + radians(90);
    fill(127),
    stroke(0),
    push(),
    translate(this.position.x, this.position.y),
    rotate(i),
    image(birdImage, 0, 2 * this.r / 3, 15, 15),
    pop()
}
,
Boid.prototype.borders = function() {
    this.position.x < -15 && (this.position.x = width + 15),
    this.position.y < -15 && (this.position.y = height + 15),
    this.position.x > width + 15 && (this.position.x = -15),
    this.position.y > height + 15 && (this.position.y = -15)
}
,
Boid.prototype.separate = function(i) {
    for (var o = 25, t = createVector(0, 0), e = 0, s = 0; s < i.length; s++) {
        var r = p5.Vector.dist(this.position, i[s].position);
        if (r > 0 && o > r) {
            var n = p5.Vector.sub(this.position, i[s].position);
            n.normalize(),
            n.div(r),
            t.add(n),
            e++
        }
    }
    return e > 0 && t.div(e),
    t.mag() > 0 && (t.normalize(),
    t.mult(this.maxspeed),
    t.sub(this.velocity),
    t.limit(this.maxforce)),
    t
}
,
Boid.prototype.align = function(i) {
    for (var o = 50, t = createVector(0, 0), e = 0, s = 0; s < i.length; s++) {
        var r = p5.Vector.dist(this.position, i[s].position);
        r > 0 && o > r && (t.add(i[s].velocity),
        e++)
    }
    if (e > 0) {
        t.div(e),
        t.normalize(),
        t.mult(this.maxspeed);
        var n = p5.Vector.sub(t, this.velocity);
        return n.limit(this.maxforce),
        n
    }
    return createVector(0, 0)
}
,
Boid.prototype.cohesion = function(i) {
    for (var o = 50, t = createVector(0, 0), e = 0, s = 0; s < i.length; s++) {
        var r = p5.Vector.dist(this.position, i[s].position);
        r > 0 && o > r && (t.add(i[s].position),
        e++)
    }
    return e > 0 ? (t.div(e),
    this.seek(t)) : createVector(0, 0)
}
;
