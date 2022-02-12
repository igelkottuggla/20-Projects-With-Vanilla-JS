const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close-btn');
const startBtn = document.querySelector('.start-btn');
const overlay = document.querySelector('.not-active');
const rules = document.querySelector('.rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const scoreFont = '20px Arial';
const elementsColor = '#0095dd';
const invisibleBricks = 'transparent';
const keyArrLeft = 'ArrowLeft';
const keyArrRight = 'ArrowRight';

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;
const delay = 500; //delay to reset the game

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
};

const bricks = [];

const bricksArray = () => {
    for (let i = 0; i < brickRowCount; i++) {
        bricks[i] = []

        for (let j = 0; j < brickColumnCount; j++) {
            const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
            const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
            bricks[i][j] = {x, y, ...brickInfo}
        }
    }
    return bricks;
}
bricksArray();

const drawBricks = () => {
    bricks.forEach((column) => {
        column.forEach((brick) => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? elementsColor : invisibleBricks;
            ctx.fill();
            ctx.closePath();
        });
    });
}

const drawBall = () => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true);
    ctx.fillStyle = elementsColor;
    ctx.fill();
    ctx.closePath();
}

const drawPaddle = () => {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = elementsColor;
    ctx.fill();
    ctx.closePath();
}

const drawScore = () => {
    ctx.font = scoreFont;
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

const movePaddle = () => {
    paddle.x += paddle.dx;

    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    }
}

const drawEverything = () => {
    ctx.clearRect(0,0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

const showAllBricks = () => {
    bricks.forEach((column) => {
        column.forEach((brick) => (brick.visible = true));
    });
}

const increaseScore = () => {
    score++;

    if (score % (brickRowCount * brickColumnCount) === 0) {
        ball.visible = false;
        paddle.visible = false;
        

        //After 0.5 sec restart the game
        setTimeout(function () {            
            showAllBricks();
            score = 0;
            paddle.x = canvas.width / 2 - 40;
            paddle.y = canvas.height - 20;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.visible = true;
            paddle.visible = true;
        }, delay);
    }
}

const moveBall = () => {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Wall collision (right/left)
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1; // ball.dx = ball.dx * -1
    }

    // Wall collision (top/bottom)
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    // console.log(ball.x, ball.y);

    // Paddle collision
    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed;
    }

    // Brick collision
    bricks.forEach((column) => {
        column.forEach((brick) => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x && // left brick side check
                    ball.x + ball.size < brick.x + brick.w && // right brick side check
                    ball.y + ball.size > brick.y && // top brick side check
                    ball.y - ball.size < brick.y + brick.h // bottom brick side check
                ) {
                    ball.dy *= -1;
                    brick.visible = false;

                    increaseScore();
                }
            }
        });
    });

    // Hit bottom wall - Lose
    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }
}

//Update canvas drawing & animation
const update = () => {
    movePaddle();
    setTimeout(() => {moveBall();}, delay)    

    // // Draw everything
    drawEverything();
    requestAnimationFrame(update);
}

const keyDown = (event) => {
  if (event.key === keyArrRight) {
    paddle.dx = paddle.speed;
  } else if (event.key === keyArrLeft) {
    paddle.dx = -paddle.speed;
  }
}


const keyUp = (event) => {
  if (
    event.key === keyArrRight ||
    event.key === keyArrLeft
  ) {
    paddle.dx = 0;
  }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
startBtn.addEventListener('click', () => {
    overlay.classList.add('hide');
    startBtn.classList.add('hide');
    update();
});