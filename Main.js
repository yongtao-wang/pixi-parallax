class Main {
  constructor() {
    this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(512, 384, { view: document.getElementById('game-canvas') });
    // this.scroller = new Scroller(this.stage);
    /*
    here to specify that a method of our class named update()
    will be called when the stage can next be redrawn.
    bind() is used to guarantee that when update() is called
    that it’s correctly scoped to our Main class’ instance.
    If you don’t apply bind() then your update() method won’t
    be able to access and use any of our class’ member variables.
    */
    // requestAnimationFrame(this.update.bind(this));

    this.loadSpriteSheet();
  }

  update() {
    this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
    this.renderer.render(this.stage);
    requestAnimationFrame(this.update.bind(this));
  }

  loadSpriteSheet() {
    var loader = PIXI.loader;
    /*
    The PIXI.loaders.Loader class triggers a complete event once the sprite sheet is loaded. 
    To respond to that event we simply hook the complete event to a method of our choosing.

    PIXI.loaders.Loader instance’s load() method is called to actually commence the loading 
    of our sprite sheet. Once the sprite sheet has been loaded, Pixi will extract its frames 
    and store them in an internal texture cache for access later.

    Most modern GPUs can store textures up to 2048×2048 pixels in size. 
    So if you are going to use a sprite sheet then make sure its dimensions 
    do not exceed the GPU’s texture size limit
    */
    loader.add("wall", "resources/wall.json");
    loader.add("bg-mid", "resources/bg-mid.png");
    loader.add("bg-far", "resources/bg-far.png");
    loader.once("complete", this.spriteSheetLoaded.bind(this));
    loader.load();
  }

  spriteSheetLoaded() {
    this.scroller = new Scroller(this.stage);
    requestAnimationFrame(this.update.bind(this));
    /*
    Object pooling. To save GPU resource, create a pool of objects (e.g. missle projectiles).
    Each time there will be only limited number of objects on screen so we just need to fetch
    as many as we need from the pool, and return it after it disappears.
    */
  //  this.pool = new WalllSpritesPool();
  //  this.wallSlices = [];
  }

  borrowWallSprites(num) {
    for (var i = 0; i < num; i++) {
      if (i % 2 == 0) {
        var sprite = this.pool.borrowWindow();
      }
      else {
        var sprite = this.pool.borrowDecoration();
      }

      sprite.position.x = -32 + (i * 64); // 64 -> width of spirte
      sprite.position.y = 128;

      this.wallSlices.push(sprite);
      this.stage.addChild(sprite);
    }
  }

  returnWallSprites() {
    for (var i = 0; i < this.wallSlices.length; i++)
    {
      var sprite = this.wallSlices[i];
      this.stage.removeChild(sprite);
      if (i % 2 == 0) {
        this.pool.returnWindow(sprite);
      }
      else {
        this.pool.returnDecoration(sprite);
      }
    }

    this.wallSlices = [];
  }

  // for testing purpose only
  generateTestWallSpan() {
    // var lookupTable = [
    //   this.pool.borrowFrontEdge,  // 1st slice
    //   this.pool.borrowWindow,     // 2nd slice
    //   this.pool.borrowDecoration, // 3rd slice
    //   this.pool.borrowWindow,     // 4th slice
    //   this.pool.borrowDecoration, // 5th slice
    //   this.pool.borrowWindow,     // 6th slice
    //   this.pool.borrowBackEdge    // 7th slice
    // ];
  
    // for (var i = 0; i < lookupTable.length; i++) {
    //   var func = lookupTable[i];
  
    //   var sprite = func.call(this.pool);
    //   sprite.position.x = 32 + (i * 64);
    //   sprite.position.y = 128;
  
    //   this.wallSlices.push(sprite);
  
    //   this.stage.addChild(sprite);
    // }
    var lookupTable = [
      this.pool.borrowFrontEdge,  // 1st slice
      this.pool.borrowWindow,     // 2nd slice
      this.pool.borrowDecoration, // 3rd slice
      this.pool.borrowStep,       // 4th slice
      this.pool.borrowWindow,     // 5th slice
      this.pool.borrowBackEdge    // 6th slice
    ];
  
    var yPos = [
      128, // 1st slice
      128, // 2nd slice
      128, // 3rd slice
      192, // 4th slice
      192, // 5th slice
      192  // 6th slice
    ];
  
    for (var i = 0; i < lookupTable.length; i++)
    {
      var func = lookupTable[i];
  
      var sprite = func.call(this.pool);
      sprite.position.x = 64 + (i * 64);
      sprite.position.y = yPos[i];
  
      this.wallSlices.push(sprite);
  
      this.stage.addChild(sprite);
    }
  
  }

  clearTestWallSpan() {
    var lookupTable = [
      this.pool.returnFrontEdge,  // 1st slice
      this.pool.returnWindow,     // 2nd slice
      this.pool.returnDecoration, // 3rd slice
      this.pool.returnStep,       // 4th slice
      this.pool.returnDecoration, // 5th slice
      this.pool.returnWindow,     // 6th slice
      this.pool.returnBackEdge    // 7th slice
    ];
  
    for (var i = 0; i < lookupTable.length; i++)
    {
      var func = lookupTable[i];
      var sprite = this.wallSlices[i];
  
      this.stage.removeChild(sprite);
      func.call(this.pool, sprite);
    }
  
    this.wallSlices = [];  
  }
}

Main.SCROLL_SPEED = 3;
