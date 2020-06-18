const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//gamestate(I KNOW THIS till YET!!!)
var gameState = "start";

var world,engine,tester;
var bird,slingshot,ground;
var bg1,bg2,bg3,bg4,bg5;
var pig1,red1,red3,ship1,ship,darth_vader1,gordon1,prison1,red2;
var gordon,pig2,pig3,pig4,darth_vader,red,prison,bubble_chat1,bubble_chat2,bubble_chat,bubble_chat3,bubble_chat4;
var bottomEdge, missile, missile1;
var shuriken1,shuriken2,button,obstacle,obstacle1;
function preload(){
  bg1 = loadImage("ship_background.jpg");
  bg2 = loadImage("playing_background.png");
  bg3 = loadImage("exploded_background.jpg");
  bg4 = loadImage("lose_background.jpg");
  bg5 = loadImage("61nCj8WGvhL._AC_SL1024_.jpg")

  gordon1 = loadImage("gordon.png");
  pig1 = loadImage("pig.png");
  prison1 = loadImage("prison.png");
  red2 = loadImage("red_deafeated.png");
  red3 = loadImage("red_play.png");
  red1 = loadImage("red_win.png");
  darth_vader1 = loadImage("darth_vader.png");
  ship1 = loadImage("ship.png");
  bubble_chat1 = loadImage("wigflip-ds.png");
  bubble_chat2 = loadImage("pixel-speech-bubble (1).png");
  bubble_chat3 = loadImage("pixel-speech-bubble (3).png")
  missile1 = loadImage("missile.png")
}
function setup() {
  createCanvas(1300,695);

  bottomEdge = createSprite(650,695,1300,10);
  bottomEdge.visible = false;

  engine = Engine.create();
  world = engine.world;

  gordon = createSprite(120,600,10,10);
  gordon.addImage(gordon1);
  gordon.scale = 0.4;

  prison = createSprite(160,-100,10,10);
  prison.addImage(prison1);
  prison.velocityY = 20;
  prison.setCollider("rectangle",0,0,500,400,0);
  
  pig2 = createSprite(-50,640,10,10);
  pig2.addImage(pig1);
  pig2.scale = 0.2;

  pig3 = createSprite(-100,640,10,10);
  pig3.addImage(pig1);
  pig3.scale = 0.2;

  pig4 = createSprite(-150,640,10,10);
  pig4.addImage(pig1);
  pig4.scale = 0.2;
  
  red = createSprite(1000,-100);
  red.addImage(red3);
  red.scale = 0.15;
  red.setCollider("rectangle",0,0,1000,1350,0);

  bubble_chat = createSprite(1050,470);
  bubble_chat.addImage(bubble_chat1);
  bubble_chat.visible = false;
  
  bubble_chat4 = createSprite(1050,470);
  bubble_chat4.addImage(bubble_chat3);
  bubble_chat4.visible = false;

  ship = createSprite(650,560,10,10);
  ship.addImage(ship1);
  ship.visible = false;

  missile = createSprite(650,347,10,10);
  missile.addImage(missile1);
  missile.visible = false;
  missile.scale = 0.5

  bird = new Bird(200,50);
  slingshot = new SlingShot(bird.body,{x:200, y:50});
  ground = new Ground(100,height,250,1000);
  shuriken1 = new Shuriken(525,0);
  shuriken2 = new Shuriken(525,-60);
  obstacle = new Ground(1100,100,10,300);
  obstacle1 = new Ground(1100,500,10,300);

  tester = createSprite(0,0,50,50);
  tester.visible = false;
  //button = new Button(1100,347,10,25);
}

