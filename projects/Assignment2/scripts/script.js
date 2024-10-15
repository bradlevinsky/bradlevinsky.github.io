// Initialize canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//buttons
var startBtn = document.getElementById("start-btn");
var pauseBtn = document.getElementById("pause-btn");
var restartBtn = document.getElementById("restart-btn");
var ballIncreaseBtn = document.getElementById("ball-increase-btn"); 
var ballDecreaseBtn = document.getElementById("ball-decrease-btn"); 
//running the game
var animationId;
var gameRunning = false;
//against AI
var vsAI = false; 
var vsAIPaddleSpeed = 10;
// Define ball properties
var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballSpeedX = 2.5;
var ballSpeedY = 2.5;
// Define side paddle properties
var rightPaddleHeight = 80;
var leftPaddleHeight = 80;
var sidePaddleWidth = 10;
var leftPaddleY = canvas.height / 2 - leftPaddleHeight / 2;
var rightPaddleY = canvas.height / 2 - rightPaddleHeight / 2;
var paddleSpeed = 5;
// Define top and bottom paddle properties
var topPaddleWidth = 80;
var bottomPaddleWidth = 80;
var topAndBottomHeight = 10; 
var topPaddleX = canvas.width / 2 - topPaddleWidth / 2; 
var topPaddleY = 0; 
var bottomPaddleX = canvas.width / 2 - bottomPaddleWidth / 2; 
var bottomPaddleY = canvas.height - bottomPaddleWidth; 
// Define score properties
var leftPlayerScore = 0;
var rightPlayerScore = 0;
var topPlayerScore =0;
var bottomPlayerScore = 0;
var maxScore = 20;
// Handle key press
var upPressed = false;
var downPressed = false;
var wPressed = false;
var sPressed = false;
var aPressed = false;
var dPressed = false;
var leftPressed = false;
var rightPressed = false;
// single player 
var leftPlayerlivesLeft = maxScore;
var bounces = 0;
// 4 Player Verses
var RightPlayerlivesLeft = maxScore;
var topPlayerLivesLeft = maxScore;
var bottomPlayerLivesLeft = maxScore;
// Define an array to store extra balls
var extraBalls = [];
// coordinates for the square in the 2 person verses
var squareSize = 150; // change this value to change the size of the square
var squareX = canvas.width / 2 - squareSize / 2;
var squareY = canvas.height / 2 - squareSize / 2;

// Listen for keyboard events
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

document.addEventListener("DOMContentLoaded", function() {
  // Get the back button element
  const backButton = document.getElementById("back-btn");

  // Add click event listener to the back button
  backButton.addEventListener("click", function() {
      // Redirect to the main.html page
      window.location.href = "main.html";
  });
});

// Event listener for adding extra balls
ballIncreaseBtn.addEventListener("click", function() {
  if (extraBalls.length < 4) { // Check if the maximum number of extra balls has not been reached
    // Add a new extra ball object to the array
    extraBalls.push({
      x: canvas.width / 2, // Initial x position
      y: canvas.height / 2, // Initial y position
      speedX: Math.random() * 5 + 2, // Random horizontal speed
      speedY: Math.random() * 5 + 2, // Random vertical speed
    });
  }
});

// Event listener for removing extra balls
ballDecreaseBtn.addEventListener("click", function() {
  // Remove the last ball that was added
  extraBalls.pop();
});

if (document.title === "Ping Pong Game vs Ai" || document.title === "Ping Pong Game 4 Player Verses") {
  ballIncreaseBtn.style.display = "none";
  ballDecreaseBtn.style.display = "none";
}

