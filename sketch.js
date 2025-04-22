let currentQuestion = 0;
let questions = [
  {
    question: "1 + 1 = ?",
    options: [2, 3, 4, 6],
    answer: 2
  },
  {
    question: "5 - 3 = ?",
    options: [1, 2, 3, 4],
    answer: 2
  },
  {
    question: "3 * 2 = ?",
    options: [5, 6, 7, 8],
    answer: 6
  },
  {
    question: "10 / 2 = ?",
    options: [4, 5, 6, 7],
    answer: 5
  },
  {
    question: "7 + 3 = ?",
    options: [9, 10, 11, 12],
    answer: 10
  },
  {
    question: "8 - 4 = ?",
    options: [2, 3, 4, 5],
    answer: 4
  }
];
let message = "按下選項開始答題";
let quizStarted = false; // 判斷是否開始答題
let quizCompleted = false; // 判斷是否完成測驗

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#283618");
  fill(255);
  textSize(24);
  textAlign(CENTER, CENTER);

  if (!quizStarted) {
    fill("#fefae0");
    rect(width / 2 - 100, height / 2 - 20, 200, 40, 10);
    fill("#606c38");
    text("開始答題", width / 2, height / 2);
  } else if (quizCompleted) {
    textSize(32);
    text("恭喜你完成所有題目！", width / 2, height / 2 - 50);
    fill("#fefae0");
    rect(width / 2 - 100, height / 2, 200, 40, 10);
    fill("#606c38");
    text("重新做答", width / 2, height / 2 + 20);
  } else if (currentQuestion < questions.length) {
    let q = questions[currentQuestion];
    textSize(60);
    text(q.question, width / 2, height / 3);

    for (let i = 0; i < q.options.length; i++) {
      let x = width / 2;
      let y = height / 2 + i * 50;
      fill("#fefae0");
      rect(x - 100, y - 20, 200, 40, 10);
      fill("#606c38");
      textSize(24);
      text(q.options[i], x, y);
    }
  }

  textSize(18);
  fill("#fefae0"); // 設定訊息文字顏色為 fefae0
  text(message, width / 2, height - 50);
}

function mousePressed() {
  if (!quizStarted) {
    // 如果尚未開始測驗，檢查是否點擊「開始答題」按鈕
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 - 20 &&
      mouseY < height / 2 + 20
    ) {
      quizStarted = true; // 開始測驗
      message = "按下選項開始答題";
    }
  } else if (quizCompleted) {
    // 如果測驗完成，檢查是否點擊「重新做答」按鈕
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 &&
      mouseY < height / 2 + 40
    ) {
      // 重置測驗
      quizStarted = false;
      quizCompleted = false;
      currentQuestion = 0;
      message = "按下選項開始答題";
    }
  } else if (currentQuestion < questions.length) {
    // 測驗進行中，檢查是否點擊選項
    let q = questions[currentQuestion];
    for (let i = 0; i < q.options.length; i++) {
      let x = width / 2;
      let y = height / 2 + i * 50;
      if (
        mouseX > x - 100 &&
        mouseX < x + 100 &&
        mouseY > y - 20 &&
        mouseY < y + 20
      ) {
        if (q.options[i] === q.answer) {
          currentQuestion++;
          if (currentQuestion >= questions.length) {
            quizCompleted = true; // 設定測驗完成
            message = ""; // 清空訊息
          } else {
            message = "答對了！進入下一題";
          }
        } else {
          message = "答錯啦~請再接再厲";
        }
      }
    }
  }
}
