class Walls extends PIXI.Container {

    constructor() {
        super();
        this.VIEWPORT_WIDTH = 512;
        this.VIEWPORT_NUM_SLICES = Math.ceil(this.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1;
        this.pool = new WalllSpritesPool();
        this.createLookupTables();

        this.slices = [];
        this.createTestMap();

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

    createTestSteppedWallSpan() {
        this.addSlice(SliceType.FRONT, 192);
        this.addSlice(SliceType.WINDOW, 192);
        this.addSlice(SliceType.DECORATION, 192);
        this.addSlice(SliceType.STEP, 256);
        this.addSlice(SliceType.WINDOW, 256);
        this.addSlice(SliceType.BACK, 256);
    }

    createTestGap() {
        this.addSlice(SliceType.GAP);
    }

    createTestMap() {
        for (var i = 0; i < 10; i++) {
            this.createTestWallSpan();
            this.createTestGap();
            this.createTestSteppedWallSpan();
            this.createTestGap();
        }
    }

    setViewportX(viewportX) {
        this.viewportX = this.checkViewportXBounds(viewportX);
        var prevViewportSliceX = this.viewportSliceX;
        this.viewportSliceX = Math.floor(this.viewportX / WallSlice.WIDTH);

        this.removeOldSlices(prevViewportSliceX);
        this.addNewSlices();
    }

    checkViewportXBounds(viewportX) {
        var maxViewportX = (this.slices.length - this.VIEWPORT_NUM_SLICES) * WallSlice.WIDTH;
        if (viewportX < 0) {
            viewportX = 0;
        }
        else if (viewportX >= maxViewportX) {
            viewportX = maxViewportX;
        }
        return viewportX;
    }

    addNewSlices() {
        var firstX = -(this.viewportX % WallSlice.WIDTH);
        for (var i = this.viewportSliceX, sliceIndex = 0; 
            i < this.viewportSliceX + this.VIEWPORT_NUM_SLICES; 
            i++, sliceIndex++ ) {
                var slice = this.slices[i];
                if (slice.sprite == null && slice.type != SliceType.GAP) {
                    slice.sprite = this.borrowWallSprite(slice.type);
                    slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
                    slice.sprite.position.y = slice.y;
                    this.addChild(slice.sprite);
                }
                else if (slice.sprite != null) {
                    slice.sprite.position.x = firstX + (sliceIndex * WallSlice.WIDTH);
                }
        }
    }

    removeOldSlices(prevViewportSliceX) {
        var numOldSlices = this.viewportSliceX - prevViewportSliceX;
        if (numOldSlices > this.VIEWPORT_NUM_SLICES) {
            numOldSlices = this.VIEWPORT_NUM_SLICES;
        }
        for (var i = prevViewportSliceX; i < prevViewportSliceX + numOldSlices; i++) {
            var slice = this.slices[i];
            if (slice.sprite != null) {
                this.returnWallSprite(slice.type, slice.sprite);
                this.removeChild(slice.sprite);
                slice.sprite = null;
            }
        }
    }
}


// Walls.VIEWPORT_WIDTH = 512;
// Walls.VIEWPORT_NUM_SLICES = Math.ceil(Walls.VIEWPORT_WIDTH / WallSlice.WIDTH) + 1;
