class Animation {
  constructor() {
    this.cnv - null;
    this.ctx - null;
  }
  init() {
    this.createCanvas();
  }
  createCanvas() {
    this.cnv = document.createElement(`canvas`);
    this.ctx = this.cnv.getContext(`2d`);
    document.body.appendChild(this.cnv);
  }
}

window.onload = () => {
  new Animation().init();
};
