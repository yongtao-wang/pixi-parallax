class Mid extends PIXI.extras.TilingSprite{
  constructor() {
    var texture = PIXI.Texture.fromImage("resources/bg-mid.png");
    super(texture, 512, 256);
    this.position.x = 0;
    this.position.y = 128;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;
    this.viewportX = 0;
  }
  setViewportX(newViewportX) {
    var distanceTravelled = newViewportX - this.viewportX;
    this.viewportX = newViewportX;
    this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
  }
}

Mid.DELTA_X = 0.32;
