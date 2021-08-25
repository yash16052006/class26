class CannonBall{
    constructor(x, y){
        var options  = {
            restitution:0.8, 
            friction:1.0,
            density:1.0, 
            isStatic:true
        }
    this.body = Bodies.circle(x, y, 40, options);
    this.image = loadImage("./assets/cannonball.png");
    this.trajectory=[];

    World.add(world, this.body)
    }

   shoot(){
       var velocity = p5.Vector.fromAngle(cannon.angle);
       velocity.mult(20);
       Matter.Body.setStatic(this.body, false);
       Matter.Body.setVelocity(this.body, {
           x:velocity.x, 
           y:velocity.y
       })
   }

    display(){
    var pos = this.body.position
    var angle = this.body.angle

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, 40, 40);
    // fill("black");
    //stroke("blue");
    //strokeWeight(7);
    //ellipseMode(RADIUS)
    //ellipse(0, 0, 25, 25)

    
    pop();
    if(this.body.velocity.x>0 && this.body.position.x>300){
        var position = [this.body.position.x,this.body.position.y];
        this.trajectory.push(position)
    }
    for(var i=0; i<this.trajectory.length;i++){
        image(this.image,this.trajectory[i][0], this.trajectory[i][1],5,5);
    }
    }
}