cc.Class({
  extends: cc.Component,

  properties: {
    mapLevel: cc.TextAsset,
    mTile: cc.Node,
    mStartPoint: cc.Node,
    mEndPoint: cc.Node,
    mWayPoint: cc.Node,
    startPrefab: cc.Prefab,
    enemyWay: cc.Prefab,
    endPoint: cc.Prefab,
    emptyPrefab: cc.Prefab,
    point: cc.Prefab,
  },

  onLoad() {
    const mapWidth = 18;
    const height = 9;
    const sizeMap = mapWidth * height;
    const mapArr = this.mapLevel.text
      .split("\n")
      .filter((line) => line.trim() !== "");

    const finalMap = mapArr.join(",").split(",");

    const prefabMapping = {
      0: this.emptyPrefab,
      1: this.enemyWay,
      2: this.startPrefab,
      3: this.endPoint,
    };

    for (let i = 0; i < sizeMap; i++) {
      const mapValue = parseInt(finalMap[i]);
      const prefab = prefabMapping[mapValue];

      if (prefab) {
        this.spawnPrefab(prefab, i);
        if (mapValue == 1) {
          this.spawnPoint(i);
        }
      }
    }
  },

  spawnPrefab(prefab) {
    let newPrefab = cc.instantiate(prefab);
    newPrefab.parent = this.mTile;
  },

  spawnPoint(index) {
    const x = index % 18;
    const y = Math.floor(index / 18);
    cc.log(index);
    let newPoint = cc.instantiate(this.point);
    newPoint.parent = this.mWayPoint;
    newPoint.getComponent("PointPosition").setPos(cc.v2(x, y));
  },
});
