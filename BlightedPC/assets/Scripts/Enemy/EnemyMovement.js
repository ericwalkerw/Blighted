const Emitter = require("EventEmitter");
const Key = require("Key");
cc.Class({
  extends: cc.Component,

  properties: {
    enemyStat: require("Enemy"),
    _wavepointIndex: 0,
    _target: cc.Node,
    _waypoints: cc.Node,
  },

  start() {
    Emitter.instance.emit(Key.GET_POINTS, this);
    this._target = this._waypoints[0];
    this.moveToTarget();
  },

  getPoints(points) {
    this._waypoints = points;
  },

  moveToTarget() {
    if (this._target != null) {
      const distance = this.node.position.sub(this._target.position).mag();
      const duration = distance / this.enemyStat.mSpeed;

      cc.tween(this.node)
        .to(duration, { position: this._target.position })
        .call(() => {
          this.getNextPoint();
        })
        .start();
    }
  },

  getNextPoint() {
    if (this._wavepointIndex >= this._waypoints.length - 1) {
      this.node.destroy();
      return;
    }

    this._wavepointIndex++;
    this._target = this._waypoints[this._wavepointIndex];
    this.moveToTarget();
  },
});
