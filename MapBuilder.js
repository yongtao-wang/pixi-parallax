class MapBuilder {
  constructor(walls) {
    this.walls = walls;
    this.WALL_HEIGHTS = [
      256, // lowest
      224,
      192,
      160,
      128 // highest
    ];
    this.createMap();
  }

  createMap() {
    this.createWallSpan(3, 9, true);
    this.createGap(1);
    this.createWallSpan(1, 30);
    this.createGap(1);
    this.createWallSpan(2, 18);
    this.createGap(1);
    this.createSteppedWallSpan(2, 5, 28);
    this.createGap(1);
    this.createWallSpan(1, 10);
    this.createGap(1);
    this.createWallSpan(2, 6); 
    this.createGap(1);
    this.createWallSpan(1, 8);
    this.createGap(1);
    this.createWallSpan(2, 6);
    this.createGap(1);
    this.createWallSpan(1, 8);
    this.createGap(1)
    this.createWallSpan(2, 7);
    this.createGap(1);
    this.createWallSpan(1, 16);
    this.createGap(1);
    this.createWallSpan(2, 6);
    this.createGap(1);
    this.createWallSpan(1, 22);
    this.createGap(2);
    this.createWallSpan(2, 14);
    this.createGap(2);
    this.createWallSpan(3, 8);
    this.createGap(2);
    this.createSteppedWallSpan(3, 5, 12);
    this.createGap(3);
    this.createWallSpan(0, 8);
    this.createGap(3);
    this.createWallSpan(1, 50);
    this.createGap(20);
  }

  createGap(spanLength) {
    for (var i = 0; i < spanLength; i++) {
      this.walls.addSlice(SliceType.GAP);
    }
  }

  addWallFront(heightIndex) {
    this.walls.addSlice(SliceType.FRONT, this.WALL_HEIGHTS[heightIndex]);
  }

  addWallBack(heightIndex) {
    this.walls.addSlice(SliceType.BACK, this.WALL_HEIGHTS[heightIndex]);
  }

  addWallMid(heightIndex, spanLength) {
    var y = this.WALL_HEIGHTS[heightIndex];
    for (var i = 0; i < spanLength; i++) {
      if (i % 2 == 0) {
        this.walls.addSlice(SliceType.WINDOW, y);
      } else {
        this.walls.addSlice(SliceType.DECORATION, y);
      }
    }
  }

  addWallStep(heightIndex) {
    this.walls.addSlice(SliceType.STEP, this.WALL_HEIGHTS[heightIndex]);
  }

  createWallSpan(heightIndex, spanLength, noFront=false, noBack=false) {
    // noFront = noFront | false;
    // noBack = noBack | false;

    if (!noFront && spanLength > 0) {
      this.addWallFront(heightIndex);
      spanLength--;
    }

    var midSpanLength = spanLength - (noBack ? 0 : 1);
    if (midSpanLength > 0) {
      this.addWallMid(heightIndex, midSpanLength);
      spanLength -= midSpanLength;
    }

    if (!noBack && spanLength > 0) {
      this.addWallBack(heightIndex);
    }
  }

  createSteppedWallSpan(heightIndex, spanALength, spanBLength) {
    if (heightIndex < 2) {
      heightIndex = 2;
    }
    this.createWallSpan(heightIndex, spanALength, false, true);
    this.addWallStep(heightIndex - 2);
    this.createWallSpan(heightIndex - 2, spanBLength - 1, true, false);
  }
}
