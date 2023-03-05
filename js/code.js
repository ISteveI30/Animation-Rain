const canvas = document.getElementById('mycanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const spriteImg = new Image();
spriteImg.src = '/img/sprite2.png'

let playerStatus = 'front'; 

const spriteWidth = 48;
const spriteHeight = 48;
const zoomX = 100;
const zoomY = 100;

let frameX = 0;
let frameY = 0;

let animationFrame = 0;
const staggerFrames  = 25;

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

function drawSprite(frameX,frameY){
    ctx.drawImage(
        spriteImg, 
        frameX, 
        frameY, 
        spriteWidth, 
        spriteHeight, 
        0, //posx
        CANVAS_HEIGHT-zoomY, //posy
        zoomX, 
        zoomY
        );
}

function loopSprite(typeCharacter){
    let position = Math.floor(animationFrame/staggerFrames)
     % spriteAnimations[playerStatus].loc.length; 
    //the variable position returns values equal to length
    console.log(position)
    let type=typeCharacter;
    type +=position
    let frameX = spriteWidth * type
    let frameY = spriteAnimations[playerStatus].loc[position].y;
    drawSprite(frameX,frameY);
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