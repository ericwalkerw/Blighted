cc.Class({
  extends: cc.Component,

  properties: {
    enemyPrefab: cc.Prefab,
    startPoint: cc.Node,
  },

  onLoad() {
    this.spawnEnemy();

    // this.schedule(()=>{
    //     this.spawnEnemy();
    // }, 1)
  },

  spawnEnemy() {
    let newEnemy = cc.instantiate(this.enemyPrefab);
    newEnemy.parent = this.startPoint;
    newEnemy.position = this.startPoint.children[0].position;
  },
});
