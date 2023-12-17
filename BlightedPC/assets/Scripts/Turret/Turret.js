const Emitter = require('EventEmitter');
const Key = require('Key');

cc.Class({
  extends: cc.Component,

  properties: {
    _target: cc.Node,
    pivot: cc.Node,
    range: 15,
    graphics: cc.Graphics,
    collider:cc.Collider,
  },

  onLoad() {
    const manager = cc.director.getCollisionManager();
    manager.enabled = true;
    manager.enabledDebugDraw = true;
    this.collider.radius = this.range;
  },

  onCollisionEnter(other) {
    this._target = other.node;
  },

  onCollisionStay(other) {
    const distanceToCurrent = this._target
      ? this.node.position.sub(this._target.position).mag()
      : Infinity;
    const distanceToNew = this.node.position.sub(other.node.position).mag();

    if (!this._target || distanceToNew < distanceToCurrent) {
      this._target = other.node;
    }
    this.lookAtTarget();
    this.drawConnectionLine();
    Emitter.instance.emit(Key.TURRET_FIRE);
  },

  onCollisionExit() {
    this._target = null;
    this.graphics.clear();
  },

  lookAtTarget() {
    let newAngle = Math.atan2(
      this._target.y - this.node.y,
      this._target.x - this.node.x
    );
    newAngle = cc.misc.radiansToDegrees(newAngle);
    this.pivot.angle = newAngle;
  },

  drawConnectionLine() {
    this.graphics.clear();

    this.graphics.strokeColor = cc.Color.RED;
    this.graphics.lineWidth = 2;
    this.graphics.moveTo(this.pivot.x, this.pivot.y);
    this.graphics.lineTo(
      this._target.x - this.node.x,
      this._target.y - this.node.y
    );
    this.graphics.stroke();
  },
});
