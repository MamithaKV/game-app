let game;
let gameWidth =360;
let gameHeight =640;
let context;

let birdWidth=34;
let birdHeight=24;
let birdX=gameWidth/8; //horizontalposition of bird (360/8)
let birdY =gameHeight/2; //vertical position of bird(640/2)
let birdImg;

let bird={
    x:birdX,
    y:birdY,
    width:birdWidth,
    height:birdHeight
}

// pipes
let pipeArray=[];
let pipeWidth=64;
let pipeHeight = 512;
let pipeX=gameWidth;
let pipeY=0


let topPipeImg;
let bottomPipeImg;

// velocity
 let velocityX=-2;//pipes moving left speed
 let velocityY = 0;//bird jump speed
 let gravity =0.4;

let gameOver =false;
let score=0;

window.onload=function(){
    game=document.getElementById("game");
    game.height =gameHeight;
    game.width=gameWidth;
    context=game.getContext("2d");
    
    // bird
    // context.fillStyle = "green"
    // context.fillRect(bird.x,bird.y,bird.height,bird.width)


    // bird image
    birdImg = new Image();
    birdImg.src="./bird.png";
    birdImg.onload=function(){
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height)
    }

   topPipeImg=new Image();
   topPipeImg.src="./toppipe.png"

   bottomPipeImg=new Image();
   bottomPipeImg.src="./bottompipe.png"

    requestAnimationFrame(update);

    setInterval(placePipes,1500)//every 1500seconds pipe call
    document.addEventListener("keydown",moveBird);
}
function update(){
    requestAnimationFrame(update);
    if(gameOver){
        return;
    }
    context.clearRect(0,0,game.width,game.height);

    velocityY +=gravity;
   //bird.y +=velocityY;
   bird.y=Math.max(bird.y + velocityY,0);//gravity apply for bird.y,
    context.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height,)

    if(bird.y > game.height ){
        gameOver=true;
    }

    // pipe
    for(let i=0;i<pipeArray.length;i++){
        let pipe=pipeArray[i];
        pipe.x +=velocityX;
        context.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);

  if(!pipe.passed && bird.x > pipe.x + pipe.width){
    score +=0.5;
    pipe.passed=true;
  }

    if(detectCollision(bird,pipe)){
        gameOver=true;
    }

    }
while(pipeArray.length >0 && pipeArray[0].x < -pipeWidth){
    pipeArray.shift();

}

    // score
    context.fillStyle ="white";
    context.font="45px sans-serif";
    context.fillText(score,5,45);

    if(gameOver){
        context.fillText("GAME OVER",5,90);
    }
}

function placePipes(){
    if(gameOver){
        return;
    }

    let randomPipeY=pipeY-pipeHeight/4-Math.random()*(pipeHeight/2);
    let openingSpace=game.height/4;

    let topPipe={
        img:topPipeImg,
        x:pipeX,
        y:randomPipeY,
        width:pipeWidth,
        height:pipeHeight,
        passed:false
    }
    pipeArray.push(topPipe);
   let bottompipe={
    img:bottomPipeImg,
    x:pipeX,
    y:randomPipeY + pipeHeight + openingSpace,
    width:pipeWidth,
    height:pipeHeight,
    passed:false

   }
   pipeArray.push(bottompipe);
}
function moveBird(e){
    if(e.code=="space" || e.code == "ArrowUp" || e.code == "keyX" ){
        // jump
        velocityY=-6;
    //    reset
    if(gameOver){
        bird.y=birdY;
        pipeArray=[],
        score=0,
        gameOver=false;
    }
    }
}
function detectCollision(a,b){
    return a.x<b.x + b.width &&
    a.x + a.width >b.x &&
     a.y <b.y + b.height &&
     a.y +a.height >b.y;
}