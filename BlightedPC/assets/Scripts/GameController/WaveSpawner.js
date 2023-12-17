cc.Class({
  extends: cc.Component,

  properties: {
    enemyPrefab: cc.Prefab,
    startPoint: cc.Node,
    cooldownWaveUI: cc.Label,
    waveDuration: 6,
    waveNumber: 1,
  },

  onLoad() {
    this.spawnWave();
      this.schedule(() => {
        this.spawnWave();
      }, this.waveDuration, 2, 0);
  },

  spawnWave() {
    this.cooldownWave();
    for (let i = 0; i < this.waveNumber; i++) {
      this.scheduleOnce(() => {
        this.spawnEnemy();
      }, i * 1);
    }
    this.waveNumber++;
  },

  spawnEnemy() {
    let newEnemy = cc.instantiate(this.enemyPrefab);
    newEnemy.parent = this.startPoint;
    newEnemy.position = this.startPoint.children[0].position;
  },

  cooldownWave() {
    let countdown = this.waveDuration - 1;
    const updateCooldown = () => {
      this.cooldownWaveUI.string = `${countdown}`;
      countdown--;
      if (countdown < 0) {
        this.unschedule(updateCooldown);
      }
    };
    this.schedule(updateCooldown, 1, countdown, 1);
  },
});
