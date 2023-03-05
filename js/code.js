const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 600;

const spriteImg = new Image();
spriteImg.src = '/img/sprite2.png'

const backgroundImg = new Image();
backgroundImg.src = '/img/fondo2.jpg'

let charatcerStatus = 'front2'; 

const spriteWidth = 48;
const spriteHeight = 48;
const zoomX = 62;
const zoomY = 62;

let frameX = 0;
let frameY = 0;

let animationFrame = 0;
const staggerFrames  = 20;

const typeCharacter=0

const drops = []

const sound = new Audio('/audio/flashback.mp3')

const spriteAnimations = [];
const animationStates = [
    {
        name: 'front',
        frames: 3,
    },
    { 
        name: 'left',
        frames: 3,
    },
    {
        name: 'right',
        frames: 3,
    },
    {
        name: 'back',
        frames: 3,
    },
    {
        name: 'front2',
        frames: 3,
    },
    { 
        name: 'left2',
        frames: 3,
    },
    {
        name: 'right2',
        frames: 3,
    },
    {
        name: 'back2',
        frames: 3,
    }  
];

animationStates.forEach((state,index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x:positionX,y:positionY});
    }
    spriteAnimations[state.name] = frames;
});

function stage(){
    ctx.drawImage(
        backgroundImg,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
    );  
}


function drawSprite(frameX,frameY,posX,posY){
    ctx.drawImage(
        spriteImg, 
        frameX, 
        frameY, 
        spriteWidth, 
        spriteHeight, 
        posX, 
        posY, 
        zoomX, 
        zoomY
        );
}
let posX = -zoomX;
let posY = CANVAS_HEIGHT-zoomY*2.7;

function loopSprite(typeCharacter){
    let position = Math.floor(animationFrame/staggerFrames)
     % spriteAnimations[charatcerStatus].loc.length; 
    //the variable position returns values equal to length
    let type=typeCharacter;
    type +=position
    let frameX = spriteWidth * type
    let frameY = spriteAnimations[charatcerStatus].loc[position].y;
    direction();
    drawSprite(frameX,frameY,posX,posY); 
}
function direction(){
    if(posX<(CANVAS_WIDTH/2)-(zoomX*3/2)){
        posX+=.7;
        charatcerStatus = 'right';
    }
    if(posX>=(CANVAS_WIDTH/2)-(zoomX*3/2)){
        posX=CANVAS_WIDTH/2-(zoomX*3/2);
        //posY++;
        charatcerStatus = 'front'
    }/*
    if(posY>=CANVAS_HEIGHT-zoomY){
        posY=CANVAS_HEIGHT-zoomY;
    }*/
}


class Rain {
    constructor() {
        this.x= Math.random() * (CANVAS_WIDTH - 0) + 0;
        this.y= -5;
        this.w= 1;
        this.h= Math.random() * 5;
        this.dy= Math.random() * 2;
        this.gravity = 0.03;
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x,this.y,this.w,this.h);
        this.move();
    }
    move(){
        this.y += this.dy;
        this.dy += this.gravity;
    }
};

function addRain(n){
    for (let i = 0; i < n; i++) {
        drops.push(new Rain());   
    }
}
function drawRain(){
    for (let i = 0; i < drops.length; i++) {
        drops[i].draw();   
    }
}
function deleteRain(){
    for (let i = 0; i < drops.length; i++) {
        if(drops[i].y>CANVAS_HEIGHT-drops[i].h){
           drops.splice(i,1);
        }
    }
}
let timer = 0;
let timer2 = 300;
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.beginPath();
    stage();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white'
    ctx.moveTo(CANVAS_WIDTH/2, 0);
    ctx.lineTo(CANVAS_WIDTH/2, CANVAS_HEIGHT);
    ctx.stroke();
    //ctx.fillStyle = 'gray';
    //ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    //sound.play();
   
    if(timer==0){
        timer=0
        loopSprite(typeCharacter);
    }
    else{
        timer--;
    }
     /*
    if(timer2==0){
        timer2=0
        addRain(5);
    }
    else{
        timer2--;
    }*/
    //addRain(5);
    drawRain();
    deleteRain();
    animationFrame++;
    requestAnimationFrame(animate);
    
};
animate();
