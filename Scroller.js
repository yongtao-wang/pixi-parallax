class Scroller {
  constructor(stage) {
    this.far = new Far();
    stage.addChild(this.far);

    this.mid = new Mid();
    stage.addChild(this.mid);

    this.front = new Walls();
    stage.addChild(this.front);

    this.mapBuilder = new MapBuilder(this.front);
    this.viewportX = 0;
  }
  update() {
    this.far.update();
    this.mid.update();
  }
  setViewportX(viewportX) {
    this.viewportX = viewportX;
    this.far.setViewportX(viewportX);
    this.mid.setViewportX(viewportX);
    this.front.setViewportX(viewportX);
  }
  getViewportX() {
    return this.viewportX;
  }
  moveViewportXBy(units) {
    var newViewportX = this.viewportX + units;
    this.setViewportX(newViewportX);
  }
}
