cc.Class({
  extends: cc.Component,

  properties: {
    enemyPrefab: cc.Prefab,
    startPoint: cc.Node,
    cooldownWaveUI: cc.Label,
    waveDuration: 6,
    waveIndex: 1,
    waveNumber: 10,
  },

  onLoad() {
    this.spawnWave();
    this.schedule(
      () => {
        this.spawnWave();
      },
      this.waveDuration,
      this.waveNumber,
      0
    );
  },

  spawnWave() {
    this.cooldownWave();
    for (let i = 0; i < this.waveIndex; i++) {
      this.scheduleOnce(() => {
        this.spawnEnemy();
      }, i * 1);
    }
    this.waveIndex++;
  },

  spawnEnemy() {
    let newEnemy = cc.instantiate(this.enemyPrefab);
    newEnemy.parent = this.startPoint;

    let randomRadius = 25;
    let randomAngle = Math.random() * 2 * Math.PI;
    let offsetX = randomRadius * Math.cos(randomAngle);
    let offsetY = randomRadius * Math.sin(randomAngle);

    let spawnPosition = this.startPoint.children[0].position.add(
      cc.v2(offsetX, offsetY)
    );
    newEnemy.position = spawnPosition;
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
