var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "start"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}
function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(300,450);
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.35
  ghost.debug=false;
  ghost.setCollider("rectangle",0,30,180,240 )

  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw() {
  if(gameState==="start"){
    background("green")
    fill("white")
    textSize(30)
    text("Press Space to start jumping",100,300)
    if(keyDown("space")){
      gameState="play"
    }
  }

  if(gameState==="play"){
    ghost.velocityY+=0.8

    if(keyDown("space")){
      ghost.velocityY=-10
    }
   
    if(keyDown("right_arrow") && ghost.x<550){
      ghost.x+=5
    }
    if(keyDown("left_arrow") &&  ghost.x>50){
      ghost.x-=5
    }
  
    ghost.collide(climbersGroup)
  
    spawnDoor();
    spawnPlatform();
  
    if(tower.y>500){
      tower.y=300
    }
    if(ghost.isTouching(invisibleBlockGroup)||ghost.y>600){
       gameState="end";
    }  

    drawSprites()
  }

  if(gameState==="end"){
    background("black");
    ghost.destroy();
    climbersGroup.destroyEach();
    doorsGroup.destroyEach();
    tower.destroy();
    textSize(50)
    text("Game Over",150,300)
  }
}

function spawnDoor(){
  if(frameCount%220===0){
    door=createSprite(random(100,400),-25);
    door.addImage("door",doorImg);
    door.scale=0.9
    door.velocityY=2
    ghost.depth=door.depth+1
    door.lifetime=320
    doorsGroup.add(door);
  }


}

function spawnPlatform(){
  if(frameCount%220===0){
    climber=createSprite(door.x,door.y+65)
    climber.addImage("climber",climberImg);
    invisibleBlock=createSprite(door.x,door.y+80,climber.width,5);
    climber.velocityY=2
    invisibleBlock.velocityY=2
    climber.lifetime=300
    invisibleBlock.lifetime=300;
    invisibleBlock.visible=false
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}