
var score=0;
var back,backImage;
var monkey,monkeyImage
var ground;
var banana,bananaImage,bananaGroup;
var stone,stoneImage,stoneGroup;

var PLAY=1;
var END=0;
var gameState=PLAY;

function preload() {
   backImage=loadImage("jungle.jpg");
  
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage=loadImage("banana.png");
  stoneImage=loadImage("stone.png");
  

}



function setup() {
  createCanvas(400, 400);
  
   back=createSprite(200,200,400,400);
  back.addImage("jungle",backImage);
  back.velocityX=-5;
  
  
  
  monkey=createSprite(56,341,40,10);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale=0.07;
  
  ground=createSprite(400,370,800,10);
  ground.visible=false;
  ground.x=ground.width/2;
  
  bananaGroup= new Group();
  stoneGroup= new Group();
  
  
}

function draw() {
  background(220);
  
    monkey.collide(ground);
  
  drawSprites();
  
  if(gameState===PLAY){
    
    ground.x=-5;
    
    back.velocityX=-5;
    if(back.x<0){
  back.x=back.width/2;
}
  
    if(keyDown("space")&& monkey.y>302){
    monkey.velocityY=-11.5;
  }
  monkey.velocityY=monkey.velocityY+0.8;
    
    if(bananaGroup.isTouching(monkey)){
   score=score+2;
  }

  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
    
    createobstacle();
  food();
  
    if(stoneGroup.isTouching(monkey)){
      gameState=END;
    }
    
  }
  
  else if (gameState===END){
    
    text("press r to restart",200,200);
    
    if(keyDown("r")){
      reset();
    }
    
   back.velocityX=0;
   monkey.velocityY=0;
   stoneGroup.setVelocityEach(0);
   bananaGroup.setVelocityEach(0);
    
    stoneGroup.setLifetimeEach(-1);
   bananaGroup.setLifetimeEach(-1);
  }
  
 
  
  
    stroke("black")        ;
  textSize(17);
  fill("black");
    text("Score:  "+score,200,34);
  

}

function createobstacle(){
  if(World.frameCount%200===0){
  var stone=createSprite(400,346,20,20);
  stone.velocityX=-5;
  
  stone.addImage("Stone",stoneImage);
   stone.scale=0.1;
   stone.lifetime=80;
   stoneGroup.add(stone);
}
  
}

function reset(){
  gameState = PLAY;
  
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  
  score = 0;
}


function food(){
  if(World.frameCount%77===0){
    var banana=createSprite(400,Math.round(random(240,290)),40,40);
    banana.velocityX=-5;
   
    banana.addImage("banana",bananaImage);
    banana.scale=0.035;
    banana.lifetime=80;
    bananaGroup.add(banana);
  }
}