// Update extra balls positions
function updateExtraBalls() {
  extraBalls.forEach(function(ball) {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Check if ball collides with top or bottom of canvas
    if (ball.y - ballRadius < 0 || ball.y + ballRadius > canvas.height) {
      ball.speedY = -ball.speedY;
    }

    // Check if ball collides with the right side of canvas
    if (ball.x + ballRadius > canvas.width) {
      ball.speedX = -ball.speedX;
    }

    // Check if ball collides with the left paddle
    else if (ball.x - ballRadius < sidePaddleWidth && ball.y > leftPaddleY && ball.y < leftPaddleY + leftPaddleHeight) {
      ball.speedX = -ball.speedX; // Reverse the horizontal direction
      bounces++; // Increase the bounce score by one
    }

    // Check if ball collides with the right paddle
    else if (ball.x + ballRadius > canvas.width - sidePaddleWidth && ball.y > rightPaddleY && ball.y < rightPaddleY + rightPaddleHeight) {
      ball.speedX = -ball.speedX; // Reverse the horizontal direction
      // Adjust ball's position to prevent it from getting stuck inside the paddle
      ball.x = canvas.width - sidePaddleWidth - ballRadius;
    }

    // Check if ball goes out of bounds on the left side of canvas
    if (ball.x < 0) {
      // Reduce lives count by 1
      leftPlayerlivesLeft--;
      // Reset ball position
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.speedX = Math.random() * 5 + 2.5; // Random horizontal speed
      ball.speedY = Math.random() * 5 + 2.5; // Random vertical speed
      displayMessage("You lost a life! You have " + leftPlayerlivesLeft + " lives left. Your current Bounce Total is: " + bounces);
    }
    // Check if ball collides with the right side of canvas in multiplayer mode
    if (document.title === "Ping Pong Game 2 Player Verses") {
      if (ball.x + ballRadius > canvas.width) {
          // Increment the score of the left player
          leftPlayerScore++;
          // Reset ball position
          ball.x = canvas.width / 2;
          ball.y = canvas.height / 2;
          ball.speedX = -ball.speedX; // Reverse the horizontal direction
          displayMessage("Player on the left scored a point! Current Points: " + leftPlayerScore);
      }
      if (ball.x - ballRadius < 0) {
        // Increment the score of the right player
        rightPlayerScore++;
        // Reset ball position
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.speedX = -ball.speedX; // Reverse the horizontal direction
        displayMessage("Player on the right scored a point! Current Points: " + rightPlayerScore);
      }
    }  
  });
}

// Draw extra balls
function drawExtraBalls() {
  extraBalls.forEach(function(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  });
}

// Check if the current HTML file is Single Player
if (document.title === "Ping Pong Game Single Player"){
  rightPaddleY = 0; // Set the right paddle's Y position to the top of the canvas
  rightPaddleHeight = canvas.height; // Set the right paddle's height to match the canvas height

  // Modify score display for single player
  function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFF";
    ctx.font = "15px Arial";

    ctx.fillText("Lives Left: " + leftPlayerlivesLeft, 20, 30); // Display "Lives Left" and calculate remaining lives based on the score
    ctx.fillText("Bounces: " + bounces, canvas.width - 100, 30); // Changed to display "Bounces" and count the number of times the ball bounced off the left paddle
    ctx.fillText("High Score: " + localStorage.getItem('highScore'), -60 + canvas.width / 2, 30);

    // Draw main ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Draw left paddle
    ctx.fillRect(0, leftPaddleY, sidePaddleWidth, leftPaddleHeight);


    // Draw extra balls
    extraBalls.forEach(function(ball) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    });
  }
  //Check if the current HTML file is Multi Player
} else if (document.title === "Ping Pong Game 2 Player Verses"){
  // For 2 player verses
  function draw() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#FFF";
      ctx.font = "15px Arial";

      ctx.beginPath();
      ctx.rect(squareX, squareY, squareSize, squareSize);
      ctx.strokeStyle = "#FFF"; // Set line color to white
      ctx.stroke();
      ctx.closePath();

      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      // Draw left paddle
      ctx.fillRect(0, leftPaddleY, sidePaddleWidth, leftPaddleHeight);

      // Draw right paddle
      ctx.fillRect(canvas.width - sidePaddleWidth, rightPaddleY, sidePaddleWidth, rightPaddleHeight);

      // Draw scores
      ctx.fillText("Score: " + leftPlayerScore, 20, 30);
      ctx.fillText("Score: " + rightPlayerScore, canvas.width - 100, 30);
      
      extraBalls.forEach(function(ball) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    });
  }
} else if (document.title === "Ping Pong Game 4 Player Verses"){
  // For 4 player verses
  function draw() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#FFF";
      ctx.font = "15px Arial";

      // Draw circle around ball spawn point
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
      ctx.strokeStyle = "#FFF"; // Set line color to white
      ctx.stroke();
      ctx.closePath();

      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      // Draw left paddle
      ctx.fillRect(0, leftPaddleY, sidePaddleWidth, leftPaddleHeight);

      // Draw right paddle
      ctx.fillRect(canvas.width - sidePaddleWidth, rightPaddleY, sidePaddleWidth, rightPaddleHeight);

      // Draw top paddle
      ctx.fillRect(topPaddleX, topPaddleY, topPaddleWidth, topAndBottomHeight);

      // Draw bottom paddle
      ctx.fillRect(bottomPaddleX, bottomPaddleY+70, bottomPaddleWidth, topAndBottomHeight);

      //modify the paddle if a user gets eliminated
      if (leftPlayerlivesLeft === 0){
        leftPaddleHeight = canvas.height;
        leftPaddleY = 0;
      }
      if (RightPlayerlivesLeft === 0){
        rightPaddleHeight = canvas.height;
        rightPaddleY = 0;
      }
      if (topPlayerLivesLeft === 0){
          topPaddleWidth = canvas.width;
          topPaddleX = 0;
      }
      if (bottomPlayerLivesLeft === 0){
          bottomPaddleWidth = canvas.width;
          bottomPaddleX = 0;
      }

      // Draw scores
      ctx.fillText("Left Player Lives: " + leftPlayerlivesLeft, 20, canvas.height /2); // Left player score
      ctx.fillText("Right Player Lives: " + RightPlayerlivesLeft, canvas.width - 160, canvas.height /2); // Right player score
      ctx.fillText("Top Player Lives: " + topPlayerLivesLeft, canvas.width / 2 -60, 40); // Top player score
      ctx.fillText("Bottom Player Lives: " + bottomPlayerLivesLeft, canvas.width / 2 - 80, canvas.height - 30); // Bottom player score

      extraBalls.forEach(function(ball) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    });
  }
}else {
  function draw() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#FFF";
      ctx.font = "15px Arial";

      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.strokeStyle = "#FFF"; // Set line color to white
      ctx.stroke();
      ctx.closePath();

      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      // Draw left paddle
      ctx.fillRect(0, leftPaddleY, sidePaddleWidth, leftPaddleHeight);

      // Draw right paddle
      ctx.fillRect(canvas.width - sidePaddleWidth, rightPaddleY, sidePaddleWidth, rightPaddleHeight);

      // Draw scores
      ctx.fillText("Score: " + leftPlayerScore, 20, 30);
      ctx.fillText("Score: " + rightPlayerScore, canvas.width - 100, 30);
  }
}

