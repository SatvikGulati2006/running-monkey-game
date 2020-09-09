var PLAY =1;
var END =0;
var gameState =PLAY;
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground ;
var SurvivalTime =0;
var invisibleground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey =createSprite(50,160,20,50);
  monkey.addAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  monkey.scale =0.1;
  
  ground =createSprite(400,350,800,10);
  ground.velocityX = -(6 + 3*SurvivalTime/100);
  ground.x =ground.width/2;
  ground.visible =false;

  
  invisibleground =createSprite(400,360,800,10);
  
  obstacleGroup = new Group ();
  bananaGroup = new Group ();
 
SurvivalTime =0;
  
  
}


function draw() {
background(250);
  stroke("black");
  textSize (20);
  fill("black");
   text("Survival Time: "+SurvivalTime,100,50);

  
  if (gameState===PLAY) {
//print the text for score outside gamestate play  
    //wrong function: SurvivalTime =SurvivalTime +Math.round(getFrameRate/60)  
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")&& monkey.y>=159) {
    monkey.velocityY = -10; 

  }
  
  monkey.velocityY = monkey.velocityY +0.5
  
    monkey.collide(invisibleground);
    
  if(monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach ();
     SurvivalTime =SurvivalTime + 1;

  }

    
  if(monkey.isTouching(obstacleGroup)) {
    gameState =END;

  }
  food ();
  obstacles ();

  }
  //You can gice if condition after drawSprites
     if (gameState === END) {
        stroke("black");
  textSize (20);
  fill("black");
  text("Game Over",150,200);


 //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
        
      bananaGroup.setlifetimeEach =(-1);
      obstacleGroup.setlifetimeEach =(-1);
      
      SurvivalTime =0;
          
 }
  drawSprites();

}

function food() {
  if(frameCount%80 ===0){
var banana =createSprite(550,140,20,20);
    banana.addImage(bananaImage);
    banana.velocityX = -6;
    banana.lifetime =250;
    banana.scale =0.08;
 bananaGroup.add(banana);
}
}
function obstacles() {
  if(frameCount%100 ===0){
    var obstacle =createSprite(450,330,20,20);
    obstacle.addImage(obstacleImage)
    obstacle.velocityX =-5;
    obstacle.lifetime =250;
    obstacle.scale =0.15;
  obstacleGroup.add(obstacle);
}
}