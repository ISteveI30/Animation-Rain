const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 600;

const spriteImg = new Image();
spriteImg.src = '/img/sprite2.png'

const backgroundImg = new Image();
backgroundImg.src = '/img/fondo2.jpg'

const sound = new Audio('/audio/flashback.mp3')

const spriteWidth = 48;
const spriteHeight = 48;
const zoomX = 62;
const zoomY = 62;
let frameX = 0;
let frameY = 0;

let posX = -zoomX;//Character row 1
let posX2 = CANVAS_WIDTH;//Character row 2
let posY = CANVAS_HEIGHT-zoomY*2.7;

let charatcerStatus = ''; 

let animationFrame = 0;
const staggerFrames  = 20;

const typeCharacter=0;
//top row 0, 3, 6, 9
//below row 0, 3, 6, 9 

let drops = []

let timer = 600;//women
let timer2 = 1100;//man
let timer3 = 350;//rain

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
};
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
};
function loopSprite(posX,typeCharacter,row){
    direction(row);
    let position = Math.floor(animationFrame/staggerFrames)
     % spriteAnimations[charatcerStatus].loc.length; 
    //the variable position returns values equal to length
    let type=typeCharacter;
    type +=position
    let frameX = spriteWidth * type
    let frameY = spriteAnimations[charatcerStatus].loc[position].y;
    drawSprite(frameX,frameY,posX,posY); 
};
function direction(row){
    switch (row) {
        case 0:    
            if(posX<(CANVAS_WIDTH/2)-(zoomX*3/2)){
                posX+=.7;
                charatcerStatus = 'right';
            }
            if(posX>=(CANVAS_WIDTH/2)-(zoomX*3/2)){
                posX=CANVAS_WIDTH/2-(zoomX*3/2);
                //posY++;
                charatcerStatus = 'front'
            }
            break;
        case 1:
            if((CANVAS_WIDTH/2)<posX2){
                posX2-=.7;
                charatcerStatus = 'left2';
            }
            if(posX2<=(CANVAS_WIDTH/2)){
                posX2=CANVAS_WIDTH/2;
                charatcerStatus = 'front2'
            }
            break;
        default:
            break;
    } 
};
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
};
function drawRain(){
    for (let i = 0; i < drops.length; i++) {
        drops[i].draw();   
    }
};
function deleteRain(){
    for (let i = 0; i < drops.length; i++) {
        if(drops[i].y>CANVAS_HEIGHT-drops[i].h){
           drops.splice(i,1);
        }
    }
};
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    sound.play();
    stage(); 
    if(timer==0){  
       loopSprite(posX,typeCharacter,0)//women
        timer=0
    }
    else { timer--; }

    if(timer2==0){  
        loopSprite(posX2,typeCharacter,1);//man
        timer2=0   
    }
    else { timer2--; }

    if(timer3==0){
        timer3=0
        addRain(5);
    }
    else{ timer3--; }

    drawRain();
    deleteRain();
    animationFrame++;
    requestAnimationFrame(animate); 
};
animate();
