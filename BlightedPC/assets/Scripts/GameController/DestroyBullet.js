const Emitter = require("EventEmitter");
const Key = require("Key");

cc.Class({
  extends: cc.Component,

  properties: {},

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    const manager = cc.director.getCollisionManager();
    manager.enabled = true;
  },

  onCollisionExit(other) {
    other.destroy();
  },
});
