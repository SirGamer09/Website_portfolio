class Boutton {
    constructor(selector) {
      this.pointsA = [];
      this.pointsB = [];
      this.$canvas = null;
      this.canvas = null;
      this.context = null;
      this.points = 8;
      this.viscosity = 20;
      this.mouseDist = 70;
      this.damping = 0.05;
      this.mouseX = 0;
      this.mouseY = 0;
      this.relMouseX = 0;
      this.relMouseY = 0;
      this.mouseLastX = 0;
      this.mouseLastY = 0;
      this.mouseDirectionX = 0;
      this.mouseDirectionY = 0;
      this.mouseSpeedX = 0;
      this.mouseSpeedY = 0;
      
      this.button = document.querySelector(selector);
      this.initButton();
      this.bindEvents();
    }
  
    bindEvents() {
      document.addEventListener('mousemove', this.mouseDirection.bind(this));
      this.mouseSpeed();
    }
  
    mouseDirection(e) {
      this.mouseDirectionX = (this.mouseX < e.pageX) ? 1 : (this.mouseX > e.pageX) ? -1 : 0;
      this.mouseDirectionY = (this.mouseY < e.pageY) ? 1 : (this.mouseY > e.pageY) ? -1 : 0;
  
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
      this.relMouseX = this.mouseX - this.$canvas.offsetLeft;
      this.relMouseY = this.mouseY - this.$canvas.offsetTop;
    }
  
    mouseSpeed() {
      this.mouseSpeedX = this.mouseX - this.mouseLastX;
      this.mouseSpeedY = this.mouseY - this.mouseLastY;
      this.mouseLastX = this.mouseX;
      this.mouseLastY = this.mouseY;
      setTimeout(this.mouseSpeed.bind(this), 50);
    }
  
    initButton() {
      const buttonWidth = this.button.offsetWidth;
      const buttonHeight = this.button.offsetHeight;
      this.$canvas = document.createElement('canvas');
      this.button.appendChild(this.$canvas);
      this.canvas = this.$canvas;
      this.canvas.width = buttonWidth + 100;
      this.canvas.height = buttonHeight + 100;
      this.context = this.canvas.getContext('2d');
  
      let x = buttonHeight / 2;
      for (let j = 1; j < this.points; j++) {
        this.addPoints(x + ((buttonWidth - buttonHeight) / this.points) * j, 0);
      }
  
      this.addPoints(buttonWidth - buttonHeight / 5, 0);
      this.addPoints(buttonWidth + buttonHeight / 10, buttonHeight / 2);
      this.addPoints(buttonWidth - buttonHeight / 5, buttonHeight);
      for (let j = this.points - 1; j > 0; j--) {
        this.addPoints(x + ((buttonWidth - buttonHeight) / this.points) * j, buttonHeight);
      }
      this.addPoints(buttonHeight / 5, buttonHeight);
      this.addPoints(-buttonHeight / 10, buttonHeight / 2);
      this.addPoints(buttonHeight / 5, 0);
      
      this.renderCanvas();
    }
  
    addPoints(x, y) {
      this.pointsA.push(new Point(x, y, 1));
      this.pointsB.push(new Point(x, y, 2));
    }
  
    renderCanvas() {
      requestAnimationFrame(this.renderCanvas.bind(this));
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = '#fff';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
      for (let i = 0; i <= this.pointsA.length - 1; i++) {
        this.pointsA[i].move();
        this.pointsB[i].move();
      }
  
      this.context.fillStyle = '#1CE2D8';
      this.drawShape(this.pointsA);
      this.context.fillStyle = '#102ce5';
      this.drawShape(this.pointsB);
    }
  
    drawShape(points) {
      this.context.beginPath();
      this.context.moveTo(points[0].x, points[0].y);
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const nextP = points[i + 1] || points[0];
        const cx1 = (p.x + nextP.x) / 2;
        const cy1 = (p.y + nextP.y) / 2;
        this.context.bezierCurveTo(p.x, p.y, cx1, cy1, nextP.x, nextP.y);
      }
      this.context.fill();
    }
  }
  
  class Point {
    constructor(x, y, level) {
      this.x = this.ix = x;
      this.y = this.iy = y;
      this.vx = 0;
      this.vy = 0;
      this.level = level;
    }
  
    move() {
      this.vx += (this.ix - this.x) / (20 * this.level);
      this.vy += (this.iy - this.y) / (20 * this.level);
      this.x += this.vx;
      this.y += this.vy;
    }
  }
  
  export default Boutton;