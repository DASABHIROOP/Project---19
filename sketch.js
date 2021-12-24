var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mainPlayer,mainPlayer_running;
var dog,dog_running;
var jungle,invisibleGround,jungleImage;
var gameOverImage,restartImage,gameOver,restart;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

var score;

function preload(){
mainPlayer_running = loadAnimation("mainPlayer1.png","mainPlayer2.png");
dog_running = loadAnimation("dog1.png","dog2.png","dog3.png","dog4.png","dog5.png","dog6.png","dog7.png");
jungleImage = loadImage("jungleScene.png");

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");

gameOverImage = loadImage("gameOver.png");
restartImage = loadImage("restart.png");6

}

function setup() {
 createCanvas(windowWidth,windowHeight);

 jungle = createSprite(width/2,height/2);
 jungle.addImage("jungle",jungleImage);
 jungle.scale = 2.3;

 mainPlayer = createSprite(width/2-200,height/2+180);
 mainPlayer.addAnimation("running",mainPlayer_running);
 mainPlayer.scale = 5;
 
 dog = createSprite(width/2-500,height/2+260);
 dog.addAnimation("running",dog_running);
 dog.scale = 5;

 gameOver = createSprite(width/2,height/2);
 gameOver.addImage(gameOverImage);
 gameOver.scale = 5;

 restart = createSprite(width/2,height/2+50);
 restart.addImage(restartImage);
 restart.scale = 2;

 invisibleGround = createSprite(600,602,2000,5);
 invisibleGround.visible = false;

 obstaclesGroup = createGroup();

 mainPlayer.setCollider("rectangle",0,0,18,28);
 mainPlayer.debug = false;

 score = 0;
}

function draw() {
 background("black");

 if(gameState === PLAY){

   jungle.velocityX = -7;
   score = score + Math.round(frameCount/60);
 
  if (jungle.x < 0){
     jungle.x = width/2;
    }

  if(keyDown("space")&& mainPlayer.y >=100) {
     mainPlayer.velocityY = -13;
  }

  mainPlayer.velocityY = mainPlayer.velocityY + 0.8;

   gameOver.visible = false;
   restart.visible = false;

   spawnObstacles();

   if(obstaclesGroup.isTouching(mainPlayer)){
     gameState = END;
 }

}
  if (gameState === END) {
    jungle.velocityX = 0;

    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    gameOver.visible = true;
    restart.visible = true;

    mainPlayer.velocityY = 0;
 }

 mainPlayer.collide(invisibleGround);

 drawSprites();
 text("Score: "+ score, 80,50);
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(800,550,10,400);
    obstacle.velocityX = -6;

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;

      obstacle.scale = 0.7;
      obstacle.lifetime = 300;

      obstaclesGroup.add(obstacle);
    }
  }
}
      