// Check if the current HTML file is vs AI
if (document.title === "Ping Pong Game vs Ai") {
  vsAI = true; // Set vsAI to true if playing against AI
}

startBtn.addEventListener("click", function() {
  if (!gameRunning) { // only start the game if gameRunning is false
    gameRunning = true; // set gameRunning to true when the game starts
    loop();
  }
});

pauseBtn.addEventListener("click", function() {
  gameRunning = false;
  cancelAnimationFrame(animationId);
});

restartBtn.addEventListener("click", function() {
  document.location.reload();
});

addEventListener("load", (event) => {
  draw();
});

function keyDownHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = true;
  } else if (e.key === "ArrowDown") {
    downPressed = true;
  } else if (e.key === "w") {
    wPressed = true;
  } else if (e.key === "s") {
    sPressed = true;
  } else if (e.key === "a") {
    aPressed = true;
  } else if (e.key === "d") {
    dPressed = true;
  } else if (e.key === "ArrowLeft") { 
    leftPressed = true;
  } else if (e.key === "ArrowRight") { 
    rightPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = false;
  } else if (e.key === "ArrowDown") {
    downPressed = false;
  } else if (e.key === "w") {
    wPressed = false;
  } else if (e.key === "s") {
    sPressed = false;
  } else if (e.key === "a") {
    aPressed = false;
  } else if (e.key === "d") {
    dPressed = false;
  } else if (e.key === "ArrowLeft") { 
    leftPressed = false;
  } else if (e.key === "ArrowRight") { 
    rightPressed = false;
  }
}

// Update paddle positions
function updatePaddles() {
  // Movement for the side paddles
  if (document.title === "Ping Pong Game vs Ai") {}
  if (upPressed && rightPaddleY > 0) {
    rightPaddleY -= paddleSpeed;
  } else if (downPressed && rightPaddleY + rightPaddleHeight < canvas.height) {
    rightPaddleY += paddleSpeed;
  }

  if (wPressed && leftPaddleY > 0) {
    leftPaddleY -= paddleSpeed;
  } else if (sPressed && leftPaddleY + leftPaddleHeight < canvas.height) {
    leftPaddleY += paddleSpeed;
  }

  // Movement for the top and bottom paddles
  if (aPressed && topPaddleX > 0) {
    topPaddleX -= paddleSpeed;  // Move left
  } else if (dPressed && topPaddleX + topPaddleWidth < canvas.width) {
    topPaddleX += paddleSpeed;  // Move right
  }

  if (leftPressed && bottomPaddleX > 0) {
    bottomPaddleX -= paddleSpeed;  // Move left
  } else if (rightPressed && bottomPaddleX + bottomPaddleWidth < canvas.width) {
    bottomPaddleX += paddleSpeed;  // Move right
  }
}



