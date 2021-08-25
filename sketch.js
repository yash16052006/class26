const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls = [];
var boats = [];



function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 110, 50, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y)
 // boat = new Boat(width/2, height-100, 200, 200, -100);

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  

  Engine.update(engine);
  ground.display();
  
  //boat.display();
  
  showBoats();

  cannon.display();
  tower.display();
  cannonBall.display();
 
  for(var i= 0;i<balls.length;i++){
    showCannonBalls(balls[i],i)
  }
}

function keyPressed(){
   if(keyCode===DOWN_ARROW){
     var cannonBall = new CannonBall(cannon.x, cannon.y);
     balls.push(cannonBall);

   }}

   function showCannonBalls(ball,index){
     ball.display();
     if(ball.body.position.x>=width || ball.body.position.y>=height-50){
       Matter.World.remove(world, ball.body);
       balls.splice(index, 1);
     }
   }

 function keyReleased(){
   if(keyCode===DOWN_ARROW){
     balls[balls.length-1].shoot();
   }
 }

 function showBoats(){
   if(boats.length>0){
     if(boats.length<2 && boats[boats.length-1].body.position.x<width-300){
       var positions = [-130, -100, -120, -80];
       var position = random(positions)
       var boat = new Boat(width, height-100, 200, 200, position)
       boats.push(boat)
     }
     //displayboats
     for(var i = 0; i<boats.length;i++){
       Matter.Body.setVelocity(boats[i].body,{
       x:-0.9, y:0
       })
       boats[i].display();
     }
   }
   else{
     var boat = new Boat(width,height-100, 200, 200, -100)
     boats.push(boat);
   }
 }