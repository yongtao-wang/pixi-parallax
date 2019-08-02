class Walls extends PIXI.Container {
    VIEWPORT_WIDTH = 512;
    VIEWPORT_NUM_SLICES = Math.ceil(this.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1;

    constructor() {
        super();
        this.pool = new WalllSpritesPool();
        this.createLookupTables();

        this.slices = [];
        this.createTestWallSpan();

        this.viewportX = 0;
        this.viewportSliceX = 0;
    }

    createLookupTables() {
        this.borrowWallSpriteLookup = [];
        this.borrowWallSpriteLookup[SliceType.FRONT] = this.pool.borrowFrontEdge;
        this.borrowWallSpriteLookup[SliceType.BACK] = this.pool.borrowBackEdge;
        this.borrowWallSpriteLookup[SliceType.STEP] = this.pool.borrowStep;
        this.borrowWallSpriteLookup[SliceType.DECORATION] = this.pool.borrowDecoration;
        this.borrowWallSpriteLookup[SliceType.WINDOW] = this.pool.borrowWindow;

        this.returnWallSpriteLookup = [];
        this.returnWallSpriteLookup[SliceType.FRONT] = this.pool.returnFrontEdge;
        this.returnWallSpriteLookup[SliceType.BACK] = this.pool.returnBackEdge;
        this.returnWallSpriteLookup[SliceType.STEP] = this.pool.returnStep;
        this.returnWallSpriteLookup[SliceType.DECORATION] = this.pool.returnDecoration;
        this.returnWallSpriteLookup[SliceType.WINDOW] = this.pool.returnWindow;
    }

    borrowWallSprite(sliceType) {
        return this.borrowWallSpriteLookup[sliceType].call(this.pool);
    }

    returnWallSprite(sliceType, sliceSprite) {
        return this.returnWallSpriteLookup[sliceType].call(this.pool, sliceSprite);
    }

    addSlice(sliceType, y) {
        var slice = new WallSlice(sliceType, y);
        this.slices.push(slice);
    }

    createTestWallSpan() {
        this.addSlice(SliceType.FRONT, 192);
        this.addSlice(SliceType.WINDOW, 192);
        this.addSlice(SliceType.DECORATION, 192);
        this.addSlice(SliceType.WINDOW, 192);
        this.addSlice(SliceType.DECORATION, 192);
        this.addSlice(SliceType.WINDOW, 192);
        this.addSlice(SliceType.DECORATION, 192);
        this.addSlice(SliceType.WINDOW, 192);
        this.addSlice(SliceType.BACK, 192);
    }
}


// Walls.VIEWPORT_WIDTH = 512;
// Walls.VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1;
