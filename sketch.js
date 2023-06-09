const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var sun;
var xPos;
var cloudsArray;
var cloud, cloud1, cloud2;
var cloudImage;
var fruit, rope, linkFruit;
var fruit1, rope1, linkFruit1
var randomFruit, randomFruit1, randomFruit2
var cucumber, tomato, carrot, fruitImage, fontClock, fontFun, primaryCount

var switchStation, points;
var render, fruitArray
var bunnyPng, bunnyEat;

function preload() {
 sun = loadImage("sun.png")
  cucumber = loadImage("cucumber.png")
  tomato = loadImage("tomato.png")
  carrot = loadImage("carrot.png")
  bunnyEat = loadAnimation(
    "eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png"
  )

  cloudImage = loadImage("cloud.png")

  fontClock = loadFont("TiroDevanagariHindi-Regular.ttf")
  fontFun = loadFont("ComicNeue-Bold.ttf")

  primaryCount = 0
}

function setup() {
  createCanvas(windowWidth, windowHeight);


  engine = Engine.create();
  
  world = engine.world;

  ground = new Ground(width / 270, height - 70, width * 3, 50)
  xPos = Math.round(random(width - 800, 800))
  bunnyPng = loadImage("eat_1.png")
  cloudsArray = [0, 1, 2]
  switchStation = 1
  swichCount = 0


  
  randomFruit = Math.round(random(1, 3))
  randomFruit1 = Math.round(random(1, 3))
  randomFruit2 = Math.round(1, 3)

  cloud = createSprite(xPos, 100, 50,30)
  cloud1 = createSprite(xPos + 270, 100, 50 , 30)
  cloud2 = createSprite(xPos + 540, 100, 50 , 30)

  bunnySprite = createSprite(width / 1.08, height / 1.25)
  bunnySprite.addImage(bunnyPng)
  bunnySprite.scale = 0.3

  switchCount = 0

  cloud.addImage(cloudImage, xPos, 100, 50,30)
  cloud1.addImage(cloudImage, xPos + 270, 100, 50 , 30)
  cloud2.addImage(cloudImage, xPos + 540, 100, 50, 30)
  cloud.scale = 0.29
  cloud1.scale = 0.29
  cloud2.scale = 0.29

  
  // Create a Matter.js renderer
render = Matter.Render.create({
  element: document.body, // Specify the HTML element to use as the container
  engine: engine // Specify the Matter.js engine to use
});
  


  if (switchStation == 1) {
    rope = new Rope(5, { x: xPos + 300, y: 100 })
    fruitOptions = {
      density: 0.00000000000000000000000000000000000000000000000001,
      gravity: 0.5,
      isStatic: false,
      frictionAir : 0
    }

    
    fruit = Matter.Bodies.circle(300, 300, 15, fruitOptions)

    Matter.Composite.add(rope.body, fruit)

    linkFruit = new Link(rope, fruit)

    console.log(fruit)


    rope1 = new Rope(5, { x: xPos + 570, y: 100 })

    fruit1 = Matter.Bodies.circle(300, 300, 15, fruitOptions)

    Matter.Composite.add(rope1.body, fruit1)

    linkFruit1 = new Link(rope1, fruit1)

    rope2 = new Rope(5, { x: xPos + 30, y: 100 })

    fruit2 = Matter.Bodies.circle(300, 300, 15, fruitOptions)

    Matter.Composite.add(rope2.body, fruit2)

    linkFruit2 = new Link(rope2, fruit2)

    fruitArray = [fruit, fruit1, fruit2]

    
  }

  

// Run the renderer
Matter.Render.run(render);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}


function draw() {

  background("#2887e5");

  Engine.update(engine);




  image(sun, -200, -200, 500, 500)
  ground.display()

  if (switchStation == 1) {
    for (var i = 0; i <= fruitArray; i++) {
        if (collide(i, bunnySprite)) {
           switchS()
           console.log("The for and if are not the problem, unless you have not got this message.")
        }
    }
  }
  


  


  switch (randomFruit) {
    case 1: image(cucumber, fruit.position.x, fruit.position.y, 100, 100)
      break
    case 2: image(tomato, fruit.position.x, fruit.position.y, 70, 70)
      break
    case 3: image(carrot, fruit.position.x, fruit.position.y, 100, 100)
  }

  switch (randomFruit1) {
    case 1: image(cucumber, fruit1.position.x, fruit1.position.y, 100, 100)
      break
    case 2: image(tomato, fruit1.position.x, fruit1.position.y, 70, 70)
      break
    case 3: image(carrot, fruit1.position.x, fruit1.position.y, 100, 100)
  }

  switch (randomFruit2) {
    case 1: image(cucumber, fruit2.position.x, fruit2.position.y, 100, 100)
      break
    case 2: image(tomato, fruit2.position.x, fruit2.position.y, 70, 70)
      break
    case 3: image(carrot, fruit2.position.x, fruit2.position.y, 100, 100)
  }
 


  if (switchStation == 1) {
    if (mousePressedOver(cloud)) {
        drop2()
        switchP()
    }

    if (mousePressedOver(cloud1)) {
        drop()
        switchP()
    }

    if (mousePressedOver(cloud2)){
        drop1()
        switchP()
    }
}

  if (switchStation == 1) {

    fill("blue")
    rope.show()


    fill("brown")
    rope1.show()

    fill("black")
    rope2.show()
  }



  drawSprites()

  fill("00008b")
  textFont(fontFun)
  textSize(50)
  text("Your Points: " + switchCount, 300, 50)


}




function drop() {
  rope.break()
  if (linkFruit) {
    linkFruit.detach()
    linkFruit = null
  }
}

function drop1() {
  rope1.break()
  if (linkFruit1) {
    linkFruit1.detach()
    linkFruit1 = null
  }
}

function drop2() {
  rope2.break()
  if (linkFruit2) {
    linkFruit2.detach()
    linkFruit2 = null
  }
}


function collide(body, sprite) {
  if (body != null) {
    var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(distance <= 40) {
        return true
        
    }

    else {
      return false
    }
  } 
}
function switchP() {
  primaryCount + 10 / 3
}

function switchS() {
    switchCount += 1
    fill("#00ced1")
    textFont(fontClock)
    textSize(25)
    text("You Got a Point!" + switchCount, grass.y, 100)
}







