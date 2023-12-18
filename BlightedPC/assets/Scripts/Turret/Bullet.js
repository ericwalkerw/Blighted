const Emitter = require("EventEmitter");
const Key = require('Key');
cc.Class({
  extends: cc.Component,

  properties: {
    speed: 200,
  },

  onLoad() {
    cc.director.getPhysicsManager().enabled = true;
    this.applyForce();
  },

  applyForce() {
    this.schedule(() => {
      this.node.x -= this.speed;
    }, 0);
  },
});