//only moves the right paddle autmatically if AI is playing
function moveRightPaddle() {
  if (!vsAI) { // Check if playing against AI
    return; // Don't move the paddle if not playing against AI
  }
  // AI logic to move the right paddle based on ball position
  if (ballY > rightPaddleY + rightPaddleHeight / 2) {
    rightPaddleY += vsAIPaddleSpeed;
  } else if (ballY < rightPaddleY + rightPaddleHeight / 2) {
    rightPaddleY -= vsAIPaddleSpeed;
  }
}

function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (document.title === "Ping Pong Game 4 Player Verses") {
    if (ballX < 0) {
      leftPlayerlivesLeft--; // Reduce left player's lives
      reset(); // Reset the ball
      displayMessage("Left player lost a life! Lives left: " + leftPlayerlivesLeft);
    } else if (ballX > canvas.width) {
      RightPlayerlivesLeft--; // Reduce right player's lives
      reset(); // Reset the ball
      displayMessage("Right player lost a life! Lives left: " + RightPlayerlivesLeft);
    } else if (ballY < 0) {
      topPlayerLivesLeft--; // Reduce top player's lives
      reset(); // Reset the ball
      displayMessage("Top player lost a life! Lives left: " + topPlayerLivesLeft);
    } else if (ballY > canvas.height) {
      bottomPlayerLivesLeft--; // Reduce bottom player's lives
      reset(); // Reset the ball
      displayMessage("Bottom player lost a life! Lives left: " + bottomPlayerLivesLeft);
    }
    // Check if ball collides with top paddle
    if (ballY - ballRadius < topAndBottomHeight && ballX > topPaddleX && ballX < topPaddleX + topPaddleWidth) {
        ballSpeedY = -ballSpeedY;
    }
    
    // Check if ball collides with bottom paddle
    if (ballY + ballRadius > canvas.height - topAndBottomHeight && ballX > bottomPaddleX && ballX < bottomPaddleX + bottomPaddleWidth) {
        ballSpeedY = -ballSpeedY;
    }
    
    // Check if ball collides with left paddle
    if (ballX - ballRadius < sidePaddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + leftPaddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    
    // Check if ball collides with right paddle
    if (ballX + ballRadius > canvas.width - sidePaddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + rightPaddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

  } else if (document.title === "Ping Pong Game 2 Player Verses"){
    if (ballX < 0) {
      rightPlayerScore++;
      reset();
      displayMessage("Player on the right scored a point! Current Points: " + rightPlayerScore);
    } else if (ballX > canvas.width) {
      leftPlayerScore++;     
      reset();
      displayMessage("Player on the left scored a point! Current Points: " + leftPlayerScore);
    }
    if (ballX - ballRadius < sidePaddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + leftPaddleHeight) {
      let reactiveY = (ballY - (leftPaddleY + leftPaddleHeight / 2)) / (leftPaddleHeight / 2);
      ballSpeedX = -ballSpeedX;
      // Adjust ball speed based on previous trajectory (?) is a conditional operator
      ballSpeedY = ballSpeedY > 0 ? Math.max(reactiveY * 5, ballSpeedY) : Math.min(reactiveY * 5, ballSpeedY);
    }    
    // Check if ball collides with right paddle
    if (ballX + ballRadius > canvas.width - sidePaddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + rightPaddleHeight) {
        let reactiveY = (ballY - (rightPaddleY + rightPaddleHeight / 2)) / (rightPaddleHeight / 2);
        ballSpeedX = -ballSpeedX;
        // Adjust ball speed based on previous trajectory
        ballSpeedY = ballSpeedY > 0 ? Math.max(reactiveY * 5, ballSpeedY) : Math.min(reactiveY * 5, ballSpeedY);
    }
  
    // Check if ball collides with top or bottom of canvas
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }
  }else if (document.title === "Ping Pong Game vs Ai"){
    if (ballX < 0) {
      rightPlayerScore++;
      ballSpeedX = -2.5;
      ballSpeedY = Math.random() * 5 - 2.5;
      vsAIPaddleSpeed = 5;
      reset();
      displayMessage("AI scored a point! Current Points: " + rightPlayerScore);
    } else if (ballX > canvas.width) {
      leftPlayerScore++;
      ballSpeedX = 2.5;
      ballSpeedY = Math.random() * 5 - 2.5;
      vsAIPaddleSpeed = 5;
      reset();
      displayMessage("Player scored a point! Current Points: " + leftPlayerScore);
    }
    // Check if ball collides with left paddle
    if (ballX - ballRadius < sidePaddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + leftPaddleHeight) {
      ballSpeedX *= 1.1;
      ballSpeedX = -ballSpeedX;
    }    
    // Check if ball collides with right paddle
    if (ballX + ballRadius > canvas.width - sidePaddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + rightPaddleHeight) {
      if (vsAIPaddleSpeed > 1){
        vsAIPaddleSpeed-=.5;
      } else{
        vsAIPaddleSpeed = vsAIPaddleSpeed
      }

      ballSpeedX = -ballSpeedX;
    }
  
    // Check if ball collides with top or bottom of canvas
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }
  }
  else {
    if (document.title === "Ping Pong Game Single Player") {
      if (ballX < 0) {
        leftPlayerlivesLeft--; // Reduce left player's lives
        reset(); // Reset the ball
        displayMessage("You lost a life! You have " + leftPlayerlivesLeft + " lives left. Your current Bounce Total is: " + bounces);
      } 
    
      // Check if ball collides with top or bottom of canvas
      if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
      }

      // Check if ball collides with left paddle
      if (ballX - ballRadius < sidePaddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + leftPaddleHeight) {
        let reactiveY = (ballY - (leftPaddleY + leftPaddleHeight / 2)) / (leftPaddleHeight / 2);
        ballSpeedX = -ballSpeedX;
        // Adjust ball speed based on previous trajectory (?) is a conditional operator
        ballSpeedY = ballSpeedY > 0 ? Math.max(reactiveY * 5, ballSpeedY) : Math.min(reactiveY * 5, ballSpeedY);
        bounces++;
      }   
      // Check if ball collides with right canvas
      if (ballX + ballRadius > canvas.width - sidePaddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + rightPaddleHeight) {
        ballSpeedX = -ballSpeedX;
      }
    }
  }
}

