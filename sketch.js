var Trex, Trexcorrendo, solo, solomexendo, solo2, nuvens, imagemNuvens, Cactos, Cactos1, Cactos2, Cactos3, Cactos4, Cactos5, Cactos6, estadoDejogo, Trexparado, Trexmorto, grupoDecactos, grupoDenuven, gameOver, imagemgameOver, restart, imagemrestart
  
var play = 1
var end = 0

var placarTrex = 0

var placarMax = 0

var placarTrex1, placarMax1 

var musicaMorte, musicaPular, musicaCheckPoint

function preload() {
  Trexcorendo = loadAnimation("trex1.png","trex3.png","trex4.png")
  Trexmorto = loadImage("trex_collided.png")
  Trexparado = loadImage("trex1.png")
  solomexendo = loadImage("ground2.png")
  imagemNuvens = loadImage("cloud.png")
  Cactos1 = loadImage("obstacle1.png")
   Cactos2 = loadImage("obstacle2.png")
   Cactos3 = loadImage("obstacle3.png")
   Cactos4 = loadImage("obstacle4.png")
   Cactos5 = loadImage("obstacle5.png")
   Cactos6 = loadImage("obstacle6.png")
  imagemgameOver = loadImage("gameOver.png")
  imagemrestart = loadImage("restart.png")
  musicaMorte = loadSound("die.mp3")
  musicaPular = loadSound("jump.mp3")
  musicaCheckPoint = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight-50)
    Trex = createSprite(50,height,30,40)

    Trex.addAnimation("parado",Trexparado)
    Trex.addAnimation("morto",Trexmorto)
    Trex.addAnimation("vivo",Trexcorendo)
  
    solo = createSprite(300,height-35,700,10)
 
   solo2 = createSprite(300,height,700,10)
   solo2.visible = false
  
    solo.addImage(solomexendo)
  
   gameOver = createSprite(width/2,height/2)
   gameOver.addImage(imagemgameOver)
  gameOver.visible = false
  
  restart = createSprite(width/2,height/2-60)
  restart.addImage(imagemrestart)
  restart.visible = false
  
  grupoDecactos = new Group()
  
  grupoDenuvens = new Group()
  
}


function draw(){
  background("white")
  
  
  if(placarTrex %100 == 0 && placarTrex > 0) {
    
    musicaCheckPoint.play()
    
  }
  
  Trex.setCollider("circle",0,0,45)
    drawSprites();
  
  if(keyDown("up") && estadoDejogo!== play && estadoDejogo!== end) {
  
    estadoDejogo = play
   
 }

  Trex.collide(solo2)
  
  if(solo.x < 0) {
   
    solo.x = solo.width/2
   
  }
  
  if(estadoDejogo == play) {
    
    if(frameCount %3 == 0)  {
      
      placarTrex = placarTrex+1
    
  }
      
    if(Trex.isTouching(grupoDecactos)) {
      
      estadoDejogo = end
      
      musicaMorte.play();
      
    }
    
    if(keyDown("up") && Trex.y > height-60) {
  
   Trex.velocityY = -12
   musicaPular.play();
      
 }
    Trex.changeAnimation("vivo")
    
    Trex.velocityY = Trex.velocityY +0.5
    
    solo.velocityX = -(4 + 3*placarTrex/100);
    
  gerarNuvens() 
  
  gerarCactos()
    
  }else if(estadoDejogo == end) {
    
    Trex.changeAnimation("morto")
    grupoDecactos.setVelocityXEach(0)
    solo.velocityX = 0
    grupoDenuvens.setVelocityXEach(0)
    
    grupoDenuvens.setLifetimeEach(-1)
    grupoDecactos.setLifetimeEach(-1)
     
    gameOver.visible = true
    restart.visible = true
    
    if(keyDown("up")|| (mousePressedOver(restart) && restart.visible == true)) {
   
      grupoDecactos.destroyEach()
      grupoDenuvens.destroyEach()
      
    gameOver.visible = false
    restart.visible = false
    
      estadoDejogo = play
   
     placarTrex = 0
      
    }
  }
  
  fill("black")
  text(placarTrex.toString().padStart(5,0), width-100,25)
  
  text(placarMax.toString().padStart(5,0), width-150,25)
  
  
  
  if(estadoDejogo == end && placarTrex > placarMax) {
    
    placarMax = placarTrex
    
  }
}

function gerarNuvens() {

    if(frameCount %50 == 0) {
    
    nuvens = createSprite(width,50)
  
    nuvens.velocityX = -(4 + 2*placarTrex/100);
    
    nuvens.addImage(imagemNuvens)
      
    nuvens.y = random (50,height-100)
    
    Trex.depth = nuvens.depth
      
    nuvens.depth = Trex.depth -1
     
      nuvens.lifetime = 230
      
      grupoDenuvens.add(nuvens)
      
  }
  
}

function gerarCactos() {
  
  if(frameCount %100 == 0) {
    
    Cactos = createSprite(width,height-37)
    
    Cactos.velocityX = -(4 + 3*placarTrex/100);
    
    var X = Math.round(random(5,6))
    
    switch(X) {
        
        case 1: Cactos.addImage (Cactos1)
        break;
        case 2: Cactos.addImage (Cactos2) 
        break;
        case 3: Cactos.addImage (Cactos3)
        break;
        case 4: Cactos.addImage (Cactos4)
        Cactos.scale = 0.6
        break;
        case 5: Cactos.addImage (Cactos5)
        Cactos.scale = 0.7
        break;
        case 6: Cactos.addImage (Cactos6)
        Cactos.scale = 0.5
        break;
        
   }
    Cactos.lifetime = 230
    
    grupoDecactos.add(Cactos)
    
  }
 }
