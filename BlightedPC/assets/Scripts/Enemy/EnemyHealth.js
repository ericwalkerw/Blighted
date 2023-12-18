const mathf = require("Mathf");
cc.Class({
  extends: cc.Component,

  properties: {
    enemyStat: require("Enemy"),
    _currentHealth: 0,
  },

  onLoad() {
    this._currentHealth = this.enemyStat.mHealth;
  },

  start() {
    const manager = cc.director.getCollisionManager();
    manager.enabled = true;
  },

  takeDamage(damage) {
    this._currentHealth = mathf.clamp(
      this._currentHealth - damage,
      0,
      this.enemyStat.mHealth
    );
  },

  onCollisionEnter(other, self) {
    if (other.node.group === "Bullet") {
      const damage = other.node.getComponent("Bullet").mDamage;
      other.node.destroy();
      if (this._currentHealth > 1) {
        this.takeDamage(damage);
      } else {
        self.node.destroy();
      }
    }
  },
});
