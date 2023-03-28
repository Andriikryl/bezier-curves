const config = {
  waveSpeed: 1,
  wavesToBlend: 4,
};

class waveNoise {
  constructor() {
    this.waveSet = [];
  }
  addWaves(requiredWaves) {
    for (let i = 0; i < requiredWaves.length; ++i) {
      let randomAngle = Math.random() * 360;
      this.waveSet.push(randomAngle);
    }
  }
  getWave() {
    let blendedWave = 0;
    for (let e of this.waveSet) {
      blendedWave += Math.sin((e / 180) * Math.PI);
    }
    return (blendedWave / this.waveSet.length + 1) / 2;
  }
  update() {
    this.waveSet.forEach((e, i) => {
      let r = Math.random() * (i + 1) * config.waveSpeed;
      this.waveSet[i] += (e + r) % 360;
    });
  }
}

class Animation {
  constructor() {
    this.cnv = null;
    this.ctx = null;
    this.size = { w: 0, h: 0, cx: 0, cy: 0 };
    this.controls = [];
    this.controlsNum = 3;
  }
  init() {
    this.createCanvas();
    this.createControls();
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
  createControls() {
    for (let i = 0; i < this.controlsNum; ++i) {
      let control = new waveNoise();
      control.addWaves(config.wavesToBlend);
      this.controls.push(control);
    }
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
