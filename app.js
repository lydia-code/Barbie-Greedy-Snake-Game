const canvas = document.getElementById("myCanvas");
//getContext() method會回傳一個canvas的drawing context（會畫還供）
//drawing context可以用來在canvas內畫圖/作圖
//mdn canvasrenderingcontext2d
const ctx = canvas.getContext("2d"); //drawing context
// (0,0) --> x變大
// |
// v
// y變大

//蛇的單位長度
const unit = 20;
const row = canvas.height / unit; //320 / 20=16
const column = canvas.width / unit; //320 / 20=16
//初始設定
let snake = [];
//物件的工作是，儲存身體的x, y座標
snake[0] = {
  x: 80,
  y: 0,
};

snake[1] = {
  x: 60,
  y: 0,
};

snake[2] = {
  x: 40,
  y: 0,
};

snake[3] = {
  x: 20,
  y: 0,
};

fruit = {
  x: 40,
  y: 40,
};

window.addEventListener("keydown", changeDirection);
let d = "Right";

function changeDirection(event) {
  console.log(event); //重要看key
  if (event.key == "ArrowRight" && d != "Left") {
    console.log("你正在按向右鍵");
    d = "Right";
  } else if (event.key == "ArrowDown" && d != "Up") {
    console.log("你正在按向下鍵");
    d = "Down";
  } else if (event.key == "ArrowLeft" && d != "Right") {
    console.log("你正在按向左鍵");
    d = "Left";
  } else if (event.key == "ArrowUp" && d != "Down") {
    console.log("你正在按向上鍵");
    d = "Up";
  }
  //每次按下上下左右鍵之後，再下一幀被畫出來之前，不接受任何keydown事件，可以防止連續按鍵導致蛇在邏輯上自殺;
  window.removeEventListener("keydown", changeDirection);
}

let highestScore;
loadHighestScore();
let score = 0;
document.getElementById("myScore").innerHTML = "Your Score: " + score;
window.document.getElementById("myScore2").innerHTML =
  "The Highest Score:" + highestScore;

function draw() {
  console.log("正在執行draw");
  //畫圖之前，確認蛇有沒有咬到自己
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      console.log("gamevoer");
      clearInterval(myGame);
      window.alert("Game Over");
      score = 0;
      return;
    }
  }
  //背景設定成黑色
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //畫出水果
  ctx.fillStyle = "purple";
  ctx.fillRect(fruit.x, fruit.y, unit, unit);

  //畫出蛇
  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "pink";
    } else {
      ctx.fillStyle = "rgb(224, 33, 138)";
    }
    ctx.strokeStyle = "grey";
    //畫實心長方形 x, y, width, height
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  //以目前的d變數方向，來決定蛇的下一幀要放在哪個座標
  let snakeX = snake[0].x; //snake[0]是一個物件，但snake[0].x是個number(primitive datatype)
  let snakeY = snake[0].y;
  if (d == "Left") {
    snakeX -= unit; //跟物件沒有任何關聯;
    if (snakeX == -20) {
      //x<0 => x=canvas.width-unit
      snakeX = 300;
    }
  } else if (d == "Up") {
    snakeY -= unit;
    if (snakeY == -20) {
      //y<0 => y=canvas.height-unit
      snakeY = 300;
    }
  } else if (d == "Right") {
    snakeX += unit;
    if (snakeX == 320) {
      //x>=canvas.width => x=0
      snakeX = 0;
    }
  } else if ((d = "Down")) {
    //y>=canvas.height => y=0
    snakeY += unit;
    if (snakeY == 320) {
      snakeY = 0;
    }
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  //蛇沒吃到果實 -> snake.pop(), snake.unshift()
  //蛇吃到果實 -> snake.unshift()
  //確認蛇是否有吃到果實
  if (newHead.x == fruit.x && newHead.y == fruit.y) {
    score++;
    setHighestScore(score);
    window.document.getElementById("myScore").innerHTML =
      "Your Score: " + score;
    window.document.getElementById("myScore2").innerHTML =
      "The Highest Score: " + highestScore;
    xr = Math.random();
    yr = Math.random();
    fruit.x =
      Math.floor((canvas.width - unit) * xr) -
      (Math.floor((canvas.width - unit) * xr) % unit);
    fruit.y =
      Math.floor((canvas.height - unit) * yr) -
      (Math.floor((canvas.height - unit) * yr) % unit);
  } else {
    snake.pop();
  }
  //console.log(snake.length);
  snake.unshift(newHead);
  window.addEventListener("keydown", changeDirection);
}

let myGame = window.setInterval(draw, 100);

function loadHighestScore() {
  //console.log(localStorage.getItem("highestScore"));
  if (localStorage.getItem("highestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("highestScore")); //localStoragef取出來的事String
  }
}

function setHighestScore(score) {
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
  }
}
