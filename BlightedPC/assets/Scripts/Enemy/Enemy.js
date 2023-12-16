const Emitter = require("EventEmitter");
const Key = require("Key");

cc.Class({
  extends: cc.Component,

  properties: {
    speed: 10,
    _wavepointIndex: 0,
    _target: cc.Node,
    _waypoints: cc.Node,
  },

  onLoad() {
    Emitter.instance.registerEvent(
      Key.GET_POINTS,
      ((waypoints) => {
        this.getPoints(waypoints);
      }).bind(this)
    );
  },

  start() {
    this._target = this._waypoints[0];
    this.moveToTarget();
  },
  
  getPoints(points) {
    this._waypoints = points;
  },

  moveToTarget() {
    const distance = this.node.position.sub(this._target.position).mag();
    const duration = distance / this.speed;

    cc.tween(this.node)
      .to(duration, { position: this._target.position })
      .call(() => {
        this.getNextPoint();
      })
      .start();
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