// Check for winner
function checkWinner() {
  if (document.title === "Ping Pong Game Single Player") {
    if (leftPlayerlivesLeft === 0){
      var message = "Congratulations! You lasted " + bounces + " bounces!";
      alert(message);
      var highScore = localStorage.getItem('highScore');
      if (!highScore || bounces > highScore) {
        localStorage.setItem('highScore', bounces);
      }
      document.location.reload(); // Reload the page
    }
  }
  else if (document.title === "Ping Pong Game 2 Player Verses"){
    if (leftPlayerScore === maxScore) {
      alert("Congratulations! Left player wins with a score of " + leftPlayerScore + " to " + rightPlayerScore+ "!");
      document.location.reload(); // Reload the page
    } else if (rightPlayerScore === maxScore) {
      alert("Congratulations! Ai player wins with a score of " + rightPlayerScore + " to " + leftPlayerScore+ "!");
      document.location.reload(); // Reload the page
    }
  } else if (document.title === "Ping Pong Game 4 Player Verses"){
    var playersWithNoLives = 0;
    if (leftPlayerlivesLeft === 0) playersWithNoLives++;
    if (leftPlayerlivesLeft === 0) playersWithNoLives++;
    if (topPlayerLivesLeft === 0) playersWithNoLives++;
    if (bottomPlayerLivesLeft === 0) playersWithNoLives++;
    if (playersWithNoLives >= 3){
      var winner;
      if (leftPlayerlivesLeft > 0) winner = "Left Player"
      if (RightPlayerlivesLeft > 0) winner = "Right Player";
      if (topPlayerLivesLeft > 0) winner = "Top Player";
      if (bottomPlayerLivesLeft > 0) winner = "Bottom Player"
      alert("Congratulations! " + winner + " wins!");
      document.location.reload();
    }
  }
  else{
    if (leftPlayerScore === maxScore) {
      alert("Congratulations! Left player wins with a score of " + leftPlayerScore + " to " + rightPlayerScore+ "!");
      document.location.reload(); // Reload the page
    } else if (rightPlayerScore === maxScore) {
      alert("Unfortunate. The AI wins with a score of " + rightPlayerScore + " to " + leftPlayerScore+ "!");
      document.location.reload(); // Reload the page
    }
  }
}

// Update game state
function update() {
  updatePaddles();
  moveRightPaddle();
  updateExtraBalls(); // Update extra balls positions
  updateBall(); // Update main ball position 
  checkWinner();
}

// Reset ball to center of screen
function reset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.random() * 5 - 2.5;
}
// Game loop
function loop() {
  update();
  draw();
  animationId = requestAnimationFrame(loop);
}

//side chat message function
function displayMessage(message) {
  const sideChat = document.querySelector('.sideChat');
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  sideChat.appendChild(messageElement);
}