function draw() {
  Matter.Body.setMass(bird.body,10)
  Engine.update(engine);

  if(shuriken1.body.position.y < 600){
    Matter.Body.setVelocity(shuriken1.body,{x:0,y:5});
  }else{
  Matter.Body.setVelocity(shuriken1.body,{x:0,y:-1000});
  }

  if(shuriken2.body.position.y < 600){
    Matter.Body.setVelocity(shuriken2.body,{x:0,y:5});
  }else{
  Matter.Body.setVelocity(shuriken2.body,{x:0,y:-1000});
  }

  if(gameState === "start"){
    background(bg1);

    if(prison.isTouching(bottomEdge)){
      pig3.velocityX = 10;
      pig4.velocityX = 10;
      pig2.velocityX = 10;
      red.velocityY = 29;
    }
    if(pig2.x === 350){
      pig2.velocityX = 0;
    }
    if(pig3.x === 450){
      pig3.velocityX = 0;
    }
    if(pig4.x === 550){
      pig4.velocityX = 0;
      fill("white");
      text("PRESS SPACE TO CONTINUE",500,300); 
    }
    if(red.isTouching(bottomEdge)){
      bubble_chat.visible = true;
    }
    if(keyDown("space")){
      gameState = "play";
    }
  }  

  if(gameState === "play"){
    background(bg2);
    
    bubble_chat.visible = false;
    pig2.velocityX = -20;
    pig3.velocityX = -20;
    pig4.velocityX = -20;
    red.velocityX = -20;
    prison.velocityX = -20;
    gordon.velocityX = -20;

    if(red.x === 100){
      red.velocityX = 0;
      red.visible = false;
      bird.display();
      slingshot.display();
      ground.display();
      shuriken1.display();
      shuriken2.display();
      obstacle.display();
      obstacle1.display();
    }else{}
    if(bird.body.position.x > 350 && bird.body.position.x < 400){
      Matter.Body.applyForce(bird.body, bird.body.position, {x:0.8,y:1});
    }
    if(bird.body.position.x > 550 && bird.body.position.x < 600){
      Matter.Body.applyForce(bird.body, bird.body.position, {x:1,y:-1});
    }
    if(bird.body.position.y>700||bird.body.position.y < -50||bird.body.position.x<0){
      gameState = "end_lose";
    }
    if(bird.body.position.x>1300){
      gameState = "finale";
    }
    
}  
if(gameState === "end_lose"){
  background(bg4);
  red.visible = true;
  red.x = 800;
  red.y = 500;
  red.addImage(red2);
  red.scale = 1;
  red.velocityX = -30;
  //red.velocityY = -3;

  bubble_chat.visible = true;
  bubble_chat.x = 800;
  bubble_chat.y = 400;
  bubble_chat.addImage(bubble_chat2);
  bubble_chat.scale = 0.5;


}
if(gameState === "finale"){
  background(bg1);
  red.x = mouseX;
  red.y = mouseY;
  red.visible = true;
  ship.visible = true;


  if(ship.isTouching(red)){
    ship.setCollider("rectangle",0,0,10000,10000,0);
    ship.velocityY = -4;
    red.x = ship.x;
    red.y = ship.y-30;
    red.scale = 0.1;
    red.addImage(red1);
    if(ship.y < 500){
      ship.velocityY = 0;
      fill("white");
      text("PRESS THE MOUSE TO TRIGGER A MISSILE",650,347);
      if(mouseDown()){
        missile.visible = true;
        missile.velocityX = 20;
      }
      if(missile.x>1500){
        background(bg5);
        tester.velocityY = 10;
        if(bottomEdge.y - tester.y < 50){
          background(bg3);
            gameState = "end";
          
      }
    }
  }
}
  if(gameState === "end"){
    background(bg3);
    //ship.x = 0;
   // ship.velocityX = 7;
    gordon.velocityX = 0;
    gordon.visible = true;
    gordon.scale = 0.2;
    gordon.x = ship.x - 50;
    gordon.y = ship.y - 35;

    bubble_chat4.visible = true;
    bubble_chat4.addImage(bubble_chat3);
    bubble_chat4.x = ship.x;
    bubble_chat4.y = ship.y - 325;
    //bubble_chat4.velocityX = 7;
}
}
  drawSprites();
  createEdgeSprites();
  tester.collide(bottomEdge);
  prison.collide(bottomEdge);
  red.collide(bottomEdge);
  //console.log(score);
}
function mouseDragged(){
  if(bird.body.position.x<350){
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
  }
}
function mouseReleased(){
  if(gameState === "play"){
  slingshot.fly();
  }
}