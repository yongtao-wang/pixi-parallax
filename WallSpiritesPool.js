class WalllSpritesPool {
  constructor() {
    this.createWindows();
    this.createDecorations();
    this.createFrontEdges();
    this.createBackEdges();
  }

  createWindows() {
    this.windows = [];
    this.addToSpritePool(this.windows, "window_01", 6);
    this.addToSpritePool(this.windows, "window_02", 6);
    this.shuffle(this.windows);
  }

  addToSpritePool(array, frameID, count, reversed=false) {
    for (var i = 0; i < count; i++) {
      var sprite = PIXI.Sprite.fromFrame(frameID);
      if(reversed) {
        sprite.anchor.x = 1;
        sprite.scale.x = -1;
      }
      array.push(sprite);
    }
  }

  shuffle(array) {
    // Fisher-Yates (aka Knuth) shuffle
    var len = array.length;
    var shuffles = len * 3;
    for (var i = 0; i < shuffles; i++) {
      var wallSlice = array.pop();
      var pos = Math.floor(Math.random() * (len - 1));
      array.splice(pos, 0, wallSlice);
    }
  }

  borrowWindow() {
    return this.windows.shift();
  }

  returnWindow(sprite) {
    this.windows.push(sprite);
  }

  createDecorations() {
    this.decorations = [];

    this.addToSpritePool(this.decorations, "decoration_01", 6);
    this.addToSpritePool(this.decorations, "decoration_02", 6);
    this.addToSpritePool(this.decorations, "decoration_03", 6);
  
    this.shuffle(this.decorations);
  }

  borrowDecoration() {
    return this.decorations.shift();
  }

  returnDecoration(sprite) {
    this.decorations.push(sprite);
  }

  createFrontEdges() {
    this.frontEdges = [];
    this.addToSpritePool(this.frontEdges, "edge_01", 2);
    this.addToSpritePool(this.frontEdges, "edge_02", 2);
    this.shuffle(this.frontEdges);
  }

  borrowFrontEdge() {
    return this.frontEdges.shift();
  }

  returnFrontEdge(sprite) {
    this.frontEdges.push(sprite);
  }

  createBackEdges() {
    this.backEdges = [];
    this.addToSpritePool(this.backEdges, "edge_01", 2, true);
    this.addToSpritePool(this.backEdges, "edge_02", 2, true);
    this.shuffle(this.backEdges);
  }

  borrowBackEdge() {
    return this.backEdges.shift();
  }

  returnBackEdge(sprite) {
    this.backEdges.push(sprite);
  }

}
