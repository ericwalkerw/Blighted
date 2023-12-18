const Emitter = require("EventEmitter");
const Key = require("Key");

cc.Class({
  extends: cc.Component,

  properties: {
    attackSpeed: 1,
    _canFire: true,
    bulletPrefab: cc.Prefab,
    firePoint: cc.Node,
  },

  onLoad() {
  },

  shooting() {
    if (this._canFire) {
      this.shoot();
      this._canFire = false;
      this.scheduleOnce(() => {
        this._canFire = true;
      }, 1 / this.attackSpeed);
    }
  },

  shoot() {
    const newBullet = cc.instantiate(this.bulletPrefab);
    newBullet.parent = this.firePoint;
    newBullet.position = this.firePoint.position;
  },
});
