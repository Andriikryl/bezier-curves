class Animation {
  constructor() {
    this.cnv = null;
    this.ctx = null;
    this.size = { w: 0, h: 0, cx: 0, cy: 0 };
  }
  init() {
    this.createCanvas();
    this.updateAnimation();
  }
  createCanvas() {
    this.cnv = document.createElement(`canvas`);
    this.ctx = this.cnv.getContext(`2d`);
    this.setCanvasSize();
    document.body.appendChild(this.cnv);
    window.addEventListener(`resize`, () => this.setCanvasSize());
  }
  setCanvasSize() {
    this.size.w = this.cnv.width = window.innerWidth;
    this.size.h = this.cnv.height = window.innerHeight;
    this.size.cx = this.size.w / 2;
    this.size.cy = this.size.h / 2;
  }
  updateCurves() {
    let curveParam = {
      startX: 0,
      startY: 0,
      controlX1: this.size.cx,
      controlY1: 0,
      controlX2: this.size.cx,
      controlY2: this.size.h,
      endX: this.size.w,
      endY: this.size.h,
    };
    this.drawCurve(curveParam);
  }
  drawCurve({
    startX,
    startY,
    controlX1,
    controlY1,
    controlX2,
    controlY2,
    endX,
    endY,
  }) {
    this.ctx.strokeStyle = `white`;
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.bezierCurveTo(
      controlX1,
      controlY1,
      controlX2,
      controlY2,
      endX,
      endY
    );
    this.ctx.stroke();
  }
  updateAnimation() {
    this.updateCurves();
  }
}

window.onload = () => {
  new Animation().init();
};
