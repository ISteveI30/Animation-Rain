const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const spriteImg = new Image();
spriteImg.src = '/img/sprite2.png'

let charatcerStatus = 'front2'; 

const spriteWidth = 48;
const spriteHeight = 48;
const zoomX = 100;
const zoomY = 100;

let frameX = 0;
let frameY = 0;

let animationFrame = 0;
const staggerFrames  = 20;

const typeCharacter=0

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
let posY = CANVAS_HEIGHT-zoomY*3;

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
    if(posX<(CANVAS_WIDTH/2)-zoomX){
        posX++;
        charatcerStatus = 'right';
    }
    if(posX>=(CANVAS_WIDTH/2)-zoomX){
        posY++;
        charatcerStatus = 'front'
    }
    if(posY>=CANVAS_HEIGHT-zoomY){
        posY=CANVAS_HEIGHT-zoomY;
    }
}

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.fillStyle = 'gray';
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    loopSprite(typeCharacter);
    animationFrame++;
    requestAnimationFrame(animate);
};
animate();