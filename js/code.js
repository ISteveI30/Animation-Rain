const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const spriteImg = new Image();
spriteImg.src = '/img/sprite2.png'

let playerStatus = 'walk'; 

const spriteWidth = 48;
const spriteHeight = 48;
const zoomX = 100;
const zoomY = 100;
let frameX = 0;
let frameY = 0;
let animationFrame = 0;
const staggerFrames  = 25;

const spriteAnimations = [];
const animationStates = [
    {
        name: 'walk',
        frames: 3,
    },
    { 
        name: 'jump',
        frames: 3,
    }
];

animationStates.forEach((state,index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j *spriteWidth;
        let positionY = index * spriteWidth;
        frames.loc.push({x:positionX,y:positionY});
    }
    spriteAnimations[state.name] = frames;
});

function drawSprite(frameX,frameY){
    ctx.drawImage(
        spriteImg, 
        frameX , 
        frameY , 
        spriteWidth, 
        spriteHeight, 
        0, 
        0, 
        zoomX, 
        zoomY
        );
}
function loopSprite(){
    let position = Math.floor(animationFrame/staggerFrames) % spriteAnimations[playerStatus].loc.length;
    let frameY = spriteWidth + position;
    let frameX = spriteAnimations[playerStatus].loc[position].x;
    drawSprite(frameX,frameY);
}

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    loopSprite();
    animationFrame++;
    requestAnimationFrame(animate);
};
animate();