var monkey, banana, obstacle, invisibleGround, backGround;
var monkey_running, bananaImage, obstacleImage, gameOver, start;
var bg, oG;
var score = 0;
var START = 1;
var PLAY = 2;
var END = 3;
var gameState = START;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOver = loadImage("aee908fa559f95b3ebe56b366d4bd32a-1400x788.jpg");
  start = loadImage("jungle.jfif");

  bg = new Group();
  oG = new Group();
}

function setup() {
  createCanvas(600, 400);

  monkey = createSprite(40, 350, 10, 10);
  monkey.addAnimation("hi", monkey_running);
  monkey.scale = 0.1;

  invisibleGround = createSprite(300, 380, 2000, 1);
  invisibleGround.visible = false;
  
  backGround = createSprite(300, 200, 600, 400);

}

function draw() {
  background(rgb(44, 161, 250));
  
  if(gameState === START){
    backGround.addImage(start);
    backGround.scale = 2.5;
    
    if(keyDown("space")) {
      gameState = PLAY;
    }
  }
  else if (gameState === PLAY) {
    backGround.visible = false;
    
    //banana spawn
    bananas();
    //point tallying (increment by 10)
    points();

    //monkey jumps
    if (keyDown("space")) {
      monkey.velocityY = -10;
    }
    
    //gravity
    monkey.velocityY = monkey.velocityY + 1;

    //monkey collects bananas
    if (monkey.isTouching(bg)) {
      bg.destroyEach();
      score = score + 10;
    }

    //obstacle spawn
    stones();

    //monkey's death MWHAHAHAHAHAHAHA!!!
    if (oG.isTouching(monkey)) {
      gameState = END;
    }
  }
  else if (gameState === END) {    
    oG.setVelocityXEach(0)
    bg.setVelocityXEach(0)
    
    //gravity
    monkey.velocityY = monkey.velocityY + 1;
    
    //background change
    backGround.visible = true;
    backGround.addImage(gameOver);
    backGround.scale = 0.5;    
    
    //destroying the banana and obstacle sprite
    oG.destroyEach();
    bg.destroyEach();
    
    if(keyDown("r")){
      gameState = PLAY;
      score = 0;
    } 
    

  }

  //ground
  fill(rgb(155, 118, 83));
  rect(0, 370, 600, 30);

  //collides with invisibleGround
  monkey.collide(invisibleGround);

  //scrolling ground
  invisibleGround.velocityX = -5;
  if (invisibleGround.x === 0) {
      invisibleGround.x = invisibleGround.x + 300;
    }

  
  drawSprites();
  
  if(gameState === END) {
    fill('yellow');
    textFont("Trebuchet MS");
    textSize(30);
    text("Oh no! your monkey slipped...", 110, 200);
    fill('white');
    text("Wanna try again?", 200, 240);
    textSize(20);
    text("Press R", 270, 270);
  }
  if(gameState === START) {
    fill('white');
    textFont("Trebuchet MS");
    textSize(40);
    textStyle('bold');
    fill('yellow');
    text("HELLO, MY MONKEYS!", 100, 190);
    textSize(25);
    fill('white');
    textStyle('italic');
    text("Press space to make the monkey jump and continue", 10, 220);
  }
}



function bananas() {
  if (frameCount % 100 === 0) {
    banana = createSprite(500, 10, 10, 10);
    banana.addImage(bananaImage);

    banana.y = round(random(10, 330));
    banana.velocityX = -5;
    banana.lifetime = 100;
    banana.scale = 0.1;
    bg.add(banana);
  }
}

function points() {
  textSize(22);
  textFont("Times New Roman");
  fill("black");
  stroke(10);
  text("Points: " + score, 10, 20);
}

function stones() {
  if (frameCount % 80 === 0) {
    obstacle = createSprite(150, 360, 10, 10);

    obstacle.addImage("obstacle", obstacleImage);
    obstacle.x = round(random(600, 3000));
    obstacle.velocityX = -9;
    obstacle.scale = 0.1;

    oG.add(obstacle);
  }
}