import {Settings} from "./settings";

export class Ball {
  x = 0;
  y = 0;

  xChange = null;
  yChange = null;

  xDirection = "";
  yDirection = "";

  constructor(board) {
    this.x = board.x;
    this.y = board.y - board.boardHeight + 2;
  }

  updateBall(initialClick, board) {
    if (initialClick) {
      if (this.xChange === null) {
        this.xChange = 2;
        this.yChange = 1;

        this.xDirection = "left";
        this.yDirection = "up";
      }

      if (this.xDirection === "left") {
        this.x -= this.xChange;
        if (this.x < Settings.BALL_RADIUS) {
          this.xDirection = "right"
        }
      }
      else {
        this.x += this.xChange;
        if (this.x > Settings.CANVAS_WIDTH - Settings.BALL_RADIUS) {
          this.xDirection = "left"
        }
      }

      if (this.yDirection === "up") {
        this.y -= this.yChange;
        if (this.y < Settings.BALL_RADIUS) {
          this.yDirection = "down"
        }
      }
      else {
        this.y += this.yChange;
        if (this.y > Settings.CANVAS_HEIGHT - Settings.BALL_RADIUS) {
          this.yDirection = "up"
        }
      }
    }
    else {
      this.x = board.x + board.boardWidth / 2;
      this.y = board.y - board.boardHeight + 2;
    }
  }

  checkBoardHit(board){
    const z = Settings.BALL_RADIUS / 2;

    if (this.y === (board.y - board.boardHeight + 2) && this.yDirection === "down") {
      console.log(board.x);
      console.log(this.x);

      if ( // hit top of board
        board.x-z < this.x &&
        board.x+z + board.boardWidth > this.x
      ) {
        this.yDirection = "up";
        console.log(1);
      }
      else if ( // hit left corner of board
        this.xDirection === "right" &&
        board.x - Settings.BALL_RADIUS*2 < this.x &&
        board.x > this.x
      ) {
        this.yDirection = "up";
        this.xDirection = "left";
      }
      else if ( // hit right corner of board
        this.xDirection === "left" &&
        board.x + Settings.BALL_RADIUS*2 > this.x &&
        board.x < this.x
      ) {
        this.yDirection = "up";
        this.xDirection = "right";
      }
    }
  }

  checkBrickHit(bricks){
    const z = Settings.BALL_RADIUS / 2;

    bricks.forEach((brick) => {
      if ( // hit bottom of brick
      brick.visible === true && this.yDirection === "up" &&
      this.y - Settings.BALL_RADIUS === brick.y + Settings.BRICK_HEIGHT &&
      this.x+z - Settings.BALL_RADIUS > brick.x &&
      this.x-z - Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH
      ){
        this.yDirection = "down";
        brick.visible = false;
      }
      else if ( // hit top of brick
      brick.visible === true && this.yDirection === "down" &&
      this.y + Settings.BALL_RADIUS === brick.y &&
      this.x+z - Settings.BALL_RADIUS > brick.x &&
      this.x-z - Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH
      ){
        this.yDirection = "up";
        brick.visible = false;
      }
      else if ( // hit left side of brick
      brick.visible === true && this.xDirection === "left" &&
      this.y+z > brick.y &&
      this.y-z < brick.y + Settings.BRICK_HEIGHT &&
      (this.x - Settings.BALL_RADIUS === brick.x + Settings.BRICK_WIDTH ||
      this.x - Settings.BALL_RADIUS + 1 === brick.x + Settings.BRICK_WIDTH)
      ){
        this.xDirection = "right";
        brick.visible = false;
      }
      else if ( // hit right side of brick
      brick.visible === true && this.xDirection === "right" &&
      this.y+z > brick.y &&
      this.y-z < brick.y + Settings.BRICK_HEIGHT &&
      (this.x + Settings.BALL_RADIUS === brick.x ||
      this.x + Settings.BALL_RADIUS - 1 === brick.x)
      ){
        this.xDirection = "left";
        brick.visible = false;
      }
      else if ( // hit lower right corner of brick
      brick.visible === true && this.yDirection === "up" && this.xDirection === "left" &&
      this.y - Settings.BALL_RADIUS > brick.y &&
      this.y - Settings.BALL_RADIUS < brick.y + Settings.BRICK_HEIGHT &&
      this.x - Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH &&
      this.x - Settings.BALL_RADIUS > brick.x
      ){
        this.xDirection = "right";
        this.yDirection = "down";
        brick.visible = false;
      }
      else if ( // hit lower left corner of brick
      brick.visible === true && this.yDirection === "up" && this.xDirection === "right" &&
      this.y - Settings.BALL_RADIUS > brick.y &&
      this.y - Settings.BALL_RADIUS < brick.y + Settings.BRICK_HEIGHT &&
      this.x + Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH &&
      this.x + Settings.BALL_RADIUS > brick.x
      ){
        this.xDirection = "left";
        this.yDirection = "down";
        brick.visible = false;
      }
      else if ( // hit upper right corner of brick
      brick.visible === true && this.yDirection === "down" && this.xDirection === "left" &&
      this.y + Settings.BALL_RADIUS > brick.y &&
      this.y + Settings.BALL_RADIUS < brick.y + Settings.BRICK_HEIGHT &&
      this.x - Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH &&
      this.x - Settings.BALL_RADIUS > brick.x
      ){
        this.xDirection = "right";
        this.yDirection = "up";
        brick.visible = false;
      }
      else if ( // hit upper left corner of brick
      brick.visible === true && this.yDirection === "down" && this.xDirection === "right" &&
      this.y + Settings.BALL_RADIUS > brick.y &&
      this.y + Settings.BALL_RADIUS < brick.y + Settings.BRICK_HEIGHT &&
      this.x + Settings.BALL_RADIUS < brick.x + Settings.BRICK_WIDTH &&
      this.x + Settings.BALL_RADIUS > brick.x
      ){
        this.xDirection = "left";
        this.yDirection = "up";
        brick.visible = false;
      }
    })
  }
}
