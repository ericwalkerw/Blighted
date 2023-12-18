const Emitter = require("EventEmitter");
const Key = require('Key');
cc.Class({
  extends: cc.Component,

  properties: {
    mSpeed: 20,
    mDamage: 30,
  },

  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    this.applyForce();
  },

  applyForce() {
    this.schedule(() => {
      this.node.x -= this.mSpeed;
    }, 0);
  },
});
